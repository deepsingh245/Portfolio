import { BentoCard, BentoGrid } from "@/components/magicui/bento-grid";
import { ProjectModal } from "@/shared/project-modal";
import { Project } from "@/types/project";
import { useState } from "react";

export interface GridLayoutProps {
  features: Project[];
}

const GridLayout = ({ features }: GridLayoutProps) => {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  return (
    <>
      <BentoGrid className="lg:grid-rows-2">
        {features.map((feature) => (
          <BentoCard
            key={feature.name}
            {...feature}
            onClick={() => setSelectedProject(feature)}
          />
        ))}
      </BentoGrid>
      <ProjectModal
        project={selectedProject}
        isOpen={!!selectedProject}
        onClose={() => setSelectedProject(null)}
      />
    </>
  );
};

export default GridLayout;
