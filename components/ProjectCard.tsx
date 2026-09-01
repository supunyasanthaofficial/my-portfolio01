"use client";

import Image from "next/image";
import { StaticImport } from "next/dist/shared/lib/get-img-props";
import {
  motion,
  MotionValue,
  useMotionValue,
  useTransform,
} from "framer-motion";

interface ProjectProps {
  title: string;
  category: string;
  image: StaticImport;
  description?: string;
  tags?: string[];
  liveUrl?: string;
  githubUrl?: string;
  index?: number;

  flipProgress?: MotionValue<number>;
}

function ProjectCard({
  title,
  category,
  image,
  description = "A carefully crafted project built with passion and precision.",
  tags = [],
  liveUrl,
  githubUrl,
  index = 0,
  flipProgress,
}: ProjectProps) {
  // Map 0→1 progress to 0→180 degrees for the CSS rotateY flip
  const zero = useMotionValue(0);
  const rotateY = useTransform(flipProgress ?? zero, [0, 1], [0, 180]);

  return (
    <div
      className="relative shrink-0 w-[240px] md:w-[340px] h-[420px] md:h-[480px]"
      style={{ perspective: "1200px" }}
    >
      <motion.div
        className="relative w-full h-full"
        style={{
          transformStyle: "preserve-3d",
          rotateY,
        }}
      >
        <div
          className="absolute inset-0 rounded-2xl overflow-hidden"
          style={{ backfaceVisibility: "hidden" }}
        >
          <Image
            src={image}
            alt={title}
            fill
            className="object-cover"
            priority={index < 2}
          />

          <div className="absolute inset-0 bg-linear-to-t from-black/85 via-black/20 to-transparent" />

          <div className="absolute top-5 left-5">
            <span className="px-3 py-1 bg-white/10 backdrop-blur-md border border-white/20 rounded-full text-white text-xs font-mono uppercase tracking-widest">
              {category}
            </span>
          </div>

          <div className="absolute top-5 right-5">
            <span className="text-white/30 font-mono text-xs tracking-widest">
              {String(index + 1).padStart(2, "0")}
            </span>
          </div>

          <div className="absolute bottom-0 left-0 right-0 p-6">
            <h3 className="text-white text-2xl md:text-3xl font-black uppercase tracking-tighter leading-none">
              {title}
            </h3>
            <p className="text-white/40 font-mono text-[10px] uppercase tracking-[0.25em] mt-2">
              Scroll to flip ↓
            </p>
          </div>
        </div>

        <div
          className="absolute inset-0 rounded-2xl overflow-hidden flex flex-col justify-between p-7 md:p-8"
          style={{
            backfaceVisibility: "hidden",
            transform: "rotateY(180deg)",
            background:
              "linear-gradient(135deg, #0a0a0a 0%, #0f172a 50%, #0a0a14 100%)",
            border: "1px solid rgba(255,255,255,0.07)",
          }}
        >
          <div>
            <div className="flex items-center justify-between mb-6">
              <span className="text-blue-400 font-mono text-xs uppercase tracking-[0.3em]">
                {category}
              </span>
              <span className="text-white/20 font-mono text-xs">
                {String(index + 1).padStart(2, "0")}
              </span>
            </div>

            <h3 className="text-white text-3xl md:text-4xl font-black uppercase tracking-tighter leading-[0.9] mb-5">
              {title}
            </h3>

            <div className="w-10 h-[2px] bg-blue-500 mb-5" />

            <p className="text-gray-400 text-sm leading-relaxed font-light">
              {description}
            </p>
          </div>

          {tags.length > 0 && (
            <div className="flex flex-wrap gap-2 my-4">
              {tags.map((tag) => (
                <span
                  key={tag}
                  className="px-3 py-1 border border-white/10 rounded-full text-white/50 text-xs font-mono uppercase tracking-wider"
                >
                  {tag}
                </span>
              ))}
            </div>
          )}

          <div className="flex items-center gap-4 mt-2">
            {liveUrl && (
              <a
                href={liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-5 py-2.5 bg-blue-600 hover:bg-blue-500 text-white text-xs font-mono uppercase tracking-widest rounded-full transition-all duration-300"
                style={{ cursor: "none" }}
              >
                <span>Live</span>
                <svg
                  className="w-3 h-3"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2.5}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                  />
                </svg>
              </a>
            )}
            {githubUrl && (
              <a
                href={githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-5 py-2.5 border border-white/15 hover:border-white/40 text-white/60 hover:text-white text-xs font-mono uppercase tracking-widest rounded-full transition-all duration-300"
                style={{ cursor: "none" }}
              >
                <svg
                  className="w-3.5 h-3.5"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
                </svg>
                <span>GitHub</span>
              </a>
            )}
            {!liveUrl && !githubUrl && (
              <span className="text-white/20 font-mono text-xs uppercase tracking-widest">
                Coming soon
              </span>
            )}
          </div>
        </div>
      </motion.div>
    </div>
  );
}

export default ProjectCard;
