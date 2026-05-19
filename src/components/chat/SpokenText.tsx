import React, { useEffect, useMemo, useState } from "react";
import { cn } from "@/lib/utils";

interface SpokenTextProps {
  text: string;
  currentCharIndex: number;
  isSpeaking: boolean;
  className?: string;
}

const SpokenText: React.FC<SpokenTextProps> = ({
  text,
  currentCharIndex,
  isSpeaking,
  className,
}) => {
  // Split text into words while keeping track of their starting character index
  const words = useMemo(() => {
    const result: { word: string; start: number; end: number }[] = [];
    let currentPos = 0;
    
    // Split by whitespace but keep the whitespace in the positions
    const tokens = text.split(/(\s+)/);
    
    tokens.forEach((token) => {
      const start = currentPos;
      const end = currentPos + token.length;
      result.push({ word: token, start, end });
      currentPos = end;
    });
    
    return result;
  }, [text]);

  return (
    <div className={cn("inline", className)}>
      {words.map((item, index) => {
        // A word is considered "active" if the currentCharIndex falls within its range
        // We also check if it's currently speaking to avoid permanent highlighting
        const isActive = isSpeaking && currentCharIndex >= item.start && currentCharIndex < item.end;
        
        // Only highlight non-whitespace tokens
        const isWhitespace = /^\s+$/.test(item.word);

        return (
          <span
            key={index}
            className={cn(
              "transition-colors duration-200",
              isActive && !isWhitespace
                ? "bg-primary/20 text-primary font-medium rounded-sm px-0.5 -mx-0.5"
                : ""
            )}
          >
            {item.word}
          </span>
        );
      })}
    </div>
  );
};

export default SpokenText;
