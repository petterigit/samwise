import { useState, useEffect } from 'react';

import '../styles/CardView.css';
import { CardInfoObject, CardObject, DeckObject } from '../types';
import { Card } from './Card';
import { CardInfo } from './CardInfo';
import { getCardByID } from '../utils/fetch';

type CardViewProps = {
    currentDeck: DeckObject
} 

export const CardView = ({ currentDeck } : CardViewProps) => {
    const [infoVisibility, setInfoVisibility] = useState(false);
    const [currentCardInfo, setCurrentCardInfo] = useState<CardInfoObject>({src: "", name: "", details:"Couldn't get card details.."});
    const [jsxCards, setJsxCards] = useState<any>([]);
    const [jsxHeader, setJsxHeader] = useState<any>([]);
    const [currentCards, setCurrentCards] = useState<any>([]);


    /* USE EFFECTS 
        Gets current cards when a new deck is searched
        Renders curret cards when their info has been fetched
        */

    useEffect( () => {
    console.log("Fetching card info..");
    const getCurrentCards = async () => {
        const heroes = currentDeck.heroes;
        const heroKeys = Object.keys(heroes);

        const fetchedCards = await Promise.all(heroKeys.map(heroKey => {
            const fetchData = fetchCard(heroKey);
            return fetchData;
        }));
        setCurrentCards(fetchedCards);
    }
    // Single Card Fetch
    const fetchCard = async (key: string) => {
        let fetchData = await getCardByID(key) as CardObject;
        if (fetchData) {
          return(fetchData);
        } else {
          console.log("Fetch returned an error")
        }
      }
    // Deck name can be rendered from current Deck
    const renderHeader = () =>  {
        setJsxHeader(<h2>{currentDeck.name}</h2>);
    }

    getCurrentCards();
    renderHeader();
    }, [currentDeck]);

    /* Render Deck */
    useEffect( () => {
        console.log("Rendering deck..");
        const showCardInfo = (e: React.MouseEvent<HTMLImageElement, MouseEvent>) => {
            const target = e.target as HTMLImageElement;
    
            let cardDetails = "";
            let cardName = "";
            for (let i = 0; i<currentCards.length ; i++) {
                if (currentCards[i].code === target.id) {
                    cardDetails = currentCards[i].text
                    cardName = currentCards[i].name
                }
            }
    
            let newCardInfo = {src: target.src, name: cardName, details:cardDetails}
            setCurrentCardInfo(newCardInfo);
            setInfoVisibility(true);
        }


        const heroes = currentDeck.heroes;
        const heroKeys = Object.keys(heroes);
        let newJsxCards = [];
        for (let i = 0; i<currentCards.length; i++) {
            if (currentCards[i] === undefined) {
            } else {
                newJsxCards[i] = <Card key={heroKeys[i]} id={heroKeys[i]} imagesrc={currentCards[i]!.imagesrc} showCardInfo={showCardInfo} />
            }
        }
        setJsxCards(newJsxCards);
    }, [currentCards, currentDeck.heroes]);

    const closeCardInfo = () => {
        setInfoVisibility(false);
    }

  return (
    <div className="CardView">
        <div className="CardView-Header">
            {jsxHeader}
        </div>
        <div className="CardView-Cards">
            {jsxCards}
        </div>
        {infoVisibility === true && 
            <CardInfo currentCardInfo={currentCardInfo} closeCardInfo={closeCardInfo} />
        }
        
    </div>
  );
}
