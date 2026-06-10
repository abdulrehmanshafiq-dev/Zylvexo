"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { motion } from "framer-motion";
import { Send, Zap } from "lucide-react";

interface Message {
  role: "user" | "assistant";
  content: string;
}

const GREETING =
  "Hi! I'm Zylvexo's AI assistant. I can help with questions about our services, pricing, timelines, or anything else. What can I help you with?";

const quickSuggestions = [
  "What services do you offer?",
  "How long does a project take?",
  "Do you work with startups?",
];

export default function AIShowcase() {
  const [messages, setMessages] = useState<Message[]>([
    { role: "assistant", content: GREETING },
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = useCallback(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, []);

  useEffect(() => {
    scrollToBottom();
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
    <section id="contact" className="py-24 px-4 max-w-7xl mx-auto">
      <div className="grid md:grid-cols-5 gap-12 items-start">
        {/* Left column */}
        <motion.div
          initial={{ opacity: 0, y: 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6 }}
          className="md:col-span-2"
        >
          <p className="text-xs tracking-widest text-[#7C3AED] uppercase font-medium">
            Live Demo
          </p>
          <h2 className="text-3xl md:text-4xl font-display font-bold text-[#F0F0F8] mt-3 leading-tight">
            Talk to Our AI — Right Now
          </h2>
          <p className="text-[#9CA3AF] mt-4 text-sm leading-relaxed">
            Experience the kind of intelligent assistant we build for
            businesses. It knows our services, handles questions, and guides
            conversations — 24/7.
          </p>

          <div className="flex flex-wrap gap-2 mt-6">
            {quickSuggestions.map((s) => (
              <button
                key={s}
                onClick={() => sendMessage(s)}
                disabled={isLoading}
                className="text-xs px-3 py-1.5 rounded-full border border-[#7C3AED]/30 text-[#A855F7] hover:bg-[#7C3AED]/10 transition-colors disabled:opacity-50"
              >
                {s}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-2 mt-6">
            <Zap className="w-3.5 h-3.5 text-[#D4A853]" />
            <span className="text-xs text-[#6B7280]">
              Built on llama-3.1 via Groq ⚡
            </span>
          </div>
        </motion.div>

        {/* Right column — Chat widget */}
        <motion.div
          initial={{ opacity: 0, y: 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="md:col-span-3"
        >
          <div className="glass rounded-2xl border border-[#7C3AED]/30 overflow-hidden">
            {/* Chat header */}
            <div className="bg-gradient-to-r from-[#7C3AED] to-[#A855F7] px-5 py-3 flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center text-white text-xs font-bold">
                Z
              </div>
              <div>
                <p className="text-white text-sm font-semibold">Zylvexo AI</p>
                <div className="flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-green-400" />
                  <span className="text-white/70 text-[10px]">Online</span>
                </div>
              </div>
            </div>

            {/* Messages */}
            <div className="h-80 overflow-y-auto p-4 flex flex-col gap-3">
              {messages.map((msg, i) => (
                <div
                  key={i}
                  className={`flex ${
                    msg.role === "user" ? "justify-end" : "justify-start"
                  }`}
                >
                  <div
                    className={`max-w-[80%] px-4 py-2.5 text-sm ${
                      msg.role === "user"
                        ? "bg-[#7C3AED] text-white rounded-2xl rounded-tr-sm"
                        : "bg-[#131929] text-[#F0F0F8] rounded-2xl rounded-tl-sm"
                    }`}
                  >
                    {msg.content}
                  </div>
                </div>
              ))}

              {isLoading && (
                <div className="flex justify-start">
                  <div className="bg-[#131929] rounded-2xl rounded-tl-sm px-4 py-3 flex gap-1">
                    <span className="w-2 h-2 rounded-full bg-[#9CA3AF] animate-bounce [animation-delay:0ms]" />
                    <span className="w-2 h-2 rounded-full bg-[#9CA3AF] animate-bounce [animation-delay:150ms]" />
                    <span className="w-2 h-2 rounded-full bg-[#9CA3AF] animate-bounce [animation-delay:300ms]" />
                  </div>
                </div>
              )}

              <div ref={messagesEndRef} />
            </div>

            {/* Input */}
            <div className="border-t border-[rgba(255,255,255,0.08)] p-3 flex gap-2">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                disabled={isLoading}
                placeholder="Ask anything..."
                className="flex-1 bg-transparent text-[#F0F0F8] text-sm placeholder-[#6B7280] outline-none disabled:opacity-50"
              />
              <button
                onClick={() => sendMessage(input)}
                disabled={isLoading || !input.trim()}
                className="w-8 h-8 rounded-lg bg-[#7C3AED] text-white flex items-center justify-center hover:bg-[#6D28D9] disabled:opacity-50 transition-colors shrink-0"
              >
                <Send className="w-4 h-4" />
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
