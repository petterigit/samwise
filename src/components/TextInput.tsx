import { useState } from 'react';

import '../styles/TextInput.css';
import { getDeckByID } from '../utils/fetch';
import { DeckObject } from '../types';

type TextInputProps = {
  returnDeck: (fetchData: DeckObject) => void
}

export const TextInput = ({ returnDeck }: TextInputProps) => {
  const [textInputValue, setTextInputValue] = useState("");

  const fetchDeck = async () => {
    const id = parseInt(textInputValue);
    const fetchData = await getDeckByID(id) as DeckObject;
    if (fetchData) {
      returnDeck(fetchData);
    } else {
      console.log("Fetch returned an error")
    }
  }
  return (
    <div className="text-input" >
        <input
          placeholder="Number from 0 to N" 
          onChange={ (e) => setTextInputValue(e.target.value)} 
          type="text" />
        <button onClick={fetchDeck}> Search </button>
    </div>
  );
}