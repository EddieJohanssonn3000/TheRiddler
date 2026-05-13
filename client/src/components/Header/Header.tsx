import "./Header.css";
import { useLocation, useNavigate } from "react-router-dom";
import theRiddlerLogo from "../../assets/TheRiddlerFontLogo.png";

function getHeaderLabel(pathname: string): string {
  if (pathname.startsWith("/riddle")) {
    return "Riddle room";
  }

  if (pathname.startsWith("/escaperoom")) {
    return "Escape room";
  }

  if (pathname.startsWith("/lobby")) {
    return "Lobby";
  }

  return "";
}

function Header() {
  const location = useLocation();
  const navigate = useNavigate();
  const playerName = window.sessionStorage.getItem("playerName");
  const headerLabel = getHeaderLabel(location.pathname);
  const isEscaperoom = location.pathname.startsWith("/escaperoom");

  const handleLogoClick = () => {
    navigate("/lobby");
  };

  return (
    <header className={`app-header ${isEscaperoom ? "app-header--escaperoom" : ""}`}>
      <button 
        className="app-header__brand" 
        onClick={handleLogoClick}
        type="button"
        aria-label="Go to lobby"
      >
        <img src={theRiddlerLogo} alt="The Riddler" className="app-header__logo" />
      </button>

      <div className="app-header__meta" aria-label="Current player">
        <div className="app-header__meta-top">
          {playerName ? (
            <>
              <span className="app-header__meta-label">Player:</span>
              <span className="app-header__meta-value">{playerName}</span>
            </>
          ) : null}
        </div>

        <div className="app-header__room" aria-label="Current room">
          Location: {headerLabel}
        </div>
      </div>
    </header>
  );
}

export default Header;
