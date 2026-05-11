import { useLocation } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";
import "./Layout.css";

type Props = {
  children: React.ReactNode;
};

function Layout({ children }: Props) {
  const location = useLocation();
  const showFooter =
    location.pathname !== "/" && location.pathname !== "/riddle";

  return (
    <div className="layout-wrapper">
      <Header />
      <main>{children}</main>
      {showFooter && <Footer />}
    </div>
  );
}

export default Layout;
import { useLocation } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";
import "./Layout.css";

type Props = {
  children: React.ReactNode;
};

function Layout({ children }: Props) {
  const location = useLocation();
  const showFooter =
    location.pathname !== "/" && location.pathname !== "/riddle";

  return (
    <div className="layout-wrapper">
      <Header />
      <main>{children}</main>
      {showFooter && <Footer />}
    </div>
  );
}

export default Layout;
