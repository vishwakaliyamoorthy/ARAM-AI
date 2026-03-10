import { useState, useRef, useEffect } from "react";
import { motion } from "motion/react";
import { Send, Trash2 } from "lucide-react";
import { ChatMessage } from "./components/ChatMessage";
import { LoadingAnimation } from "./components/LoadingAnimation";
import { JusticeLogo } from "./components/JusticeLogo";

interface Message {
  id: string;
  role: "user" | "assistant";
  content: string;
}

function App() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [hasStarted, setHasStarted] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const simulateAIResponse = async (userQuery: string): Promise<string> => {
    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 2000));

    // Mock legal responses based on keywords
    const lowerQuery = userQuery.toLowerCase();

    if (lowerQuery.includes("contract") || lowerQuery.includes("agreement")) {
      return "Based on Indian Contract Act, 1872, a valid contract requires: (1) Offer and Acceptance, (2) Lawful Consideration, (3) Competent Parties, (4) Free Consent, (5) Lawful Object, and (6) Not expressly declared void. For contract disputes, Section 73 provides for compensation for breach. Would you like me to elaborate on any specific aspect of contract law?";
    }

    if (lowerQuery.includes("property") || lowerQuery.includes("real estate")) {
      return "Under the Transfer of Property Act, 1882, and the Registration Act, 1908, property transfers in India require proper documentation and registration. Key points: (1) Sale deed must be registered, (2) Stamp duty varies by state, (3) Title verification is crucial. For property disputes, you may approach civil courts. What specific property matter can I help you with?";
    }

    if (lowerQuery.includes("divorce") || lowerQuery.includes("marriage")) {
      return "Divorce laws in India are governed by personal laws based on religion. Under Hindu Marriage Act, 1955, grounds for divorce include cruelty, desertion, adultery, and mutual consent. Muslim, Christian, and Special Marriage Act have different provisions. The process typically involves: (1) Filing petition, (2) Counseling, (3) Evidence, (4) Final decree. How can I assist you further with matrimonial matters?";
    }

    if (lowerQuery.includes("crime") || lowerQuery.includes("fir") || lowerQuery.includes("police")) {
      return "Under the Indian Penal Code (IPC), 1860, and Criminal Procedure Code (CrPC), 1973: (1) FIR can be filed at any police station for cognizable offenses, (2) You have the right to receive a copy of the FIR, (3) Zero FIR can be filed at any station for serious crimes. Legal rights during arrest include: right to know grounds of arrest, right to bail (for bailable offenses), and right to legal counsel. What specific criminal law matter do you need help with?";
    }

    if (lowerQuery.includes("consumer") || lowerQuery.includes("complaint")) {
      return "The Consumer Protection Act, 2019 protects consumer rights in India. You can file complaints for: (1) Defective goods, (2) Deficient services, (3) Unfair trade practices, (4) Misleading advertisements. Consumer forums have three tiers: District, State, and National. Claims up to ₹1 crore go to District Forum, up to ₹10 crore to State Commission, and above to National Commission. Filing is simple and doesn't require a lawyer. What consumer issue are you facing?";
    }

    if (lowerQuery.includes("labor") || lowerQuery.includes("employment") || lowerQuery.includes("termination")) {
      return "Employment in India is regulated by various labor laws including: (1) Industrial Disputes Act, 1947, (2) Payment of Wages Act, 1936, (3) Employees' Provident Funds Act, 1952. For wrongful termination, you can approach Labor Court. Key employee rights include: minimum wages, PF/ESI benefits, gratuity after 5 years, and notice period. What specific employment law query do you have?";
    }

    // Default response
    return "Thank you for your legal query. As an AI legal assistant, I can help you understand Indian laws including Constitutional Law, Criminal Law (IPC/CrPC), Civil Law, Family Law, Property Law, Consumer Protection, Labor Laws, and more. Please provide more details about your specific legal concern, and I'll provide relevant information based on Indian legal framework. Remember, this is for informational purposes only and not a substitute for professional legal advice.";
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      role: "user",
      content: input.trim(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsLoading(true);
    setHasStarted(true);

    const response = await simulateAIResponse(input);

    const assistantMessage: Message = {
      id: (Date.now() + 1).toString(),
      role: "assistant",
      content: response,
    };

    setMessages((prev) => [...prev, assistantMessage]);
    setIsLoading(false);
  };

  const handleClearChat = () => {
    setMessages([]);
    setHasStarted(false);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e);
    }
  };

  return (
    <div className="relative min-h-screen w-full overflow-hidden">
      {/* Animated Background with Water/Glacier Theme */}
      <div className="fixed inset-0 bg-gradient-to-br from-white via-cyan-50 to-blue-50">
        <motion.div
          className="absolute inset-0 opacity-20"
          animate={{
            backgroundPosition: ["0% 0%", "100% 100%"],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            repeatType: "reverse",
          }}
          style={{
            backgroundImage: `radial-gradient(circle at 20% 50%, rgba(6, 182, 212, 0.15) 0%, transparent 50%),
                             radial-gradient(circle at 80% 80%, rgba(59, 130, 246, 0.15) 0%, transparent 50%),
                             radial-gradient(circle at 40% 20%, rgba(34, 211, 238, 0.1) 0%, transparent 50%)`,
            backgroundSize: "200% 200%",
          }}
        />

        {/* Floating Particles */}
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 bg-cyan-400/30 rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -30, 0],
              opacity: [0.2, 0.5, 0.2],
            }}
            transition={{
              duration: 3 + Math.random() * 2,
              repeat: Infinity,
              delay: Math.random() * 2,
            }}
          />
        ))}
      </div>

      {/* Justice Logo */}
      <JusticeLogo />

      {/* Main Chat Container */}
      <div className="relative z-10 flex flex-col h-screen">
        {/* Header - Only visible when chat started */}
        {hasStarted && (
          <motion.header
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex-shrink-0 px-4 py-4 md:px-8 md:py-6"
          >
            <div className="max-w-5xl mx-auto flex items-center justify-between">
              <div className="ml-20 md:ml-24">
                <h2 className="text-xl md:text-2xl font-semibold text-slate-900">
                  ARAM AI
                </h2>
                <p className="text-sm text-slate-600">
                  Indian Law Information System
                </p>
              </div>
              <button
                onClick={handleClearChat}
                className="flex items-center gap-2 px-4 py-2 rounded-xl bg-white/80 backdrop-blur-md border border-slate-200 text-slate-700 hover:bg-white hover:shadow-md transition-all"
                aria-label="Clear chat history"
              >
                <Trash2 className="w-4 h-4" />
                <span className="hidden sm:inline">Clear</span>
              </button>
            </div>
          </motion.header>
        )}

        {/* Chat Messages Area */}
        <div
          className={`flex-1 overflow-y-auto px-4 py-6 md:px-8 ${
            hasStarted ? "" : "flex items-center justify-center"
          }`}
        >
          {hasStarted ? (
            <div className="max-w-5xl mx-auto">
              {messages.map((message) => (
                <ChatMessage
                  key={message.id}
                  role={message.role}
                  content={message.content}
                />
              ))}
              {isLoading && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="flex justify-start mb-4"
                >
                  <div className="max-w-[80%] rounded-2xl bg-white/70 backdrop-blur-xl border border-slate-200 shadow-md">
                    <LoadingAnimation />
                  </div>
                </motion.div>
              )}
              <div ref={messagesEndRef} />
            </div>
          ) : (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="text-center max-w-2xl mx-auto px-4"
            >
              <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="mb-12"
              >
                <h1 className="text-5xl md:text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-600 via-blue-600 to-cyan-600 mb-4">
                  ARAM AI
                </h1>
                <p className="text-xl text-slate-700 mb-2">
                  Indian Law Information System
                </p>
                <p className="text-sm text-slate-600">
                  Ask your legal questions with confidence
                </p>
              </motion.div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
                {[
                  {
                    title: "Contract Law",
                    query: "What are the essentials of a valid contract?",
                  },
                  {
                    title: "Property Rights",
                    query: "How do I register property in India?",
                  },
                  {
                    title: "Consumer Rights",
                    query: "How to file a consumer complaint?",
                  },
                  {
                    title: "Criminal Law",
                    query: "What are my rights during arrest?",
                  },
                ].map((item, idx) => (
                  <motion.button
                    key={idx}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.7 + idx * 0.1 }}
                    onClick={() => setInput(item.query)}
                    className="p-4 rounded-2xl bg-white/60 backdrop-blur-xl border border-slate-200 text-left hover:bg-white/80 hover:border-cyan-400 hover:shadow-lg transition-all group"
                  >
                    <h3 className="text-cyan-600 font-semibold mb-1 group-hover:text-cyan-700">
                      {item.title}
                    </h3>
                    <p className="text-sm text-slate-600 group-hover:text-slate-700">
                      {item.query}
                    </p>
                  </motion.button>
                ))}
              </div>
            </motion.div>
          )}
        </div>

        {/* Input Area */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: hasStarted ? 0 : 1 }}
          className="flex-shrink-0 px-4 pb-6 md:px-8 md:pb-8"
        >
          <form
            onSubmit={handleSubmit}
            className="max-w-5xl mx-auto relative"
          >
            <div
              className="rounded-3xl bg-white/70 backdrop-blur-xl border border-slate-200 overflow-hidden shadow-lg"
              style={{
                boxShadow: "0 8px 32px 0 rgba(6, 182, 212, 0.15)",
              }}
            >
              <textarea
                ref={inputRef}
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Ask your legal question... (Press Enter to send, Shift+Enter for new line)"
                className="w-full px-6 py-4 bg-transparent text-slate-800 placeholder-slate-400 resize-none outline-none min-h-[60px] max-h-[200px]"
                rows={1}
                style={{
                  height: "auto",
                  scrollbarWidth: "thin",
                  scrollbarColor: "rgba(6, 182, 212, 0.5) transparent",
                }}
              />
              <div className="flex items-center justify-between px-6 pb-4">
                <p className="text-xs text-slate-500">
                  For informational purposes only • Not legal advice
                </p>
                <button
                  type="submit"
                  disabled={!input.trim() || isLoading}
                  className="flex items-center gap-2 px-6 py-2.5 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-medium disabled:opacity-50 disabled:cursor-not-allowed hover:from-cyan-400 hover:to-blue-500 transition-all shadow-lg shadow-cyan-500/30"
                >
                  <Send className="w-4 h-4" />
                  <span className="hidden sm:inline">Send</span>
                </button>
              </div>
            </div>
          </form>
        </motion.div>
      </div>
    </div>
  );
}

export default App;