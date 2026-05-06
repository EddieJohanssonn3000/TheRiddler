import { DoorCard } from "./components/DoorCard";
import { doors } from "./data/doors";
import "./App.css";
import Layout from "./components/Layout";

function App() {
  return (
    <Layout>
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
    </Layout>
  );
}

export default App;
