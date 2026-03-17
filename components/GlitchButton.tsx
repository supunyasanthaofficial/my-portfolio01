"use client";

import { useRef, useState } from "react";
import { motion } from "framer-motion";

export default function GlitchButton({
  text = "GET IN TOUCH",
}: {
  text?: string;
}) {
  const ref = useRef<HTMLButtonElement>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!ref.current) return;
    const { clientX, clientY } = e;
    const { width, height, left, top } = ref.current.getBoundingClientRect();

    const x = (clientX - (left + width / 2)) * 0.4;
    const y = (clientY - (top + height / 2)) * 0.4;
    setPosition({ x, y });
  };

  const reset = () => {
    setPosition({ x: 0, y: 0 });
    setIsHovered(false);
  };

  return (
    <div className="relative h-24 w-64 flex items-center justify-center">
      <motion.button
        ref={ref}
        onMouseMove={handleMouseMove}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={reset}
        animate={{ x: position.x, y: position.y }}
        transition={{ type: "spring", stiffness: 200, damping: 15, mass: 0.1 }}
        className={`
          relative px-8 py-4 bg-blue-600 text-white font-black italic tracking-widest uppercase
          transition-all duration-200 overflow-hidden
          ${isHovered ? "bg-red-600 scale-105" : "bg-blue-600"}
        `}
      >
        <span className={isHovered ? "glitch-text" : ""}>{text}</span>

        {isHovered && (
          <>
            <span className="absolute top-0 left-0 w-full h-full bg-blue-600 opacity-20 animate-pulse" />
            <span className="absolute -inset-1 border-2 border-cyan-400 opacity-50 animate-ping" />
          </>
        )}
      </motion.button>
    </div>
  );
}
