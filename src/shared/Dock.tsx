"use client";

import { FileDown, HomeIcon, MailIcon, PencilIcon } from "lucide-react";
import React from "react";

import GitHubIcon from "@/assets/icons/GithubIcon";
import LinkedInIcon from "@/assets/icons/LinkedInIcon";
import XIcon from "@/assets/icons/XIcon";
import { Dock, DockIcon } from "@/components/magicui/dock";
import { buttonVariants } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";

export type IconProps = React.SVGProps<SVGSVGElement>;

const DATA = {
  navbar: [
    { href: "#", icon: HomeIcon, label: "Home" },
    { href: "#", icon: PencilIcon, label: "Blog" },
  ],
  contact: {
    social: {
      GitHub: {
        name: "GitHub",
        url: "https://github.com/deepsingh245",
        icon: GitHubIcon,
      },
      LinkedIn: {
        name: "LinkedIn",
        url: "https://www.linkedin.com/in/simrandeep-singh-7bb74b234/",
        icon: LinkedInIcon,
      },
      X: {
        name: "X",
        url: "https://x.com/DevSimrandeep",
        icon: XIcon,
      },
      Email: {
        name: "Send Email",
        url: "mailto:deepsingh245@gmail.com",
        icon: MailIcon,
      },
      Resume: {
        name: "Download Resume",
        url: "/assets/Simrandeep_Singh_Resume.pdf",
        icon: FileDown,
        download: true,
      },
    },
  },
};

const DockLayout: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center fixed bottom-0 left-0 right-0 m-4 z-50">
      <TooltipProvider>
        <Dock direction="middle" iconMagnification={60} iconDistance={100}>
          {/* Navbar */}
          {DATA.navbar.map((item) => (
            <DockIcon key={item.label}>
              <Tooltip>
                <TooltipTrigger asChild>
                  <a
                    href={item.href}
                    aria-label={item.label}
                    className={cn(
                      buttonVariants({ variant: "ghost", size: "icon" }),
                      "size-full rounded-full"
                    )}
                  >
                    <item.icon className="w-1/2 h-1/2" />
                  </a>
                </TooltipTrigger>
                <TooltipContent>
                  <p>{item.label}</p>
                </TooltipContent>
              </Tooltip>
            </DockIcon>
          ))}

          <Separator orientation="vertical" className="h-full" />

          {/* Social Links */}
          {Object.entries(DATA.contact.social).map(([name, social]) => (
            <DockIcon key={name}>
              <Tooltip>
                <TooltipTrigger asChild>
                  <a
                    href={social.url}
                    aria-label={social.name}
                    target="_blank"
                    rel="noopener noreferrer"
                    download={
                      "download" in social && social.download 
                        ? "Simrandeep_Singh_Resume.pdf" 
                        : undefined
                    }
                    className={cn(
                      buttonVariants({ variant: "ghost", size: "icon" }),
                      "size-full rounded-full"
                    )}
                  >
                    <social.icon className="w-1/2 h-1/2" />
                  </a>
                </TooltipTrigger>
                <TooltipContent>
                  <p>{name}</p>
                </TooltipContent>
              </Tooltip>
            </DockIcon>
          ))}
        </Dock>
      </TooltipProvider>
    </div>
  );
};

export default DockLayout;
