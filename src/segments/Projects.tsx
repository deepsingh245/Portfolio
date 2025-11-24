import NPMIcon from "@/assets/icons/NPMIcon";
import attendifyDashBoard from "@/assets/images/attendify-dashboard.png";
import dashBoard from "@/assets/images/billety-dashboard.png";
import caSimarjit from "@/assets/images/ca-simarjit.png";
import npmImage from "@/assets/images/npm-image.png";
import welcomeEnter from "@/assets/images/welcome-enterprise.png";
import { Marquee } from "@/components/magicui/marquee";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import GridLayout, { GridLayoutProps } from "@/shared/GridLayout";
import { FileTextIcon, GlobeIcon } from "@radix-ui/react-icons";
import { ScanFaceIcon } from "lucide-react";

const features: GridLayoutProps["features"] = [
  {
    Icon: FileTextIcon,
    name: "Billety",
    description:
      "Billety is a smart and easy-to-use billing software that helps businesses create invoices, track payments, and manage customers effortlessly across desktop and mobile.",
    tech_stack: ["React", "Electron", "Capacitor", "Firebase", "TypeScript"],
    sourceHref: "https://github.com/deepsingh245/billety",
    showButtonText: true,
    background: (
      <img
        src={dashBoard}
        alt="3D Portfolio"
        className="absolute  opacity-60 [mask-image:linear-gradient(to_top,transparent_5%,#000_100%)]"
      />
    ),
    className: "lg:row-start-4 lg:row-end-3 lg:col-start-2 lg:col-end-4",
  },
  {
    Icon: NPMIcon,
    name: "Client Trace - NPM",
    description:
      "NPM package for tracking clients IP addresses and user agents.",
    tech_stack: ["Javascript"],
    liveHref: "https://npmjs.com/package/client-trace",
    showButtonText: true,
    background: (
      <Marquee
        pauseOnHover
        className="absolute [--duration:20s] [mask-image:linear-gradient(to_top,transparent_40%,#000_100%)] "
      >
        {[1, 2, 3, 4].map((f, idx) => (
          <figure
            key={idx}
            className={cn(
              "relative w-62 h-64 cursor-pointer overflow-hidden rounded-xl border",
              "border-gray-950/[.1] bg-gray-950/[.01] hover:bg-gray-950/[.05]",
              "dark:border-gray-50/[.1] dark:bg-gray-50/[.10] dark:hover:bg-gray-50/[.15]",
              "transform-gpu blur-[1px] transition-all duration-300 ease-out hover:blur-none"
            )}
          >
            <img
              src={npmImage}
              alt="NPM"
              className=" h-full w-auto object-fill transition-all duration-500 ease-in-out dark:opacity-60 hover:opacity-100 hover:blur-none"
            />
          </figure>
        ))}
      </Marquee>
    ),
    className: "lg:col-start-3 lg:col-end-1 lg:row-start-1 lg:row-end-3",
  },
  {
    Icon: GlobeIcon,
    name: "Welcome Enterprise",
    description:
      "Welcome Enterprise is a leading manufacturer of high-quality machines designed to simplify and enhance your culinary experience.",
    tech_stack: ["HTML", "CSS", "JavaScript", "TailwindCSS", "Firebase"],
    liveHref: "https://welcomeenterprise.netlify.app/",
    sourceHref: "https://github.com/deepsingh245/welcome-enterprise",
    showButtonText: false,
    background: (
      <img
        src={welcomeEnter}
        alt="Welcome Enterprise"
        className="absolute [--duration:20s] [mask-image:linear-gradient(to_top,transparent_5%,#000_100%)] "
      />
    ),
    className: "lg:col-start-1 lg:col-end-2 lg:row-start-3 lg:row-end-4",
  },
  {
    Icon: GlobeIcon,
    name: "CA Simarjit",
    description:
      "CA Simarjit is a Chartered Accountant firm that provides comprehensive financial services including auditing, taxation, and consultancy to individuals and businesses.",
    tech_stack: ["React", "Three.js", "Next.js", "TypeScript", "Tailwind"],
    liveHref: "https://casimarjit.netlify.app/",
    showButtonText: false,
    background: (
      <img
        src={caSimarjit}
        alt="CA Simarjit"
        className="absolute [--duration:20s] [mask-image:linear-gradient(to_top,transparent_5%,#000_100%)] "
      />
    ),
    className: "lg:col-start-3 lg:col-end-3 lg:row-start-1 lg:row-end-3",
  },
  {
    Icon: ScanFaceIcon,
    name: "Attendify: Smart Attendance System",
    description:
      "A smart attendance system using face recognition to automatically identify students and mark attendance.",
    tech_stack: ["React", "Face Api", "FireBase", "NodeJS"],
    sourceHref: "https://github.com/deepsingh245/attendify",
    showButtonText: true,
    background: (
      <Marquee
        pauseOnHover
        reverse
        className="absolute [--duration:20s] [mask-image:linear-gradient(to_top,transparent_5%,#000_100%)] "
      >
        {[attendifyDashBoard, attendifyDashBoard].map((f, idx) => (
          <figure
            key={idx}
            className={cn(
              "relative w-100 h-62 cursor-pointer overflow-hidden rounded-xl border ",
              "border-gray-950/[.1] bg-gray-950/[.01] hover:bg-gray-950/[.01]",
              "dark:border-gray-50/[.1] dark:bg-gray-50/[.10] dark:hover:bg-gray-50/[.15]",
              "transform-gpu blur-[1px] transition-all duration-300 ease-out hover:blur-none"
            )}
          >
            <img
              src={f}
              alt="Attendify"
              className=" h-full w-auto object-fill transition-all duration-500 ease-in-out dark:opacity-60  hover:opacity-100 hover:blur-none"
            />
          </figure>
        ))}
      </Marquee>
    ),
    className: "lg:col-start-1 lg:col-end-4 lg:row-start-4 lg:row-end-4",
  },
];

const Projects = () => {
  return (
    <Card className="flex flex-col items-start gap-4 border-x-0 border-t-0 p-6 borer-b-2">
      <p className="font-extrabold">Projects</p>
      <GridLayout features={features} />
    </Card>
  );
};

export default Projects;
