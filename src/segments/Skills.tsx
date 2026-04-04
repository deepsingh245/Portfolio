import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  StarIcon, 
  StarHalfIcon, 
  ChevronDownIcon, 
  ChevronUpIcon, 
} from "lucide-react";
import Icon from "tech-stack-icons";
import { TextAnimate } from "@/components/magicui/text-animate";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useTheme } from "@/hooks/useTheme";

const calculatePercentage = (rating: number) => Math.round((rating / 5) * 100);

const skillCategories = [
  {
    title: "LANGUAGES",
    skills: [
      { name: "TypeScript", rating: 4.0, icon: "typescript" },
      { name: "JavaScript", rating: 4.0, icon: "js" },
      { name: "Python", rating: 3.0, icon: "python" },
      { name: "HTML/CSS", rating: 5.0, icon: "html5" },
      { name: "C++", rating: 3.7, icon: "cpp" },
    ],
  },
  {
    title: "LIBRARIES & FRAMEWORKS",
    skills: [
      { name: "React", rating: 4.1, icon: "react"},
      { name: "Next.js", rating: 4.0, icon: "nextjs"},
      { name: "React Native", rating: 3.9, icon: "reactnative" },
      { name: "Angular", rating: 3.9, icon: "angular" },
      { name: "Node.js", rating: 4.6, icon: "nodejs" },
      { name: "Tailwind CSS", rating: 5.0, icon: "tailwindcss" },
      // { name: "Express", rating: 4.0, icon: "nodejs" },
      { name: "Redux", rating: 4.0, icon: "redux" },
      { name: "Ionic", rating: 4.8, icon: "ionic" },
    ],
  },
  {
    title: "PLATFORMS & AI TOOLS",
    skills: [
      { name: "Firebase", rating: 4.5, icon: "firebase" },
      { name: "Git", rating: 4.8, icon: "git" },
      { name: "Figma", rating: 4.0, icon: "figma" },
      { name: "Claude Code", rating: 4.0, icon: "claude" },
      { name: "Antigravity", rating: 4.4, icon: "antigravity" },
      { name: "Copilot", rating: 4.5, icon: "copilotgithub" },
      { name: "Cursor", rating: 3.8, icon: "cursor" },
    ],
  },
  {
    title: "DATABASES & CLOUD",
    skills: [
      { name: "MongoDB", rating: 4.5, icon: "mongodb" },
      { name: "PostgreSQL", rating: 3.6, icon: "postgresql" },
      { name: "MySQL", rating: 3.2, icon: "mysql" },
      { name: "GCP", rating: 3.8, icon: "gcloud" },
      { name: "Netlify", rating: 4.7, icon: "netlify" },
      { name: "Vercel", rating: 4.8, icon: "vercel" },
    ],
  },
];




const StarRating = ({ rating }: { rating: number }) => {
  const fullStars = Math.floor(rating);
  const hasHalfStar = rating % 1 >= 0.5;
  const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);

  return (
    <div className="flex items-center gap-0.5">
      {[...Array(fullStars)].map((_, i) => (
        <StarIcon key={`full-${i}`} className="w-3.5 h-3.5 fill-yellow-500 text-yellow-500 drop-shadow-[0_0_4px_rgba(234,179,8,0.5)]" />
      ))}
      {hasHalfStar && <StarHalfIcon className="w-3.5 h-3.5 fill-yellow-500 text-yellow-500 drop-shadow-[0_0_4px_rgba(234,179,8,0.5)]" />}
      {[...Array(emptyStars)].map((_, i) => (
        <StarIcon key={`empty-${i}`} className="w-3.5 h-3.5 text-neutral-700 dark:text-neutral-800" />
      ))}
    </div>
  );
};

const Skills = () => {
  const { theme } = useTheme();
  const [showRatings, setShowRatings] = useState(false);
  
  const allSkills = skillCategories.flatMap(cat => cat.skills.map(s => s.name));

  return (
    <Card className="flex flex-col items-start gap-4 border-x-0 border-t-0 p-6 border-b-2">
      <div className="flex w-full items-center justify-between">
        <p className="font-extrabold text-lg">Skills</p>
        <Button 
          variant="ghost" 
          size="sm" 
          onClick={() => setShowRatings(!showRatings)}
          className="hover:bg-primary/10 transition-colors"
        >
          {showRatings ? <ChevronUpIcon className="w-4 h-4 mr-2" /> : <ChevronDownIcon className="w-4 h-4 mr-2" />}
          <span className="text-sm font-semibold">{showRatings ? "Simple View" : "Detailed View"}</span>
        </Button>
      </div>

      <AnimatePresence mode="wait">
        {!showRatings ? (
          <motion.div
            key="simple"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
            className="w-full"
          >
            <TextAnimate animation="blurInUp" by="character" once>
              {allSkills.map((skill, index) => (
                <Badge
                  key={index}
                  {...(theme === "dark" ? { variant: "default" } : {})}
                  className="m-1 cursor-default hover:scale-105 transition-transform"
                >
                  {skill}
                </Badge>
              ))}
            </TextAnimate>
          </motion.div>
        ) : (
          <motion.div
            key="detailed"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ 
              duration: 0.4, 
              ease: [0.04, 0.62, 0.23, 0.98],
              height: { duration: 0.4 }
            }}
            className="w-full overflow-hidden"
          >
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mt-2 pb-2">
              {skillCategories.map((category, idx) => (
                <Card key={idx} className="p-4 bg-neutral-100/50 dark:bg-neutral-900/50 border-neutral-200 dark:border-neutral-800 rounded-xl relative overflow-hidden group/card">
                  <h4 className="text-xs font-bold tracking-widest text-neutral-500 dark:text-neutral-400 mb-4 px-2 uppercase">
                    {category.title}
                  </h4>
                  
                  <div className="space-y-2">
                    {category.skills.map((skill, sIdx) => (
                      <div key={sIdx} className="flex items-center justify-between p-2 hover:bg-neutral-200 dark:hover:bg-neutral-800/50 rounded-lg transition-colors group cursor-default">
                        <div className="flex items-center gap-3">
                          <Icon name={skill.icon} className="w-5 h-5" variant={theme} />
                          <span className="text-base font-semibold text-neutral-700 dark:text-neutral-300">
                            {skill.name}
                          </span>
                          <div className="h-0.5 w-4 bg-primary/30 rounded-full group-hover:w-8 transition-all" />
                        </div>
                        
                          <div className="flex items-center gap-4">
                            <StarRating rating={skill.rating} />
                            <div className="flex items-center gap-2 text-sm font-mono w-32 justify-end">
                              <span className="text-neutral-400 dark:text-neutral-500">
                                {calculatePercentage(skill.rating)}%
                              </span>
                              <span className="text-neutral-900 dark:text-neutral-300 font-bold text-base">
                                {skill.rating.toFixed(1)}{" "}
                                <span className="text-neutral-400 dark:text-neutral-600 text-xs">
                                  / 5
                                </span>
                              </span>
                            </div>
                          </div>
                      </div>
                    ))}
                  </div>
                </Card>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </Card>
  );
};

export default Skills;
