import { useState } from "react";
import { motion } from "framer-motion";
import { Card, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { portfolioKnowledge } from "@/data/profile";
import type { ExperienceEntry, ExperienceProject } from "@/types/profile";
import {
  BriefcaseIcon,
  CalendarIcon,
  ChevronRightIcon,
  ExternalLinkIcon,
  FoldersIcon,
  ShieldCheckIcon,
  UsersIcon,
  ZapIcon,
} from "lucide-react";
import { Modal } from "@/components/ui/modal";
import { Button } from "@/components/ui/button";
import { ImageCarousel } from "@/components/ui/image-carousel";
import coreHrmsDashboard from "@/assets/images/core-hrms-dashboard.png";
import coreHrmsCandidateLifecycle from "@/assets/images/core-hrms-candidate-lifecycle.png";
import coreHrmsAiEvaluation from "@/assets/images/core-hrms-ai-evaluation.png";
import ldgersLanding from "@/assets/images/ldgers-landing.png";
import onTheSpotHero from "@/assets/images/onthespot-hero.png";
import onTheSpotStackPlan from "@/assets/images/onthespot-stack-plan.png";

const experiences = portfolioKnowledge.experience;

const projectIcons: Record<ExperienceProject["icon"], typeof ShieldCheckIcon> = {
  shield: ShieldCheckIcon,
  users: UsersIcon,
  zap: ZapIcon,
};

// Kept here rather than in profile.ts, which the Netlify chat function also imports.
const projectImages: Record<string, string[]> = {
  "LDGERS Platform": [ldgersLanding],
  "Core HRMS": [
    coreHrmsDashboard,
    coreHrmsCandidateLifecycle,
    coreHrmsAiEvaluation,
  ],
  "OnTheSpotTradeFlex - On The Spot": [onTheSpotHero, onTheSpotStackPlan],
};

const Experience = () => {
  const [selectedExperience, setSelectedExperience] =
    useState<ExperienceEntry | null>(null);

  return (
    <Card className="flex flex-col items-start gap-4 border-x-0 border-t-0 p-6 border-b-2">
      <p className="font-extrabold">Experience</p>

      <div className="relative w-full ml-2 space-y-8 before:absolute before:inset-0 before:ml-5 before:h-full before:w-0.5 before:-translate-x-px before:bg-gradient-to-b before:from-border before:via-border before:to-transparent">
        {experiences.map((exp, index) => (
          <motion.div
            key={`${exp.company}-${exp.role}`}
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            viewport={{ once: true }}
            className="relative flex items-start gap-6 group"
          >
            <div className="absolute left-0 mt-1.5 h-10 w-10 flex items-center justify-center rounded-full border border-border bg-background shadow-sm z-10 group-hover:border-primary transition-colors duration-300">
              <BriefcaseIcon className="w-4 h-4 text-muted-foreground group-hover:text-primary transition-colors" />
            </div>

            <div className="flex-1 ml-12 pt-1 pb-4">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2 mb-2">
                <div>
                  <h3 className="text-lg font-bold inter tracking-tight text-foreground">
                    {exp.role}
                  </h3>
                  <p className="text-sm font-semibold text-primary">
                    {exp.company}
                  </p>
                </div>
                <div className="flex items-center gap-2 px-3 py-1 w-fit rounded-full bg-secondary text-secondary-foreground border border-border text-[10px] font-mono uppercase tracking-widest whitespace-nowrap">
                  <CalendarIcon className="w-3 h-3" />
                  {exp.period}
                </div>
              </div>

              <CardDescription className="text-sm leading-relaxed mb-4 max-w-2xl inter">
                {exp.description}
              </CardDescription>

              <div className="flex flex-wrap gap-2 mb-4">
                {exp.skills.map((skill) => (
                  <Badge
                    key={skill}
                    variant="secondary"
                    className="text-[10px] bg-secondary/50 border-border/50"
                  >
                    {skill}
                  </Badge>
                ))}
              </div>

              {exp.projects && (
                <Button
                  variant="outline"
                  size="sm"
                  className="h-8 gap-2 text-xs font-bold border-primary/20 hover:bg-primary/5 hover:border-primary/40 transition-all"
                  onClick={() => setSelectedExperience(exp)}
                >
                  <FoldersIcon className="w-3.5 h-3.5" />
                  Explore Projects
                  <ExternalLinkIcon className="w-3.5 h-3.5 opacity-50" />
                </Button>
              )}
            </div>
          </motion.div>
        ))}
      </div>

      <Modal
        isOpen={!!selectedExperience}
        onClose={() => setSelectedExperience(null)}
        className="p-0 bg-background border-border max-w-6xl shadow-2xl overflow-hidden"
      >
        {selectedExperience && (
          <div className="flex h-[85vh] flex-col bg-background dark:bg-[#030303]">
            <div className="px-8 py-4 pr-16 border-b border-border flex shrink-0 items-center justify-between">
              <div>
                <h2 className="text-[10px] font-black tracking-[0.3em] text-primary uppercase mb-1">
                  Selected Projects
                </h2>
                <h3 className="text-xl font-bold inter tracking-tight text-foreground">
                  {selectedExperience.company}
                </h3>
              </div>
            </div>

            <div className="px-8 py-6 flex-1 min-h-0 overflow-x-auto overflow-y-hidden custom-scrollbar flex gap-6">
              {selectedExperience.projects?.map((project, pIdx) => {
                const ProjectIcon = projectIcons[project.icon];

                return (
                  <motion.div
                    key={`${project.title}-${pIdx}`}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: pIdx * 0.1 }}
                    className="min-w-[320px] md:min-w-[400px] h-full min-h-0 bg-card/50 dark:bg-neutral-900/40 border border-border rounded-3xl p-8 flex flex-col hover:border-primary/30 transition-colors group/p"
                  >
                    <div className="flex flex-1 min-h-0 flex-col">
                      <div className="flex shrink-0 items-center gap-3 mb-4">
                        <div className="h-10 w-10 shrink-0 rounded-xl bg-secondary border border-border flex items-center justify-center group-hover/p:border-primary/50 transition-colors">
                          <ProjectIcon className="w-5 h-5 text-foreground group-hover/p:text-primary transition-colors" />
                        </div>
                        <h3 className="text-xl font-bold leading-tight text-foreground tracking-tight">
                          {project.title}
                        </h3>
                      </div>

                      <div className="relative mb-5 shrink-0">
                        <ImageCarousel
                          images={project.images ?? projectImages[project.title]}
                          alt={project.title}
                        />
                        <span className="pointer-events-none absolute left-2 top-2 z-10 text-[9px] font-bold tracking-widest text-muted-foreground border border-border bg-background/80 backdrop-blur px-2.5 py-0.5 rounded-full uppercase">
                          {project.tag}
                        </span>
                      </div>

                      <ul className="space-y-4 mb-4 flex-1 min-h-0 overflow-y-auto custom-scrollbar pr-2">
                        {project.description.map((item, iIdx) => (
                          <li
                            key={iIdx}
                            className="text-sm text-muted-foreground leading-relaxed flex gap-3"
                          >
                            <span className="h-1.5 w-1.5 rounded-full bg-primary flex-shrink-0 mt-1.5 shadow-[0_0_8px_rgba(99,102,241,0.8)]" />
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="flex shrink-0 flex-wrap gap-2 pt-4 border-t border-border">
                      {project.tech.map((tech) => (
                        <Badge
                          key={tech}
                          variant="secondary"
                          className="text-[9px] font-black tracking-widest uppercase bg-secondary/80 border-border/50"
                        >
                          {tech}
                        </Badge>
                      ))}
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>
        )}
      </Modal>
    </Card>
  );
};

export default Experience;
