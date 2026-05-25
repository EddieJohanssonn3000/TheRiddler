import { useNavigate } from "react-router-dom";
import type { Difficulty } from "../../types";
import "../../styles/goldenCard.css";
import "./ResultModal.css";
import stampGold from "../../assets/stamp-gold.png";

type ResultModalProps = {
  isOpen: boolean;
  isCorrect: boolean;
  message: string;
  correctAnswer?: string;
  solvedDifficulty?: Difficulty;
  hasCompletedGame?: boolean;
  showStampMessage?: boolean;
};

function ResultModal({
  isOpen,
  isCorrect,
  message,
  correctAnswer,
  solvedDifficulty,
  hasCompletedGame = false,
  showStampMessage = false,
}: ResultModalProps) {
  const navigate = useNavigate();

  if (!isOpen) {
    return null;
  }

  const handleBackToDoors = (): void => {
    if (hasCompletedGame) {
      sessionStorage.removeItem("unlockedDifficulties");
      sessionStorage.removeItem("solvedDifficulties");
      sessionStorage.removeItem("transactionId");
      sessionStorage.removeItem("stamp");
      sessionStorage.removeItem("hasReceivedPayout");
      sessionStorage.removeItem("hasCompletedGame");

      navigate("/escaperoom", { replace: true });
      return;
    }

    navigate("/escaperoom", {
      state: isCorrect ? { solvedDifficulty } : undefined,
    });
  };

  const title = hasCompletedGame
    ? "CONGRATS!"
    : isCorrect
      ? "YOU SOLVED THE RIDDLE"
      : "Incorrect";

  const buttonText = hasCompletedGame ? "Play Again" : "Back to Doors";

  return (
    <div className="result-modal__overlay" role="presentation">
      <button
        type="button"
        className="result-modal__close"
        aria-label="Close result modal"
        onClick={handleBackToDoors}
      >
        ×
      </button>

      <section
        className="golden-card result-modal__card"
        role="dialog"
        aria-modal="true"
        aria-labelledby="result-modal-title"
      >
        <div className="golden-card__corner golden-card__corner--top-left" />
        <div className="golden-card__corner golden-card__corner--top-right" />
        <div className="golden-card__corner golden-card__corner--bottom-left" />
        <div className="golden-card__corner golden-card__corner--bottom-right" />

        <h2
          id="result-modal-title"
          className={`golden-card__title result-modal__title result-modal__title--${
            isCorrect ? "success" : "error"
          }`}
        >
          {title}
        </h2>

        <div className="result-modal__content">
          <p className="result-modal__message">{message}</p>

          {isCorrect && showStampMessage && (
            <div className="result-modal__stamp-container">
              <img
                src={stampGold}
                alt="stamp"
                className="result-modal__stamp-image"
              />

              <p className="result-modal__stamp">You have collected a stamp</p>
            </div>
          )}

          {correctAnswer && (
            <p className="result-modal__answer">
              <strong>Correct answer:</strong> {correctAnswer}
            </p>
          )}
        </div>

        <button
          type="button"
          className="app-btn app-btn--red result-modal__button"
          onClick={handleBackToDoors}
        >
          {buttonText}
        </button>
      </section>
    </div>
  );
}

export default ResultModal;
