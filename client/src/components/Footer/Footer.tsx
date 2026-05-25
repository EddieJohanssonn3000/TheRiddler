import leaveTheGameImage from "../../assets/LeaveTheGame.png";
import "./Footer.css";

function Footer() {
  return (
    <footer className="app-footer">
      <button
        type="button"
        className="app-footer__link"
        aria-label="Back to Loopland"
        onClick={() => {
          console.log("Footer: posting AMUSEMENT_CLOSE to parent");
          window.parent.postMessage({ type: "AMUSEMENT_CLOSE" }, "*");
        }}
      >
        <img
          src={leaveTheGameImage}
          alt="Leave the game"
          className="app-footer__image"
        />
      </button>
    </footer>
  );
}

export default Footer;
