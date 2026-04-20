function PageShell({ title, children }) {
  return (
    <section className="page-shell">
      <h1 className="page-title">{title}</h1>
      {children}
    </section>
  );
}

export default PageShell;
