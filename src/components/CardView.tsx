import { useState, useEffect } from 'react';

import '../styles/CardView.css';
import { CardObject, DeckObject } from '../types';
import { Card } from './Card';
import { CardInfo } from './CardInfo';
import { getCardByID } from '../utils/fetch';

type CardViewProps = {
    currentDeck: DeckObject
} 

export const CardView = ({ currentDeck } : CardViewProps) => {
    const [infoVisibility, setInfoVisibility] = useState(false);

    const showCardInfo = () => {
        setInfoVisibility(true);
    }

    const closeCardInfo = () => {
        setInfoVisibility(false);
    }

    const renderDeck = () => {
        let jsxField = [];
        jsxField.push(<h2>{currentDeck.name}</h2>);


        /* TODO
        const slots = currentDeck.slots;
         for (const [key, value] of Object.entries(currentDeck.slots)) {
            -- let newCard = await getInfo(key);
            newJsxField.push(<Card imagesrc={newCard.imagesrc} showCardInfo={showCardInfo}/>);
          };
        const heroes = currentDeck.heroes;
        for (const [key, value] of Object.entries(currentDeck.heroes)) {
            -- let newCard = getCardByID(key) as CardObject;
            jsxField.push(<Card imagesrc={newCard.imagesrc} showCardInfo={showCardInfo}/>);
        }
        return(jsxField);
    */

        for (const [key, value] of Object.entries(currentDeck.slots)) {
            jsxField.push(<Card imagesrc={"/bundles/cards/141002.png"} showCardInfo={showCardInfo}/>);
          };
        return jsxField;
    }

  return (
    <div className="CardView">
        {renderDeck()}
        {infoVisibility === true && 
            <CardInfo closeCardInfo={closeCardInfo} />
        }
        
    </div>
  );
}
