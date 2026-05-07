import { useState, useEffect } from "react";
import { riddles } from "../data/riddles";
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
      setFeedback({
        message: "Wrong answer. Try again!",
        type: "error",
      });
    }

    setAnswer("");
  };

  return (
    <section className="golden-card">
      <h1 className="golden-card__title">The Golden Riddle</h1>
      <p className="riddle-page__question">{currentRiddle.question}</p>

      <form className="riddle-page__form" onSubmit={handleSubmit}>
        <input
          id="answer"
          type="text"
          className="riddle-page__input"
          placeholder="Enter your answer..."
          value={answer}
          onChange={(e) => setAnswer(e.target.value)}
        />
        <button type="submit" className="riddle-page__button">
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
