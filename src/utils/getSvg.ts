const feather = require('feather-icons');

export const getSvgByKeyWord = (keyWord: string) => {
    switch (keyWord) {
		case "willpower":
			return feather.icons.sun.toSvg();
		case "defense":
			return feather.icons.shield.toSvg();
		case "attack":
			return feather.icons["pen-tool"].toSvg();
		case "spirit":
			return feather.icons.star.toSvg();
		case "leadership":
			return feather.icons.flag.toSvg();
		case "tactics":
			return feather.icons.target.toSvg();
		case "lore":
			return feather.icons["book-open"].toSvg();
		default:
			return keyWord;
	}
}
