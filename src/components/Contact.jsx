import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  Mail,
  Linkedin,
  Github,
  MessageSquare,
  Send,
  MessageCircle,
  Copy,
  Check,
  ArrowUp,
  MapPin,
  ExternalLink,
} from 'lucide-react';
import { personalInfo } from '../data/portfolioData';

const contactCards = [
  {
    id: 'email',
    icon: Mail,
    label: 'Direct Email',
    value: personalInfo.email,
    actionLabel: 'Send Email',
    href: `mailto:${personalInfo.email}`,
    accent: 'from-sky-500/10 to-indigo-500/10 border-sky-200/80 dark:border-sky-500/20',
    iconBg: 'bg-sky-100 text-sky-700 dark:bg-sky-950/80 dark:text-sky-300',
    linkClass: 'text-sky-600 dark:text-sky-400',
    copyable: true,
  },
  {
    id: 'whatsapp',
    icon: MessageCircle,
    label: 'WhatsApp',
    value: '+62 852-6541-6588',
    actionLabel: 'Message WhatsApp',
    href: personalInfo.whatsapp,
    accent: 'from-emerald-500/10 to-teal-500/10 border-emerald-200/80 dark:border-emerald-500/20',
    iconBg: 'bg-emerald-100 text-emerald-700 dark:bg-emerald-950/80 dark:text-emerald-400',
    linkClass: 'text-emerald-600 dark:text-emerald-400',
    active: true,
  },
  {
    id: 'linkedin',
    icon: Linkedin,
    label: 'LinkedIn',
    value: 'Felia Nadia Fikarda',
    actionLabel: 'View Profile',
    href: personalInfo.linkedin,
    accent: 'from-sky-500/10 to-sky-600/10 border-sky-200/80 dark:border-sky-500/20',
    iconBg: 'bg-sky-100 text-sky-700 dark:bg-sky-950/80 dark:text-sky-300',
    linkClass: 'text-sky-600 dark:text-sky-400',
  },
  {
    id: 'github',
    icon: Github,
    label: 'GitHub',
    value: 'felianadiafikarda',
    actionLabel: 'Explore Repos',
    href: personalInfo.github,
    accent: 'from-slate-500/10 to-slate-600/10 border-slate-200/80 dark:border-white/10',
    iconBg: 'bg-slate-100 text-slate-800 dark:bg-white/10 dark:text-white',
    linkClass: 'text-slate-700 dark:text-slate-300',
  },
];

export default function Contact() {
  const [copiedEmail, setCopiedEmail] = useState(false);

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(personalInfo.email);
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2200);
  };

  const scrollToTop = () => window.scrollTo({ top: 0, behavior: 'smooth' });

  return (
    <>
      <section id="kontak" className="relative py-16 sm:py-20 lg:py-28 overflow-hidden">
        {/* Ambient */}
        <div className="pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[600px] w-[700px] rounded-full bg-sky-400/6 blur-[140px] dark:bg-sky-600/8" />

        <div className="mx-auto max-w-[1200px] px-4 sm:px-6 lg:px-8">

          {/* ── Header ── */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-12 text-center max-w-2xl mx-auto"
          >
            <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-sky-300/60 bg-sky-50/80 px-3.5 py-1.5 text-xs font-bold uppercase tracking-wider text-sky-700 dark:border-sky-500/20 dark:bg-sky-950/40 dark:text-sky-300">
              <MessageSquare className="h-3.5 w-3.5" />
              Get In Touch
            </div>
            <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-slate-900 dark:text-white">
              Connect & Discuss Opportunities
            </h2>
            <p className="mt-3 text-sm sm:text-base text-slate-600 dark:text-slate-400 leading-relaxed">
              Open to full-time roles, contracts, or project collaborations in Data Analysis and Software Engineering.
            </p>
          </motion.div>

          {/* ── 4-Card Grid ── */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
            {contactCards.map((card, i) => (
              <motion.div
                key={card.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.45, delay: i * 0.08 }}
                whileHover={{ y: -5 }}
                className={`rounded-3xl border bg-gradient-to-br p-5 backdrop-blur-xl shadow-[0_12px_30px_rgba(20,35,65,0.06)] flex flex-col justify-between transition-all hover:shadow-lg ${card.accent}`}
              >
                <div>
                  <div className="mb-4 flex items-center justify-between">
                    <div className={`h-10 w-10 rounded-2xl flex items-center justify-center ${card.iconBg}`}>
                      <card.icon className="h-5 w-5" />
                    </div>
                    {card.copyable && (
                      <button
                        onClick={handleCopyEmail}
                        className="p-2 rounded-xl text-slate-400 hover:text-slate-800 hover:bg-slate-100 transition dark:hover:bg-white/5 dark:hover:text-white cursor-pointer"
                        title="Copy email"
                      >
                        {copiedEmail ? <Check className="h-4 w-4 text-emerald-500" /> : <Copy className="h-4 w-4" />}
                      </button>
                    )}
                    {card.active && (
                      <span className="flex items-center gap-1.5 px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-100 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300">
                        <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
                        Active
                      </span>
                    )}
                  </div>
                  <div className="text-[11px] font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">{card.label}</div>
                  <div className="mt-1 text-sm font-semibold text-slate-900 dark:text-white truncate">{card.value}</div>
                </div>
                <div className="mt-5 pt-3 border-t border-slate-100/80 dark:border-white/5">
                  <a
                    href={card.href}
                    target={card.id !== 'email' ? '_blank' : undefined}
                    rel="noopener noreferrer"
                    className={`flex items-center gap-1.5 text-xs font-semibold hover:underline ${card.linkClass}`}
                  >
                    {card.actionLabel}
                    {card.id === 'email' ? <Send className="h-3 w-3" /> : <ExternalLink className="h-3 w-3" />}
                  </a>
                </div>
              </motion.div>
            ))}
          </div>

          {/* ── CTA Banner ── */}
          <motion.div
            initial={{ opacity: 0, scale: 0.97 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="relative overflow-hidden rounded-3xl p-8 sm:p-14 text-center text-white"
          >
            {/* Gradient background */}
            <div className="absolute inset-0 bg-gradient-to-br from-sky-900 via-[#0E1B33] to-indigo-950" />
            {/* Decorative orbs */}
            <div className="pointer-events-none absolute -top-20 -left-20 h-60 w-60 rounded-full bg-sky-500/20 blur-[80px]" />
            <div className="pointer-events-none absolute -bottom-20 -right-20 h-60 w-60 rounded-full bg-indigo-500/20 blur-[80px]" />
            <div className="absolute inset-0 rounded-3xl border border-sky-500/20" />

            <div className="relative z-10 max-w-2xl mx-auto">
              <h3 className="font-display text-2xl sm:text-3xl font-extrabold tracking-tight">
                Interested in Collaborating or Scheduling an Interview?
              </h3>
              <p className="mt-3 text-sm sm:text-base text-sky-100/80 leading-relaxed">
                Available to discuss entry-level roles, data analyst positions, or software engineering opportunities.
              </p>
              <div className="mt-7 flex flex-wrap justify-center items-center gap-3">
                <a
                  href={`mailto:${personalInfo.email}`}
                  className="inline-flex items-center gap-2 rounded-2xl bg-sky-500 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-sky-500/30 hover:bg-sky-400 hover:scale-105 active:scale-95 transition-all"
                >
                  <Send className="h-4 w-4" />
                  Send Email Now
                </a>
                <a
                  href={personalInfo.whatsapp}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-2xl bg-emerald-600 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-emerald-600/30 hover:bg-emerald-500 hover:scale-105 active:scale-95 transition-all"
                >
                  <MessageCircle className="h-4 w-4" />
                  Message via WhatsApp
                </a>
              </div>
            </div>
          </motion.div>

        </div>
      </section>

      {/* ── Footer ── */}
      <footer className="border-t border-slate-200/60 bg-white/80 dark:border-white/5 dark:bg-[#050810]/90 backdrop-blur-xl py-12 transition-colors duration-300">
        <div className="mx-auto max-w-[1200px] px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 pb-10 border-b border-slate-100 dark:border-white/5 items-start">

            {/* Brand */}
            <div className="md:col-span-5 space-y-3">
              <div className="flex items-center gap-2.5">
                <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-sky-500 to-indigo-600 shadow-lg">
                  <span className="text-white text-sm font-black">F</span>
                </div>
                <h4 className="font-display text-lg font-bold text-slate-900 dark:text-white">{personalInfo.name}</h4>
              </div>
              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 max-w-sm leading-relaxed">
                Bachelor of Informatics graduate from Universitas Ahmad Dahlan, Yogyakarta. Specializing in Data Analysis (Python, SQL), NLP Machine Learning, and Full-Stack Web Development.
              </p>
              <div className="flex items-center gap-1.5 text-xs text-slate-500 dark:text-slate-400">
                <MapPin className="h-3.5 w-3.5 text-sky-500" />
                Yogyakarta, Indonesia
              </div>
              {/* Social links */}
              <div className="flex gap-2 pt-1">
                {[
                  { href: personalInfo.github, icon: Github, label: 'GitHub' },
                  { href: personalInfo.linkedin, icon: Linkedin, label: 'LinkedIn' },
                  { href: personalInfo.whatsapp, icon: MessageCircle, label: 'WhatsApp' },
                  { href: `mailto:${personalInfo.email}`, icon: Mail, label: 'Email' },
                ].map(({ href, icon: Icon, label }) => (
                  <a
                    key={label}
                    href={href}
                    target={label !== 'Email' ? '_blank' : undefined}
                    rel="noopener noreferrer"
                    aria-label={label}
                    className="flex h-8 w-8 items-center justify-center rounded-xl border border-slate-200/80 bg-slate-50 text-slate-600 transition-all hover:scale-110 hover:border-sky-300 hover:text-sky-600 dark:border-white/10 dark:bg-white/5 dark:text-slate-400 dark:hover:border-sky-500 dark:hover:text-sky-400"
                  >
                    <Icon className="h-4 w-4" />
                  </a>
                ))}
              </div>
            </div>

            {/* Navigation */}
            <div className="md:col-span-4 space-y-3">
              <div className="text-xs font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500">Navigation</div>
              <ul className="grid grid-cols-2 gap-x-4 gap-y-2 text-xs font-medium text-slate-600 dark:text-slate-400 list-none">
                {[
                  { href: '#home', label: 'Home' },
                  { href: '#profil', label: 'About' },
                  { href: '#pengalaman', label: 'Experience' },
                  { href: '#proyek', label: 'Projects' },
                  { href: '#skill', label: 'Skills' },
                  { href: '#pelatihan', label: 'Training' },
                ].map(({ href, label }) => (
                  <li key={href}>
                    <a href={href} className="hover:text-sky-600 dark:hover:text-sky-400 transition">
                      {label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Availability */}
            <div className="md:col-span-3 space-y-3">
              <div className="text-xs font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500">Status</div>
              <div className="rounded-2xl border border-emerald-200/80 bg-emerald-50/60 p-4 dark:border-emerald-500/20 dark:bg-emerald-950/30">
                <div className="flex items-center gap-2 mb-2">
                  <span className="relative flex h-2 w-2">
                    <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
                    <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
                  </span>
                  <span className="text-xs font-bold text-emerald-700 dark:text-emerald-300">Available for Hire</span>
                </div>
                <p className="text-[11px] text-emerald-800 dark:text-emerald-400 leading-relaxed">
                  Open to entry-level opportunities as a data analyst or software engineer.
                </p>
                <a
                  href={`mailto:${personalInfo.email}`}
                  className="mt-3 flex items-center gap-1.5 text-[11px] font-semibold text-emerald-700 dark:text-emerald-400 hover:underline"
                >
                  Contact Now
                  <Send className="h-3 w-3" />
                </a>
              </div>
            </div>

          </div>

          {/* Bottom bar */}
          <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500 dark:text-slate-500">
            <div>
              © {new Date().getFullYear()} {personalInfo.name}. All rights reserved.
            </div>
            <button
              onClick={scrollToTop}
              className="inline-flex items-center gap-1.5 rounded-xl border border-slate-200/80 bg-slate-50 px-3 py-1.5 text-slate-600 transition hover:bg-slate-100 hover:text-slate-900 dark:border-white/10 dark:bg-white/5 dark:text-slate-400 dark:hover:bg-white/10 dark:hover:text-white cursor-pointer"
            >
              Back to Top
              <ArrowUp className="h-3.5 w-3.5" />
            </button>
          </div>
        </div>
      </footer>
    </>
  );
}
