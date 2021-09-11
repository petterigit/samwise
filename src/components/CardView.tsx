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
    const [currentCardInfo, setCurrentCardInfo] = useState({} as CardInfoObject);
    const [jsxCards, setJsxCards] = useState<any>([]);
    const [jsxHeader, setJsxHeader] = useState<any>([]);
    const [currentCards, setCurrentCards] = useState<any>([]);
    const [loadingMessage, setLoadingMessage] = useState(true);


    /* USE EFFECTS 
        Gets current cards when a new deck is searched
        Renders curret cards when their info has been fetched
        */

    useEffect( () => {
        setLoadingMessage(true);
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
        const showCardInfo = (e: React.MouseEvent<HTMLImageElement, MouseEvent>) => {
            const target = e.target as HTMLImageElement;
            
            let newCardInfo;
            for (let i = 0; i<currentCards.length ; i++) {
                let card = currentCards[i]
                if (card.code === target.id && card) {
                    newCardInfo = {
                        src: card.imagesrc, 
                        name: card.name, 
                        details: card.text,
                        flavor: card.flavor,
                        traits: card.traits,
                        threat: card.threat,
                        willpower: card.willpower,
                        attack: card.attack,
                        defense: card.defense,
                        health: card.health,
                        pack_name: card.pack_name,
                        url: card.url,
                        illustrator: card.illustrator
                    }
                    setCurrentCardInfo(newCardInfo);
                    setInfoVisibility(true);
                }
            }      
        }
        const heroes = currentDeck.heroes;
        const heroKeys = Object.keys(heroes);
        let newJsxCards = [];
        for (let i = 0; i<currentCards.length; i++) {
            if (!currentCards[i] ) continue;
            newJsxCards[i] = <Card key={heroKeys[i]} id={heroKeys[i]} imagesrc={currentCards[i]!.imagesrc} imageLoaded={imageLoaded} showCardInfo={showCardInfo} />

        }
        setJsxCards(newJsxCards);
    }, [currentCards, currentDeck.heroes]);

    const closeCardInfo = () => {
        setInfoVisibility(false);
    }
    const imageLoaded = () => {
        setLoadingMessage(false);
    }

  return (
    <div className="card-view">
        <div className="card-view-header">
            {jsxHeader}
            {loadingMessage === true &&
                <p>Getting cards..</p> 
            }
        </div>
        <div className="card-view-cards">
            {jsxCards}
        </div>
        {infoVisibility === true && 
            <CardInfo currentCardInfo={currentCardInfo} closeCardInfo={closeCardInfo} />
        }
        
    </div>
  );
}
