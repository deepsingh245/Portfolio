import { Highlighter } from "@/components/magicui/highlighter";
import { Card, CardDescription } from "@/components/ui/card";
import { portfolioKnowledge } from "@/data/profile";

const About = () => {
  return (
    <Card className="flex flex-col items-start gap-4 border-x-0 border-t-0 p-6 border-b-2">
      <p className="font-extrabold">About</p>
      {portfolioKnowledge.identity.aboutBullets.map((bullet, index) => (
        <CardDescription key={index}>
          <div className="flex gap-3 items-center">
            <span
              aria-hidden="true"
              className="flex h-5 w-7 shrink-0 items-center gap-1.5"
            >
              <span className="h-px flex-1 rounded-full bg-gradient-to-r from-primary/15 via-primary/60 to-primary/90" />
              <span className="h-2 w-2 rounded-full border border-primary/40 bg-background shadow-[0_0_0_3px_color-mix(in_srgb,var(--color-primary)_10%,transparent)]" />
            </span>
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
