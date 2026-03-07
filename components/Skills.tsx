'use client';
import { motion } from 'framer-motion';

const skills = [
  { name: "React Native", category: "Mobile", level: "90%" },
  { name: "Flutter", category: "Mobile", level: "85%" },
  { name: "Next.js / React", category: "Web", level: "95%" },
  { name: "Node.js", category: "Backend", level: "80%" },
  { name: "TypeScript", category: "Language", level: "88%" },
  { name: "DaVinci Resolve", category: "Video", level: "92%" },
  { name: "Firebase / Supabase", category: "Database", level: "85%" },
  { name: "Tailwind CSS", category: "Design", level: "95%" },
];

export default function Skills() {
  return (
    <section className="py-32 bg-white text-black px-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-20 gap-8">
          <div>
            <h2 className="text-sm font-mono uppercase tracking-[0.4em] text-blue-600 mb-4">Expertise</h2>
            <h3 className="text-5xl md:text-7xl font-bold tracking-tighter uppercase italic leading-none">
              My <span className="text-blue-600">Tech</span> Stack
            </h3>
          </div>
          {/* <p className="max-w-md text-gray-500 font-medium leading-relaxed">
            I specialize in building high-performance applications and cinematic visual content using industry-leading tools.
          </p> */}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {skills.map((skill, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ y: -5 }}
              className="p-8 border border-gray-100 rounded-3xl hover:border-blue-200 hover:bg-blue-50/30 transition-all group"
            >
              <span className="text-[10px] font-mono uppercase tracking-widest text-gray-400 block mb-4 group-hover:text-blue-500">
                {skill.category}
              </span>
              <h4 className="text-xl font-bold mb-6">{skill.name}</h4>
              
          
              <div className="h-[2px] w-full bg-gray-100 relative overflow-hidden">
                <motion.div 
                  initial={{ width: 0 }}
                  whileInView={{ width: skill.level }}
                  transition={{ duration: 1, delay: 0.5 }}
                  className="absolute h-full bg-blue-600 left-0"
                />
              </div>
              <span className="text-[10px] font-mono mt-2 block text-right text-gray-300 italic">{skill.level} Proficiency</span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}