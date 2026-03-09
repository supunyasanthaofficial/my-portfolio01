"use client";
import { motion } from "framer-motion";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative bg-black text-white py-20 px-8 border-t border-white/5">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-12">
          <div className="flex flex-col">
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="text-gray-400 font-mono text-sm mb-4 uppercase tracking-widest"
            >
              Have a project in mind?
            </motion.p>
            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-5xl md:text-8xl font-black italic uppercase tracking-tighter"
            >
              Lets <span className="text-blue-600">Connect.</span>
            </motion.h2>
          </div>

          <div className="flex flex-wrap gap-8 font-mono text-sm uppercase tracking-widest">
            <a
              href="https://www.linkedin.com/feed/"
              target="_blank"
              className="hover:text-blue-500 transition-colors"
            >
              LinkedIn
            </a>
            <a
              href="https://github.com/supunyasanthaofficial"
              target="_blank"
              className="hover:text-blue-500 transition-colors"
            >
              GitHub
            </a>
            <a
              href="https://instagram.com"
              target="_blank"
              className="hover:text-blue-500 transition-colors"
            >
              Instagram
            </a>
            <a
              href="https://facebook.com"
              target="_blank"
              className="hover:text-blue-500 transition-colors"
            >
              Facebook
            </a>
          </div>
        </div>

        <div className="mt-32 pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-4 text-gray-500 font-mono text-xs">
          <p>© {currentYear} SUPUN YASANTHA. ALL RIGHTS RESERVED.</p>
          <div className="flex gap-8">
            <p>DESIGNED & BUILT BY SUPUN Y</p>
            <p className="hidden md:block">LOCATED IN SRI LANKA, KANDY</p>
          </div>
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 overflow-hidden select-none pointer-events-none opacity-[0.02] translate-y-1/4">
        <h3 className="text-[25vw] font-black leading-none uppercase italic whitespace-nowrap">
          Creative Developer
        </h3>
      </div>
    </footer>
  );
}
