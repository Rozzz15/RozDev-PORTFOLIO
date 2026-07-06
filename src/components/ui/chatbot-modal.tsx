import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Bot, MessageCircle, Send, X } from "lucide-react";

interface Message {
  id: string;
  role: "user" | "bot";
  text: string;
}

const quickReplies = [
  "Who is Rozel?",
  "What services do you offer?",
  "What projects have you worked on?",
  "How can I contact you?",
];

const knowledgeBase: { keywords: string[]; response: string }[] = [
  {
    keywords: ["who", "roz el", "rozel", "about", "background", "tell me about yourself"],
    response:
      "Rozel O. Ramos is a **Digital Systems Architect** who helps businesses streamline operations, automate workflows, and build scalable digital infrastructure. He specializes in connecting people, processes, and technology to create systems that support sustainable growth. His work spans CRM automation, workflow design, website development, and operational strategy.",
  },
  {
    keywords: ["do", "service", "offer", "solution", "provide", "help with"],
    response:
      "I offer four core solution areas:\n\n**1. Digital Presence Systems** — Business websites, landing pages, and conversion optimization.\n**2. Automation Systems** — CRM automation, workflow automation, lead routing, and API integrations.\n**3. Growth Systems** — Lead generation, customer journey design, content support, and social media operations.\n**4. Operations Support** — Virtual assistance, administrative systems, CRM management, and data organization.",
  },
  {
    keywords: ["project", "portfolio", "built", "work", "case study", "client"],
    response:
      "Here are some featured projects:\n\n• **181 Lounge Coffee Shop** — Complete restaurant and lounge website with menu showcases, gallery, and online presence.\n• **Eyir Clinic Website** — Complete clinic website with service showcases and online presence.\n• **Lead Generation Funnel** — Complete system with landing pages, form logic, and automated follow-ups.\n• **Operations Dashboard** — Centralized dashboard for tracking business metrics and team performance.",
  },
  {
    keywords: ["contact", "email", "phone", "reach", "message", "hire", "connect"],
    response:
      "You can reach Rozel through:\n\n📧 **Email:** rozelramos17@gmail.com\n📞 **Phone:** +63 916 621 9195\n📍 **Location:** Lopez, Quezon, Philippines\n\nYou can also book a discovery call via Calendly or send a message through the contact form on this site!",
  },
  {
    keywords: ["experience", "background", "work history", "career", "past", "previous"],
    response:
      "Rozel's professional journey:\n\n💼 **Freelance Web & Mobile Developer** (2025 – Present)\nSolving operational problems through digital tools, websites, automations, and structured customer workflows.\n\n💬 **Online Chat Support / Sales Chatter** (2025 – 2026)\nBuilt customer experience discipline through live conversations, sales support, and response systems.\n\n📋 **ID Processing Staff / Admission Assistant Officer** (2022 – 2023)\nDeveloped systems thinking through administrative operations, documentation, and process accuracy.",
  },
  {
    keywords: ["process", "how work", "approach", "methodology", "how it works", "step"],
    response:
      "Here's the process Rozel follows:\n\n**1. Discovery** — Understand goals, current workflows, tools, bottlenecks, and priorities.\n**2. Strategy** — Define the operating model, system architecture, and implementation roadmap.\n**3. Implementation** — Build the website, automations, CRM flows, integrations, and foundations.\n**4. Optimization** — Improve speed, reliability, conversion flow, usability, and handoff points.\n**5. Growth** — Use insights and system maturity to support scale, consistency, and improvement.",
  },
  {
    keywords: ["automation", "workflow", "crm", "integrate", "api", "system"],
    response:
      "Rozel specializes in automation across several areas:\n\n• **CRM Automation** — Pipeline management, lead routing, contact tracking, and follow-up sequences.\n• **Workflow Automation** — Task triggers, approval flows, notification logic, and process automation.\n• **Lead Management** — Capture, qualify, route, onboard, and follow up with automated sequences.\n• **Customer Onboarding** — Structured intake with task triggers, asset collection, and progress tracking.\n• **Email Automation** — Sequences, templates, triggers, and performance tracking.\n• **API Integrations** — Connecting tools, syncing data, and building unified operational systems.",
  },
  {
    keywords: ["help", "pain", "problem", "struggle", "challenge", "difficulty", "can you"],
    response:
      "Rozel helps businesses that face challenges like:\n\n• Manual processes consuming time that should be spent on growth.\n• Operational bottlenecks slowing fulfillment, communication, and delivery.\n• Customer journey gaps creating friction before and after conversion.\n• Growth challenges caused by disconnected tools, teams, and data.\n\nIf any of these sound familiar, he'd be happy to discuss how digital systems can help!",
  },
  {
    keywords: ["price", "cost", "rate", "pricing", "budget", "fee", "expensive", "cheap"],
    response:
      "Rozel approaches each engagement based on the specific business challenge. Pricing depends on scope, complexity, and timeline. The best way to get a clear picture is to hop on a discovery call to discuss your needs. You can book one through the Calendly link on this site!",
  },
  {
    keywords: ["skill", "technology", "tech", "stack", "tool", "platform", "software"],
    response:
      "Rozel works with a wide range of tools and technologies including CRM platforms, workflow automation tools, API integration platforms, web development frameworks, and business software. He selects the right stack based on the specific business problem rather than forcing a one-size-fits-all solution.",
  },
  {
    keywords: ["testimonial", "review", "feedback", "client say", "result", "outcome"],
    response:
      "Here's what clients have said:\n\n> \"Rozel helped us replace repetitive manual updates with a cleaner workflow. Our team now knows exactly where each lead stands.\"\n> — Operations Lead, Consulting Business\n\n> \"The biggest difference was efficiency. We saved hours every week and created a smoother customer onboarding experience.\"\n> — Founder, Service Brand\n\n> \"He approached our website and CRM as one business system, not separate tasks. That changed how we manage growth.\"\n> — Managing Partner, Boutique Agency",
  },
  {
    keywords: ["welcome", "hello", "hi", "hey", "good morning", "good afternoon", "good evening"],
    response:
      "👋 Welcome! I'm Rozel's AI assistant. Feel free to ask me anything about his work, skills, projects, or how he can help your business. Here are some things you can ask:\n\n• Who is Rozel?\n• What services do you offer?\n• What projects have you worked on?\n• How can I contact Rozel?",
  },
];

function findResponse(input: string): string {
  const lower = input.toLowerCase().trim();

  // Prioritize direct keyword matches
  for (const entry of knowledgeBase) {
    const match = entry.keywords.some((keyword) => lower.includes(keyword));
    if (match) return entry.response;
  }

  // Fallback — check for common question words that don't match anything
  if (lower.includes("what") || lower.includes("how") || lower.includes("why") || lower.includes("when") || lower.includes("where")) {
    return "That's a great question! I don't have a specific answer for it yet, but I can tell you about Rozel's services, projects, experience, or how to get in touch. What would you like to know?";
  }

  return "Thanks for your message! I'm not sure I understand fully, but here are some things I can help with:\n\n• Who is Rozel?\n• What services does he offer?\n• What projects has he worked on?\n• How can you contact him?\n\nFeel free to ask any of these!";
}

function generateId() {
  return `msg-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`;
}

// Typing dots animation component
function TypingIndicator() {
  return (
    <div className="flex items-start gap-3 px-4">
      <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-[#A78873]/40 bg-[#211c18]">
        <Bot className="h-4 w-4 text-[#A78873]" />
      </div>
      <div className="flex items-center gap-1 rounded-2xl rounded-tl-none bg-[#211c18] px-4 py-3">
        <motion.span
          className="inline-block h-2 w-2 rounded-full bg-[#A78873]/60"
          animate={{ opacity: [0.3, 1, 0.3] }}
          transition={{ duration: 1.2, repeat: Infinity, delay: 0 }}
        />
        <motion.span
          className="inline-block h-2 w-2 rounded-full bg-[#A78873]/60"
          animate={{ opacity: [0.3, 1, 0.3] }}
          transition={{ duration: 1.2, repeat: Infinity, delay: 0.2 }}
        />
        <motion.span
          className="inline-block h-2 w-2 rounded-full bg-[#A78873]/60"
          animate={{ opacity: [0.3, 1, 0.3] }}
          transition={{ duration: 1.2, repeat: Infinity, delay: 0.4 }}
        />
      </div>
    </div>
  );
}

function ChatMessage({ message }: { message: Message }) {
  const isBot = message.role === "bot";

  return (
    <motion.div
      initial={{ opacity: 0, y: 12, scale: 0.97 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.3, ease: "easeOut" }}
      className={`flex items-start gap-3 px-4 ${isBot ? "" : "flex-row-reverse"}`}
    >
      {isBot ? (
        <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-[#A78873]/40 bg-[#211c18]">
          <Bot className="h-4 w-4 text-[#A78873]" />
        </div>
      ) : (
        <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#A78873] text-[#171614]">
          <span className="text-xs font-bold">U</span>
        </div>
      )}
      <div
        className={`max-w-[85%] rounded-2xl px-4 py-3 text-sm leading-relaxed ${
          isBot
            ? "rounded-tl-none bg-[#211c18] text-[rgba(245,242,238,0.88)]"
            : "rounded-tr-none bg-[#A78873] text-[#171614]"
        }`}
      >
        {isBot ? (
          <span
            dangerouslySetInnerHTML={{
              __html: message.text
                .replace(/\n/g, "<br />")
                .replace(/\*\*(.+?)\*\*/g, "<strong class='text-[#F5F2EE]'>$1</strong>"),
            }}
          />
        ) : (
          message.text
        )}
      </div>
    </motion.div>
  );
}

export function ChatbotModal() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "welcome",
      role: "bot",
      text: "👋 Welcome! I'm Rozel's AI assistant. Ask me anything about his work, skills, or experience — or tap a quick question below!",
    },
  ]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Auto-scroll to bottom
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isTyping]);

  // Focus input when modal opens
  useEffect(() => {
    if (open) {
      setTimeout(() => inputRef.current?.focus(), 400);
    }
  }, [open]);

  const handleSend = (text: string) => {
    const trimmed = text.trim();
    if (!trimmed || isTyping) return;

    const userMsg: Message = { id: generateId(), role: "user", text: trimmed };
    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setIsTyping(true);

    // Simulate bot thinking delay
    const delay = Math.min(Math.max(trimmed.length * 15, 600), 1800);
    setTimeout(() => {
      const response = findResponse(trimmed);
      const botMsg: Message = { id: generateId(), role: "bot", text: response };
      setMessages((prev) => [...prev, botMsg]);
      setIsTyping(false);
    }, delay);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend(input);
    }
  };

  return (
    <>
      {/* Floating trigger button */}
      <motion.button
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        whileHover={{ scale: 1.08 }}
        whileTap={{ scale: 0.94 }}
        onClick={() => setOpen(true)}
        aria-label="Open AI assistant chat"
        className="fixed bottom-6 left-6 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-[#A78873] text-[#171614] shadow-xl shadow-black/30 transition-colors hover:bg-[#F5F2EE] md:bottom-8 md:left-8"
      >
        <MessageCircle className="h-6 w-6" />
        {/* Notification badge */}
        <span className="absolute -right-1 -top-1 flex h-4 w-4">
          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-red-400 opacity-75"></span>
          <span className="relative inline-flex h-4 w-4 rounded-full bg-red-500"></span>
        </span>
        {/* Message tooltip */}
        <motion.span
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 1.5, duration: 0.5 }}
          className="absolute left-full ml-3 hidden whitespace-nowrap rounded-lg bg-[#F5F2EE] px-3 py-2 text-xs font-medium text-[#171614] shadow-lg md:block"
        >
          Hi there! How can I help?
          <span className="absolute right-full top-1/2 -translate-y-1/2 border-4 border-transparent border-r-[#F5F2EE]"></span>
        </motion.span>
      </motion.button>

      {/* Chat modal */}
      <AnimatePresence>
        {open && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm md:hidden"
              onClick={() => setOpen(false)}
            />

            {/* Modal panel */}
            <motion.div
              initial={{ opacity: 0, y: 30, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 20, scale: 0.96 }}
              transition={{ duration: 0.3, ease: "easeOut" }}
              className="fixed bottom-0 left-0 right-0 z-50 mx-auto flex h-[85vh] w-full flex-col border-t border-[rgba(245,242,238,0.1)] bg-[#171614] shadow-2xl shadow-black/40 md:bottom-24 md:left-8 md:right-auto md:h-[600px] md:max-h-[80vh] md:w-[420px] md:rounded-2xl md:border"
            >
              {/* Header */}
              <div className="flex items-center justify-between border-b border-[rgba(245,242,238,0.08)] px-5 py-4">
                <div className="flex items-center gap-3">
                  <div className="flex h-9 w-9 items-center justify-center rounded-full border border-[#A78873]/40 bg-[#211c18]">
                    <Bot className="h-5 w-5 text-[#A78873]" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-[#F5F2EE]">AI Assistant</p>
                    <p className="text-xs text-[rgba(245,242,238,0.45)]">Ask about Rozel's work</p>
                  </div>
                </div>
                <button
                  onClick={() => setOpen(false)}
                  aria-label="Close chat"
                  className="flex h-8 w-8 items-center justify-center rounded-full border border-[rgba(245,242,238,0.1)] text-[rgba(245,242,238,0.5)] transition hover:border-[#A78873] hover:text-[#A78873]"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>

              {/* Messages */}
              <div className="flex-1 overflow-y-auto py-5 scrollbar-hide">
                <div className="flex flex-col gap-4">
                  {messages.map((msg) => (
                    <ChatMessage key={msg.id} message={msg} />
                  ))}
                  {isTyping && <TypingIndicator />}
                  <div ref={messagesEndRef} />
                </div>
              </div>

              {/* Quick replies (shown only when there's no typing and few messages) */}
              {messages.length <= 2 && !isTyping && (
                <div className="flex shrink-0 gap-2 overflow-x-auto px-4 pb-3 scrollbar-hide">
                  {quickReplies.map((reply) => (
                    <button
                      key={reply}
                      onClick={() => handleSend(reply)}
                      className="shrink-0 whitespace-nowrap rounded-full border border-[rgba(245,242,238,0.12)] px-3 py-1.5 text-xs text-[rgba(245,242,238,0.6)] transition hover:border-[#A78873]/50 hover:bg-[#A78873]/10 hover:text-[#A78873]"
                    >
                      {reply}
                    </button>
                  ))}
                </div>
              )}

              {/* Input area */}
              <div className="shrink-0 border-t border-[rgba(245,242,238,0.08)] p-4">
                <div className="flex items-center gap-2 rounded-xl border border-[rgba(245,242,238,0.12)] bg-[#211c18] px-4 py-2 transition focus-within:border-[#A78873]/50">
                  <input
                    ref={inputRef}
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyDown={handleKeyDown}
                    placeholder="Ask me anything..."
                    className="flex-1 bg-transparent text-sm text-[#F5F2EE] outline-none placeholder:text-[rgba(245,242,238,0.35)]"
                    disabled={isTyping}
                  />
                  <button
                    onClick={() => handleSend(input)}
                    disabled={!input.trim() || isTyping}
                    aria-label="Send message"
                    className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-[#A78873] text-[#171614] transition hover:bg-[#F5F2EE] disabled:cursor-not-allowed disabled:opacity-40"
                  >
                    <Send className="h-4 w-4" />
                  </button>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
