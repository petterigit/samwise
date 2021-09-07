import '../styles/DeckSearch.css';
import {TextInput} from './TextInput';
export const DeckSearch = () => {
  return (
    <div className="DeckSearch">
        <p>Search for a decklist here</p>
        <TextInput />
    </div>
  );
}
