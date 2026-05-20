import leaveTheGameImage from "../../assets/LeaveTheGame.png";
import "./Footer.css";

function Footer() {
  return (
    <footer className="app-footer">
      <a
        href="https://frontend-main-1ac7.up.railway.app/"
        className="app-footer__link"
        aria-label="Leave the game and return to Tivoli"
      >
        <img
          src={leaveTheGameImage}
          alt="Leave the game"
          className="app-footer__image"
        />
      </a>
    </footer>
  );
}

export default Footer;
