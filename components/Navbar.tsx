"use client";

import { motion } from "framer-motion";
import { NAV_LINKS } from "@/data/navigation";

function Navbar() {
  const scrollTo = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  const handleOpenCommandPalette = () => {
    window.dispatchEvent(
      new KeyboardEvent("keydown", { key: "k", metaKey: true, bubbles: true })
    );
  };

  return (
    <motion.nav
      initial={{ y: -50, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="fixed top-5 left-1/2 -translate-x-1/2 z-50 w-[90%] max-w-4xl"
    >
      <div className="bg-neutral-900/60 backdrop-blur-xl border border-white/10 px-6 sm:px-8 py-3.5 rounded-full flex justify-between items-center shadow-2xl">
        <button
          type="button"
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          className="font-bold tracking-tighter text-xl text-white hover:text-blue-400 transition cursor-pointer"
        >
          SY.
        </button>

        <div className="flex gap-4 sm:gap-8 text-xs sm:text-sm font-medium uppercase tracking-widest text-neutral-300">
          {NAV_LINKS.map((link) => (
            <button
              key={link.id}
              type="button"
              onClick={() => scrollTo(link.id)}
              className={`hover:text-blue-400 transition cursor-pointer ${
                link.desktopOnly ? "hidden md:inline" : ""
              }`}
            >
              {link.label}
            </button>
          ))}

          <button
            type="button"
            onClick={handleOpenCommandPalette}
            className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-neutral-800/80 hover:bg-neutral-700 text-neutral-300 hover:text-white border border-neutral-700/50 transition cursor-pointer text-[11px] font-mono ml-1"
            title="Search & Quick Actions"
          >
            <span>⌘K</span>
          </button>
        </div>
      </div>
    </motion.nav>
  );
}

export default Navbar;
