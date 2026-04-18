import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { MessageCircle, X, Send, Sparkles, Bot } from "lucide-react";

type Message = {
  id: number;
  role: "user" | "assistant";
  text: string;
};

const INITIAL_MESSAGES: Message[] = [
  {
    id: 0,
    role: "assistant",
    text: "Hi! I'm SOFO AI. Ask me anything about automating your real estate workflows: listings, paperwork, or marketing. 🏡",
  },
];

const QUICK_REPLIES = [
  "How does Ria work?",
  "What forms can you fill?",
  "Show me staging examples",
];

// Simple canned responses for demo purposes
function getReply(input: string): string {
  const q = input.toLowerCase();
  if (q.includes("ria") || q.includes("listing"))
    return "Ria is your autonomous Listing Manager. She extracts data from documents, auto-fills MLS fields, and generates listing descriptions, all in seconds.";
  if (q.includes("form") || q.includes("paper") || q.includes("document"))
    return "SOFO AI auto-fills 10+ forms including listing agreements, seller disclosures, IABS forms, and closing stacks with surgical precision.";
  if (q.includes("stag"))
    return "Our Virtual Staging AI transforms empty rooms into beautifully furnished spaces. It also handles Day-to-Dusk, Exterior Enhancement, and Room Emptying.";
  if (q.includes("market") || q.includes("social") || q.includes("post"))
    return "The Marketing Agent generates Instagram posts, Facebook ads, LinkedIn articles, and email campaigns from your listing data. One click, all platforms.";
  if (q.includes("price") || q.includes("cost") || q.includes("plan"))
    return "We offer flexible plans for solo agents and teams. Book a demo via the button above and we'll walk you through pricing tailored to your volume.";
  return "Great question! SOFO AI handles the full real estate workflow: from document extraction to virtual staging to marketing distribution. Want me to walk you through a specific feature?";
}

export default function ChatWidget() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>(INITIAL_MESSAGES);
  const [input, setInput] = useState("");
  const [typing, setTyping] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (open) {
      setTimeout(() => inputRef.current?.focus(), 300);
    }
  }, [open]);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, typing]);

  function sendMessage(text: string) {
    if (!text.trim()) return;
    const userMsg: Message = { id: Date.now(), role: "user", text: text.trim() };
    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setTyping(true);

    setTimeout(() => {
      const reply: Message = {
        id: Date.now() + 1,
        role: "assistant",
        text: getReply(text),
      };
      setMessages((prev) => [...prev, reply]);
      setTyping(false);
    }, 1000 + Math.random() * 600);
  }

  return (
    <>
      {/* Chat Panel */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ type: "spring", stiffness: 300, damping: 28 }}
            className="fixed bottom-24 right-4 sm:right-6 z-50 w-[calc(100vw-2rem)] sm:w-[380px] max-h-[560px] flex flex-col rounded-3xl border border-border/60 bg-white shadow-heavy overflow-hidden"
            role="dialog"
            aria-label="SOFO AI Chat"
          >
            {/* Header */}
            <div className="flex items-center justify-between px-5 py-4 border-b border-border/40 bg-ink">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-brand-blue to-brand-purple flex items-center justify-center shadow-soft">
                  <Sparkles className="w-4 h-4 text-white" />
                </div>
                <div>
                  <div className="text-sm font-bold text-white leading-tight">SOFO AI</div>
                  <div className="flex items-center gap-1.5 mt-0.5">
                    <div className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
                    <span className="text-[10px] font-medium text-white/50 uppercase tracking-widest">Online</span>
                  </div>
                </div>
              </div>
              <button
                onClick={() => setOpen(false)}
                aria-label="Close chat"
                className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors"
              >
                <X className="w-4 h-4 text-white" />
              </button>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-3 bg-muted/20">
              {messages.map((msg) => (
                <motion.div
                  key={msg.id}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`flex gap-2.5 ${msg.role === "user" ? "flex-row-reverse" : "flex-row"}`}
                >
                  {msg.role === "assistant" && (
                    <div className="w-7 h-7 rounded-xl bg-gradient-to-br from-brand-blue to-brand-purple flex items-center justify-center shrink-0 mt-0.5 shadow-soft">
                      <Bot className="w-3.5 h-3.5 text-white" />
                    </div>
                  )}
                  <div
                    className={`max-w-[78%] px-4 py-2.5 rounded-2xl text-sm leading-relaxed ${
                      msg.role === "user"
                        ? "bg-ink text-white rounded-tr-sm font-medium"
                        : "bg-white text-ink border border-border/40 shadow-soft rounded-tl-sm"
                    }`}
                  >
                    {msg.text}
                  </div>
                </motion.div>
              ))}

              {/* Typing indicator */}
              {typing && (
                <motion.div
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex gap-2.5"
                >
                  <div className="w-7 h-7 rounded-xl bg-gradient-to-br from-brand-blue to-brand-purple flex items-center justify-center shrink-0 shadow-soft">
                    <Bot className="w-3.5 h-3.5 text-white" />
                  </div>
                  <div className="bg-white border border-border/40 shadow-soft rounded-2xl rounded-tl-sm px-4 py-3 flex items-center gap-1">
                    {[0, 1, 2].map((i) => (
                      <motion.div
                        key={i}
                        animate={{ y: [0, -4, 0] }}
                        transition={{ duration: 0.6, repeat: Infinity, delay: i * 0.15 }}
                        className="w-1.5 h-1.5 rounded-full bg-ink-soft/40"
                      />
                    ))}
                  </div>
                </motion.div>
              )}
              <div ref={bottomRef} />
            </div>

            {/* Quick replies */}
            {messages.length <= 1 && (
              <div className="px-4 py-2 flex gap-2 overflow-x-auto border-t border-border/30 bg-white">
                {QUICK_REPLIES.map((q) => (
                  <button
                    key={q}
                    onClick={() => sendMessage(q)}
                    className="shrink-0 text-[11px] font-semibold px-3 py-1.5 rounded-full border border-border bg-muted/40 text-ink-soft hover:text-ink hover:border-ink/20 transition-colors whitespace-nowrap"
                  >
                    {q}
                  </button>
                ))}
              </div>
            )}

            {/* Input */}
            <div className="px-4 py-3 border-t border-border/40 bg-white flex items-center gap-3">
              <input
                ref={inputRef}
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && sendMessage(input)}
                placeholder="Ask SOFO AI anything..."
                aria-label="Chat message input"
                className="flex-1 text-sm bg-muted/40 border border-border/40 rounded-xl px-4 py-2.5 outline-none focus:border-brand-blue/40 focus:bg-white transition-colors placeholder:text-ink-soft/60 text-ink"
              />
              <button
                onClick={() => sendMessage(input)}
                disabled={!input.trim()}
                aria-label="Send message"
                className="w-9 h-9 rounded-xl bg-ink text-white flex items-center justify-center hover:bg-brand-blue transition-colors disabled:opacity-30 disabled:cursor-not-allowed shrink-0"
              >
                <Send className="w-4 h-4" />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Trigger Button */}
      <motion.button
        onClick={() => setOpen(!open)}
        aria-label={open ? "Close chat" : "Open chat"}
        whileHover={{ scale: 1.08 }}
        whileTap={{ scale: 0.95 }}
        className="fixed bottom-6 right-4 sm:right-6 z-50 w-14 h-14 rounded-2xl bg-ink text-white shadow-heavy flex items-center justify-center"
      >
        <AnimatePresence mode="wait">
          {open ? (
            <motion.div key="close" initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }} transition={{ duration: 0.2 }}>
              <X className="w-5 h-5" />
            </motion.div>
          ) : (
            <motion.div key="open" initial={{ rotate: 90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: -90, opacity: 0 }} transition={{ duration: 0.2 }}>
              <MessageCircle className="w-5 h-5" />
            </motion.div>
          )}
        </AnimatePresence>
        {/* Unread dot */}
        {!open && (
          <span className="absolute -top-1 -right-1 w-3.5 h-3.5 rounded-full bg-brand-blue border-2 border-white animate-pulse" />
        )}
      </motion.button>
    </>
  );
}
