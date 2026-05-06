import { useState } from "react";

function StartCodeForm() {
  const [startCode, setStartCode] = useState("");
  const [message, setMessage] = useState("");

  function handleSubmit(event: React.FormEvent<HTMLFormElement>): void {
    event.preventDefault();

    if (startCode.trim() === "") {
      setMessage("Please enter a code.");
      return;
    }

    // Temporary mock until Centralbank API is ready
    setMessage("Code accepted. Welcome to The Riddler!");
  }

  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="start-code">Enter the code</label>

      <input
        id="start-code"
        type="text"
        value={startCode}
        onChange={(event) => setStartCode(event.target.value)}
      />

      <button type="submit">Lock in</button>

      {message && <p>{message}</p>}
    </form>
  );
}

export default StartCodeForm;
