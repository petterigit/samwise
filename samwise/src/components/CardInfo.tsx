import '../styles/CardInfo.css';

type CardInfoProps = {
    closeCardInfo: () => void;
  }

export const CardInfo = ( {closeCardInfo } : CardInfoProps) => {
  return (
      <div className="CardInfo-Background">
        <div className="CardInfo">
            <h2 className="CardInfo-Header"> 
                Hero name 
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
                    src="https://ringsdb.com/bundles/cards/141002.png"
                    alt="A LOTR card" />
                </div>
                <div className="CardInfo-HeroDetails">
                    <h3> Hero info </h3>
                    <p>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
                    </p>
                </div>
            </div>
        </div>
    </div>
    
  );
}
