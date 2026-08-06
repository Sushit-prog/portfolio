import type { KeyboardEvent } from "react";

import ExternalLinkRow from "./external-link-row";

import type { Project } from "@/lib/projects";

function ProjectCard({
  project,
  index,
  onSelect,
}: {
  project: Project;
  index: number;
  onSelect: (project: Project) => void;
}) {
  const handleKeyDown = (event: KeyboardEvent<HTMLElement>) => {
    if (event.target !== event.currentTarget) {
      return;
    }
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      onSelect(project);
    }
  };

  return (
    <article
      data-testid={`card-project-${project.id}`}
      onClick={() => onSelect(project)}
      onKeyDown={handleKeyDown}
      role="button"
      tabIndex={0}
      aria-label={`View details for ${project.name}`}
      className={`group terminal-panel relative flex min-h-[285px] cursor-pointer flex-col justify-between overflow-hidden p-5 transition-colors duration-200 hover:border-[#8AFF57]/60 focus-ring sm:p-6 ${project.featured ? "md:min-h-[310px]" : ""}`}
    >
      <div className="absolute right-0 top-0 h-16 w-16 border-l border-b border-[#8AFF57]/10 bg-[#8AFF57]/[0.015] transition-colors group-hover:bg-[#8AFF57]/[0.05]" />
      <div>
        <div className="mb-7 flex items-start justify-between gap-4">
          <span className="font-mono text-[11px] text-[#8AFF57]/35">
            0{index + 1} /{" "}
            {project.pillar === "Agentic Systems" ? "AGT" : "REL"}
          </span>
          <span
            data-testid={`status-project-${project.id}`}
            className={`inline-flex items-center gap-2 text-right text-[10px] uppercase tracking-wider ${project.statusTone === "live" ? "text-[#CAFF3C]" : project.statusTone === "oss" ? "text-[#8AFF57]" : "text-[#8AFF57]/55"}`}
          >
            <span
              className={`h-1.5 w-1.5 rounded-full ${project.statusTone === "live" ? "bg-[#CAFF3C]" : "bg-[#8AFF57]/60"}`}
            />
            {project.status}
          </span>
        </div>
        <h3 className="mb-3 max-w-[90%] text-lg font-semibold tracking-tight text-[#CAFF3C] text-glow sm:text-xl">
          {project.name}
        </h3>
        <p className="max-w-[52ch] text-sm leading-6 text-[#d8e8ce]/65">
          {project.description}
        </p>
      </div>
      <div className="mt-8">
        <div className="mb-5 flex flex-wrap gap-2">
          {project.tags.map((tag) => (
            <span
              key={tag}
              className="border border-[#8AFF57]/15 bg-[#8AFF57]/[0.035] px-2 py-1 text-[10px] uppercase tracking-wide text-[#8AFF57]/60"
            >
              {tag}
            </span>
          ))}
        </div>
        <div onClick={(event) => event.stopPropagation()}>
          <ExternalLinkRow links={project.links} projectId={project.id} />
        </div>
      </div>
    </article>
  );
}

export default ProjectCard;
