import { useState, useEffect } from "react";
import "../styles/CardInfo.css";
import { CardInfoObject } from "../types";
import xIcon from "../x.svg";
import { getIconExplanation, getHeroDetails } from "../utils/parseDetails";
import _ from "lodash";

type CardInfoProps = {
	currentCardInfo: CardInfoObject;
	closeCardInfo: () => void;
};

export const CardInfo = ({ currentCardInfo, closeCardInfo }: CardInfoProps) => {
	const [parsedDetails, setParsedDetails] = useState("");
	const [iconExplanation, setIconExplanation] = useState("");

	useEffect(() => {
		// Get card details from state and format them
		let currentDetails = currentCardInfo.text;
		let detailsReturnArray = getHeroDetails(currentDetails);
		let newDetails = detailsReturnArray.details;
		let keyWords = detailsReturnArray.keyWords;

		// Set corresponsive icon explanations
		let newIconExplanations = "";
		keyWords = _.uniq(keyWords);
		for (const keyWord of keyWords) {
			newIconExplanations = newIconExplanations + getIconExplanation(keyWord);
		}

		// Set state
		setIconExplanation(newIconExplanations);
		setParsedDetails(newDetails);
	}, [currentCardInfo.text]);

	return (
		<div className="card-info-background">
			<div className="card-info-container">
				<div className="card-info-header">
					<h2>{currentCardInfo.name}</h2>
				</div>
				<div className="card-info-exit">
					<button onClick={closeCardInfo}>
						<img src={xIcon} alt="Close Info" />
					</button>
				</div>
				<div className="card-info-card-header">
					<h3> Hero card </h3>
				</div>
				<div className="card-info-details-header">
					<h3> Hero info </h3>
				</div>
				<div className="card-info-img">
					<img src={"https://ringsdb.com" + currentCardInfo.imagesrc} alt="A LOTR card" />
				</div>
				<div className="card-info-hero-stats">
					<p>
						<b>{currentCardInfo.name}</b> <br />
						<br />
						Threat: {currentCardInfo.threat} <br />
						Willpower: {currentCardInfo.willpower} <br />
						Attack: {currentCardInfo.attack} <br />
						Defense: {currentCardInfo.defense} <br />
						Health: {currentCardInfo.health} <br />
						<br />
						Pack: {currentCardInfo.pack_name} <br />
						Illustrator: {currentCardInfo.illustrator} <br />
						<a href="url">{currentCardInfo.url} </a> <br />
					</p>
				</div>
				<div className="card-info-hero-details">
					<p dangerouslySetInnerHTML={{ __html: parsedDetails }} />
					<br />
					<p dangerouslySetInnerHTML={{ __html: currentCardInfo.flavor }} />
					<br />
					{iconExplanation && (
						<div>
							<p> Icons used in keywords: </p>
							<p dangerouslySetInnerHTML={{ __html: iconExplanation }} />
						</div>
					)}
				</div>
			</div>
		</div>
	);
};
