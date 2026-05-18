import { useEffect, useState } from "react";
import { Navigate, useParams } from "react-router-dom";
import { riddles } from "../data/riddles";
import keyGold from "../assets/keygold.png";
import keyBlack from "../assets/keyblack.png";
import { HintModal, ResultModal } from "../components/Modals";
import Footer from "../components/Footer";
import type { Difficulty, Riddle } from "../types";
import "./RiddlePage.css";

function RiddlePage() {
  const { difficulty } = useParams();

  const [currentRiddle, setCurrentRiddle] = useState<Riddle | null>(null);
  const [answer, setAnswer] = useState("");
  const [isHintModalOpen, setIsHintModalOpen] = useState(false);
  const [isHintRevealed, setIsHintRevealed] = useState(false);
  const [feedback, setFeedback] = useState<{
    message: string;
    type: "success" | "error";
  } | null>(null);
  const [attempts, setAttempts] = useState(3);
  const [isResultModalOpen, setIsResultModalOpen] = useState(false);
  const [resultModalData, setResultModalData] = useState<{
    isCorrect: boolean;
    message: string;
    correctAnswer?: string;
    solvedDifficulty?: Difficulty;
  } | null>(null);

  useEffect(() => {
    const matchingRiddles = riddles.filter(
      (riddle) => riddle.difficulty === difficulty,
    );

    if (matchingRiddles.length === 0) {
      setCurrentRiddle(null);
      return;
    }

    const randomIndex = Math.floor(Math.random() * matchingRiddles.length);
    setCurrentRiddle(matchingRiddles[randomIndex]);
  }, [difficulty]);

  useEffect(() => {
    setAnswer("");
    setIsHintModalOpen(false);
    setIsHintRevealed(false);
    setFeedback(null);
    setAttempts(3);
    setIsResultModalOpen(false);
    setResultModalData(null);
  }, [currentRiddle?.id]);

  if (!difficulty || !["easy", "medium", "hard"].includes(difficulty)) {
    return <Navigate to="/escaperoom" replace />;
  }

  if (!currentRiddle) {
    return (
      <main className="riddle-page__wrapper">
        <p>Loading riddle...</p>
      </main>
    );
  }

  const handleRevealHint = (): void => {
    if (attempts <= 1) {
      return;
    }

    setAttempts((currentAttempts) => currentAttempts - 1);
    setIsHintRevealed(true);
    setIsHintModalOpen(false);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>): void => {
    event.preventDefault();

    const normalizedAnswer = answer.toLowerCase().trim();
    const normalizedCorrect = currentRiddle.answer.toLowerCase().trim();

    if (normalizedAnswer === normalizedCorrect) {
      setResultModalData({
        isCorrect: true,
        message: "Well done! You've solved the riddle!",
        solvedDifficulty: currentRiddle.difficulty,
      });

      setIsResultModalOpen(true);

      setFeedback({
        message: "Correct! Well done!",
        type: "success",
      });
    } else {
      const remainingAttempts = attempts - 1;
      setAttempts(remainingAttempts);

      if (remainingAttempts <= 0) {
        setResultModalData({
          isCorrect: false,
          message: "Game Over! You've run out of attempts.",
          correctAnswer: currentRiddle.answer,
        });

        setIsResultModalOpen(true);

        setFeedback({
          message: `Game Over! The correct answer is ${currentRiddle.answer}`,
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
    <div className="riddle-page__wrapper">
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

      <section className="riddle-scroll">
        <div className="riddle-scroll__content">
          <p className="riddle-card__question">{currentRiddle.question}</p>

          <form className="riddle-card__form" onSubmit={handleSubmit}>
            <input
              id="answer"
              type="text"
              className="app-input riddle-card__input"
              placeholder="Enter your answer..."
              value={answer}
              onChange={(event) => setAnswer(event.target.value)}
              disabled={attempts <= 0}
            />

            <button
              type="submit"
              className="app-btn app-btn--red"
              disabled={attempts <= 0}
            >
              Submit Answer
            </button>
          </form>

          {feedback && (
            <p
              className={`riddle-card__feedback riddle-card__feedback--${feedback.type}`}
            >
              {feedback.message}
            </p>
          )}

          {!isHintRevealed && attempts > 0 && (
            <button
              type="button"
              className="riddle-page__hint-trigger"
              onClick={() => setIsHintModalOpen(true)}
            >
              Need a hint?
            </button>
          )}
        </div>
      </section>

      <HintModal
        isOpen={isHintModalOpen}
        onClose={() => setIsHintModalOpen(false)}
        onConfirm={handleRevealHint}
        canBuyHint={attempts > 1}
      />

      {resultModalData && (
        <ResultModal
          isOpen={isResultModalOpen}
          isCorrect={resultModalData.isCorrect}
          message={resultModalData.message}
          correctAnswer={resultModalData.correctAnswer}
          solvedDifficulty={resultModalData.solvedDifficulty}
        />
      )}

      <section
        className={`riddle-page__hint-panel ${
          isHintRevealed ? "riddle-page__hint-panel--open" : ""
        }`}
        aria-live="polite"
      >
        <div className="riddle-page__hint-panel-inner">
          <p className="riddle-page__hint-text">{currentRiddle.hint}</p>
        </div>
      </section>

      <Footer />
    </div>
  );
}

export default RiddlePage;
