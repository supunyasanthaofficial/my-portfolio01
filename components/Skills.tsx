"use client";
import { motion } from "framer-motion";
// Skilss
const skills = [
  { name: "React Native", category: "Mobile", level: "60%" },
  { name: "Flutter", category: "Mobile", level: "65%" },
  { name: "Next.js / React", category: "Web", level: "75%" },
  { name: "TypeScript", category: "Language", level: "68%" },
  { name: "DaVinci Resolve", category: "Video", level: "62%" },
  { name: "Firebase / Supabase", category: "Database", level: "65%" },
  { name: "Tailwind CSS", category: "Design", level: "95%" },
];

function Skills() {
  return (
    <section id="skills" className="relative z-20 py-32 bg-black text-white px-8">
      <div className="max-w-7xl mx-auto">
        <div className="mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/30 text-blue-400 text-xs font-mono font-semibold uppercase tracking-widest mb-4">
            <span className="w-2 h-2 rounded-full bg-blue-500 animate-pulse" />
            Skills & Stack
          </div>
          <h2 className="text-4xl md:text-6xl lg:text-7xl font-black tracking-tighter uppercase italic text-white">
            My Tech <span className="text-blue-500">Skills.</span>
          </h2>
          <p className="text-neutral-400 text-sm md:text-base font-mono uppercase tracking-wider mt-4">
            Technologies and tools I specialize in
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {skills.map((skill, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ y: -5 }}
              className="p-7 border border-neutral-800 bg-neutral-900/60 backdrop-blur-sm rounded-3xl hover:border-blue-500/50 hover:bg-neutral-900/90 transition-all duration-300 group shadow-lg"
            >
              <span className="text-xs font-mono uppercase tracking-widest text-blue-400 font-semibold block mb-2 group-hover:text-blue-300 transition-colors">
                {skill.category}
              </span>
              <h4 className="text-2xl font-bold mb-6 text-white tracking-tight">
                {skill.name}
              </h4>

              <div className="h-1.5 w-full bg-neutral-800 rounded-full relative overflow-hidden mb-3">
                <motion.div
                  initial={{ width: 0 }}
                  whileInView={{ width: skill.level }}
                  viewport={{ once: true }}
                  transition={{ duration: 1, delay: 0.3 }}
                  className="absolute h-full bg-blue-500 rounded-full left-0 shadow-[0_0_8px_rgba(59,130,246,0.6)]"
                />
              </div>

              <div className="flex justify-between items-center text-xs font-mono">
                <span className="text-neutral-400">Proficiency</span>
                <span className="text-blue-400 font-bold">{skill.level}</span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
export default Skills;
