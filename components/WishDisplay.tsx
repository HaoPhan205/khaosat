"use client";

import { motion } from "framer-motion";

const DEFAULT_WISH = `Mong em luôn cười thật nhiều, luôn hạnh phúc và được yêu thương mỗi ngày 💖`;

interface WishDisplayProps {
  customMessage?: string | null;
}

export default function WishDisplay({ customMessage }: WishDisplayProps) {
  const displayText = customMessage?.trim() || DEFAULT_WISH;

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.3 }}
      className="bg-white/90 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-pink-200/60 max-w-lg mx-auto"
    >
      <p className="text-gray-800 text-base leading-relaxed whitespace-pre-wrap">
        {displayText}
      </p>
    </motion.div>
  );
}
