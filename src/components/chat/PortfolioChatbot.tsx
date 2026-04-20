import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  ArrowUp,
  Bot,
  Loader2,
  MessageCircleMore,
  Orbit,
  RefreshCw,
  Sparkles,
  User2,
  X,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { portfolioKnowledge } from "@/data/profile";
import { trimChatHistory } from "@/lib/chatbot";
import { cn } from "@/lib/utils";
import type { ChatMessage, ChatResponseBody } from "@/types/chat";

type DisplayMessage = ChatMessage & {
  citations?: string[];
};

const starterQuestions = portfolioKnowledge.faqSeeds.slice(0, 4);

const PortfolioChatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<DisplayMessage[]>([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [suggestedQuestions, setSuggestedQuestions] =
    useState<string[]>(starterQuestions);
  const [lastUserMessage, setLastUserMessage] = useState<string | null>(null);
  const listRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (listRef.current) {
      listRef.current.scrollTop = listRef.current.scrollHeight;
    }
  }, [messages, isLoading, isOpen]);

  const sendMessage = async (rawMessage: string) => {
    const content = rawMessage.trim();
    if (!content || isLoading) return;

    const nextMessages: DisplayMessage[] = [
      ...messages,
      { role: "user", content },
    ];

    setMessages(nextMessages);
    setInput("");
    setError(null);
    setIsLoading(true);
    setLastUserMessage(content);

    try {
      const response = await fetch("/.netlify/functions/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages: trimChatHistory(
            nextMessages.map(({ role, content: messageContent }) => ({
              role,
              content: messageContent,
            }))
          ),
        }),
      });

      const payload = (await response.json()) as Partial<ChatResponseBody> & {
        error?: string;
      };

      if (!response.ok || !payload.reply) {
        throw new Error(
          payload.error || "The portfolio assistant is unavailable right now."
        );
      }

      setMessages((current) => [
        ...current,
        {
          role: "assistant",
          content: payload.reply!,
          citations: payload.citations,
        },
      ]);
      setSuggestedQuestions(
        payload.suggestedQuestions?.length
          ? payload.suggestedQuestions
          : starterQuestions
      );
    } catch (requestError: any) {
      setError(
        requestError?.message ||
          "The portfolio assistant is unavailable right now."
      );
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = async () => {
    await sendMessage(input);
  };

  const handleRetry = async () => {
    if (lastUserMessage) {
      await sendMessage(lastUserMessage);
    }
  };

  return (
    <>
      <motion.div
        className="fixed bottom-24 right-4 md:bottom-6 md:right-6 z-[60]"
        animate={{
          scale: isOpen ? 1.03 : 1,
          y: isOpen ? -4 : 0,
        }}
        transition={{ type: "spring", stiffness: 260, damping: 18 }}
      >
        <Button
          onClick={() => setIsOpen((open) => !open)}
          className={cn(
            "h-14 rounded-full px-5 shadow-2xl border backdrop-blur-md",
            "transition-[background-color,border-color,box-shadow] duration-300",
            isOpen
              ? "border-primary/40 bg-primary text-primary-foreground shadow-[0_18px_45px_rgba(99,102,241,0.35)]"
              : "border-primary/20 bg-background/95 text-foreground hover:bg-background"
          )}
        >
          <motion.div
            className="flex items-center gap-2"
            initial={false}
            animate={{ rotate: isOpen ? 180 : 0 }}
            transition={{ type: "spring", stiffness: 260, damping: 18 }}
          >
            <AnimatePresence mode="wait" initial={false}>
              <motion.span
                key={isOpen ? "close" : "open"}
                initial={{ opacity: 0, rotate: -90, scale: 0.7 }}
                animate={{ opacity: 1, rotate: 0, scale: 1 }}
                exit={{ opacity: 0, rotate: 90, scale: 0.7 }}
                transition={{ duration: 0.18 }}
                className="flex items-center justify-center"
              >
                {isOpen ? (
                  <Orbit className="w-5 h-5" />
                ) : (
                  <MessageCircleMore className="w-5 h-5" />
                )}
              </motion.span>
            </AnimatePresence>
          </motion.div>
          <motion.span
            className="font-semibold"
            animate={{ x: isOpen ? 2 : 0 }}
            transition={{ type: "spring", stiffness: 260, damping: 18 }}
          >
            {isOpen ? "Close chat" : "Ask about Me"}
          </motion.span>
        </Button>
      </motion.div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.98 }}
            transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
            className="fixed z-[70] left-4 right-4 bottom-40 md:left-auto md:right-6 md:bottom-24 md:w-[26rem]"
          >
            <Card className="flex h-[min(78vh,42rem)] flex-col overflow-hidden border border-border/70 bg-background/95 backdrop-blur-xl shadow-[0_24px_80px_rgba(0,0,0,0.35)] rounded-lg">
              <div className="shrink-0 border-b border-border/70 p-4 bg-gradient-to-r from-primary/10 via-background to-background">
                <div className="flex items-start justify-between gap-4">
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <div className="flex h-9 w-9 items-center justify-center rounded-2xl bg-primary/15 text-primary">
                        <Bot className="w-4 h-4" />
                      </div>
                      <div>
                        <p className="text-sm font-bold">
                          My Portfolio Assistant
                        </p>
                      </div>
                    </div>
                    {/* <div className="flex flex-wrap gap-2">
                      {portfolioKnowledge.identity.focusAreas
                        .slice(0, 3)
                        .map((area) => (
                          <Badge
                            key={area}
                            variant="secondary"
                            className="text-[10px] tracking-wide"
                          >
                            {area}
                          </Badge>
                        ))}
                    </div> */}
                  </div>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="rounded-full"
                    onClick={() => setIsOpen(false)}
                  >
                    <X className="w-4 h-4" />
                  </Button>
                </div>
              </div>

              <div
                ref={listRef}
                className="min-h-0 flex-1 overflow-y-auto p-4 space-y-4"
              >
                {messages.length === 0 ? (
                  <div className="space-y-4">
                    <div className="rounded-3xl border border-dashed border-border/70 bg-muted/25 p-4">
                      <div className="flex items-start gap-3">
                        <Sparkles className="w-4 h-4 mt-1 text-primary" />
                        <div className="space-y-2">
                          <p className="text-sm font-semibold">
                            Ask anything that helps you understand the profile
                            better
                          </p>
                          {/* <p className="text-sm text-muted-foreground leading-6">
                            {portfolioKnowledge.identity.summary}
                          </p> */}
                        </div>
                      </div>
                    </div>

                    <div className="flex flex-wrap gap-2">
                      {starterQuestions.map((question) => (
                        <button
                          key={question}
                          type="button"
                          onClick={() => void sendMessage(question)}
                          className="rounded-full border border-border bg-background px-3 py-2 text-left text-xs font-medium text-foreground transition hover:border-primary/40 hover:bg-primary/5"
                        >
                          {question}
                        </button>
                      ))}
                    </div>
                  </div>
                ) : (
                  messages.map((message, index) => (
                    <div
                      key={`${message.role}-${index}-${message.content.slice(0, 16)}`}
                      className={cn(
                        "flex",
                        message.role === "user" ? "justify-end" : "justify-start"
                      )}
                    >
                      <div
                        className={cn(
                          "max-w-[88%] rounded-3xl border px-4 py-3 shadow-sm",
                          message.role === "user"
                            ? "bg-primary text-primary-foreground border-primary/30"
                            : "bg-muted/40 border-border/70"
                        )}
                      >
                        <div className="mb-2 flex items-center gap-2 text-[11px] uppercase tracking-[0.2em] opacity-70">
                          {message.role === "user" ? (
                            <User2 className="w-3 h-3" />
                          ) : (
                            <Bot className="w-3 h-3" />
                          )}
                          {message.role}
                        </div>
                        <p className="text-sm leading-6 whitespace-pre-wrap">
                          {message.content}
                        </p>
                        {message.role === "assistant" &&
                          message.citations?.length ? (
                            <div className="mt-3 flex flex-wrap gap-2">
                              {message.citations.map((citation) => (
                                <Badge
                                  key={citation}
                                  variant="secondary"
                                  className="text-[10px]"
                                >
                                  {citation}
                                </Badge>
                              ))}
                            </div>
                          ) : null}
                      </div>
                    </div>
                  ))
                )}

                {isLoading && (
                  <div className="flex justify-start">
                    <div className="max-w-[88%] rounded-3xl border border-border/70 bg-muted/40 px-4 py-3">
                      <div className="mb-2 flex items-center gap-2 text-[11px] uppercase tracking-[0.2em] opacity-70">
                        <Bot className="w-3 h-3" />
                        assistant
                      </div>
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <Loader2 className="w-4 h-4 animate-spin" />
                        Thinking through the portfolio...
                      </div>
                    </div>
                  </div>
                )}
              </div>

              <div className="shrink-0 border-t border-border/70 p-4 space-y-3 bg-background/95">
                {error ? (
                  <div className="flex items-center justify-between gap-3 rounded-2xl border border-red-500/30 bg-red-500/5 px-3 py-2 text-xs text-red-600 dark:text-red-400">
                    <span>{error}</span>
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      className="h-7 px-2"
                      onClick={() => void handleRetry()}
                      disabled={!lastUserMessage || isLoading}
                    >
                      <RefreshCw className="w-3.5 h-3.5" />
                      Retry
                    </Button>
                  </div>
                ) : null}

                {/* {messages.length > 0 && suggestedQuestions.length > 0 ? (
                  <div className="flex flex-wrap gap-2">
                    {suggestedQuestions.map((question) => (
                      <button
                        key={question}
                        type="button"
                        onClick={() => void sendMessage(question)}
                        className="rounded-full border border-border bg-background px-3 py-1.5 text-[11px] font-medium transition hover:border-primary/40 hover:bg-primary/5"
                      >
                        {question}
                      </button>
                    ))}
                  </div>
                ) : null} */}

                <div className="flex items-end gap-3">
                  <Textarea
                    value={input}
                    onChange={(event) => setInput(event.target.value)}
                    onKeyDown={(event) => {
                      if (event.key === "Enter" && !event.shiftKey) {
                        event.preventDefault();
                        void handleSubmit();
                      }
                    }}
                    placeholder="Ask about experience, projects, skills, or achievements..."
                    rows={3}
                    className="min-h-[88px] rounded-lg resize-none border-border/70 bg-background"
                  />
                  <Button
                    type="button"
                    size="icon"
                    className="h-12 w-12 rounded-full"
                    onClick={() => void handleSubmit()}
                    disabled={isLoading || !input.trim()}
                  >
                    <ArrowUp className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </Card>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default PortfolioChatbot;
