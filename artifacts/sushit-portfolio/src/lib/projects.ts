export type Pillar = "Infra / Eval / Reliability" | "Agentic Systems";

export type Project = {
  id: string;
  name: string;
  pillar: Pillar;
  description: string;
  summary?: string;
  builtWith?: string;
  tags: string[];
  status: string;
  statusTone: "live" | "progress" | "oss";
  links: { label: string; href: string }[];
  featured?: boolean;
};

export const projects: Project[] = [
  {
    id: "neural-circuit-breaker",
    name: "Neural Circuit Breaker",
    pillar: "Infra / Eval / Reliability",
    description:
      "Python LLM safety middleware implementing circuit-breaker semantics for model calls that should fail closed.",
    summary:
      "Imagine an AI system that starts acting weird or giving bad answers — this tool watches for that in real time and automatically shuts things down before the problem spreads to users, the same way an electrical circuit breaker trips before a wire overheats. It sits quietly alongside your AI application, checking its outputs against safety thresholds, and steps in the moment something crosses the line.",
    builtWith:
      "Python, designed as middleware that plugs into existing AI applications without needing to rebuild them.",
    tags: ["Python", "LLM safety", "Middleware"],
    status: "In progress",
    statusTone: "progress",
    links: [{ label: "source", href: "https://github.com/Sushit-prog" }],
    featured: true,
  },
  {
    id: "gatekeeper",
    name: "GateKeeper",
    pillar: "Infra / Eval / Reliability",
    description:
      "Tool-calling security framework built around structural isolation and deterministic rules.",
    summary:
      "When an AI agent is allowed to run commands or use tools on its own — like searching the web, writing files, or calling other software — there's a real risk it does something it shouldn't. This is a safety layer that checks every single action an AI tries to take against a strict rulebook before letting it through, so the AI can be genuinely useful without being handed a blank check.",
    builtWith:
      "A structural isolation approach and deterministic rule-checking (meaning: the safety checks are fixed, predictable logic — not another AI guessing whether something's safe).",
    tags: ["Python", "Security", "Tool calling"],
    status: "In progress",
    statusTone: "progress",
    links: [{ label: "source", href: "https://github.com/Sushit-prog" }],
    featured: true,
  },
  {
    id: "llmgate",
    name: "LLMGate",
    pillar: "Infra / Eval / Reliability",
    description:
      "Self-hosted LLM API gateway with routing, observability, and an operator-friendly deployment surface.",
    summary:
      "A control center that sits between your application and the AI models it talks to. Instead of your app connecting directly to an AI provider and hoping for the best, every request passes through this gateway first — so you get traffic management, usage tracking, and a live dashboard showing exactly what's happening across your whole system.",
    builtWith:
      "FastAPI (the backend), LiteLLM (for talking to different AI providers through one interface), PostgreSQL (for storing data), and Prometheus + Grafana (for the live monitoring dashboards) — all self-hosted, meaning you run it on your own infrastructure rather than depending on a third party.",
    tags: ["FastAPI", "LiteLLM", "Postgres", "Prometheus", "Grafana"],
    status: "In progress",
    statusTone: "progress",
    links: [{ label: "source", href: "https://github.com/Sushit-prog" }],
  },
  {
    id: "evalflow",
    name: "EvalFlow",
    pillar: "Infra / Eval / Reliability",
    description:
      "CI-native regression harness for prompts and agents. Gates pull requests when evaluations regress.",
    summary:
      "Automatically tests an AI system every time someone changes the underlying code, and blocks that change from going live if it makes the AI noticeably worse — the same way a spell-checker stops a typo before it ships, but for AI quality. It plugs directly into the normal software development process, so bad AI changes get caught before they ever reach real users.",
    builtWith:
      "A GitHub Action (so it runs automatically on every code change) paired with a backend service that actually runs the quality checks and decides pass/fail.",
    tags: ["Python", "GitHub Actions", "Evals"],
    status: "In progress",
    statusTone: "progress",
    links: [{ label: "source", href: "https://github.com/Sushit-prog" }],
  },
  {
    id: "cusum-watch",
    name: "cusum-watch",
    pillar: "Infra / Eval / Reliability",
    description:
      "Calibrated e-CUSUM decoding-time drift monitor for quantized reasoning models via a LiteLLM proxy hook.",
    summary:
      "AI models can quietly get worse over time — a phenomenon called \u201cdrift\u201d — without anyone noticing until users start complaining. This tool watches the model's behavior continuously using a statistical early-warning method and raises a flag the moment it detects a meaningful, measurable drop in quality, rather than waiting for obvious failures.",
    builtWith:
      "An implementation of a calibrated e-CUSUM statistical method (a technique borrowed from quality-control engineering, adapted here for AI monitoring), hooked directly into a LiteLLM proxy so it can watch traffic in real time — built specifically to handle quantized (compressed, faster-but-slightly-less-precise) reasoning models.",
    tags: ["Python", "LiteLLM", "Drift monitoring"],
    status: "Research tooling",
    statusTone: "oss",
    links: [{ label: "source", href: "https://github.com/Sushit-prog" }],
  },
  {
    id: "pytest-llm-sushit",
    name: "pytest-llm-sushit",
    pillar: "Infra / Eval / Reliability",
    description:
      "A pytest plugin with semantic assertion functions for testing LLM behavior.",
    summary:
      "A plug-in for pytest, one of the most widely used testing tools in Python, that lets developers write simple, readable checks for AI-generated answers — like \u201cdoes this response actually answer the question\u201d or \u201cdoes it avoid saying something false\u201d — instead of manually reading through hundreds of AI outputs by hand to catch mistakes.",
    builtWith:
      "Python, packaged and published on PyPI (the standard package registry developers install from) so anyone can add it to their own project with one command.",
    tags: ["Python", "pytest", "PyPI"],
    status: "Published on PyPI",
    statusTone: "live",
    links: [
      { label: "PyPI", href: "https://pypi.org/project/pytest-llm-sushit/" },
      { label: "source", href: "https://github.com/Sushit-prog" },
    ],
  },
  {
    id: "litellm-contributions",
    name: "LiteLLM contributions",
    pillar: "Infra / Eval / Reliability",
    description:
      "Open-source fixes to parallel request limiter logic in a widely used LLM gateway ecosystem.",
    tags: ["Python", "Open source", "Concurrency"],
    status: "Merged upstream",
    statusTone: "live",
    links: [{ label: "GitHub", href: "https://github.com/BerriAI/litellm" }],
  },
  {
    id: "langgraph-replay",
    name: "langgraph-replay / AgentTrace",
    pillar: "Agentic Systems",
    description:
      "LangGraph replay and debugging tooling with a blame engine, TUI, annotations, watchdog, and loop detection.",
    summary:
      "When an AI agent messes up a task that involves multiple steps, it's genuinely hard to know which step actually went wrong. This tool replays the agent's entire decision-making process step-by-step — like a flight recorder for AI — so developers can pinpoint exactly where and why something failed, instead of guessing. AgentTrace extends this into a full regression-testing layer, watching for repeated mistakes and infinite loops automatically.",
    builtWith:
      "Built around LangGraph (a popular framework for building multi-step AI agents), with a custom \u201cblame engine\u201d for tracing failures and a terminal-based interface (TUI) for browsing replays.",
    tags: ["LangGraph", "TUI", "Regression testing"],
    status: "In progress",
    statusTone: "progress",
    links: [{ label: "source", href: "https://github.com/Sushit-prog" }],
    featured: true,
  },
  {
    id: "sopvm",
    name: "SOPVM",
    pillar: "Agentic Systems",
    description:
      "Capability-gated runtime for SOP-compiled LLM agents, designed to make agent behavior inspectable and bounded.",
    summary:
      "Lets you write out a standard operating procedure — a strict set of steps an AI agent is supposed to follow — and have those steps enforced automatically, so the agent literally cannot skip a step or exceed its permissions, even if something unexpected happens mid-task. Think of it as giving an AI agent a job description it's physically unable to deviate from.",
    builtWith:
      "A custom capability-gated runtime (meaning permissions are baked into how the system runs, not just suggested), published as a versioned package on PyPI.",
    tags: ["Python", "Agents", "PyPI", "Capabilities"],
    status: "Published on PyPI · v0.2.0",
    statusTone: "live",
    links: [
      { label: "PyPI", href: "https://pypi.org/project/sopvm/" },
      { label: "source", href: "https://github.com/Sushit-prog" },
    ],
    featured: true,
  },
  {
    id: "praxis",
    name: "Praxis",
    pillar: "Agentic Systems",
    description:
      "Multi-agent research-to-prototype copilot: paper and repository triage into a blueprint, then a working prototype.",
    summary:
      "Takes a research paper or an existing codebase and helps turn it into an actual working prototype — bridging the gap between \u201chere's an interesting idea\u201d and \u201chere's something you can run and test.\u201d It automates the tedious parts: figuring out what a paper or repo is actually proposing, sketching a technical plan, and scaffolding the first working version.",
    builtWith:
      "A multi-agent architecture, where different AI agents handle different stages of the pipeline (triage, planning, and prototyping) rather than one model trying to do everything at once.",
    tags: ["Python", "Multi-agent", "Research"],
    status: "In progress",
    statusTone: "progress",
    links: [{ label: "source", href: "https://github.com/Sushit-prog" }],
  },
  {
    id: "sentinel",
    name: "SENTINEL",
    pillar: "Agentic Systems",
    description:
      "Multi-module digital public safety AI platform spanning SCAMWatch, CURRENCYGuard, FRAUDGraph, and a cross-module intelligence dashboard.",
    summary:
      "A multi-part digital safety platform built for a hackathon, designed to help spot fraud before it does damage. It detects common online scam patterns, checks currency and physical security features using image analysis, maps out fraud networks to see how bad actors are connected, and pulls everything into one live dashboard so patterns across all these signals can be seen together.",
    builtWith:
      "LangGraph and Groq (for the scam-detection engine), OpenCV (for image-based currency/security analysis), Neo4j with an in-memory fallback plus pyvis and networkx (for mapping and visualizing fraud networks), and ChromaDB (for correlating signals across all four modules on the dashboard).",
    tags: ["AI platform", "Multi-agent", "Hackathon"],
    status: "ET AI Hackathon 2.0",
    statusTone: "oss",
    links: [{ label: "source", href: "https://github.com/Sushit-prog" }],
  },
];
