import { Link } from "react-router-dom";
import "./Footer.css";

function Footer() {
  return (
    <footer className="app-footer">
      <Link to="/" className="app-footer__btn">
        Leave the game
      </Link>
    </footer>
  );
}

export default Footer;
