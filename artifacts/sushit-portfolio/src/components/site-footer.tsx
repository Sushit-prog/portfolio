function SiteFooter() {
  return (
    <footer className="flex flex-col justify-between gap-4 border-t border-[#8AFF57]/15 py-7 text-[10px] uppercase tracking-wider text-[#8AFF57]/35 sm:flex-row">
      <span>Sushit / AI Engineer</span>
      <span>built for systems that survive contact</span>
      <span>© {new Date().getFullYear()}</span>
    </footer>
  );
}

export default SiteFooter;
