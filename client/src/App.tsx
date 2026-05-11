import "./App.css";
import Layout from "./components/Layout";
import HomePage from "./pages/HomePage";
import LobbyPage from "./pages/LobbyPage.tsx";
import EscaperoomPage from "./pages/EscaperoomPage.tsx";
import RiddlePage from "./pages/RiddlePage";
import { Route, Routes } from "react-router-dom";

function App() {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/lobby" element={<LobbyPage />} />
        <Route path="/escaperoom" element={<EscaperoomPage />} />
        <Route path="/riddle/:difficulty" element={<RiddlePage />} />
      </Routes>
    </Layout>
  );
}

export default App;
