"use client";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface LoadingScreenProps {
  onComplete?: () => void;
}

export default function LoadingScreen({ onComplete }: LoadingScreenProps) {
  const [progress, setProgress] = useState(0);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    // Prevent scrolling while preloader is active
    document.body.style.overflow = "hidden";

    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(() => {
            setIsLoaded(true);
            document.body.style.overflow = "unset";
            if (onComplete) onComplete();
          }, 400);
          return 100;
        }
        // Random increment for organic loading feel
        const diff = Math.floor(Math.random() * 12) + 4;
        return Math.min(prev + diff, 100);
      });
    }, 60);

    return () => {
      clearInterval(interval);
      document.body.style.overflow = "unset";
    };
  }, [onComplete]);

  return (
    <AnimatePresence>
      {!isLoaded && (
        <motion.div
          initial={{ y: 0 }}
          exit={{
            y: "-100%",
            transition: { duration: 0.8, ease: [0.76, 0, 0.24, 1] },
          }}
          className="fixed inset-0 z-[999] flex flex-col justify-between bg-black text-white p-8 md:p-14 select-none pointer-events-auto"
        >
    
          <div className="flex justify-between items-center text-xs md:text-sm font-mono tracking-widest text-neutral-400 uppercase">
            <span className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-blue-500 animate-ping" />
              Supun Yasantha
            </span>
            <span>Portfolio • 2026</span>
          </div>

          
          <div className="flex flex-col items-center justify-center text-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
              className="space-y-4"
            >
              <h1 className="text-4xl md:text-7xl font-black italic tracking-tighter uppercase">
                SY<span className="text-blue-500">.</span>
              </h1>
              <p className="text-xs md:text-sm uppercase tracking-[0.5em] text-neutral-400 font-mono">
                Full-Stack Developer & Editor
              </p>
            </motion.div>
          </div>

         
          <div className="w-full max-w-4xl mx-auto space-y-3">
            <div className="flex justify-between items-end font-mono">
              <span className="text-xs md:text-sm text-neutral-500 uppercase tracking-wider">
                Loading Experience
              </span>
              <span className="text-2xl md:text-4xl font-bold tracking-tight text-blue-500">
                {progress}%
              </span>
            </div>

           
            <div className="w-full h-1 md:h-1.5 bg-neutral-900 rounded-full overflow-hidden">
              <motion.div
                className="h-full bg-gradient-to-r from-blue-600 to-indigo-500 rounded-full"
                style={{ width: `${progress}%` }}
                transition={{ ease: "easeOut" }}
              />
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
