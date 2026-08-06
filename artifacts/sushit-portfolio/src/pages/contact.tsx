import { useEffect, useRef } from "react";
import { FileText, Github, Linkedin, Mail } from "lucide-react";

import PageLayout from "@/components/page-layout";
import SectionKicker from "@/components/section-kicker";
import {
  contactLinks,
  ctaLine,
  headline,
  introParagraphs,
  type ContactLink,
} from "@/lib/contact-data";

const asset = (path: string) => `${import.meta.env.BASE_URL}${path}`;

function LinkIcon({ link }: { link: ContactLink }) {
  const Icon =
    link.id === "linkedin"
      ? Linkedin
      : link.id === "github"
        ? Github
        : link.id === "resume"
          ? FileText
          : Mail;
  return <Icon size={15} />;
}

function ContactPage() {
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
        gsap.from(".contact-reveal", {
          opacity: 0,
          y: 24,
          duration: 0.5,
          ease: "power2.out",
          stagger: 0.1,
          scrollTrigger: { trigger: ".contact-content", start: "top 85%" },
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
        aria-labelledby="contact-title"
        className="py-20 sm:py-28"
        ref={rootRef}
      >
        <SectionKicker command="$ mail sushit" index="06" />
        <div className="contact-content max-w-3xl">
          <div className="contact-reveal">
            <h2
              id="contact-title"
              className="text-3xl font-semibold tracking-[-0.06em] text-[#CAFF3C] text-glow sm:text-5xl"
            >
              {headline}
            </h2>
          </div>
          <div className="contact-reveal mt-8">
            <div className="space-y-5 text-sm leading-7 text-[#d8e8ce]/70 sm:text-base">
              {introParagraphs.map((paragraph) => (
                <p key={paragraph.slice(0, 24)}>{paragraph}</p>
              ))}
            </div>
            <p className="mt-8 text-xs leading-6 text-[#8AFF57]/65">
              <span className="text-[#CAFF3C]">&gt;</span> {ctaLine}
            </p>
          </div>
          <div className="contact-reveal mt-10 flex flex-wrap gap-3">
            {contactLinks.map((link) => {
              const isPrimary = link.type === "mail";
              const href =
                link.type === "download" ? asset(link.href) : link.href;
              const external =
                link.type === "external" || link.type === "download";
              return (
                <a
                  key={link.id}
                  href={href}
                  target={external ? "_blank" : undefined}
                  rel={external ? "noreferrer" : undefined}
                  download={link.type === "download" ? "resume.pdf" : undefined}
                  data-testid={`link-contact-${link.id}`}
                  className={`focus-ring inline-flex items-center gap-2 px-4 py-3 text-xs uppercase tracking-wider transition-colors ${
                    isPrimary
                      ? "border border-[#CAFF3C] bg-[#CAFF3C] text-[#0A0F08] hover:bg-[#8AFF57]"
                      : "border border-[#8AFF57]/35 text-[#CAFF3C] hover:border-[#CAFF3C] hover:bg-[#CAFF3C]/10"
                  }`}
                >
                  <LinkIcon link={link} /> {link.label}
                </a>
              );
            })}
          </div>
        </div>
      </section>
    </PageLayout>
  );
}

export default ContactPage;
