import { motion } from "motion/react";
import justiceStatue from "figma:asset/22b927119cd5cf68b7cbcf13279d17cbacbd872b.png";

export function JusticeLogo() {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.6 }}
      className="fixed top-4 left-4 z-50"
    >
      <motion.div
        className="relative"
        whileHover={{ scale: 1.05 }}
        transition={{ duration: 0.3 }}
      >
        <div
          className="relative w-16 h-16 md:w-20 md:h-20 rounded-full overflow-hidden border-3 border-cyan-300/50 backdrop-blur-xl"
          style={{
            boxShadow: "0 0 40px rgba(6, 182, 212, 0.5), 0 0 80px rgba(59, 130, 246, 0.3)",
          }}
        >
          <img
            src={justiceStatue}
            alt="Indian Justice Statue"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-cyan-500/30 to-transparent" />
        </div>
      </motion.div>
    </motion.div>
  );
}