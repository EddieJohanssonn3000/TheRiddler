import { useState } from "react";
import { DoorCard } from "../components/DoorCard";
import { doors } from "../data/doors";

export function DashboardPage() {
  const [selectedDoor, setSelectedDoor] = useState<number | null>(null);

  const handleDoorClick = (doorId: number) => {
    setSelectedDoor(doorId);

    console.log("Selected door:", doorId);
  };

  return (
    <main>
      <h1>The Riddler</h1>

      <section className="door-grid">
        {doors.map((door) => (
          <DoorCard
            key={door.id}
            door={door}
            onClick={() => handleDoorClick(door.id)}
          />
        ))}
      </section>

      {selectedDoor && (
        <p>Selected door: {selectedDoor}</p>
      )}
    </main>
  );
}