"use client";

import { GitHubCalendar } from "react-github-calendar";
import { motion } from "framer-motion";

function GithubGraph() {
  const themeColors = {
    dark: ["#161b22", "#0e4429", "#006d32", "#26a641", "#39d353"],
  };

  return (
    <section className="relative z-20 py-14 md:py-16 px-6 md:px-8 bg-black text-white">
      <div className="max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.5 }}
          className="mb-12"
        >
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/30 text-blue-400 text-xs font-mono font-semibold uppercase tracking-widest mb-4">
            <span className="w-2 h-2 rounded-full bg-blue-500 animate-pulse" />
            Activity
          </div>
          <h3 className="text-4xl md:text-6xl font-black tracking-tighter uppercase italic text-white">
            Open Source <span className="text-blue-500">Contributions.</span>
          </h3>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.6 }}
          className="bg-neutral-900/60 backdrop-blur-sm p-6 sm:p-8 rounded-[30px] border border-neutral-800 flex justify-center items-center overflow-x-auto shadow-xl"
        >
          <div className="min-w-fit">
            <GitHubCalendar
              username="supunyasanthaofficial"
              blockSize={13}
              blockMargin={5}
              fontSize={14}
              theme={themeColors}
              colorScheme="dark"
            />
          </div>
        </motion.div>
      </div>
    </section>
  );
}
export default GithubGraph;
