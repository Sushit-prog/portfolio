import { ArrowUpRight, Github } from "lucide-react";

import PageLayout from "@/components/page-layout";
import ScrollReveal from "@/components/scroll-reveal";
import SectionKicker from "@/components/section-kicker";
import { bio, experience, links, skillGroups } from "@/lib/about";

const stats: [string, string][] = [
  ["07", "systems listed"],
  ["03", "PyPI releases"],
  ["02", "internships"],
  ["∞", "failure modes to find"],
];

const portraitSrc = `${import.meta.env.BASE_URL}me.png`;

function AboutPage() {
  return (
    <PageLayout>
      <section aria-labelledby="about-title" className="py-20 sm:py-28">
        <SectionKicker command="$ cat about.md" index="01" />
        <div className="grid gap-10 lg:grid-cols-[.8fr_1.2fr] lg:gap-24">
          <div>
            <ScrollReveal className="terminal-panel w-full max-w-[240px] p-2">
              <img
                src={portraitSrc}
                alt="Portrait of Sushit"
                className="w-full border border-[#8AFF57]/15"
              />
            </ScrollReveal>
            <ScrollReveal delay={100}>
              <h2
                id="about-title"
                className="mt-8 text-2xl font-semibold tracking-[-0.04em] text-[#CAFF3C] sm:text-3xl"
              >
                An engineer for the
                <br />
                <span className="text-[#8AFF57]/55">
                  uncomfortable edge cases.
                </span>
              </h2>
            </ScrollReveal>
          </div>
          <ScrollReveal
            delay={150}
            className="max-w-2xl space-y-5 text-sm leading-7 text-[#d8e8ce]/70"
          >
            {bio.map((paragraph) => (
              <p key={paragraph.slice(0, 40)}>{paragraph}</p>
            ))}
            <p className="text-[#8AFF57]/75">
              <span className="text-[#CAFF3C]">&gt;</span> I use coding agents
              as force multipliers, then hold the output to open-source-grade
              standards.
            </p>
          </ScrollReveal>
        </div>
        <ScrollReveal
          delay={200}
          className="mt-14 grid grid-cols-2 gap-px border border-[#8AFF57]/15 bg-[#8AFF57]/15 sm:grid-cols-4"
        >
          {stats.map(([value, label]) => (
            <div key={label} className="bg-[#0A0F08] px-4 py-5 sm:px-6">
              <div className="text-2xl text-[#CAFF3C]">{value}</div>
              <div className="mt-2 text-[10px] uppercase tracking-wider text-[#8AFF57]/45">
                {label}
              </div>
            </div>
          ))}
        </ScrollReveal>
      </section>

      <section
        aria-labelledby="skills-title"
        className="border-t border-[#8AFF57]/15 py-20 sm:py-28"
      >
        <SectionKicker command="$ cat skills.log" index="02" />
        <ScrollReveal>
          <h2
            id="skills-title"
            className="text-2xl font-semibold tracking-[-0.04em] text-[#CAFF3C] sm:text-3xl"
          >
            Skills &amp; stack.
          </h2>
        </ScrollReveal>
        <ScrollReveal
          delay={100}
          className="mb-10 mt-4 max-w-xl text-xs leading-6 text-[#8AFF57]/45"
        >
          Grouped by what I can actually defend in an interview — systems that
          were adversarially tested and published, not pasted from a template.
        </ScrollReveal>
        <div className="grid gap-x-10 gap-y-8 md:grid-cols-2">
          {skillGroups.map((group, index) => (
            <ScrollReveal
              key={group.title}
              dataTestId={`text-skill-${index}`}
              delay={index * 100}
              className="border-l border-[#8AFF57]/25 pl-5"
            >
              <div className="mb-3 text-xs uppercase tracking-wider text-[#8AFF57]">
                {group.title}
              </div>
              <ul className="space-y-2">
                {group.items.map((item) => (
                  <li
                    key={item}
                    className="flex gap-2 text-sm leading-6 text-[#d8e8ce]/60"
                  >
                    <span className="select-none text-[#CAFF3C]">&gt;</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </ScrollReveal>
          ))}
        </div>
      </section>

      <section
        aria-labelledby="experience-title"
        className="border-t border-[#8AFF57]/15 py-20 sm:py-28"
      >
        <SectionKicker command="$ cat experience.log" index="03" />
        <ScrollReveal className="mb-8">
          <h2
            id="experience-title"
            className="text-2xl font-semibold tracking-[-0.04em] text-[#CAFF3C] sm:text-3xl"
          >
            Experience
          </h2>
          <p className="mt-3 text-xs leading-6 text-[#8AFF57]/45">
            The path into AI Engineering so far.
          </p>
        </ScrollReveal>
        <div className="max-w-4xl border-y border-[#8AFF57]/10">
          {experience.map(({ title, detail }, index) => (
            <ScrollReveal
              key={title}
              dataTestId={`row-experience-${index}`}
              delay={index * 100}
              className="grid gap-2 border-b border-[#8AFF57]/10 py-5 last:border-0 sm:grid-cols-[minmax(220px,.7fr)_1.3fr] sm:gap-8"
            >
              <span className="text-xs text-[#CAFF3C]/85">{title}</span>
              <span className="text-xs leading-5 text-[#d8e8ce]/55">
                {detail}
              </span>
            </ScrollReveal>
          ))}
        </div>
      </section>

      <section
        aria-labelledby="links-title"
        className="border-t border-[#8AFF57]/15 py-20 sm:py-28"
      >
        <SectionKicker command="$ cat links.txt" index="04" />
        <ScrollReveal className="mb-8">
          <h2
            id="links-title"
            className="text-2xl font-semibold tracking-[-0.04em] text-[#CAFF3C] sm:text-3xl"
          >
            Find me around the web.
          </h2>
        </ScrollReveal>
        <ScrollReveal
          delay={100}
          className="flex flex-wrap items-center gap-x-5 gap-y-4"
        >
          {links.map((link) =>
            link.label === "GitHub" ? (
              <a
                key={link.label}
                href={link.href}
                target="_blank"
                rel="noreferrer"
                className="focus-ring inline-flex items-center gap-2 border border-[#8AFF57]/35 px-4 py-3 text-xs uppercase tracking-wider text-[#CAFF3C] transition-colors hover:border-[#CAFF3C] hover:bg-[#CAFF3C]/10"
              >
                <Github size={15} /> {link.label}
              </a>
            ) : (
              <a
                key={link.label}
                href={link.href}
                target="_blank"
                rel="noreferrer"
                className="focus-ring text-xs uppercase tracking-wider text-[#8AFF57]/70 hover:text-[#CAFF3C]"
              >
                {link.label} <ArrowUpRight className="ml-1 inline" size={13} />
              </a>
            ),
          )}
        </ScrollReveal>
      </section>
    </PageLayout>
  );
}

export default AboutPage;
