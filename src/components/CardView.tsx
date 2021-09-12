import { useState, useEffect } from "react";

import "../styles/CardView.css";
import { CardInfoObject, DeckObject } from "../types";
import { Card } from "./Card";
import { CardInfo } from "./CardInfo";
import { fetchCard } from "../utils/fetch";

type CardViewProps = {
	currentDeck: DeckObject;
};

export const CardView = ({ currentDeck }: CardViewProps) => {
	const [infoVisibility, setInfoVisibility] = useState(false);
	const [currentCardInfo, setCurrentCardInfo] = useState({} as CardInfoObject);
	const [headerText, setHeaderText] = useState("");
	const [currentCards, setCurrentCards] = useState<(CardInfoObject | undefined)[]>([]);
	const [loadingMessage, setLoadingMessage] = useState(true);
	const [heroKeys, setHeroKeys] = useState<string[]>([]);

	useEffect(() => {
		setLoadingMessage(true);
		const getCurrentCards = async (heroes: { id: number }[]) => {
			const heroKeys = Object.keys(heroes);
			const fetchedCards = await Promise.all(
				heroKeys.map((heroKey) => {
					// Fetch card gets information for a single card
					const fetchData = fetchCard(heroKey);
					return fetchData;
				})
			);
			setCurrentCards(fetchedCards);
		};

		// Fetches information on hero cards in deck
		getCurrentCards(currentDeck.heroes);

		// Sets corresponding header text
		setHeaderText(currentDeck.name);

		// Sets heroKeys that can be used later
		setHeroKeys(Object.keys(currentDeck.heroes));
	}, [currentDeck]);

	const showCardInfo = (e: React.MouseEvent<HTMLImageElement, MouseEvent>) => {
		const target = e.target as HTMLImageElement;
		for (let i = 0; i < currentCards.length; i++) {
			let card = currentCards[i];
			if (!card) continue;
			let newCardInfo;
			if (card.code === target.id && card) {
				newCardInfo = card;
				setCurrentCardInfo(newCardInfo);
				setInfoVisibility(true);
			}
		}
	};

	const closeCardInfo = () => {
		setInfoVisibility(false);
	};
	const imageLoaded = () => {
		setLoadingMessage(false);
	};

	return (
		<div className="card-view">
			<div className="card-view-header">
				<h2>{loadingMessage ? "Getting Cards..." : headerText}</h2>
			</div>
			<div className="card-view-cards">
				{currentCards.map((card, i) => {
					return <Card key={i} id={heroKeys[i]} imagesrc={currentCards[i]!.imagesrc} imageLoaded={imageLoaded} showCardInfo={showCardInfo} />;
				})}
			</div>
			{infoVisibility === true && <CardInfo currentCardInfo={currentCardInfo} closeCardInfo={closeCardInfo} />}
		</div>
	);
};
