import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, ArrowRight, BarChart2, Code2, Database, Compass } from 'lucide-react';
import { personalInfo } from '../data/portfolioData';

export default function IntroAnimation({ isDark, onComplete }) {
  const [isExiting, setIsExiting] = useState(false);
  const [step, setStep] = useState(0);

  useEffect(() => {
    // Timed motion graphic steps
    const t1 = setTimeout(() => setStep(1), 200);
    const t2 = setTimeout(() => setStep(2), 1000);
    const t3 = setTimeout(() => setStep(3), 1800);
    const t4 = setTimeout(() => {
      triggerExit();
    }, 4800);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
      clearTimeout(t4);
    };
  }, []);

  const triggerExit = () => {
    setIsExiting(true);
    setTimeout(() => {
      if (onComplete) onComplete();
    }, 850);
  };

  return (
    <AnimatePresence>
      {!isExiting && (
        <div 
          className={`fixed inset-0 z-[100] flex items-center justify-center overflow-hidden select-none font-body transition-colors duration-700 ${
            isDark 
              ? 'bg-[#080B1A] text-white' 
              : 'bg-[#F0F4FA] text-slate-900'
          }`}
        >
          {/* Animated Ambient Light Spheres */}
          <motion.div 
            className={`absolute top-1/3 left-1/4 w-[500px] h-[500px] rounded-full blur-[140px] pointer-events-none ${
              isDark 
                ? 'bg-gradient-to-tr from-[#0369A1]/40 via-sky-400/30 to-purple-600/30' 
                : 'bg-gradient-to-tr from-[#0369A1]/30 via-sky-300/40 to-indigo-300/30'
            }`}
            animate={{
              scale: [1, 1.3, 1],
              rotate: [0, 90, 0]
            }}
            transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          />

          <motion.div 
            className={`absolute bottom-1/3 right-1/4 w-[500px] h-[500px] rounded-full blur-[140px] pointer-events-none ${
              isDark 
                ? 'bg-gradient-to-br from-emerald-500/30 via-sky-500/30 to-indigo-600/25' 
                : 'bg-gradient-to-br from-emerald-300/35 via-sky-300/35 to-indigo-200/35'
            }`}
            animate={{
              scale: [1.3, 1, 1.3],
              rotate: [0, -90, 0]
            }}
            transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          />

          {/* Curtain Overlay - Left Door */}
          <motion.div
            className={`absolute top-0 bottom-0 left-0 w-1/2 z-40 border-r ${
              isDark 
                ? 'bg-[#060815] border-sky-500/20 shadow-2xl' 
                : 'bg-[#FFFFFF] border-slate-300 shadow-2xl'
            }`}
            animate={isExiting ? { x: '-100%' } : { x: 0 }}
            transition={{ duration: 0.85, ease: [0.77, 0, 0.175, 1] }}
          />

          {/* Curtain Overlay - Right Door */}
          <motion.div
            className={`absolute top-0 bottom-0 right-0 w-1/2 z-40 border-l ${
              isDark 
                ? 'bg-[#060815] border-sky-500/20 shadow-2xl' 
                : 'bg-[#FFFFFF] border-slate-300 shadow-2xl'
            }`}
            animate={isExiting ? { x: '100%' } : { x: 0 }}
            transition={{ duration: 0.85, ease: [0.77, 0, 0.175, 1] }}
          />

          {/* Floating Showcase Cards Background */}
          <div className="absolute inset-0 pointer-events-none z-10 overflow-hidden opacity-30 sm:opacity-40">
            <motion.div 
              initial={{ y: 70, opacity: 0 }}
              animate={step >= 1 ? { y: [0, -12, 0], opacity: 1 } : {}}
              transition={{ 
                y: { duration: 4, repeat: Infinity, ease: "easeInOut" },
                opacity: { duration: 0.8 }
              }}
              className={`absolute top-[10%] left-[6%] w-44 sm:w-64 rounded-2xl border p-3 shadow-2xl rotate-[-7deg] backdrop-blur-xl ${
                isDark ? 'border-white/15 bg-white/5' : 'border-slate-300 bg-white/95'
              }`}
            >
              <img src="/images/training-grafik.png" alt="Data Analytics" className="w-full h-24 sm:h-36 object-cover rounded-xl mb-2" />
            </motion.div>

            <motion.div 
              initial={{ y: -70, opacity: 0 }}
              animate={step >= 1 ? { y: [0, 12, 0], opacity: 1 } : {}}
              transition={{ 
                y: { duration: 4.5, repeat: Infinity, ease: "easeInOut" },
                opacity: { duration: 0.8, delay: 0.2 }
              }}
              className={`absolute bottom-[12%] left-[8%] w-44 sm:w-64 rounded-2xl border p-3 shadow-2xl rotate-[9deg] backdrop-blur-xl ${
                isDark ? 'border-white/15 bg-white/5' : 'border-slate-300 bg-white/95'
              }`}
            >
              <img src="/images/profile-page.png" alt="Web Development" className="w-full h-24 sm:h-36 object-cover rounded-xl mb-2" />
            </motion.div>

            <motion.div 
              initial={{ y: 70, opacity: 0 }}
              animate={step >= 1 ? { y: [0, -14, 0], opacity: 1 } : {}}
              transition={{ 
                y: { duration: 5, repeat: Infinity, ease: "easeInOut" },
                opacity: { duration: 0.8, delay: 0.4 }
              }}
              className={`absolute top-[12%] right-[6%] w-44 sm:w-64 rounded-2xl border p-3 shadow-2xl rotate-[6deg] backdrop-blur-xl ${
                isDark ? 'border-white/15 bg-white/5' : 'border-slate-300 bg-white/95'
              }`}
            >
              <img src="/images/Data_Analytics_Essentials_certificate.jpg" alt="Certifications" className="w-full h-24 sm:h-36 object-cover rounded-xl mb-2" />
            </motion.div>
          </div>

          {/* Main Visual Motion Content */}
          <motion.div 
            className="relative z-50 flex flex-col items-center px-4 sm:px-8 text-center max-w-2xl w-full"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={isExiting ? { opacity: 0, scale: 1.15 } : { opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
          >
            {/* Centered Graphic Photo Avatar with Orbiting Aura */}
            <motion.div 
              initial={{ scale: 0, rotate: -15 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ type: "spring", damping: 14, stiffness: 110 }}
              className="relative mb-6 cursor-pointer group"
              onClick={triggerExit}
            >
              {/* Pulsing ring aura */}
              <div className="absolute -inset-4 rounded-full bg-gradient-to-r from-sky-400 via-[#0369A1] to-emerald-400 opacity-80 blur-xl animate-pulse" />

              <div className="relative h-32 w-32 sm:h-44 sm:w-44 rounded-full overflow-hidden p-1.5 bg-gradient-to-tr from-sky-300 via-white to-emerald-400 shadow-[0_0_50px_rgba(3,105,161,0.6)] transition-transform duration-500 group-hover:scale-105">
                <img 
                  src={personalInfo.profileImg} 
                  alt={personalInfo.name} 
                  className="h-full w-full rounded-full object-cover"
                />
              </div>
            </motion.div>

            {/* Sparkle Tag */}
            <motion.div 
              initial={{ opacity: 0, y: 15 }}
              animate={step >= 1 ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5 }}
              className={`inline-flex items-center gap-2 mb-4 px-4 py-1.5 rounded-full border text-xs font-bold tracking-wider shadow-sm backdrop-blur-md ${
                isDark 
                  ? 'border-sky-400/30 bg-sky-500/10 text-[#7DD3FC]' 
                  : 'border-[#0369A1]/30 bg-[#0369A1]/10 text-[#0369A1]'
              }`}
            >
              <Sparkles className="w-4 h-4 text-sky-400 animate-spin" />
              <span>WELCOME TO MY PORTFOLIO</span>
            </motion.div>

            {/* Main Typographic Name Entrance */}
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={step >= 1 ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="font-display text-4xl sm:text-6xl font-extrabold tracking-tight mb-3"
            >
              <span className={isDark ? "bg-gradient-to-r from-white via-slate-100 to-sky-200 bg-clip-text text-transparent drop-shadow" : "bg-gradient-to-r from-slate-900 via-[#0369A1] to-sky-600 bg-clip-text text-transparent"}>
                {personalInfo.name}
              </span>
            </motion.h1>

            {/* Feature Highlight Pills (Clean Graphic Icons, No Tech Jargon) */}
            <motion.div 
              initial={{ opacity: 0, y: 15 }}
              animate={step >= 2 ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5 }}
              className="flex flex-wrap justify-center gap-2.5 mb-8 text-xs sm:text-sm font-bold"
            >
              <span className={`inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full border shadow-sm backdrop-blur-md ${
                isDark ? 'bg-sky-500/15 border-sky-400/30 text-sky-300' : 'bg-sky-50 border-sky-200 text-[#0369A1]'
              }`}>
                <BarChart2 className="w-4 h-4" /> Data Analytics
              </span>

              <span className={`inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full border shadow-sm backdrop-blur-md ${
                isDark ? 'bg-emerald-500/15 border-emerald-400/30 text-emerald-300' : 'bg-emerald-50 border-emerald-200 text-emerald-700'
              }`}>
                <Code2 className="w-4 h-4" /> Web Development
              </span>

              <span className={`inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full border shadow-sm backdrop-blur-md ${
                isDark ? 'bg-purple-500/15 border-purple-400/30 text-purple-300' : 'bg-purple-50 border-purple-200 text-purple-700'
              }`}>
                <Database className="w-4 h-4" /> Database Management
              </span>
            </motion.div>

            {/* Interactive Call To Action Button */}
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              animate={step >= 2 ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <button
                onClick={triggerExit}
                className="group relative inline-flex items-center gap-3 px-8 sm:px-9 py-3.5 sm:py-4 rounded-full bg-gradient-to-r from-[#0369A1] via-sky-600 to-emerald-500 text-sm font-bold text-white shadow-[0_0_40px_rgba(3,105,161,0.5)] transition-all duration-300 hover:scale-105 hover:shadow-[0_0_50px_rgba(3,105,161,0.8)]"
              >
                <Compass className="w-5 h-5 animate-spin" /> Buka Portofolio <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </button>
            </motion.div>

          </motion.div>

        </div>
      )}
    </AnimatePresence>
  );
}
