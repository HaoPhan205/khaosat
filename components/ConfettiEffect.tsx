"use client";

import { useEffect } from "react";

export default function ConfettiEffect() {
  useEffect(() => {
    import("canvas-confetti").then(({ default: confetti }) => {
      const duration = 2 * 1000;
      const end = Date.now() + duration;

      const frame = () => {
        confetti({
          particleCount: 3,
          angle: 60,
          spread: 55,
          origin: { x: 0 },
          colors: ["#ff6b9d", "#ffa8c5", "#ffc3a0", "#ffafbd", "#f8b4d9"],
        });
        confetti({
          particleCount: 3,
          angle: 120,
          spread: 55,
          origin: { x: 1 },
          colors: ["#ff6b9d", "#ffa8c5", "#ffc3a0", "#ffafbd", "#f8b4d9"],
        });

        if (Date.now() < end) {
          requestAnimationFrame(frame);
        }
      };

      frame();
    });
  }, []);

  return null;
}
