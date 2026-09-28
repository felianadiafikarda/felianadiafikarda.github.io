import React from 'react';
import { motion } from 'framer-motion';
import { Wrench, CheckCircle, Zap } from 'lucide-react';
import { skills, tools } from '../data/portfolioData';

const skillGroups = [
  {
    title: 'Hard Skills & Technologies',
    count: '16 PROFICIENCIES',
    items: skills.hardSkills,
    accent: 'from-sky-500 to-indigo-500',
    chipClass: 'bg-sky-50/80 border-sky-200/80 text-sky-800 hover:bg-sky-500 hover:text-white hover:border-sky-500 dark:bg-sky-950/40 dark:border-sky-500/20 dark:text-sky-300 dark:hover:bg-sky-500 dark:hover:text-white',
    checkClass: 'text-sky-500',
  },
  {
    title: 'Soft Skills & Attributes',
    count: '9 CORE ATTRIBUTES',
    items: skills.softSkills,
    accent: 'from-emerald-500 to-teal-500',
    chipClass: 'bg-emerald-50/80 border-emerald-200/80 text-emerald-800 hover:bg-emerald-500 hover:text-white hover:border-emerald-500 dark:bg-emerald-950/40 dark:border-emerald-500/20 dark:text-emerald-300 dark:hover:bg-emerald-500 dark:hover:text-white',
    checkClass: 'text-emerald-500',
  },
];

export default function Skills() {
  return (
    <section id="skill" className="relative py-16 sm:py-20 lg:py-24 overflow-hidden">
      {/* Ambient */}
      <div className="pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[600px] w-[800px] rounded-full bg-indigo-400/5 blur-[150px] dark:bg-indigo-600/8" />

      <div className="mx-auto max-w-[1200px] px-4 sm:px-6 lg:px-8">

        {/* ── Header ── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-12"
        >
          <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-violet-300/60 bg-violet-50/80 px-3.5 py-1.5 text-xs font-bold uppercase tracking-wider text-violet-700 dark:border-violet-500/20 dark:bg-violet-950/40 dark:text-violet-300">
            <Wrench className="h-3.5 w-3.5" />
            Capabilities
          </div>
          <h2 className="font-display text-3xl sm:text-4xl font-black tracking-tight text-slate-900 dark:text-white">
            Skills & Tools
          </h2>
          <p className="mt-2 max-w-xl text-sm leading-relaxed text-slate-600 dark:text-slate-400">
            Technical proficiencies and development tools I leverage for data analysis, web engineering, relational database management, and agile collaboration.
          </p>
        </motion.div>

        {/* ── Skills Grid ── */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
          {skillGroups.map((group, gIdx) => (
            <motion.div
              key={group.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: gIdx * 0.1 }}
              className="rounded-3xl border border-slate-200/80 bg-white/80 p-7 backdrop-blur-xl shadow-[0_14px_35px_rgba(20,35,65,0.06)] transition-all hover:shadow-xl dark:border-white/10 dark:bg-[#0E1322]/90"
            >
              {/* Card header */}
              <div className="mb-5 flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <div className={`h-8 w-8 rounded-xl bg-gradient-to-br ${group.accent} flex items-center justify-center shadow-md`}>
                    <CheckCircle className="h-4 w-4 text-white" />
                  </div>
                  <h3 className="text-sm font-bold text-slate-800 dark:text-slate-200">
                    {group.title}
                  </h3>
                </div>
                <span className="rounded-full border border-slate-200/80 bg-slate-100 px-2.5 py-0.5 text-[10px] font-mono font-bold text-slate-500 dark:border-white/10 dark:bg-white/5 dark:text-slate-400">
                  {group.count}
                </span>
              </div>

              <div className="flex flex-wrap gap-2">
                {group.items.map((skill, i) => (
                  <motion.span
                    key={i}
                    whileHover={{ scale: 1.07, y: -1 }}
                    className={`inline-flex cursor-default items-center gap-1.5 rounded-full border px-3.5 py-1.5 text-xs font-semibold shadow-sm transition-all duration-200 ${group.chipClass}`}
                  >
                    <CheckCircle className={`h-3 w-3 ${group.checkClass}`} />
                    {skill}
                  </motion.span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>

        {/* ── Tools Marquee ── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="overflow-hidden rounded-3xl border border-slate-200/80 bg-white/80 p-7 backdrop-blur-xl shadow-[0_14px_35px_rgba(20,35,65,0.06)] dark:border-white/10 dark:bg-[#0E1322]/90"
        >
          <div className="mb-6 flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="h-8 w-8 rounded-xl bg-gradient-to-br from-amber-500 to-orange-500 flex items-center justify-center shadow-md">
                <Zap className="h-4 w-4 text-white" />
              </div>
              <h3 className="text-sm font-bold text-slate-800 dark:text-slate-200">
                Tools & Environment Ecosystem
              </h3>
            </div>
            <span className="flex items-center gap-1.5 text-xs font-semibold text-emerald-500">
              <span className="h-2 w-2 rounded-full bg-emerald-500 animate-ping" />
              Hover to Pause
            </span>
          </div>

          <div className="relative w-full overflow-hidden py-3">
            <div className="flex w-max animate-tools-marquee hover:[animation-play-state:paused]">
              {[...tools, ...tools].map((tool, idx) => (
                <div
                  key={idx}
                  className="mx-4 group flex flex-col items-center gap-2"
                >
                  <div className="flex h-16 w-16 items-center justify-center rounded-2xl border border-slate-200/80 bg-white shadow-md transition-all duration-300 group-hover:scale-110 group-hover:border-sky-400/60 group-hover:shadow-sky-200/50 group-hover:shadow-lg dark:border-white/10 dark:bg-white/10 dark:group-hover:border-sky-500/40">
                    <div className={`flex items-center justify-center rounded-lg p-1.5 bg-white dark:bg-white shadow-sm ${tool.wide ? 'h-9 w-12' : 'h-10 w-10'}`}>
                      <img
                        src={tool.icon}
                        alt={tool.name}
                        className={`${tool.wide ? 'h-6 w-11' : 'h-7 w-7'} object-contain`}
                      />
                    </div>
                  </div>
                  <span className="text-[11px] font-semibold text-slate-600 dark:text-slate-400 opacity-80 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                    {tool.name}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </motion.div>

      </div>
    </section>
  );
}
