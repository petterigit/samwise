import '../styles/CardInfo.css';

import { CardInfoObject } from '../types';

type CardInfoProps = {
    currentCardInfo: CardInfoObject,
    closeCardInfo: () => void;
  }

export const CardInfo = ( {currentCardInfo, closeCardInfo } : CardInfoProps) => {
  return (
      <div className="CardInfo-Background">
        <div className="CardInfo">
            <h2 className="CardInfo-Header"> 
                {currentCardInfo.name}
            </h2>
            <button className="CardInfo-ExitButton"
                    onClick={()=>closeCardInfo()}>
                Close Info
            </button>
            <div className="CardInfo-Details">
                <div className="CardInfo-Card">
                    <h3> Hero card </h3>
                    <img 
                    className="CardInfo-Img"
                    src={currentCardInfo.src}
                    alt="A LOTR card" />
                </div>
                <div className="CardInfo-HeroDetails">
                    <h3> Hero info </h3>
                    <p> {currentCardInfo.details} </p>
                </div>
            </div>
        </div>
    </div>
    
  );
}
