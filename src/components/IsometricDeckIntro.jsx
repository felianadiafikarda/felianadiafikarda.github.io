import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { personalInfo } from '../data/portfolioData';

/**
 * IsometricDeckIntro - Adaptive Light/Dark Mode 3D Card Deck Unfold
 * Clean, tactile, authentic cards with high-contrast day and dark modes.
 */
export default function IsometricDeckIntro({ onComplete, isDark: isDarkProp }) {
  const [unfolded, setUnfolded] = useState(false);
  const [isExiting, setIsExiting] = useState(false);
  const [isFinished, setIsFinished] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  // Synchronize theme with prop, document class, or localStorage
  const [isDark, setIsDark] = useState(() => {
    if (typeof isDarkProp === 'boolean') return isDarkProp;
    const saved = localStorage.getItem('felia-theme');
    if (saved) return saved === 'dark';
    return document.documentElement.classList.contains('dark');
  });

  useEffect(() => {
    if (typeof isDarkProp === 'boolean') {
      setIsDark(isDarkProp);
    }
  }, [isDarkProp]);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  useEffect(() => {
    document.body.style.overflow = 'hidden';

    // 1. Unfold cards naturally after 1s
    const tUnfold = setTimeout(() => {
      setUnfolded(true);
    }, 1000);

    // 2. Smoothly transition into page
    const tExit = setTimeout(() => {
      setIsExiting(true);
    }, 2400);

    // 3. Complete and unmount
    const tDone = setTimeout(() => {
      finish();
    }, 2950);

    return () => {
      clearTimeout(tUnfold);
      clearTimeout(tExit);
      clearTimeout(tDone);
      document.body.style.overflow = 'unset';
    };
  }, []);

  const finish = () => {
    setIsFinished(true);
    document.body.style.overflow = 'unset';
    if (onComplete) onComplete();
  };

  const handleSkip = () => {
    setIsExiting(true);
    setTimeout(finish, 250);
  };

  if (isFinished) return null;

  // Responsive spread positions when unfolded
  const cardSpread = isMobile
    ? [
        { x: 0, y: -160, rot: -3, scale: 0.88 },
        { x: 0, y: -50, rot: 2, scale: 0.9 },
        { x: 0, y: 60, rot: -2, scale: 0.92 },
        { x: 0, y: 170, rot: 1, scale: 0.94 },
      ]
    : [
        { x: -210, y: -125, rot: -4, scale: 0.95 },
        { x: 210, y: -125, rot: 4, scale: 0.95 },
        { x: -210, y: 125, rot: -2, scale: 0.95 },
        { x: 210, y: 125, rot: 2, scale: 0.95 },
      ];

  // Theme-aware styles
  const cardContainerClass = isDark
    ? 'border border-white/10 bg-[#0E121D]/90 shadow-[0_16px_36px_rgba(0,0,0,0.4)]'
    : 'border border-slate-200/90 bg-white/95 shadow-[0_18px_40px_rgba(20,35,65,0.08),0_2px_8px_rgba(20,35,65,0.04)]';

  const subtextClass = isDark ? 'text-slate-400' : 'text-slate-500';
  const borderDividerClass = isDark ? 'border-white/5' : 'border-slate-100';

  return (
    <AnimatePresence>
      <motion.div
        className={`fixed inset-0 z-[100] flex items-center justify-center select-none overflow-hidden font-body transition-colors duration-300 ${
          isDark ? 'bg-[#07090E] text-slate-100' : 'bg-[#F6F8FC] text-slate-800'
        }`}
        initial={{ opacity: 1 }}
        animate={isExiting ? { opacity: 0, scale: 1.03 } : { opacity: 1, scale: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
      >
        {/* Subtle, restrained background glow */}
        <div
          className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[540px] h-[540px] rounded-full blur-[140px] pointer-events-none transition-colors duration-300 ${
            isDark ? 'bg-sky-900/15' : 'bg-sky-200/60'
          }`}
        />

        {/* Minimal Skip button */}
        <button
          onClick={handleSkip}
          className={`absolute top-6 right-6 z-50 text-xs px-3.5 py-1.5 rounded-full border backdrop-blur-md transition-all cursor-pointer ${
            isDark
              ? 'text-slate-400 hover:text-white border-white/10 bg-white/[0.03] hover:bg-white/10'
              : 'text-slate-600 hover:text-slate-900 border-slate-300/80 bg-white/80 hover:bg-white shadow-sm'
          }`}
        >
          Lewati
        </button>

        {/* 3D Perspective Canvas */}
        <div
          className="relative flex items-center justify-center w-full h-full"
          style={{ perspective: 1200 }}
        >
          {/* Deck Container */}
          <motion.div
            className="relative flex items-center justify-center"
            style={{ transformStyle: 'preserve-3d' }}
            animate={
              unfolded
                ? { rotateX: 0, rotateZ: 0, rotateY: 0, y: 0 }
                : { rotateX: 38, rotateZ: -20, rotateY: 12, y: -10 }
            }
            transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
          >
            {/* Ambient ground shadow */}
            <motion.div
              className={`absolute w-[290px] h-[170px] rounded-3xl blur-2xl pointer-events-none ${
                isDark ? 'bg-black/60' : 'bg-slate-400/25'
              }`}
              animate={unfolded ? { opacity: 0, scale: 1.5 } : { opacity: 0.5, scale: 1, y: 60 }}
              transition={{ duration: 0.8 }}
            />

            {/* ============================================================= */}
            {/* CARD 1: IDENTITY & PROFILE                                    */}
            {/* ============================================================= */}
            <motion.div
              style={{ transformStyle: 'preserve-3d' }}
              animate={
                unfolded
                  ? {
                      x: cardSpread[0].x,
                      y: cardSpread[0].y,
                      rotateZ: cardSpread[0].rot,
                      scale: cardSpread[0].scale,
                      z: 0,
                    }
                  : { x: 0, y: -24, rotateZ: 0, scale: 1, z: 75 }
              }
              transition={{ duration: 0.85, ease: [0.16, 1, 0.3, 1] }}
              className={`absolute w-[290px] sm:w-[320px] h-[165px] rounded-2xl p-5 backdrop-blur-xl flex flex-col justify-between transition-colors duration-300 ${cardContainerClass}`}
            >
              <div className={`flex items-center justify-between text-[11px] font-medium ${subtextClass}`}>
                <span className={isDark ? 'text-slate-300' : 'text-slate-700'}>Portfolio</span>
                <span>2026</span>
              </div>

              <div className="flex items-center gap-3.5 my-auto">
                <img
                  src={personalInfo.profileImg || '/profile.JPEG'}
                  alt={personalInfo.name}
                  className={`w-11 h-11 rounded-full object-cover shadow-sm ${
                    isDark ? 'border border-white/15' : 'border border-slate-200'
                  }`}
                />
                <div>
                  <h3
                    className={`font-display font-semibold text-sm tracking-tight ${
                      isDark ? 'text-white' : 'text-slate-900'
                    }`}
                  >
                    {personalInfo.name}
                  </h3>
                  <p
                    className={`text-xs font-medium mt-0.5 ${
                      isDark ? 'text-sky-300' : 'text-sky-600'
                    }`}
                  >
                    Data Analyst & Web Developer
                  </p>
                </div>
              </div>

              <div
                className={`text-[11px] border-t pt-2 flex items-center justify-between ${borderDividerClass} ${subtextClass}`}
              >
                <span>Informatics · UAD</span>
                <span className={isDark ? 'text-slate-500' : 'text-slate-400'}>Yogyakarta</span>
              </div>
            </motion.div>

            {/* ============================================================= */}
            {/* CARD 2: ACADEMIC & STATS                                      */}
            {/* ============================================================= */}
            <motion.div
              style={{ transformStyle: 'preserve-3d' }}
              animate={
                unfolded
                  ? {
                      x: cardSpread[1].x,
                      y: cardSpread[1].y,
                      rotateZ: cardSpread[1].rot,
                      scale: cardSpread[1].scale,
                      z: 0,
                    }
                  : { x: 0, y: -8, rotateZ: 0, scale: 1, z: 50 }
              }
              transition={{ duration: 0.85, delay: 0.04, ease: [0.16, 1, 0.3, 1] }}
              className={`absolute w-[290px] sm:w-[320px] h-[165px] rounded-2xl p-5 backdrop-blur-xl flex flex-col justify-between transition-colors duration-300 ${cardContainerClass}`}
            >
              <div className={`flex items-center justify-between text-[11px] font-medium ${subtextClass}`}>
                <span>Education & Experience</span>
                <span className={`font-mono ${isDark ? 'text-emerald-400' : 'text-emerald-600 font-semibold'}`}>
                  Honors
                </span>
              </div>

              <div className="grid grid-cols-2 gap-3 my-auto">
                <div
                  className={`p-2.5 rounded-xl border ${
                    isDark
                      ? 'bg-white/[0.02] border-white/5'
                      : 'bg-slate-50 border-slate-200/60'
                  }`}
                >
                  <span className={`text-[10px] block ${subtextClass}`}>Cumulative GPA</span>
                  <div className="flex items-baseline gap-1 mt-0.5">
                    <span
                      className={`text-xl font-bold font-mono ${
                        isDark ? 'text-white' : 'text-slate-900'
                      }`}
                    >
                      {personalInfo.gpa}
                    </span>
                    <span className={`text-[11px] ${subtextClass}`}>/ 4.00</span>
                  </div>
                </div>

                <div
                  className={`p-2.5 rounded-xl border ${
                    isDark
                      ? 'bg-white/[0.02] border-white/5'
                      : 'bg-slate-50 border-slate-200/60'
                  }`}
                >
                  <span className={`text-[10px] block ${subtextClass}`}>Lab Assistant</span>
                  <div className="flex items-baseline gap-1 mt-0.5">
                    <span
                      className={`text-xl font-bold font-mono ${
                        isDark ? 'text-emerald-300' : 'text-emerald-600'
                      }`}
                    >
                      100+
                    </span>
                    <span className={`text-[11px] ${subtextClass}`}>Students</span>
                  </div>
                </div>
              </div>

              <div className={`text-[11px] border-t pt-2 ${borderDividerClass} ${subtextClass}`}>
                Informatics Laboratory UAD
              </div>
            </motion.div>

            {/* ============================================================= */}
            {/* CARD 3: RESEARCH & PROJECTS                                   */}
            {/* ============================================================= */}
            <motion.div
              style={{ transformStyle: 'preserve-3d' }}
              animate={
                unfolded
                  ? {
                      x: cardSpread[2].x,
                      y: cardSpread[2].y,
                      rotateZ: cardSpread[2].rot,
                      scale: cardSpread[2].scale,
                      z: 0,
                    }
                  : { x: 0, y: 8, rotateZ: 0, scale: 1, z: 25 }
              }
              transition={{ duration: 0.85, delay: 0.08, ease: [0.16, 1, 0.3, 1] }}
              className={`absolute w-[290px] sm:w-[320px] h-[165px] rounded-2xl p-5 backdrop-blur-xl flex flex-col justify-between transition-colors duration-300 ${cardContainerClass}`}
            >
              <div className={`flex items-center justify-between text-[11px] font-medium ${subtextClass}`}>
                <span>Research & Projects</span>
                <span className={isDark ? 'text-slate-500' : 'text-slate-400'}>Featured</span>
              </div>

              <div className="my-auto">
                <h4
                  className={`font-semibold text-xs leading-snug ${
                    isDark ? 'text-white' : 'text-slate-900'
                  }`}
                >
                  Aspect-Based Sentiment Analysis
                </h4>
                <p
                  className={`text-[11px] mt-1 line-clamp-2 leading-relaxed ${
                    isDark ? 'text-slate-400' : 'text-slate-600'
                  }`}
                >
                  Aspect-based sentiment classification on tourist destinations and full-stack backend systems.
                </p>
              </div>

              <div
                className={`flex items-center gap-1.5 border-t pt-2 text-[10px] ${borderDividerClass} ${
                  isDark ? 'text-slate-400' : 'text-slate-600'
                }`}
              >
                <span
                  className={`px-1.5 py-0.5 rounded border ${
                    isDark ? 'bg-white/5 border-white/5' : 'bg-slate-100 border-slate-200'
                  }`}
                >
                  Python
                </span>
                <span
                  className={`px-1.5 py-0.5 rounded border ${
                    isDark ? 'bg-white/5 border-white/5' : 'bg-slate-100 border-slate-200'
                  }`}
                >
                  Laravel
                </span>
                <span
                  className={`px-1.5 py-0.5 rounded border ${
                    isDark ? 'bg-white/5 border-white/5' : 'bg-slate-100 border-slate-200'
                  }`}
                >
                  MySQL
                </span>
              </div>
            </motion.div>

            {/* ============================================================= */}
            {/* CARD 4: CORE CAPABILITIES                                     */}
            {/* ============================================================= */}
            <motion.div
              style={{ transformStyle: 'preserve-3d' }}
              animate={
                unfolded
                  ? {
                      x: cardSpread[3].x,
                      y: cardSpread[3].y,
                      rotateZ: cardSpread[3].rot,
                      scale: cardSpread[3].scale,
                      z: 0,
                    }
                  : { x: 0, y: 24, rotateZ: 0, scale: 1, z: 0 }
              }
              transition={{ duration: 0.85, delay: 0.12, ease: [0.16, 1, 0.3, 1] }}
              className={`absolute w-[290px] sm:w-[320px] h-[165px] rounded-2xl p-5 backdrop-blur-xl flex flex-col justify-between transition-colors duration-300 ${cardContainerClass}`}
            >
              <div className={`flex items-center justify-between text-[11px] font-medium ${subtextClass}`}>
                <span>Technical Competencies</span>
                <span className={`font-mono ${isDark ? 'text-sky-400' : 'text-sky-600 font-semibold'}`}>
                  Tools
                </span>
              </div>

              <div className="space-y-1.5 my-auto text-[11px]">
                <div className="flex items-center justify-between">
                  <span className={subtextClass}>Data Analytics</span>
                  <span className={`font-medium ${isDark ? 'text-slate-200' : 'text-slate-800'}`}>
                    Python · Pandas · SQL
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className={subtextClass}>Web Development</span>
                  <span className={`font-medium ${isDark ? 'text-slate-200' : 'text-slate-800'}`}>
                    React · Laravel · Tailwind
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className={subtextClass}>Databases</span>
                  <span className={`font-medium ${isDark ? 'text-slate-200' : 'text-slate-800'}`}>
                    MySQL · Database Design
                  </span>
                </div>
              </div>

              <div
                className={`text-[11px] font-medium border-t pt-2 flex items-center gap-1.5 ${borderDividerClass} ${
                  isDark ? 'text-emerald-400' : 'text-emerald-600'
                }`}
              >
                <span
                  className={`w-1.5 h-1.5 rounded-full ${
                    isDark ? 'bg-emerald-400' : 'bg-emerald-500'
                  }`}
                />
                <span>Open for work opportunities</span>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
