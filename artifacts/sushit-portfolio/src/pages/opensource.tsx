import { GitPullRequest } from "lucide-react";

import PageLayout from "@/components/page-layout";
import SectionKicker from "@/components/section-kicker";

const contributions: [string, string, string][] = [
  ["LiteLLM", "parallel request limiter logic", "merged upstream"],
  ["marimo", "PR #9302", "open source contribution"],
  ["Onyx", "PR #10005", "open source contribution"],
];

function OpenSourcePage() {
  return (
    <PageLayout>
      <section aria-labelledby="opensource-title" className="py-20 sm:py-28">
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
    </PageLayout>
  );
}

export default OpenSourcePage;
