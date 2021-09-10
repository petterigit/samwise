import { useState} from 'react';

import '../styles/MainView.css';
import { Header } from './Header';
import { CardView } from './CardView';
import { DeckSearch } from './DeckSearch';
import { DeckObject } from '../types';


export const MainView = () => {


  const [currentDeck, setCurrentDeck] = useState<DeckObject>();
  const updateDeck = (newDeck: DeckObject) => {
    setCurrentDeck(newDeck);
  }



  return (
    <div className="main-view">
        <Header/>
        <DeckSearch updateDeck={updateDeck}/>
        {currentDeck !== undefined && 
            <CardView currentDeck={currentDeck}/>
        } 
    </div>
  );
}
