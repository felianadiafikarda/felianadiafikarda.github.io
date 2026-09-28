import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, Sparkles } from 'lucide-react';

const kineticTexts = ["DATA ANALYTICS", "WEB DEVELOPMENT", "FELIA NADIA FIKARDA"];

export default function ModernIntro({ onComplete }) {
  const [counter, setCounter] = useState(0);
  const [textIndex, setTextIndex] = useState(0);
  const [isFinished, setIsFinished] = useState(false);
  const [portalOpen, setPortalOpen] = useState(false);
  const canvasRef = useRef(null);

  // 1. Interactive Particle Canvas Background
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let animationFrameId;

    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', handleResize);

    const particleCount = Math.min(Math.floor(width / 20), 50);
    const particles = [];
    const mouse = { x: width / 2, y: height / 2, radius: 180 };

    const handleMouseMove = (e) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
    };
    window.addEventListener('mousemove', handleMouseMove);

    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.8,
        vy: (Math.random() - 0.5) * 0.8,
        radius: Math.random() * 2.5 + 1,
        alpha: Math.random() * 0.6 + 0.2
      });
    }

    const draw = () => {
      ctx.clearRect(0, 0, width, height);

      for (let i = 0; i < particleCount; i++) {
        const p = particles[i];
        p.x += p.vx;
        p.y += p.vy;

        if (p.x < 0 || p.x > width) p.vx *= -1;
        if (p.y < 0 || p.y > height) p.vy *= -1;

        // Draw node
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(125, 211, 252, ${p.alpha})`;
        ctx.fill();

        // Connect to mouse
        const dx = mouse.x - p.x;
        const dy = mouse.y - p.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < mouse.radius) {
          ctx.beginPath();
          ctx.moveTo(p.x, p.y);
          ctx.lineTo(mouse.x, mouse.y);
          ctx.strokeStyle = `rgba(125, 211, 252, ${0.35 * (1 - dist / mouse.radius)})`;
          ctx.lineWidth = 1;
          ctx.stroke();
        }

        // Connect to other nodes
        for (let j = i + 1; j < particleCount; j++) {
          const p2 = particles[j];
          const d2 = Math.sqrt((p.x - p2.x) ** 2 + (p.y - p2.y) ** 2);
          if (d2 < 120) {
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.strokeStyle = `rgba(3, 105, 161, ${0.25 * (1 - d2 / 120)})`;
            ctx.lineWidth = 0.7;
            ctx.stroke();
          }
        }
      }

      animationFrameId = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  // 2. Counter & Kinetic Typography Timer (0% to 100% in ~2.2s)
  useEffect(() => {
    document.body.style.overflow = 'hidden';

    const duration = 2200; // 2.2 seconds total
    const startTime = Date.now();

    const interval = setInterval(() => {
      const elapsed = Date.now() - startTime;
      const progress = Math.min(100, Math.floor((elapsed / duration) * 100));
      setCounter(progress);

      if (progress < 35) {
        setTextIndex(0);
      } else if (progress < 70) {
        setTextIndex(1);
      } else {
        setTextIndex(2);
      }

      if (progress >= 100) {
        clearInterval(interval);
        // Trigger Portal Aperture Reveal
        setTimeout(() => {
          setPortalOpen(true);
        }, 150);

        setTimeout(() => {
          finishIntro();
        }, 850);
      }
    }, 25);

    return () => clearInterval(interval);
  }, []);

  const skipIntro = () => {
    setCounter(100);
    setTextIndex(2);
    setPortalOpen(true);
    setTimeout(() => {
      finishIntro();
    }, 350);
  };

  const finishIntro = () => {
    setIsFinished(true);
    document.body.style.overflow = '';
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
        {/* Canvas Particle Background */}
        <canvas ref={canvasRef} className="absolute inset-0 w-full h-full pointer-events-none opacity-75" />

        {/* Ambient Radial Background Glows */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-gradient-to-tr from-[#0369A1]/30 via-[#7DD3FC]/20 to-indigo-500/20 blur-[140px] pointer-events-none" />

        {/* Top-Right Glassmorphism Skip Intro Button */}
        <motion.button
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          onClick={skipIntro}
          className="absolute top-6 right-6 z-50 flex items-center gap-2 px-4 py-2 rounded-full border border-white/20 bg-white/10 text-xs font-semibold text-[#7DD3FC] shadow-lg backdrop-blur-md transition-all hover:bg-white/20 hover:border-[#7DD3FC] hover:scale-105"
        >
          <span>Skip Intro</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </motion.button>

        {/* Outer Circular Portal Mask Reveal Wipe */}
        <motion.div 
          className="absolute inset-0 bg-[#0E1120] z-30 pointer-events-none"
          initial={{ clipPath: 'circle(150% at 50% 50%)' }}
          animate={portalOpen ? { clipPath: 'circle(0% at 50% 50%)' } : { clipPath: 'circle(150% at 50% 50%)' }}
          transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
        />

        {/* Staggered Top Panel Curtain Wipe */}
        <motion.div
          className="absolute top-0 left-0 right-0 h-1/2 bg-[#0A0D18] border-b border-sky-500/20 z-40"
          animate={portalOpen ? { y: '-100%' } : { y: 0 }}
          transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
        />

        {/* Staggered Bottom Panel Curtain Wipe */}
        <motion.div
          className="absolute bottom-0 left-0 right-0 h-1/2 bg-[#0A0D18] border-t border-sky-500/20 z-40"
          animate={portalOpen ? { y: '100%' } : { y: 0 }}
          transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
        />

        {/* Center Container: Kinetic Typography & Counter */}
        <div className="relative z-20 flex flex-col items-center px-4 text-center">
          
          {/* Subtle Sparkle Badge */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="inline-flex items-center gap-2 mb-4 px-4 py-1.5 rounded-full border border-sky-400/30 bg-sky-500/10 backdrop-blur-md text-xs font-semibold uppercase tracking-widest text-[#7DD3FC]"
          >
            <Sparkles className="w-3.5 h-3.5 text-[#7DD3FC] animate-spin" />
            <span>PORTFOLIO SHOWCASE</span>
          </motion.div>

          {/* Dynamic Kinetic Typography Text Switcher */}
          <div className="h-16 sm:h-24 flex items-center justify-center overflow-hidden mb-4">
            <AnimatePresence mode="wait">
              <motion.h2
                key={textIndex}
                initial={{ y: 50, opacity: 0, filter: 'blur(8px)' }}
                animate={{ y: 0, opacity: 1, filter: 'blur(0px)' }}
                exit={{ y: -50, opacity: 0, filter: 'blur(8px)' }}
                transition={{ duration: 0.35, ease: "easeInOut" }}
                className="font-display text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white drop-shadow-[0_0_25px_rgba(125,211,252,0.4)]"
              >
                {kineticTexts[textIndex]}
              </motion.h2>
            </AnimatePresence>
          </div>

          {/* Large Digital Counter Display (0% to 100%) */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            className="flex items-baseline justify-center gap-1 font-mono font-extrabold text-5xl sm:text-7xl tracking-tighter text-transparent bg-clip-text bg-gradient-to-r from-sky-400 via-[#7DD3FC] to-emerald-400 drop-shadow-[0_0_30px_rgba(3,105,161,0.6)]"
          >
            <span>{counter.toString().padStart(2, '0')}</span>
            <span className="text-2xl sm:text-3xl text-sky-400">%</span>
          </motion.div>

          {/* Progress Tracker Line */}
          <div className="mt-6 w-48 sm:w-64 h-1.5 bg-slate-800/80 rounded-full overflow-hidden p-0.5 border border-sky-500/20">
            <motion.div 
              className="h-full rounded-full bg-gradient-to-r from-[#0369A1] via-[#7DD3FC] to-emerald-400 shadow-[0_0_15px_#7DD3FC]"
              style={{ width: `${counter}%` }}
              transition={{ ease: "easeOut" }}
            />
          </div>

        </div>

      </motion.div>
    </AnimatePresence>
  );
}
