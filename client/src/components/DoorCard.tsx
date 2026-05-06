import "./DoorCard.css";
import doorImage from "../assets/DoorImg.svg";
import type { Door } from "../types";

type DoorCardProps = {
  door: Door;
  onClick: () => void;
};

export function DoorCard({ door, onClick }: DoorCardProps) {
  return (
    <article className="door-card">
      <div className="door-label">
        <h2>
          {door.difficulty.toUpperCase()} €{door.cost}
        </h2>
      </div>

      <div className="door-image-wrapper">
        <img
          className="door-image"
          src={doorImage}
          alt={`${door.difficulty} door`}
        />
      </div>

      <button
        className="door-button"
        type="button"
        onClick={onClick}
      >
        UNLOCK
      </button>
    </article>
  );
}