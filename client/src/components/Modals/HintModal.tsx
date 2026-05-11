import { useState } from "react";
import "../../styles/goldenCard.css";
import "./HintModal.css";

type HintModalProps = {
  isOpen: boolean;
  onClose: () => void;
  onValidate: (transferCode: string) => boolean | Promise<boolean>;
};

function HintModal({ isOpen, onClose, onValidate }: HintModalProps) {
  const [transferCode, setTransferCode] = useState("");
  const [isValidating, setIsValidating] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  if (!isOpen) {
    return null;
  }

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const code = transferCode.trim();

    if (!code) {
      setErrorMessage("Please enter a transfer code.");
      return;
    }

    setIsValidating(true);
    setErrorMessage("");

    try {
      const isValid = await onValidate(code);

      if (isValid) {
        setTransferCode("");
        onClose();
      } else {
        setErrorMessage("That transfer code is not valid yet.");
      }
    } finally {
      setIsValidating(false);
    }
  };

  return (
    <div className="hint-modal__overlay" role="presentation" onClick={onClose}>
      <button
        type="button"
        className="hint-modal__close"
        aria-label="Close hint modal"
        onClick={onClose}
      >
        ×
      </button>

      <section
        className="golden-card"
        role="dialog"
        aria-modal="true"
        aria-labelledby="hint-modal-title"
        onClick={(event) => event.stopPropagation()}
      >
        <div className="golden-card__corner golden-card__corner--top-left" />
        <div className="golden-card__corner golden-card__corner--top-right" />
        <div className="golden-card__corner golden-card__corner--bottom-left" />
        <div className="golden-card__corner golden-card__corner--bottom-right" />

        <h2 id="hint-modal-title" className="golden-card__title">
          Enter transfer code
        </h2>

        <form className="hint-modal__form" onSubmit={handleSubmit}>
          <input
            className="app-input hint-modal__input"
            type="text"
            value={transferCode}
            onChange={(event) => setTransferCode(event.target.value)}
            placeholder="Transfer code"
          />
          <button
            className="app-btn app-btn--red hint-modal__button"
            type="submit"
            disabled={isValidating}
          >
            {isValidating ? "Validating..." : "Validate code"}
          </button>
        </form>

        {errorMessage && <p className="hint-modal__error">{errorMessage}</p>}
      </section>
    </div>
  );
}

export default HintModal;
