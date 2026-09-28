import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, Sparkles } from 'lucide-react';

export default function ParticleMeshIntro({ onComplete }) {
  const [counter, setCounter] = useState(0);
  const [isDispersing, setIsDispersing] = useState(false);
  const [isFinished, setIsFinished] = useState(false);
  const canvasRef = useRef(null);
  const isDispersingRef = useRef(false);

  // 1. Particle Canvas Simulation & Dispersion Physics
  useEffect(() => {
    document.body.style.overflow = 'hidden';

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

    const particleCount = Math.min(Math.floor((width * height) / 18000), 80);
    const particles = [];
    const mouse = { x: width / 2, y: height / 2, radius: 170 };

    const handleMouseMove = (e) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
    };
    window.addEventListener('mousemove', handleMouseMove);

    // Initialize particles
    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 1.2,
        vy: (Math.random() - 0.5) * 1.2,
        radius: Math.random() * 2.5 + 1.2,
        color: i % 3 === 0 ? '125, 211, 252' : i % 3 === 1 ? '3, 105, 161' : '56, 189, 248',
        alpha: Math.random() * 0.5 + 0.4
      });
    }

    const draw = () => {
      ctx.clearRect(0, 0, width, height);

      const centerX = width / 2;
      const centerY = height / 2;
      const dispersing = isDispersingRef.current;

      for (let i = 0; i < particleCount; i++) {
        const p = particles[i];

        if (dispersing) {
          // Explosive Outward Radial Acceleration
          const dx = p.x - centerX;
          const dy = p.y - centerY;
          const angle = Math.atan2(dy, dx) || (Math.random() * Math.PI * 2);
          const speed = 18;

          p.vx += Math.cos(angle) * speed * 0.08;
          p.vy += Math.sin(angle) * speed * 0.08;

          p.x += p.vx;
          p.y += p.vy;
          p.alpha = Math.max(0, p.alpha - 0.015);
        } else {
          // Normal Motion & Mouse Repulsion
          p.x += p.vx;
          p.y += p.vy;

          if (p.x < 0 || p.x > width) p.vx *= -1;
          if (p.y < 0 || p.y > height) p.vy *= -1;

          // Mouse Repulsion Effect
          if (mouse.x !== null && mouse.y !== null) {
            const mdx = mouse.x - p.x;
            const mdy = mouse.y - p.y;
            const mdist = Math.sqrt(mdx * mdx + mdy * mdy);
            if (mdist < mouse.radius) {
              const force = (mouse.radius - mdist) / mouse.radius;
              p.x -= (mdx / mdist) * force * 4;
              p.y -= (mdy / mdist) * force * 4;
            }
          }
        }

        // Draw particle node
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${p.color}, ${p.alpha})`;
        ctx.shadowBlur = 12;
        ctx.shadowColor = `rgba(${p.color}, 0.8)`;
        ctx.fill();
        ctx.shadowBlur = 0; // Reset shadow

        // Draw connection lines only when NOT dispersing
        if (!dispersing) {
          for (let j = i + 1; j < particleCount; j++) {
            const p2 = particles[j];
            const d2 = Math.sqrt((p.x - p2.x) ** 2 + (p.y - p2.y) ** 2);
            if (d2 < 130) {
              ctx.beginPath();
              ctx.moveTo(p.x, p.y);
              ctx.lineTo(p2.x, p2.y);
              ctx.strokeStyle = `rgba(125, 211, 252, ${0.3 * (1 - d2 / 130)})`;
              ctx.lineWidth = 0.8;
              ctx.stroke();
            }
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

  // 2. Counter Progress (0% to 100% in ~2.4s) & Trigger Dispersion
  useEffect(() => {
    const duration = 2400;
    const startTime = Date.now();

    const interval = setInterval(() => {
      const elapsed = Date.now() - startTime;
      const progress = Math.min(100, Math.floor((elapsed / duration) * 100));
      setCounter(progress);

      if (progress >= 100) {
        clearInterval(interval);
        triggerDispersion();
      }
    }, 25);

    return () => clearInterval(interval);
  }, []);

  const triggerDispersion = () => {
    setIsDispersing(true);
    isDispersingRef.current = true;

    setTimeout(() => {
      finishIntro();
    }, 800);
  };

  const skipIntro = () => {
    setCounter(100);
    triggerDispersion();
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
        animate={isDispersing ? { opacity: 0 } : { opacity: 1 }}
        transition={{ duration: 0.75, ease: "easeOut" }}
      >
        {/* Interactive Particle Mesh Canvas */}
        <canvas ref={canvasRef} className="absolute inset-0 w-full h-full pointer-events-none" />

        {/* Ambient Glow Orbs */}
        <div className="absolute top-1/3 left-1/4 w-[500px] h-[500px] rounded-full bg-gradient-to-tr from-[#0369A1]/30 via-sky-500/20 to-indigo-600/20 blur-[140px] pointer-events-none" />
        <div className="absolute bottom-1/3 right-1/4 w-[500px] h-[500px] rounded-full bg-gradient-to-br from-emerald-500/20 via-sky-500/20 to-purple-600/20 blur-[140px] pointer-events-none" />

        {/* Glassmorphism Skip Intro Button */}
        <motion.button
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          onClick={skipIntro}
          className="absolute top-6 right-6 z-50 flex items-center gap-2 px-4 py-2 rounded-full border border-white/15 bg-white/5 backdrop-blur-md text-xs font-semibold text-[#7DD3FC] shadow-lg transition hover:bg-white/10 hover:border-[#7DD3FC] hover:scale-105"
        >
          <span>Skip Intro</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </motion.button>

        {/* Center Text Overlay & Glassmorphism Badge */}
        <motion.div
          className="relative z-20 flex flex-col items-center px-4 text-center max-w-2xl"
          animate={isDispersing ? { scale: 1.1, opacity: 0 } : { scale: 1, opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          {/* Sparkle Badge */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 mb-4 px-4 py-1.5 rounded-full border border-sky-400/30 bg-sky-500/10 backdrop-blur-md text-xs font-bold tracking-wider text-[#7DD3FC] shadow-sm"
          >
            <Sparkles className="w-3.5 h-3.5 text-sky-400 animate-spin" />
            <span>INTERACTIVE DATA MESH</span>
          </motion.div>

          {/* Main Name Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="font-display text-4xl sm:text-6xl font-extrabold tracking-tight text-white mb-3 drop-shadow-[0_0_35px_rgba(125,211,252,0.5)]"
          >
            <span className="bg-gradient-to-r from-white via-slate-100 to-sky-200 bg-clip-text text-transparent">
              FELIA NADIA FIKARDA
            </span>
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-sm sm:text-base font-semibold text-[#7DD3FC] tracking-wide uppercase mb-6"
          >
            Data Analyst · Web Developer
          </motion.p>

          {/* Counter Display & Progress Line */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3 }}
            className="w-full max-w-xs flex flex-col items-center gap-2"
          >
            <div className="flex items-baseline justify-center gap-1 font-mono font-extrabold text-3xl sm:text-4xl text-[#7DD3FC] drop-shadow-[0_0_20px_rgba(3,105,161,0.8)]">
              <span>{counter.toString().padStart(2, '0')}</span>
              <span className="text-xl text-sky-400">%</span>
            </div>

            <div className="w-full h-1.5 bg-slate-800/80 rounded-full overflow-hidden p-0.5 border border-sky-500/20">
              <div
                className="h-full rounded-full bg-gradient-to-r from-[#0369A1] via-[#7DD3FC] to-emerald-400 shadow-[0_0_15px_#7DD3FC] transition-all duration-75"
                style={{ width: `${counter}%` }}
              />
            </div>
          </motion.div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
