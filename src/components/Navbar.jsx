import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sun, Moon, Menu, X, Mail, Download } from 'lucide-react';
import { personalInfo } from '../data/portfolioData';

const navItems = [
  { id: 'home', label: 'Home' },
  { id: 'profil', label: 'About' },
  { id: 'pengalaman', label: 'Experience' },
  { id: 'proyek', label: 'Projects' },
  { id: 'pelatihan', label: 'Training' },
  { id: 'skill', label: 'Skills' },
  { id: 'kontak', label: 'Contact' },
];

export default function Navbar({ isDark, toggleTheme }) {
  const [activeSection, setActiveSection] = useState('home');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 30);
      const sections = navItems.map(item => document.getElementById(item.id)).filter(Boolean);
      const scrollPosition = window.scrollY + 160;
      for (let i = sections.length - 1; i >= 0; i--) {
        if (sections[i].offsetTop <= scrollPosition) {
          setActiveSection(navItems[i].id);
          break;
        }
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id) => {
    setMobileMenuOpen(false);
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <>
      <header
        className={`sticky top-0 z-50 transition-all duration-500 ${
          scrolled
            ? 'bg-white/60 dark:bg-[#070A14]/70 backdrop-blur-2xl border-b border-white/20 dark:border-white/[0.06] shadow-[0_4px_30px_rgba(0,0,0,0.06)] dark:shadow-[0_4px_30px_rgba(0,0,0,0.3)]'
            : 'bg-white/30 dark:bg-transparent backdrop-blur-md border-b border-transparent'
        }`}
      >
        <div className="mx-auto flex max-w-[1200px] items-center justify-between gap-4 px-5 py-3.5 sm:px-8">

          {/* Logo */}
          <button
            onClick={() => scrollToSection('home')}
            className="group flex items-center gap-2.5 font-display font-extrabold text-slate-900 dark:text-white transition-all"
          >
            <span className="relative flex h-8 w-8 items-center justify-center rounded-xl bg-gradient-to-br from-sky-500 to-indigo-600 shadow-lg shadow-sky-500/30 group-hover:shadow-sky-500/50 transition-all group-hover:scale-110">
              <span className="text-white text-sm font-black">F</span>
            </span>
            <span className="hidden sm:block text-base tracking-tight">
              {personalInfo.name.split(' ')[0]}
              <span className="text-sky-500 dark:text-sky-400">.</span>
            </span>
          </button>

          {/* Desktop Navigation Pill */}
          <nav className="hidden lg:block">
            <ul className="flex items-center gap-1 rounded-full border border-slate-200/80 bg-white/70 px-2 py-1.5 backdrop-blur-md dark:border-white/10 dark:bg-white/[0.04] list-none">
              {navItems.map((item) => {
                const isActive = activeSection === item.id;
                return (
                  <li key={item.id}>
                    <button
                      onClick={() => scrollToSection(item.id)}
                      className={`relative rounded-full px-4 py-1.5 text-[13px] font-medium transition-all duration-200 hover:scale-105 active:scale-95 ${
                        isActive
                          ? 'text-white'
                          : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/60 dark:text-slate-400 dark:hover:text-white dark:hover:bg-white/10'
                      }`}
                    >
                      {isActive && (
                        <motion.span
                          layoutId="navbar-active-pill"
                          className="absolute inset-0 rounded-full bg-gradient-to-r from-sky-500 to-indigo-600 shadow-md shadow-sky-500/30"
                          transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                        />
                      )}
                      <span className="relative z-10">{item.label}</span>
                    </button>
                  </li>
                );
              })}
            </ul>
          </nav>

          {/* Right Actions */}
          <div className="flex items-center gap-2">
            {/* Theme Toggle */}
            <button
              onClick={toggleTheme}
              aria-label="Toggle theme"
              className="relative flex h-9 w-9 items-center justify-center rounded-full border border-slate-200/80 bg-white/70 text-slate-600 backdrop-blur-md transition-all hover:scale-110 hover:border-sky-300 dark:border-white/10 dark:bg-white/[0.04] dark:text-slate-400 dark:hover:border-sky-500 dark:hover:text-white"
            >
              <AnimatePresence mode="wait">
                <motion.span
                  key={isDark ? 'sun' : 'moon'}
                  initial={{ rotate: -90, opacity: 0, scale: 0.5 }}
                  animate={{ rotate: 0, opacity: 1, scale: 1 }}
                  exit={{ rotate: 90, opacity: 0, scale: 0.5 }}
                  transition={{ duration: 0.2 }}
                >
                  {isDark ? <Sun className="h-4 w-4 text-amber-400" /> : <Moon className="h-4 w-4" />}
                </motion.span>
              </AnimatePresence>
            </button>

            {/* CTA Button */}
            <a
              href={`mailto:${personalInfo.email}`}
              className="hidden sm:inline-flex items-center gap-1.5 rounded-full bg-gradient-to-r from-sky-500 to-indigo-600 px-4 py-2 text-[13px] font-semibold text-white shadow-lg shadow-sky-500/25 transition-all hover:-translate-y-0.5 hover:shadow-sky-500/40"
            >
              <Mail className="h-3.5 w-3.5" />
              Hire Me
            </a>

            {/* Mobile Menu */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Toggle menu"
              className="flex h-9 w-9 items-center justify-center rounded-full border border-slate-200/80 bg-white/70 text-slate-700 backdrop-blur-md transition-all hover:bg-slate-100 dark:border-white/10 dark:bg-white/[0.04] dark:text-white dark:hover:bg-white/10 lg:hidden"
            >
              {mobileMenuOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.2 }}
            className="fixed top-[61px] left-4 right-4 z-40 rounded-2xl border border-white/30 bg-white/80 p-4 shadow-2xl backdrop-blur-2xl dark:border-white/10 dark:bg-[#0D1120]/85 lg:hidden"
          >
            <ul className="flex flex-col gap-1 list-none">
              {navItems.map((item) => (
                <li key={item.id}>
                  <button
                    onClick={() => scrollToSection(item.id)}
                    className={`w-full text-left rounded-xl px-4 py-2.5 text-sm font-medium transition-all ${
                      activeSection === item.id
                        ? 'bg-gradient-to-r from-sky-500/10 to-indigo-500/10 text-sky-600 dark:text-sky-400 border border-sky-200 dark:border-sky-500/20'
                        : 'text-slate-700 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-white/5'
                    }`}
                  >
                    {item.label}
                  </button>
                </li>
              ))}
              <li className="mt-1 pt-2 border-t border-slate-100 dark:border-white/5">
                <a
                  href={personalInfo.cvPath}
                  download
                  className="flex items-center gap-2 rounded-xl px-4 py-2.5 text-sm font-semibold text-sky-600 dark:text-sky-400 hover:bg-sky-50 dark:hover:bg-sky-950/30"
                >
                  <Download className="h-4 w-4" />
                  Download CV
                </a>
              </li>
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
