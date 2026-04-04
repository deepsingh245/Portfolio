import { RetroGrid } from "@/components/magicui/retro-grid";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useState } from "react";
import { motion } from "framer-motion";
import { 
  SendIcon, 
  CoffeeIcon, 
  ActivityIcon, 
  ClockIcon,
  ZapIcon
} from "lucide-react";
import { TerminalBox } from "@/components/magicui/terminal";

const terminalData = [
  { text: "$ whoami", delay: 0 },
  { text: "Full-stack wizard. Problem solver. Coffee-to-code converter.", delay: 500 },
  { text: "$ ls -la opportunities/", delay: 1000 },
  { text: "total 42", delay: 500 },
  { text: "drwxr-xr-x remote-jobs", delay: 200 },
  { text: "drwxr-xr-x collaborations", delay: 200 },
  { text: "drwxr-xr-x boring-meetings (0 items)", delay: 200 },
];

const Contact = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState<
    "idle" | "loading" | "success" | "error"
  >("idle");

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");
    try {
      const res = await fetch("/.netlify/functions/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, message }),
      });
      if (!res.ok) throw new Error("Failed");
      setStatus("success");
      setName("");
      setEmail("");
      setMessage("");
    } catch (e) {
      setStatus("error");
    }
  };

  return (
    <Card className="border-x-0 border-t-0 relative bg-background overflow-hidden">
      <div className="absolute inset-0 z-0">
        <RetroGrid />
      </div>
      
      <div className="p-8 md:p-12 relative z-10 w-full">
        <div className="flex items-center gap-3 mb-12">
           <p className="font-extrabold text-lg inter">Contact</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left: Contact Form */}
          <div className="lg:col-span-2">
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="bg-card/30 dark:bg-neutral-900/40 backdrop-blur-md border border-border p-8 rounded-xl shadow-2xl"
            >
              <form onSubmit={onSubmit} className="space-y-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="flex flex-col">
                    <label className="text-[14px] font-black text-muted-foreground ml-1 mb-2 inter">Your Alias</label>
                    <Input
                      placeholder='git config user.name "John Doe"'
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      required
                      className="bg-background/50 border-border focus:border-primary/50 transition-all h-12 rounded-xl inter"
                    />
                  </div>
                  <div className="flex flex-col">
                    <label className="text-[14px] font-black text-muted-foreground ml-1 mb-2">Return Address</label>
                    <Input
                      type="email"
                      placeholder="dev@example.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                      className="bg-background/50 border-border focus:border-primary/50 transition-all h-12 rounded-xl inter"
                    />
                  </div>
                </div>

                <div className="flex flex-col">
                  <label className="text-[14px] font-black text-muted-foreground ml-1 mb-2 inter">The Payload (Message)</label>
                  <Textarea
                    placeholder='npm start "Let s build something unthinkable..."'
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    required
                    rows={6}
                    className="bg-background/50 border-border focus:border-primary/50 transition-all rounded-xl inter resize-none"
                  />
                </div>

                <Button 
                  type="submit" 
                  disabled={status === "loading"}
                  className="w-full bg-foreground text-background dark:bg-primary dark:text-white hover:opacity-90 h-14 rounded-2xl text-base font-black tracking-widest transition-all group shadow-xl inter"
                >
                  {status === "loading" ? "UPLOADING..." : (
                    <span className="flex items-center gap-3 text-white dark:text-black text-sm">
                      PUSH TO MASTER <SendIcon className="w-5 h-5 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                    </span>
                  )}
                </Button>
                
                {status === "success" && (
                  <p className="text-center text-xs font-bold text-green-500 animate-pulse">COMMIT SUCCESSFUL: MESSAGE DELIVERED</p>
                )}
                {status === "error" && (
                  <p className="text-center text-xs font-bold text-red-500">FATAL ERROR: FAILED TO PUSH CHANGES</p>
                )}
              </form>
            </motion.div>
          </div>

          {/* Right: Status & Terminal */}
          <div className="space-y-6">
            {/* System Status Card */}
            <motion.div 
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="bg-card/30 dark:bg-neutral-900/40 backdrop-blur-md border border-border p-6 rounded-2xl"
            >
              <div className="flex items-center gap-2 mb-6">
                <ActivityIcon className="w-4 h-4 text-primary" />
                <h3 className="text-lg font-bold text-foreground inter">System Status</h3>
              </div>
              
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3 text-muted-foreground inter">
                    <CoffeeIcon className="w-4 h-4" />
                    <span className="text-sm font-medium">Caffeine Level</span>
                  </div>
                  <span className="text-xs font-mono text-foreground font-bold">98.4% (Optimized)</span>
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3 text-muted-foreground inter">
                    <ClockIcon className="w-4 h-4" />
                    <span className="text-sm font-medium">Current Uptime</span>
                  </div>
                  <span className="text-xs font-mono text-foreground font-bold">256 days, 04:22:01</span>
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3 text-yellow-500 inter">
                    <ZapIcon className="w-4 h-4" />
                    <span className="text-sm font-medium">Response Latency</span>
                  </div>
                  <span className="text-xs font-mono text-foreground font-bold">&lt; 24h (Avg)</span>
                </div>
              </div>

              <div className="mt-8 pt-6 border-t border-border">
                <p className="text-[11px] italic text-muted-foreground leading-relaxed inter">
                  "I promise I respond faster than a poorly optimized React app or a generic 'npm install' on a slow connection."
                </p>
              </div>
            </motion.div>

            <div className="h-[250px]">
              <TerminalBox data={terminalData} />
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default Contact;
