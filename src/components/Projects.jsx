import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  FolderGit2,
  ExternalLink,
  ZoomIn,
  ChevronLeft,
  ChevronRight,
  Github,
  Code2,
  Eye,
  X,
  FileText,
} from 'lucide-react';
import { projects } from '../data/portfolioData';

export default function Projects({ onOpenLightbox }) {
  const [activeImageIndexes, setActiveImageIndexes] = useState({});
  const [selectedProject, setSelectedProject] = useState(null);
  const scrollRef = useRef(null);

  const handleImageNav = (e, projId, total, dir) => {
    e.stopPropagation();
    setActiveImageIndexes((prev) => ({
      ...prev,
      [projId]: ((prev[projId] || 0) + dir + total) % total,
    }));
  };

  const scrollTrack = (dir) => {
    scrollRef.current?.scrollBy({ left: dir * 360, behavior: 'smooth' });
  };

  return (
    <section id="proyek" className="relative py-16 sm:py-20 lg:py-24 overflow-hidden transition-colors duration-300">
      {/* Ambient glow */}
      <div className="pointer-events-none absolute left-0 top-1/3 h-[500px] w-[500px] rounded-full bg-emerald-400/8 blur-[130px] dark:bg-emerald-600/10" />

      <div className="mx-auto max-w-[1200px] px-4 sm:px-6 lg:px-8">

        {/* ── Header ── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-10 flex flex-col sm:flex-row sm:items-end justify-between gap-6"
        >
          <div>
            <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-emerald-300/60 bg-emerald-50/80 px-3.5 py-1.5 text-xs font-bold uppercase tracking-wider text-emerald-700 dark:border-emerald-500/20 dark:bg-emerald-950/40 dark:text-emerald-300">
              <FolderGit2 className="h-3.5 w-3.5" />
              Featured Portfolio
            </div>
            <h2 className="font-display text-3xl sm:text-4xl font-black tracking-tight text-slate-900 dark:text-white">
              Featured Projects
            </h2>
            <p className="mt-2 text-sm text-slate-600 dark:text-slate-400 max-w-xl">
              Showcase of work in NLP data analysis, machine learning workflows, and database-driven web systems.
            </p>
          </div>
          <div className="flex gap-1.5 flex-shrink-0">
            <button
              onClick={() => scrollTrack(-1)}
              className="flex h-9 w-9 items-center justify-center rounded-xl border border-slate-200/80 bg-white/70 backdrop-blur hover:bg-slate-100 transition dark:border-white/10 dark:bg-white/[0.04] dark:hover:bg-white/10"
              aria-label="Scroll left"
            >
              <ChevronLeft className="h-4 w-4 text-slate-600 dark:text-slate-400" />
            </button>
            <button
              onClick={() => scrollTrack(1)}
              className="flex h-9 w-9 items-center justify-center rounded-xl border border-slate-200/80 bg-white/70 backdrop-blur hover:bg-slate-100 transition dark:border-white/10 dark:bg-white/[0.04] dark:hover:bg-white/10"
              aria-label="Scroll right"
            >
              <ChevronRight className="h-4 w-4 text-slate-600 dark:text-slate-400" />
            </button>
          </div>
        </motion.div>

        {/* ── Horizontal Scroll Track (Matching Training Card Size & Style) ── */}
        <div
          ref={scrollRef}
          className="flex gap-5 overflow-x-auto snap-x snap-mandatory [scrollbar-width:none] [&::-webkit-scrollbar]:hidden pb-4"
        >
          {projects.map((proj, idx) => {
            const activeSlide = activeImageIndexes[proj.id] || 0;
            const images = proj.images || [];
            const totalImages = images.length;
            const currentImage = images[activeSlide] || {};

            return (
              <motion.article
                key={proj.id}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-30px' }}
                transition={{ duration: 0.45, delay: idx * 0.06 }}
                className="group w-[82%] sm:w-[46%] lg:w-[32%] xl:w-[28%] flex-none snap-start rounded-3xl border border-slate-200/80 bg-white/90 dark:border-white/10 dark:bg-[#0E1322]/90 backdrop-blur-xl shadow-[0_14px_35px_rgba(20,35,65,0.06)] flex flex-col overflow-hidden transition-all hover:-translate-y-1 hover:shadow-xl hover:border-emerald-300/60 dark:hover:border-emerald-500/30"
              >
                {/* Image Section */}
                <div className="relative overflow-hidden aspect-[16/10] bg-slate-100 dark:bg-[#080B14] border-b border-slate-200/60 dark:border-white/5 group/media">
                  <div
                    className="h-full w-full cursor-zoom-in flex items-center justify-center p-3"
                    onClick={() => onOpenLightbox(images, activeSlide)}
                  >
                    <img
                      src={currentImage.src}
                      alt={currentImage.alt || proj.title}
                      className="max-h-full max-w-full object-contain transition-transform duration-500 group-hover/media:scale-105"
                    />
                    <div className="absolute inset-0 bg-black/0 group-hover/media:bg-black/10 transition-colors flex items-center justify-center opacity-0 group-hover/media:opacity-100 pointer-events-none">
                      <span className="rounded-full bg-black/60 p-2 text-white backdrop-blur">
                        <ZoomIn className="h-5 w-5" />
                      </span>
                    </div>
                  </div>

                  {/* Navigation Arrows for Multiple Images */}
                  {totalImages > 1 && (
                    <>
                      <button
                        onClick={(e) => handleImageNav(e, proj.id, totalImages, -1)}
                        className="absolute left-2 top-1/2 -translate-y-1/2 z-20 h-7 w-7 rounded-full bg-slate-950/70 text-white flex items-center justify-center hover:bg-emerald-600 transition border border-white/10"
                        aria-label="Previous image"
                      >
                        <ChevronLeft className="h-3.5 w-3.5" />
                      </button>
                      <button
                        onClick={(e) => handleImageNav(e, proj.id, totalImages, 1)}
                        className="absolute right-2 top-1/2 -translate-y-1/2 z-20 h-7 w-7 rounded-full bg-slate-950/70 text-white flex items-center justify-center hover:bg-emerald-600 transition border border-white/10"
                        aria-label="Next image"
                      >
                        <ChevronRight className="h-3.5 w-3.5" />
                      </button>
                    </>
                  )}
                </div>

                {/* Content */}
                <div className="flex flex-col flex-1 p-5">
                  <h3 className="font-display text-[15px] font-bold leading-snug text-slate-900 dark:text-white">
                    {proj.title}
                  </h3>
                  <p className="mt-1 text-[12px] font-semibold text-emerald-600 dark:text-emerald-400 flex items-center gap-1">
                    <Code2 className="h-3.5 w-3.5 text-emerald-500" />
                    {proj.role}
                  </p>

                  <p className="mt-3 text-[12px] leading-relaxed text-slate-600 dark:text-slate-400 flex-1">
                    {proj.description}
                  </p>

                  <div className="mt-4 pt-3 border-t border-slate-100 dark:border-white/5 flex flex-col gap-3">
                    <div className="flex flex-wrap gap-1.5">
                      {proj.tags?.slice(0, 4).map((tag) => (
                        <span
                          key={tag}
                          className="rounded-full border border-slate-200/80 bg-slate-100 px-2.5 py-0.5 text-[10px] font-medium text-slate-700 dark:border-white/10 dark:bg-white/5 dark:text-slate-300"
                        >
                          {tag}
                        </span>
                      ))}
                      {proj.tags?.length > 4 && (
                        <span className="text-[10px] text-slate-400 dark:text-slate-500 self-center">
                          +{proj.tags.length - 4}
                        </span>
                      )}
                    </div>

                    {/* View Detail Button */}
                    <button
                      onClick={() => setSelectedProject(proj)}
                      className="inline-flex items-center justify-center gap-1.5 w-full rounded-xl bg-slate-100 hover:bg-emerald-500 hover:text-white dark:bg-white/5 dark:hover:bg-emerald-500 dark:hover:text-white py-2 text-xs font-semibold text-slate-700 dark:text-slate-300 transition-all shadow-sm hover:shadow-md cursor-pointer"
                    >
                      <Eye className="h-3.5 w-3.5" />
                      View Detail
                    </button>
                  </div>
                </div>
              </motion.article>
            );
          })}
        </div>

        <p className="mt-4 text-center text-xs text-slate-400 dark:text-slate-600">
          ← Scroll or swipe horizontally to explore all projects →
        </p>
      </div>

      {/* ── Detail Modal ── */}
      <AnimatePresence>
        {selectedProject && (
          <div
            className="fixed inset-0 z-[999] flex items-center justify-center bg-black/75 p-4 backdrop-blur-md select-text"
            onClick={() => setSelectedProject(null)}
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.95, opacity: 0, y: 20 }}
              transition={{ type: 'spring', damping: 25, stiffness: 300 }}
              className="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-3xl border border-slate-200/80 bg-white p-6 sm:p-8 shadow-2xl dark:border-white/10 dark:bg-[#0E1322] text-slate-900 dark:text-white"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close Button */}
              <button
                onClick={() => setSelectedProject(null)}
                className="absolute top-5 right-5 flex h-9 w-9 items-center justify-center rounded-full border border-slate-200 bg-slate-100 text-slate-500 hover:bg-slate-200 hover:text-slate-800 dark:border-white/10 dark:bg-white/10 dark:text-slate-400 dark:hover:bg-white/20 dark:hover:text-white transition-all z-10"
                aria-label="Close modal"
              >
                <X className="h-5 w-5" />
              </button>

              {/* Main Image Preview / Gallery */}
              {selectedProject.images && selectedProject.images.length > 0 && (
                <div 
                  className="relative mb-6 overflow-hidden rounded-2xl border border-slate-200/80 dark:border-white/10 bg-slate-950 group cursor-pointer"
                  onClick={() => onOpenLightbox(selectedProject.images, activeImageIndexes[selectedProject.id] || 0)}
                >
                  <img
                    src={selectedProject.images[activeImageIndexes[selectedProject.id] || 0].src}
                    alt={selectedProject.images[activeImageIndexes[selectedProject.id] || 0].alt || selectedProject.title}
                    className="max-h-[320px] w-full object-contain mx-auto transition-transform duration-300 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center text-white text-xs font-semibold gap-1.5">
                    <ZoomIn className="h-4 w-4" /> Click to view full image gallery ({selectedProject.images.length} photos)
                  </div>
                </div>
              )}

              {/* Title & Role */}
              <div className="flex flex-wrap items-center gap-2 mb-2">
                <span className="rounded-full bg-emerald-100 text-emerald-700 dark:bg-emerald-950/60 dark:text-emerald-300 border border-emerald-300/40 px-3 py-1 text-xs font-bold">
                  {selectedProject.role}
                </span>
              </div>

              <h3 className="font-display text-xl sm:text-2xl font-extrabold text-slate-900 dark:text-white leading-tight">
                {selectedProject.title}
              </h3>

              {/* Full Description */}
              <div className="mt-5 pt-5 border-t border-slate-100 dark:border-white/10">
                <h4 className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-2.5">
                  <FileText className="h-3.5 w-3.5 text-emerald-500" />
                  Project Overview & Details
                </h4>
                <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300">
                  {selectedProject.description}
                </p>

                {selectedProject.id === 'proj-1' && (
                  <div className="mt-4 rounded-2xl bg-slate-50 p-4 border border-slate-200/80 dark:bg-white/5 dark:border-white/5">
                    <h5 className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-2">
                      Key Highlights & Methodology:
                    </h5>
                    <ul className="space-y-1.5 text-xs text-slate-700 dark:text-slate-300">
                      {[
                        'Automated data crawling & text preprocessing from platform X.',
                        'Class imbalance mitigation using SMOTE oversampling technique.',
                        'Model evaluation using Confusion Matrix & sentiment distribution visual charts.',
                      ].map((point) => (
                        <li key={point} className="flex items-start gap-2">
                          <span className="mt-1.5 h-1.5 w-1.5 flex-none rounded-full bg-emerald-500" />
                          {point}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>

              {/* Technologies / Tags */}
              <div className="mt-6 pt-4 border-t border-slate-100 dark:border-white/10">
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-2.5">
                  Technologies Used
                </h4>
                <div className="flex flex-wrap gap-2">
                  {selectedProject.tags?.map((tag) => (
                    <span
                      key={tag}
                      className="rounded-full border border-emerald-200/80 bg-emerald-50 dark:border-emerald-500/20 dark:bg-emerald-950/40 px-3 py-1 text-xs font-medium text-emerald-800 dark:text-emerald-300"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              {/* Action Footer */}
              <div className="mt-8 flex flex-wrap items-center justify-between gap-3 pt-4 border-t border-slate-100 dark:border-white/10">
                {selectedProject.link ? (
                  <a
                    href={selectedProject.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-600 px-5 py-2.5 text-xs font-bold text-white shadow-md hover:shadow-lg hover:from-emerald-600 hover:to-teal-700 transition-all"
                  >
                    {selectedProject.link.includes('github') ? (
                      <Github className="h-4 w-4" />
                    ) : (
                      <ExternalLink className="h-4 w-4" />
                    )}
                    {selectedProject.link.includes('github') ? 'View Source Code Repository' : 'Open Live Web Application'}
                  </a>
                ) : (
                  <span />
                )}

                <button
                  onClick={() => setSelectedProject(null)}
                  className="rounded-xl bg-slate-100 dark:bg-white/10 px-5 py-2.5 text-xs font-semibold text-slate-700 dark:text-slate-200 hover:bg-slate-200 dark:hover:bg-white/20 transition-all cursor-pointer"
                >
                  Close
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}
