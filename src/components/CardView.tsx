import { useState, useEffect } from "react";

import "../styles/CardView.css";
import { CardInfoObject, DeckObject } from "../types";
import { Card } from "./Card";
import { CardInfo } from "./CardInfo";
import { getCardByID } from "../utils/fetch";

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

	/* USE EFFECTS 
        Gets current cards when a new deck is searched
        Renders curret cards when their info has been fetched
        */

	useEffect(() => {
		setLoadingMessage(true);
		const getCurrentCards = async () => {
			const heroes = currentDeck.heroes;
			const heroKeys = Object.keys(heroes);

			const fetchedCards = await Promise.all(
				heroKeys.map((heroKey) => {
					const fetchData = fetchCard(heroKey);
					return fetchData;
				})
			);
			setCurrentCards(fetchedCards);
		};
		// Single Card Fetch
		const fetchCard = async (key: string) => {
			let fetchData = (await getCardByID(key)) as CardInfoObject;
			if (!fetchData) {
				console.log("Fetch returned an error");
				return undefined;
			} else {
				return fetchData;
			}
		};
		// Deck name can be rendered from current Deck
		const renderHeader = () => {
			setHeaderText(currentDeck.name);
		};

		getCurrentCards();
		renderHeader();
		const heroes = currentDeck.heroes;
		setHeroKeys(Object.keys(heroes));
	}, [currentDeck]);

	const showCardInfo = (e: React.MouseEvent<HTMLImageElement, MouseEvent>) => {
		const target = e.target as HTMLImageElement;
		for (let i = 0; i < currentCards.length; i++) {
			let card = currentCards[i];
			if (!card) continue;
			let newCardInfo;
			if (card.code === target.id && card) {
				newCardInfo = {
					code: card.code,
					imagesrc: card.imagesrc,
					name: card.name,
					text: card.text,
					flavor: card.flavor,
					traits: card.traits,
					threat: card.threat,
					willpower: card.willpower,
					attack: card.attack,
					defense: card.defense,
					health: card.health,
					pack_name: card.pack_name,
					url: card.url,
					illustrator: card.illustrator,
				};
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
			{loadingMessage === true && <p>Getting cards..</p>}
			<div className="card-view-header">
				<h2>{headerText}</h2>
			</div>
			<div className="card-view-cards">
				{currentCards.map((card, i) => {
					return <Card key={i} id={heroKeys[i]} imagesrc={currentCards[i]!.imagesrc} imageLoaded={imageLoaded} showCardInfo={showCardInfo} />;
				})}
				{/*jsxCards*/}
			</div>
			{infoVisibility === true && <CardInfo currentCardInfo={currentCardInfo} closeCardInfo={closeCardInfo} />}
		</div>
	);
};
