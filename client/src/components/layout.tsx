import Header from "./Header";
import Footer from "./Footer";
import "./Layout.css";

type Props = {
  children: React.ReactNode;
};

function Layout({ children }: Props) {
  return (
    <div className="layout-wrapper">
      <Header />
      <main>{children}</main>
      <Footer />
    </div>
  );
}

export default Layout;
