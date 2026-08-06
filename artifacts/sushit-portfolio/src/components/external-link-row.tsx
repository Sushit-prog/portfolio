import { ArrowUpRight } from "lucide-react";

type ExternalLink = {
  label: string;
  href: string;
};

function ExternalLinkRow({
  links,
  projectId,
}: {
  links: ExternalLink[];
  projectId: string;
}) {
  return (
    <div className="flex flex-wrap gap-3">
      {links.map((link) => (
        <a
          key={link.label}
          href={link.href}
          target="_blank"
          rel="noreferrer"
          data-testid={`link-project-${projectId}-${link.label.toLowerCase()}`}
          className="focus-ring inline-flex items-center gap-1 text-[11px] uppercase tracking-wider text-[#8AFF57]/75 transition-colors hover:text-[#CAFF3C]"
        >
          {link.label}
          <ArrowUpRight size={12} strokeWidth={1.5} />
        </a>
      ))}
    </div>
  );
}

export default ExternalLinkRow;
