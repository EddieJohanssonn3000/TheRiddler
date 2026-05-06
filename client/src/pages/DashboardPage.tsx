import { DoorCard } from "../components/DoorCard";
import { doors } from "../data/doors";

export function DashboardPage() {
  const handleDoorClick = (doorId: number) => {
    console.log("Clicked door:", doorId);
  };

  return (
    <main>
      <h1>The Riddler</h1>

      <section>
        {doors.map((door) => (
          <DoorCard
            key={door.id}
            door={door}
            onClick={() => handleDoorClick(door.id)}
          />
        ))}
      </section>
    </main>
  );
}