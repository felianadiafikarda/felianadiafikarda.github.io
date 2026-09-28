import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, Sparkles } from 'lucide-react';

const keywords = ["DATA", "CODE", "INSIGHTS", "FELIA NADIA"];

export default function KineticLensIntro({ onComplete }) {
  const [counter, setCounter] = useState(0);
  const [textIndex, setTextIndex] = useState(0);
  const [isZooming, setIsZooming] = useState(false);
  const [isFinished, setIsFinished] = useState(false);

  // 1. Lock scrollbar on mount & run counter 0% -> 100% (~2.5s)
  useEffect(() => {
    document.body.style.overflow = 'hidden';

    const totalDuration = 2400; // 2.4 seconds
    const startTime = Date.now();

    const interval = setInterval(() => {
      const elapsed = Date.now() - startTime;
      const progress = Math.min(100, Math.floor((elapsed / totalDuration) * 100));
      setCounter(progress);

      // Map progress percentage to kinetic text index
      if (progress < 25) {
        setTextIndex(0); // "DATA"
      } else if (progress < 50) {
        setTextIndex(1); // "CODE"
      } else if (progress < 75) {
        setTextIndex(2); // "INSIGHTS"
      } else {
        setTextIndex(3); // "FELIA NADIA"
      }

      if (progress >= 100) {
        clearInterval(interval);

        // Pause briefly (0.3s) at "FELIA NADIA" then trigger Camera Lens Zoom
        setTimeout(() => {
          setIsZooming(true);
        }, 300);

        // Complete transition after zoom animation (0.6s)
        setTimeout(() => {
          finishIntro();
        }, 900);
      }
    }, 25);

    return () => clearInterval(interval);
  }, []);

  const skipIntro = () => {
    setCounter(100);
    setTextIndex(3);
    setIsZooming(true);
    setTimeout(() => {
      finishIntro();
    }, 350);
  };

  const finishIntro = () => {
    setIsFinished(true);
    document.body.style.overflow = 'unset';
    if (onComplete) onComplete();
  };

  if (isFinished) return null;

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 z-[100] flex items-center justify-center bg-[#0E1120] text-white font-body select-none overflow-hidden"
        initial={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.4 }}
      >
        {/* Ambient Dark Mesh Blur Glows */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[650px] h-[650px] rounded-full bg-gradient-to-tr from-[#0369A1]/30 via-sky-500/20 to-indigo-600/20 blur-[150px] pointer-events-none" />

        {/* Top-Right Glassmorphism Skip Intro Button */}
        <motion.button
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          onClick={skipIntro}
          className="absolute top-6 right-6 z-50 flex items-center gap-2 px-4 py-2 rounded-full border border-white/15 bg-white/5 backdrop-blur-md text-xs font-semibold text-[#7DD3FC] shadow-lg transition hover:bg-white/10 hover:border-[#7DD3FC] hover:scale-105"
        >
          <span>Skip Intro</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </motion.button>

        {/* Bottom-Right Monospaced Counter Display */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.85 }}
          className="absolute bottom-6 right-8 z-50 font-mono text-xs sm:text-sm font-semibold tracking-wider text-sky-400/80 flex items-center gap-2"
        >
          <span className="h-2 w-2 rounded-full bg-[#7DD3FC] animate-ping" />
          <span>LOADING {counter.toString().padStart(3, '0')}%</span>
        </motion.div>

        {/* Bottom-Left Sparkle Tag */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.85 }}
          className="absolute bottom-6 left-8 z-50 text-xs font-mono text-slate-400 hidden sm:flex items-center gap-2"
        >
          <Sparkles className="w-3.5 h-3.5 text-sky-400" />
          <span>FELIA NADIA FIKARDA — PORTFOLIO</span>
        </motion.div>

        {/* Camera Lens Zoom Container */}
        <motion.div
          className="relative flex flex-col items-center justify-center p-8 text-center"
          animate={
            isZooming
              ? { scale: 30, opacity: 0 }
              : { scale: 1, opacity: 1 }
          }
          transition={{
            duration: 0.65,
            ease: [0.7, 0, 0.3, 1]
          }}
        >
          {/* Circular Glassmorphic Lens / Aperture Ring */}
          <div className="relative flex items-center justify-center w-72 h-72 sm:w-96 sm:h-96 rounded-full border border-white/10 bg-white/5 backdrop-blur-md shadow-[0_0_50px_rgba(3,105,161,0.2)]">
            
            {/* Outer Decorative Ring */}
            <motion.div
              className="absolute inset-2 sm:inset-3 rounded-full border border-sky-400/20 border-dashed"
              animate={{ rotate: 360 }}
              transition={{ duration: 15, ease: "linear", repeat: Infinity }}
            />

            {/* Inner Glowing Ring */}
            <div className="absolute inset-8 sm:inset-10 rounded-full border border-sky-500/30 shadow-[inner_0_0_30px_rgba(125,211,252,0.2)]" />

            {/* Center Kinetic Typography Text Switcher with Fast Motion Blur */}
            <div className="relative z-10 flex items-center justify-center h-20 w-full overflow-hidden px-4">
              <AnimatePresence mode="wait">
                <motion.h1
                  key={textIndex}
                  initial={{ y: 40, opacity: 0, filter: 'blur(8px)' }}
                  animate={{ y: 0, opacity: 1, filter: 'blur(0px)' }}
                  exit={{ y: -40, opacity: 0, filter: 'blur(8px)' }}
                  transition={{ duration: 0.25, ease: "easeInOut" }}
                  className="font-display text-3xl sm:text-5xl font-extrabold tracking-tight text-white drop-shadow-[0_0_30px_rgba(125,211,252,0.6)]"
                >
                  {keywords[textIndex]}
                </motion.h1>
              </AnimatePresence>
            </div>

          </div>

          {/* Progress Tracker Bar under Lens */}
          <div className="mt-8 w-44 sm:w-56 h-1 bg-slate-800/80 rounded-full overflow-hidden p-0.5 border border-sky-500/20">
            <motion.div
              className="h-full rounded-full bg-gradient-to-r from-[#0369A1] via-[#7DD3FC] to-emerald-400 shadow-[0_0_12px_#7DD3FC]"
              style={{ width: `${counter}%` }}
            />
          </div>

        </motion.div>

      </motion.div>
    </AnimatePresence>
  );
}
