"use client";

import { useEffect, useState } from "react";
import { motion, useSpring } from "framer-motion";

export default function CustomCursor() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  const springConfig = { damping: 25, stiffness: 200 };
  const cursorX = useSpring(0, springConfig);
  const cursorY = useSpring(0, springConfig);

  useEffect(() => {
    const mouseMove = (e: MouseEvent) => {
      cursorX.set(e.clientX - 16);
      cursorY.set(e.clientY - 16);
    };

    window.addEventListener("mousemove", mouseMove);
    return () => window.removeEventListener("mousemove", mouseMove);
  }, [cursorX, cursorY]);

  return (
    <motion.div
      className="fixed top-0 left-0 w-8 h-8 bg-white rounded-full mix-blend-difference pointer-events-none z-[9999] hidden md:block"
      style={{
        x: cursorX,
        y: cursorY,
      }}
    >
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="w-1 h-1 bg-black rounded-full" />
      </div>
    </motion.div>
  );
}
