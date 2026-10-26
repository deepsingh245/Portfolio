import NPMIcon from "@/assets/icons/NPMIcon";
import attendifyDashBoard from "@/assets/images/attendify-dashboard.png";
import dashBoard from "@/assets/images/billety-dashboard.png";
import cssGridPlaygroundImg from "@/assets/images/css-playground.png";
import hukumnamaScreenshot from "@/assets/images/hukumnama-screenshot.png";
import kryvexScreenshot from "@/assets/images/kryvex-screenshot.png";
import linkedLoom from "@/assets/images/linkedloom.png";
import monWinLogo from "@/assets/images/monwin-logo.jpg";
import npmImage from "@/assets/images/npm-image.png";
import { Marquee } from "@/components/magicui/marquee";
import { Card } from "@/components/ui/card";
import { portfolioKnowledge } from "@/data/profile";
import { cn } from "@/lib/utils";
import GridLayout, { GridLayoutProps } from "@/shared/GridLayout";
import type { ProfileProject } from "@/types/profile";
import { FileTextIcon, GlobeIcon } from "@radix-ui/react-icons";
import {
  BookOpenIcon,
  MonitorIcon,
  ScanFaceIcon,
  ShieldCheckIcon,
} from "lucide-react";

const projectIconMap: Record<
  ProfileProject["icon"],
  GridLayoutProps["features"][number]["Icon"]
> = {
  "file-text": FileTextIcon,
  npm: NPMIcon,
  globe: GlobeIcon,
  "scan-face": ScanFaceIcon,
  monitor: MonitorIcon,
  "book-open": BookOpenIcon,
  "shield-check": ShieldCheckIcon,
};


const projectClassMap: Record<ProfileProject["visual"], string> = {
  billety: "md:col-span-2",
  "client-trace": "lg:col-span-1 lg:row-span-2",
  "css-grid-playground": "lg:col-span-1",
  attendify: "lg:col-span-1",
  monwin: "lg:col-span-1",
  hukumnama: "md:col-span-2",
  kryvex: "lg:col-span-1",
  linkedloom: "md:col-span-2",
};

const projectImages: Partial<Record<ProfileProject["visual"], string>> = {
  billety: dashBoard,
  "client-trace": npmImage,
  "css-grid-playground": cssGridPlaygroundImg,
  linkedloom: linkedLoom,
  attendify: attendifyDashBoard,
  monwin: monWinLogo,
  hukumnama: hukumnamaScreenshot,
  kryvex: kryvexScreenshot,
};

const marqueeFigureClassName = cn(
  "relative cursor-pointer overflow-hidden rounded-xl border transform-gpu transition-all duration-300 ease-out hover:blur-none",
  "border-[color:var(--image-frame)] bg-[color:var(--image-marquee-bg)] hover:bg-[color:var(--image-marquee-hover-bg)]"
);

const imageBlendStyle = {
  opacity: "var(--image-overlay-opacity)",
} as const;

const buildProjectBackground = (project: ProfileProject) => {
  const image = projectImages[project.visual];

  if (!image) {
    const Icon = projectIconMap[project.icon];

    return (
      <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-primary/15 via-background to-muted/40">
        <Icon className="h-32 w-32 text-primary/15" aria-hidden="true" />
      </div>
    );
  }

  if (project.visual === "client-trace") {
    return (
      <Marquee
        pauseOnHover
        className="absolute [--duration:20s] [mask-image:linear-gradient(to_top,transparent_10%,#000_100%)] "
      >
        {[1, 2, 3, 4].map((_, idx) => (
          <figure
            key={idx}
            className={cn("w-102 h-64", marqueeFigureClassName)}
          >
            <img
              loading="lazy"
              src={image}
              alt={project.name}
              style={imageBlendStyle}
              className="h-full w-auto object-fill transition-all duration-500 ease-in-out hover:opacity-100"
            />
          </figure>
        ))}
      </Marquee>
    );
  }

  if (project.visual === "monwin") {
    return (
      <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-blue-950/60 via-background to-cyan-950/40">
        <img
          loading="lazy"
          src={image}
          alt={project.name}
          style={imageBlendStyle}
          className="h-28 w-28 object-contain drop-shadow-2xl transition-transform duration-500 hover:scale-110"
        />
      </div>
    );
  }

  if (project.visual === "linkedloom" || project.visual === "hukumnama" || project.visual === "kryvex") {
    return (
      <Marquee
        pauseOnHover
        reverse
        className="absolute [--duration:20s] [mask-image:linear-gradient(to_top,transparent_5%,#000_100%)] "
      >
        {[image, image].map((img, idx) => (
            <figure
              key={idx}
              className={cn("w-100 h-62", marqueeFigureClassName)}
            >
              <img
                loading="lazy"
                src={img}
                alt={project.name}
                style={imageBlendStyle}
                className="h-full w-auto object-fill transition-all duration-500 ease-in-out hover:opacity-100"
              />
            </figure>
          ))}
      </Marquee>
    );
  }

  return (
    <img
      loading="lazy"
      src={image}
      alt={project.name}
      style={imageBlendStyle}
      className="absolute [mask-image:linear-gradient(to_top,transparent_5%,#000_100%)] object-cover w-full h-full"
    />
  );
};

const features: GridLayoutProps["features"] = portfolioKnowledge.projects.map(
  (project) => {
    const image = projectImages[project.visual];

    return {
      Icon: projectIconMap[project.icon],
      name: project.name,
      description: project.description,
      longDescription: project.longDescription,
      timeline: project.timeline ?? undefined,
      techStack: project.techStack,
      liveHref: project.liveHref ?? undefined,
      sourceHref: project.sourceHref ?? undefined,
      showButtonText: true,
      images: image ? [image] : undefined,
      downloads: project.downloads,
      background: buildProjectBackground(project),
      className: projectClassMap[project.visual],
    };
  }
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
