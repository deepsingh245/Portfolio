import { Highlighter } from "@/components/magicui/highlighter";
import { Card, CardDescription } from "@/components/ui/card";
import { portfolioKnowledge } from "@/data/profile";
import { CornerDownRight } from "lucide-react";

const About = () => {
  return (
    <Card className="flex flex-col items-start gap-4 border-x-0 border-t-0 p-6 border-b-2">
      <p className="font-extrabold">About</p>
      {portfolioKnowledge.identity.aboutBullets.map((bullet, index) => (
        <CardDescription key={index}>
          <div className="flex gap-2 items-center">
            <CornerDownRight />
            {index === 0 ? (
              <span>
                I'm a{" "}
                <Highlighter action="underline" color="#FF9800">
                  frontend engineer
                </Highlighter>{" "}
                who loves turning ideas into sleek, interactive experiences.
              </span>
            ) : (
              <span>{bullet}</span>
            )}
          </div>
        </CardDescription>
      ))}
    </Card>
  );
};

export default About;
