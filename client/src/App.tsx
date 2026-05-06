import { DoorCard } from "./components/DoorCard";
import { doors } from "./data/doors";
import "./App.css";
import Layout from "./components/Layout";

function App() {
  const handleDoorClick = (doorId: number) => {
    console.log("Clicked door:", doorId);
  };
  return (
    <Layout>
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
    </Layout>
  );
}

export default App;
