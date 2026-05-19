import "../../styles/goldenCard.css";
import "./HintModal.css";

type HintModalProps = {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  canBuyHint: boolean;
};

function HintModal({ isOpen, onClose, onConfirm, canBuyHint }: HintModalProps) {
  if (!isOpen) {
    return null;
  }

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
        className="golden-card hint-modal__card"
        role="dialog"
        aria-modal="true"
        aria-labelledby="hint-modal-title"
        aria-describedby="hint-modal-description"
        onClick={(event) => event.stopPropagation()}
      >
        <div className="golden-card__corner golden-card__corner--top-left" />
        <div className="golden-card__corner golden-card__corner--top-right" />
        <div className="golden-card__corner golden-card__corner--bottom-left" />
        <div className="golden-card__corner golden-card__corner--bottom-right" />

        <h2 id="hint-modal-title" className="golden-card__title">
          Need a hint?
        </h2>

        <p id="hint-modal-description" className="hint-modal__text">
          Unlocking the archive will cost one key.
        </p>

        {!canBuyHint && (
          <p className="hint-modal__error">
            You need at least two keys left to unlock the archive.
          </p>
        )}

        <div className="hint-modal__actions">
          <button
            className="app-btn app-btn--red hint-modal__button"
            type="button"
            onClick={onConfirm}
            disabled={!canBuyHint}
          >
            Unlock archive
          </button>

          <button
            className="app-btn app-btn--white hint-modal__button"
            type="button"
            onClick={onClose}
          >
            Save my key
          </button>
        </div>
      </section>
    </div>
  );
}

export default HintModal;
