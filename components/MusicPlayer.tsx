"use client";

import { useState, useRef } from "react";
import { motion } from "framer-motion";

interface MusicPlayerProps {
  src?: string;
}

export default function MusicPlayer({ src }: MusicPlayerProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [muted, setMuted] = useState(true);
  const audioRef = useRef<HTMLAudioElement>(null);

  const togglePlay = () => {
    const audio = audioRef.current;
    if (!audio) return;

    if (isPlaying) {
      audio.pause();
    } else {
      audio.play();
    }
    setIsPlaying(!isPlaying);
  };

  const toggleMute = () => {
    const audio = audioRef.current;
    if (!audio) return;
    audio.muted = !muted;
    setMuted(!muted);
  };

  if (!src) return null;

  return (
    <div className="fixed bottom-4 right-4 z-20 flex items-center gap-2">
      <audio ref={audioRef} src={src} loop />
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={togglePlay}
        className="w-10 h-10 rounded-full bg-pink-400 text-white flex items-center justify-center shadow-lg"
      >
        {isPlaying ? "⏸" : "▶"}
      </motion.button>
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={toggleMute}
        className="w-10 h-10 rounded-full bg-pink-300 text-white flex items-center justify-center shadow-lg"
      >
        {muted ? "🔇" : "🔊"}
      </motion.button>
    </div>
  );
}
