import { useEffect, useRef } from "react";
import { ArrowUpRight } from "lucide-react";

import PageLayout from "@/components/page-layout";
import SectionKicker from "@/components/section-kicker";
import {
  opensourceRepos,
  type OSSEntry,
  type OSSRepo,
} from "@/lib/opensource-data";

function OSSEntryCard({
  entry,
  index,
  total,
}: {
  entry: OSSEntry;
  index: number;
  total: number;
}) {
  return (
    <article
      data-testid={`card-oss-${entry.id}`}
      className="oss-card-reveal group terminal-panel relative flex flex-col overflow-hidden p-5 transition-colors duration-200 hover:border-[#8AFF57]/60 sm:p-6"
    >
      <div className="absolute right-0 top-0 h-16 w-16 border-l border-b border-[#8AFF57]/10 bg-[#8AFF57]/[0.015] transition-colors group-hover:bg-[#8AFF57]/[0.05]" />
      <div>
        <div className="mb-6 flex items-start justify-between gap-4">
          <span className="font-mono text-[11px] text-[#8AFF57]/35">
            {String(index + 1).padStart(2, "0")} /{" "}
            {String(total).padStart(2, "0")}
          </span>
          <span className="text-right font-mono text-[10px] text-[#8AFF57]/45">
            {entry.ref}
          </span>
        </div>
        <h3 className="mb-5 text-lg font-semibold tracking-tight text-[#CAFF3C] text-glow sm:text-xl">
          {entry.title}
        </h3>
        <div className="space-y-4 text-xs leading-5">
          {entry.blocks.map((block, blockIndex) => (
            <div key={blockIndex}>
              {block.heading && (
                <div className="mb-2 text-[10px] uppercase tracking-wider text-[#CAFF3C]/85">
                  {block.heading}
                </div>
              )}
              <div className="space-y-3">
                <div>
                  <div className="mb-1 text-[10px] uppercase tracking-wider text-[#8AFF57]">
                    issue
                  </div>
                  <p className="text-[#d8e8ce]/60">{block.issue}</p>
                </div>
                <div>
                  <div className="mb-1 text-[10px] uppercase tracking-wider text-[#8AFF57]">
                    fix
                  </div>
                  <p className="text-[#d8e8ce]/60">{block.fix}</p>
                </div>
                {block.result && (
                  <div>
                    <div className="mb-1 text-[10px] uppercase tracking-wider text-[#8AFF57]">
                      result
                    </div>
                    <p className="text-[#d8e8ce]/60">{block.result}</p>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="mt-auto pt-6">
        <div className="flex flex-wrap gap-3">
          {entry.links.map((link) => (
            <a
              key={link.label}
              href={link.href}
              target="_blank"
              rel="noreferrer"
              data-testid={`link-oss-${entry.id}-${link.label.toLowerCase().replace(/\s+/g, "-")}`}
              className="focus-ring inline-flex items-center gap-2 border border-[#8AFF57]/35 px-4 py-3 text-xs uppercase tracking-wider text-[#CAFF3C] transition-colors hover:border-[#CAFF3C] hover:bg-[#CAFF3C]/10"
            >
              {link.label}
              <ArrowUpRight size={14} />
            </a>
          ))}
        </div>
      </div>
    </article>
  );
}

function OSSRepoGroup({ repo }: { repo: OSSRepo }) {
  return (
    <div
      data-testid={`group-repo-${repo.name.toLowerCase()}`}
      className="oss-repo-group"
    >
      <div className="mb-4 flex flex-wrap items-center gap-x-4 gap-y-2">
        <a
          href={repo.href}
          target="_blank"
          rel="noreferrer"
          data-testid={`link-repo-${repo.name.toLowerCase()}`}
          className="focus-ring inline-flex items-center gap-2 text-sm font-semibold tracking-tight text-[#CAFF3C] transition-colors hover:text-[#8AFF57]"
        >
          {repo.name}
          <ArrowUpRight size={14} />
        </a>
        <span className="font-mono text-[10px] text-[#8AFF57]/40">
          {repo.href.replace("https://github.com/", "github.com/")}
        </span>
        <span className="text-[10px] uppercase tracking-wider text-[#8AFF57]/40">
          {repo.note}
        </span>
      </div>
      <div className="grid gap-4 md:grid-cols-2">
        {repo.entries.map((entry, index) => (
          <OSSEntryCard
            key={entry.id}
            entry={entry}
            index={index}
            total={repo.entries.length}
          />
        ))}
      </div>
    </div>
  );
}

function OpenSourcePage() {
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let ctx: { revert: () => void } | undefined;
    let cancelled = false;

    (async () => {
      const [{ gsap }, { ScrollTrigger }] = await Promise.all([
        import("gsap"),
        import("gsap/ScrollTrigger"),
      ]);
      if (cancelled || !rootRef.current) {
        return;
      }
      gsap.registerPlugin(ScrollTrigger);

      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
        return;
      }

      ctx = gsap.context(() => {
        gsap.utils.toArray<HTMLElement>(".oss-repo-group").forEach((group) => {
          gsap.from(group.querySelectorAll(".oss-card-reveal"), {
            opacity: 0,
            y: 24,
            duration: 0.5,
            ease: "power2.out",
            stagger: 0.1,
            scrollTrigger: { trigger: group, start: "top 85%" },
          });
        });
      }, rootRef);
    })();

    return () => {
      cancelled = true;
      ctx?.revert();
    };
  }, []);

  return (
    <PageLayout>
      <section
        aria-labelledby="opensource-title"
        className="py-20 sm:py-28"
        ref={rootRef}
      >
        <SectionKicker command="$ git log --oneline --all" index="02" />
        <div className="mb-10 max-w-2xl">
          <h2
            id="opensource-title"
            className="text-2xl font-semibold tracking-[-0.04em] text-[#CAFF3C] sm:text-3xl"
          >
            Works in public.
          </h2>
          <p className="mt-3 text-sm leading-6 text-[#8AFF57]/55">
            Solo projects are one signal. Collaboration under someone
            else&apos;s review is another.
          </p>
        </div>

        <div className="space-y-14">
          {opensourceRepos.map((repo) => (
            <OSSRepoGroup key={repo.name} repo={repo} />
          ))}
        </div>
      </section>
    </PageLayout>
  );
}

export default OpenSourcePage;
