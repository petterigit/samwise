import { useState, useEffect } from 'react';
import '../styles/CardInfo.css';
import { CardInfoObject } from '../types';

const feather = require('feather-icons');
const _ = require('lodash');

type CardInfoProps = {
    currentCardInfo: CardInfoObject,
    closeCardInfo: () => void;
  }

const getIconExplanation = (keyWord: string) => {
    switch(keyWord) {
        case 'willpower':
            return("<p>Willpower: " + feather.icons.sun.toSvg() + "</p>")
        case 'defense':
            return("<p>Defense: " + feather.icons.shield.toSvg() + "</p>")
        case 'attack':
            return("<p>Attack: " + feather.icons["pen-tool"].toSvg() + "</p>")
        case 'spirit':
            return("<p>Spirit: " + feather.icons.star.toSvg() + "</p>")
        case 'leadership':
            return("<p>Leadership: " + feather.icons.target.toSvg() + "</p>")
        default:
            return("");
    }
}

export const CardInfo = ( {currentCardInfo, closeCardInfo } : CardInfoProps) => {
    
    
    /* Parsing details to show symbols in place of:
        [willpower]
        [attack]
        [defense]
        */
    const [parsedDetails, setParsedDetails] = useState("");
    const [iconExplanation, setIconExplanation] = useState("");

    useEffect( () => {
        let currentDetails = currentCardInfo.details;
        let newDetails = "";
        let keyWord = "";
        let keyWords = [];
        let getLetters = false;
        for (let i = 0; i<currentDetails.length; i++) {

            // When symbol starts, log keyword instead of normal letters
            if (currentDetails[i] === '[') {
                getLetters = true;
                continue
            } else if (currentDetails[i] === ']') {
                getLetters = false;

                // Append image of symbol
                switch(keyWord) {
                    case 'willpower':
                        newDetails = newDetails + feather.icons.sun.toSvg();
                        break;
                    case 'defense':
                            newDetails = newDetails + feather.icons.shield.toSvg();
                            break;
                    case 'attack':
                        newDetails = newDetails + feather.icons["pen-tool"].toSvg();
                        break;
                    case 'spirit':
                        newDetails = newDetails + feather.icons.star.toSvg();
                        break;
                    case 'leadership':
                        newDetails = newDetails + feather.icons.flag.toSvg();
                        break;
                    case 'tactics':
                        newDetails = newDetails + feather.icons.target.toSvg();
                        break;
                    default:
                        newDetails = newDetails + " {Should have icon} " + keyWord;
                }
                keyWords.push(keyWord);
                keyWord = "";
                continue
            }
            if (getLetters) {
                keyWord = keyWord + currentDetails[i]
            } else {
                newDetails = newDetails + currentDetails[i];
            }
        }

        /* Set corresponsive icon explanations */
        let newIconExplanations = "";
        keyWords = _.uniq(keyWords);
        for (const keyWord of keyWords) {
            newIconExplanations = newIconExplanations + getIconExplanation(keyWord);
        }
        setIconExplanation(newIconExplanations);
        setParsedDetails(newDetails);

    }, [currentCardInfo.details]);
    
    return (
        <div className="card-info-background">
            <div className="card-info-container">
                <div className="card-info-header">
                    <h2> 
                        {currentCardInfo.name}
                    </h2>
                </div>
                <div className="card-info-exit">
                    <button className="card-info-exit-button"
                            onClick={()=>closeCardInfo()}
                        >
                        Close Info
                    </button>
                </div>
                <div className="card-info-card-header">
                    <h3> Hero card </h3>
                </div>
                <div className="card-info-details-header">
                    <h3> Hero info </h3>
                </div>
                <div className="card-info-img">
                    <img 
                    className="card-info-img"
                    src={"https://ringsdb.com"+currentCardInfo.src}
                    alt="A LOTR card" />
                </div>
                <div className="card-info-hero-stats"> 
                    <h4> {currentCardInfo.name} <br /> </h4>
                    <p>
                        Threat: {currentCardInfo.threat} <br/>
                        Willpower: {currentCardInfo.willpower} <br/>
                        Attack: {currentCardInfo.attack} <br/>
                        Defense: {currentCardInfo.defense} <br/>
                        Health: {currentCardInfo.health} <br/>
                        <br/>
                        Pack: {currentCardInfo.pack_name} <br />
                        Illustrator: {currentCardInfo.illustrator} <br />
                        <a href="url">{currentCardInfo.url} </a><br />

                    </p>
                </div>
                <div className="card-info-hero-details">
                    <p dangerouslySetInnerHTML={{__html: parsedDetails}} />
                    <br />
                    <p dangerouslySetInnerHTML={{__html: currentCardInfo.flavor}} />
                    <br />
                    {iconExplanation !== "" &&
                        <div>
                        <p> Icons used in keywords: </p>
                        <p dangerouslySetInnerHTML={{__html: iconExplanation}} />
                        </div>
                    }
                </div>
            </div>
        </div>
        
    );
}