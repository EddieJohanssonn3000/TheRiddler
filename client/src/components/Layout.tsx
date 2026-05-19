import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import Header from "./Header";
import Footer from "./Footer";
import "./Layout.css";

type Props = {
  children: React.ReactNode;
};

function Layout({ children }: Props) {
  const location = useLocation();
  const showHeader = location.pathname !== "/";
  const showFooter =
    location.pathname.startsWith("/escaperoom") ||
    location.pathname.startsWith("/lobby");

  useEffect(() => {
    const isRoom =
      location.pathname.startsWith("/escaperoom") ||
      location.pathname.startsWith("/riddle");
    if (isRoom) {
      document.body.classList.add("bg-room2");
    } else {
      document.body.classList.remove("bg-room2");
    }

    return () => {
      document.body.classList.remove("bg-room2");
    };
  }, [location.pathname]);

  return (
    <div className="layout-wrapper">
      {showHeader && <Header />}
      <main>{children}</main>
      {showFooter && <Footer />}
    </div>
  );
}

export default Layout;
