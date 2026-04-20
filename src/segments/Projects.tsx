import NPMIcon from "@/assets/icons/NPMIcon";
import attendifyDashBoard from "@/assets/images/attendify-dashboard.png";
import dashBoard from "@/assets/images/billety-dashboard.png";
import cssGridPlaygroundImg from "@/assets/images/css-playground.png";
import linkedLoom from "@/assets/images/linkedloom.png";
import npmImage from "@/assets/images/npm-image.png";
import { Marquee } from "@/components/magicui/marquee";
import { Card } from "@/components/ui/card";
import { portfolioKnowledge } from "@/data/profile";
import { cn } from "@/lib/utils";
import GridLayout, { GridLayoutProps } from "@/shared/GridLayout";
import type { ProfileProject } from "@/types/profile";
import { FileTextIcon, GlobeIcon } from "@radix-ui/react-icons";
import { ScanFaceIcon } from "lucide-react";

const projectIconMap: Record<
  ProfileProject["icon"],
  GridLayoutProps["features"][number]["Icon"]
> = {
  "file-text": FileTextIcon,
  npm: NPMIcon,
  globe: GlobeIcon,
  "scan-face": ScanFaceIcon,
};

const projectClassMap: Record<ProfileProject["visual"], string> = {
  billety: "lg:row-start-4 lg:row-end-5 lg:col-start-2 lg:col-end-4",
  "client-trace": "lg:col-start-1 lg:col-end-3 lg:row-start-1 lg:row-end-4",
  "css-grid-playground": "lg:col-start-1 lg:col-end-2 lg:row-start-4 lg:row-end-5",
  linkedloom: "lg:col-start-1 lg:col-end-4 lg:row-start-5 lg:row-end-6",
  attendify: "lg:col-start-3 lg:col-end-4 lg:row-start-1 lg:row-end-4",
};

const projectImages = {
  billety: dashBoard,
  "client-trace": npmImage,
  "css-grid-playground": cssGridPlaygroundImg,
  linkedloom: linkedLoom,
  attendify: attendifyDashBoard,
} as const;

const buildProjectBackground = (project: ProfileProject) => {
  if (project.visual === "client-trace") {
    return (
      <Marquee
        pauseOnHover
        className="absolute [--duration:20s] [mask-image:linear-gradient(to_top,transparent_10%,#000_100%)] "
      >
        {[1, 2, 3, 4].map((_, idx) => (
          <figure
            key={idx}
            className={cn(
              "relative w-102 h-64 cursor-pointer overflow-hidden rounded-xl border",
              "border-gray-950/[.1] bg-gray-950/[.01] hover:bg-gray-950/[.05]",
              "dark:border-gray-50/[.1] dark:bg-gray-50/[.10] dark:hover:bg-gray-50/[.15]",
              "transform-gpu transition-all duration-300 ease-out hover:blur-none"
            )}
          >
            <img
              src={projectImages[project.visual]}
              alt={project.name}
              className="h-full w-auto object-fill transition-all duration-500 ease-in-out opacity-80 dark:opacity-40 hover:opacity-100"
            />
          </figure>
        ))}
      </Marquee>
    );
  }

  if (project.visual === "linkedloom") {
    return (
      <Marquee
        pauseOnHover
        reverse
        className="absolute [--duration:20s] [mask-image:linear-gradient(to_top,transparent_5%,#000_100%)] "
      >
        {[projectImages[project.visual], projectImages[project.visual]].map(
          (image, idx) => (
            <figure
              key={idx}
              className={cn(
                "relative w-100 h-62 cursor-pointer overflow-hidden rounded-xl border ",
                "border-gray-950/[.1] bg-gray-950/[.01] hover:bg-gray-950/[.01]",
                "dark:border-gray-50/[.1] dark:bg-gray-50/[.10] dark:hover:bg-gray-50/[.15]",
                "transform-gpu transition-all duration-300 ease-out hover:blur-none"
              )}
            >
              <img
                src={image}
                alt={project.name}
                className="h-full w-auto object-fill transition-all duration-500 ease-in-out opacity-80 dark:opacity-40 hover:opacity-100"
              />
            </figure>
          )
        )}
      </Marquee>
    );
  }

  return (
    <img
      src={projectImages[project.visual]}
      alt={project.name}
      className="absolute opacity-80 dark:opacity-40 [mask-image:linear-gradient(to_top,transparent_5%,#000_100%)] object-cover w-full h-full"
    />
  );
};

const features: GridLayoutProps["features"] = portfolioKnowledge.projects.map(
  (project) => ({
    Icon: projectIconMap[project.icon],
    name: project.name,
    description: project.description,
    longDescription: project.longDescription,
    timeline: project.timeline,
    techStack: project.techStack,
    liveHref: project.liveHref,
    sourceHref: project.sourceHref,
    showButtonText: true,
    images: [projectImages[project.visual]],
    downloads: project.downloads,
    background: buildProjectBackground(project),
    className: projectClassMap[project.visual],
  })
);

const Projects = () => {
  return (
    <Card className="flex flex-col items-start gap-4 border-x-0 border-t-0 p-6 border-b-2">
      <p className="font-extrabold">Personal Projects</p>
      <GridLayout features={features} />
    </Card>
  );
};

export default Projects;
