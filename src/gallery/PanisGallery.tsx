import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Compass,
  MapPin,
  Layers,
  Eye,
  X,
  TrendingUp,
  ChevronLeft,
  ChevronRight,
  Info,
  Calendar,
  Sparkles,
  MousePointerClick,
  Maximize2,
  ArrowLeft
} from 'lucide-react';
import { CircularGallery } from './CircularGallery';
import { Specimen } from './botanicalData';
import { GalleryConfig } from './galleryConfigs';
import { optimizeImg } from './optimizeImg';

const cn = (...classes: (string | undefined | null | false)[]) => {
  return classes.filter(Boolean).join(' ');
};

interface PanisGalleryProps {
  config: GalleryConfig;
  onBack: () => void;
}

export default function PanisGallery({ config, onBack }: PanisGalleryProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [selectedSpecimen, setSelectedSpecimen] = useState<Specimen | null>(null);
  // Pas d'écran d'accueil : le clic sur une carte mène directement au carrousel des 6 photos.
  const [showWelcome, setShowWelcome] = useState(false);
  const [currentTime, setCurrentTime] = useState('');
  const [radius, setRadius] = useState(640);
  const [cardDims, setCardDims] = useState({ w: 320, h: 420 });
  const galleryRef = useRef<HTMLDivElement>(null);

  // Update dynamic time display
  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setCurrentTime(now.toLocaleTimeString('en-US', { hour12: false }));
    };
    updateTime();
    const timer = setInterval(updateTime, 1000);
    return () => clearInterval(timer);
  }, []);

  // Handle dynamic sizing of 3D circular gallery radius
  useEffect(() => {
    const handleResize = () => {
      const w = window.innerWidth;
      if (w < 640) {
        setRadius(300); // mobile : rayon + cartes réduits pour un coverflow net
        setCardDims({ w: 208, h: 278 });
      } else if (w < 768) {
        setRadius(430);
        setCardDims({ w: 250, h: 330 });
      } else if (w < 1024) {
        setRadius(540);
        setCardDims({ w: 290, h: 385 });
      } else {
        setRadius(640);
        setCardDims({ w: 320, h: 420 });
      }
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const activeSpecimen = config.specimens[activeIndex];

  const handleItemClick = (item: any, index: number) => {
    setSelectedSpecimen(config.specimens[index]);
  };

  return (
    <div className="panis-gallery relative min-h-[300vh] bg-stone-50 text-stone-800 selection:bg-emerald-600 selection:text-white">
      {/* Bouton retour vers la boulangerie */}
      <button
        onClick={onBack}
        className="fixed top-4 right-4 sm:top-5 sm:left-1/2 sm:right-auto sm:-translate-x-1/2 z-[60] flex items-center gap-2 bg-white/90 backdrop-blur-md border border-stone-200 shadow-md rounded-full pl-3 pr-4 py-2 text-xs font-mono text-stone-700 hover:text-emerald-700 hover:border-emerald-300 transition-colors pointer-events-auto cursor-pointer active:scale-95"
      >
        <ArrowLeft className="w-4 h-4" />
        <span className="sm:hidden">Retour</span>
        <span className="hidden sm:inline">Retour à la boulangerie</span>
      </button>

      {/* Scroll indicator & Fixed Museum Vignette */}
      <div className="fixed inset-0 museum-vignette pointer-events-none z-0" />

      {/* Decorative ambient background lights */}
      <div className="fixed top-1/4 left-1/4 w-[500px] h-[500px] bg-emerald-100/40 rounded-full blur-[120px] pointer-events-none z-0" />
      <div className="fixed bottom-1/4 right-1/4 w-[400px] h-[400px] bg-amber-100/30 rounded-full blur-[100px] pointer-events-none z-0" />

      {/* FIXED INTERFACE FRAME (Header, Footer, and Info Overlays) */}
      <div className="fixed inset-0 flex flex-col justify-between p-6 md:p-8 pointer-events-none z-10 select-none">
        
        {/* TOP HEADER */}
        <header className="w-full flex items-start justify-between pointer-events-auto">
          <div className="flex flex-col gap-1">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <h1 className="text-2xl md:text-3xl font-serif font-light tracking-[0.2em] text-stone-850">
                {config.brandTitle}
              </h1>
            </div>
            <p className="text-[10px] md:text-xs font-mono text-stone-500 tracking-widest uppercase">
              {config.brandSubtitle}
            </p>
          </div>

          <div className="hidden sm:flex items-center gap-6 text-right">
            <div className="hidden md:flex flex-col font-mono text-[10px] text-stone-400 tracking-wider">
              <span>STATUT EXPOSITION</span>
              <span className="text-stone-600">MODE CONSERVATEUR</span>
            </div>
            <div className="flex flex-col font-mono text-xs text-stone-500 tracking-wider">
              <div className="flex items-center gap-2 justify-end">
                <Calendar className="w-3.5 h-3.5 text-stone-400" />
                <span>2026.07.09</span>
              </div>
              <span className="text-stone-800 font-medium mt-0.5">{currentTime || '06:44:48'}</span>
            </div>
          </div>
        </header>

        {/* BOTTOM METADATA OVERLAY (Active item at front) */}
        <footer className="w-full flex flex-col md:flex-row items-end justify-between gap-6 pointer-events-auto">
          
          {/* Active Specimen Summary (compacte sur mobile) */}
          <div className="w-full max-w-md bg-white/90 backdrop-blur-md border border-stone-200 rounded-2xl p-3.5 md:p-6 shadow-xl shadow-stone-200/40 animate-fade-in">
            <div className="flex items-center gap-3">
              <span className="text-[11px] font-mono px-2 py-0.5 rounded-md bg-stone-100 text-stone-600 border border-stone-200">
                {config.itemLabel} 0{activeIndex + 1}
              </span>
            </div>

            <h3 className="text-lg md:text-2xl font-serif font-medium text-stone-900 mt-1.5 md:mt-2.5 leading-tight">
              {activeSpecimen.common}
            </h3>
            <p className="text-xs md:text-sm font-serif italic text-emerald-700 mt-0.5 md:mt-1">
              {activeSpecimen.binomial}
            </p>
            <p className="hidden sm:block text-xs text-stone-600 mt-3 line-clamp-2 leading-relaxed">
              {activeSpecimen.description}
            </p>

            <div className="flex items-center justify-between gap-4 mt-3 md:mt-4 pt-3 md:pt-4 border-t border-stone-100">
              <div className="flex items-center gap-2 min-w-0">
                <MapPin className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                <span className="text-[10px] font-mono text-stone-500 truncate">{activeSpecimen.coordinates}</span>
              </div>
              <button
                onClick={() => setSelectedSpecimen(activeSpecimen)}
                className="flex items-center gap-1.5 text-xs font-mono text-emerald-600 hover:text-emerald-700 transition-colors group cursor-pointer shrink-0"
              >
                <span>Fiche Technique</span>
                <Maximize2 className="w-3.5 h-3.5 group-hover:scale-110 transition-transform" />
              </button>
            </div>
          </div>

          {/* Scrolling & Drag hint */}
          <div className="flex flex-col items-end gap-2 text-right">
            <div className="flex items-center gap-2 bg-white/90 backdrop-blur-md border border-stone-200 shadow-md rounded-full px-4 py-2 text-xs font-mono text-stone-600">
              <MousePointerClick className="w-3.5 h-3.5 text-emerald-600 animate-pulse" />
              <span>Faites défiler la page ou glissez pour tourner</span>
            </div>
            
            {/* Index Tracker dots */}
            <div className="flex items-center gap-1.5 mt-2 px-1">
              {config.specimens.map((_, idx) => (
                <div 
                  key={idx}
                  className={cn(
                    "h-1 rounded-full transition-all duration-300",
                    idx === activeIndex ? "w-6 bg-emerald-600" : "w-1.5 bg-stone-200"
                  )}
                />
              ))}
            </div>
          </div>

        </footer>
      </div>

      {/* 3D EXHIBITION STAGE */}
      <main className="fixed inset-0 w-full h-full flex items-center justify-center pointer-events-auto z-1">
        <div className="w-full h-full max-w-7xl mx-auto flex items-center justify-center px-4 -translate-y-20 sm:translate-y-0">
          <CircularGallery
            items={config.specimens}
            radius={radius}
            cardWidth={cardDims.w}
            cardHeight={cardDims.h}
            autoRotateSpeed={0.015}
            onActiveItemChange={(idx) => setActiveIndex(idx)}
            onItemClick={handleItemClick}
          />
        </div>
      </main>

      {/* INTRODUCTORY WELCOME CARD */}
      <AnimatePresence>
        {showWelcome && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-stone-100/80 backdrop-blur-md z-50 flex items-center justify-center p-6"
          >
            <motion.div 
              initial={{ scale: 0.95, y: 15 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.95, y: 15 }}
              transition={{ type: "spring", duration: 0.6 }}
              className="max-w-xl bg-white border border-stone-200 p-8 rounded-3xl text-center shadow-[0_20px_60px_rgba(40,30,20,0.08)] relative overflow-hidden"
            >
              {/* Card decorative line */}
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-40 h-[2px] bg-gradient-to-r from-transparent via-emerald-500 to-transparent" />

              <div className="w-16 h-16 rounded-2xl bg-emerald-50 border border-emerald-100 flex items-center justify-center mx-auto mb-6">
                <Compass className="w-8 h-8 text-emerald-600" />
              </div>

              <h2 className="text-3xl font-serif font-light tracking-wide text-stone-900">
                {config.welcomeTitle}
              </h2>
              <em className="text-sm font-serif italic text-emerald-700 mt-1 block">
                {config.welcomeSubtitle}
              </em>

              <p className="text-sm text-stone-600 mt-6 leading-relaxed">
                {config.welcomeIntro}
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6 text-left">
                <div className="bg-stone-50 border border-stone-100 p-3.5 rounded-xl flex gap-3">
                  <div className="text-emerald-600 mt-0.5 font-mono text-xs font-bold">[1]</div>
                  <div>
                    <h4 className="text-xs font-mono uppercase tracking-wider text-stone-850">Défiler pour tourner</h4>
                    <p className="text-xs text-stone-500 mt-1">Faites défiler vers le bas ou le haut pour tourner le carrousel des pains.</p>
                  </div>
                </div>
                <div className="bg-stone-50 border border-stone-100 p-3.5 rounded-xl flex gap-3">
                  <div className="text-emerald-600 mt-0.5 font-mono text-xs font-bold">[2]</div>
                  <div>
                    <h4 className="text-xs font-mono uppercase tracking-wider text-stone-850">Glisser & Inertie</h4>
                    <p className="text-xs text-stone-500 mt-1">Cliquez/touchez et glissez pour faire pivoter avec une dérive inertielle fluide.</p>
                  </div>
                </div>
                <div className="bg-stone-50 border border-stone-100 p-3.5 rounded-xl flex gap-3">
                  <div className="text-emerald-600 mt-0.5 font-mono text-xs font-bold">[3]</div>
                  <div>
                    <h4 className="text-xs font-mono uppercase tracking-wider text-stone-850">Fiche Technique</h4>
                    <p className="text-xs text-stone-500 mt-1">Cliquez sur un pain de face pour ouvrir ses spécifications de cuisson détaillées.</p>
                  </div>
                </div>
                <div className="bg-stone-50 border border-stone-100 p-3.5 rounded-xl flex gap-3">
                  <div className="text-emerald-600 mt-0.5 font-mono text-xs font-bold">[4]</div>
                  <div>
                    <h4 className="text-xs font-mono uppercase tracking-wider text-stone-850">Cliquer pour Centrer</h4>
                    <p className="text-xs text-stone-500 mt-1">Cliquez sur un pain en arrière-plan pour le ramener instantanément à l'avant.</p>
                  </div>
                </div>
              </div>

              <button 
                onClick={() => setShowWelcome(false)}
                className="mt-8 w-full py-3 bg-emerald-600 hover:bg-emerald-700 text-white font-mono font-medium text-xs tracking-wider uppercase rounded-xl transition-all cursor-pointer shadow-lg active:scale-[0.98]"
              >
                Entrer dans l'Exposition
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* FLOATING DETAIL DOSSIER PANEL (SLIDES FROM RIGHT) */}
      <AnimatePresence>
        {selectedSpecimen && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-stone-900/30 backdrop-blur-md z-40 flex justify-end"
            onClick={() => setSelectedSpecimen(null)}
          >
            <motion.div 
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 180 }}
              className="w-full max-w-xl bg-white border-l border-stone-200 h-full overflow-y-auto relative p-6 md:p-8 flex flex-col justify-between shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close Button */}
              <button 
                onClick={() => setSelectedSpecimen(null)}
                className="absolute top-6 right-6 w-9 h-9 rounded-full bg-stone-50 border border-stone-200 flex items-center justify-center text-stone-500 hover:text-stone-800 hover:bg-stone-100 transition-colors cursor-pointer z-10"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="flex-1">
                {/* Visual Header */}
                <div className="relative w-full h-56 rounded-2xl overflow-hidden border border-stone-200 mb-6">
                  <img
                    src={optimizeImg(selectedSpecimen.photo.url, 900)}
                    alt={selectedSpecimen.photo.text}
                    loading="eager"
                    decoding="async"
                    referrerPolicy="no-referrer"
                    className="absolute inset-0 w-full h-full object-cover"
                    style={{ objectPosition: selectedSpecimen.photo.pos || 'center' }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
                </div>

                {/* Names */}
                <div className="flex flex-col gap-1.5">
                  <h2 className="text-3xl md:text-4xl font-serif font-light text-stone-900">
                    {selectedSpecimen.common}
                  </h2>
                  <em className="text-lg font-serif italic text-emerald-700">
                    {selectedSpecimen.binomial}
                  </em>
                </div>

                {/* Specimen Profile Grid */}
                <div className="grid grid-cols-2 gap-4 mt-6 p-4 rounded-xl bg-stone-50 border border-stone-200">
                  <div className="flex items-start gap-2.5">
                    <Layers className="w-4 h-4 text-stone-400 mt-0.5" />
                    <div>
                      <h4 className="text-[10px] font-mono uppercase tracking-wider text-stone-400">Classification</h4>
                      <p className="text-sm font-medium text-stone-700">{selectedSpecimen.family}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-2.5">
                    <Compass className="w-4 h-4 text-stone-400 mt-0.5" />
                    <div>
                      <h4 className="text-[10px] font-mono uppercase tracking-wider text-stone-400">{config.metricLabel}</h4>
                      <p className="text-sm font-medium text-stone-700">{selectedSpecimen.elevation}</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-2.5">
                    <MapPin className="w-4 h-4 text-stone-400 mt-0.5" />
                    <div>
                      <h4 className="text-[10px] font-mono uppercase tracking-wider text-stone-400">Coordonnées d'Origine</h4>
                      <p className="text-xs font-mono text-stone-600">{selectedSpecimen.coordinates}</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-2.5">
                    <TrendingUp className="w-4 h-4 text-stone-400 mt-0.5" />
                    <div>
                      <h4 className="text-[10px] font-mono uppercase tracking-wider text-stone-400">Complexité de Cuisson</h4>
                      <p className="text-sm font-mono text-emerald-700">{selectedSpecimen.rarityScore}%</p>
                    </div>
                  </div>
                </div>

                {/* Progress bar for Rarity Quotient */}
                <div className="mt-3 px-1">
                  <div className="w-full bg-stone-100 h-1 rounded-full overflow-hidden">
                    <motion.div 
                      initial={{ width: 0 }}
                      animate={{ width: `${selectedSpecimen.rarityScore}%` }}
                      transition={{ delay: 0.3, duration: 0.8 }}
                      className="bg-gradient-to-r from-emerald-600 to-cyan-500 h-full rounded-full"
                    />
                  </div>
                </div>

                {/* Botanical Origin */}
                <div className="mt-6">
                  <h3 className="text-xs font-mono uppercase tracking-widest text-stone-400">Origine & Histoire</h3>
                  <p className="text-sm text-stone-700 mt-1.5 leading-relaxed font-serif font-light">
                    {selectedSpecimen.origin}
                  </p>
                </div>

                {/* Botanical Record / Scientific Description */}
                <div className="mt-6">
                  <h3 className="text-xs font-mono uppercase tracking-widest text-stone-400">Carnet du Maître Boulanger</h3>
                  <p className="text-sm text-stone-700 mt-1.5 leading-relaxed font-light">
                    {selectedSpecimen.description}
                  </p>
                </div>

                {/* Fun Fact / Trivia card */}
                <div className="mt-6 p-4 rounded-xl bg-emerald-50/50 border border-emerald-200/80 relative overflow-hidden">
                  <div className="absolute top-0 right-0 w-16 h-16 bg-emerald-400/5 rounded-bl-full pointer-events-none" />
                  <div className="flex items-center gap-2 text-emerald-700 mb-1.5">
                    <Sparkles className="w-4 h-4" />
                    <h4 className="text-xs font-mono uppercase tracking-wider">Lumière sur l'Exposition</h4>
                  </div>
                  <p className="text-xs text-stone-600 leading-relaxed italic">
                    "{selectedSpecimen.funFact}"
                  </p>
                </div>
              </div>

              {/* Action buttons at bottom */}
              <div className="mt-8 pt-6 border-t border-stone-200 flex gap-4">
                <button 
                  onClick={() => setSelectedSpecimen(null)}
                  className="flex-1 py-3 bg-emerald-600 hover:bg-emerald-700 text-white font-mono text-xs uppercase tracking-widest rounded-xl transition-all cursor-pointer shadow-md"
                >
                  Retourner à l'Exposition
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
