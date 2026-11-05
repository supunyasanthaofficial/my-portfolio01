"use client";

import { motion, useScroll, useSpring } from "framer-motion";
import { useRef } from "react";
import { DEV_STORY } from "@/data/story";

function DevStory() {
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
      id="dev-story"
      ref={containerRef}
      className="py-24 relative bg-zinc-950 text-white"
    >
      <div className="max-w-4xl mx-auto px-8">
        <div className="mb-16">
          <h2 className="text-sm font-mono uppercase tracking-[0.4em] text-blue-600 mb-4">
            My Journey
          </h2>
          <h3 className="text-4xl md:text-6xl font-bold tracking-tighter uppercase italic text-white">
            The Dev <span className="text-blue-600">Story.</span>
          </h3>
        </div>

        <div className="relative">
          <motion.div
            style={{ scaleY }}
            className="absolute left-0 md:left-1/2 top-0 bottom-0 w-[2px] bg-blue-600 origin-top transform md:-translate-x-1/2"
          />

          <div className="space-y-24">
            {DEV_STORY.map((item, index) => (
              <div
                key={item.year}
                className={`relative flex flex-col md:flex-row items-center ${index % 2 === 0 ? "md:flex-row-reverse" : ""}`}
              >
                <div className="absolute left-0 md:left-1/2 w-4 h-4 bg-blue-600 rounded-full transform -translate-x-1/2 z-10 border-4 border-zinc-950" />

                <motion.div
                  initial={{ opacity: 0, x: index % 2 === 0 ? 50 : -50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                  className="w-full md:w-[45%] ml-8 md:ml-0 p-6 bg-zinc-900/50 rounded-2xl border border-zinc-800"
                >
                  <span className="text-blue-600 font-mono font-bold text-lg">
                    {item.year}
                  </span>
                  <h4 className="text-xl font-bold mt-2 mb-3 text-white">
                    {item.title}
                  </h4>
                  <p className="text-zinc-400 leading-relaxed">
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

export default DevStory;
