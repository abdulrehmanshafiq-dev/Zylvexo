"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { motion } from "framer-motion";
import { Send, Zap, Brain, Users } from "lucide-react";

interface Message {
  role: "user" | "assistant";
  content: string;
}

const GREETING =
  "Hi! I'm Zylvexo's AI assistant. Ask me about our services, pricing, timelines — anything. What can I help you with?";

const quickSuggestions = [
  "What services do you offer?",
  "How long does a project take?",
  "Do you work with startups?",
];

const features = [
  {
    icon: Zap,
    title: "Instant replies",
    sub: "Sub-second responses, around the clock",
  },
  {
    icon: Brain,
    title: "Knows the business",
    sub: "Trained on services, pricing, and process",
  },
  {
    icon: Users,
    title: "Human handoff",
    sub: "Escalates seamlessly when it matters",
  },
];

export default function AIShowcase() {
  const [messages, setMessages] = useState<Message[]>([
    { role: "assistant", content: GREETING },
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = useCallback(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth", block: "nearest" });
  }, []);

  useEffect(() => {
    if (messages.length > 1) scrollToBottom();
  }, [messages, scrollToBottom]);

  async function sendMessage(text: string) {
    if (!text.trim() || isLoading) return;

    const userMessage: Message = { role: "user", content: text.trim() };
    const updated = [...messages, userMessage];
    setMessages(updated);
    setInput("");
    setIsLoading(true);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          message: text.trim(),
          history: updated.slice(-10),
        }),
      });
      const data = await res.json();
      setMessages((prev) => [
        ...prev,
        { role: "assistant", content: data.reply },
      ]);
    } catch {
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content: "I'm having a moment — try asking again shortly.",
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  }

  function handleKeyDown(e: React.KeyboardEvent) {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage(input);
    }
  }

  return (
    <section id="contact" className="py-28 px-5 max-w-7xl mx-auto">
      <div className="grid md:grid-cols-5 gap-14 items-center">
        {/* Left column */}
        <motion.div
          initial={{ opacity: 0, y: 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6 }}
          className="md:col-span-2"
        >
          <p className="section-label">Live Demo</p>
          <h2 className="text-4xl md:text-5xl font-display font-bold text-[#F2F1F8] mt-4 leading-[1.1] tracking-tight">
            Talk to our AI —{" "}
            <span className="serif-accent gradient-text">right now</span>
          </h2>
          <p className="text-[#9CA0B3] mt-6 text-[15px] leading-relaxed max-w-md">
            This is the kind of intelligent assistant we build for businesses.
            It knows our services, handles questions, and guides conversations
            — 24/7. Go ahead, try it.
          </p>

          <div className="mt-9 space-y-5">
            {features.map((f) => (
              <div key={f.title} className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl bg-[#7C3AED]/10 ring-1 ring-[#7C3AED]/25 flex items-center justify-center shrink-0">
                  <f.icon className="w-4 h-4 text-[#A78BFA]" />
                </div>
                <div>
                  <p className="text-[#F2F1F8] font-semibold text-sm">
                    {f.title}
                  </p>
                  <p className="text-[#5F6577] text-[13px] mt-0.5">{f.sub}</p>
                </div>
              </div>
            ))}
          </div>

          <p className="flex items-center gap-2 mt-9 text-xs text-[#5F6577]">
            <Zap className="w-3.5 h-3.5 text-[#D4A853]" />
            Built on Llama 3.1 via Groq — the same tech we ship to clients
          </p>
        </motion.div>

        {/* Right column — Chat widget */}
        <motion.div
          initial={{ opacity: 0, y: 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6, delay: 0.15 }}
          className="md:col-span-3 relative"
        >
          {/* Glow */}
          <div className="absolute -inset-6 bg-[#7C3AED]/[0.12] blur-3xl rounded-full pointer-events-none" />

          <div className="relative p-px rounded-3xl bg-gradient-to-b from-[#7C3AED]/60 via-white/[0.08] to-transparent">
            <div className="rounded-[23px] bg-[#080A12] overflow-hidden">
              {/* Chat header */}
              <div className="px-5 py-4 border-b border-white/[0.06] flex items-center gap-3.5">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#7C3AED] to-[#A855F7] flex items-center justify-center text-white font-display font-bold shadow-lg shadow-violet-500/25">
                  Z
                </div>
                <div>
                  <p className="text-[#F2F1F8] text-sm font-semibold">
                    Zylvexo AI
                  </p>
                  <div className="flex items-center gap-1.5 mt-0.5">
                    <span className="relative flex h-1.5 w-1.5">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-60" />
                      <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-green-400" />
                    </span>
                    <span className="text-[#5F6577] text-[11px]">
                      Online — replies instantly
                    </span>
                  </div>
                </div>
              </div>

              {/* Messages */}
              <div className="h-[360px] overflow-y-auto p-5 flex flex-col gap-3.5">
                {messages.map((msg, i) => (
                  <div
                    key={i}
                    className={`flex ${
                      msg.role === "user" ? "justify-end" : "justify-start"
                    }`}
                  >
                    <div
                      className={`max-w-[80%] px-4 py-2.5 text-sm leading-relaxed ${
                        msg.role === "user"
                          ? "bg-gradient-to-br from-[#7C3AED] to-[#6D28D9] text-white rounded-2xl rounded-tr-md"
                          : "bg-white/[0.05] border border-white/[0.05] text-[#E2E1EC] rounded-2xl rounded-tl-md"
                      }`}
                    >
                      {msg.content}
                    </div>
                  </div>
                ))}

                {isLoading && (
                  <div className="flex justify-start">
                    <div className="bg-white/[0.05] border border-white/[0.05] rounded-2xl rounded-tl-md px-4 py-3.5 flex gap-1.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#A78BFA] animate-bounce [animation-delay:0ms]" />
                      <span className="w-1.5 h-1.5 rounded-full bg-[#A78BFA] animate-bounce [animation-delay:150ms]" />
                      <span className="w-1.5 h-1.5 rounded-full bg-[#A78BFA] animate-bounce [animation-delay:300ms]" />
                    </div>
                  </div>
                )}

                {/* Quick suggestions — only before first user message */}
                {messages.length === 1 && !isLoading && (
                  <div className="flex flex-wrap gap-2 mt-auto pt-4">
                    {quickSuggestions.map((s) => (
                      <button
                        key={s}
                        onClick={() => sendMessage(s)}
                        className="text-xs px-3.5 py-2 rounded-full border border-[#7C3AED]/30 text-[#C4B5FD] hover:bg-[#7C3AED]/15 hover:border-[#7C3AED]/60 transition-colors"
                      >
                        {s}
                      </button>
                    ))}
                  </div>
                )}

                <div ref={messagesEndRef} />
              </div>

              {/* Input */}
              <div className="border-t border-white/[0.06] p-3.5 flex gap-2.5">
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={handleKeyDown}
                  disabled={isLoading}
                  placeholder="Ask anything..."
                  className="flex-1 bg-white/[0.04] border border-white/[0.06] rounded-xl px-4 py-2.5 text-[#F2F1F8] text-sm placeholder-[#5F6577] outline-none focus:border-[#7C3AED]/60 transition-colors disabled:opacity-50"
                />
                <button
                  onClick={() => sendMessage(input)}
                  disabled={isLoading || !input.trim()}
                  className="w-11 h-11 rounded-xl bg-gradient-to-br from-[#7C3AED] to-[#8B5CF6] text-white flex items-center justify-center hover:shadow-lg hover:shadow-violet-500/30 disabled:opacity-40 transition-all shrink-0"
                  aria-label="Send message"
                >
                  <Send className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
