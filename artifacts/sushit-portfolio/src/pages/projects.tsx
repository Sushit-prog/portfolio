import { useEffect, useRef, useState, type KeyboardEvent } from "react";
import { ArrowUpRight } from "lucide-react";

import PageLayout from "@/components/page-layout";
import SectionKicker from "@/components/section-kicker";
import { portfolioProjects, type PortfolioProject } from "@/lib/projects-data";

const stripStats: {
  value: string;
  num?: number;
  pad?: number;
  label: string;
}[] = [
  { value: "07", num: 7, pad: 2, label: "Projects Shipped" },
  { value: "03", num: 3, pad: 2, label: "PyPI Releases" },
  { value: "268", num: 268, label: "Tests, Top Project" },
  { value: "∞", label: "Bugs Found First" },
];

const formatNumber = (value: number) =>
  Number.isInteger(value) ? String(value) : value.toFixed(1);

function ProjectCard({
  project,
  index,
  expanded,
  onToggle,
}: {
  project: PortfolioProject;
  index: number;
  expanded: boolean;
  onToggle: () => void;
}) {
  const handleKeyDown = (event: KeyboardEvent<HTMLElement>) => {
    if (event.target !== event.currentTarget) {
      return;
    }
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      onToggle();
    }
  };

  return (
    <article
      data-testid={`card-project-${project.id}`}
      onClick={onToggle}
      onKeyDown={handleKeyDown}
      role="button"
      tabIndex={0}
      aria-expanded={expanded}
      aria-label={`View details for ${project.name}`}
      className="project-card-reveal group terminal-panel relative flex flex-col overflow-hidden p-5 transition-colors duration-200 hover:border-[#8AFF57]/60 focus-ring sm:p-6"
    >
      <div className="absolute right-0 top-0 h-16 w-16 border-l border-b border-[#8AFF57]/10 bg-[#8AFF57]/[0.015] transition-colors group-hover:bg-[#8AFF57]/[0.05]" />
      <div>
        <div className="mb-7 flex items-start justify-between gap-4">
          <span className="font-mono text-[11px] text-[#8AFF57]/35">
            {String(index + 1).padStart(2, "0")} /{" "}
            {String(portfolioProjects.length).padStart(2, "0")}
          </span>
          <span className="text-right text-[10px] uppercase tracking-wider text-[#8AFF57]/45">
            {expanded ? "$ less" : "$ more"}
          </span>
        </div>
        <h3 className="mb-3 text-lg font-semibold tracking-tight text-[#CAFF3C] text-glow sm:text-xl">
          {project.name}
        </h3>
        <p className="max-w-[52ch] text-sm leading-6 text-[#d8e8ce]/65">
          {project.pitch}
        </p>
        <div className="mt-6 flex items-baseline gap-3 border-l-2 border-[#CAFF3C] pl-4">
          {project.stats.map((stat) => (
            <span key={stat.label}>
              <span
                data-testid={`stat-project-${project.id}`}
                className="project-stat-value text-2xl text-[#CAFF3C]"
                data-value={stat.value}
                data-suffix={stat.suffix ?? ""}
              >
                {formatNumber(stat.value)}
                {stat.suffix ?? ""}
              </span>
              <span className="ml-3 text-[10px] uppercase tracking-wider text-[#8AFF57]/45">
                {stat.label}
              </span>
            </span>
          ))}
        </div>
        <p className="mt-4 text-xs leading-5 text-[#8AFF57]/55">
          proof: {project.proof}
        </p>
      </div>

      <div
        className={`grid transition-[grid-template-rows] duration-300 ${
          expanded ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
        }`}
      >
        <div className="min-h-0 overflow-hidden">
          <div className="mt-6 space-y-4 border-t border-[#8AFF57]/10 pt-5 text-xs leading-5">
            <div>
              <div className="mb-1.5 text-[10px] uppercase tracking-wider text-[#8AFF57]">
                problem
              </div>
              <p className="text-[#d8e8ce]/60">{project.problem}</p>
            </div>
            <div>
              <div className="mb-1.5 text-[10px] uppercase tracking-wider text-[#8AFF57]">
                how we built it
              </div>
              <p className="text-[#d8e8ce]/60">{project.how}</p>
            </div>
            {project.caveat && (
              <p className="italic text-[#8AFF57]/55">{project.caveat}</p>
            )}
          </div>
        </div>
      </div>

      <div className="mt-auto pt-8">
        <div className="mb-6 flex flex-wrap gap-2">
          {project.stack.map((item) => (
            <span
              key={item}
              className="border border-[#8AFF57]/15 bg-[#8AFF57]/[0.035] px-2 py-1 text-[10px] uppercase tracking-wide text-[#8AFF57]/60"
            >
              {item}
            </span>
          ))}
        </div>
        <div
          onClick={(event) => event.stopPropagation()}
          className="flex flex-wrap items-center gap-3"
        >
          {project.links.map((link) =>
            link.label === "PyPI" ? (
              <a
                key={link.label}
                href={link.href}
                target="_blank"
                rel="noreferrer"
                data-testid={`link-project-${project.id}-pypi`}
                className="focus-ring inline-flex items-center gap-1 text-[11px] uppercase tracking-wider text-[#8AFF57]/75 transition-colors hover:text-[#CAFF3C]"
              >
                PyPI
                <ArrowUpRight size={12} strokeWidth={1.5} />
              </a>
            ) : (
              <a
                key={link.label}
                href={link.href}
                target="_blank"
                rel="noreferrer"
                data-testid={`link-project-${project.id}-${link.label.toLowerCase()}`}
                className="focus-ring inline-flex items-center gap-2 border border-[#8AFF57]/35 px-4 py-3 text-xs uppercase tracking-wider text-[#CAFF3C] transition-colors hover:border-[#CAFF3C] hover:bg-[#CAFF3C]/10"
              >
                {link.label}
                <ArrowUpRight size={14} />
              </a>
            ),
          )}
        </div>
      </div>
    </article>
  );
}

function ProjectsPage() {
  const rootRef = useRef<HTMLDivElement>(null);
  const [expandedId, setExpandedId] = useState<string | null>(null);

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
        gsap.from(".projects-stats-strip", {
          opacity: 0,
          y: 14,
          duration: 0.5,
          ease: "power2.out",
          scrollTrigger: { trigger: ".projects-stats-strip", start: "top 88%" },
        });

        gsap.utils.toArray<HTMLElement>(".stat-count").forEach((el) => {
          const target = Number.parseFloat(el.dataset.value ?? "0");
          const pad = Number(el.dataset.pad ?? "0");
          const proxy = { value: 0 };
          el.textContent = pad > 0 ? "0".repeat(pad) : "0";
          gsap.to(proxy, {
            value: target,
            duration: 1.1,
            ease: "power2.out",
            scrollTrigger: { trigger: el, start: "top 92%" },
            onUpdate: () => {
              el.textContent =
                pad > 0
                  ? String(Math.round(proxy.value)).padStart(pad, "0")
                  : formatNumber(proxy.value);
            },
          });
        });

        gsap.from(".project-card-reveal", {
          opacity: 0,
          y: 24,
          duration: 0.5,
          ease: "power2.out",
          stagger: 0.1,
          scrollTrigger: { trigger: ".projects-grid", start: "top 85%" },
        });

        gsap.utils.toArray<HTMLElement>(".project-stat-value").forEach((el) => {
          const target = Number.parseFloat(el.dataset.value ?? "0");
          const suffix = el.dataset.suffix ?? "";
          const proxy = { value: 0 };
          el.textContent = target % 1 === 0 ? "0" : "0.0";
          gsap.to(proxy, {
            value: target,
            duration: 1.1,
            ease: "power2.out",
            scrollTrigger: { trigger: el, start: "top 92%" },
            onUpdate: () => {
              el.textContent = formatNumber(proxy.value) + suffix;
            },
          });
        });
      }, rootRef);
    })();

    return () => {
      cancelled = true;
      ctx?.revert();
    };
  }, []);

  const toggle = (id: string) =>
    setExpandedId((current) => (current === id ? null : id));

  return (
    <PageLayout>
      <section
        aria-labelledby="work-title"
        className="py-20 sm:py-28"
        ref={rootRef}
      >
        <SectionKicker
          command="$ cat projects.json | jq '.projects[]'"
          index="01"
        />
        <div className="mb-10 max-w-2xl">
          <h2
            id="work-title"
            className="text-2xl font-semibold tracking-[-0.04em] text-[#CAFF3C] sm:text-3xl"
          >
            Systems, ordered by strength of proof.
          </h2>
          <p className="mt-3 text-sm leading-6 text-[#8AFF57]/55">
            Every entry below is tested, adversarially reviewed, and — where it
            ships — published.
          </p>
        </div>

        <div className="projects-stats-strip grid grid-cols-2 gap-px border border-[#8AFF57]/15 bg-[#8AFF57]/15 sm:grid-cols-4">
          {stripStats.map((stat) => (
            <div key={stat.label} className="bg-[#0A0F08] px-4 py-5 sm:px-6">
              {stat.num !== undefined ? (
                <div
                  data-testid={`stat-strip-${stat.label.split(",")[0].toLowerCase().replace(/\s+/g, "-")}`}
                  className="stat-count text-2xl text-[#CAFF3C]"
                  data-value={stat.num}
                  data-pad={stat.pad ?? 0}
                >
                  {stat.value}
                </div>
              ) : (
                <div className="text-2xl text-[#CAFF3C]">{stat.value}</div>
              )}
              <div className="mt-2 text-[10px] uppercase tracking-wider text-[#8AFF57]/45">
                {stat.label}
              </div>
            </div>
          ))}
        </div>

        <div className="projects-grid mt-14 grid gap-4 md:grid-cols-2">
          {portfolioProjects.map((project, index) => (
            <ProjectCard
              key={project.id}
              project={project}
              index={index}
              expanded={expandedId === project.id}
              onToggle={() => toggle(project.id)}
            />
          ))}
        </div>
      </section>
    </PageLayout>
  );
}

export default ProjectsPage;
