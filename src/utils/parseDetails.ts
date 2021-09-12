import { getSvgByKeyWord } from "./getSvg";

export const getIconExplanation = (keyWord: string) => {
	return "<p>" + keyWord.charAt(0).toUpperCase() + keyWord.slice(1) + ": " + getSvgByKeyWord(keyWord) + "</p>";
};

export const getHeroDetails = (currentDetails: string) => {
	let newDetails = "";
	let keyWord = "";
	let keyWords = [];
	let getLetters = false;
	for (let i = 0; i < currentDetails.length; i++) {
		// When symbol starts, log keyword instead of normal letters
		if (currentDetails[i] === "[") {
			getLetters = true;
			continue;
		} else if (currentDetails[i] === "]") {
			getLetters = false;

			// Append image of symbol

			keyWords.push(keyWord);
			newDetails = newDetails + getSvgByKeyWord(keyWord);
			keyWord = "";
			continue;
		}
		if (getLetters) {
			keyWord = keyWord + currentDetails[i];
		} else {
			newDetails = newDetails + currentDetails[i];
		}
	}
	return { details: newDetails, keyWords: keyWords };
};
