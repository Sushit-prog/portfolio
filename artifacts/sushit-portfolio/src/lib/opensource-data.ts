export type OSSBlock = {
  heading?: string;
  issue: string;
  fix: string;
  result?: string;
};

export type OSSEntry = {
  id: string;
  title: string;
  ref: string;
  blocks: OSSBlock[];
  links: { label: string; href: string }[];
};

export type OSSRepo = {
  name: string;
  href: string;
  note: string;
  entries: OSSEntry[];
};

export const opensourceRepos: OSSRepo[] = [
  {
    name: "marimo",
    href: "https://github.com/marimo-team/marimo",
    note: "external repo · contributed upstream, not maintained by me",
    entries: [
      {
        id: "reactive-error-propagation",
        title: "Reactive error propagation",
        ref: "PR #9302",
        blocks: [
          {
            issue:
              "ScratchCellListener was dropping downstream reactive errors instead of propagating them.",
            fix: "Corrected the listener so errors surface through the reactive chain properly.",
          },
        ],
        links: [
          {
            label: "PR #9302",
            href: "https://github.com/marimo-team/marimo/pull/9302",
          },
        ],
      },
      {
        id: "download-filename-regression",
        title: "Download filename regression",
        ref: "closes #8095, #5240",
        blocks: [
          {
            issue:
              "Downloaded files were named df.csv instead of the real variable name.",
            fix: "infer_variable_name() used identity checks (is) that fail once a dataframe is wrapped or transformed, silently falling back to \u201cdf\u201d. Look up the real name at runtime via ctx.ui_element_registry.bound_names(self._id), through a new shared get_bound_name() utility used by dataframes/dataframe.py and table.py.",
            result: "Added a regression test in test_dataframe.py.",
          },
        ],
        links: [
          {
            label: "#8095",
            href: "https://github.com/marimo-team/marimo/issues/8095",
          },
          {
            label: "#5240",
            href: "https://github.com/marimo-team/marimo/issues/5240",
          },
        ],
      },
      {
        id: "range-slider-track-drag",
        title: "Range slider track drag",
        ref: "PR #8698",
        blocks: [
          {
            issue:
              "Range sliders could only be adjusted one handle at a time — no way to move the whole selected range together.",
            fix: "Dragging the filled track now moves both handles as one, preserving range width. Frontend-only (range-slider.tsx): captures pointerdown position/value once, computes delta from that fixed anchor on pointermove, and uses pointer capture for smooth off-element dragging.",
            result:
              "Verified track drag preserves width, independent handle drag still works, step snapping holds during track drag, vertical orientation, discrete steps, boundary clamping.",
          },
        ],
        links: [
          {
            label: "PR #8698",
            href: "https://github.com/marimo-team/marimo/pull/8698",
          },
        ],
      },
    ],
  },
  {
    name: "LiteLLM",
    href: "https://github.com/BerriAI/litellm",
    note: "external repo · contributed upstream, not maintained by me",
    entries: [
      {
        id: "parallel-request-limiter",
        title: "Parallel request limiter fixes",
        ref: "PR #32447, #33010",
        blocks: [
          {
            heading: "Part A — legacy v1 limiter (#32447)",
            issue:
              "The legacy limiter wrote to Redis on every request for every API key, user, team, and end-user — even when nothing had a rate limit configured. Pure overhead at scale.",
            fix: "A shared _entity_has_any_limit helper gates the write against the real UserAPIKeyAuth object before touching Redis, across all 4 scopes. Deliberately scoped to the post-call tracking path only (pre-call enforcement left untouched as riskier/out of scope). Built-in safety fallback: reverts to the old unconditional write if the auth object is ever missing, rather than silently disabling tracking.",
            result:
              "75% patch coverage (62% target), full CI green. Local Redis before/after verification was inconclusive for unrelated reasons — documented directly in the PR and relied on the unit suite as primary verification instead.",
          },
          {
            heading:
              "Part B — default v3 limiter (#33010), companion to #32447",
            issue:
              "The default limiter already skipped pre-call writes correctly for unlimited entities, but post-call success/failure logging didn't know that and wrote TPM/decrement operations anyway.",
            fix: "A _no_rate_limits marker set during the pre-call no-descriptors path, checked as an early-return guard in the logging functions. Security catch: a reviewer bot found a client could forge that marker in request metadata to bypass TPM accounting — fixed by adding it to the existing stash-key stripping mechanism so any client-supplied value is scrubbed before the server sets its own, verified with a dedicated negative-control test. Traced the full metadata flow end-to-end to confirm nothing leaks to the LLM provider itself.",
            result:
              "77 tests passing, 6 new named tests including the security regression guard, confirmed 2 unrelated pre-existing CI failures were untouched by the change.",
          },
        ],
        links: [
          {
            label: "PR #32447",
            href: "https://github.com/BerriAI/litellm/pull/32447",
          },
          {
            label: "PR #33010",
            href: "https://github.com/BerriAI/litellm/pull/33010",
          },
        ],
      },
    ],
  },
];
