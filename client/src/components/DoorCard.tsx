import "./DoorCard.css";
import doorImage from "../assets/DoorImg.svg";
import openDoorImage from "../assets/OpenDoorImg.svg";
import lockIcon from "../assets/Lock-locked.png";
import type { Door } from "../types";

type DoorCardProps = {
  door: Door;
  isUnlocked: boolean;
  onClick: () => void;
};

export function DoorCard({ door, isUnlocked, onClick }: DoorCardProps) {
  return (
    <article className="door-card">
      <div className="door-label">
        <h2>
          {door.difficulty.toUpperCase()} €{door.cost}
        </h2>
      </div>

      <div className={`door-image-wrapper ${isUnlocked ? "door-image-wrapper--unlocked" : ""}`}>
        <img
          className="door-image"
          src={isUnlocked ? openDoorImage : doorImage}
          alt={isUnlocked ? `${door.difficulty} door opened` : `${door.difficulty} door`}
        />
        {!isUnlocked && <div className="door-lock-ring"></div>}
        {!isUnlocked && <img className="door-lock" src={lockIcon} alt="locked" />}
      </div>

      <button className="door-button" type="button" onClick={onClick}>
        {isUnlocked ? "ESCAPE" : "UNLOCK"}
      </button>
    </article>
  );
}