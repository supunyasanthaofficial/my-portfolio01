"use client";
import { motion } from "framer-motion";

function Navbar() {
  const scrollTo = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
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
          suppressHydrationWarning
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          className="font-bold tracking-tighter text-xl text-white hover:text-blue-400 transition cursor-pointer"
        >
          SY.
        </button>
        <div className="flex gap-4 sm:gap-8 text-xs sm:text-sm font-medium uppercase tracking-widest text-neutral-300">
          <button
            type="button"
            suppressHydrationWarning
            onClick={() => scrollTo("about")}
            className="hover:text-blue-400 transition cursor-pointer"
          >
            About
          </button>
          <button
            type="button"
            suppressHydrationWarning
            onClick={() => scrollTo("skills")}
            className="hover:text-blue-400 transition cursor-pointer"
          >
            Skills
          </button>
          <button
            type="button"
            suppressHydrationWarning
            onClick={() => scrollTo("projects")}
            className="hover:text-blue-400 transition cursor-pointer"
          >
            Projects
          </button>
          <button
            type="button"
            suppressHydrationWarning
            onClick={() => scrollTo("contact")}
            className="hover:text-blue-400 transition cursor-pointer"
          >
            Contact
          </button>
        </div>
      </div>
    </motion.nav>
  );
}
export default Navbar;
