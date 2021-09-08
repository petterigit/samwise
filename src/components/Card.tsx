import '../styles/Card.css';

type CardProps = {
    imagesrc: string
    showCardInfo: () => void;
  }

export const Card = ({ imagesrc, showCardInfo } : CardProps) => {
    

    return (
        <div className="Card">
            <img 
            className="CardImg"
            src={"https://ringsdb.com" + imagesrc}
            alt="A LOTR card"
            onClick={() => {showCardInfo()}} />
        </div>
    );
}
