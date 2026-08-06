import { useMemo, useState } from 'react';
import { ExternalLink, Github, Mail, FileText, ArrowUpRight, Terminal, ShieldCheck, Activity, Bot, GitPullRequest, MapPin } from 'lucide-react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Toaster } from '@/components/ui/toaster';
import { TooltipProvider } from '@/components/ui/tooltip';

type Pillar = 'Infra / Eval / Reliability' | 'Agentic Systems';

type Project = {
  id: string;
  name: string;
  pillar: Pillar;
  description: string;
  tags: string[];
  status: string;
  statusTone: 'live' | 'progress' | 'oss';
  links: { label: string; href: string }[];
  featured?: boolean;
};

const projects: Project[] = [
  {
    id: 'neural-circuit-breaker',
    name: 'Neural Circuit Breaker',
    pillar: 'Infra / Eval / Reliability',
    description: 'Python LLM safety middleware implementing circuit-breaker semantics for model calls that should fail closed.',
    tags: ['Python', 'LLM safety', 'Middleware'],
    status: 'In progress',
    statusTone: 'progress',
    links: [{ label: 'source', href: 'https://github.com/Sushit-prog' }],
    featured: true,
  },
  {
    id: 'gatekeeper',
    name: 'GateKeeper',
    pillar: 'Infra / Eval / Reliability',
    description: 'Tool-calling security framework built around structural isolation and deterministic rules.',
    tags: ['Python', 'Security', 'Tool calling'],
    status: 'In progress',
    statusTone: 'progress',
    links: [{ label: 'source', href: 'https://github.com/Sushit-prog' }],
    featured: true,
  },
  {
    id: 'llmgate',
    name: 'LLMGate',
    pillar: 'Infra / Eval / Reliability',
    description: 'Self-hosted LLM API gateway with routing, observability, and an operator-friendly deployment surface.',
    tags: ['FastAPI', 'LiteLLM', 'Postgres', 'Prometheus', 'Grafana'],
    status: 'In progress',
    statusTone: 'progress',
    links: [{ label: 'source', href: 'https://github.com/Sushit-prog' }],
  },
  {
    id: 'evalflow',
    name: 'EvalFlow',
    pillar: 'Infra / Eval / Reliability',
    description: 'CI-native regression harness for prompts and agents. Gates pull requests when evaluations regress.',
    tags: ['Python', 'GitHub Actions', 'Evals'],
    status: 'In progress',
    statusTone: 'progress',
    links: [{ label: 'source', href: 'https://github.com/Sushit-prog' }],
  },
  {
    id: 'cusum-watch',
    name: 'cusum-watch',
    pillar: 'Infra / Eval / Reliability',
    description: 'Calibrated e-CUSUM decoding-time drift monitor for quantized reasoning models via a LiteLLM proxy hook.',
    tags: ['Python', 'LiteLLM', 'Drift monitoring'],
    status: 'Research tooling',
    statusTone: 'oss',
    links: [{ label: 'source', href: 'https://github.com/Sushit-prog' }],
  },
  {
    id: 'pytest-llm-sushit',
    name: 'pytest-llm-sushit',
    pillar: 'Infra / Eval / Reliability',
    description: 'A pytest plugin with semantic assertion functions for testing LLM behavior.',
    tags: ['Python', 'pytest', 'PyPI'],
    status: 'Published on PyPI',
    statusTone: 'live',
    links: [
      { label: 'PyPI', href: 'https://pypi.org/project/pytest-llm-sushit/' },
      { label: 'source', href: 'https://github.com/Sushit-prog' },
    ],
  },
  {
    id: 'litellm-contributions',
    name: 'LiteLLM contributions',
    pillar: 'Infra / Eval / Reliability',
    description: 'Open-source fixes to parallel request limiter logic in a widely used LLM gateway ecosystem.',
    tags: ['Python', 'Open source', 'Concurrency'],
    status: 'Merged upstream',
    statusTone: 'live',
    links: [{ label: 'GitHub', href: 'https://github.com/BerriAI/litellm' }],
  },
  {
    id: 'langgraph-replay',
    name: 'langgraph-replay / AgentTrace',
    pillar: 'Agentic Systems',
    description: 'LangGraph replay and debugging tooling with a blame engine, TUI, annotations, watchdog, and loop detection.',
    tags: ['LangGraph', 'TUI', 'Regression testing'],
    status: 'In progress',
    statusTone: 'progress',
    links: [{ label: 'source', href: 'https://github.com/Sushit-prog' }],
    featured: true,
  },
  {
    id: 'sopvm',
    name: 'SOPVM',
    pillar: 'Agentic Systems',
    description: 'Capability-gated runtime for SOP-compiled LLM agents, designed to make agent behavior inspectable and bounded.',
    tags: ['Python', 'Agents', 'PyPI', 'Capabilities'],
    status: 'Published on PyPI · v0.2.0',
    statusTone: 'live',
    links: [
      { label: 'PyPI', href: 'https://pypi.org/project/sopvm/' },
      { label: 'source', href: 'https://github.com/Sushit-prog' },
    ],
    featured: true,
  },
  {
    id: 'praxis',
    name: 'Praxis',
    pillar: 'Agentic Systems',
    description: 'Multi-agent research-to-prototype copilot: paper and repository triage into a blueprint, then a working prototype.',
    tags: ['Python', 'Multi-agent', 'Research'],
    status: 'In progress',
    statusTone: 'progress',
    links: [{ label: 'source', href: 'https://github.com/Sushit-prog' }],
  },
  {
    id: 'sentinel',
    name: 'SENTINEL',
    pillar: 'Agentic Systems',
    description: 'Multi-module digital public safety AI platform spanning SCAMWatch, CURRENCYGuard, FRAUDGraph, and a cross-module intelligence dashboard.',
    tags: ['AI platform', 'Multi-agent', 'Hackathon'],
    status: 'ET AI Hackathon 2.0',
    statusTone: 'oss',
    links: [{ label: 'source', href: 'https://github.com/Sushit-prog' }],
  },
];

const skills = [
  ['LLM infra & tooling', 'LiteLLM · FastAPI · gateways · proxy hooks · Postgres · Prometheus · Grafana'],
  ['Evaluation & testing', 'pytest · semantic assertions · regression harnesses · CI gates · drift monitoring'],
  ['Agent orchestration', 'LangGraph · multi-agent systems · tool calling · capability gates · TUI debugging'],
  ['Languages & frameworks', 'Python · GitHub Actions · SQL · observability · security primitives'],
];

const queryClient = new QueryClient();

function SectionKicker({ command, index }: { command: string; index: string }) {
  return (
    <div className="mb-5 flex items-center gap-3 text-[11px] uppercase tracking-[0.2em] text-[#8AFF57]/55">
      <span className="text-[#CAFF3C]">{index}</span>
      <span className="h-px w-8 bg-[#8AFF57]/30" />
      <span>{command}</span>
    </div>
  );
}

function ExternalLinkRow({ links, projectId }: { links: Project['links']; projectId: string }) {
  return (
    <div className="flex flex-wrap gap-3">
      {links.map((link) => (
        <a
          key={link.label}
          href={link.href}
          target="_blank"
          rel="noreferrer"
          data-testid={`link-project-${projectId}-${link.label.toLowerCase()}`}
          className="focus-ring inline-flex items-center gap-1 text-[11px] uppercase tracking-wider text-[#8AFF57]/75 transition-colors hover:text-[#CAFF3C]"
        >
          {link.label}
          <ArrowUpRight size={12} strokeWidth={1.5} />
        </a>
      ))}
    </div>
  );
}

function ProjectCard({ project, index }: { project: Project; index: number }) {
  return (
    <article
      data-testid={`card-project-${project.id}`}
      className={`group terminal-panel relative flex min-h-[285px] flex-col justify-between overflow-hidden p-5 transition-colors duration-200 hover:border-[#8AFF57]/60 sm:p-6 ${project.featured ? 'md:min-h-[310px]' : ''}`}
    >
      <div className="absolute right-0 top-0 h-16 w-16 border-l border-b border-[#8AFF57]/10 bg-[#8AFF57]/[0.015] transition-colors group-hover:bg-[#8AFF57]/[0.05]" />
      <div>
        <div className="mb-7 flex items-start justify-between gap-4">
          <span className="font-mono text-[11px] text-[#8AFF57]/35">0{index + 1} / {project.pillar === 'Agentic Systems' ? 'AGT' : 'REL'}</span>
          <span data-testid={`status-project-${project.id}`} className={`inline-flex items-center gap-2 text-right text-[10px] uppercase tracking-wider ${project.statusTone === 'live' ? 'text-[#CAFF3C]' : project.statusTone === 'oss' ? 'text-[#8AFF57]' : 'text-[#8AFF57]/55'}`}>
            <span className={`h-1.5 w-1.5 rounded-full ${project.statusTone === 'live' ? 'bg-[#CAFF3C]' : 'bg-[#8AFF57]/60'}`} />
            {project.status}
          </span>
        </div>
        <h3 className="mb-3 max-w-[90%] text-lg font-semibold tracking-tight text-[#CAFF3C] text-glow sm:text-xl">{project.name}</h3>
        <p className="max-w-[52ch] text-sm leading-6 text-[#d8e8ce]/65">{project.description}</p>
      </div>
      <div className="mt-8">
        <div className="mb-5 flex flex-wrap gap-2">
          {project.tags.map((tag) => (
            <span key={tag} className="border border-[#8AFF57]/15 bg-[#8AFF57]/[0.035] px-2 py-1 text-[10px] uppercase tracking-wide text-[#8AFF57]/60">{tag}</span>
          ))}
        </div>
        <ExternalLinkRow links={project.links} projectId={project.id} />
      </div>
    </article>
  );
}

function Home() {
  const [activePillar, setActivePillar] = useState<'all' | Pillar>('all');
  const [showAll, setShowAll] = useState(false);
  const visibleProjects = useMemo(() => {
    const filtered = activePillar === 'all' ? projects : projects.filter((project) => project.pillar === activePillar);
    return showAll ? filtered : filtered.filter((project) => project.featured);
  }, [activePillar, showAll]);

  const filterProjects = (pillar: 'all' | Pillar) => {
    setActivePillar(pillar);
    setShowAll(false);
  };

  return (
    <main className="crt-lines terminal-grid min-h-[100dvh] overflow-hidden">
      <header className="sticky top-0 z-40 border-b border-[#8AFF57]/15 bg-[#0A0F08]/90 backdrop-blur-md">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-5 py-4 sm:px-8">
          <a href="#top" data-testid="link-home" className="focus-ring flex items-center gap-3 text-sm font-semibold tracking-tight text-[#CAFF3C]">
            <span className="flex h-7 w-7 items-center justify-center border border-[#8AFF57]/50 text-[11px]">S/</span>
            <span className="hidden sm:inline">sushit<span className="text-[#8AFF57]/45">.dev</span></span>
          </a>
          <nav aria-label="Main navigation" className="flex items-center gap-4 text-[10px] uppercase tracking-[0.16em] text-[#8AFF57]/55 sm:gap-7">
            <a href="#work" data-testid="link-nav-work" className="focus-ring hover:text-[#CAFF3C]">work</a>
            <a href="#about" data-testid="link-nav-about" className="focus-ring hover:text-[#CAFF3C]">about</a>
            <a href="#contact" data-testid="link-nav-contact" className="focus-ring hover:text-[#CAFF3C]">contact</a>
          </nav>
        </div>
      </header>

      <div id="top" className="mx-auto max-w-6xl px-5 sm:px-8">
        <section aria-labelledby="intro-title" className="relative grid min-h-[calc(100dvh-65px)] items-center py-20 sm:py-28 lg:grid-cols-[1.12fr_.88fr] lg:gap-16">
          <div className="absolute -left-40 top-32 h-72 w-72 rounded-full bg-[#8AFF57]/[0.025] blur-3xl" />
          <div className="relative">
            <div className="reveal mb-7 flex items-center gap-3 text-xs text-[#8AFF57]/65">
              <span className="inline-block h-2 w-2 rounded-full bg-[#8AFF57] shadow-[0_0_12px_rgba(138,255,87,.65)]" />
              <span>available for AI engineering roles</span>
            </div>
            <div className="reveal reveal-delay-1 terminal-panel max-w-3xl p-5 sm:p-8">
              <div className="mb-8 flex items-center justify-between border-b border-[#8AFF57]/15 pb-4 text-[10px] uppercase tracking-[0.18em] text-[#8AFF57]/40">
                <span className="flex items-center gap-2"><Terminal size={13} /> zsh — sushit@local</span>
                <span>status: 0</span>
              </div>
              <div className="space-y-5 text-sm leading-7 sm:text-base">
                <p className="text-[#8AFF57]/55"><span className="text-[#CAFF3C]">$</span> whoami</p>
                <h1 id="intro-title" className="text-3xl font-semibold tracking-[-0.06em] text-[#CAFF3C] text-glow sm:text-5xl lg:text-[4.35rem] lg:leading-[1.05]">
                  Sushit —<br />AI Engineer<span className="cursor-blink ml-2 inline-block text-[#8AFF57]">▋</span>
                </h1>
                <p className="max-w-2xl border-l-2 border-[#CAFF3C] pl-4 text-sm leading-7 text-[#e2f1d8]/78 sm:text-base">
                  Building reliability and safety tooling for LLM systems, plus agentic systems that can be inspected, tested, and trusted.
                </p>
                <p className="pt-1 text-[#8AFF57]/55"><span className="text-[#CAFF3C]">$</span> cat focus.txt</p>
                <div className="flex flex-wrap gap-x-6 gap-y-2 text-xs text-[#8AFF57]/70">
                  <span>[ infra / eval / reliability ]</span>
                  <span>[ agentic systems ]</span>
                </div>
              </div>
            </div>
            <div className="reveal reveal-delay-2 mt-8 flex flex-wrap items-center gap-x-5 gap-y-4">
              <a href="https://github.com/Sushit-prog" target="_blank" rel="noreferrer" data-testid="link-github-hero" className="focus-ring inline-flex items-center gap-2 border border-[#8AFF57]/35 px-4 py-3 text-xs uppercase tracking-wider text-[#CAFF3C] transition-colors hover:border-[#CAFF3C] hover:bg-[#CAFF3C]/10"><Github size={15} /> GitHub</a>
              <a href="https://huggingface.co/Pakrashy" target="_blank" rel="noreferrer" data-testid="link-huggingface-hero" className="focus-ring text-xs uppercase tracking-wider text-[#8AFF57]/70 hover:text-[#CAFF3C]">Hugging Face <ArrowUpRight className="ml-1 inline" size={13} /></a>
              <a href="#contact" data-testid="link-resume-hero" className="focus-ring text-xs uppercase tracking-wider text-[#8AFF57]/70 hover:text-[#CAFF3C]">Resume / CV <ArrowUpRight className="ml-1 inline" size={13} /></a>
            </div>
          </div>
          <aside className="reveal reveal-delay-3 mt-16 lg:mt-0" aria-label="Current signal">
            <div className="mb-5 text-[10px] uppercase tracking-[0.2em] text-[#8AFF57]/40">// current_signal</div>
            <div className="space-y-0 border-y border-[#8AFF57]/15">
              <div className="grid grid-cols-[1fr_auto] gap-6 border-b border-[#8AFF57]/10 py-5">
                <span className="text-xs text-[#8AFF57]/50">location</span>
                <span className="text-right text-xs text-[#dff6d2]/80"><MapPin className="mr-1 inline" size={12} /> India (remote-friendly)</span>
              </div>
              <div className="grid grid-cols-[1fr_auto] gap-6 border-b border-[#8AFF57]/10 py-5">
                <span className="text-xs text-[#8AFF57]/50">education</span>
                <span className="max-w-[180px] text-right text-xs leading-5 text-[#dff6d2]/80">B.Tech, ECE</span>
              </div>
              <div className="grid grid-cols-[1fr_auto] gap-6 border-b border-[#8AFF57]/10 py-5">
                <span className="text-xs text-[#8AFF57]/50">last deployment</span>
                <span className="max-w-[210px] text-right text-xs leading-5 text-[#dff6d2]/80">AI/ML Engineering — iNeuBytes<br /><span className="text-[#8AFF57]/55">Data Science — Thiranex</span></span>
              </div>
              <div className="grid grid-cols-[1fr_auto] gap-6 py-5">
                <span className="text-xs text-[#8AFF57]/50">thesis</span>
                <span className="max-w-[180px] text-right text-xs leading-5 text-[#CAFF3C]">make failure<br />observable</span>
              </div>
            </div>
            <div className="mt-6 flex items-center gap-3 text-[10px] uppercase tracking-wider text-[#8AFF57]/40">
              <span className="pulse-line h-px w-12 bg-[#8AFF57]" />
              shipping systems, not demos
            </div>
          </aside>
        </section>

        <section id="about" aria-labelledby="about-title" className="border-t border-[#8AFF57]/15 py-20 sm:py-28">
          <SectionKicker command="$ sed -n '1,80p' about.md" index="01" />
          <div className="grid gap-10 lg:grid-cols-[.8fr_1.2fr] lg:gap-24">
            <h2 id="about-title" className="text-2xl font-semibold tracking-[-0.04em] text-[#CAFF3C] sm:text-3xl">An engineer for the<br /><span className="text-[#8AFF57]/55">uncomfortable edge cases.</span></h2>
            <div className="max-w-2xl space-y-5 text-sm leading-7 text-[#d8e8ce]/70">
              <p>I am Sushit, a fresher-level AI Engineer focused on the layer where language models meet real systems: bounded execution, regression signals, observability, and useful failure modes.</p>
              <p>Early in my career, but not early-stage in how I work — I ship tools people actually use, contribute to real open-source projects, and treat every build like it has to survive contact with production. I move fast with AI-assisted workflows and hold the output to standards that would pass review at a serious engineering org.</p>
              <p className="text-[#8AFF57]/75"><span className="text-[#CAFF3C]">&gt;</span> I use coding agents as force multipliers, then hold the output to open-source-grade standards.</p>
            </div>
          </div>
          <div className="mt-14 grid grid-cols-2 gap-px border border-[#8AFF57]/15 bg-[#8AFF57]/15 sm:grid-cols-4">
            {[
              ['11', 'systems listed'],
              ['02', 'engineering pillars'],
              ['01', 'PyPI release'],
              ['∞', 'failure modes to find'],
            ].map(([value, label]) => (
              <div key={label} className="bg-[#0A0F08] px-4 py-5 sm:px-6">
                <div className="text-2xl text-[#CAFF3C]">{value}</div>
                <div className="mt-2 text-[10px] uppercase tracking-wider text-[#8AFF57]/45">{label}</div>
              </div>
            ))}
          </div>
        </section>

        <section id="work" aria-labelledby="work-title" className="border-t border-[#8AFF57]/15 py-20 sm:py-28">
          <SectionKicker command="$ cat projects.json | jq '.projects[]'" index="02" />
          <div className="mb-10 flex flex-col justify-between gap-7 lg:flex-row lg:items-end">
            <div>
              <h2 id="work-title" className="text-2xl font-semibold tracking-[-0.04em] text-[#CAFF3C] sm:text-3xl">Selected systems</h2>
              <p className="mt-3 max-w-xl text-sm leading-6 text-[#8AFF57]/55">Tools for making LLM behavior safer to ship — from the request boundary to the agent runtime.</p>
            </div>
            <div role="group" aria-label="Filter projects" className="flex flex-wrap gap-2">
              {(['all', 'Infra / Eval / Reliability', 'Agentic Systems'] as const).map((pillar) => (
                <button
                  key={pillar}
                  type="button"
                  onClick={() => filterProjects(pillar)}
                  data-testid={`button-filter-${pillar === 'all' ? 'all' : pillar === 'Infra / Eval / Reliability' ? 'reliability' : 'agents'}`}
                  aria-pressed={activePillar === pillar}
                  className={`focus-ring border px-3 py-2 text-[10px] uppercase tracking-wider transition-colors ${activePillar === pillar ? 'border-[#CAFF3C] bg-[#CAFF3C] text-[#0A0F08]' : 'border-[#8AFF57]/20 text-[#8AFF57]/55 hover:border-[#8AFF57]/60 hover:text-[#CAFF3C]'}`}
                >
                  {pillar === 'all' ? 'all systems' : pillar === 'Infra / Eval / Reliability' ? 'infra / eval' : 'agentic'}
                </button>
              ))}
            </div>
          </div>
          <div className="grid gap-4 md:grid-cols-2">
            {visibleProjects.map((project, index) => <ProjectCard key={project.id} project={project} index={index} />)}
          </div>
          <div className="mt-8 flex justify-center">
            <button type="button" onClick={() => setShowAll((value) => !value)} data-testid="button-toggle-projects" className="focus-ring border-b border-[#8AFF57]/40 pb-2 text-[11px] uppercase tracking-[0.16em] text-[#8AFF57]/70 hover:border-[#CAFF3C] hover:text-[#CAFF3C]">
              {showAll ? '$ show featured only' : '$ cat all-projects'}
            </button>
          </div>
        </section>

        <section aria-labelledby="other-work-title" className="border-t border-[#8AFF57]/10 py-14 sm:py-18">
          <SectionKicker command="$ cat other-work.txt" index="03" />
          <div className="mb-7">
            <h2 id="other-work-title" className="text-xl font-semibold tracking-[-0.04em] text-[#CAFF3C] sm:text-2xl">Other Work</h2>
            <p className="mt-2 text-xs leading-6 text-[#8AFF57]/45">Earlier signals from the path into AI Engineering.</p>
          </div>
          <div className="max-w-4xl border-y border-[#8AFF57]/10">
            {[
              ['iNeuBytes — AI/ML Engineering Internship', 'Netflix dataset analysis, AAPL stock price prediction, and heart disease prediction models'],
              ['Thiranex — Data Science Internship', 'Description to be added.'],
            ].map(([title, description], index) => (
              <div key={title} data-testid={`row-other-work-${index}`} className="grid gap-2 border-b border-[#8AFF57]/10 py-4 last:border-0 sm:grid-cols-[minmax(220px,.7fr)_1.3fr] sm:gap-8">
                <span className="text-xs text-[#CAFF3C]/85">{title}</span>
                <span className="text-xs leading-5 text-[#d8e8ce]/55">{description}</span>
              </div>
            ))}
          </div>
        </section>

        <section aria-labelledby="opensource-title" className="border-t border-[#8AFF57]/15 py-20 sm:py-28">
          <SectionKicker command="$ git log --oneline --all" index="04" />
          <div className="grid gap-10 lg:grid-cols-[.8fr_1.2fr] lg:gap-24">
            <div>
              <h2 id="opensource-title" className="text-2xl font-semibold tracking-[-0.04em] text-[#CAFF3C] sm:text-3xl">Works in public.</h2>
              <p className="mt-4 text-sm leading-7 text-[#8AFF57]/60">Solo projects are one signal. Collaboration under someone else&apos;s review is another.</p>
            </div>
            <div className="space-y-0 border-y border-[#8AFF57]/15">
              {[
                ['LiteLLM', 'parallel request limiter logic', 'merged upstream'],
                ['marimo', 'PR #9302', 'open source contribution'],
                ['Onyx', 'PR #10005', 'open source contribution'],
              ].map(([name, detail, status], index) => (
                <div key={name} data-testid={`row-contribution-${index}`} className="grid grid-cols-[1fr_auto] gap-4 border-b border-[#8AFF57]/10 py-5 last:border-0 sm:grid-cols-[1fr_1.3fr_auto] sm:items-center">
                  <span className="text-sm text-[#CAFF3C]"><GitPullRequest className="mr-2 inline text-[#8AFF57]/60" size={14} />{name}</span>
                  <span className="hidden text-xs text-[#8AFF57]/50 sm:block">{detail}</span>
                  <span className="text-right text-[10px] uppercase tracking-wider text-[#8AFF57]/50">{status}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section aria-labelledby="skills-title" className="border-t border-[#8AFF57]/15 py-20 sm:py-28">
          <SectionKicker command="$ printenv SKILLS" index="05" />
          <h2 id="skills-title" className="mb-10 text-2xl font-semibold tracking-[-0.04em] text-[#CAFF3C] sm:text-3xl">The working set.</h2>
          <div className="grid gap-x-10 gap-y-8 md:grid-cols-2">
            {skills.map(([category, stack], index) => (
              <div key={category} className="border-l border-[#8AFF57]/25 pl-5" data-testid={`text-skill-${index}`}>
                <div className="mb-3 text-xs uppercase tracking-wider text-[#8AFF57]">{category}</div>
                <p className="text-sm leading-6 text-[#d8e8ce]/60">{stack}</p>
              </div>
            ))}
          </div>
        </section>

        <section id="contact" aria-labelledby="contact-title" className="border-t border-[#8AFF57]/15 py-20 sm:py-28">
          <SectionKicker command="$ mail sushit" index="06" />
          <div className="terminal-panel relative overflow-hidden p-6 sm:p-10">
            <div className="absolute -right-12 -top-20 h-64 w-64 rounded-full border border-[#8AFF57]/10" />
            <div className="absolute -right-2 -top-10 h-44 w-44 rounded-full border border-[#8AFF57]/10" />
            <div className="relative max-w-2xl">
              <h2 id="contact-title" className="text-3xl font-semibold tracking-[-0.06em] text-[#CAFF3C] text-glow sm:text-5xl">Let&apos;s make the<br />failure modes legible.</h2>
              <p className="mt-6 max-w-xl text-sm leading-7 text-[#d8e8ce]/65">Looking for AI Engineering internships and entry-level AI Infrastructure roles where reliability is part of the product, not an afterthought.</p>
              <div className="mt-9 flex flex-wrap gap-3">
                <a href="mailto:sushit@example.com" data-testid="link-email-contact" className="focus-ring inline-flex items-center gap-2 border border-[#CAFF3C] bg-[#CAFF3C] px-4 py-3 text-xs uppercase tracking-wider text-[#0A0F08] transition-colors hover:bg-[#8AFF57]"><Mail size={15} /> send a note</a>
                <a href="https://github.com/Sushit-prog" target="_blank" rel="noreferrer" data-testid="link-github-contact" className="focus-ring inline-flex items-center gap-2 border border-[#8AFF57]/35 px-4 py-3 text-xs uppercase tracking-wider text-[#CAFF3C] hover:border-[#CAFF3C]"><Github size={15} /> inspect the work</a>
              </div>
              <div className="mt-9 flex flex-wrap gap-x-6 gap-y-3 text-[10px] uppercase tracking-wider text-[#8AFF57]/45">
                <span><FileText className="mr-1 inline" size={12} /> resume available on request</span>
                <span><Activity className="mr-1 inline" size={12} /> response channel: open</span>
              </div>
            </div>
          </div>
        </section>

        <footer className="flex flex-col justify-between gap-4 border-t border-[#8AFF57]/15 py-7 text-[10px] uppercase tracking-wider text-[#8AFF57]/35 sm:flex-row">
          <span>Sushit / AI Engineer</span>
          <span>built for systems that survive contact</span>
          <span>© {new Date().getFullYear()}</span>
        </footer>
      </div>
    </main>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Home />
        <Toaster />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;