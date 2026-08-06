import PageLayout from "@/components/page-layout";
import SectionKicker from "@/components/section-kicker";

const otherWork: [string, string][] = [
  [
    "iNeuBytes — AI/ML Engineering Internship",
    "Netflix dataset analysis, AAPL stock price prediction, and heart disease prediction models",
  ],
  ["Thiranex — Data Science Internship", "Description to be added."],
];

function ExperiencePage() {
  return (
    <PageLayout>
      <section aria-labelledby="other-work-title" className="py-20 sm:py-28">
        <SectionKicker command="$ cat other-work.txt" index="03" />
        <div className="mb-10">
          <h2
            id="other-work-title"
            className="text-2xl font-semibold tracking-[-0.04em] text-[#CAFF3C] sm:text-3xl"
          >
            Other Work
          </h2>
          <p className="mt-3 max-w-xl text-xs leading-6 text-[#8AFF57]/45">
            Earlier signals from the path into AI Engineering.
          </p>
        </div>
        <div className="max-w-4xl border-y border-[#8AFF57]/10">
          {otherWork.map(([title, description], index) => (
            <div
              key={title}
              data-testid={`row-other-work-${index}`}
              className="grid gap-2 border-b border-[#8AFF57]/10 py-5 last:border-0 sm:grid-cols-[minmax(220px,.7fr)_1.3fr] sm:gap-8"
            >
              <span className="text-xs text-[#CAFF3C]/85">{title}</span>
              <span className="text-xs leading-5 text-[#d8e8ce]/55">
                {description}
              </span>
            </div>
          ))}
        </div>
      </section>
    </PageLayout>
  );
}

export default ExperiencePage;
