import { useState } from "react";
import { motion } from "framer-motion";
import { Card, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  BriefcaseIcon, 
  CalendarIcon, 
  ExternalLinkIcon, 
  FoldersIcon,
  ShieldCheckIcon,
  UsersIcon,
  ZapIcon,
  ChevronRightIcon
} from "lucide-react";
import { Modal } from "@/components/ui/modal";
import { Button } from "@/components/ui/button";

const experiences = [
  {
    role: "SDE",
    company: "Unthinkable Solutions",
    period: "2024 - Present",
    description: "Developing scalable web applications using React, Next.js, and Node.js. Focused on performance optimization and modern UI architecture.",
    skills: ["React", "Angular", "Next.js", "Node.js", "TypeScript"],
    projects: [
      {
        title: "LDGERS Platform",
        tag: "SECURITY FIRST",
        icon: ShieldCheckIcon,
        description: [
          "Engineered the LDGERS platform with SSL security and VAPT-compliant architecture, mitigating critical vulnerabilities and strengthening system integrity.",
          "Developed React Native mobile applications with optimized performance and consistent cross-platform behavior.",
          "Built end-to-end financial modules including reporting, account management, and invoice systems to automate business workflows.",
          "Enhanced platform reliability through secure API design, authentication, and data protection practices."
        ],
        tech: ["REACT NATIVE", "SSL", "VAPT", "ENCRYPTION"]
      },
      {
        title: "Core HRMS",
        tag: "ENTERPRISE SCALE",
        icon: UsersIcon,
        description: [
          "Architected an end-to-end HRMS system managing hiring pipelines, interview workflows, offer generation, onboarding, and employee lifecycle operations.",
          "Engineered RBAC-driven dashboards with granular access for HR, Admin, and Managers, improving operational visibility and decision-making.",
          "Implemented geo-based attendance tracking and scalable multi-tenant (multi-org, multi-location) architecture.",
          "Led cross-functional team execution, delivering on schedule while integrating AI modules and configurable master data systems.",
          "Designed and implemented a multinational compliance structure aligned with India’s DPDP Act and EU GDPR, US CCPA"
        ],
        tech: ["ARCHITECTURE", "RBAC", "NODE.JS", "COMPLIANCE"]
      },
      {
        title: "OnTheSpotTradeFlex - On The Spot",
        tag: "REAL-TIME OPS",
        icon: ZapIcon,
        description: [
          "Architected a cross-platform Ionic/Angular application used across multiple sites, optimizing Firebase data pipelines to reduce load latency and improve field-team responsiveness.",
          "Owned onboarding access controls through an IP-restricted authentication gate, eliminating unauthorized signups and strengthening multi-tenant security.",
          "Designed an NFC/QR-driven operational workflow engine that reduced manual check-in/out time by 90% and standardized site-level reporting.",
          "Led the migration of the entire mobile codebase from JavaScript → TypeScript, reducing runtime errors and bringing consistency across shared modules.",
          "Implemented an asset-recognition pipeline using Gemini AI + Search API, automating metadata tagging for high-volume asset libraries.",
          "Built an interactive 2D/3D spatial-mapping layer with coordinate-linked assets, improving facility-layout visualization and enabling faster inspection cycles.",
          "Delivered a fully optimized mobile build achieving 99% crash-free usage across iOS and Android through performance profiling and native-integration improvements.",
          "Implemented end-to-end deployment for TradeFlex using GCP services and integrated Firebase Analytics + Crashlytics to support Play Store release monitoring."
        ],
        tech: ["IONIC", "ANGULAR", "FIREBASE", "GCP", "TYPESCRIPT", "GEMINI AI"]
      }
    ]
  },
  {
    role: "Web Developer",
    company: "Winsple",
    period: "2023 - 2023",
    description: "Delivered SEO and content-optimization workflows that increased client website visibility and improved search ranking + engagement across key pages",
    skills: ["React", "Tailwind CSS", "JavaScript", "Redux"]
  },
  {
    role: "Intern Team Lead Front end",
    company: "NGO, GBSS",
    period: "2022 - 2022",
    description: "Led a 10-member engineering team to rebuild the NGO’s web platform end-to-end, shipping a modern responsive experience with measurable engagement improvements. Redesigned the organization’s legacy site with performant components, interactive flows, and modern UI patterns, significantly improving user interaction quality.",
    skills: ["HTML", "CSS", "JavaScript", "Leadership"]
  }
];

const Experience = () => {
  const [selectedExperience, setSelectedExperience] = useState<typeof experiences[0] | null>(null);

  return (
    <Card className="flex flex-col items-start gap-4 border-x-0 border-t-0 p-6 border-b-2">
      <p className="font-extrabold">Experience</p>
      
      <div className="relative w-full ml-2 space-y-8 before:absolute before:inset-0 before:ml-5 before:h-full before:w-0.5 before:-translate-x-px before:bg-gradient-to-b before:from-border before:via-border before:to-transparent">
        {experiences.map((exp, index) => (
          <motion.div 
            key={index}
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            viewport={{ once: true }}
            className="relative flex items-start gap-6 group"
          >
            {/* Timeline Dot */}
            <div className="absolute left-0 mt-1.5 h-10 w-10 flex items-center justify-center rounded-full border border-border bg-background shadow-sm z-10 group-hover:border-primary transition-colors duration-300">
              <BriefcaseIcon className="w-4 h-4 text-muted-foreground group-hover:text-primary transition-colors" />
            </div>

            {/* Content */}
            <div className="flex-1 ml-12 pt-1 pb-4">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2 mb-2">
                <div>
                  <h3 className="text-lg font-bold inter tracking-tight text-foreground">{exp.role}</h3>
                  <p className="text-sm font-semibold text-primary">{exp.company}</p>
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
                {exp.skills.map((skill, sIdx) => (
                  <Badge 
                    key={sIdx} 
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
                <h2 className="text-xs font-black tracking-[0.3em] text-primary uppercase mb-2">Selected Projects</h2>
                <h3 className="text-3xl font-bold inter tracking-tighter text-foreground">
                  {selectedExperience.company}
                </h3>
              </div>
            </div>
            
            {/* Horizontal Scroll Container */}
            <div className="p-8 overflow-x-auto custom-scrollbar flex gap-6 pb-20 md:pb-12">
              {selectedExperience.projects?.map((project, pIdx) => (
                <motion.div 
                  key={pIdx}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: pIdx * 0.1 }}
                  className="min-w-[320px] md:min-w-[400px] bg-card/50 dark:bg-neutral-900/40 border border-border rounded-3xl p-8 flex flex-col justify-between hover:border-primary/30 transition-colors group/p"
                >
                  <div>
                    <div className="flex items-center justify-between mb-8">
                      <div className="h-12 w-12 rounded-2xl bg-secondary border border-border flex items-center justify-center group-hover/p:border-primary/50 transition-colors">
                        <project.icon className="w-6 h-6 text-foreground group-hover/p:text-primary transition-colors" />
                      </div>
                      <span className="text-[10px] font-bold tracking-widest text-muted-foreground border border-border px-3 py-1 rounded-full uppercase">
                        {project.tag}
                      </span>
                    </div>

                    <div className="flex items-center gap-2 mb-6 group-hover/p:translate-x-1 transition-transform">
                      <h3 className="text-2xl font-bold text-foreground tracking-tight">{project.title}</h3>
                      <ChevronRightIcon className="w-5 h-5 text-muted-foreground group-hover/p:text-primary transition-colors" />
                    </div>

                    <ul className="space-y-4 mb-8">
                      {project.description.map((item, iIdx) => (
                        <li key={iIdx} className="text-sm text-muted-foreground leading-relaxed flex gap-3">
                          <span className="h-1.5 w-1.5 rounded-full bg-primary flex-shrink-0 mt-1.5 shadow-[0_0_8px_rgba(99,102,241,0.8)]" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="flex flex-wrap gap-2 pt-6 border-t border-border">
                    {project.tech.map((t, tIdx) => (
                      <Badge 
                        key={tIdx} 
                        variant="secondary"
                        className="text-[9px] font-black tracking-widest uppercase bg-secondary/80 border-border/50"
                      >
                        {t}
                      </Badge>
                    ))}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        )}
      </Modal>
    </Card>
  );
};

export default Experience;
