import { Link } from "react-router-dom";
import "./Footer.css";

function Footer() {
  return (
    <footer className="app-footer">
      <Link to="/" className="app-btn app-btn--white">
        Leave the game
      </Link>
    </footer>
  );
}

export default Footer;
