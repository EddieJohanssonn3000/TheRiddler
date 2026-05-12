import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./PlayerNameForm.css";

function PlayerNameForm() {
  const [playerName, setPlayerName] = useState("");

  const navigate = useNavigate();

  function handleSubmit(event: React.FormEvent<HTMLFormElement>): void {
    event.preventDefault();

    const trimmedName = playerName.trim();

    if (!trimmedName) {
      return;
    }

    window.sessionStorage.setItem("playerName", trimmedName);

    navigate("/lobby");
  }

  return (
    <form className="player-name-form" onSubmit={handleSubmit}>
      <div className="player-name-form__content">
        <label className="player-name-form__label" htmlFor="player-name">
          Enter your name
        </label>

        <input
          className="app-input player-name-form__input"
          id="player-name"
          type="text"
          value={playerName}
          onChange={(event) => setPlayerName(event.target.value)}
          autoComplete="name"
          aria-label="Player name"
        />

        <button
          className="app-btn app-btn--red player-name-form__button"
          type="submit"
        >
          Lock in
        </button>
      </div>
    </form>
  );
}

export default PlayerNameForm;
