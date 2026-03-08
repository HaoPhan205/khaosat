"use client";

import { motion } from "framer-motion";

const FLOWERS = ["🌸", "🌺", "💐", "🌷", "🌼", "✨", "💖"];

export default function FallingFlowers() {
  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
      {FLOWERS.map((flower, i) => (
        <motion.span
          key={i}
          className="absolute text-2xl opacity-40"
          style={{
            left: `${(i * 15 + 5) % 100}%`,
            top: -50,
          }}
          animate={{
            y: ["0vh", "110vh"],
            rotate: [0, 360],
          }}
          transition={{
            duration: 8 + (i % 4),
            repeat: Infinity,
            delay: i * 0.5,
          }}
        >
          {flower}
        </motion.span>
      ))}
    </div>
  );
}
