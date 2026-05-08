import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./StartCodeForm.css";

function StartCodeForm() {
  const [startCode, setStartCode] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  function handleSubmit(event: React.FormEvent<HTMLFormElement>): void {
    event.preventDefault();

    if (startCode.trim() === "") {
      setMessage("Please enter a code.");
      return;
    }

    // Temporary mock until Centralbank API is ready
    setMessage("Code accepted. Welcome to The Riddler!");

    // Redirect to dashboard after successful code verification
    navigate("/dashboard");
  }

  return (
    <form className="start-code-form" onSubmit={handleSubmit}>
      <label className="start-code-form__label" htmlFor="start-code">
        Enter the code
      </label>

      <input
        className="app-input start-code-form__input"
        id="start-code"
        type="text"
        value={startCode}
        onChange={(event) => setStartCode(event.target.value)}
      />

      <button className="app-btn app-btn--red" type="submit">
        Lock in
      </button>

      {message && <p className="start-code-form__message">{message}</p>}
    </form>
  );
}

export default StartCodeForm;
