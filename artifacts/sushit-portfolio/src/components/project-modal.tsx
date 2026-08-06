import * as DialogPrimitive from "@radix-ui/react-dialog";
import { Terminal, X } from "lucide-react";

import ExternalLinkRow from "./external-link-row";

import type { Project } from "@/lib/projects";

type ProjectModalProps = {
  project: Project | null;
  onClose: () => void;
};

function ProjectModal({ project, onClose }: ProjectModalProps) {
  return (
    <DialogPrimitive.Root
      open={project !== null}
      onOpenChange={(open) => {
        if (!open) {
          onClose();
        }
      }}
    >
      <DialogPrimitive.Portal>
        <DialogPrimitive.Overlay className="modal-overlay fixed inset-0 z-50 bg-[#0A0F08]/85" />
        {project && (
          <DialogPrimitive.Content
            data-testid={`modal-project-${project.id}`}
            className="modal-panel fixed inset-0 z-50 flex w-full flex-col overflow-y-auto bg-[#0A0F08] p-6 sm:inset-auto sm:left-1/2 sm:top-1/2 sm:max-h-[85vh] sm:max-w-lg sm:-translate-x-1/2 sm:-translate-y-1/2 sm:rounded-lg sm:border sm:border-[#8AFF57]/25 sm:bg-[#0A0F08]/95 sm:p-8"
          >
            <div className="mb-6 flex items-center justify-between border-b border-[#8AFF57]/15 pb-4 text-[10px] uppercase tracking-[0.18em] text-[#8AFF57]/40">
              <span className="flex items-center gap-2">
                <Terminal size={13} />$ cat {project.id}.md
              </span>
              <span className="hidden sm:inline">status: {project.status}</span>
            </div>

            <DialogPrimitive.Title asChild>
              <h2 className="text-2xl font-semibold tracking-[-0.04em] text-[#CAFF3C] text-glow sm:text-3xl">
                {project.name}
              </h2>
            </DialogPrimitive.Title>

            <DialogPrimitive.Description className="sr-only">
              {project.summary ?? project.description}
            </DialogPrimitive.Description>

            <p className="mt-5 text-sm leading-7 text-[#d8e8ce]/70">
              {project.summary ?? project.description}
            </p>

            {project.builtWith && (
              <p className="mt-5 border-l-2 border-[#CAFF3C] pl-4 text-sm leading-7 text-[#8AFF57]/70">
                <span className="text-[#CAFF3C]">$</span> built with:{" "}
                {project.builtWith}
              </p>
            )}

            <div className="mt-6 flex flex-wrap gap-2">
              {project.tags.map((tag) => (
                <span
                  key={tag}
                  className="border border-[#8AFF57]/15 bg-[#8AFF57]/[0.035] px-2 py-1 text-[10px] uppercase tracking-wide text-[#8AFF57]/60"
                >
                  {tag}
                </span>
              ))}
            </div>

            <div className="mt-6 flex flex-wrap items-center gap-3 border-t border-[#8AFF57]/10 pt-5">
              <span className="text-[10px] uppercase tracking-wider text-[#8AFF57]/40">
                links
              </span>
              <ExternalLinkRow links={project.links} projectId={project.id} />
            </div>

            <DialogPrimitive.Close
              data-testid={`modal-close-${project.id}`}
              aria-label="Close project details"
              className="focus-ring absolute right-4 top-4 rounded-sm p-1 text-[#8AFF57]/60 transition-colors hover:text-[#CAFF3C]"
            >
              <X size={18} strokeWidth={1.5} />
            </DialogPrimitive.Close>
          </DialogPrimitive.Content>
        )}
      </DialogPrimitive.Portal>
    </DialogPrimitive.Root>
  );
}

export default ProjectModal;
