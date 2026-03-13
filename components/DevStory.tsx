"use client";

import { motion, useScroll, useSpring } from "framer-motion";
import { useRef } from "react";

const storyData = [
  {
    year: "2023",
    title: "The Beginning",
    description:
      "Started my journey into the world of programming with C , C# and basic web development.",
  },
  {
    year: "2024",
    title: "Diving into React",
    description:
      "Learned React and Next.js. Built several projects like 'Polygon_Area_Calculator' and computer vision apps.",
  },
  {
    year: "2025",
    title: "Professional Milestones",
    description:
      "Started working on complex Admin Panels (Supabase).",
  },
  {
    year: "2026",
    title: "Content Creation & Beyond",
    description:
      "Launched my gaming YouTube channel and focused on high-end video editing and AI solutions.",
  },
];

export default function DevStory() {
  const containerRef = useRef(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end end"],
  });

  const scaleY = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  return (
    <section
      ref={containerRef}
      className="py-24 relative bg-white dark:bg-zinc-950"
    >
      <div className="max-w-4xl mx-auto px-8">
        <div className="mb-16">
          <h2 className="text-sm font-mono uppercase tracking-[0.4em] text-blue-600 mb-4">
            My Journey
          </h2>
          <h3 className="text-4xl md:text-6xl font-bold tracking-tighter uppercase italic dark:text-white text-black">
            The Dev <span className="text-blue-600">Story.</span>
          </h3>
        </div>

        <div className="relative">
          <motion.div
            style={{ scaleY }}
            className="absolute left-0 md:left-1/2 top-0 bottom-0 w-[2px] bg-blue-600 origin-top transform md:-translate-x-1/2"
          />

          <div className="space-y-24">
            {storyData.map((item, index) => (
              <div
                key={index}
                className={`relative flex flex-col md:flex-row items-center ${index % 2 === 0 ? "md:flex-row-reverse" : ""}`}
              >
                <div className="absolute left-0 md:left-1/2 w-4 h-4 bg-blue-600 rounded-full transform -translate-x-1/2 z-10 border-4 border-white dark:border-zinc-950" />

                <motion.div
                  initial={{ opacity: 0, x: index % 2 === 0 ? 50 : -50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                  className="w-full md:w-[45%] ml-8 md:ml-0 p-6 bg-zinc-50 dark:bg-zinc-900/50 rounded-2xl border border-zinc-200 dark:border-zinc-800"
                >
                  <span className="text-blue-600 font-mono font-bold text-lg">
                    {item.year}
                  </span>
                  <h4 className="text-xl font-bold mt-2 mb-3 dark:text-white">
                    {item.title}
                  </h4>
                  <p className="text-zinc-600 dark:text-zinc-400 leading-relaxed">
                    {item.description}
                  </p>
                </motion.div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
