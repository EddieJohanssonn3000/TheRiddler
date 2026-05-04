import { useState, useEffect } from 'react'
import { api } from "./api";
import './App.css'

function App() {
  
  const [riddle, setRiddle] = useState<any>(null);

  useEffect(() => {
    api.get("/riddle").then(res => {
      setRiddle(res.data);
    });
  }, []);

  return (
    <div>
      <h1>Escape Room</h1>
      {riddle && (
        <>
          <p>{riddle.question}</p>
        </>
      )}
    </div>
  );
}

export default App;
