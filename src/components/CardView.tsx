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
    const [jsxField, setJsxField] = useState<any>([]);

    useEffect( () => {
        renderDeck();
    }, [currentDeck])

    const showCardInfo = () => {
        setInfoVisibility(true);
    }

    const closeCardInfo = () => {
        setInfoVisibility(false);
    }

    const fetchCard = async (key: string) => {
        let fetchData = await getCardByID(key) as CardObject;
        if (fetchData) {
          return(fetchData);
        } else {
          console.log("Fetch returned an error")
        }
      }
    
      const fetchCards = async (heroes: {}[]) => {
        for (const [key, value] of Object.entries(currentDeck.heroes)) {
            let newCard = await fetchCard(key) as CardObject;
            //jsxField.push(<Card imagesrc={newCard.imagesrc} showCardInfo={showCardInfo}/>);
        }
      }

    const renderDeck = async () => {
        let newJsxField = [];
        newJsxField.push(<h2>{currentDeck.name}</h2>);
        const heroes = currentDeck.heroes;
        const fetchCards = await Promise.all(Object.keys(heroes).map(heroKey => {
            //console.log(hero);
            const fetchData = fetchCard(heroKey);
            return fetchData;
        }));
        
        let jsxCards = [];
        for (let i = 0; i<fetchCards.length; i++) {
            if (fetchCards[i] === undefined) {
                console.log("undef fetchCard");
            } else {
                jsxCards[i] = <Card imagesrc={fetchCards[i]!.imagesrc} showCardInfo={showCardInfo} />
            }
            
        }
        console.log(jsxCards);
        newJsxField.push(jsxCards);
        setJsxField(newJsxField);
        //console.log(jsxField);
    }

  return (
    <div className="CardView">
        {jsxField}
        {infoVisibility === true && 
            <CardInfo closeCardInfo={closeCardInfo} />
        }
        
    </div>
  );
}
