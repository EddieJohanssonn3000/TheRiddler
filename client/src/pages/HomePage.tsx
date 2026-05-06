import "../App.css";

import StartCodeForm from "../components/StartCodeForm";
import { Link } from "react-router-dom";

function HomePage() {
  return (
    <section>
      <h1>Step in to the Riddlers Escaperoom</h1>
      <StartCodeForm />
      <Link to="/dashboard">Go to dashboard</Link>
    </section>
  );
}

export default HomePage;
