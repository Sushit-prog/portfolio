import { useEffect, useRef, useState } from "react";
import { ArrowUpRight, FileText, Maximize2, X } from "lucide-react";

import PageLayout from "@/components/page-layout";
import SectionKicker from "@/components/section-kicker";
import {
  experienceEntries,
  type Certificate,
  type ExperienceEntry,
} from "@/lib/experience-data";

const asset = (path: string) => `${import.meta.env.BASE_URL}${path}`;

function CertificateSlot({ certificate }: { certificate: Certificate }) {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!open) {
      return;
    }
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setOpen(false);
      }
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [open]);

  if (certificate.type === "pdf") {
    return (
      <a
        href={asset(certificate.path)}
        target="_blank"
        rel="noreferrer"
        data-testid={`certificate-${certificate.alt}`}
        className="focus-ring inline-flex items-center gap-2 border border-[#8AFF57]/35 px-4 py-3 text-xs uppercase tracking-wider text-[#CAFF3C] transition-colors hover:border-[#CAFF3C] hover:bg-[#CAFF3C]/10"
      >
        <FileText size={14} />
        {certificate.label}
        <ArrowUpRight size={14} />
      </a>
    );
  }

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        data-testid={`certificate-${certificate.alt}`}
        className="focus-ring group block max-w-[260px] border border-[#8AFF57]/25 bg-[#8AFF57]/[0.03] p-2 text-left transition-colors hover:border-[#CAFF3C]/60"
      >
        <img
          src={asset(certificate.path)}
          alt={certificate.alt}
          loading="lazy"
          className="w-full border border-[#8AFF57]/10"
        />
        <span className="mt-2 flex items-center justify-center gap-1.5 text-[10px] uppercase tracking-wider text-[#8AFF57]/60 group-hover:text-[#CAFF3C]">
          <Maximize2 size={12} />
          {certificate.label}
        </span>
      </button>
      {open && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={certificate.alt}
          onClick={() => setOpen(false)}
          className="fixed inset-0 z-[60] flex items-center justify-center bg-[#0A0F08]/95 p-4 sm:p-10"
        >
          <button
            type="button"
            onClick={() => setOpen(false)}
            aria-label="Close certificate"
            className="focus-ring absolute right-4 top-4 inline-flex items-center gap-1 border border-[#8AFF57]/35 px-3 py-2 text-[10px] uppercase tracking-wider text-[#8AFF57]/70 transition-colors hover:border-[#CAFF3C] hover:text-[#CAFF3C] sm:right-6 sm:top-6"
          >
            <X size={13} /> close
          </button>
          <img
            src={asset(certificate.path)}
            alt={certificate.alt}
            onClick={(event) => event.stopPropagation()}
            className="max-h-full max-w-full border border-[#8AFF57]/25 shadow-[0_0_60px_rgba(138,255,87,.08)]"
          />
        </div>
      )}
    </>
  );
}

function ExperienceRow({
  entry,
  index,
}: {
  entry: ExperienceEntry;
  index: number;
}) {
  return (
    <article
      data-testid={`row-experience-${index}`}
      className="experience-card-reveal border-b border-[#8AFF57]/10 py-8 last:border-0"
    >
      <div className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-2">
        <div>
          <h3 className="text-sm font-semibold tracking-tight text-[#CAFF3C] sm:text-base">
            {entry.role}
          </h3>
          <p className="mt-1 text-xs text-[#8AFF57]/60">{entry.company}</p>
        </div>
        <span className="font-mono text-[10px] text-[#8AFF57]/40">
          {entry.duration}
        </span>
      </div>

      <div className="mt-5">
        <div className="mb-2 text-[10px] uppercase tracking-wider text-[#8AFF57]">
          what I built
        </div>
        <ul className="space-y-1.5">
          {entry.bullets.map((bullet) => (
            <li
              key={bullet}
              className="flex gap-2 text-sm leading-6 text-[#d8e8ce]/60"
            >
              <span className="select-none text-[#CAFF3C]">&gt;</span>
              <span>{bullet}</span>
            </li>
          ))}
        </ul>
        {entry.note && (
          <p className="mt-3 text-xs italic leading-5 text-[#8AFF57]/45">
            {entry.note}
          </p>
        )}
      </div>

      <div className="mt-6">
        <div className="mb-2 text-[10px] uppercase tracking-wider text-[#8AFF57]">
          certificate
        </div>
        <CertificateSlot certificate={entry.certificate} />
      </div>
    </article>
  );
}

function ExperiencePage() {
  const rootRef = useRef<HTMLDivElement>(null);

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
        gsap.from(".experience-card-reveal", {
          opacity: 0,
          y: 24,
          duration: 0.5,
          ease: "power2.out",
          stagger: 0.1,
          scrollTrigger: { trigger: ".experience-list", start: "top 85%" },
        });
      }, rootRef);
    })();

    return () => {
      cancelled = true;
      ctx?.revert();
    };
  }, []);

  return (
    <PageLayout>
      <section
        aria-labelledby="experience-title"
        className="py-20 sm:py-28"
        ref={rootRef}
      >
        <SectionKicker command="$ cat experience.log" index="03" />
        <div className="mb-10 max-w-2xl">
          <h2
            id="experience-title"
            className="text-2xl font-semibold tracking-[-0.04em] text-[#CAFF3C] sm:text-3xl"
          >
            Experience
          </h2>
          <p className="mt-3 text-sm leading-6 text-[#8AFF57]/55">
            The path into AI Engineering so far.
          </p>
        </div>

        <div className="experience-list max-w-4xl border-y border-[#8AFF57]/10">
          {experienceEntries.map((entry, index) => (
            <ExperienceRow key={entry.id} entry={entry} index={index} />
          ))}
        </div>
      </section>
    </PageLayout>
  );
}

export default ExperiencePage;
