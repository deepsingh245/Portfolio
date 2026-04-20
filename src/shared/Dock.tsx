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
import { portfolioKnowledge } from "@/data/profile";
import { cn } from "@/lib/utils";

export type IconProps = React.SVGProps<SVGSVGElement>;

const navItems = [
  { href: "#", icon: HomeIcon, label: "Home" },
  { href: "#", icon: PencilIcon, label: "Blog" },
];

const socialIconMap = {
  github: GitHubIcon,
  linkedin: LinkedInIcon,
  x: XIcon,
  email: MailIcon,
  resume: FileDown,
} as const;

const DockLayout: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center fixed bottom-0 left-0 right-0 m-4 z-50">
      <TooltipProvider>
        <Dock direction="middle" iconMagnification={60} iconDistance={100}>
          {navItems.map((item) => (
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

          {portfolioKnowledge.identity.links.map((social) => {
            const SocialIcon = socialIconMap[social.kind];

            return (
              <DockIcon key={social.label}>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <a
                      href={social.url}
                      aria-label={social.label}
                      target="_blank"
                      rel="noopener noreferrer"
                      download={
                        social.download ? "Simrandeep_Singh_Resume.pdf" : undefined
                      }
                      className={cn(
                        buttonVariants({ variant: "ghost", size: "icon" }),
                        "size-full rounded-full"
                      )}
                    >
                      <SocialIcon className="w-1/2 h-1/2" />
                    </a>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>{social.label}</p>
                  </TooltipContent>
                </Tooltip>
              </DockIcon>
            );
          })}
        </Dock>
      </TooltipProvider>
    </div>
  );
};

export default DockLayout;
