"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import WishDisplay from "@/components/WishDisplay";
import FallingFlowers from "@/components/FallingFlowers";
import MusicPlayer from "@/components/MusicPlayer";
import dynamic from "next/dynamic";

const ConfettiEffect = dynamic(() => import("@/components/ConfettiEffect"), {
  ssr: false,
});

const STORAGE_KEY = "messageForBaoThu_8_3";

export default function ChucMungPage() {
  const [customMessage, setCustomMessage] = useState<string | null>(null);
  const [showPopup, setShowPopup] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem(STORAGE_KEY);
      setCustomMessage(saved);
    }
  }, []);

  if (!mounted) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-pink-100 via-rose-50 to-pink-100 flex items-center justify-center">
        <div className="animate-pulse text-pink-400">✨</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-pink-100 via-rose-50 to-pink-100 relative overflow-hidden">
      <ConfettiEffect />
      <FallingFlowers />

      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen px-4 py-12">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="text-center max-w-2xl"
        >
          <h1 className="text-3xl sm:text-4xl font-bold text-pink-700 mb-2">
            💐 Chúc mừng ngày Quốc tế Phụ nữ 8/3 💐
          </h1>
          <p className="text-lg text-pink-600 mb-8">
            Gửi đến Bảo Thư xinh đẹp nhất hệ mặt trời ✨
          </p>

          <WishDisplay customMessage={customMessage} />

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
            className="mt-8"
          >
            <button
              onClick={() => setShowPopup(true)}
              className="px-6 py-3 bg-pink-400 hover:bg-pink-500 text-white font-medium rounded-full shadow-lg hover:shadow-xl transition-all hover:scale-105"
            >
              Bấm vào đây nếu em cười rồi 😆
            </button>
          </motion.div>
        </motion.div>
      </div>

      <AnimatePresence>
        {showPopup && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/30 flex items-center justify-center z-50 p-4"
            onClick={() => setShowPopup(false)}
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-white rounded-2xl p-8 shadow-2xl max-w-sm text-center"
            >
              <p className="text-xl font-medium text-pink-600 mb-4">
                Anh biết màaa 😌💕
              </p>
              <button
                onClick={() => setShowPopup(false)}
                className="px-6 py-2 bg-pink-400 text-white rounded-full hover:bg-pink-500 transition-colors"
              >
                Đóng
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <MusicPlayer src="/assets/0308.WAV" />
    </div>
  );
}
