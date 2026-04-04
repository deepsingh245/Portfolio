import { AnimatedSpan, Terminal, TypingAnimation } from "../ui/terminal";

export function TerminalBox({ data }: { data: { text: string; delay: number }[] }) {
  return (
    <Terminal className="bg-[#030303] text-white border-white/5 shadow-2xl h-full w-full">
      {data.map((item, index) => {
        const isCommand = item.text.startsWith("$");
        const isSuccess = item.text.includes("drwxr-xr-x") && !item.text.includes("boring");
        
        if (isCommand) {
          return (
            <AnimatedSpan key={index} className="text-primary font-bold">
              <TypingAnimation delay={item.delay}>{item.text}</TypingAnimation>
            </AnimatedSpan>
          );
        }

        return (
          <AnimatedSpan 
            key={index} 
            className={isSuccess ? "text-green-400" : "text-muted-foreground"}
          >
            <span>{item.text}</span>
          </AnimatedSpan>
        );
      })}

      <AnimatedSpan className="text-primary animate-pulse">
        <span>_</span>
      </AnimatedSpan>
    </Terminal>
  );
}

export function TerminalDemo() {
  const defaultData = [
    { text: "$ whoami", delay: 0 },
    { text: "Full-stack wizard. Problem solver. Coffee-to-code converter.", delay: 500 },
    { text: "$ ls -la opportunities/", delay: 1000 },
    { text: "total 42", delay: 500 },
    { text: "drwxr-xr-x remote-jobs", delay: 200 },
    { text: "drwxr-xr-x collaborations", delay: 200 },
    { text: "drwxr-xr-x boring-meetings (0 items)", delay: 200 },
  ];

  return <TerminalBox data={defaultData} />;
}
