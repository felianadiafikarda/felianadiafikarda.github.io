import React from 'react';
import { motion } from 'framer-motion';
import { UserCheck, GraduationCap, Target, Sparkles, CheckCircle2, BarChart3, Code2, ArrowRight, Building2, MapPin } from 'lucide-react';
import { personalInfo, profileCards } from '../data/portfolioData';

const iconMap = { GraduationCap, Target, Sparkles };

export default function About() {
  return (
    <section id="profil" className="relative overflow-hidden py-16 sm:py-20 lg:py-28">
      {/* Ambient glow */}
      <div className="pointer-events-none absolute right-0 top-1/3 h-[500px] w-[500px] rounded-full bg-indigo-400/8 blur-[130px] dark:bg-indigo-500/10" />

      <div className="mx-auto max-w-[1200px] px-4 sm:px-6 lg:px-8">

        {/* ── Section Header ── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-12"
        >
          <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-sky-300/60 bg-sky-50/80 px-3.5 py-1.5 text-xs font-bold uppercase tracking-wider text-sky-700 dark:border-sky-500/20 dark:bg-sky-950/40 dark:text-sky-300">
            <UserCheck className="h-3.5 w-3.5" />
            About Me
          </div>
          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-slate-900 dark:text-white">
            Profile & Background
          </h2>
        </motion.div>

        {/* ── Main Grid ── */}
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_420px] gap-10 lg:gap-14 items-start">

          {/* LEFT: Bio + Timeline */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            {/* Bio Card */}
            <div className="rounded-3xl border border-slate-200/80 bg-white/80 p-7 sm:p-9 backdrop-blur-xl shadow-[0_20px_60px_rgba(20,35,65,0.07)] dark:border-white/10 dark:bg-[#0F1528]/70">
              <div className="mb-5 flex flex-wrap items-center gap-2">
                <span className="inline-flex items-center gap-1.5 rounded-full bg-sky-50 px-3 py-1 text-xs font-semibold text-sky-700 border border-sky-200 dark:bg-sky-950/60 dark:text-sky-300 dark:border-sky-800">
                  <BarChart3 className="h-3.5 w-3.5" />
                  Data Analysis
                </span>
                <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-50 px-3 py-1 text-xs font-semibold text-emerald-700 border border-emerald-200 dark:bg-emerald-950/60 dark:text-emerald-300 dark:border-emerald-800">
                  <Code2 className="h-3.5 w-3.5" />
                  Software Development
                </span>
                <span className="ml-auto font-mono text-xs font-bold text-sky-600 dark:text-sky-400">
                  Bachelor of Informatics · UAD
                </span>
              </div>

              <div className="space-y-4 text-sm sm:text-[15px] leading-relaxed text-slate-600 dark:text-slate-300">
                <p>
                  I am an{' '}
                  <b className="text-sky-600 dark:text-sky-400">Informatics graduate from Universitas Ahmad Dahlan</b>{' '}
                  with deep focus in data analysis and software engineering. My hands-on experience covers{' '}
                  <b className="text-slate-800 dark:text-slate-200">Python, SQL, MySQL, Excel, data cleaning, preprocessing, and data visualization</b>{' '}
                  gained through academic research, internships, and laboratory practicum guidance.
                </p>
                <p>
                  On the software development side,{' '}
                  <b className="text-slate-800 dark:text-slate-200">I build responsive user interfaces and robust backend systems</b>{' '}
                  using{' '}
                  <b className="text-sky-600 dark:text-sky-400">Laravel, PHP, React.js, Tailwind CSS, and JavaScript</b>.
                  I enjoy transforming raw data into actionable insights and designing practical, high-impact digital solutions.
                </p>
              </div>
            </div>

            {/* Animated UAD Campus Card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.15 }}
              className="group relative mt-6 overflow-hidden rounded-3xl border border-slate-200/80 bg-white/80 backdrop-blur-xl shadow-xl shadow-slate-900/5 dark:border-white/10 dark:bg-[#0F1528]/70"
            >
              <div className="relative aspect-[16/9] sm:aspect-[21/9] md:aspect-[16/8] min-h-[220px] sm:min-h-[250px] overflow-hidden">
                {/* Continuous Ken Burns Pan & Zoom Animation */}
                <motion.div
                  className="absolute inset-0"
                  animate={{
                    scale: [1, 1.12, 1.05, 1],
                    x: [0, -16, -6, 0],
                    y: [0, -6, -2, 0],
                  }}
                  transition={{
                    duration: 22,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                >
                  <img
                    src={personalInfo.uadImg || "/images/uad.jpg"}
                    alt="Universitas Ahmad Dahlan - Main Campus (Campus 4) Yogyakarta"
                    className="h-full w-full object-cover object-center brightness-[0.88] contrast-[1.06] group-hover:scale-110 transition-transform duration-700"
                  />
                </motion.div>

                {/* Animated Sunlight Sweep */}
                <motion.div
                  className="pointer-events-none absolute inset-0 bg-gradient-to-r from-transparent via-amber-200/20 to-transparent -skew-x-12"
                  animate={{
                    x: ['-100%', '200%'],
                  }}
                  transition={{
                    duration: 7,
                    repeat: Infinity,
                    ease: "easeInOut",
                    repeatDelay: 4,
                  }}
                />

                {/* Vignette & Gradient Overlays */}
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-slate-950/20" />

                {/* Top Badges */}
                <div className="absolute top-4 left-4 right-4 flex items-center justify-between gap-2 z-10">
                  <div className="flex items-center gap-1.5 rounded-full bg-slate-950/75 backdrop-blur-md border border-white/20 px-3.5 py-1.5 text-xs font-semibold text-white shadow-lg">
                    <span className="relative flex h-2 w-2">
                      <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-amber-400 opacity-75" />
                      <span className="relative inline-flex h-2 w-2 rounded-full bg-amber-400" />
                    </span>
                    <Building2 className="h-3.5 w-3.5 text-amber-300" />
                    <span>Main Campus (Campus IV) UAD</span>
                  </div>

                  <div className="flex items-center gap-1.5 rounded-full bg-slate-950/70 backdrop-blur-md border border-white/20 px-3 py-1 text-xs font-medium text-white shadow-md">
                    <MapPin className="h-3 w-3 text-sky-400" />
                    <span>Yogyakarta, ID</span>
                  </div>
                </div>

                {/* Bottom Overlay Info */}
                <div className="absolute inset-x-0 bottom-0 p-5 sm:p-6 z-10">
                  <div className="flex items-center justify-between gap-3">
                    <div>
                      <div className="flex items-center gap-1.5 text-amber-300 text-[11px] font-bold uppercase tracking-wider mb-0.5">
                        <Sparkles className="h-3 w-3" />
                        Alma Mater Campus
                      </div>
                      <h3 className="text-base sm:text-lg font-bold text-white tracking-tight">
                        Universitas Ahmad Dahlan
                      </h3>
                    </div>

                    <div className="flex-none">
                      <span className="inline-flex items-center gap-1.5 rounded-xl bg-white/15 backdrop-blur-md border border-white/20 px-3 py-1.5 text-xs font-bold text-white shadow-md">
                        <GraduationCap className="h-4 w-4 text-emerald-300" />
                        Bachelor of Informatics
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>

          {/* RIGHT: 3 Core Competency Cards */}
          <div className="flex flex-col gap-4">
            {profileCards.map((card, idx) => {
              const IconComponent = iconMap[card.icon] || Sparkles;
              const accents = [
                'from-sky-500/20 to-indigo-500/20 border-sky-300/60 dark:border-sky-500/20',
                'from-emerald-500/20 to-teal-500/20 border-emerald-300/60 dark:border-emerald-500/20',
                'from-violet-500/20 to-purple-500/20 border-violet-300/60 dark:border-violet-500/20',
              ];
              const iconAccents = [
                'from-sky-500 to-indigo-500',
                'from-emerald-500 to-teal-500',
                'from-violet-500 to-purple-500',
              ];
              return (
                <motion.div
                  key={card.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: idx * 0.1 }}
                  whileHover={{ y: -4 }}
                  className={`group relative rounded-3xl border bg-gradient-to-br p-6 backdrop-blur-xl transition-all duration-300 shadow-[0_12px_30px_rgba(20,35,65,0.06)] dark:bg-[#0F1528]/70 ${accents[idx]}`}
                >
                  <div className="flex items-start justify-between mb-4">
                    <div className={`flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br ${iconAccents[idx]} shadow-lg`}>
                      <IconComponent className="h-6 w-6 text-white" />
                    </div>
                    <CheckCircle2 className="h-5 w-5 text-emerald-500 opacity-50 group-hover:opacity-100 transition-opacity" />
                  </div>
                  <h3 className="mb-2 text-base font-bold text-slate-900 dark:text-white">{card.title}</h3>
                  <p className="text-sm leading-relaxed text-slate-600 dark:text-slate-300 whitespace-pre-line">{card.description}</p>
                  <div className="mt-4 pt-4 border-t border-slate-200/60 dark:border-white/10 flex items-center justify-between text-xs text-slate-400 font-mono">
                    <span className="font-semibold text-sky-600 dark:text-sky-400">CORE COMPETENCY</span>
                    <span>0{idx + 1}</span>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
