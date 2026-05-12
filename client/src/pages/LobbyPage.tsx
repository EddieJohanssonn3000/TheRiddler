import { useNavigate } from "react-router-dom";
import keyGold from "../assets/keygold.png";
import lobbyDoor from "../assets/NewDoor.png";
import "./LobbyPage.css";

function LobbyPage() {
  const navigate = useNavigate();

  const playerName = window.sessionStorage.getItem("playerName");

  const handleEnterEscaperoom = (): void => {
    navigate("/escaperoom");
  };

  return (
    <main className="dashboard-lobby">
      <section className="dashboard-lobby__content">
        <section className="dashboard-lobby__info">
          <h1>Welcome, {playerName ?? "player"}</h1>

          <p>
            Behind every door hides a unique riddle
            that must be solved in order to escape. Each door has its own
            entrance fee, and every unlocked door rewards you with a collectible
            stamp.
          </p>

          <p>
            You can choose your own path through the game. Try to unlock a
            single door and escape early, or challenge yourself by solving every
            door in the room. Be careful — you only have three attempts per
            riddle before the door locks permanently.
          </p>

          <p>
            Solve all riddles, collect every stamp and key, and successfully
            escape through every door to claim the final grand prize of €5.
            Choose wisely, think carefully, and see if you have what it takes to
            escape them all.
          </p>

          <p>Click on the door to enter the room</p>

          <div className="dashboard-lobby__keys" aria-hidden="true">
            <img src={keyGold} alt="" className="dashboard-lobby__key" />
            <img src={keyGold} alt="" className="dashboard-lobby__key" />
            <img src={keyGold} alt="" className="dashboard-lobby__key" />
          </div>
        </section>

        <button
          type="button"
          className="dashboard-lobby__door"
          onClick={handleEnterEscaperoom}
          aria-label="Enter The Escaperoom"
        >
          <img
            src={lobbyDoor}
            alt="Enter The Escaperoom"
            className="dashboard-lobby__door-image"
          />

          <span className="dashboard-lobby__door-text">Enter the room</span>
        </button>
      </section>
    </main>
  );
}

export default LobbyPage;
