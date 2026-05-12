import "./App.css";
import Layout from "./components/Layout";
import HomePage from "./pages/HomePage";
import LoadingPage from "./pages/LoadingPage";
import LobbyPage from "./pages/LobbyPage.tsx";
import EscaperoomPage from "./pages/EscaperoomPage.tsx";
import RiddlePage from "./pages/RiddlePage";
import { Route, Routes } from "react-router-dom";

import { useEffect } from "react";
import { saveIdentityTokenFromUrl } from "./utils/identityToken.ts";

// Tillfälligt så spelet resetar varje gång vi resetar sidan 

function App() {
  useEffect(() => {
    if (import.meta.env.DEV) {
      window.sessionStorage.removeItem("unlockedDifficulties");
      window.sessionStorage.removeItem("transactionId");
      window.sessionStorage.removeItem("stamp");
    }

    saveIdentityTokenFromUrl();
  }, []);

  return (
    <Layout>
      <Routes>
        <Route path="/" element={<LoadingPage />} />
        <Route path="/home" element={<HomePage />} />
        <Route path="/lobby" element={<LobbyPage />} />
        <Route path="/escaperoom" element={<EscaperoomPage />} />
        <Route path="/riddle/:difficulty" element={<RiddlePage />} />
      </Routes>
    </Layout>
  );
}

export default App;
