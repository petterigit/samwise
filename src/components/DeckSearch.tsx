import '../styles/DeckSearch.css';
import {TextInput} from './TextInput';
import { DeckObject } from '../types';

type DeckSearchProps = {
  updateDeck: (fetchData: DeckObject) => void;
}

export const DeckSearch = ({ updateDeck } : DeckSearchProps) => {

  const getDeck = (fetchData: DeckObject) => {
    const newDeck = {
      name: fetchData.name,
      heroes: fetchData.heroes
    }
    updateDeck(newDeck)
  }

  return (
    <div className="DeckSearch">
        <p>Search for a decklist here</p>
        <TextInput returnDeck={getDeck}/>
    </div>
  );
}
