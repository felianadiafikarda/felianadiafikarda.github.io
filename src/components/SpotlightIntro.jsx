import React, { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, ArrowRight, Award, Users, BarChart3, Flashlight } from 'lucide-react';
import { personalInfo } from '../data/portfolioData';

/**
 * SpotlightIntro - Interactive Flashlight & Light Explosion Reveal Intro
 * 
 * Features:
 * 1. Dual-layer text reveal: Dark mystery silhouette beneath, luminous high-clarity reveal inside cursor flashlight
 * 2. Dynamic spotlight halo & dust particles floating in the flashlight beam
 * 3. Mobile touch & mouse tracking with ambient auto-drift when idle
 * 4. Blinding 'Light Explosion' transition shockwave into main portfolio
 * 5. Glassmorphism 'Skip Intro' button at top-right
 */
export default function SpotlightIntro({ onComplete }) {
  // Cursor / Spotlight coordinates (defaults to screen center)
  const [pos, setPos] = useState({
    x: typeof window !== 'undefined' ? window.innerWidth / 2 : 500,
    y: typeof window !== 'undefined' ? window.innerHeight / 2 : 400,
  });

  const [isExploding, setIsExploding] = useState(false);
  const [isFinished, setIsFinished] = useState(false);
  const [progress, setProgress] = useState(0);
  const [hasInteracted, setHasInteracted] = useState(false);

  const containerRef = useRef(null);
  const animFrameRef = useRef(null);
  const idleAngleRef = useRef(0);

  // Lock body scroll while intro is visible
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, []);

  // Update cursor position smoothly
  const handlePointerMove = useCallback((e) => {
    setHasInteracted(true);
    const clientX = e.clientX ?? e.touches?.[0]?.clientX;
    const clientY = e.clientY ?? e.touches?.[0]?.clientY;

    if (clientX != null && clientY != null) {
      setPos({ x: clientX, y: clientY });
    }
  }, []);

  // Ambient gentle floating motion when user is idle
  useEffect(() => {
    if (hasInteracted || isExploding) return;

    const animateIdle = () => {
      idleAngleRef.current += 0.02;
      const centerX = window.innerWidth / 2;
      const centerY = window.innerHeight / 2;
      const radiusX = Math.min(window.innerWidth * 0.18, 140);
      const radiusY = Math.min(window.innerHeight * 0.12, 80);

      setPos({
        x: centerX + Math.cos(idleAngleRef.current) * radiusX,
        y: centerY + Math.sin(idleAngleRef.current * 1.4) * radiusY,
      });

      animFrameRef.current = requestAnimationFrame(animateIdle);
    };

    animFrameRef.current = requestAnimationFrame(animateIdle);

    return () => {
      if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
    };
  }, [hasInteracted, isExploding]);

  // Automatic progress timer (~3.5 seconds)
  useEffect(() => {
    if (isExploding || isFinished) return;

    const duration = 3400; // 3.4 seconds total duration
    const intervalTime = 30;
    const step = 100 / (duration / intervalTime);

    const timer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(timer);
          triggerExplosion();
          return 100;
        }
        return prev + step;
      });
    }, intervalTime);

    return () => clearInterval(timer);
  }, [isExploding, isFinished]);

  // Trigger Light Explosion sequence
  const triggerExplosion = useCallback(() => {
    if (isExploding || isFinished) return;
    setIsExploding(true);

    // After the light explosion peaks, finish intro and unmount
    setTimeout(() => {
      setIsFinished(true);
      document.body.style.overflow = 'unset';
      if (onComplete) onComplete();
    }, 850);
  }, [isExploding, isFinished, onComplete]);

  // Skip button handler
  const handleSkip = () => {
    triggerExplosion();
  };

  if (isFinished) return null;

  // Spotlight radial mask style for the bright reveal layer
  const spotlightMask = {
    WebkitMaskImage: `radial-gradient(circle 240px at ${pos.x}px ${pos.y}px, black 25%, rgba(0,0,0,0.5) 60%, transparent 100%)`,
    maskImage: `radial-gradient(circle 240px at ${pos.x}px ${pos.y}px, black 25%, rgba(0,0,0,0.5) 60%, transparent 100%)`,
  };

  // Outer ambient flashlight glow
  const flashlightGlowStyle = {
    background: `radial-gradient(circle 320px at ${pos.x}px ${pos.y}px, rgba(56, 189, 248, 0.22) 0%, rgba(14, 165, 233, 0.10) 35%, rgba(99, 102, 241, 0.04) 60%, transparent 80%)`,
  };

  return (
    <AnimatePresence>
      <motion.div
        ref={containerRef}
        className="fixed inset-0 z-[100] flex items-center justify-center bg-[#050711] text-white font-body select-none overflow-hidden cursor-crosshair"
        initial={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.5, ease: 'easeInOut' }}
        onMouseMove={handlePointerMove}
        onTouchMove={handlePointerMove}
        onTouchStart={handlePointerMove}
      >
        {/* ========================================================================= */}
        {/* BACKGROUND AMBIENT PARTICLES & GRID                                       */}
        {/* ========================================================================= */}
        <div className="absolute inset-0 bg-[radial-gradient(#1e293b_1px,transparent_1px)] [background-size:32px_32px] opacity-25 pointer-events-none" />

        {/* Ambient flashlight glow following cursor */}
        <div
          className="absolute inset-0 pointer-events-none transition-[background] duration-75 ease-out"
          style={flashlightGlowStyle}
        />

        {/* ========================================================================= */}
        {/* SKIP INTRO BUTTON (TOP RIGHT)                                             */}
        {/* ========================================================================= */}
        <motion.button
          initial={{ opacity: 0, y: -12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          onClick={handleSkip}
          className="absolute top-6 right-6 z-50 flex items-center gap-2 px-4 py-2 rounded-full border border-sky-400/20 bg-slate-900/60 backdrop-blur-md text-xs font-semibold text-sky-300 shadow-[0_0_20px_rgba(56,189,248,0.15)] hover:bg-sky-500/20 hover:border-sky-400/50 hover:text-white hover:scale-105 active:scale-95 transition-all cursor-pointer"
        >
          <span>Skip Intro</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </motion.button>

        {/* ========================================================================= */}
        {/* LAYER 1: DARK SILHOUETTE (HIDDEN IN THE DARK)                             */}
        {/* ========================================================================= */}
        <div className="relative z-10 flex flex-col items-center justify-center text-center max-w-3xl px-6 opacity-20 pointer-events-none select-none filter blur-[0.4px]">
          <div className="inline-flex items-center gap-2 mb-4 px-4 py-1 rounded-full border border-slate-700 bg-slate-800/40 text-xs text-slate-500 font-mono tracking-widest uppercase">
            <Sparkles className="w-3.5 h-3.5 text-slate-600" />
            <span>PORTFOLIO DISCOVERY 2026</span>
          </div>

          <h1 className="text-4xl sm:text-6xl md:text-7xl font-extrabold tracking-tight text-slate-700 mb-3">
            {personalInfo.name || 'FELIA NADIA FIKARDA'}
          </h1>

          <p className="text-sm sm:text-lg md:text-xl text-slate-600 max-w-xl font-medium mb-6">
            Data Analyst · Front-End · Back-End
          </p>

          <div className="flex flex-wrap items-center justify-center gap-3">
            <span className="px-3 py-1 rounded-full border border-slate-800 bg-slate-900/50 text-xs text-slate-600">
              GPA {personalInfo.gpa || '3.94'}
            </span>
            <span className="px-3 py-1 rounded-full border border-slate-800 bg-slate-900/50 text-xs text-slate-600">
              {personalInfo.studentsMentored || '100+'} Mentored
            </span>
            <span className="px-3 py-1 rounded-full border border-slate-800 bg-slate-900/50 text-xs text-slate-600">
              Python & React
            </span>
          </div>
        </div>

        {/* ========================================================================= */}
        {/* LAYER 2: LUMINOUS REVEAL LAYER (VISIBLE ONLY UNDER SPOTLIGHT BEAM)        */}
        {/* ========================================================================= */}
        <div
          className="absolute inset-0 z-20 flex flex-col items-center justify-center text-center max-w-3xl mx-auto px-6 pointer-events-none select-none"
          style={spotlightMask}
        >
          {/* Glowing Top Pill Badge */}
          <motion.div
            initial={{ scale: 0.9 }}
            animate={{ scale: [0.98, 1.02, 0.98] }}
            transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
            className="inline-flex items-center gap-2 mb-4 px-4 py-1.5 rounded-full border border-sky-400/50 bg-sky-950/70 backdrop-blur-md text-xs font-semibold text-sky-300 shadow-[0_0_25px_rgba(56,189,248,0.5)] uppercase tracking-wider"
          >
            <Sparkles className="w-3.5 h-3.5 text-sky-400 animate-spin" />
            <span>Interactive Spotlight Reveal</span>
          </motion.div>

          {/* Glowing Name Title */}
          <h1 className="text-4xl sm:text-6xl md:text-7xl font-extrabold tracking-tight mb-3 drop-shadow-[0_0_35px_rgba(56,189,248,0.7)]">
            <span className="bg-gradient-to-r from-white via-sky-200 to-cyan-300 bg-clip-text text-transparent">
              {personalInfo.name || 'FELIA NADIA FIKARDA'}
            </span>
          </h1>

          {/* Luminous Subtitle */}
          <p className="text-sm sm:text-lg md:text-xl text-sky-200/90 max-w-xl font-medium mb-6 drop-shadow-[0_0_15px_rgba(56,189,248,0.4)]">
            Data Analyst · Front-End · Back-End
          </p>

          {/* Quick Highlight Chips with Neon Radiance */}
          <div className="flex flex-wrap items-center justify-center gap-3">
            <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-sky-400/40 bg-sky-900/40 backdrop-blur-md text-xs font-bold text-sky-200 shadow-[0_0_15px_rgba(56,189,248,0.3)]">
              <Award className="w-3.5 h-3.5 text-sky-400" />
              <span>GPA {personalInfo.gpa || '3.94'} / 4.00</span>
            </div>

            <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-emerald-400/40 bg-emerald-950/40 backdrop-blur-md text-xs font-bold text-emerald-300 shadow-[0_0_15px_rgba(52,211,153,0.3)]">
              <Users className="w-3.5 h-3.5 text-emerald-400" />
              <span>{personalInfo.studentsMentored || '100+'} Students Mentored</span>
            </div>

            <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-indigo-400/40 bg-indigo-950/40 backdrop-blur-md text-xs font-bold text-indigo-300 shadow-[0_0_15px_rgba(129,140,248,0.3)]">
              <BarChart3 className="w-3.5 h-3.5 text-indigo-400" />
              <span>Informatics Graduate</span>
            </div>
          </div>
        </div>

        {/* ========================================================================= */}
        {/* INTERACTIVE FLASHLIGHT CURSOR RING & RETICLE                               */}
        {/* ========================================================================= */}
        <div
          className="absolute w-12 h-12 -translate-x-1/2 -translate-y-1/2 rounded-full border border-sky-300/40 pointer-events-none z-30 transition-transform duration-75 ease-out shadow-[0_0_20px_rgba(56,189,248,0.5)]"
          style={{ left: `${pos.x}px`, top: `${pos.y}px` }}
        >
          {/* Center luminous flashlight emitter core */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-2.5 h-2.5 rounded-full bg-sky-200 shadow-[0_0_10px_#38bdf8]" />
        </div>

        {/* ========================================================================= */}
        {/* BOTTOM INTERACTIVE DOCK & PROGRESS BAR                                     */}
        {/* ========================================================================= */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-40 flex flex-col items-center gap-3 w-full max-w-sm px-6">
          {/* Flashlight Navigation Instruction & Enter Button */}
          <button
            onClick={triggerExplosion}
            className="group flex items-center gap-2 px-5 py-2 rounded-full border border-sky-400/30 bg-slate-900/70 backdrop-blur-md text-xs font-semibold text-sky-200 shadow-[0_0_25px_rgba(56,189,248,0.2)] hover:bg-sky-500/20 hover:border-sky-400 hover:text-white transition-all cursor-pointer"
          >
            <Flashlight className="w-3.5 h-3.5 text-sky-400 animate-pulse group-hover:scale-110 transition-transform" />
            <span>Gerakkan senter untuk menyingkap · Klik untuk Masuk</span>
          </button>

          {/* Glowing Auto-transition Progress Bar */}
          <div className="w-full h-1.5 bg-slate-800/80 rounded-full overflow-hidden p-0.5 border border-sky-500/20 shadow-inner">
            <motion.div
              className="h-full rounded-full bg-gradient-to-r from-sky-500 via-cyan-400 to-emerald-400 shadow-[0_0_12px_#38bdf8]"
              style={{ width: `${progress}%` }}
              transition={{ ease: 'linear' }}
            />
          </div>
        </div>

        {/* ========================================================================= */}
        {/* LIGHT EXPLOSION TRANSITION EFFECT                                         */}
        {/* ========================================================================= */}
        {isExploding && (
          <div className="absolute inset-0 pointer-events-none z-50 overflow-hidden flex items-center justify-center">
            {/* 1. Exploding Central Light Shockwave */}
            <motion.div
              initial={{ scale: 0.1, opacity: 0.9 }}
              animate={{ scale: 35, opacity: 0 }}
              transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
              className="absolute w-40 h-40 rounded-full bg-gradient-to-r from-white via-sky-300 to-cyan-400 blur-md shadow-[0_0_100px_white]"
              style={{ left: `calc(${pos.x}px - 80px)`, top: `calc(${pos.y}px - 80px)` }}
            />

            {/* 2. Expanding Radiant Ring 1 */}
            <motion.div
              initial={{ scale: 0.2, opacity: 1, borderWidth: 16 }}
              animate={{ scale: 30, opacity: 0, borderWidth: 0 }}
              transition={{ duration: 0.85, ease: 'easeOut' }}
              className="absolute w-32 h-32 rounded-full border-sky-200"
              style={{ left: `calc(${pos.x}px - 64px)`, top: `calc(${pos.y}px - 64px)` }}
            />

            {/* 3. Blinding Fullscreen White/Cyan Bloom Flash */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: [0, 1, 1, 0] }}
              transition={{ duration: 0.8, times: [0, 0.25, 0.5, 1], ease: 'easeInOut' }}
              className="absolute inset-0 bg-gradient-to-br from-white via-sky-100 to-cyan-200"
            />
          </div>
        )}
      </motion.div>
    </AnimatePresence>
  );
}
