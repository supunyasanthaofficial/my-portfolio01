"use client";
import { motion, useScroll, useTransform } from "framer-motion";

export default function Navbar() {
  const { scrollY } = useScroll();

  const opacity = useTransform(scrollY, [0, 100], [0, 1]);
  const y = useTransform(scrollY, [0, 100], [-20, 0]);

  return (
    <motion.nav
      style={{ opacity, y }}
      className="fixed top-5 left-1/2 -translate-x-1/2 z-100 w-[90%] max-w-4xl"
    >
      <div className="bg-white/10 backdrop-blur-md border border-white/20 px-8 py-4 rounded-full flex justify-between items-center">
        <span className="font-bold tracking-tighter text-xl">SY.</span>
        <div className="flex gap-8 text-sm font-medium uppercase tracking-widest">
          <a href="#" className="hover:text-blue-400 transition">
            About
          </a>
           <a href="#" className="hover:text-blue-400 transition">
            Projects
          </a>
          
          <a href="#" className="hover:text-blue-400 transition">
            Contact
          </a>
        </div>
      </div>
    </motion.nav>
  );
}
