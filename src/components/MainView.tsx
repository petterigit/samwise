import { useState } from 'react';

import '../styles/MainView.css';
import { Header } from './Header';
import { CardView } from './CardView';
import { DeckSearch } from './DeckSearch';

export const MainView = () => {

  const defaultDeck = {
    name: "Default Deck",
    details: "Default deck details",
    heroes: {},
    slots: {}
  }
  const [currentDeck, setCurrentDeck] = useState(defaultDeck);


  const updateDeck = (newDeck: {name: string, details: string, heroes: {}, slots: {} }) => {
    setCurrentDeck(newDeck)
  }
  return (
    <div className="MainView">
        <Header/>
        <DeckSearch setCurrentDeck={updateDeck}/>
        <CardView currentDeck={currentDeck}/>
    </div>
  );
}
