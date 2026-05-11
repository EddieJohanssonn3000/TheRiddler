import { useLocation } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";
import "./Layout.css";

type Props = {
  children: React.ReactNode;
};

function Layout({ children }: Props) {
  const location = useLocation();
  const showFooter = location.pathname !== "/" && !location.pathname.startsWith("/riddle");
  const showHeader = location.pathname !== "/";

  return (
    <div className="layout-wrapper">
      {showHeader && <Header />}
      <main>{children}</main>
      {showFooter && <Footer />}
    </div>
  );
}

export default Layout;
