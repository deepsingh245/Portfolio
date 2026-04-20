import { AnimatedSpan, Terminal, TypingAnimation } from "../ui/terminal";

export function TerminalBox({ data }: { data: { text: string; delay: number }[] }) {
  return (
    <Terminal
      sequence={false}
      startOnView={false}
      className="h-full w-full border-[color:var(--terminal-border)] bg-[color:var(--terminal-bg)] text-[color:var(--terminal-text)] shadow-[var(--elevated-shadow)]"
    >
      {data.map((item, index) => {
        const isCommand = item.text.startsWith("$");
        const isSuccess = item.text.includes("drwxr-xr-x") && !item.text.includes("boring");
        const lineDelay = item.delay + index * 120;
        
        if (isCommand) {
          return (
            <AnimatedSpan key={index} delay={lineDelay} className="font-bold text-primary">
              <TypingAnimation delay={lineDelay} startOnView={false}>
                {item.text}
              </TypingAnimation>
            </AnimatedSpan>
          );
        }

        return (
          <AnimatedSpan 
            key={index} 
            delay={lineDelay}
            className={
              isSuccess
                ? "text-[color:var(--terminal-success)]"
                : "text-[color:var(--terminal-muted)]"
            }
          >
            <span>{item.text}</span>
          </AnimatedSpan>
        );
      })}

      <AnimatedSpan delay={data.length * 180} className="text-primary animate-pulse">
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
