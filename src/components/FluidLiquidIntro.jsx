import React, { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, Sparkles, Droplets, Waves, Award, Users } from 'lucide-react';
import { personalInfo } from '../data/portfolioData';

/**
 * FluidLiquidIntro - Fluid Liquid Glass Ripple Intro
 * 
 * Features:
 * 1. Interactive HTML5 Canvas fluid ripple simulation tracking cursor/touch
 * 2. Multi-layered organic liquid mesh gradients (Cyan #7DD3FC & Deep Blue #0369A1)
 * 3. Centered ultra-premium frosted glassmorphism card with specular sheen
 * 4. Center-to-Edge "Fluid Iris Wipe" transition into main portfolio
 * 5. Glassmorphism "Skip Intro" button at top-right
 */
export default function FluidLiquidIntro({ onComplete }) {
  const [isWiping, setIsWiping] = useState(false);
  const [isFinished, setIsFinished] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  const canvasRef = useRef(null);
  const ripplesRef = useRef([]);
  const lastRippleTimeRef = useRef(0);
  const animFrameRef = useRef(null);

  // Lock body scroll while intro is visible
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, []);

  // Finish intro callback
  const finishIntro = useCallback(() => {
    setIsFinished(true);
    document.body.style.overflow = 'unset';
    if (onComplete) onComplete();
  }, [onComplete]);

  // Stage sequence: 2.5s fluid ripple flow -> 2.5s-3.2s fluid wipe -> cleanup
  useEffect(() => {
    const wipeTimer = setTimeout(() => {
      setIsWiping(true);
    }, 2500);

    const finishTimer = setTimeout(() => {
      finishIntro();
    }, 3200);

    return () => {
      clearTimeout(wipeTimer);
      clearTimeout(finishTimer);
      document.body.style.overflow = 'unset';
    };
  }, [finishIntro]);

  // Handle Skip button
  const handleSkip = () => {
    setIsWiping(true);
    setTimeout(() => {
      finishIntro();
    }, 350);
  };

  // Add water ripple to simulation
  const addRipple = useCallback((x, y, maxRadius = 160, strength = 0.7) => {
    ripplesRef.current.push({
      x,
      y,
      radius: 5,
      maxRadius,
      alpha: strength,
      speed: 3.2,
      thickness: 2.5,
    });
  }, []);

  // Track mouse & touch coordinates + generate ripple waves
  const handlePointerMove = useCallback((e) => {
    const clientX = e.clientX ?? e.touches?.[0]?.clientX;
    const clientY = e.clientY ?? e.touches?.[0]?.clientY;

    if (clientX != null && clientY != null) {
      setMousePos({ x: clientX, y: clientY });

      const now = performance.now();
      // Throttle interactive ripples to every 50ms for buttery-smooth performance
      if (now - lastRippleTimeRef.current > 50) {
        lastRippleTimeRef.current = now;
        addRipple(clientX, clientY, 150, 0.65);
      }
    }
  }, [addRipple]);

  // Canvas fluid animation & ripple simulation loop
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', handleResize);

    // Initial ambient drop ripples
    addRipple(width / 2, height / 2, 220, 0.8);

    // Periodic ambient water drop ripple
    const dropInterval = setInterval(() => {
      if (isWiping) return;
      const rx = width * (0.3 + Math.random() * 0.4);
      const ry = height * (0.3 + Math.random() * 0.4);
      addRipple(rx, ry, 180, 0.5);
    }, 900);

    let time = 0;

    const render = () => {
      ctx.clearRect(0, 0, width, height);
      time += 0.015;

      // 1. Draw flowing liquid organic wave caustics
      const grad = ctx.createRadialGradient(
        width * 0.5 + Math.sin(time) * 120,
        height * 0.5 + Math.cos(time * 0.8) * 80,
        50,
        width * 0.5,
        height * 0.5,
        Math.max(width, height) * 0.75
      );
      grad.addColorStop(0, 'rgba(125, 211, 252, 0.08)');
      grad.addColorStop(0.35, 'rgba(3, 105, 161, 0.06)');
      grad.addColorStop(1, 'transparent');
      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, width, height);

      // 2. Render expanding glass fluid ripples
      const ripples = ripplesRef.current;
      for (let i = ripples.length - 1; i >= 0; i--) {
        const r = ripples[i];
        r.radius += r.speed;
        r.alpha *= 0.965; // Smooth exponential decay

        if (r.alpha <= 0.01 || r.radius >= r.maxRadius) {
          ripples.splice(i, 1);
          continue;
        }

        // Outer ripple ring
        ctx.beginPath();
        ctx.arc(r.x, r.y, r.radius, 0, Math.PI * 2);
        ctx.strokeStyle = `rgba(125, 211, 252, ${r.alpha * 0.75})`;
        ctx.lineWidth = r.thickness;
        ctx.shadowColor = '#38bdf8';
        ctx.shadowBlur = 10;
        ctx.stroke();

        // Inner refracted refraction ring
        ctx.beginPath();
        ctx.arc(r.x, r.y, Math.max(0, r.radius - 8), 0, Math.PI * 2);
        ctx.strokeStyle = `rgba(3, 105, 161, ${r.alpha * 0.4})`;
        ctx.lineWidth = 1.2;
        ctx.shadowBlur = 0;
        ctx.stroke();
      }

      animFrameRef.current = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', handleResize);
      clearInterval(dropInterval);
      if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
    };
  }, [addRipple, isWiping]);

  if (isFinished) return null;

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 z-[100] flex items-center justify-center bg-[#090D16] text-white font-body select-none overflow-hidden"
        initial={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.4 }}
        onMouseMove={handlePointerMove}
        onTouchMove={handlePointerMove}
        onTouchStart={handlePointerMove}
      >
        {/* ========================================================================= */}
        {/* 1. FLUID MESH GRADIENT LIQUID BACKGROUND                                  */}
        {/* ========================================================================= */}
        {/* Organic deep blue & cyan flowing blobs */}
        <motion.div
          animate={{
            scale: [1, 1.15, 0.95, 1],
            x: [0, 30, -20, 0],
            y: [0, -40, 20, 0],
          }}
          transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute -top-32 -left-32 w-[650px] h-[650px] rounded-full bg-gradient-to-tr from-[#0369A1]/35 via-[#7DD3FC]/20 to-transparent blur-[140px] pointer-events-none"
        />

        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            x: [0, -35, 25, 0],
            y: [0, 30, -30, 0],
          }}
          transition={{ duration: 14, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute -bottom-40 -right-32 w-[700px] h-[700px] rounded-full bg-gradient-to-bl from-[#7DD3FC]/25 via-indigo-600/20 to-transparent blur-[160px] pointer-events-none"
        />

        {/* Ambient Center Fluid Pool Glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full bg-[#0369A1]/15 blur-[120px] pointer-events-none" />

        {/* Interactive HTML5 Canvas Ripple Layer */}
        <canvas ref={canvasRef} className="absolute inset-0 w-full h-full pointer-events-none z-10" />

        {/* ========================================================================= */}
        {/* 2. GLASSMORPHISM SKIP INTRO BUTTON (TOP RIGHT)                             */}
        {/* ========================================================================= */}
        <motion.button
          initial={{ opacity: 0, y: -12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          onClick={handleSkip}
          className="absolute top-6 right-6 z-50 flex items-center gap-2 px-4 py-2 rounded-full border border-white/10 bg-white/5 backdrop-blur-md text-xs font-semibold text-[#7DD3FC] shadow-[0_0_25px_rgba(125,211,252,0.15)] hover:bg-white/15 hover:border-[#7DD3FC]/40 hover:text-white hover:scale-105 active:scale-95 transition-all cursor-pointer"
        >
          <span>Skip Intro</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </motion.button>

        {/* ========================================================================= */}
        {/* 3. CENTERED ELEGANT FROSTED GLASS LIQUID CARD                             */}
        {/* ========================================================================= */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={
            isWiping
              ? { opacity: 0, scale: 1.15, filter: 'blur(12px)', y: -10 }
              : { opacity: 1, scale: 1, filter: 'blur(0px)', y: 0 }
          }
          transition={{ duration: 0.6, ease: 'easeOut' }}
          className="relative z-30 flex flex-col items-center text-center max-w-lg w-[90%] sm:w-full p-8 sm:p-10 rounded-3xl border border-white/15 bg-white/[0.04] backdrop-blur-2xl shadow-[0_20px_60px_-15px_rgba(3,105,161,0.35)] overflow-hidden"
        >
          {/* Specular Liquid Sheen Reflection */}
          <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/[0.07] to-transparent pointer-events-none" />

          {/* Subtitle Fluid Badge */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 }}
            className="inline-flex items-center gap-2 mb-5 px-4 py-1.5 rounded-full border border-sky-400/30 bg-sky-500/10 backdrop-blur-md text-xs font-mono font-semibold tracking-widest text-[#7DD3FC] uppercase shadow-sm"
          >
            <Droplets className="w-3.5 h-3.5 text-sky-400 animate-bounce" />
            <span>FLUID LIQUID GLASS</span>
          </motion.div>

          {/* Main Title Name */}
          <h1 className="font-display text-3xl sm:text-5xl font-extrabold tracking-tight mb-3 text-white drop-shadow-[0_0_30px_rgba(125,211,252,0.4)]">
            <span className="bg-gradient-to-r from-white via-sky-100 to-[#7DD3FC] bg-clip-text text-transparent">
              {personalInfo.name || 'FELIA NADIA FIKARDA'}
            </span>
          </h1>

          {/* Subtitle Roles */}
          <p className="text-sm sm:text-base text-slate-300 font-medium mb-6">
            Data Analyst & Web Developer
          </p>

          {/* Quick Highlight Chips */}
          <div className="flex flex-wrap items-center justify-center gap-3 mb-6">
            <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-sky-400/30 bg-sky-950/40 backdrop-blur-md text-xs font-bold text-sky-200">
              <Award className="w-3.5 h-3.5 text-sky-400" />
              <span>GPA {personalInfo.gpa || '3.94'}</span>
            </div>

            <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-emerald-400/30 bg-emerald-950/40 backdrop-blur-md text-xs font-bold text-emerald-300">
              <Users className="w-3.5 h-3.5 text-emerald-400" />
              <span>{personalInfo.studentsMentored || '100+'} Mentored</span>
            </div>
          </div>

          {/* Interactive Hint Indicator */}
          <div className="flex items-center gap-2 text-xs text-sky-300/80 font-mono">
            <Waves className="w-3.5 h-3.5 animate-pulse text-[#7DD3FC]" />
            <span>Gerakkan kursor untuk membuat riak air</span>
          </div>

          {/* Subtle Bottom Ambient Progress Line */}
          <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-[#7DD3FC]/50 to-transparent" />
        </motion.div>

        {/* ========================================================================= */}
        {/* 4. FLUID WIPE TRANSITION MASK (STAGE 2: CENTER-TO-EDGE LIQUID IRIS WIPE)  */}
        {/* ========================================================================= */}
        <motion.div
          className="absolute inset-0 bg-[#090D16] z-40 pointer-events-none"
          initial={{ clipPath: 'circle(150% at 50% 50%)' }}
          animate={
            isWiping
              ? { clipPath: 'circle(0% at 50% 50%)' }
              : { clipPath: 'circle(150% at 50% 50%)' }
          }
          transition={{ duration: 0.75, ease: [0.77, 0, 0.175, 1] }}
        />

        {/* Expanding Fluid Wipe Water Shockwave Ring */}
        {isWiping && (
          <motion.div
            initial={{ scale: 0.2, opacity: 0.9, borderWidth: 8 }}
            animate={{ scale: 28, opacity: 0, borderWidth: 0 }}
            transition={{ duration: 0.75, ease: 'easeOut' }}
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-48 rounded-full border border-sky-300 shadow-[0_0_60px_#7dd3fc] pointer-events-none z-50"
          />
        )}
      </motion.div>
    </AnimatePresence>
  );
}
