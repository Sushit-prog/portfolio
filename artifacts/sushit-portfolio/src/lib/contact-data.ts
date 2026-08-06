export type ContactLink = {
  id: string;
  label: string;
  href: string;
  type: "mail" | "external" | "download";
};

export const headline = "Let's build something that has to work.";

export const introParagraphs = [
  "I'm not looking for a project to pad a portfolio — I'm looking for a team building real infrastructure: agents, evaluation, safety, or whatever sits underneath a product that can't afford to fail quietly. If that's what you're working on, I'd like to talk.",
  "I test adversarially before I call anything done, I publish what I ship, and I document my own failures instead of hiding them. That's not a pitch — you can go check it, it's all linked below.",
];

export const ctaLine =
  "Open to internships and full-time AI Engineer roles. I usually reply the same day.";

export const contactLinks: ContactLink[] = [
  {
    id: "email",
    label: "email",
    href: "mailto:pakrasys@gmail.com",
    type: "mail",
  },
  {
    id: "linkedin",
    label: "linkedin",
    href: "https://www.linkedin.com/in/sushit-lal-pakrashy-590a1130b/",
    type: "external",
  },
  {
    id: "github",
    label: "github",
    href: "https://github.com/Sushit-prog",
    type: "external",
  },
  {
    id: "resume",
    label: "resume",
    href: "resume.pdf",
    type: "download",
  },
];
