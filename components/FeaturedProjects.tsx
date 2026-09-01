"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { StaticImport } from "next/dist/shared/lib/get-img-props";
import ProjectCard from "./ProjectCard";

interface Project {
  title: string;
  category: string;
  image: StaticImport;
  description: string;
  tags: string[];
  liveUrl?: string;
  githubUrl?: string;
}

interface FeaturedProjectsProps {
  projects: Project[];
}

const SPREAD_OFFSETS = [-36, -12, 12, 36]; // vw from centre
const ROTATIONS = [-15, -7.5, 7.5, 15]; // degrees

function AnimatedCard({
  project,
  index,
  scrollYProgress,
}: {
  project: Project;
  index: number;
  scrollYProgress: ReturnType<typeof useScroll>["scrollYProgress"];
}) {
  const spreadTarget = `${SPREAD_OFFSETS[index]}vw`;
  const rotateTarget = ROTATIONS[index];

  // Spread [0 → 0.6]
  const x = useTransform(scrollYProgress, [0, 0.6], ["0vw", spreadTarget]);
  const rotate = useTransform(scrollYProgress, [0, 0.6], [0, rotateTarget]);
  const scale = useTransform(
    scrollYProgress,
    [0, 0.6],
    [0.88 - index * 0.02, 1],
  );

  const fadeStart = index * 0.03;
  const opacity = useTransform(
    scrollYProgress,
    [fadeStart, fadeStart + 0.08],
    [0.85, 1],
  );

  // Flip [0.6 → 1.0], each card sequential
  // Card 0: 0.60→0.70 | Card 1: 0.70→0.80 | Card 2: 0.80→0.90 | Card 3: 0.90→1.00
  const flipStart = 0.6 + index * 0.1;
  const flipEnd = flipStart + 0.1;
  const flipProgress = useTransform(
    scrollYProgress,
    [flipStart, flipEnd],
    [0, 1],
  );

  // z-index: inner cards on top while stacking
  const zBase = index === 1 || index === 2 ? 30 : 20;

  return (
    <div
      className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
      style={{ zIndex: zBase }}
    >
      <motion.div style={{ x, rotate, opacity, scale }}>
        <motion.div
          animate={{ y: [0, -14, 0] }}
          transition={{
            duration: 2.8 + index * 0.4,
            repeat: Infinity,
            ease: "easeInOut",
            delay: index * 0.7,
          }}
        >
          <ProjectCard
            title={project.title}
            category={project.category}
            image={project.image}
            description={project.description}
            tags={project.tags}
            liveUrl={project.liveUrl}
            githubUrl={project.githubUrl}
            index={index}
            flipProgress={flipProgress}
          />
        </motion.div>
      </motion.div>
    </div>
  );
}

export default function FeaturedProjects({ projects }: FeaturedProjectsProps) {
  // Outer container drives scroll — 4 × 100vh = same spirit as DAY_018's 3×
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  // Section title fades out as cards spread
  const titleOpacity = useTransform(scrollYProgress, [0, 0.25], [1, 0]);
  const titleY = useTransform(scrollYProgress, [0, 0.25], ["0%", "-40%"]);

  // Scroll hint bounces then fades
  const hintOpacity = useTransform(scrollYProgress, [0, 0.12], [1, 0]);

  return (
    <section
      id="projects"
      ref={containerRef}
      className="relative h-[400vh] bg-neutral-950"
    >
      <div className="sticky top-0 h-screen overflow-hidden">
        <motion.div
          style={{ opacity: titleOpacity, y: titleY }}
          className="absolute top-16 left-1/2 -translate-x-1/2 z-50 text-center pointer-events-none"
        >
          <h2 className="text-5xl md:text-7xl font-black uppercase tracking-tighter italic text-white leading-none">
            Featured <span className="text-blue-600">Projects</span>
          </h2>
        </motion.div>

        <motion.p
          style={{ opacity: hintOpacity }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2 z-50 text-gray-500 font-mono text-xs uppercase tracking-[0.3em] animate-bounce pointer-events-none"
        >
          Scroll to spread ↓
        </motion.p>

        <div className="absolute inset-0">
          {projects.map((project, i) => (
            <AnimatedCard
              key={project.title}
              project={project}
              index={i}
              scrollYProgress={scrollYProgress}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
