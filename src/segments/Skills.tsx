import { TextAnimate } from "@/components/magicui/text-animate";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { useTheme } from "@/hooks/useTheme";

const Skills = () => {
  const { theme } = useTheme();
  const skills = [
    "React",
    "Angular",
    "Next.js",
    "React Native",
    "Tailwind",
    "TypeScript",
    "Node.js",
    "Express",
    "MongoDB",
    "Firebase",
    "MySQL",
    "Git",
    "Figma",
    "GCP",
    "Ionic"
  ];
  return (
    <Card className="flex flex-col items-start gap-4 border-x-0 border-t-0 p-6 borer-b-2">
      <p className="font-extrabold">Skills</p>
      <TextAnimate animation="blurInUp" by="character" once>
        {/* <div className="flex gap-2 flex-wrap"> */}
        {skills.map((skill, index) => (
          <Badge
            key={index}
            {...(theme === "dark" ? { variant: "default" } : {})}
            className="m-1"
          >
            {skill}
          </Badge>
        ))}
        {/* </div> */}
      </TextAnimate>
    </Card>
  );
};

export default Skills;
