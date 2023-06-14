function Layout({ children }: { children: React.ReactNode }) {
  return (
    <section>
      {/* Include shared UI here e.g. a header or sidebar */}
      <nav></nav>
      <p>Hi from cocktail layout component</p>

      {children}
    </section>
  );
}

export default Layout;
