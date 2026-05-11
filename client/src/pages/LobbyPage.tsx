import { useNavigate } from "react-router-dom";
import lobbyDoor from "../assets/NewDoor.png";
import "./LobbyPage.css";

function LobbyPage() {
  const navigate = useNavigate();

  const handleEnterEscaperoom = () => {
    navigate("/escaperoom");
  };

  return (
    <main className="dashboard-lobby">
      <section className="dashboard-lobby__content">
        <section className="dashboard-lobby__info">
          <h1>Choose your fate</h1>
          <p>
            Read the rules, check the centralbank, and prepare before you step
            into The Escaperoom.
          </p>
          <p>
            Every door has its own price. Solve all riddles, collect every key,
            and claim the winning prize of 5€.
          </p>
          <p>
            When you are ready, enter through the door on the right to begin.
          </p>
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
