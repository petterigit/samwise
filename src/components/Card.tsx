import '../styles/Card.css';

type CardProps = {
    showCardInfo: () => void;
  }

export const Card = ({ showCardInfo } : CardProps) => {
    

    return (
        <div className="Card">
            <img 
            className="CardImg"
            src="https://ringsdb.com/bundles/cards/141002.png"
            alt="A LOTR card"
            onClick={() => {showCardInfo()}} />
        </div>
    );
}
