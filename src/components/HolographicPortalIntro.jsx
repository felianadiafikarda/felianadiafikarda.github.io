import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, Sparkles, Award, Users, BarChart2, Code2 } from 'lucide-react';
import { personalInfo } from '../data/portfolioData';

export default function HolographicPortalIntro({ onComplete }) {
  const [counter, setCounter] = useState(0);
  const [portalUnfold, setPortalUnfold] = useState(false);
  const [isFinished, setIsFinished] = useState(false);

  // 1. Lock scrollbar & run counter (0% -> 100% in ~2.2s)
  useEffect(() => {
    document.body.style.overflow = 'hidden';

    const duration = 2200;
    const startTime = Date.now();

    const interval = setInterval(() => {
      const elapsed = Date.now() - startTime;
      const progress = Math.min(100, Math.floor((elapsed / duration) * 100));
      setCounter(progress);

      if (progress >= 100) {
        clearInterval(interval);
        setTimeout(() => {
          setPortalUnfold(true);
        }, 200);

        setTimeout(() => {
          finishIntro();
        }, 950);
      }
    }, 25);

    return () => clearInterval(interval);
  }, []);

  const skipIntro = () => {
    setCounter(100);
    setPortalUnfold(true);
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
        className="fixed inset-0 z-[100] flex items-center justify-center bg-[#070914] text-white font-body select-none overflow-hidden"
        initial={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.4 }}
      >
        {/* Ambient Holographic Blur Glows */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] rounded-full bg-gradient-to-tr from-[#0369A1]/35 via-sky-400/25 to-emerald-500/25 blur-[160px] pointer-events-none" />

        {/* Top-Right Glassmorphism Skip Button */}
        <motion.button
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          onClick={skipIntro}
          className="absolute top-6 right-6 z-50 flex items-center gap-2 px-4 py-2 rounded-full border border-white/15 bg-white/5 backdrop-blur-md text-xs font-semibold text-[#7DD3FC] shadow-lg transition hover:bg-white/15 hover:border-[#7DD3FC] hover:scale-105"
        >
          <span>Skip Intro</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </motion.button>

        {/* ========================================================================= */}
        {/* CIRCULAR PORTAL APERTURE MASK UNFOLD TRANSITION (Middle out to full screen) */}
        {/* ========================================================================= */}
        <motion.div
          className="absolute inset-0 bg-[#070914] z-30 pointer-events-none"
          initial={{ clipPath: 'circle(150% at 50% 50%)' }}
          animate={portalUnfold ? { clipPath: 'circle(0% at 50% 50%)' } : { clipPath: 'circle(150% at 50% 50%)' }}
          transition={{ duration: 0.9, ease: [0.77, 0, 0.175, 1] }}
        />

        {/* Center Container: 3D Holographic Geometry Rings & Stats */}
        <div className="relative z-20 flex flex-col items-center justify-center text-center max-w-2xl px-4">
          
          {/* Holographic 3D Geometry Ring Cluster */}
          <div className="relative flex items-center justify-center w-72 h-72 sm:w-96 sm:h-96 mb-6">
            
            {/* Outer Rotating Dashed Ring */}
            <motion.div
              className="absolute inset-0 rounded-full border-2 border-dashed border-sky-400/40"
              animate={{ rotate: 360 }}
              transition={{ duration: 16, ease: "linear", repeat: Infinity }}
            />

            {/* Middle Rotating Geometric Accent Ring */}
            <motion.div
              className="absolute inset-5 rounded-full border border-emerald-400/30"
              animate={{ rotate: -360 }}
              transition={{ duration: 12, ease: "linear", repeat: Infinity }}
            />

            {/* Inner Pulsing Holographic Ring Aura */}
            <motion.div
              className="absolute inset-10 rounded-full border-2 border-sky-500/50 shadow-[0_0_40px_rgba(125,211,252,0.4)]"
              animate={{ scale: [0.95, 1.05, 0.95] }}
              transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
            />

            {/* DYNAMIC FLOATING SHORT STATISTIC CHIPS */}
            {/* Stat 1: GPA */}
            <motion.div 
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="absolute -top-3 left-1/2 -translate-x-1/2 flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-sky-400/30 bg-[#0A0D1D]/90 backdrop-blur-md text-[11px] font-bold text-[#7DD3FC] shadow-xl"
            >
              <Award className="w-3.5 h-3.5 text-sky-400" />
              <span>GPA {personalInfo.gpa}</span>
            </motion.div>

            {/* Stat 2: Mentored */}
            <motion.div 
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="absolute top-1/2 -right-6 -translate-y-1/2 flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-emerald-400/30 bg-[#0A0D1D]/90 backdrop-blur-md text-[11px] font-bold text-emerald-400 shadow-xl"
            >
              <Users className="w-3.5 h-3.5" />
              <span>{personalInfo.studentsMentored} MENTORED</span>
            </motion.div>

            {/* Stat 3: Data Analytics */}
            <motion.div 
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.7 }}
              className="absolute -bottom-3 left-1/2 -translate-x-1/2 flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-purple-400/30 bg-[#0A0D1D]/90 backdrop-blur-md text-[11px] font-bold text-purple-300 shadow-xl"
            >
              <BarChart2 className="w-3.5 h-3.5" />
              <span>DATA ANALYST</span>
            </motion.div>

            {/* Stat 4: Web Developer */}
            <motion.div 
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.9 }}
              className="absolute top-1/2 -left-6 -translate-y-1/2 flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-amber-400/30 bg-[#0A0D1D]/90 backdrop-blur-md text-[11px] font-bold text-amber-300 shadow-xl"
            >
              <Code2 className="w-3.5 h-3.5" />
              <span>WEB DEVELOPER</span>
            </motion.div>

            {/* Center Photo / Name Core */}
            <div className="relative z-10 flex flex-col items-center justify-center p-4">
              <div className="h-20 w-20 sm:h-24 sm:w-24 rounded-full overflow-hidden p-1 bg-gradient-to-tr from-sky-400 via-white to-emerald-400 shadow-[0_0_30px_rgba(3,105,161,0.6)] mb-2">
                <img src={personalInfo.profileImg} alt={personalInfo.name} className="h-full w-full rounded-full object-cover" />
              </div>
              <span className="font-display text-xs font-extrabold uppercase tracking-widest text-[#7DD3FC]">
                PORTFOLIO 2026
              </span>
            </div>

          </div>

          {/* Sparkle Tag */}
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 mb-2 px-4 py-1 rounded-full border border-sky-400/30 bg-sky-500/10 backdrop-blur-md text-xs font-semibold text-[#7DD3FC]"
          >
            <Sparkles className="w-3.5 h-3.5 text-sky-400 animate-spin" />
            <span>HOLOGRAPHIC GEOMETRY</span>
          </motion.div>

          {/* Main Title Name */}
          <motion.h1 
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            className="font-display text-3xl sm:text-5xl font-extrabold tracking-tight text-white mb-4 drop-shadow-[0_0_30px_rgba(125,211,252,0.5)]"
          >
            <span className="bg-gradient-to-r from-white via-slate-100 to-sky-200 bg-clip-text text-transparent">
              {personalInfo.name}
            </span>
          </motion.h1>

          {/* Percentage Counter Display & Progress Line */}
          <div className="w-56 sm:w-64 space-y-1.5">
            <div className="flex items-center justify-between text-xs font-mono font-bold text-slate-400 px-1">
              <span>UNFOLDING PORTAL</span>
              <span className="text-sky-400 font-bold">{counter}%</span>
            </div>

            <div className="h-2 w-full bg-slate-800/90 rounded-full overflow-hidden p-0.5 border border-sky-500/20">
              <motion.div 
                className="h-full rounded-full bg-gradient-to-r from-[#0369A1] via-[#7DD3FC] to-emerald-400 shadow-[0_0_15px_#7DD3FC]"
                style={{ width: `${counter}%` }}
                transition={{ ease: "easeOut" }}
              />
            </div>
          </div>

        </div>

      </motion.div>
    </AnimatePresence>
  );
}
