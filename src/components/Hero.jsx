import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ArrowRight,
  Download,
  Github,
  Linkedin,
  MapPin,
  MessageCircle,
  Sparkles,
  TrendingUp,
  Code2,
  GraduationCap,
  Database,
  ChevronLeft,
  ChevronRight,
} from 'lucide-react';
import { personalInfo } from '../data/portfolioData';

const techStack = [
  { name: 'Python', color: 'sky' },
  { name: 'SQL', color: 'violet' },
  { name: 'Laravel', color: 'red' },
  { name: 'React.js', color: 'cyan' },
  { name: 'MySQL', color: 'orange' },
  { name: 'Pandas', color: 'green' },
  { name: 'JavaScript', color: 'yellow' },
  { name: 'Tailwind CSS', color: 'teal' },
];

const colorMap = {
  sky:    'bg-sky-100 text-sky-700 dark:bg-sky-950/60 dark:text-sky-300',
  violet: 'bg-violet-100 text-violet-700 dark:bg-violet-950/60 dark:text-violet-300',
  red:    'bg-red-100 text-red-700 dark:bg-red-950/60 dark:text-red-300',
  cyan:   'bg-cyan-100 text-cyan-700 dark:bg-cyan-950/60 dark:text-cyan-300',
  orange: 'bg-orange-100 text-orange-700 dark:bg-orange-950/60 dark:text-orange-300',
  green:  'bg-emerald-100 text-emerald-700 dark:bg-emerald-950/60 dark:text-emerald-300',
  yellow: 'bg-yellow-100 text-yellow-700 dark:bg-yellow-950/60 dark:text-yellow-300',
  teal:   'bg-teal-100 text-teal-700 dark:bg-teal-950/60 dark:text-teal-300',
};

const statCards = [
  { value: personalInfo.gpa, label: 'GPA', sub: '/ 4.00 · Honors', icon: GraduationCap, accent: 'from-emerald-500 to-teal-500' },
  { value: '100+', label: 'Students', sub: 'UAD Practicums', icon: TrendingUp, accent: 'from-sky-500 to-indigo-500' },
  { value: '3+', label: 'Projects', sub: 'Deployed & Live', icon: Code2, accent: 'from-violet-500 to-purple-500' },
  { value: '12+', label: 'Certs', sub: 'Training & Badges', icon: Database, accent: 'from-amber-500 to-orange-500' },
];

export default function Hero() {
  const scrollRef = useRef(null);
  const [dragStart, setDragStart] = useState(null);

  const scroll = (dir) => {
    scrollRef.current?.scrollBy({ left: dir * 220, behavior: 'smooth' });
  };

  return (
    <section id="home" className="relative min-h-screen overflow-hidden flex flex-col justify-center py-16 sm:py-20">
      {/* Layered ambient background */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -top-24 left-1/4 h-[600px] w-[600px] rounded-full bg-sky-400/10 blur-[120px] dark:bg-sky-600/10" />
        <div className="absolute bottom-0 right-1/4 h-[400px] w-[400px] rounded-full bg-indigo-400/10 blur-[100px] dark:bg-indigo-600/10" />
        <div className="absolute top-1/2 left-0 h-[300px] w-[300px] rounded-full bg-emerald-400/8 blur-[90px] dark:bg-emerald-600/10" />
      </div>

      <div className="relative mx-auto max-w-[1200px] px-4 sm:px-6 lg:px-8 w-full">
        {/* ─── HERO LAYOUT: 2 columns ─── */}
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_360px] gap-10 xl:gap-16 items-center">

          {/* ── LEFT: Main content ── */}
          <div>
            {/* Status badge */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="mb-5 inline-flex items-center gap-2 rounded-full border border-emerald-300/60 bg-emerald-50/80 px-4 py-1.5 text-xs font-semibold text-emerald-800 backdrop-blur dark:border-emerald-500/20 dark:bg-emerald-950/40 dark:text-emerald-300"
            >
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
              </span>
              Open for Entry-Level Opportunities
            </motion.div>

            {/* Headline */}
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.05 }}
              className="font-display text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-black tracking-tight text-slate-900 dark:text-white leading-[1.05]"
            >
              Felia Nadia
              <br />
              <span className="bg-gradient-to-r from-sky-500 via-indigo-500 to-violet-500 bg-clip-text text-transparent">
                Fikarda
              </span>
            </motion.h1>

            {/* Sub-role */}
            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.12 }}
              className="mt-4 text-base sm:text-xl font-medium text-slate-600 dark:text-slate-300 flex flex-wrap items-center gap-2"
            >
              <span>Data Analyst</span>
              <span className="w-1 h-1 rounded-full bg-slate-400" />
              <span>Software Developer</span>
              <span className="w-1 h-1 rounded-full bg-slate-400" />
              <span className="inline-flex items-center gap-1 text-sm text-slate-500 dark:text-slate-400">
                <MapPin className="h-3.5 w-3.5 text-sky-500" />
                Yogyakarta
              </span>
            </motion.p>

            {/* Desc */}
            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.18 }}
              className="mt-5 max-w-xl text-sm sm:text-base leading-relaxed text-slate-600 dark:text-slate-400"
            >
              Bachelor of Informatics graduate from Universitas Ahmad Dahlan with GPA{' '}
              <b className="text-slate-800 dark:text-slate-200">{personalInfo.gpa}</b> (Honors).
              Passionate about <b className="text-sky-600 dark:text-sky-400">data analysis & NLP</b> and{' '}
              <b className="text-sky-600 dark:text-sky-400">web software engineering</b>.
            </motion.p>

            {/* CTA Row */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.24 }}
              className="mt-7 flex flex-wrap items-center gap-3"
            >
              <a
                href={`mailto:${personalInfo.email}`}
                className="inline-flex items-center gap-2 rounded-2xl bg-gradient-to-r from-sky-500 to-indigo-600 px-6 py-3 text-sm font-semibold text-white shadow-xl shadow-sky-500/25 transition-all hover:-translate-y-1 hover:shadow-sky-500/40 active:scale-95"
              >
                Contact Me
                <ArrowRight className="h-4 w-4" />
              </a>
              <a
                href={personalInfo.cvPath}
                download
                className="inline-flex items-center gap-2 rounded-2xl border border-slate-300/80 bg-white/80 px-6 py-3 text-sm font-semibold text-slate-800 backdrop-blur shadow-sm transition-all hover:-translate-y-1 hover:border-sky-400 hover:text-sky-600 active:scale-95 dark:border-white/15 dark:bg-white/5 dark:text-slate-200 dark:hover:border-sky-400 dark:hover:text-sky-400"
              >
                <Download className="h-4 w-4" />
                Download CV
              </a>
              <div className="flex items-center gap-1.5">
                {[
                  { href: personalInfo.github, icon: Github, label: 'GitHub', hover: 'hover:text-slate-900 dark:hover:text-white' },
                  { href: personalInfo.linkedin, icon: Linkedin, label: 'LinkedIn', hover: 'hover:text-sky-600 dark:hover:text-sky-400' },
                  { href: personalInfo.whatsapp, icon: MessageCircle, label: 'WhatsApp', hover: 'hover:text-emerald-600 dark:hover:text-emerald-400' },
                ].map(({ href, icon: Icon, label, hover }) => (
                  <a
                    key={label}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={label}
                    className={`flex h-10 w-10 items-center justify-center rounded-xl border border-slate-300/80 bg-white/80 text-slate-600 backdrop-blur transition-all hover:scale-110 hover:shadow-sm active:scale-95 dark:border-white/15 dark:bg-white/5 dark:text-slate-400 ${hover}`}
                  >
                    <Icon className="h-4 w-4" />
                  </a>
                ))}
              </div>
            </motion.div>

            {/* Stats Row */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.32 }}
              className="mt-8 grid grid-cols-2 sm:grid-cols-4 gap-3"
            >
              {statCards.map(({ value, label, sub, icon: Icon, accent }, i) => (
                <div
                  key={label}
                  className="group rounded-2xl border border-slate-200/80 bg-white/70 p-3.5 text-center backdrop-blur transition-all hover:-translate-y-1 hover:shadow-md dark:border-white/10 dark:bg-white/[0.04]"
                >
                  <div className={`mx-auto mb-2 flex h-8 w-8 items-center justify-center rounded-xl bg-gradient-to-br ${accent} shadow-sm`}>
                    <Icon className="h-4 w-4 text-white" />
                  </div>
                  <div className="text-xl font-black font-mono text-slate-900 dark:text-white">{value}</div>
                  <div className="text-[11px] font-bold text-slate-700 dark:text-slate-300">{label}</div>
                  <div className="text-[10px] text-slate-500 dark:text-slate-500">{sub}</div>
                </div>
              ))}
            </motion.div>
          </div>

          {/* ── RIGHT: Profile + Tech ── */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="flex flex-col gap-4 lg:gap-5"
          >
            {/* Profile Card */}
            <div className="relative overflow-hidden rounded-3xl border border-slate-200/80 bg-white/80 p-1 backdrop-blur-xl shadow-2xl shadow-slate-900/10 dark:border-white/10 dark:bg-[#0F1624]/80">
              <div className="relative aspect-[3/4] overflow-hidden rounded-2xl bg-slate-100 dark:bg-slate-900">
                <img
                  src={personalInfo.profileImg}
                  alt={personalInfo.name}
                  className="h-full w-full object-cover object-top"
                />
                {/* Gradient overlay at bottom */}
                <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-slate-950/60 via-slate-950/10 to-transparent" />
                {/* Name badge */}
                <div className="absolute bottom-3 left-3 right-3 rounded-xl bg-white/10 backdrop-blur-md border border-white/20 px-3 py-2">
                  <div className="text-sm font-bold text-white">{personalInfo.name}</div>
                  <div className="text-[11px] text-sky-300">Data Analyst · Software Developer</div>
                </div>
                {/* Floating verified badge */}
                <div className="absolute top-3 right-3 flex items-center gap-1 rounded-full bg-emerald-500/90 backdrop-blur-md px-2.5 py-1 text-[10px] font-bold text-white">
                  <Sparkles className="h-3 w-3" />
                  Informatics UAD
                </div>
              </div>
            </div>

            {/* Horizontal-scroll tech pills */}
            <div className="relative rounded-2xl border border-slate-200/80 bg-white/70 p-4 backdrop-blur dark:border-white/10 dark:bg-white/[0.04]">
              <div className="mb-2 flex items-center justify-between">
                <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">Tech Stack</span>
                <div className="flex gap-1">
                  <button onClick={() => scroll(-1)} className="flex h-6 w-6 items-center justify-center rounded-full border border-slate-200 bg-white hover:bg-slate-100 dark:border-white/10 dark:bg-white/5 dark:hover:bg-white/10">
                    <ChevronLeft className="h-3.5 w-3.5 text-slate-600 dark:text-slate-400" />
                  </button>
                  <button onClick={() => scroll(1)} className="flex h-6 w-6 items-center justify-center rounded-full border border-slate-200 bg-white hover:bg-slate-100 dark:border-white/10 dark:bg-white/5 dark:hover:bg-white/10">
                    <ChevronRight className="h-3.5 w-3.5 text-slate-600 dark:text-slate-400" />
                  </button>
                </div>
              </div>
              <div
                ref={scrollRef}
                className="flex gap-2 overflow-x-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden snap-x"
              >
                {techStack.map((tech) => (
                  <span
                    key={tech.name}
                    className={`snap-start flex-none rounded-full px-3 py-1.5 text-[11px] font-semibold whitespace-nowrap ${colorMap[tech.color]}`}
                  >
                    {tech.name}
                  </span>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
