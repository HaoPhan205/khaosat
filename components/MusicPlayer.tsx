"use client";

import { useEffect, useRef } from "react";

interface MusicPlayerProps {
  src?: string;
}

export default function MusicPlayer({ src }: MusicPlayerProps) {
  const audioRef = useRef<HTMLAudioElement>(null);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio || !src) return;

    const play = async () => {
      try {
        await audio.play();
      } catch {
        // Nếu trình duyệt chặn autoplay thì chịu, không có cách bypass
      }
    };

    play();
  }, [src]);

  if (!src) return null;

  return <audio ref={audioRef} src={src} loop autoPlay />;
}
