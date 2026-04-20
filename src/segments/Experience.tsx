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

const experiences = portfolioKnowledge.experience;

const projectIcons: Record<ExperienceProject["icon"], typeof ShieldCheckIcon> = {
  shield: ShieldCheckIcon,
  users: UsersIcon,
  zap: ZapIcon,
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
        className="p-0 bg-background border-border max-w-6xl shadow-2xl"
      >
        {selectedExperience && (
          <div className="flex flex-col bg-background dark:bg-[#030303]">
            <div className="p-8 border-b border-border flex items-center justify-between">
              <div>
                <h2 className="text-xs font-black tracking-[0.3em] text-primary uppercase mb-2">
                  Selected Projects
                </h2>
                <h3 className="text-3xl font-bold inter tracking-tighter text-foreground">
                  {selectedExperience.company}
                </h3>
              </div>
            </div>

            <div className="p-8 overflow-x-auto custom-scrollbar flex gap-6 pb-20 md:pb-12">
              {selectedExperience.projects?.map((project, pIdx) => {
                const ProjectIcon = projectIcons[project.icon];

                return (
                  <motion.div
                    key={`${project.title}-${pIdx}`}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: pIdx * 0.1 }}
                    className="min-w-[320px] md:min-w-[400px] bg-card/50 dark:bg-neutral-900/40 border border-border rounded-3xl p-8 flex flex-col justify-between hover:border-primary/30 transition-colors group/p"
                  >
                    <div>
                      <div className="flex items-center justify-between mb-8">
                        <div className="h-12 w-12 rounded-2xl bg-secondary border border-border flex items-center justify-center group-hover/p:border-primary/50 transition-colors">
                          <ProjectIcon className="w-6 h-6 text-foreground group-hover/p:text-primary transition-colors" />
                        </div>
                        <span className="text-[10px] font-bold tracking-widest text-muted-foreground border border-border px-3 py-1 rounded-full uppercase">
                          {project.tag}
                        </span>
                      </div>

                      <div className="flex items-center gap-2 mb-6 group-hover/p:translate-x-1 transition-transform">
                        <h3 className="text-2xl font-bold text-foreground tracking-tight">
                          {project.title}
                        </h3>
                        <ChevronRightIcon className="w-5 h-5 text-muted-foreground group-hover/p:text-primary transition-colors" />
                      </div>

                      <ul className="space-y-4 mb-8">
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

                    <div className="flex flex-wrap gap-2 pt-6 border-t border-border">
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
