type Props = {
  children: React.ReactNode;
};

function Layout({ children }: Props) {
  return (
    <>
      <header>THE RIDDLER</header>
      <main>{children}</main>
      <footer>
        <button>Leave the game</button>
      </footer>
    </>
  );
}

export default Layout;
