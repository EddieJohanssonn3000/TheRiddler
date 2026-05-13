import PlayerNameForm from "../components/PlayerNameForm";
// import { Link } from "react-router-dom";
import "../styles/goldenCard.css";

function HomePage() {
  return (
    <section className="golden-card golden-card--home">
      <span
        className="golden-card__corner golden-card__corner--top-left"
        aria-hidden="true"
      />
      <span
        className="golden-card__corner golden-card__corner--top-right"
        aria-hidden="true"
      />
      <span
        className="golden-card__corner golden-card__corner--bottom-left"
        aria-hidden="true"
      />
      <span
        className="golden-card__corner golden-card__corner--bottom-right"
        aria-hidden="true"
      />
      <h1 className="golden-card__title">Step in to the Riddlers Escaperoom</h1>
      <PlayerNameForm />
    </section>
  );
}

export default HomePage;
