import type { Door } from "../types";

type DoorCardProps = {
  door: Door;
  onClick: () => void;
};

export function DoorCard({ door, onClick }: DoorCardProps) {
  return (
    <button type="button" onClick={onClick}>
      <h2>{door.difficulty.toUpperCase()}</h2>

      <p>Cost: €{door.cost}</p>

      <p>
        {door.isUnlocked ? "Unlocked" : "Locked"}
      </p>
    </button>
  );
}