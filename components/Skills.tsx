"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import dynamic from "next/dynamic";
import { Globe, LayoutGrid, Sparkles } from "lucide-react";
import type { TechItem } from "./TechOrbit3D";
import { TECH_ITEMS } from "./TechOrbit3D";

const TechOrbit3D = dynamic(() => import("@/components/TechOrbit3D"), {
  ssr: false,
  loading: () => (
    <div className="w-full h-[520px] md:h-[620px] rounded-3xl bg-neutral-900/50 border border-neutral-800 animate-pulse flex items-center justify-center text-neutral-500 font-mono text-sm">
      <div className="flex items-center gap-2">
        <Sparkles className="w-4 h-4 text-blue-500 animate-spin" />
        <span>Initializing 3D Tech Orbit...</span>
      </div>
    </div>
  ),
});

const CATEGORIES = ["All", "Mobile", "Web", "Language", "Database", "Design", "Video"];

export default function Skills() {
  const [viewMode, setViewMode] = useState<"orbit" | "grid">("orbit");
  const [activeCategory, setActiveCategory] = useState<string>("All");
  const [selectedSkill, setSelectedSkill] = useState<TechItem | null>(null);

  const filteredSkills = activeCategory === "All"
    ? TECH_ITEMS
    : TECH_ITEMS.filter((item) => item.category === activeCategory);

  return (
    <section id="skills" className="relative z-20 py-28 md:py-36 bg-black text-white px-4 sm:px-8 overflow-hidden">
      {/* Background ambient lighting */}
      <div className="absolute top-1/4 -right-40 w-96 h-96 bg-blue-600/10 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-10 -left-40 w-96 h-96 bg-cyan-600/10 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto relative">
        {/* Section Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 mb-12">
          <div>
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/30 text-blue-400 text-xs font-mono font-semibold uppercase tracking-widest mb-4">
              <span className="w-2 h-2 rounded-full bg-blue-500 animate-pulse" />
              Skills & Tech Stack
            </div>
            <h2 className="text-4xl md:text-6xl lg:text-7xl font-black tracking-tighter uppercase italic text-white">
              Tech <span className="text-blue-500">Universe.</span>
            </h2>
            <p className="text-neutral-400 text-sm md:text-base font-mono uppercase tracking-wider mt-3">
              Explore my technical proficiencies in 3D orbit or detailed view
            </p>
          </div>

          {/* View Mode Switcher */}
          <div className="flex items-center gap-2 bg-neutral-900/90 border border-neutral-800 p-1.5 rounded-2xl backdrop-blur-xl shrink-0 self-start lg:self-end">
            <button
              type="button"
              onClick={() => setViewMode("orbit")}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-mono uppercase tracking-wider transition-all cursor-pointer ${
                viewMode === "orbit"
                  ? "bg-blue-600 text-white font-bold shadow-lg shadow-blue-600/30"
                  : "text-neutral-400 hover:text-white"
              }`}
            >
              <Globe className="w-4 h-4" />
              <span>3D Orbit</span>
            </button>
            <button
              type="button"
              onClick={() => setViewMode("grid")}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-mono uppercase tracking-wider transition-all cursor-pointer ${
                viewMode === "grid"
                  ? "bg-blue-600 text-white font-bold shadow-lg shadow-blue-600/30"
                  : "text-neutral-400 hover:text-white"
              }`}
            >
              <LayoutGrid className="w-4 h-4" />
              <span>Grid Cards</span>
            </button>
          </div>
        </div>

        {/* Category Filters */}
        <div className="flex flex-wrap items-center gap-2 mb-8">
          {CATEGORIES.map((category) => (
            <button
              key={category}
              type="button"
              onClick={() => setActiveCategory(category)}
              className={`px-3.5 py-1.5 rounded-full text-xs font-mono transition-all cursor-pointer border ${
                activeCategory === category
                  ? "bg-blue-500/20 border-blue-500 text-blue-400 font-semibold shadow-sm shadow-blue-500/20"
                  : "bg-neutral-900/60 border-neutral-800 text-neutral-400 hover:border-neutral-700 hover:text-neutral-200"
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Dynamic Display: 3D Orbit or Grid */}
        <AnimatePresence mode="wait">
          {viewMode === "orbit" ? (
            <motion.div
              key="orbit-view"
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.98 }}
              transition={{ duration: 0.4 }}
              className="relative"
            >
              <TechOrbit3D
                onSelectSkill={(skill) => setSelectedSkill(skill)}
                selectedSkill={selectedSkill}
                activeFilter={activeCategory}
              />

              {/* Selected Skill Quick Detail Card Overlay */}
              <AnimatePresence>
                {selectedSkill && (
                  <motion.div
                    initial={{ opacity: 0, y: 20, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 20, scale: 0.95 }}
                    className="absolute top-6 left-6 z-20 max-w-xs p-5 rounded-2xl bg-neutral-950/90 border border-neutral-800 backdrop-blur-xl shadow-2xl"
                    style={{ borderColor: `${selectedSkill.color}50` }}
                  >
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-2">
                        <span
                          className="w-7 h-7 rounded-lg flex items-center justify-center text-xs font-mono font-bold"
                          style={{
                            backgroundColor: `${selectedSkill.color}25`,
                            color: selectedSkill.color,
                          }}
                        >
                          {selectedSkill.iconText}
                        </span>
                        <h4 className="text-lg font-bold text-white tracking-tight">
                          {selectedSkill.name}
                        </h4>
                      </div>
                      <button
                        type="button"
                        onClick={() => setSelectedSkill(null)}
                        className="text-xs font-mono text-neutral-500 hover:text-white"
                      >
                        ✕
                      </button>
                    </div>

                    <div className="flex items-center justify-between text-xs font-mono mb-2">
                      <span className="text-neutral-400 uppercase">{selectedSkill.category}</span>
                      <span className="font-bold" style={{ color: selectedSkill.color }}>
                        {selectedSkill.level}
                      </span>
                    </div>

                    <div className="h-2 w-full bg-neutral-800 rounded-full overflow-hidden">
                      <div
                        className="h-full rounded-full transition-all duration-500"
                        style={{
                          width: selectedSkill.level,
                          backgroundColor: selectedSkill.color,
                          boxShadow: `0 0 10px ${selectedSkill.color}`,
                        }}
                      />
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ) : (
            <motion.div
              key="grid-view"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              transition={{ duration: 0.4 }}
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
            >
              {filteredSkills.map((skill, index) => (
                <motion.div
                  key={skill.name}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.05 }}
                  whileHover={{ y: -5 }}
                  className="p-6 border border-neutral-800 bg-neutral-900/60 backdrop-blur-sm rounded-3xl hover:border-blue-500/50 hover:bg-neutral-900/90 transition-all duration-300 group shadow-lg"
                >
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-xs font-mono uppercase tracking-widest text-blue-400 font-semibold">
                      {skill.category}
                    </span>
                    <span
                      className="w-6 h-6 rounded-md flex items-center justify-center text-[10px] font-mono font-bold"
                      style={{
                        backgroundColor: `${skill.color}25`,
                        color: skill.color,
                      }}
                    >
                      {skill.iconText}
                    </span>
                  </div>

                  <h4 className="text-xl font-bold mb-5 text-white tracking-tight">
                    {skill.name}
                  </h4>

                  <div className="h-1.5 w-full bg-neutral-800 rounded-full relative overflow-hidden mb-3">
                    <motion.div
                      initial={{ width: 0 }}
                      whileInView={{ width: skill.level }}
                      viewport={{ once: true }}
                      transition={{ duration: 1, delay: 0.2 }}
                      className="absolute h-full rounded-full left-0"
                      style={{
                        backgroundColor: skill.color,
                        boxShadow: `0 0 8px ${skill.color}80`,
                      }}
                    />
                  </div>

                  <div className="flex justify-between items-center text-xs font-mono">
                    <span className="text-neutral-400">Proficiency</span>
                    <span className="font-bold" style={{ color: skill.color }}>
                      {skill.level}
                    </span>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
