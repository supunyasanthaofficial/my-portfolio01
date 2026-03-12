"use client";

import {GitHubCalendar} from "react-github-calendar";
import { useTheme } from "next-themes";
import { motion } from "framer-motion";

export default function GithubGraph() {
  const { resolvedTheme } = useTheme();

  const themeColors = {
    light: ["#ebedf0", "#9be9a8", "#40c463", "#30a14e", "#216e39"],
    dark: ["#161b22", "#0e4429", "#006d32", "#26a641", "#39d353"],
  };

  return (
    <section className="py-24 px-8 bg-white dark:bg-zinc-950 transition-colors duration-500">
      <div className="max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-12"
        >
          <h2 className="text-sm font-mono uppercase tracking-[0.4em] text-blue-600 mb-4">
            Activity
          </h2>
          <h3 className="text-4xl md:text-6xl font-bold tracking-tighter uppercase italic dark:text-white text-black">
            Open Source <span className="text-blue-600">Contributions.</span>
          </h3>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          className="bg-zinc-50 dark:bg-zinc-900/50 p-8 rounded-[30px] border border-zinc-200 dark:border-zinc-800 flex justify-center items-center overflow-hidden"
        >
          <GitHubCalendar
            username="supunyasanthaofficial"
            year={2026}
            blockSize={12}
            blockMargin={5}
            fontSize={14}
            theme={themeColors}
            colorScheme={resolvedTheme === "dark" ? "dark" : "light"}
          />
        </motion.div>
      </div>
    </section>
  );
}
