import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { Sparkles, ShieldCheck } from 'lucide-react';
import { personalInfo } from '../data/portfolioData';

/**
 * Realistic ID Card Badge Holder Component
 * 
 * Specifications:
 * 1. Scroll Unrolling Animation:
 *    - Paper scroll unfurling / unrolling downward from top (clip-path: inset(0 0 100% 0) -> inset(0 0 0 0) with 3D perspective)
 *    - Synchronized rolling cylinder curl edge moving top-to-bottom and dissolving on completion
 *    - Triggers strictly ONCE with delay only after the website intro completes (no looping)
 * 2. Card Background Colors:
 *    - Light Mode: Solid light gray (bg-[#E5E7EB] / border-slate-300)
 *    - Dark Mode: Solid dark gray (dark:bg-[#1E2333] / dark:border-slate-700)
 * 3. Preserved Features:
 *    - Organic curved lanyard anchored seamlessly to the top navbar
 *    - Light Mode lanyard: Solid Navy blue
 *    - Dark Mode lanyard: Soft light silver/gray gradient (white to silver-gray)
 *    - Scaled-down proportional card dimensions and compact internal layout
 */
export default function IdCardBadge({ isIntroDone = false }) {
  const [hasStarted, setHasStarted] = useState(false);
  const containerRef = useRef(null);
  const [strapHeight, setStrapHeight] = useState(190);

  // Synchronize dark mode state reactively with document.documentElement.classList
  const [isDark, setIsDark] = useState(() => {
    if (typeof document !== 'undefined') {
      return document.documentElement.classList.contains('dark');
    }
    return false;
  });

  useEffect(() => {
    const checkDark = () => {
      setIsDark(document.documentElement.classList.contains('dark'));
    };
    checkDark();
    const observer = new MutationObserver(checkDark);
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['class'],
    });
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (isIntroDone) {
      setHasStarted(true);
    }
  }, [isIntroDone]);

  // Fallback timer: in case isIntroDone is not passed or if intro was skipped / standalone
  useEffect(() => {
    const fallbackTimer = setTimeout(() => {
      setHasStarted(true);
    }, 3100);
    return () => clearTimeout(fallbackTimer);
  }, []);

  // Calculate dynamic lanyard strap height to anchor directly to top navbar (desktop) or behind stats grid (mobile)
  useEffect(() => {
    const updateLanyardAnchor = () => {
      if (!containerRef.current) return;
      if (typeof window !== 'undefined' && window.innerWidth < 1024) {
        // On mobile / stacked view, anchor strap behind the stats grid
        const statsEl = document.querySelector('#hero-stats-grid');
        if (statsEl) {
          const statsRect = statsEl.getBoundingClientRect();
          const containerRect = containerRef.current.getBoundingClientRect();
          const clampRestY = containerRect.top + (window.innerWidth >= 768 ? 64 : 24);
          const targetY = statsRect.top + Math.min(statsRect.height * 0.45, 60);
          const calculatedHeight = Math.max(140, Math.round(clampRestY - targetY));
          setStrapHeight(calculatedHeight);
          return;
        }
        setStrapHeight(170);
        return;
      }

      const header = document.querySelector('header');
      const headerBottom = header ? header.getBoundingClientRect().bottom : 64;
      const containerRect = containerRef.current.getBoundingClientRect();
      
      // The metallic clamp sits at the top of the card case inside the wrapper container.
      // Top padding of wrapper is md:pt-16 (64px), clamp is positioned right at that boundary.
      const clampRestY = containerRect.top + 64;
      const calculatedHeight = Math.max(130, Math.round(clampRestY - headerBottom));
      setStrapHeight(calculatedHeight);
    };

    updateLanyardAnchor();
    window.addEventListener('resize', updateLanyardAnchor);

    // Recheck after initial font/layout render
    const timer = setTimeout(updateLanyardAnchor, 250);

    return () => {
      window.removeEventListener('resize', updateLanyardAnchor);
      clearTimeout(timer);
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="relative w-full max-w-[270px] sm:max-w-[290px] mx-auto pt-6 md:pt-16 pb-2 overflow-visible"
    >
      {/* ─── ENTIRE ID CARD ASSEMBLY (Lanyard + Metallic Clamp + Glass Plastic Casing + Card) ─── */}
      <div className="relative w-full flex flex-col items-center overflow-visible">
        {/* ── 1. DYNAMIC ORGANIC ADAPTIVE LANYARD (Visible on all screens, behind stats cards on mobile) ── */}
        <motion.div
          initial={{ scaleY: 0, opacity: 0 }}
          animate={hasStarted ? { scaleY: 1, opacity: 1 } : { scaleY: 0, opacity: 0 }}
          transition={{
            duration: 0.35,
            ease: [0.16, 1, 0.3, 1],
            delay: 0.05,
          }}
          style={{
            height: `${strapHeight}px`,
            top: `-${strapHeight}px`,
            transformOrigin: 'top center',
          }}
          className="flex absolute inset-x-0 mx-auto w-40 z-0 pointer-events-none flex-col items-center overflow-visible origin-top"
        >
          {/* Top Navbar Anchor Flange (physically grounding the strap flush against navbar edge on desktop) */}
          <div
            className={`w-7 h-1.5 rounded-b-xs border-x border-b shadow-xs z-30 transition-colors duration-300 hidden lg:block ${
              isDark
                ? 'bg-gradient-to-r from-slate-200 via-white to-slate-300 border-slate-300/80'
                : 'bg-gradient-to-r from-slate-700 via-slate-500 to-slate-800 border-slate-700/80'
            }`}
          />

          {/* SVG Draped Curved Ribbon (starts centered at 80, sways organically, and terminates centered at 80) */}
          <div className="relative w-full flex-1 -mt-0.5 overflow-visible">
            <svg
              viewBox="0 0 160 200"
              preserveAspectRatio="none"
              className="w-full h-full overflow-visible transition-colors duration-300"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <defs>
                {/* Light Mode: Solid Navy Blue */}
                <linearGradient id="lanyardNavySolid" x1="0%" y1="0%" x2="0%" y2="100%">
                  <stop offset="0%" stopColor="#0f172a" />
                  <stop offset="100%" stopColor="#0f172a" />
                </linearGradient>

                {/* Dark Mode: Soft Light Silver/Gray Gradient (White to light silver-gray) */}
                <linearGradient id="lanyardSilverGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#ffffff" />
                  <stop offset="30%" stopColor="#f8fafc" />
                  <stop offset="65%" stopColor="#e2e8f0" />
                  <stop offset="100%" stopColor="#cbd5e1" />
                </linearGradient>

                {/* Ambient Soft Drop Shadow for Natural Depth */}
                <filter id="lanyardOrganicShadow" x="-20%" y="-10%" width="150%" height="130%">
                  <feDropShadow
                    dx="0"
                    dy="3"
                    stdDeviation="3"
                    floodColor="#0f172a"
                    floodOpacity={isDark ? 0.45 : 0.25}
                  />
                </filter>

                {/* Fine Textile Crosshatch Weave */}
                <pattern id="lanyardFabricWeave" width="4" height="4" patternUnits="userSpaceOnUse" patternTransform="rotate(45)">
                  <line
                    x1="0"
                    y1="0"
                    x2="0"
                    y2="4"
                    stroke={isDark ? 'rgba(0,0,0,0.06)' : 'rgba(255,255,255,0.12)'}
                    strokeWidth="1"
                  />
                  <line
                    x1="0"
                    y1="0"
                    x2="4"
                    y2="0"
                    stroke={isDark ? 'rgba(0,0,0,0.05)' : 'rgba(0,0,0,0.1)'}
                    strokeWidth="1"
                  />
                </pattern>
              </defs>

              {/* Draped Organic Lanyard Ribbon Group */}
              <g filter="url(#lanyardOrganicShadow)">
                {/* Main Curved Ribbon Body (Starts at 69-91 [center 80], subtle S-curve, ends at 69-91 [center 80]) */}
                <path
                  d="M 69 0 C 60 65, 75 135, 69 200 L 91 200 C 97 135, 82 65, 91 0 Z"
                  fill={isDark ? 'url(#lanyardSilverGrad)' : 'url(#lanyardNavySolid)'}
                  className="transition-all duration-300"
                />

                {/* Fabric Weave Texture Overlay */}
                <path
                  d="M 69 0 C 60 65, 75 135, 69 200 L 91 200 C 97 135, 82 65, 91 0 Z"
                  fill="url(#lanyardFabricWeave)"
                  opacity={isDark ? 0.65 : 0.8}
                />

                {/* Left Edge Stitched Seam */}
                <path
                  d="M 71 0 C 62 65, 77 135, 71 200"
                  stroke={isDark ? '#64748b' : '#60a5fa'}
                  strokeWidth="1.1"
                  strokeDasharray="2.5 2.5"
                  strokeOpacity={isDark ? 0.8 : 0.7}
                  className="transition-colors duration-300"
                />

                {/* Right Edge Stitched Seam */}
                <path
                  d="M 89 0 C 80 65, 95 135, 89 200"
                  stroke={isDark ? '#64748b' : '#60a5fa'}
                  strokeWidth="1.1"
                  strokeDasharray="2.5 2.5"
                  strokeOpacity={isDark ? 0.8 : 0.7}
                  className="transition-colors duration-300"
                />

                {/* Central Specular Highlight Sheen following the organic wave */}
                <path
                  d="M 80 0 C 71 65, 86 135, 80 200"
                  stroke={isDark ? '#ffffff' : 'white'}
                  strokeWidth="1.8"
                  strokeOpacity={isDark ? 0.45 : 0.14}
                />
              </g>
            </svg>
          </div>

          {/* Metal Crimp Band (connecting strap to clip assembly at the bottom) */}
          <div className="w-7 h-2.5 -mt-0.5 rounded-[2px] bg-gradient-to-r from-slate-300 via-white to-slate-400 border border-slate-400/80 shadow-md flex items-center justify-between px-1.5 z-20">
            <span className="w-0.5 h-1.5 bg-slate-500/60 rounded-full" />
            <span className="w-1 h-1 bg-slate-400/70 rounded-xs" />
            <span className="w-0.5 h-1.5 bg-slate-500/60 rounded-full" />
          </div>
        </motion.div>

        {/* ── 2. METALLIC CLAMP & SWIVEL ASSEMBLY (Strictly Centered horizontally over the ID card top slot) ── */}
        <motion.div
          initial={{ opacity: 0, scale: 0.85 }}
          animate={hasStarted ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.85 }}
          transition={{ duration: 0.25, delay: 0.1 }}
          className="relative z-30 flex flex-col items-center -mb-3.5 pointer-events-none"
        >
          {/* Swivel D-Ring Connector */}
          <div className="w-4 h-3 -mb-1 rounded-t-full border-2 border-slate-300 dark:border-slate-500 bg-gradient-to-b from-slate-200 to-slate-400 dark:from-slate-400 dark:to-slate-600 shadow-xs" />

          {/* Polished Chrome Clamp Body */}
          <div className="relative flex flex-col items-center filter drop-shadow-md">
            {/* Clamp upper shell with chrome reflections */}
            <div className="relative w-6 h-[18px] rounded-t-xs bg-gradient-to-b from-slate-100 via-slate-300 to-slate-400 dark:from-slate-200 dark:via-slate-400 dark:to-slate-500 border border-slate-400/80 shadow-inner flex items-center justify-center">
              {/* Highlight sheen along top edge */}
              <div className="absolute top-0 inset-x-0 h-[1.5px] bg-white/90 rounded-t-xs" />

              {/* Metallic center rivet / fastener */}
              <div className="w-1.5 h-1.5 rounded-full bg-gradient-to-br from-slate-400 to-slate-600 border border-slate-300 flex items-center justify-center shadow-xs">
                <div className="w-0.5 h-0.5 rounded-full bg-white/90" />
              </div>
            </div>

            {/* Lower clamp bracket / jaw clipping through the card slot */}
            <div className="relative w-5 h-3 -mt-0.5 rounded-b-xs bg-gradient-to-b from-slate-300 via-slate-200 to-slate-400 dark:from-slate-300 dark:via-slate-400 dark:to-slate-600 border border-slate-400 shadow-sm flex items-center justify-center">
              {/* Horizontal clasp groove */}
              <div className="w-3.5 h-[1px] bg-slate-600/70 rounded-full" />
              <div className="absolute bottom-0 inset-x-0 h-0.5 bg-slate-500/50 rounded-b-xs" />
            </div>
          </div>
        </motion.div>

        {/* ── 3. VERTICAL GLASSMORPHISM ID CARD CASE (Paper Scroll Unrolling Animation) ── */}
        <div className="relative w-full">
          {/* Main Unrolling Card Container */}
          <motion.div
            initial={{
              clipPath: 'inset(0% 0% 100% 0%)',
              opacity: 0,
              rotateX: 12,
            }}
            animate={
              hasStarted
                ? {
                    clipPath: 'inset(0% 0% 0% 0%)',
                    opacity: 1,
                    rotateX: 0,
                  }
                : {
                    clipPath: 'inset(0% 0% 100% 0%)',
                    opacity: 0,
                    rotateX: 12,
                  }
            }
            whileHover={{ y: -3, transition: { duration: 0.25 } }}
            transition={{
              duration: 0.85,
              ease: [0.16, 1, 0.3, 1],
              delay: 0.15,
            }}
            style={{
              transformOrigin: 'top center',
              transformPerspective: 1000,
            }}
            className="group relative w-full origin-top rounded-[20px] border border-white/70 dark:border-white/15 bg-slate-200/65 dark:bg-slate-900/65 backdrop-blur-xl p-2 shadow-[0_20px_50px_-12px_rgba(15,23,42,0.18)] dark:shadow-[0_25px_60px_-15px_rgba(0,0,0,0.7)] transition-all duration-300 hover:shadow-sky-500/15"
          >
            {/* Header Tab with Slot Punch Holes */}
            <div className="relative w-full h-7 mb-1 flex items-center justify-center border-b border-slate-300/60 dark:border-white/10">
              {/* Centered Horizontal Oval Slot (where clamp anchors) */}
              <div className="relative w-10 h-2.5 rounded-full bg-slate-400/40 dark:bg-black/60 border border-slate-400/60 dark:border-white/15 shadow-inner flex items-center justify-center">
                <div className="w-8 h-1 rounded-full bg-slate-500/50 dark:bg-black/80" />
              </div>

              {/* Left & Right Companion Chain Holes */}
              <div className="absolute left-5 w-2 h-2 rounded-full bg-slate-400/40 dark:bg-black/60 border border-slate-400/50 dark:border-white/15 shadow-inner" />
              <div className="absolute right-5 w-2 h-2 rounded-full bg-slate-400/40 dark:bg-black/60 border border-slate-400/50 dark:border-white/15 shadow-inner" />

              {/* Semicircular Thumb Notch at top of card slot */}
              <div className="absolute -bottom-1 inset-x-0 mx-auto w-5 h-1.5 rounded-b-full bg-slate-300/70 dark:bg-slate-800/70 backdrop-blur-sm border-b border-slate-400/40 dark:border-white/10" />
            </div>

            {/* ── 4. INTERIOR ID CARD INSERT ── */}
            <div className="relative aspect-[3/4.2] w-full overflow-hidden rounded-lg bg-slate-950 shadow-inner">
              {/* Scaled Profile Photo */}
              <img
                src={personalInfo.profileImg}
                alt={personalInfo.name}
                className="h-full w-full object-cover object-top filter brightness-[0.98] contrast-[1.03] transition-transform duration-700 ease-out group-hover:scale-105"
              />

              {/* Card Header: Institutional Badge & Holographic Security Foil */}
              <div className="absolute top-2 inset-x-2 flex items-center justify-between z-10">
                {/* University Department Pill */}
                <div className="flex items-center gap-1.5 rounded-full bg-slate-950/75 border border-white/20 px-2 py-0.5 backdrop-blur-md shadow-md">
                  <span className="relative flex h-1.5 w-1.5">
                    <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
                    <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-emerald-500" />
                  </span>
                  <span className="text-[9px] font-bold tracking-wider uppercase text-emerald-300">
                    UAD Informatics
                  </span>
                </div>

                {/* Holographic Security Microchip */}
                <div className="relative flex items-center gap-1 rounded bg-gradient-to-br from-amber-200 via-yellow-100 to-amber-500 border border-amber-400/80 px-1 py-0.5 shadow-sm">
                  <div className="w-1 h-1 rounded-full bg-amber-700/60" />
                  <span className="text-[8px] font-mono font-black text-amber-950 tracking-tighter">
                    PASS
                  </span>
                </div>
              </div>

              {/* Bottom Dark Gradient for Text Contrast */}
              <div className="absolute inset-x-0 bottom-0 h-36 bg-gradient-to-t from-slate-950/95 via-slate-950/60 to-transparent pointer-events-none" />

              {/* ── DARK FROSTED GLASS DETAILS PANEL ── */}
              <div className="absolute bottom-2 inset-x-2 z-10 rounded-lg bg-slate-950/75 backdrop-blur-md border border-white/15 p-2.5 shadow-lg">
                {/* Candidate Name & Shield Icon */}
                <div className="flex items-center justify-between gap-1 mb-0.5">
                  <div className="text-xs sm:text-sm font-bold text-white tracking-tight leading-tight">
                    {personalInfo.name}
                  </div>
                  <ShieldCheck className="h-3.5 w-3.5 text-sky-400 flex-shrink-0" />
                </div>

                {/* Role / Badge Tag */}
                <div className="mb-1.5">
                  <span className="inline-flex items-center gap-1 rounded bg-sky-500/20 border border-sky-400/30 px-1.5 py-0.5 text-[8.5px] font-semibold text-sky-300">
                    <Sparkles className="h-2 w-2" />
                    Web and Software Developer, Data Analyst & QA
                  </span>
                </div>

                {/* Academic Honours & Mini Barcode Strip */}
                <div className="pt-1.5 border-t border-white/10 flex items-center justify-between text-[8.5px] text-slate-400 font-mono">
                  <div>
                    <span>GPA: </span>
                    <span className="font-bold text-emerald-400">{personalInfo.gpa}</span>
                    <span className="text-slate-500"> / 4.00</span>
                  </div>
                  
                  {/* Barcode Graphic */}
                  <div className="flex items-center gap-[1.5px] opacity-80" title="FNF-2026-UAD">
                    <span className="w-[1px] h-3 bg-white" />
                    <span className="w-[2.5px] h-3 bg-white" />
                    <span className="w-[1px] h-3 bg-white" />
                    <span className="w-[1.5px] h-3 bg-white" />
                    <span className="w-[1px] h-3 bg-white" />
                    <span className="w-[2.5px] h-3 bg-white" />
                    <span className="w-[1.5px] h-3 bg-white" />
                    <span className="w-[1px] h-3 bg-white" />
                  </div>
                </div>
              </div>

              {/* Specular Diagonal Glass Glare across the plastic casing */}
              <div
                className="pointer-events-none absolute inset-0 bg-gradient-to-tr from-transparent via-white/12 to-transparent opacity-80"
                style={{
                  backgroundSize: '200% 200%',
                }}
              />
            </div>

            {/* Outer Plastic Bevel Highlight Line */}
            <div className="pointer-events-none absolute inset-0 rounded-[20px] border border-white/30 dark:border-white/10" />
          </motion.div>

          {/* Paper Scroll Rolling Cylinder / Leading Edge Indicator */}
          <motion.div
            initial={{ top: '0%', opacity: 0, scaleX: 0.94 }}
            animate={
              hasStarted
                ? {
                    top: ['0%', '100%'],
                    opacity: [0, 0.95, 0.95, 0],
                    scaleX: [0.94, 1, 1, 0.98],
                  }
                : { top: '0%', opacity: 0, scaleX: 0.94 }
            }
            transition={{
              duration: 0.85,
              ease: [0.16, 1, 0.3, 1],
              delay: 0.15,
              times: [0, 0.08, 0.9, 1],
            }}
            style={{ y: '-50%' }}
            className="pointer-events-none absolute inset-x-1.5 h-3 z-30 rounded-full bg-gradient-to-b from-white via-slate-200 to-slate-400 dark:from-slate-200 dark:via-slate-500 dark:to-slate-800 shadow-[0_5px_12px_rgba(0,0,0,0.4)] border-y border-white/60 dark:border-white/20"
          />
        </div>
      </div>
    </div>
  );
}
