"use client";
import { motion } from "framer-motion";

function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative bg-black text-white py-12 md:py-16 px-6 md:px-8 overflow-hidden">
      <div className="max-w-7xl mx-auto relative z-10">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-8 md:gap-12">
          <div className="flex flex-col">
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="text-gray-400 font-mono text-xs md:text-sm mb-2 uppercase tracking-widest"
            >
              Have a project in mind?
            </motion.p>
            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-4xl md:text-7xl font-black italic uppercase tracking-tighter"
            >
              Lets <span className="text-blue-600">Connect.</span>
            </motion.h2>
          </div>

          <div className="flex flex-wrap gap-5 md:gap-8 font-mono text-xs md:text-sm uppercase tracking-widest text-neutral-300">
            <a
              href="https://www.linkedin.com/feed/"
              target="_blank"
              className="hover:text-blue-400 transition-colors"
            >
              LinkedIn
            </a>
            <a
              href="https://github.com/supunyasanthaofficial"
              target="_blank"
              className="hover:text-blue-400 transition-colors"
            >
              GitHub
            </a>
            <a
              href="https://instagram.com"
              target="_blank"
              className="hover:text-blue-400 transition-colors"
            >
              Instagram
            </a>
            <a
              href="https://facebook.com"
              target="_blank"
              className="hover:text-blue-400 transition-colors"
            >
              Facebook
            </a>
          </div>
        </div>

        <div className="mt-12 md:mt-16 pt-6 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-4 text-gray-500 font-mono text-xs">
          <p>© {currentYear} SUPUN YASANTHA. ALL RIGHTS RESERVED.</p>
          <div className="flex gap-6 md:gap-8">
            <p>DESIGNED & BUILT BY SUPUN Y</p>
            <p className="hidden md:block">LOCATED IN SRI LANKA, KANDY</p>
          </div>
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 overflow-hidden select-none pointer-events-none opacity-[0.03] translate-y-1/3">
        <h3 className="text-[20vw] font-black leading-none uppercase italic whitespace-nowrap text-center">
          Creative Developer
        </h3>
      </div>
    </footer>
  );
}
export default Footer;
