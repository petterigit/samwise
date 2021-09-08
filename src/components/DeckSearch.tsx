import '../styles/DeckSearch.css';
import {TextInput} from './TextInput';

type DeckSearchProps = {
  updateDeck: ({name: string, details: string, heroes: {}, slots: {} }) => void;
}

export const DeckSearch = ({ updateDeck } : DeckSearchProps) => {

  const getDeck = (fetchData: {name: string, details: string, heroes: {}, slots: {} }) => {
    console.log(fetchData)
    const newDeck = {
      name: fetchData.name,
      details: fetchData.details,
      heroes: fetchData.heroes,
      slots: fetchData.slots,

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
