import { motion } from "framer-motion";
import { Card, CardDescription } from "@/components/ui/card";
import { portfolioKnowledge } from "@/data/profile";
import type { Achievement } from "@/types/profile";
import { CodeIcon, StarIcon, TrophyIcon } from "lucide-react";

const achievements = portfolioKnowledge.achievements;

const iconMap: Record<Achievement["icon"], typeof TrophyIcon> = {
  trophy: TrophyIcon,
  star: StarIcon,
  code: CodeIcon,
};

const Achievements = () => {
  return (
    <Card className="flex flex-col items-start gap-4 border-x-0 border-t-0 p-6 border-b-2">
      <p className="font-extrabold">Achievements</p>

      <div className="relative w-full ml-2 space-y-8">
        {achievements.map((achievement, index) => {
          const AchievementIcon = iconMap[achievement.icon];

          return (
            <motion.div
              key={`${achievement.title}-${index}`}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="relative flex items-start gap-6 group"
            >
              <div className="flex-shrink-0 mt-1 h-10 w-10 flex items-center justify-center rounded-full border border-border bg-background shadow-sm group-hover:border-primary transition-colors duration-300">
                <AchievementIcon
                  className={`w-5 h-5 ${achievement.color} group-hover:scale-110 transition-transform`}
                />
              </div>

              <div className="flex-1 pt-1">
                <h3 className="text-lg font-bold inter tracking-tight text-foreground group-hover:text-primary transition-colors">
                  {achievement.title}
                </h3>
                <CardDescription className="text-sm leading-relaxed mt-1 max-w-2xl inter">
                  {achievement.description}
                </CardDescription>
              </div>
            </motion.div>
          );
        })}
      </div>
    </Card>
  );
};

export default Achievements;
