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
    longDescription: "Billety is a comprehensive billing solution designed for modern businesses. It streamlines the invoicing process, allows for real-time payment tracking, and provides a centralized customer management system. Built with cross-platform compatibility in mind, Billety ensures you can manage your business finances from anywhere, on any device.",
    timeline: "Jan 2024 - Present",
    techStack: ["React", "Electron", "Capacitor", "Firebase", "TypeScript"],
    sourceHref: "https://github.com/deepsingh245/billety",
    showButtonText: true,
    images: [dashBoard],
    downloads: {
        windows: "https://github.com/deepsingh245/billety/releases/download/v1.0.0/Billety-Setup-1.0.0.exe",
        mac: "https://github.com/deepsingh245/billety/releases/download/v1.0.0/Billety-1.0.0.dmg",
        android: "https://play.google.com/store/apps/details?id=com.billety.app"
    },
    background: (
      <img
        src={dashBoard}
        alt="Billety Dashboard"
        className="absolute opacity-60 [mask-image:linear-gradient(to_top,transparent_5%,#000_100%)] object-cover w-full h-full"
      />
    ),
    className: "lg:row-start-4 lg:row-end-3 lg:col-start-2 lg:col-end-4",
  },
  {
    Icon: NPMIcon,
    name: "Client Trace - NPM",
    description:
      "NPM package for tracking clients IP addresses and user agents.",
    longDescription: "Client Trace is a lightweight yet powerful NPM package designed to help developers easily track and identify client IP addresses and user agent strings. It simplifies the process of gathering analytics and security data for your Node.js applications.",
    timeline: "Dec 2023",
    techStack: ["Javascript", "Node.js", "NPM"],
    liveHref: "https://npmjs.com/package/client-trace",
    showButtonText: true,
    images: [npmImage],
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
    longDescription: "Welcome Enterprise showcases a catalog of high-quality culinary machines. The website features a modern, responsive design that highlights product details and specifications, making it easy for potential clients to browse and inquire about products.",
    timeline: "Nov 2023",
    techStack: ["HTML", "CSS", "JavaScript", "TailwindCSS", "Firebase"],
    liveHref: "https://welcomeenterprise.netlify.app/",
    sourceHref: "https://github.com/deepsingh245/welcome-enterprise",
    showButtonText: false,
    images: [welcomeEnter],
    background: (
      <img
        src={welcomeEnter}
        alt="Welcome Enterprise"
        className="absolute [--duration:20s] [mask-image:linear-gradient(to_top,transparent_5%,#000_100%)] object-cover w-full h-full"
      />
    ),
    className: "lg:col-start-1 lg:col-end-2 lg:row-start-3 lg:row-end-4",
  },
  {
    Icon: GlobeIcon,
    name: "CA Simarjit",
    description:
      "CA Simarjit is a Chartered Accountant firm that provides comprehensive financial services including auditing, taxation, and consultancy.",
    longDescription: "This professional website for CA Simarjit allows clients to explore financial services, book consultations, and access important financial resources. It features a clean, professional design suitable for a financial services firm.",
    timeline: "Oct 2023",
    techStack: ["React", "Three.js", "Next.js", "TypeScript", "Tailwind"],
    liveHref: "https://casimarjit.netlify.app/",
    showButtonText: false,
    images: [caSimarjit],
    background: (
      <img
        src={caSimarjit}
        alt="CA Simarjit"
        className="absolute [--duration:20s] [mask-image:linear-gradient(to_top,transparent_5%,#000_100%)] object-cover w-full h-full"
      />
    ),
    className: "lg:col-start-3 lg:col-end-3 lg:row-start-1 lg:row-end-3",
  },
  {
    Icon: ScanFaceIcon,
    name: "Attendify: Smart Attendance System",
    description:
      "A smart attendance system using face recognition to automatically identify students and mark attendance.",
    longDescription: "Attendify revolutionizes classroom attendance by using advanced face recognition technology. It eliminates manual roll calls, saving time and reducing errors. The system includes a dashboard for teachers to view attendance reports and trends.",
    timeline: "Sep 2023",
    techStack: ["React", "Face Api", "FireBase", "NodeJS"],
    sourceHref: "https://github.com/deepsingh245/attendify",
    showButtonText: true,
    images: [attendifyDashBoard],
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
