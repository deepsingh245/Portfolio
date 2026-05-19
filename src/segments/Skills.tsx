import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ChevronDownIcon,
  ChevronUpIcon,
  StarHalfIcon,
  StarIcon,
} from "lucide-react";
import Icon from "tech-stack-icons";
import { TextAnimate } from "@/components/magicui/text-animate";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { allSkillNames, portfolioKnowledge } from "@/data/profile";
import { useTheme } from "@/hooks/useTheme";

const calculatePercentage = (rating: number) => Math.round((rating / 5) * 100);

const skillCategories = portfolioKnowledge.skillCategories;

const StarRating = ({ rating }: { rating: number }) => {
  const fullStars = Math.floor(rating);
  const hasHalfStar = rating % 1 >= 0.5;
  const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);

  return (
    <div className="flex items-center gap-0.5">
      {[...Array(fullStars)].map((_, i) => (
        <StarIcon
          key={`full-${i}`}
          className="w-3.5 h-3.5 fill-yellow-500 text-yellow-500 drop-shadow-[0_0_4px_rgba(234,179,8,0.5)]"
        />
      ))}
      {hasHalfStar && (
        <StarHalfIcon className="w-3.5 h-3.5 fill-yellow-500 text-yellow-500 drop-shadow-[0_0_4px_rgba(234,179,8,0.5)]" />
      )}
      {[...Array(emptyStars)].map((_, i) => (
        <StarIcon
          key={`empty-${i}`}
          className="w-3.5 h-3.5 text-[color:var(--border)]"
        />
      ))}
    </div>
  );
};

const Skills = () => {
  const { theme } = useTheme();
  const [showRatings, setShowRatings] = useState(false);

  return (
    <Card className="flex flex-col items-start gap-4 border-x-0 border-t-0 p-6 border-b-2">
      <div className="flex w-full items-center justify-between">
        <p className="font-extrabold text-lg">Skills</p>
        {/* <Button
          variant="ghost"
          size="sm"
          onClick={() => setShowRatings(!showRatings)}
          className="hover:bg-primary/10 transition-colors"
        >
          {showRatings ? (
            <ChevronUpIcon className="w-4 h-4 mr-2" />
          ) : (
            <ChevronDownIcon className="w-4 h-4 mr-2" />
          )}
          <span className="text-sm font-semibold">
            {showRatings ? "Simple View" : "Detailed View"}
          </span>
        </Button> */}
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
            <TextAnimate animation="blurInUp" by="character" as="div" once>
              {allSkillNames.map((skill, index) => (
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
              height: { duration: 0.4 },
            }}
            className="w-full overflow-hidden"
          >
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mt-2 pb-2">
              {skillCategories.map((category) => (
                <Card
                  key={category.title}
                  className="p-4 rounded-xl relative overflow-hidden group/card border-[color:var(--border)] bg-[color:var(--surface-1)] shadow-[var(--elevated-shadow)]"
                >
                  <h4 className="text-xs font-bold tracking-widest text-muted-foreground mb-4 px-2 uppercase">
                    {category.title}
                  </h4>

                  <div className="space-y-2">
                    {category.skills.map((skill) => (
                      <div
                        key={skill.name}
                        className="flex items-center justify-between p-2 rounded-lg transition-colors group cursor-default hover:bg-[color:var(--surface-hover)]"
                      >
                        <div className="flex items-center gap-3">
                          <Icon
                            name={skill.icon}
                            className="w-5 h-5"
                            variant={theme}
                          />
                          <span className="text-base font-semibold text-foreground">
                            {skill.name}
                          </span>
                          <div className="h-0.5 w-4 bg-primary/30 rounded-full group-hover:w-8 transition-all" />
                        </div>

                        <div className="flex items-center gap-4">
                          <StarRating rating={skill.rating} />
                          <div className="flex items-center gap-2 text-sm font-mono w-32 justify-end">
                            <span className="text-muted-foreground">
                              {calculatePercentage(skill.rating)}%
                            </span>
                            <span className="text-foreground font-bold text-base">
                              {skill.rating.toFixed(1)}{" "}
                              <span className="text-muted-foreground text-xs">
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
