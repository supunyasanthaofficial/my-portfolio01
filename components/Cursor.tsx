"use client";

import { useEffect, useRef, useState, useSyncExternalStore } from "react";
import {
  motion,
  useMotionValue,
  useSpring,
  AnimatePresence,
} from "framer-motion";

const emptySubscribe = () => () => {};

interface TrailNode {
  x: number;
  y: number;
  id: number;
  color: string;
}

interface Ripple {
  x: number;
  y: number;
  id: number;
  color: string;
}

const TRAIL_COLORS = [
  "#38bdf8", // Sky Cyan
  "#3b82f6", // Electric Blue
  "#818cf8", // Indigo
  "#a855f7", // Vivid Purple
  "#ec4899", // Neon Pink
  "#f43f5e", // Rose Red
  "#fbbf24", // Amber Gold
];

export default function CustomCursor() {
  const isMounted = useSyncExternalStore(
    emptySubscribe,
    () => true,
    () => false,
  );
  const [isHovered, setIsHovered] = useState(false);
  const [hoverType, setHoverType] = useState<"link" | "card" | null>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [ripples, setRipples] = useState<Ripple[]>([]);
  const [trail, setTrail] = useState<TrailNode[]>([]);

  // Raw mouse coordinates
  const mouseX = useMotionValue(-100);
  const mouseY = useMotionValue(-100);

  // Velocity motion values (avoids React re-renders on every mouse move)
  const headRotate = useMotionValue(0);
  const headScaleX = useMotionValue(1);
  const headScaleY = useMotionValue(1);

  // Spring physics for main head
  const headX = useSpring(mouseX, { damping: 22, stiffness: 400, mass: 0.3 });
  const headY = useSpring(mouseY, { damping: 22, stiffness: 400, mass: 0.3 });

  // Spring physics for trailing orbital ring
  const ringX = useSpring(mouseX, { damping: 28, stiffness: 220, mass: 0.5 });
  const ringY = useSpring(mouseY, { damping: 28, stiffness: 220, mass: 0.5 });

  const lastPos = useRef({ x: -100, y: -100, time: 0 });
  const idCounterRef = useRef(0);
  const colorIndexRef = useRef(0);
  const trailRef = useRef<TrailNode[]>([]);
  const frameRef = useRef<number | null>(null);

  useEffect(() => {
    if (window.matchMedia("(pointer: coarse)").matches) return;

    const handleMouseMove = (e: MouseEvent) => {
      const { clientX: x, clientY: y } = e;
      const now = Date.now();
      const prevTime = lastPos.current.time || now;
      const dt = Math.max(now - prevTime, 1);
      const dx = x - lastPos.current.x;
      const dy = y - lastPos.current.y;

      const dist = Math.hypot(dx, dy);
      const speed = Math.min(dist / dt, 4);
      const angle = (Math.atan2(dy, dx) * 180) / Math.PI;

      // Update motion values directly without triggering component re-render
      headRotate.set(angle);
      headScaleX.set(Math.min(1 + speed * 0.4, 2.2));
      headScaleY.set(Math.max(1 - speed * 0.2, 0.55));

      lastPos.current = { x, y, time: now };
      mouseX.set(x);
      mouseY.set(y);
      setIsVisible(true);

      // Throttled trail update
      if (!frameRef.current) {
        frameRef.current = requestAnimationFrame(() => {
          colorIndexRef.current =
            (colorIndexRef.current + 1) % TRAIL_COLORS.length;
          const nextColor = TRAIL_COLORS[colorIndexRef.current];
          idCounterRef.current += 1;

          trailRef.current.unshift({
            x,
            y,
            id: idCounterRef.current,
            color: nextColor,
          });
          if (trailRef.current.length > 7) trailRef.current.pop();
          setTrail([...trailRef.current]);
          frameRef.current = null;
        });
      }
    };

    const handleMouseDown = (e: MouseEvent) => {
      const rippleColor =
        TRAIL_COLORS[Math.floor(Math.random() * TRAIL_COLORS.length)];
      const newRippleId = Date.now();
      setRipples((prev) => [
        ...prev.slice(-3),
        { x: e.clientX, y: e.clientY, id: newRippleId, color: rippleColor },
      ]);
    };

    const handleMouseLeave = () => setIsVisible(false);
    const handleMouseEnter = () => setIsVisible(true);

    const handleHoverCheck = (e: MouseEvent) => {
      const target = e.target as HTMLElement | null;
      if (!target) return;
      const interactive = target.closest(
        "a, button, input, textarea, [role='button'], .flip-card, .cursor-pointer",
      );
      if (interactive) {
        setIsHovered(true);
        setHoverType(
          interactive.classList.contains("flip-card") ? "card" : "link",
        );
      } else {
        setIsHovered(false);
        setHoverType(null);
      }
    };

    // Smoothly decay stretch values back to neutral
    const decayInterval = setInterval(() => {
      const currentScaleX = headScaleX.get();
      const currentScaleY = headScaleY.get();
      if (currentScaleX > 1.01) {
        headScaleX.set(currentScaleX + (1 - currentScaleX) * 0.15);
      }
      if (currentScaleY < 0.99) {
        headScaleY.set(currentScaleY + (1 - currentScaleY) * 0.15);
      }
    }, 16);

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    window.addEventListener("mousemove", handleHoverCheck, { passive: true });
    window.addEventListener("mousedown", handleMouseDown);
    document.addEventListener("mouseleave", handleMouseLeave);
    document.addEventListener("mouseenter", handleMouseEnter);

    return () => {
      clearInterval(decayInterval);
      if (frameRef.current) cancelAnimationFrame(frameRef.current);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mousemove", handleHoverCheck);
      window.removeEventListener("mousedown", handleMouseDown);
      document.removeEventListener("mouseleave", handleMouseLeave);
      document.removeEventListener("mouseenter", handleMouseEnter);
    };
  }, [mouseX, mouseY, headRotate, headScaleX, headScaleY, isVisible]);

  if (!isMounted || !isVisible) return null;

  return (
    <>
      <AnimatePresence>
        {ripples.map((ripple) => (
          <motion.div
            key={ripple.id}
            initial={{ scale: 0.2, opacity: 1 }}
            animate={{ scale: 3, opacity: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="fixed top-0 left-0 w-12 h-12 rounded-full border-2 pointer-events-none z-[9997] -translate-x-1/2 -translate-y-1/2"
            style={{
              left: ripple.x,
              top: ripple.y,
              borderColor: ripple.color,
              boxShadow: `0 0 20px ${ripple.color}`,
            }}
            onAnimationComplete={() =>
              setRipples((prev) => prev.filter((r) => r.id !== ripple.id))
            }
          />
        ))}
      </AnimatePresence>

      {trail.map((node, index) => {
        const factor = 1 - index / Math.max(trail.length, 1);
        const size = Math.max(3, factor * 9);
        return (
          <motion.div
            key={node.id}
            initial={{ scale: 1, opacity: 0.8 * factor }}
            animate={{ scale: 0, opacity: 0 }}
            transition={{ duration: 0.35, ease: "easeOut" }}
            className="fixed top-0 left-0 rounded-full pointer-events-none z-[9998] -translate-x-1/2 -translate-y-1/2"
            style={{
              left: node.x,
              top: node.y,
              width: size,
              height: size,
              backgroundColor: node.color,
              boxShadow: `0 0 10px ${node.color}, 0 0 20px ${node.color}`,
            }}
          />
        );
      })}

      <motion.div
        className="fixed top-0 left-0 rounded-full pointer-events-none z-[9999] hidden md:flex items-center justify-center p-[1.5px]"
        style={{
          x: ringX,
          y: ringY,
          translateX: "-50%",
          translateY: "-50%",
          background:
            "conic-gradient(from 0deg, #38bdf8, #818cf8, #ec4899, #fbbf24, #38bdf8)",
          boxShadow: isHovered
            ? "0 0 25px rgba(236,72,153,0.6), 0 0 40px rgba(56,189,248,0.4)"
            : "0 0 12px rgba(56,189,248,0.4)",
        }}
        animate={{
          width: isHovered ? (hoverType === "card" ? 72 : 54) : 38,
          height: isHovered ? (hoverType === "card" ? 72 : 54) : 38,
          rotate: [0, 360],
        }}
        transition={{
          rotate: { repeat: Infinity, duration: 4, ease: "linear" },
          width: { type: "spring", stiffness: 350, damping: 22 },
          height: { type: "spring", stiffness: 350, damping: 22 },
        }}
      >
        <div className="w-full h-full rounded-full bg-black/60 backdrop-blur-sm flex items-center justify-center relative">
          {!isHovered && (
            <motion.div
              className="absolute -top-1 left-1/2 -translate-x-1/2 w-2 h-2 rounded-full bg-cyan-300 shadow-[0_0_8px_#22d3ee]"
              animate={{ scale: [0.8, 1.4, 0.8] }}
              transition={{
                repeat: Infinity,
                duration: 1.2,
                ease: "easeInOut",
              }}
            />
          )}

          {isHovered && hoverType === "card" && (
            <span className="text-[8px] font-mono font-bold tracking-widest text-cyan-300 uppercase">
              FLIP
            </span>
          )}
        </div>
      </motion.div>

      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-[10000] hidden md:block"
        style={{
          x: headX,
          y: headY,
          translateX: "-50%",
          translateY: "-50%",
        }}
      >
        <motion.div
          className="rounded-full shadow-[0_0_15px_rgba(56,189,248,1),0_0_30px_rgba(236,72,153,0.8)]"
          style={{
            rotate: headRotate,
            scaleX: headScaleX,
            scaleY: headScaleY,
            background: isHovered
              ? "linear-gradient(135deg, #ec4899 0%, #38bdf8 100%)"
              : "linear-gradient(135deg, #38bdf8 0%, #a855f7 100%)",
          }}
          animate={{
            width: isHovered ? 14 : 9,
            height: isHovered ? 14 : 9,
          }}
          transition={{
            type: "spring",
            stiffness: 400,
            damping: 20,
          }}
        />
      </motion.div>
    </>
  );
}
