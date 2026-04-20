import { WordRotate } from "@/components/magicui/word-rotate";
import { Card, CardDescription, CardHeader } from "@/components/ui/card";
import { portfolioKnowledge } from "@/data/profile";
import { useTheme } from "@/hooks/useTheme";

const deepWhite = new URL("../assets/images/deep-white.png", import.meta.url)
  .href;
const deep = new URL("../assets/images/deep.png", import.meta.url).href;

const Header = () => {
  const { theme } = useTheme();

  return (
    <Card className="flex items-center border-x-0 p-4 border-y-2 pt-8">
      <Card className="rounded-full border-1 h-26 w-26 p-[2px] border-zinc-700 dark:border-zinc-600">
        <img
          src={theme === "dark" ? deep : deepWhite}
          alt="deep"
          className="rounded-full"
        />
      </Card>
      <Card className="border-transparent p-2 gap-2">
        <CardHeader className="text-xl font-extrabold tracking-tight text-balance inter p-0">
          {portfolioKnowledge.identity.name}
        </CardHeader>
        <CardDescription>
          <WordRotate words={portfolioKnowledge.identity.taglineWords} />
        </CardDescription>
      </Card>
    </Card>
  );
};

export default Header;
