"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function AdaptiveGreeting() {
  const [timeData, setTimeData] = useState({
    greeting: "Hello",
    subtext: "Welcome to my portfolio",
    themeClass: "from-blue-500 to-purple-500",
  });

  useEffect(() => {
    const updateTimeBasedUI = () => {
      const hour = new Date().getHours();

      if (hour >= 5 && hour < 12) {
        setTimeData({
          greeting: "Good Morning, Panda!",
          subtext: "Starting the day with some fresh code.",
          themeClass: "from-orange-400 to-blue-400",
        });
      } else if (hour >= 12 && hour < 17) {
        setTimeData({
          greeting: "Good Afternoon!",
          subtext: "Building amazing things in the daylight.",
          themeClass: "from-blue-400 to-cyan-400",
        });
      } else if (hour >= 17 && hour < 21) {
        setTimeData({
          greeting: "Good Evening!",
          subtext: "Winding down with some creative edits.",
          themeClass: "from-indigo-500 to-purple-600",
        });
      } else {
        setTimeData({
          greeting: "Working Late, Panda?",
          subtext: "The best code often happens at night.",
          themeClass: "from-gray-900 to-slate-800",
        });
      }
    };

    updateTimeBasedUI();
  }, []);

  return (
    <div className="py-10">
      <AnimatePresence mode="wait">
        <motion.div
          key={timeData.greeting}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-5xl md:text-7xl font-bold tracking-tighter italic uppercase">
            {timeData.greeting.split(" ").map((word, i) => (
              <span
                key={i}
                className={
                  i === 1
                    ? `bg-linear-to-r ${timeData.themeClass} bg-clip-text text-transparent`
                    : "dark:text-white text-black"
                }
              >
                {word}{" "}
              </span>
            ))}
          </h1>
          <p className="mt-4 text-zinc-500 font-mono uppercase tracking-widest text-sm">
            {timeData.subtext}
          </p>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
