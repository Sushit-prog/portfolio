import { Link, useLocation } from "wouter";

const navItems = [
  { label: "home", path: "/", testId: "link-nav-home" },
  { label: "work", path: "/projects", testId: "link-nav-work" },
  { label: "about", path: "/about", testId: "link-nav-about" },
  { label: "experience", path: "/experience", testId: "link-nav-experience" },
  { label: "open source", path: "/opensource", testId: "link-nav-opensource" },
  { label: "contact", path: "/contact", testId: "link-nav-contact" },
];

function SiteHeader() {
  const [location] = useLocation();

  return (
    <header className="sticky top-0 z-40 border-b border-[#8AFF57]/15 bg-[#0A0F08]/90 backdrop-blur-md">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-6 px-5 py-4 sm:px-8">
        <Link
          href="/"
          data-testid="link-home"
          className="focus-ring flex shrink-0 items-center gap-3 text-sm font-semibold tracking-tight text-[#CAFF3C]"
        >
          <span className="flex h-7 w-7 items-center justify-center border border-[#8AFF57]/50 text-[11px]">
            S/
          </span>
          <span className="hidden sm:inline">
            sushit<span className="text-[#8AFF57]/45">.dev</span>
          </span>
        </Link>
        <nav
          aria-label="Main navigation"
          className="flex items-center gap-4 overflow-x-auto whitespace-nowrap text-[10px] uppercase tracking-[0.16em] text-[#8AFF57]/55 sm:gap-7"
        >
          {navItems.map((item) => {
            const active =
              item.path === "/"
                ? location === "/"
                : location.startsWith(item.path);
            return (
              <Link
                key={item.label}
                href={item.path}
                data-testid={item.testId}
                aria-current={active ? "page" : undefined}
                className={`focus-ring hover:text-[#CAFF3C] ${active ? "text-[#CAFF3C]" : ""}`}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>
      </div>
    </header>
  );
}

export default SiteHeader;
