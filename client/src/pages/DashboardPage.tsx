import { useState } from "react";
import { DoorCard } from "../components/DoorCard";
import { doors } from "../data/doors";
import "./DashBoardPage.css"

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
            <section className="dashboard-intro">
              <h1>Choose your fate</h1>

              <p>
                Unlock the doors by solving the
                riddle behind every door
              </p>
            </section>

            <section className="centralbank-info">
              <h2>Centralbank</h2>

              <p>
                Every door has its price, follow
                the link to the centralbank and
                take out the amount you need:
              </p>

            </section>

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