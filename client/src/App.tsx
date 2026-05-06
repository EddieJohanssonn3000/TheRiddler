import { DoorCard } from "./components/DoorCard";
import { doors } from "./data/doors";
import "./App.css";

function App() {
  return (
    <main>
      <h1>The Riddler</h1>

      <section>
        {doors.map((door) => (
          <DoorCard
            key={door.id}
            door={door}
            onClick={() => console.log("Clicked door:", door)}
          />
        ))}
      </section>
    </main>
  );
}

export default App;
