import "./Header.css";
import { useLocation } from "react-router-dom";
import theRiddlerLogo from "../../assets/TheRiddlerFontLogo.png";
import { StampDisplay } from "../StampDisplay";

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
  const playerName = window.sessionStorage.getItem("playerName");
  const headerLabel = getHeaderLabel(location.pathname);
  const isEscaperoom = location.pathname.startsWith("/escaperoom");

  // Show a single stamp in header after the first door is unlocked.
  // Check sessionStorage AND the navigation state (so stamp appears immediately
  // after returning from the ResultModal where `solvedDifficulty` is passed).
  const unlockedRaw = window.sessionStorage.getItem("unlockedDifficulties");
  const unlocked = unlockedRaw ? JSON.parse(unlockedRaw) : [];
  const navState =
    (location.state as { solvedDifficulty?: string } | null) ?? null;
  const hasAnyUnlock =
    (Array.isArray(unlocked) && unlocked.length > 0) ||
    Boolean(navState?.solvedDifficulty);

  return (
    <header
      className={`app-header ${isEscaperoom ? "app-header--escaperoom" : ""}`}
    >
      <div className="app-header__brand">
        <img
          src={theRiddlerLogo}
          alt="The Riddler"
          className="app-header__logo"
        />
      </div>

      <div className="app-header__stamp" aria-hidden={!hasAnyUnlock}>
        <StampDisplay isUnlocked={hasAnyUnlock} />
      </div>

      <div className="app-header__meta" aria-label="Current player">
        <div className="app-header__meta-top">
          <span className="app-header__meta-label">Player:</span>
          <span className="app-header__meta-value">{playerName ?? ""}</span>
        </div>

        <div className="app-header__room" aria-label="Current room">
          <span className="app-header__room-label">Location:</span>
          <span className="app-header__room-value">{headerLabel}</span>
        </div>
      </div>
    </header>
  );
}

export default Header;
