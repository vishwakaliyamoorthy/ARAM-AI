import { motion } from "motion/react";

export function LoadingAnimation() {
  return (
    <div className="flex items-center space-x-2 px-6 py-4">
      <motion.div
        className="w-3 h-3 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-full"
        animate={{
          scale: [1, 1.2, 1],
          opacity: [1, 0.5, 1],
        }}
        transition={{
          duration: 1.5,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
      <motion.div
        className="w-3 h-3 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-full"
        animate={{
          scale: [1, 1.2, 1],
          opacity: [1, 0.5, 1],
        }}
        transition={{
          duration: 1.5,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 0.2,
        }}
      />
      <motion.div
        className="w-3 h-3 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-full"
        animate={{
          scale: [1, 1.2, 1],
          opacity: [1, 0.5, 1],
        }}
        transition={{
          duration: 1.5,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 0.4,
        }}
      />
      <span className="ml-2 text-cyan-600 text-sm">Analyzing your query...</span>
    </div>
  );
}