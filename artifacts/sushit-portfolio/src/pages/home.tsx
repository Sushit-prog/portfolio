import { useMemo, useState } from "react";
import {
  Activity,
  ArrowUpRight,
  FileText,
  GitPullRequest,
  Github,
  Mail,
  MapPin,
  Terminal,
} from "lucide-react";
import { Link } from "wouter";

import ProjectCard from "@/components/project-card";
import ProjectModal from "@/components/project-modal";
import SectionKicker from "@/components/section-kicker";
import SiteFooter from "@/components/site-footer";
import SiteHeader from "@/components/site-header";
import TerminalCli from "@/components/terminal-cli";
import { projects, type Pillar, type Project } from "@/lib/projects";

const stats: [string, string][] = [
  ["11", "systems listed"],
  ["02", "engineering pillars"],
  ["01", "PyPI release"],
  ["∞", "failure modes to find"],
];

const otherWork: [string, string][] = [
  [
    "iNeuBytes — AI/ML Engineering Internship",
    "Netflix dataset analysis, AAPL stock price prediction, and heart disease prediction models",
  ],
  ["Thiranex — Data Science Internship", "Description to be added."],
];

const contributions: [string, string, string][] = [
  ["LiteLLM", "parallel request limiter logic", "merged upstream"],
  ["marimo", "PR #9302", "open source contribution"],
  ["Onyx", "PR #10005", "open source contribution"],
];

function HomePage() {
  const [activePillar, setActivePillar] = useState<"all" | Pillar>("all");
  const [showAll, setShowAll] = useState(false);
  const [activeProject, setActiveProject] = useState<Project | null>(null);
  const visibleProjects = useMemo(() => {
    const filtered =
      activePillar === "all"
        ? projects
        : projects.filter((project) => project.pillar === activePillar);
    return showAll ? filtered : filtered.filter((project) => project.featured);
  }, [activePillar, showAll]);

  const filterProjects = (pillar: "all" | Pillar) => {
    setActivePillar(pillar);
    setShowAll(false);
  };

  return (
    <div className="crt-lines terminal-grid min-h-[100dvh] overflow-hidden">
      <SiteHeader />
      <main className="mx-auto max-w-6xl px-5 sm:px-8">
        <div id="top">
          <section
            aria-labelledby="intro-title"
            className="relative grid min-h-[calc(100dvh-65px)] items-center py-20 sm:py-28 lg:grid-cols-[1.12fr_.88fr] lg:gap-16"
          >
            <div className="absolute -left-40 top-32 h-72 w-72 rounded-full bg-[#8AFF57]/[0.025] blur-3xl" />
            <div className="relative">
              <div className="reveal mb-7 flex items-center gap-3 text-xs text-[#8AFF57]/65">
                <span className="inline-block h-2 w-2 rounded-full bg-[#8AFF57] shadow-[0_0_12px_rgba(138,255,87,.65)]" />
                <span>available for AI engineering roles</span>
              </div>
              <div className="reveal reveal-delay-1 terminal-panel max-w-3xl p-5 sm:p-8">
                <div className="mb-8 flex items-center justify-between border-b border-[#8AFF57]/15 pb-4 text-[10px] uppercase tracking-[0.18em] text-[#8AFF57]/40">
                  <span className="flex items-center gap-2">
                    <Terminal size={13} /> zsh — sushit@local
                  </span>
                  <span>status: 0</span>
                </div>
                <div className="space-y-5 text-sm leading-7 sm:text-base">
                  <p className="text-[#8AFF57]/55">
                    <span className="text-[#CAFF3C]">$</span> whoami
                  </p>
                  <h1
                    id="intro-title"
                    className="text-3xl font-semibold tracking-[-0.06em] text-[#CAFF3C] text-glow sm:text-5xl lg:text-[4.35rem] lg:leading-[1.05]"
                  >
                    Sushit —<br />
                    AI Engineer
                    <span className="cursor-blink ml-2 inline-block text-[#8AFF57]">
                      ▋
                    </span>
                  </h1>
                  <p className="max-w-2xl border-l-2 border-[#CAFF3C] pl-4 text-sm leading-7 text-[#e2f1d8]/78 sm:text-base">
                    Building reliability and safety tooling for LLM systems,
                    plus agentic systems that can be inspected, tested, and
                    trusted.
                  </p>
                  <p className="pt-1 text-[#8AFF57]/55">
                    <span className="text-[#CAFF3C]">$</span> cat focus.txt
                  </p>
                  <div className="flex flex-wrap gap-x-6 gap-y-2 text-xs text-[#8AFF57]/70">
                    <span>[ infra / eval / reliability ]</span>
                    <span>[ agentic systems ]</span>
                  </div>
                </div>
              </div>
              <div className="reveal reveal-delay-2 mt-8 flex flex-wrap items-center gap-x-5 gap-y-4">
                <a
                  href="https://github.com/Sushit-prog"
                  target="_blank"
                  rel="noreferrer"
                  data-testid="link-github-hero"
                  className="focus-ring inline-flex items-center gap-2 border border-[#8AFF57]/35 px-4 py-3 text-xs uppercase tracking-wider text-[#CAFF3C] transition-colors hover:border-[#CAFF3C] hover:bg-[#CAFF3C]/10"
                >
                  <Github size={15} /> GitHub
                </a>
                <a
                  href="https://huggingface.co/Pakrashy"
                  target="_blank"
                  rel="noreferrer"
                  data-testid="link-huggingface-hero"
                  className="focus-ring text-xs uppercase tracking-wider text-[#8AFF57]/70 hover:text-[#CAFF3C]"
                >
                  Hugging Face{" "}
                  <ArrowUpRight className="ml-1 inline" size={13} />
                </a>
                <Link
                  href="/contact"
                  data-testid="link-resume-hero"
                  className="focus-ring text-xs uppercase tracking-wider text-[#8AFF57]/70 hover:text-[#CAFF3C]"
                >
                  Resume / CV <ArrowUpRight className="ml-1 inline" size={13} />
                </Link>
              </div>
            </div>
            <aside
              className="reveal reveal-delay-3 mt-16 lg:mt-0"
              aria-label="Current signal"
            >
              <div className="mb-5 text-[10px] uppercase tracking-[0.2em] text-[#8AFF57]/40">
                // current_signal
              </div>
              <div className="space-y-0 border-y border-[#8AFF57]/15">
                <div className="grid grid-cols-[1fr_auto] gap-6 border-b border-[#8AFF57]/10 py-5">
                  <span className="text-xs text-[#8AFF57]/50">location</span>
                  <span className="text-right text-xs text-[#dff6d2]/80">
                    <MapPin className="mr-1 inline" size={12} /> India
                    (remote-friendly)
                  </span>
                </div>
                <div className="grid grid-cols-[1fr_auto] gap-6 border-b border-[#8AFF57]/10 py-5">
                  <span className="text-xs text-[#8AFF57]/50">education</span>
                  <span className="max-w-[180px] text-right text-xs leading-5 text-[#dff6d2]/80">
                    B.Tech, ECE
                  </span>
                </div>
                <div className="grid grid-cols-[1fr_auto] gap-6 border-b border-[#8AFF57]/10 py-5">
                  <span className="text-xs text-[#8AFF57]/50">
                    last deployment
                  </span>
                  <span className="max-w-[210px] text-right text-xs leading-5 text-[#dff6d2]/80">
                    AI/ML Engineering — iNeuBytes
                    <br />
                    <span className="text-[#8AFF57]/55">
                      Data Science — Thiranex
                    </span>
                  </span>
                </div>
                <div className="grid grid-cols-[1fr_auto] gap-6 py-5">
                  <span className="text-xs text-[#8AFF57]/50">thesis</span>
                  <span className="max-w-[180px] text-right text-xs leading-5 text-[#CAFF3C]">
                    make failure
                    <br />
                    observable
                  </span>
                </div>
              </div>
              <div className="mt-6 flex items-center gap-3 text-[10px] uppercase tracking-wider text-[#8AFF57]/40">
                <span className="pulse-line h-px w-12 bg-[#8AFF57]" />
                shipping systems, not demos
              </div>
            </aside>
          </section>
        </div>

        <section
          id="about"
          aria-labelledby="about-title"
          className="border-t border-[#8AFF57]/15 py-20 sm:py-28"
        >
          <SectionKicker command="$ sed -n '1,80p' about.md" index="01" />
          <div className="grid gap-10 lg:grid-cols-[.8fr_1.2fr] lg:gap-24">
            <h2
              id="about-title"
              className="text-2xl font-semibold tracking-[-0.04em] text-[#CAFF3C] sm:text-3xl"
            >
              An engineer for the
              <br />
              <span className="text-[#8AFF57]/55">
                uncomfortable edge cases.
              </span>
            </h2>
            <div className="max-w-2xl space-y-5 text-sm leading-7 text-[#d8e8ce]/70">
              <p>
                I am Sushit, a fresher-level AI Engineer focused on the layer
                where language models meet real systems: bounded execution,
                regression signals, observability, and useful failure modes.
              </p>
              <p>
                Early in my career, but not early-stage in how I work — I ship
                tools people actually use, contribute to real open-source
                projects, and treat every build like it has to survive contact
                with production. I move fast with AI-assisted workflows and hold
                the output to standards that would pass review at a serious
                engineering org.
              </p>
              <p className="text-[#8AFF57]/75">
                <span className="text-[#CAFF3C]">&gt;</span> I use coding agents
                as force multipliers, then hold the output to open-source-grade
                standards.
              </p>
            </div>
          </div>
          <div className="mt-14 grid grid-cols-2 gap-px border border-[#8AFF57]/15 bg-[#8AFF57]/15 sm:grid-cols-4">
            {stats.map(([value, label]) => (
              <div key={label} className="bg-[#0A0F08] px-4 py-5 sm:px-6">
                <div className="text-2xl text-[#CAFF3C]">{value}</div>
                <div className="mt-2 text-[10px] uppercase tracking-wider text-[#8AFF57]/45">
                  {label}
                </div>
              </div>
            ))}
          </div>
        </section>

        <section
          id="work"
          aria-labelledby="work-title"
          className="border-t border-[#8AFF57]/15 py-20 sm:py-28"
        >
          <SectionKicker
            command="$ cat projects.json | jq '.projects[]'"
            index="02"
          />
          <div className="mb-10 flex flex-col justify-between gap-7 lg:flex-row lg:items-end">
            <div>
              <h2
                id="work-title"
                className="text-2xl font-semibold tracking-[-0.04em] text-[#CAFF3C] sm:text-3xl"
              >
                Selected systems
              </h2>
              <p className="mt-3 max-w-xl text-sm leading-6 text-[#8AFF57]/55">
                Tools for making LLM behavior safer to ship — from the request
                boundary to the agent runtime.
              </p>
            </div>
            <div
              role="group"
              aria-label="Filter projects"
              className="flex flex-wrap gap-2"
            >
              {(
                [
                  "all",
                  "Infra / Eval / Reliability",
                  "Agentic Systems",
                ] as const
              ).map((pillar) => (
                <button
                  key={pillar}
                  type="button"
                  onClick={() => filterProjects(pillar)}
                  data-testid={`button-filter-${pillar === "all" ? "all" : pillar === "Infra / Eval / Reliability" ? "reliability" : "agents"}`}
                  aria-pressed={activePillar === pillar}
                  className={`focus-ring border px-3 py-2 text-[10px] uppercase tracking-wider transition-colors ${activePillar === pillar ? "border-[#CAFF3C] bg-[#CAFF3C] text-[#0A0F08]" : "border-[#8AFF57]/20 text-[#8AFF57]/55 hover:border-[#8AFF57]/60 hover:text-[#CAFF3C]"}`}
                >
                  {pillar === "all"
                    ? "all systems"
                    : pillar === "Infra / Eval / Reliability"
                      ? "infra / eval"
                      : "agentic"}
                </button>
              ))}
            </div>
          </div>
          <div className="grid gap-4 md:grid-cols-2">
            {visibleProjects.map((project, index) => (
              <ProjectCard
                key={project.id}
                project={project}
                index={index}
                onSelect={setActiveProject}
              />
            ))}
          </div>
          <div className="mt-8 flex justify-center">
            <button
              type="button"
              onClick={() => setShowAll((value) => !value)}
              data-testid="button-toggle-projects"
              className="focus-ring border-b border-[#8AFF57]/40 pb-2 text-[11px] uppercase tracking-[0.16em] text-[#8AFF57]/70 hover:border-[#CAFF3C] hover:text-[#CAFF3C]"
            >
              {showAll ? "$ show featured only" : "$ cat all-projects"}
            </button>
          </div>
        </section>

        <section
          aria-labelledby="other-work-title"
          className="border-t border-[#8AFF57]/10 py-14 sm:py-18"
        >
          <SectionKicker command="$ cat other-work.txt" index="03" />
          <div className="mb-7">
            <h2
              id="other-work-title"
              className="text-xl font-semibold tracking-[-0.04em] text-[#CAFF3C] sm:text-2xl"
            >
              Other Work
            </h2>
            <p className="mt-2 text-xs leading-6 text-[#8AFF57]/45">
              Earlier signals from the path into AI Engineering.
            </p>
          </div>
          <div className="max-w-4xl border-y border-[#8AFF57]/10">
            {otherWork.map(([title, description], index) => (
              <div
                key={title}
                data-testid={`row-other-work-${index}`}
                className="grid gap-2 border-b border-[#8AFF57]/10 py-4 last:border-0 sm:grid-cols-[minmax(220px,.7fr)_1.3fr] sm:gap-8"
              >
                <span className="text-xs text-[#CAFF3C]/85">{title}</span>
                <span className="text-xs leading-5 text-[#d8e8ce]/55">
                  {description}
                </span>
              </div>
            ))}
          </div>
        </section>

        <section
          aria-labelledby="opensource-title"
          className="border-t border-[#8AFF57]/15 py-20 sm:py-28"
        >
          <SectionKicker command="$ git log --oneline --all" index="04" />
          <div className="grid gap-10 lg:grid-cols-[.8fr_1.2fr] lg:gap-24">
            <div>
              <h2
                id="opensource-title"
                className="text-2xl font-semibold tracking-[-0.04em] text-[#CAFF3C] sm:text-3xl"
              >
                Works in public.
              </h2>
              <p className="mt-4 text-sm leading-7 text-[#8AFF57]/60">
                Solo projects are one signal. Collaboration under someone
                else&apos;s review is another.
              </p>
            </div>
            <div className="space-y-0 border-y border-[#8AFF57]/15">
              {contributions.map(([name, detail, status], index) => (
                <div
                  key={name}
                  data-testid={`row-contribution-${index}`}
                  className="grid grid-cols-[1fr_auto] gap-4 border-b border-[#8AFF57]/10 py-5 last:border-0 sm:grid-cols-[1fr_1.3fr_auto] sm:items-center"
                >
                  <span className="text-sm text-[#CAFF3C]">
                    <GitPullRequest
                      className="mr-2 inline text-[#8AFF57]/60"
                      size={14}
                    />
                    {name}
                  </span>
                  <span className="hidden text-xs text-[#8AFF57]/50 sm:block">
                    {detail}
                  </span>
                  <span className="text-right text-[10px] uppercase tracking-wider text-[#8AFF57]/50">
                    {status}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section
          aria-labelledby="skills-title"
          className="border-t border-[#8AFF57]/15 py-20 sm:py-28"
        >
          <SectionKicker command="$ printenv SKILLS" index="05" />
          <h2
            id="skills-title"
            className="mb-10 text-2xl font-semibold tracking-[-0.04em] text-[#CAFF3C] sm:text-3xl"
          >
            The working set.
          </h2>
          <div className="grid gap-x-10 gap-y-8 md:grid-cols-2">
            {[
              [
                "LLM infra & tooling",
                "LiteLLM · FastAPI · gateways · proxy hooks · Postgres · Prometheus · Grafana",
              ],
              [
                "Evaluation & testing",
                "pytest · semantic assertions · regression harnesses · CI gates · drift monitoring",
              ],
              [
                "Agent orchestration",
                "LangGraph · multi-agent systems · tool calling · capability gates · TUI debugging",
              ],
              [
                "Languages & frameworks",
                "Python · GitHub Actions · SQL · observability · security primitives",
              ],
            ].map(([category, stack], index) => (
              <div
                key={category}
                className="border-l border-[#8AFF57]/25 pl-5"
                data-testid={`text-skill-${index}`}
              >
                <div className="mb-3 text-xs uppercase tracking-wider text-[#8AFF57]">
                  {category}
                </div>
                <p className="text-sm leading-6 text-[#d8e8ce]/60">{stack}</p>
              </div>
            ))}
          </div>
        </section>

        <section
          id="contact"
          aria-labelledby="contact-title"
          className="border-t border-[#8AFF57]/15 py-20 sm:py-28"
        >
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
                Infrastructure roles where reliability is part of the product,
                not an afterthought.
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
                  <FileText className="mr-1 inline" size={12} /> resume
                  available on request
                </span>
                <span>
                  <Activity className="mr-1 inline" size={12} /> response
                  channel: open
                </span>
              </div>
            </div>
          </div>
        </section>

        <section
          aria-labelledby="terminal-title"
          className="border-t border-[#8AFF57]/15 py-16 sm:py-24"
        >
          <SectionKicker command="$ ./sushit --explore" index="07" />
          <div className="mb-7">
            <h2
              id="terminal-title"
              className="text-xl font-semibold tracking-[-0.04em] text-[#CAFF3C] sm:text-2xl"
            >
              Navigate by command
            </h2>
            <p className="mt-2 text-xs leading-6 text-[#8AFF57]/45">
              Type &apos;help&apos; to see what this terminal knows so far.
            </p>
          </div>
          <TerminalCli />
        </section>
      </main>
      <ProjectModal
        project={activeProject}
        onClose={() => setActiveProject(null)}
      />
      <SiteFooter />
    </div>
  );
}

export default HomePage;
