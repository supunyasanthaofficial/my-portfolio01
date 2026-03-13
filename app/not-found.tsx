'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';

export default function NotFound() {
  const [score, setScore] = useState(0);
  const [bugPos, setBugPos] = useState({ top: '50%', left: '50%' });
  const [gameStarted, setGameStarted] = useState(false);


  const moveBug = () => {
    const top = Math.floor(Math.random() * 80) + 10 + '%';
    const left = Math.floor(Math.random() * 80) + 10 + '%';
    setBugPos({ top, left });
  };

  const handleBugClick = () => {
    setScore(s => s + 1);
    moveBug();
  };

  return (
    <main className="h-screen w-full bg-black flex flex-col items-center justify-center overflow-hidden relative font-sans">
      
      {/* Background 404 Text */}
      <h1 className="absolute text-[30vw] font-black text-white/[0.03] select-none pointer-events-none">
        404
      </h1>

      <div className="z-10 text-center px-4">
        <motion.h2 
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="text-4xl md:text-6xl font-bold text-white mb-4 uppercase italic"
        >
          Lost in <span className="text-blue-600">Space?</span>
        </motion.h2>
        
        <p className="text-zinc-500 mb-8 font-mono">
          The page you are looking for doesnt exist. <br />
          While youre here, catch the <span className="text-red-500">Bug</span>!
        </p>

        {!gameStarted ? (
          <button 
            onClick={() => setGameStarted(true)}
            className="px-8 py-3 bg-blue-600 text-white rounded-full font-bold hover:bg-blue-700 transition-all"
          >
            START MINI-GAME
          </button>
        ) : (
          <div className="text-white font-mono text-xl mb-4">
            BUGS CAUGHT: <span className="text-blue-500">{score}</span>
          </div>
        )}

        <div className="mt-8">
          <Link href="/" className="text-zinc-400 underline hover:text-white transition-colors">
            Back to Home
          </Link>
        </div>
      </div>

 
      <AnimatePresence>
        {gameStarted && (
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            exit={{ scale: 0 }}
            style={{ top: bugPos.top, left: bugPos.left }}
            onClick={handleBugClick}
            className="absolute cursor-crosshair z-20 p-4 bg-red-600 rounded-lg shadow-[0_0_20px_rgba(220,38,38,0.5)]"
          >
            <span className="text-2xl">🐞</span>
          </motion.div>
        )}
      </AnimatePresence>


      <div className="absolute top-0 left-0 w-full h-full pointer-events-none opacity-20">
         <div className="absolute top-10 left-10 w-32 h-32 bg-blue-600 rounded-full blur-[100px]" />
         <div className="absolute bottom-10 right-10 w-32 h-32 bg-purple-600 rounded-full blur-[100px]" />
      </div>
    </main>
  );
}