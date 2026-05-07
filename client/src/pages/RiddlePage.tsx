import { useState, useEffect } from "react";
import { riddles } from "../data/riddles";
import keyGold from "../assets/keygold.png";
import keyBlack from "../assets/keyblack.png";
import "../styles/goldenCard.css";
import "./RiddlePage.css";

function RiddlePage() {
  const [currentRiddle, setCurrentRiddle] = useState(
    riddles[Math.floor(Math.random() * riddles.length)],
  );
  const [answer, setAnswer] = useState("");
  const [feedback, setFeedback] = useState<{
    message: string;
    type: "success" | "error";
  } | null>(null);
  const [attempts, setAttempts] = useState(3);

  // Välj en gåta bara en gång när komponenten mountas
  useEffect(() => {
    setCurrentRiddle(riddles[Math.floor(Math.random() * riddles.length)]);
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Normalisera svaret (gemener, trim whitespace)
    const normalizedAnswer = answer.toLowerCase().trim();
    const normalizedCorrect = currentRiddle.answer.toLowerCase().trim();

    if (normalizedAnswer === normalizedCorrect) {
      setFeedback({
        message: "Correct! Well done!",
        type: "success",
      });
    } else {
      const remainingAttempts = attempts - 1;
      setAttempts(remainingAttempts);

      if (remainingAttempts <= 0) {
        setFeedback({
          message: "Game Over! No attempts remaining.",
          type: "error",
        });
      } else {
        setFeedback({
          message: "Wrong answer. Try again!",
          type: "error",
        });
      }
    }

    setAnswer("");
  };

  return (
    <section className="golden-card">
      {/* <h1 className="golden-card__title">The Golden Riddle</h1> */}

      <div className="riddle-page__attempts">
        <div className="riddle-page__keys">
          {[0, 1, 2].map((index) => (
            <img
              key={index}
              src={index < 3 - attempts ? keyBlack : keyGold}
              alt={index < 3 - attempts ? "Attempt lost" : "Attempt available"}
              className="riddle-page__key"
            />
          ))}
        </div>
        <p className="riddle-page__attempts-text">
          {attempts} attempt{attempts !== 1 ? "s" : ""} remaining
        </p>
      </div>

      <p className="riddle-page__question">{currentRiddle.question}</p>

      <form className="riddle-page__form" onSubmit={handleSubmit}>
        <input
          id="answer"
          type="text"
          className="riddle-page__input"
          placeholder="Enter your answer..."
          value={answer}
          onChange={(e) => setAnswer(e.target.value)}
          disabled={attempts <= 0}
        />
        <button
          type="submit"
          className="riddle-page__button"
          disabled={attempts <= 0}
        >
          Submit Answer
        </button>
      </form>

      {feedback && (
        <p
          className={`riddle-page__feedback riddle-page__feedback--${feedback.type}`}
        >
          {feedback.message}
        </p>
      )}
    </section>
  );
}

export default RiddlePage;
