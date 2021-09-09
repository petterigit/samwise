import '../styles/Card.css';

type CardProps = {
    key: string,
    id: string,
    imagesrc: string,
    showCardInfo: (e: React.MouseEvent<HTMLImageElement, MouseEvent>) => void;
  }

export const Card = ({ key, id, imagesrc, showCardInfo } : CardProps) => {
    

    return (
        <div className="Card">
            <img
            key={key}
            id={id} 
            className="CardImg"
            src={"https://ringsdb.com" + imagesrc}
            alt="A LOTR card"
            onClick={(e) => {showCardInfo(e)}} />
        </div>
    );
}


