"use client";

import React, { useState, useEffect, useCallback, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Search,
  FolderGit2,
  Cpu,
  Mail,
  User,
  History,
  ExternalLink,
  Copy,
  Check,
  Command as CommandIcon,
  X,
} from "lucide-react";

interface ActionItem {
  id: string;
  label: string;
  category: "Navigation" | "Action" | "Social";
  icon: React.ReactNode;
  shortcut?: string;
  action: () => void;
}

export default function CommandPalette() {
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [copied, setCopied] = useState(false);

  const scrollTo = useCallback((id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
    setIsOpen(false);
  }, []);

  const handleCopyEmail = useCallback(() => {
    navigator.clipboard.writeText("supun.yasantha@work.com");
    setCopied(true);
    setTimeout(() => {
      setCopied(false);
      setIsOpen(false);
    }, 1200);
  }, []);

  const actions: ActionItem[] = useMemo(
    () => [
      {
        id: "about",
        label: "About Me",
        category: "Navigation",
        icon: <User className="w-4 h-4 text-blue-400" />,
        shortcut: "G A",
        action: () => scrollTo("about"),
      },
      {
        id: "skills",
        label: "Tech Skills & Stack",
        category: "Navigation",
        icon: <Cpu className="w-4 h-4 text-cyan-400" />,
        shortcut: "G S",
        action: () => scrollTo("skills"),
      },
      {
        id: "projects",
        label: "Featured Projects",
        category: "Navigation",
        icon: <FolderGit2 className="w-4 h-4 text-indigo-400" />,
        shortcut: "G P",
        action: () => scrollTo("projects"),
      },
      {
        id: "dev-story",
        label: "Developer Journey & Timeline",
        category: "Navigation",
        icon: <History className="w-4 h-4 text-emerald-400" />,
        shortcut: "G D",
        action: () => scrollTo("dev-story"),
      },
      {
        id: "contact",
        label: "Get in Touch / Contact Form",
        category: "Navigation",
        icon: <Mail className="w-4 h-4 text-amber-400" />,
        shortcut: "G C",
        action: () => scrollTo("contact"),
      },
      {
        id: "copy-email",
        label: copied ? "Copied to Clipboard!" : "Copy Email Address",
        category: "Action",
        icon: copied ? (
          <Check className="w-4 h-4 text-green-400" />
        ) : (
          <Copy className="w-4 h-4 text-blue-400" />
        ),
        shortcut: "↵",
        action: handleCopyEmail,
      },
      {
        id: "github",
        label: "GitHub Profile",
        category: "Social",
        icon: <ExternalLink className="w-4 h-4 text-neutral-400" />,
        shortcut: "↗",
        action: () => {
          window.open("https://github.com/supunyasanthaofficial", "_blank");
          setIsOpen(false);
        },
      },
    ],
    [scrollTo, handleCopyEmail, copied]
  );

  const filtered = useMemo(() => {
    if (!query.trim()) return actions;
    return actions.filter((a) =>
      a.label.toLowerCase().includes(query.toLowerCase()) ||
      a.category.toLowerCase().includes(query.toLowerCase())
    );
  }, [actions, query]);

  // Toggle on Ctrl+K / Cmd+K
  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setIsOpen((prev) => !prev);
      }
      if (e.key === "Escape") {
        setIsOpen(false);
      }
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, []);

  // Handle query input change and reset selection index
  const handleQueryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
    setSelectedIndex(0);
  };

  // Handle arrow key navigation
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setSelectedIndex((prev) => (prev + 1) % (filtered.length || 1));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setSelectedIndex((prev) => (prev - 1 + (filtered.length || 1)) % (filtered.length || 1));
    } else if (e.key === "Enter" && filtered[selectedIndex]) {
      e.preventDefault();
      filtered[selectedIndex].action();
    }
  };

  return (
    <>
   
      <motion.button
        type="button"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 1 }}
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 z-40 hidden md:flex items-center gap-2 px-3.5 py-2 rounded-full bg-neutral-900/90 hover:bg-neutral-800 text-neutral-300 hover:text-white border border-neutral-700/60 backdrop-blur-xl shadow-2xl transition-all group cursor-pointer text-xs font-mono"
        title="Quick Menu (Cmd + K)"
      >
        <CommandIcon className="w-3.5 h-3.5 text-blue-400 group-hover:rotate-12 transition-transform" />
        <span>Menu</span>
        <kbd className="px-1.5 py-0.5 rounded bg-neutral-800 border border-neutral-700 text-[10px] text-neutral-400">
          ⌘K
        </kbd>
      </motion.button>

    
      <AnimatePresence>
        {isOpen && (
          <div className="fixed inset-0 z-50 flex items-start justify-center pt-24 md:pt-32 px-4">
          
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="fixed inset-0 bg-black/75 backdrop-blur-md"
            />

           
            <motion.div
              initial={{ opacity: 0, scale: 0.96, y: -10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.96, y: -10 }}
              transition={{ duration: 0.2, ease: "easeOut" }}
              className="relative w-full max-w-xl bg-neutral-900/95 border border-neutral-800 rounded-2xl shadow-2xl overflow-hidden backdrop-blur-2xl z-10"
            >
           
              <div className="flex items-center gap-3 px-4 py-3.5 border-b border-neutral-800">
                <Search className="w-5 h-5 text-neutral-400 shrink-0" />
                <input
                  type="text"
                  autoFocus
                  placeholder="Type a command or search..."
                  value={query}
                  onChange={handleQueryChange}
                  onKeyDown={handleKeyDown}
                  className="w-full bg-transparent text-white text-sm md:text-base outline-none placeholder:text-neutral-500 font-sans"
                />
                <button
                  type="button"
                  onClick={() => setIsOpen(false)}
                  className="p-1 rounded-md text-neutral-400 hover:text-white hover:bg-neutral-800 transition"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

            
              <div className="max-h-80 overflow-y-auto p-2">
                {filtered.length === 0 ? (
                  <div className="py-12 text-center text-sm text-neutral-500 font-mono">
                    No results found for &ldquo;{query}&rdquo;
                  </div>
                ) : (
                  filtered.map((item, index) => {
                    const isSelected = index === selectedIndex;
                    return (
                      <div
                        key={item.id}
                        onClick={item.action}
                        onMouseEnter={() => setSelectedIndex(index)}
                        className={`flex items-center justify-between px-3.5 py-2.5 rounded-xl cursor-pointer transition-colors ${
                          isSelected
                            ? "bg-blue-600/20 text-white border border-blue-500/30"
                            : "text-neutral-300 hover:bg-neutral-800/60 border border-transparent"
                        }`}
                      >
                        <div className="flex items-center gap-3 min-w-0">
                          <div
                            className={`p-1.5 rounded-lg ${
                              isSelected ? "bg-blue-500/20" : "bg-neutral-800"
                            }`}
                          >
                            {item.icon}
                          </div>
                          <span className="text-sm font-medium truncate">
                            {item.label}
                          </span>
                          <span className="text-[10px] uppercase font-mono tracking-wider text-neutral-500 px-1.5 py-0.5 rounded bg-neutral-800/80 hidden sm:inline">
                            {item.category}
                          </span>
                        </div>

                        {item.shortcut && (
                          <kbd className="text-xs font-mono text-neutral-500 px-1.5 py-0.5 rounded bg-neutral-800 border border-neutral-700/60 shrink-0">
                            {item.shortcut}
                          </kbd>
                        )}
                      </div>
                    );
                  })
                )}
              </div>

             
              <div className="flex items-center justify-between px-4 py-2.5 bg-neutral-950/60 border-t border-neutral-800/80 text-[11px] text-neutral-500 font-mono">
                <div className="flex items-center gap-2">
                  <span>Navigation:</span>
                  <kbd className="px-1 bg-neutral-800 rounded text-neutral-400">↑</kbd>
                  <kbd className="px-1 bg-neutral-800 rounded text-neutral-400">↓</kbd>
                  <kbd className="px-1.5 bg-neutral-800 rounded text-neutral-400">↵ Select</kbd>
                </div>
                <span>ESC to close</span>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}
