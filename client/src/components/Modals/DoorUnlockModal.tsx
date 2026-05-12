import type { FormEvent } from "react";
import type { Door } from "../../types";
import "../../styles/goldenCard.css";
import "./DoorUnlockModal.css";

type DoorUnlockModalProps = {
  door: Door;
  validationMessage: string;
  onClose: () => void;
  onSubmit: (event: FormEvent<HTMLFormElement>) => void;
};

export function DoorUnlockModal({
  door,
  validationMessage,
  onClose,
  onSubmit,
}: DoorUnlockModalProps) {
  return (
    <div
      className="door-unlock-modal__overlay"
      role="presentation"
      onClick={onClose}
    >
      <section
        className="golden-card door-unlock-modal"
        role="dialog"
        aria-modal="true"
        aria-labelledby="door-unlock-modal-title"
        aria-describedby="door-unlock-modal-description"
        onClick={(event) => event.stopPropagation()}
      >
        <span
          className="golden-card__corner golden-card__corner--top-left"
          aria-hidden="true"
        />
        <span
          className="golden-card__corner golden-card__corner--top-right"
          aria-hidden="true"
        />
        <span
          className="golden-card__corner golden-card__corner--bottom-left"
          aria-hidden="true"
        />
        <span
          className="golden-card__corner golden-card__corner--bottom-right"
          aria-hidden="true"
        />

        <div className="door-unlock-modal__header">
          <h2 id="door-unlock-modal-title" className="golden-card__title">
            Unlock this gate
          </h2>

          <p
            id="door-unlock-modal-description"
            className="door-unlock-modal__description"
          >
            {door.difficulty.toUpperCase()} gate costs {door.cost}€.
          </p>
        </div>

        <form className="door-unlock-modal__form" onSubmit={onSubmit}>
          <button className="door-unlock-modal__button" type="submit">
            Pay {door.cost}€
          </button>

          {validationMessage && (
            <p className="door-unlock-modal__message">{validationMessage}</p>
          )}
        </form>

        <button
          className="door-unlock-modal__close"
          type="button"
          onClick={onClose}
        >
          Close
        </button>
      </section>
    </div>
  );
}
