import '../styles/MainView.css';
import { Header } from './Header';
import { CardView } from './CardView';
import { DeckSearch } from './DeckSearch';

export const MainView = () => {
  return (
    <div className="MainView">
        <Header/>
        <DeckSearch/>
        <CardView />
    </div>
  );
}
