import type { ReactNode } from "react";

import SiteHeader from "./site-header";
import SiteFooter from "./site-footer";

function PageLayout({ children }: { children: ReactNode }) {
  return (
    <div className="crt-lines terminal-grid min-h-[100dvh]">
      <SiteHeader />
      <main className="mx-auto max-w-6xl px-5 sm:px-8">{children}</main>
      <SiteFooter />
    </div>
  );
}

export default PageLayout;
