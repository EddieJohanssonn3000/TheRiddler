import stampGold from "../assets/stamp-gold.png";
import "./StampDisplay.css";

type StampDisplayProps = {
  isUnlocked: boolean;
};

export function StampDisplay({ isUnlocked }: StampDisplayProps) {
  if (!isUnlocked) {
    return null;
  }

  return (
    <div className="stamp-display">
      <img
        src={stampGold}
        alt="stamp collected"
        className="stamp-display__image"
      />
      <p className="stamp-display__text">stamp collected</p>
    </div>
  );
}
