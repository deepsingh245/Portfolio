import { useTheme } from "@/hooks/useTheme";
import { AnimatedSpan, Terminal, TypingAnimation } from "../ui/terminal";

export function TerminalBox({ data }: { data: { text: string; delay: number }[] }) {
  const { theme } = useTheme();
  const isDark = theme === "dark";

  return (
    <Terminal
      sequence={false}
      startOnView={false}
      className={
        isDark
          ? "h-full w-full border-white/8 bg-[#050816] text-zinc-100 shadow-2xl"
          : "h-full w-full border-zinc-200/90 bg-white text-zinc-900 shadow-[0_18px_45px_rgba(15,23,42,0.08)]"
      }
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
                ? isDark
                  ? "text-emerald-400"
                  : "text-emerald-600"
                : isDark
                  ? "text-zinc-300"
                  : "text-zinc-600"
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
