"use client";
import Image from "next/image";

import { StaticImport } from "next/dist/shared/lib/get-img-props";

interface ProjectProps {
  title: string;
  category: string;
  image: StaticImport;
}

export default function ProjectCard({ title, category, image }: ProjectProps) {
  return (
    <div className="relative shrink-0 w-[300px] md:w-[500px] h-[400px] rounded-3xl overflow-hidden group bg-neutral-900">
      <Image
        src={image}
        alt={title}
        fill
        className="object-cover transition-transform duration-700 group-hover:scale-110 opacity-60 group-hover:opacity-100"
      />
      <div className="absolute inset-0 p-8 flex flex-col justify-end bg-gradient-to-t from-black/80 to-transparent">
        <span className="text-blue-400 font-mono text-sm mb-2 uppercase tracking-widest">
          {category}
        </span>
        <h3 className="text-white text-3xl font-bold uppercase tracking-tighter">
          {title}
        </h3>
      </div>
    </div>
  );
}
