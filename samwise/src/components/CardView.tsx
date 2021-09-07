import { useState } from 'react';

import '../styles/CardView.css';
import { Card } from './Card';
import { CardInfo } from './CardInfo';

export const CardView = () => {
    const [infoVisibility, setInfoVisibility] = useState(false);

    const showCardInfo = () => {
        setInfoVisibility(true);
    }

    const closeCardInfo = () => {
        setInfoVisibility(false);
    }

  return (
    <div className="CardView">
        <Card showCardInfo={showCardInfo}/>
        <Card showCardInfo={showCardInfo}/>
        <Card showCardInfo={showCardInfo}/>
        <Card showCardInfo={showCardInfo}/>
        <Card showCardInfo={showCardInfo}/>
        <Card showCardInfo={showCardInfo}/>

        {infoVisibility === true && 
            <CardInfo closeCardInfo={closeCardInfo} />
        }
        
    </div>
  );
}
