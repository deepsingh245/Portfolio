import { motion } from "framer-motion";
import { Card, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { BriefcaseIcon, CalendarIcon } from "lucide-react";

const experiences = [
  {
    role: "SDE",
    company: "Unthinkable Solutions",
    period: "2024 - Present",
    description: "Developing scalable web applications using React, Next.js, and Node.js. Focused on performance optimization and modern UI architecture.",
    skills: ["React", "Next.js", "Node.js", "TypeScript"]
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

              <div className="flex flex-wrap gap-2">
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
            </div>
          </motion.div>
        ))}
      </div>
    </Card>
  );
};

export default Experience;
