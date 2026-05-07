import "./App.css";
import Layout from "./components/Layout";
import HomePage from "./pages/HomePage";
import { DashboardPage } from "./pages/DashboardPage";
import RiddlePage from "./pages/RiddlePage";
import { Route, Routes } from "react-router-dom";

function App() {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/dashboard" element={<DashboardPage />} />
        <Route path="/riddle" element={<RiddlePage />} />
      </Routes>
    </Layout>
  );
}

export default App;
