import { motion } from "framer-motion";
import { Card, CardDescription } from "@/components/ui/card";
import { TrophyIcon, StarIcon, CodeIcon } from "lucide-react";

const achievements = [
  {
    title: "2nd Runner Up — Disrupt Hackathon, Unthinkable Solutions",
    description: "Ranked 2nd Runner Up out of 17 teams for delivering a production-ready AI travel-planning engine under 30 hours, combining real-time data aggregation, recommendations, and automated decision logic.",
    icon: TrophyIcon,
    color: "text-yellow-500"
  },
  {
    title: "National Finalist, Jawaharlal Nehru National Science Exhibition",
    description: "Selected as a national candidate for engineering innovation; designed a kinetic-energy harvesting module enabling on-the-go mobile charging through mechanical-to-electrical conversion for cyclists.",
    icon: StarIcon,
    color: "text-blue-500"
  },
  {
    title: "500+ DSA Questions Solved",
    description: "Solved 500+ data structures and algorithms questions across various platforms like LeetCode and GeeksforGeeks, demonstrating strong problem-solving capabilities.",
    icon: CodeIcon,
    color: "text-green-500"
  }
];

const Achievements = () => {
  return (
    <Card className="flex flex-col items-start gap-4 border-x-0 border-t-0 p-6 border-b-2">
      <p className="font-extrabold">Achievements</p>
      
      <div className="relative w-full ml-2 space-y-8">
        {achievements.map((ach, index) => (
          <motion.div 
            key={index}
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            viewport={{ once: true }}
            className="relative flex items-start gap-6 group"
          >
            {/* Icon Container */}
            <div className="flex-shrink-0 mt-1 h-10 w-10 flex items-center justify-center rounded-full border border-border bg-background shadow-sm group-hover:border-primary transition-colors duration-300">
              <ach.icon className={`w-5 h-5 ${ach.color} group-hover:scale-110 transition-transform`} />
            </div>

            {/* Content */}
            <div className="flex-1 pt-1">
              <h3 className="text-lg font-bold inter tracking-tight text-foreground group-hover:text-primary transition-colors">
                {ach.title}
              </h3>
              <CardDescription className="text-sm leading-relaxed mt-1 max-w-2xl inter">
                {ach.description}
              </CardDescription>
            </div>
          </motion.div>
        ))}
      </div>
    </Card>
  );
};

export default Achievements;
