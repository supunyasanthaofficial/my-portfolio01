"use client";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import Image from "next/image";

import sukuna from "../images/sukuna.jpg";
import P1 from "../images/P1.jpg";
import P2 from "../images/P2.jpg";
import P3 from "../images/P3.jpg";
import P4 from "../images/P4.jpg";

import Navbar from "@/components/Navbar";
import ProjectCard from "@/components/ProjectCard";
import Footer from "@/components/Footer";
import ContactForm from "@/components/ContactForm";
import Skills from "@/components/Skills";

export default function Home() {
  const containerRef = useRef(null);
  const scrollRef = useRef(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  const textY = useTransform(scrollYProgress, [0, 0.2], ["0%", "100%"]);
  const textOpacity = useTransform(scrollYProgress, [0, 0.15], [1, 0]);
  const heroScale = useTransform(scrollYProgress, [0, 0.2], [1, 0.9]);

  const { scrollYProgress: horizontalProgress } = useScroll({
    target: scrollRef,
  });

  const x = useTransform(horizontalProgress, [0, 1], ["0%", "-70%"]);

  return (
    <main ref={containerRef} className="relative bg-black text-white">
      <Navbar />

      <section className="relative h-screen flex items-center justify-center overflow-hidden sticky top-0">
        <motion.div
          style={{ y: textY, opacity: textOpacity, scale: heroScale }}
          className="text-center z-10 px-4"
        >
          <h1 className="text-[10vw] md:text-[8vw] font-black leading-[0.9] italic uppercase tracking-tighter">
            Supun <br /> Yasantha
          </h1>
          <p className="text-lg md:text-xl font-light tracking-[0.4em] text-gray-400 mt-6 uppercase">
            Mobile • Web
          </p>
        </motion.div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-blue-600/20 rounded-full blur-[120px] animate-pulse" />
      </section>

      <section className="relative z-20 min-h-screen bg-white text-black rounded-t-[50px] px-8 py-32 flex flex-col items-center justify-center">
        <div className="max-w-7xl w-full">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
            className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center"
          >
            <div className="flex justify-center md:justify-end">
              <div className="relative group overflow-hidden rounded-full aspect-square bg-gray-100 shadow-2xl w-full max-w-md">
                <Image
                  src={sukuna}
                  alt="Supun Yasantha"
                  fill
                  className="object-cover grayscale group-hover:grayscale-0 transition-all duration-700 ease-in-out group-hover:scale-105"
                  priority
                />
              </div>
            </div>

            <div className="flex flex-col">
              <h2 className="text-sm font-mono uppercase tracking-widest text-blue-600 mb-8">
                About Me
              </h2>
              <p className="text-3xl md:text-5xl font-medium leading-tight tracking-tight">
                I am a{" "}
                <span className="text-blue-600">Full-stack Developer</span> and{" "}
                <span className="italic"> Editor</span>.
              </p>
              <div className="mt-12 space-y-8">
                <p className="text-lg text-gray-600 leading-relaxed">
                  I blend technical precision with creative storytelling in
                  mobile and web apps.
                </p>
                
              </div>
            </div>
          </motion.div>
        </div>
      </section>
      <Skills />
      <section ref={scrollRef} className="relative h-[400vh] bg-neutral-950">
        <div className="sticky top-0 h-screen flex items-center overflow-hidden">
          <motion.div style={{ x }} className="flex gap-8 px-8 md:px-20">
            <div className="flex flex-col justify-center w-[300px] md:w-[400px] shrink-0">
              <h2 className="text-5xl md:text-7xl font-black uppercase tracking-tighter italic text-blue-600 leading-none">
                Featured <br /> Projects
              </h2>
              <p className="text-gray-500 mt-6 font-mono text-sm tracking-widest animate-bounce">
                SCROLL TO EXPLORE →
              </p>
            </div>

            <ProjectCard title="Mobile App" category="Flutter" image={P1} />
            <ProjectCard title="Web Platform" category="Next.js" image={P2} />
            <ProjectCard title="Cinema Reel" category="Editing" image={P3} />
            <ProjectCard title="UI Concept" category="Design" image={P4} />
          </motion.div>
        </div>
      </section>

      <section className="h-screen bg-black flex flex-col items-center justify-center">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          className="text-center"
        >
          <h2 className="text-6xl md:text-8xl font-black italic tracking-tighter uppercase">
            Lets create <br /> something.
          </h2>
          <a
            href="mailto:your-email@gmail.com"
            className="mt-12 inline-block text-blue-500 text-xl md:text-2xl font-mono hover:scale-110 transition-transform underline"
          >
            supun.yasantha@work.com
          </a>
        </motion.div>
      </section>
      <ContactForm />
      <Footer />
    </main>
  );
}
