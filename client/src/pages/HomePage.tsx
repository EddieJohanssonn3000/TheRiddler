import StartCodeForm from "../components/StartCodeForm";
// import { Link } from "react-router-dom";
import "./HomePage.css";

function HomePage() {
  return (
    <section className="home-page">
      <span
        className="home-page__corner home-page__corner--top-left"
        aria-hidden="true"
      />
      <span
        className="home-page__corner home-page__corner--top-right"
        aria-hidden="true"
      />
      <span
        className="home-page__corner home-page__corner--bottom-left"
        aria-hidden="true"
      />
      <span
        className="home-page__corner home-page__corner--bottom-right"
        aria-hidden="true"
      />
      <h1 className="home-page__title">Step in to the Riddlers Escaperoom</h1>
      <StartCodeForm />
      {/* <Link className="home-page__link" to="/dashboard">
        Go to dashboard
      </Link> */}
    </section>
  );
}

export default HomePage;
