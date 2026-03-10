import { motion } from "motion/react";

interface ChatMessageProps {
  role: "user" | "assistant";
  content: string;
}

export function ChatMessage({ role, content }: ChatMessageProps) {
  const isUser = role === "user";

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className={`flex ${isUser ? "justify-end" : "justify-start"} mb-4`}
    >
      <div
        className={`max-w-[80%] rounded-2xl px-6 py-4 ${
          isUser
            ? "bg-gradient-to-br from-cyan-500 to-blue-600 text-white shadow-lg shadow-cyan-500/30"
            : "bg-white/70 backdrop-blur-xl border border-slate-200 text-slate-800 shadow-md"
        }`}
      >
        <p className="leading-relaxed">{content}</p>
      </div>
    </motion.div>
  );
}