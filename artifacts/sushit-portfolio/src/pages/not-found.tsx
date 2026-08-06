import { Terminal } from "lucide-react";
import { Link } from "wouter";

import SiteFooter from "@/components/site-footer";
import SiteHeader from "@/components/site-header";

const routes = [
  { label: "home", path: "/" },
  { label: "work", path: "/projects" },
  { label: "about", path: "/about" },
  { label: "experience", path: "/experience" },
  { label: "open source", path: "/opensource" },
  { label: "contact", path: "/contact" },
];

function NotFound() {
  return (
    <div className="crt-lines terminal-grid min-h-[100dvh]">
      <SiteHeader />
      <main className="mx-auto max-w-6xl px-5 sm:px-8">
        <section className="grid min-h-[calc(100dvh-65px)] items-center py-20">
          <div className="terminal-panel max-w-2xl p-6 sm:p-10">
            <div className="mb-8 flex items-center justify-between border-b border-[#8AFF57]/15 pb-4 text-[10px] uppercase tracking-[0.18em] text-[#8AFF57]/40">
              <span className="flex items-center gap-2">
                <Terminal size={13} /> $ ls ~/routes
              </span>
              <span>status: 404</span>
            </div>
            <h1 className="text-3xl font-semibold tracking-[-0.06em] text-[#CAFF3C] text-glow sm:text-5xl">
              command not found
            </h1>
            <p className="mt-5 text-sm leading-7 text-[#d8e8ce]/70">
              No page at that route. Try one of the known ones:
            </p>
            <div className="mt-6 flex flex-wrap gap-2">
              {routes.map((route) => (
                <Link
                  key={route.path}
                  href={route.path}
                  data-testid={`link-404-${route.label.replace(/\s+/g, "-")}`}
                  className="border border-[#8AFF57]/15 bg-[#8AFF57]/[0.035] px-2 py-1 text-[10px] uppercase tracking-wide text-[#8AFF57]/60 transition-colors hover:border-[#8AFF57]/60 hover:text-[#CAFF3C]"
                >
                  {route.label}
                </Link>
              ))}
            </div>
            <div className="mt-8">
              <Link
                href="/"
                data-testid="link-404-home"
                className="focus-ring text-xs uppercase tracking-wider text-[#CAFF3C] hover:text-[#8AFF57]"
              >
                $ cd ~ → home
              </Link>
            </div>
          </div>
        </section>
      </main>
      <SiteFooter />
    </div>
  );
}

export default NotFound;
