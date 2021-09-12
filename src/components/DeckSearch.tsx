import { useState } from "react";
import "../styles/DeckSearch.css";
import { TextInput } from "./TextInput";
import { DeckObject } from "../types";

type DeckSearchProps = {
	updateDeck: (fetchData: DeckObject) => void;
};

export const DeckSearch = ({ updateDeck }: DeckSearchProps) => {
	const [fetchError, setFetchError] = useState(false);

	const getDeck = (fetchData: DeckObject | null) => {
		if (fetchData === null) {
			setFetchError(true);
			return;
		} else {
			setFetchError(false);
		}
		const newDeck = {
			name: fetchData.name,
			heroes: fetchData.heroes,
		};
		updateDeck(newDeck);
	};

	return (
		<div className="deck-search">
			<p>Search for a decklist here:</p>
			<TextInput returnDeck={getDeck} />
			{fetchError && <p>Couldn't find a deck with given search input!</p>}
		</div>
	);
};
