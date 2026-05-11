import "./LoadingPage.css";
import logo from "../assets/TheRiddleLogo.png";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function LoadingPage() {
  const navigate = useNavigate();

  useEffect(() => {
    const t = setTimeout(() => {
      navigate("/home", { replace: true });
    }, 2000);
    return () => clearTimeout(t);
  }, [navigate]);

  return (
    <main className="loading-page">
      <div className="loading-content">
        <img src={logo} alt="The Riddle" className="loading-logo" />
        <div className="loading-bar">
          <div className="loading-bar__progress" />
        </div>
      </div>
    </main>
  );
}
