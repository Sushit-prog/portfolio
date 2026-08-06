export const bio: string[] = [
  "I'm Sushit, an AI Engineer based in West Bengal, India. I build the infrastructure that sits underneath language models — evaluation harnesses, safety middleware, agent runtimes — and increasingly, the agents that run on top of it.",
  "I implement research papers as working software, not slideware — a calibrated drift monitor from a 2024 quantization paper, shipped end-to-end across 15 milestones and released on PyPI. I've found and fixed real security bugs in my own systems before anyone else could: IR tampering in a capability-gated agent runtime, a paging bug that silently dropped conditional logic from compiled programs, SQL injection vectors I tested and neutralized myself. I've also contributed to production infrastructure — LiteLLM's rate limiter — where a maintainer's reviewer bot caught a bypass in my PR, and I fixed it properly instead of arguing with it.",
  "I don't ship demo-ware. Everything I publish has tests — often 200+ per project — and I document my own incidents like postmortems, not marketing copy. If a project doesn't hold up under that bar, I don't publish it.",
];

export type SkillGroup = { title: string; items: string[] };

export const skillGroups: SkillGroup[] = [
  {
    title: "LLM Systems & Safety",
    items: [
      "Capability-gated agent runtimes",
      "Circuit-breaker middleware",
      "Decoding-time drift detection",
      "Prompt-injection defense (two-tier regex + ML)",
      "Agent orchestration — LangGraph, multi-agent systems",
    ],
  },
  {
    title: "Evaluation & CI",
    items: [
      "Semantic assertion testing — pytest plugin, PyPI-published",
      "Regression-gated CI for prompts & agents",
      "Replay & blame-attribution debugging for LangGraph",
      "Evaluation frameworks & drift regression harnesses",
    ],
  },
  {
    title: "Core Stack",
    items: [
      "Python · FastAPI · LangGraph · LiteLLM",
      "PostgreSQL · Redis · Docker",
      "Prometheus / Grafana · Hugging Face",
    ],
  },
  {
    title: "Practice",
    items: [
      "Paper-to-production implementation",
      "Adversarial self-testing",
      "Open-source contribution to production infra (LiteLLM)",
      "Developer tooling — tests, docs, CI authoring",
    ],
  },
];

export const experience: { title: string; detail: string }[] = [
  {
    title: "AI/ML Engineer Intern",
    detail: "iNeuBytes",
  },
  {
    title: "Data Science Intern",
    detail: "Thiranex",
  },
];

export const links: { label: string; href: string; external: boolean }[] = [
  { label: "GitHub", href: "https://github.com/Sushit-prog", external: true },
  {
    label: "Hugging Face",
    href: "https://huggingface.co/Pakrashy",
    external: true,
  },
];
