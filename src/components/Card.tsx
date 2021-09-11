import '../styles/Card.css';

type CardProps = {
    key: string,
    id: string,
    imagesrc: string,
    imageLoaded: () => void,
    showCardInfo: (e: React.MouseEvent<HTMLImageElement, MouseEvent>) => void;
  }

export const Card = ({ key, id, imagesrc, imageLoaded, showCardInfo } : CardProps) => {
    

    return (
        <div className="card">
            <img
            key={key}
            id={id} 
            className="card-img"
            src={"https://ringsdb.com" + imagesrc}
            alt="A LOTR card"
            onClick={(e) => {showCardInfo(e)}}
            onLoad={imageLoaded} />
        </div>
    );
}


