import { Activity, FileText, Github, Mail } from "lucide-react";

import PageLayout from "@/components/page-layout";
import SectionKicker from "@/components/section-kicker";

function ContactPage() {
  return (
    <PageLayout>
      <section aria-labelledby="contact-title" className="py-20 sm:py-28">
        <SectionKicker command="$ mail sushit" index="06" />
        <div className="terminal-panel relative overflow-hidden p-6 sm:p-10">
          <div className="absolute -right-12 -top-20 h-64 w-64 rounded-full border border-[#8AFF57]/10" />
          <div className="absolute -right-2 -top-10 h-44 w-44 rounded-full border border-[#8AFF57]/10" />
          <div className="relative max-w-2xl">
            <h2
              id="contact-title"
              className="text-3xl font-semibold tracking-[-0.06em] text-[#CAFF3C] text-glow sm:text-5xl"
            >
              Let&apos;s make the
              <br />
              failure modes legible.
            </h2>
            <p className="mt-6 max-w-xl text-sm leading-7 text-[#d8e8ce]/65">
              Looking for AI Engineering internships and entry-level AI
              Infrastructure roles where reliability is part of the product, not
              an afterthought.
            </p>
            <div className="mt-9 flex flex-wrap gap-3">
              <a
                href="mailto:sushit@example.com"
                data-testid="link-email-contact"
                className="focus-ring inline-flex items-center gap-2 border border-[#CAFF3C] bg-[#CAFF3C] px-4 py-3 text-xs uppercase tracking-wider text-[#0A0F08] transition-colors hover:bg-[#8AFF57]"
              >
                <Mail size={15} /> send a note
              </a>
              <a
                href="https://github.com/Sushit-prog"
                target="_blank"
                rel="noreferrer"
                data-testid="link-github-contact"
                className="focus-ring inline-flex items-center gap-2 border border-[#8AFF57]/35 px-4 py-3 text-xs uppercase tracking-wider text-[#CAFF3C] hover:border-[#CAFF3C]"
              >
                <Github size={15} /> inspect the work
              </a>
            </div>
            <div className="mt-9 flex flex-wrap gap-x-6 gap-y-3 text-[10px] uppercase tracking-wider text-[#8AFF57]/45">
              <span>
                <FileText className="mr-1 inline" size={12} /> resume available
                on request
              </span>
              <span>
                <Activity className="mr-1 inline" size={12} /> response channel:
                open
              </span>
            </div>
          </div>
        </div>
      </section>
    </PageLayout>
  );
}

export default ContactPage;
