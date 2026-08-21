"use client";

import { motion, useScroll, useSpring, useTransform } from "framer-motion";
import { useEffect, useState } from "react";

function FilmIndicator() {
  const { scrollYProgress } = useScroll();
  const [percent, setPercent] = useState(0);

  const scaleY = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  useEffect(() => {
    return scrollYProgress.onChange((v) => setPercent(Math.round(v * 100)));
  }, [scrollYProgress]);

  const holes = Array.from({ length: 15 });

  return (
    <div className="fixed right-6 top-1/2 -translate-y-1/2 z-50 flex flex-col items-center group">
      <div className="mb-2 flex flex-col items-end self-end mr-1">
        <span className="text-[8px] font-bold text-blue-500/60 uppercase tracking-[0.2em] leading-none">
          Status
        </span>
        <span className="text-xs font-black text-blue-500 font-mono italic">
          SYNC_{percent}%
        </span>
      </div>

      <div className="relative w-10 h-[50vh] bg-black/80 backdrop-blur-md border-x border-blue-900/30 flex flex-col justify-between py-1 overflow-hidden group-hover:border-blue-500/50 transition-colors duration-500">
        <div className="absolute inset-0 pointer-events-none bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] bg-[length:100%_2px,3px_100%] opacity-20" />

        <motion.div
          className="absolute left-0 w-full z-20 flex items-center justify-center"
          style={{
            height: "50px",
            top: useTransform(scrollYProgress, [0, 1], ["0%", "90%"]),
          }}
        >
          <div className="w-full h-full border-y border-blue-400 bg-blue-500/10 relative">
            <div className="absolute top-0 left-0 w-1 h-1 border-t border-l border-blue-400" />
            <div className="absolute top-0 right-0 w-1 h-1 border-t border-r border-blue-400" />
            <div className="absolute bottom-0 left-0 w-1 h-1 border-b border-l border-blue-400" />
            <div className="absolute bottom-0 right-0 w-1 h-1 border-b border-r border-blue-400" />

            <div className="absolute top-1/2 left-0 w-full h-1px bg-blue-400/50 shadow-[0_0_8px_rgba(96,165,250,0.8)]" />
          </div>
        </motion.div>

        <div className="absolute left-1.5 top-0 bottom-0 flex flex-col justify-around py-2 z-10">
          {holes.map((_, i) => (
            <div
              key={i}
              className="w-1.5 h-3 bg-zinc-800 rounded-sm border border-blue-900/20 shadow-inner"
            />
          ))}
        </div>

        <div className="absolute right-1.5 top-0 bottom-0 flex flex-col justify-around py-2 z-10">
          {holes.map((_, i) => (
            <div
              key={i}
              className="w-1.5 h-3 bg-zinc-800 rounded-sm border border-blue-900/20 shadow-inner"
            />
          ))}
        </div>

        <div className="w-[2px] h-full bg-zinc-900 mx-auto relative">
          <motion.div
            className="absolute top-0 left-0 w-full bg-blue-500 shadow-[0_0_15px_rgba(59,130,246,0.5)]"
            style={{ scaleY, originY: 0, height: "100%" }}
          />
        </div>
      </div>

      <div className="absolute -left-4 top-1/2 -translate-y-1/2 [writing-mode:vertical-lr] flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
        <span className="text-[7px] font-mono text-blue-500/40 tracking-[0.5em] uppercase">
          System_Active
        </span>
        <div className="h-8 w-1px bg-blue-500/20" />
      </div>
    </div>
  );
}
export default FilmIndicator;
