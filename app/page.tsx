"use client";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import Image from "next/image";
import dynamic from "next/dynamic";

import sukuna from "../images/sukuna.jpg";
import P2 from "../images/P2.jpg";
import P4 from "../images/P4.jpg";
import Bigger2 from "../images/Bigger2.png";
import A2 from "../images/A2.png";

import Navbar from "@/components/Navbar";
import FeaturedProjects from "@/components/FeaturedProjects";
import Footer from "@/components/Footer";
import ContactForm from "@/components/ContactForm";
import Skills from "@/components/Skills";
const GithubGraph = dynamic(() => import("@/components/GithubGraph"), {
  ssr: false,
  loading: () => (
    <div className="h-40 w-full animate-pulse bg-zinc-800 rounded-3xl" />
  ),
});
import DevStory from "@/components/DevStory";
import AdaptiveGreeting from "@/components/AdaptiveGreeting";
import CustomCursor from "@/components/Cursor";
import SpotlightCursor from "@/components/SpotLight";
import GlitchButton from "@/components/GlitchButton";
import FilmIndicator from "@/components/FilmIndicator";
import LoadingScreen from "@/components/LoadingScreen";

const PROJECTS = [
  {
    title: "Auroo Mobile App",
    category: "Flutter",
    image: A2,
    description:
      "A feature-rich mobile application for seamless audio streaming and discovery, built with Flutter and Dart for cross-platform performance.",
    tags: ["Flutter", "Dart", "Firebase", "REST API"],
    githubUrl: "https://github.com/supunyasanthaofficial",
  },
  {
    title: "Portfolio",
    category: "Next.js",
    image: P2,
    description:
      "A creative developer portfolio with smooth scroll animations, 3D interactions, and a cinematic design language built with Next.js and Framer Motion.",
    tags: ["Next.js", "TypeScript", "Tailwind", "Framer Motion"],
    liveUrl: "https://supunyasantha.vercel.app",
    githubUrl: "https://github.com/supunyasanthaofficial/my-portfolio01",
  },
  {
    title: "Bigger2",
    category: "Flutter",
    image: Bigger2,
    description:
      "A dynamic mobile platform delivering an engaging user experience with real-time data, clean UI components, and offline-first architecture.",
    tags: ["Flutter", "Dart", "SQLite", "Provider"],
    githubUrl: "https://github.com/supunyasanthaofficial",
  },
  {
    title: "Diferencia Globle",
    category: "React",
    image: P4,
    description:
      "A globally-connected web application that bridges digital experiences across borders, built with React and modern web technologies.",
    tags: ["React", "Node.js", "MongoDB", "Tailwind"],
    githubUrl: "https://github.com/supunyasanthaofficial",
  },
];

export default function Home() {
  const containerRef = useRef(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  const textY = useTransform(scrollYProgress, [0, 0.2], ["0%", "100%"]);
  const textOpacity = useTransform(scrollYProgress, [0, 0.15], [1, 0]);
  const heroScale = useTransform(scrollYProgress, [0, 0.2], [1, 0.9]);

  return (
    <main ref={containerRef} className="relative bg-black text-white">
      <LoadingScreen />
      <Navbar />
      <CustomCursor />
      <SpotlightCursor />
      <FilmIndicator />
      <section className="relative h-screen flex items-center justify-center overflow-hidden sticky top-0 bg-black">
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
      <div className="flex justify-center px-4">
        <AdaptiveGreeting />
      </div>
      <section id="about" className="relative z-20 min-h-screen bg-white text-black rounded-t-[50px] px-8 py-32 flex flex-col items-center justify-center">
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
              <p className="text-3xl md:text-5xl font-medium leading-tight tracking-tight text-black">
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
      <DevStory />
      <Skills />
      <FeaturedProjects projects={PROJECTS} />

    
      <section className="relative z-20 bg-black text-white flex flex-col items-center justify-center py-20 md:py-28 px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-4xl mx-auto"
        >
          <h2 className="text-5xl md:text-8xl font-black italic tracking-tighter uppercase mb-8 md:mb-10">
            Lets create <br /> <span className="text-blue-500">something.</span>
          </h2>
          
          <div className="flex justify-center">
             <a href="mailto:supun.yasantha@work.com" className="cursor-pointer">
                <GlitchButton text="Start a Project" />
             </a>
          </div>
          
          <p className="mt-6 text-gray-500 font-mono text-xs md:text-sm uppercase tracking-widest">
            supun.yasantha@work.com
          </p>
        </motion.div>
      </section>
      <GithubGraph />
      <div id="contact">
        <ContactForm />
      </div>
      <Footer />
    </main>
  );
}
