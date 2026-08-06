import { useMemo, useState } from "react";

import PageLayout from "@/components/page-layout";
import ProjectCard from "@/components/project-card";
import ProjectModal from "@/components/project-modal";
import SectionKicker from "@/components/section-kicker";
import { projects, type Pillar, type Project } from "@/lib/projects";

const filters: { value: "all" | Pillar; label: string; testId: string }[] = [
  { value: "all", label: "all systems", testId: "button-filter-all" },
  {
    value: "Infra / Eval / Reliability",
    label: "infra / eval",
    testId: "button-filter-reliability",
  },
  {
    value: "Agentic Systems",
    label: "agentic",
    testId: "button-filter-agents",
  },
];

function ProjectsPage() {
  const [activePillar, setActivePillar] = useState<"all" | Pillar>("all");
  const [showAll, setShowAll] = useState(false);
  const [activeProject, setActiveProject] = useState<Project | null>(null);

  const visibleProjects = useMemo(() => {
    const filtered =
      activePillar === "all"
        ? projects
        : projects.filter((project) => project.pillar === activePillar);
    return showAll ? filtered : filtered.filter((project) => project.featured);
  }, [activePillar, showAll]);

  const filterProjects = (pillar: "all" | Pillar) => {
    setActivePillar(pillar);
    setShowAll(false);
  };

  return (
    <PageLayout>
      <section aria-labelledby="work-title" className="py-20 sm:py-28">
        <SectionKicker
          command="$ cat projects.json | jq '.projects[]'"
          index="02"
        />
        <div className="mb-10 flex flex-col justify-between gap-7 lg:flex-row lg:items-end">
          <div>
            <h2
              id="work-title"
              className="text-2xl font-semibold tracking-[-0.04em] text-[#CAFF3C] sm:text-3xl"
            >
              Selected systems
            </h2>
            <p className="mt-3 max-w-xl text-sm leading-6 text-[#8AFF57]/55">
              Tools for making LLM behavior safer to ship — from the request
              boundary to the agent runtime.
            </p>
          </div>
          <div
            role="group"
            aria-label="Filter projects"
            className="flex flex-wrap gap-2"
          >
            {filters.map((filter) => (
              <button
                key={filter.value}
                type="button"
                onClick={() => filterProjects(filter.value)}
                data-testid={filter.testId}
                aria-pressed={activePillar === filter.value}
                className={`focus-ring border px-3 py-2 text-[10px] uppercase tracking-wider transition-colors ${activePillar === filter.value ? "border-[#CAFF3C] bg-[#CAFF3C] text-[#0A0F08]" : "border-[#8AFF57]/20 text-[#8AFF57]/55 hover:border-[#8AFF57]/60 hover:text-[#CAFF3C]"}`}
              >
                {filter.label}
              </button>
            ))}
          </div>
        </div>
        <div className="grid gap-4 md:grid-cols-2">
          {visibleProjects.map((project, index) => (
            <ProjectCard
              key={project.id}
              project={project}
              index={index}
              onSelect={setActiveProject}
            />
          ))}
        </div>
        <div className="mt-8 flex justify-center">
          <button
            type="button"
            onClick={() => setShowAll((value) => !value)}
            data-testid="button-toggle-projects"
            className="focus-ring border-b border-[#8AFF57]/40 pb-2 text-[11px] uppercase tracking-[0.16em] text-[#8AFF57]/70 hover:border-[#CAFF3C] hover:text-[#CAFF3C]"
          >
            {showAll ? "$ show featured only" : "$ cat all-projects"}
          </button>
        </div>
      </section>
      <ProjectModal
        project={activeProject}
        onClose={() => setActiveProject(null)}
      />
    </PageLayout>
  );
}

export default ProjectsPage;
