export type ProjectStat = { label: string; value: number; suffix?: string };
export type ProjectLink = { label: string; href: string };

export type PortfolioProject = {
  id: string;
  name: string;
  pitch: string;
  problem: string;
  how: string;
  proof: string;
  stats: ProjectStat[];
  stack: string[];
  links: ProjectLink[];
  caveat?: string;
};

export const portfolioProjects: PortfolioProject[] = [
  {
    id: "sopvm",
    name: "sopvm",
    pitch:
      "A capability-gated runtime that compiles SOPs (a YAML DSL) into an executable program with statically-checked capability tokens — the agent can only call tools it was explicitly granted at compile time, enforced at runtime, not just prompted.",
    problem:
      "Most agent frameworks let an LLM decide what to do next at every step — which means there's no deterministic guarantee about what an agent is allowed to do, only what it was prompted not to do. For anything procedural (a fixed SOP an agent must follow), that's a security and reliability gap.",
    how: "15 sequential milestones — deterministic parser/AST, IR + lowering, capability-token static checker, a paging pass, the runtime executor, the capability gate itself, a sandboxed plugin/provider system, a LangGraph adapter, telemetry, CLI, and a full adversarial security suite. Each milestone was checked against the real diff before moving on — milestone 1 drifted from spec badly and had to be recovered, which set the discipline for everything after. The adversarial pass found two real vulnerabilities: the runtime trusted an IR file's declared capabilities without re-validating them (IR tampering), and the paging pass was silently dropping conditional/loop logic during compilation.",
    proof:
      "live on PyPI (pip install sopvm) · two real vulnerabilities found & fixed during the adversarial pass",
    stats: [{ label: "tests", value: 268 }],
    stack: ["Python", "custom YAML DSL", "LangGraph adapter"],
    links: [
      { label: "GitHub", href: "https://github.com/Sushit-prog/sop-runtime" },
      { label: "PyPI", href: "https://pypi.org/project/sopvm" },
    ],
  },
  {
    id: "cusum-watch",
    name: "cusum-watch",
    pitch:
      "A calibrated e-CUSUM statistical monitor that watches decoding in real time and flags off-distribution generation, using a quantization-robust observable instead of raw logprob — installed as a drop-in LiteLLM proxy hook.",
    problem:
      "Quantized models (the kind you can actually run on consumer hardware) behave differently under drift than full-precision ones — raw token log-probability, the usual signal for whether a generation is going off the rails, is the wrong observable once you've quantized. A paper proposed a fix; nobody had shipped it as usable infrastructure.",
    how: "Implemented the paper end-to-end across 15 milestones: built a calibration-set generator against a local quantized model, derived the quantization-robust observable, fit the null distribution, built the CUSUM engine with a calibrated threshold, built a drift-injection framework to test detection against real perturbations, wired it into LiteLLM as a two-sided monitor (a mid-build finding showed repetition-collapse and entropy-spikes move the signal in opposite directions, so one-sided detection wasn't enough), added Prometheus metrics and a Grafana dashboard, then closed with adversarial/statistical validation of the false-alarm rate against real sequential data — not just synthetic bootstrap numbers.",
    proof:
      "15/15 milestones verified · live on PyPI · validated on a real quantized model on real hardware",
    stats: [{ label: "milestones", value: 15, suffix: "/15" }],
    stack: ["Python", "LiteLLM", "Prometheus / Grafana", "llama.cpp"],
    links: [
      { label: "GitHub", href: "https://github.com/Sushit-prog/cusum" },
      { label: "PyPI", href: "https://pypi.org/project/cusum-watch" },
    ],
  },
  {
    id: "langgraph-replay",
    name: "langgraph-replay / AgentTrace",
    pitch:
      "A replay and blame-attribution debugger for LangGraph, plus a regression-testing layer (AgentTrace) on top of it — diffs new runs against a pinned baseline, catches stuck loops, and traces upstream divergence.",
    problem:
      "When a LangGraph agent misbehaves, there's no good way to answer which step caused it after the fact — you're stuck re-reading logs and guessing.",
    how: "Built the core replay/blame tool first — SQLite-backed, a Textual TUI, a blame algorithm that walks backward through execution to find where a key got dropped — then extended it across 7 phases into the full regression-testing layer: human judgments on individual spans, a regression watchdog that diffs new runs against a pinned baseline, a loop classifier that catches agents stuck repeating themselves, semantic diffing, upstream divergence tracing, and counterfactual replay (fork a checkpoint, substitute a value, test whether that's really what caused the regression). Added an embedding-based loop detector and CI-native exit codes so it can gate merges the same way EvalFlow does for prompts.",
    proof: "141 tests · blame engine · loop detection · counterfactual replay",
    stats: [{ label: "tests", value: 141 }],
    stack: ["Python", "LangGraph", "SQLite", "Textual (TUI)"],
    links: [
      { label: "GitHub", href: "https://github.com/Sushit-prog/AgentTrack" },
    ],
  },
  {
    id: "neural-circuit-breaker",
    name: "Neural Circuit Breaker",
    pitch:
      "Safety middleware that applies circuit-breaker semantics (CLOSED → OPEN → HALF_OPEN) to LLM traffic, with two-tier detection — a fast regex filter, then a DeBERTa-based ML classifier — and fail-closed behavior everywhere.",
    problem:
      "LLM apps need a way to fail safely when something looks like a prompt injection or attack — but most safety wrappers either block too aggressively (killing legitimate traffic) or fail open (forwarding unsafe input anyway) when the safety layer itself has a problem.",
    how: "Four milestones — the circuit-breaker core with atomic Redis WATCH/MULTI transitions for race-safe state changes, the ML classifier layered behind the fast filter, fallback routing engineered so raw unsafe text can never reach a fallback model, then a concurrency race condition found and fixed during load testing. Shipped with a standalone pip-installable SDK on top, so any service can wrap calls with a single decorator.",
    proof: "75 tests (60 backend + 15 SDK) · standalone pip-installable SDK",
    stats: [{ label: "tests", value: 75 }],
    stack: ["Python", "FastAPI", "Redis", "DeBERTa-v3"],
    links: [
      {
        label: "GitHub",
        href: "https://github.com/Sushit-prog/Neural-Circuit-Breaker",
      },
    ],
  },
  {
    id: "litellm-oss",
    name: "LiteLLM contributions",
    pitch:
      "Two merged upstream fixes to LiteLLM's parallel request limiter — cutting needless Redis writes at scale and closing a client-forgeable TPM-accounting bypass.",
    problem:
      "LiteLLM's rate limiter wrote to Redis on every request even when nothing was rate-limited, and post-call TPM/decrement logging trusted a client-settable marker, letting a client bypass accounting.",
    how: "Part A (#32447): gated legacy-limiter Redis writes behind a shared _entity_has_any_limit check across all four scopes, with a fallback to the old unconditional behavior if the auth object is ever missing. Part B (#33010): added a _no_rate_limits marker set server-side and scrubbed from client-supplied metadata, closing the reviewer-found bypass. Full write-up on the Open Source page.",
    proof: "merged upstream · PR #32447 + #33010 · 77 tests passing",
    stats: [{ label: "tests", value: 77 }],
    stack: ["Python", "Redis", "LiteLLM"],
    links: [{ label: "GitHub", href: "https://github.com/BerriAI/litellm" }],
  },
  {
    id: "pytest-llm-sushit",
    name: "pytest-llm-sushit",
    pitch:
      "A pytest plugin providing semantic assertion functions purpose-built for testing LLM outputs, so agent and prompt behavior can be unit-tested the same way regular code is.",
    problem:
      "Standard assert statements don't work for LLM output — you can't assert exact-match equality against a generative model's response.",
    how: "Built as a standalone, dependency-light PyPI package first, then integrated as the assertion layer inside two other projects (langgraph-replay's blame --eval calls it internally, and EvalFlow's runner wraps it) — proof it works as real infrastructure, not a one-off script.",
    proof:
      "live on PyPI · 8 semantic assertion functions · used by 2 other projects in this list",
    stats: [{ label: "tests", value: 49 }],
    stack: ["Python", "pytest"],
    links: [
      { label: "PyPI", href: "https://pypi.org/project/pytest-llm-sushit" },
    ],
  },
  {
    id: "evalflow",
    name: "EvalFlow",
    pitch:
      "\u201cCI for prompts\u201d — a GitHub Action + service that runs eval suites on every PR touching a prompt or agent graph and blocks the merge on regression.",
    problem:
      "Prompt and agent changes get merged without any regression check — unlike code, there's no CI gate that catches this prompt change made the agent worse before it ships.",
    how: "A FastAPI service backed by Postgres for the baseline store, reusing the same Docker Compose pattern (FastAPI + Postgres + Prometheus + Grafana, deliberately no Redis/Celery/Kafka) as LLMGate. The runner wraps pytest-llm-sushit for the actual assertions, with structured results piped through pytest --junitxml. Shipped v0.1.0 with the full initial scope — baseline store, CLI, GitHub Action, PR comment bot — in one build.",
    proof: "v0.1.0 shipped · 41 tests passing",
    stats: [{ label: "tests", value: 41 }],
    stack: ["Python", "FastAPI", "PostgreSQL", "GitHub Actions"],
    links: [
      { label: "GitHub", href: "https://github.com/Sushit-prog/EvalFlow" },
    ],
  },
  {
    id: "llmgate",
    name: "LLMGate",
    pitch:
      "A self-hosted LLM API gateway — FastAPI with LiteLLM for provider routing, PostgreSQL for usage and token accounting, and Prometheus/Grafana for live traffic observability, all brought up by a single Docker Compose stack.",
    problem:
      "Apps that call LLMs tend to talk to every provider directly — there's no single place to enforce routing, track usage per key or team, or watch traffic in one dashboard. That makes cost control and incident visibility ad-hoc.",
    how: "Built FastAPI as the control plane with LiteLLM handling provider abstraction, PostgreSQL persisting usage and token accounting, and Prometheus + Grafana surfacing live request traffic. Deliberately minimal footprint — no Redis/Celery/Kafka — so an operator can bring the whole gateway up with one Compose stack.",
    proof:
      "self-hosted deployment surface: routing + observability in one stack",
    stats: [],
    stack: [
      "Python",
      "FastAPI",
      "LiteLLM",
      "PostgreSQL",
      "Prometheus",
      "Grafana",
    ],
    links: [
      { label: "GitHub", href: "https://github.com/Sushit-prog/llmgate" },
    ],
  },
  {
    id: "praxis",
    name: "Praxis",
    pitch:
      "A multi-agent research-to-prototype copilot: triages a paper or repository into a technical blueprint, then scaffolds a working prototype — each stage handled by a dedicated agent instead of one model doing everything.",
    problem:
      "Going from \u201chere's an interesting paper\u201d to \u201chere's something you can run and test\u201d is mostly tedious plumbing — reading the paper, sketching an architecture, and scaffolding a first working version. One model pass over the whole job produces shallow, unstructured output.",
    how: "Split the pipeline across agents with distinct responsibilities — triage, planning, and prototyping — each passing a structured artifact (a blueprint) to the next, so the plan is explicit and inspectable before any code is written.",
    proof: "multi-agent pipeline: paper/repo → blueprint → runnable prototype",
    stats: [],
    stack: ["Python", "Multi-agent", "Research"],
    links: [{ label: "GitHub", href: "https://github.com/Sushit-prog/praxis" }],
  },
  {
    id: "sentinel",
    name: "SENTINEL",
    pitch:
      "A multi-module digital public safety platform built for the ET AI Hackathon 2.0 — SCAMWatch, CURRENCYGuard, FRAUDGraph, and a cross-module intelligence dashboard.",
    problem:
      "Fraud detection tooling is fragmented: separate systems for scam patterns, currency and security verification, and fraud networks, with no way to correlate signals across all of them.",
    how: "LangGraph + Groq power the scam-detection engine, OpenCV handles image-based currency and security analysis, Neo4j (with an in-memory fallback) plus pyvis/networkx map fraud networks, and ChromaDB correlates signals across the four modules into one live dashboard.",
    proof: "ET AI Hackathon 2.0 — 4 modules, one live dashboard",
    stats: [],
    stack: ["LangGraph", "Groq", "OpenCV", "Neo4j", "ChromaDB"],
    links: [
      { label: "GitHub", href: "https://github.com/Sushit-prog/sentinel" },
    ],
  },
  {
    id: "gatekeeper",
    name: "GateKeeper",
    pitch:
      "A tool-calling security framework that uses structural isolation and deterministic rule engines instead of LLM-based judgment for deciding what's safe to execute.",
    problem:
      "Most tool-calling security relies on an LLM judging whether a call looks safe — which means the thing deciding whether an action is safe is the same kind of system that can be tricked into taking it.",
    how: "Built and benchmarked against a self-designed adversarial test suite across difficulty tiers, measuring failure rate reduction directly rather than relying on qualitative review. The structural isolation approach means the gate never reads the agent's justification at all — it evaluates only the tool name, its arguments, and session history, so how persuasive the excuse is becomes irrelevant.",
    proof:
      "failure rate down from 100% → 12.5% at the sophisticated attack tier",
    stats: [
      { label: "failure rate · sophisticated tier", value: 12.5, suffix: "%" },
    ],
    stack: ["Python"],
    links: [{ label: "GitHub", href: "https://github.com/Sushit-prog" }],
    caveat:
      "Benchmark is self-designed, not third-party — reported honestly, ready to defend it.",
  },
];
