import { useState } from 'react';

import '../styles/TextInput.css';
import { getDeckByID } from '../utils/fetch';

type TextInputProps = {
  returnDeck: (fetchData: {}) => void
}

export const TextInput = ({ returnDeck }: TextInputProps) => {
  const [textInputValue, setTextInputValue] = useState("");

  const fetchDeck = async () => {
    const id = parseInt(textInputValue);
    const fetchData = await getDeckByID(id) as {name: string, description: string, heroes: {}, slots: {}};
    if (fetchData) {
      returnDeck(fetchData);
    } else {
      console.log("Fetch returned an error")
    }
  }

  
  return (
    <div className="TextInput" >
        <input onChange={ (e) => setTextInputValue(e.target.value)} type="text" />
        <button onClick={ () => fetchDeck() }> Search </button>
    </div>
  );
}