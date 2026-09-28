import React, { useState, useEffect } from 'react';
import { AnimatePresence } from 'framer-motion';
import IsometricDeckIntro from './components/IsometricDeckIntro';
import Navbar from './components/Navbar';
import DynamicBackground from './components/DynamicBackground';
import Hero from './components/Hero';
import About from './components/About';
import Experience from './components/Experience';
import Projects from './components/Projects';
import Training from './components/Training';
import Skills from './components/Skills';
import Contact from './components/Contact';
import LightboxModal from './components/LightboxModal';

export default function App() {
  const [isDark, setIsDark] = useState(() => {
    const savedTheme = localStorage.getItem('felia-theme');
    if (savedTheme) {
      return savedTheme === 'dark';
    }
    return window.matchMedia('(prefers-color-scheme: dark)').matches;
  });

  const [isIntroActive, setIsIntroActive] = useState(true);

  // Lightbox Modal State
  const [lightboxState, setLightboxState] = useState({
    isOpen: false,
    images: [],
    currentIndex: 0
  });

  useEffect(() => {
    const root = document.documentElement;
    if (isDark) {
      root.classList.add('dark');
      localStorage.setItem('felia-theme', 'dark');
    } else {
      root.classList.remove('dark');
      localStorage.setItem('felia-theme', 'light');
    }
  }, [isDark]);

  const toggleTheme = () => {
    setIsDark(prev => !prev);
  };

  const handleOpenLightbox = (images, index) => {
    setLightboxState({
      isOpen: true,
      images: images,
      currentIndex: index
    });
  };

  const handleCloseLightbox = () => {
    setLightboxState(prev => ({ ...prev, isOpen: false }));
  };

  const handlePrevLightboxImage = () => {
    setLightboxState(prev => {
      const total = prev.images.length;
      if (total <= 1) return prev;
      return {
        ...prev,
        currentIndex: (prev.currentIndex - 1 + total) % total
      };
    });
  };

  const handleNextLightboxImage = () => {
    setLightboxState(prev => {
      const total = prev.images.length;
      if (total <= 1) return prev;
      return {
        ...prev,
        currentIndex: (prev.currentIndex + 1) % total
      };
    });
  };

  return (
    <div className="relative min-h-screen bg-[#FBFBFD] text-ink font-body transition-colors duration-300 dark:bg-[#0E1120] dark:text-[#EEF0F8]">
      {/* 3D Card Deck Unfold Intro */}
      <AnimatePresence mode="wait">
        {isIntroActive && (
          <IsometricDeckIntro
            key="isometric-deck-intro"
            isDark={isDark}
            onComplete={() => setIsIntroActive(false)}
          />
        )}
      </AnimatePresence>

      {/* Main Portfolio Web Application */}
      <Navbar isDark={isDark} toggleTheme={toggleTheme} />

      <main className="relative">
        <DynamicBackground />
        <Hero />
        <About />
        <Experience onOpenLightbox={handleOpenLightbox} />
        <Projects onOpenLightbox={handleOpenLightbox} />
        <Training onOpenLightbox={handleOpenLightbox} />
        <Skills />
        <Contact />
      </main>

      {/* Global Image Lightbox Modal */}
      <LightboxModal
        isOpen={lightboxState.isOpen}
        onClose={handleCloseLightbox}
        images={lightboxState.images}
        currentIndex={lightboxState.currentIndex}
        onPrev={handlePrevLightboxImage}
        onNext={handleNextLightboxImage}
      />
    </div>
  );
}
