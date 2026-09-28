import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Award, ChevronLeft, ChevronRight, ZoomIn, Eye, X, FileText } from 'lucide-react';
import { trainingCertifications } from '../data/portfolioData';

export default function Training({ onOpenLightbox }) {
  const [filter, setFilter] = useState('all');
  const [selectedDetailItem, setSelectedDetailItem] = useState(null);
  const scrollRef = useRef(null);

  const filteredItems = trainingCertifications.filter((item) =>
    filter === 'all' ? true : item.category === filter
  );

  const scrollTrack = (dir) => {
    scrollRef.current?.scrollBy({ left: dir * 360, behavior: 'smooth' });
  };

  const filterTabs = [
    { key: 'all', label: 'All' },
    { key: 'training', label: 'Training' },
    { key: 'certification', label: 'Certification' },
  ];

  const categoryColors = {
    training: 'bg-sky-100 text-sky-700 dark:bg-sky-950/60 dark:text-sky-300',
    certification: 'bg-amber-100 text-amber-700 dark:bg-amber-950/60 dark:text-amber-300',
  };

  return (
    <section id="pelatihan" className="relative py-16 sm:py-20 lg:py-24 bg-slate-50/60 dark:bg-[#0B0F1B] overflow-hidden transition-colors duration-300">
      {/* Ambient */}
      <div className="pointer-events-none absolute right-0 bottom-0 h-[450px] w-[450px] rounded-full bg-amber-400/8 blur-[130px] dark:bg-amber-600/10" />

      <div className="mx-auto max-w-[1200px] px-4 sm:px-6 lg:px-8">

        {/* ── Header ── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-10 flex flex-col sm:flex-row sm:items-end justify-between gap-6"
        >
          <div>
            <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-amber-300/60 bg-amber-50/80 px-3.5 py-1.5 text-xs font-bold uppercase tracking-wider text-amber-700 dark:border-amber-500/20 dark:bg-amber-950/40 dark:text-amber-300">
              <Award className="h-3.5 w-3.5" />
              Learning & Credentials
            </div>
            <h2 className="font-display text-3xl sm:text-4xl font-black tracking-tight text-slate-900 dark:text-white">
              Training & Certifications
            </h2>
            <p className="mt-2 text-sm text-slate-600 dark:text-slate-400 max-w-xl">
              Professional training and industry-recognized certifications strengthening data analytics, programming, and web development skills.
            </p>
          </div>

          {/* Controls */}
          <div className="flex flex-wrap items-center gap-2 flex-shrink-0">
            {/* Filter tabs */}
            <div className="flex items-center gap-1 rounded-2xl border border-slate-200/80 bg-white/70 p-1.5 backdrop-blur dark:border-white/10 dark:bg-white/[0.04]">
              {filterTabs.map((tab) => (
                <button
                  key={tab.key}
                  onClick={() => setFilter(tab.key)}
                  className={`rounded-xl px-3.5 py-1.5 text-xs font-semibold transition-all ${
                    filter === tab.key
                      ? 'bg-gradient-to-r from-amber-500 to-orange-500 text-white shadow-md'
                      : 'text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>
            {/* Scroll nav */}
            <div className="flex gap-1.5">
              <button
                onClick={() => scrollTrack(-1)}
                className="flex h-9 w-9 items-center justify-center rounded-xl border border-slate-200/80 bg-white/70 backdrop-blur hover:bg-slate-100 dark:border-white/10 dark:bg-white/[0.04] dark:hover:bg-white/10"
              >
                <ChevronLeft className="h-4 w-4 text-slate-600 dark:text-slate-400" />
              </button>
              <button
                onClick={() => scrollTrack(1)}
                className="flex h-9 w-9 items-center justify-center rounded-xl border border-slate-200/80 bg-white/70 backdrop-blur hover:bg-slate-100 dark:border-white/10 dark:bg-white/[0.04] dark:hover:bg-white/10"
              >
                <ChevronRight className="h-4 w-4 text-slate-600 dark:text-slate-400" />
              </button>
            </div>
          </div>
        </motion.div>

        {/* ── Horizontal Scroll Track ── */}
        <div
          ref={scrollRef}
          className="flex gap-5 overflow-x-auto snap-x snap-mandatory [scrollbar-width:none] [&::-webkit-scrollbar]:hidden pb-4"
        >
          {filteredItems.map((item, idx) => {
            const images = item.images || [];
            const firstImage = images[0] || {};

            return (
              <motion.article
                key={item.id}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-30px' }}
                transition={{ duration: 0.45, delay: idx * 0.06 }}
                className="group w-[82%] sm:w-[46%] lg:w-[32%] xl:w-[28%] flex-none snap-start rounded-3xl border border-slate-200/80 bg-white/90 dark:border-white/10 dark:bg-[#0E1322]/90 backdrop-blur-xl shadow-[0_14px_35px_rgba(20,35,65,0.06)] flex flex-col overflow-hidden transition-all hover:-translate-y-1 hover:shadow-xl hover:border-amber-300/60 dark:hover:border-amber-500/30"
              >
                {/* Image */}
                <div className="relative overflow-hidden aspect-[16/10] bg-slate-100 dark:bg-[#080B14] border-b border-slate-200/60 dark:border-white/5">
                  {/* Badges */}
                  <div className="absolute top-3 left-3 z-30">
                    <span className={`rounded-full px-2.5 py-1 text-[10px] font-bold backdrop-blur ${categoryColors[item.category]}`}>
                      {item.category === 'training' ? 'Training' : 'Certification'}
                    </span>
                  </div>
                  <div className="absolute top-3 right-3 z-30">
                    <span className="rounded-full bg-slate-950/70 border border-white/15 px-2.5 py-1 text-[10px] text-slate-200 backdrop-blur">
                      {item.period}
                    </span>
                  </div>

                  <div
                    className="h-full w-full cursor-zoom-in flex items-center justify-center p-3"
                    onClick={() => onOpenLightbox(images, 0)}
                  >
                    <img
                      src={firstImage.src}
                      alt={firstImage.alt || item.title}
                      className="max-h-full max-w-full object-contain transition-transform duration-500 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors flex items-center justify-center opacity-0 group-hover:opacity-100 pointer-events-none">
                      <span className="rounded-full bg-black/60 p-2 text-white backdrop-blur">
                        <ZoomIn className="h-5 w-5" />
                      </span>
                    </div>
                  </div>
                </div>

                {/* Content */}
                <div className="flex flex-col flex-1 p-5">
                  <h3 className="font-display text-[15px] font-bold leading-snug text-slate-900 dark:text-white">
                    {item.title}
                  </h3>
                  <p className="mt-1 text-[12px] font-semibold text-sky-600 dark:text-sky-400">
                    {item.issuer}
                  </p>
                  
                  {/* Description text - untruncated */}
                  <p className="mt-3 text-[12px] leading-relaxed text-slate-600 dark:text-slate-400 flex-1">
                    {item.description}
                  </p>

                  <div className="mt-4 pt-3 border-t border-slate-100 dark:border-white/5 flex flex-col gap-3">
                    <div className="flex flex-wrap gap-1.5">
                      {item.tags.slice(0, 4).map((tag, tIdx) => (
                        <span
                          key={tIdx}
                          className="rounded-full border border-slate-200/80 bg-slate-100 px-2.5 py-0.5 text-[10px] font-medium text-slate-700 dark:border-white/10 dark:bg-white/5 dark:text-slate-300"
                        >
                          {tag}
                        </span>
                      ))}
                      {item.tags.length > 4 && (
                        <span className="text-[10px] text-slate-400 dark:text-slate-500 self-center">+{item.tags.length - 4}</span>
                      )}
                    </div>

                    {/* View Detail Button */}
                    <button
                      onClick={() => setSelectedDetailItem(item)}
                      className="inline-flex items-center justify-center gap-1.5 w-full rounded-xl bg-slate-100 hover:bg-amber-500 hover:text-white dark:bg-white/5 dark:hover:bg-amber-500 dark:hover:text-white py-2 text-xs font-semibold text-slate-700 dark:text-slate-300 transition-all shadow-sm hover:shadow-md cursor-pointer"
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
          ← Scroll or swipe horizontally to view all credentials →
        </p>
      </div>

      {/* ── Detail Modal ── */}
      <AnimatePresence>
        {selectedDetailItem && (
          <div
            className="fixed inset-0 z-[999] flex items-center justify-center bg-black/75 p-4 backdrop-blur-md select-text"
            onClick={() => setSelectedDetailItem(null)}
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
                onClick={() => setSelectedDetailItem(null)}
                className="absolute top-5 right-5 flex h-9 w-9 items-center justify-center rounded-full border border-slate-200 bg-slate-100 text-slate-500 hover:bg-slate-200 hover:text-slate-800 dark:border-white/10 dark:bg-white/10 dark:text-slate-400 dark:hover:bg-white/20 dark:hover:text-white transition-all z-10"
                aria-label="Close modal"
              >
                <X className="h-5 w-5" />
              </button>

              {/* Certificate Image Preview */}
              {selectedDetailItem.images && selectedDetailItem.images[0] && (
                <div 
                  className="relative mb-6 overflow-hidden rounded-2xl border border-slate-200/80 dark:border-white/10 bg-slate-950 group cursor-pointer"
                  onClick={() => onOpenLightbox(selectedDetailItem.images, 0)}
                >
                  <img
                    src={selectedDetailItem.images[0].src}
                    alt={selectedDetailItem.images[0].alt || selectedDetailItem.title}
                    className="max-h-[320px] w-full object-contain mx-auto transition-transform duration-300 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center text-white text-xs font-semibold gap-1.5">
                    <ZoomIn className="h-4 w-4" /> Click to view full certificate
                  </div>
                </div>
              )}

              {/* Header Badges */}
              <div className="flex flex-wrap items-center gap-2 mb-3">
                <span className={`rounded-full px-3 py-1 text-xs font-bold ${categoryColors[selectedDetailItem.category]}`}>
                  {selectedDetailItem.category === 'training' ? 'Training' : 'Certification'}
                </span>
                <span className="rounded-full bg-slate-100 dark:bg-white/10 border border-slate-200/80 dark:border-white/10 px-3 py-1 text-xs font-semibold text-slate-600 dark:text-slate-300">
                  {selectedDetailItem.period}
                </span>
              </div>

              {/* Title & Issuer */}
              <h3 className="font-display text-xl sm:text-2xl font-extrabold text-slate-900 dark:text-white leading-tight">
                {selectedDetailItem.title}
              </h3>
              <p className="mt-1.5 text-sm font-semibold text-sky-600 dark:text-sky-400">
                {selectedDetailItem.issuer}
              </p>

              {/* Full Untruncated Description */}
              <div className="mt-5 pt-5 border-t border-slate-100 dark:border-white/10">
                <h4 className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-2.5">
                  <FileText className="h-3.5 w-3.5 text-amber-500" />
                  Description & Competencies
                </h4>
                <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300">
                  {selectedDetailItem.description}
                </p>
              </div>

              {/* Skills / Tags */}
              <div className="mt-6 pt-4 border-t border-slate-100 dark:border-white/10">
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-2.5">
                  Skills & Topics Covered
                </h4>
                <div className="flex flex-wrap gap-2">
                  {selectedDetailItem.tags.map((tag, tIdx) => (
                    <span
                      key={tIdx}
                      className="rounded-full border border-amber-200/80 bg-amber-50 dark:border-amber-500/20 dark:bg-amber-950/40 px-3 py-1 text-xs font-medium text-amber-800 dark:text-amber-300"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              {/* Action Footer */}
              <div className="mt-8 flex justify-end gap-3 pt-4 border-t border-slate-100 dark:border-white/10">
                <button
                  onClick={() => setSelectedDetailItem(null)}
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
