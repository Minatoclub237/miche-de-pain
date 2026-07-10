import React, { useRef, useEffect, useState } from 'react';
import { motion, useScroll, useTransform, useInView, Variants, AnimatePresence } from 'motion/react';
import { ArrowUpRight, Menu, X, MapPin, Phone, Clock } from 'lucide-react';
import { TextEffect } from './components/TextEffect';
import AtelierSection from './atelier/AtelierSection';
import PanisGallery from './gallery/PanisGallery';
import { breadGallery, viennoiserieGallery, patisserieGallery, snackingGallery, GalleryConfig } from './gallery/galleryConfigs';
import Testimonials from './components/Testimonials';
import Footer from './components/Footer';

// ─── Nous Trouver images (remplacer par les photos du client) ───
const VISIT_IMG = 'https://images.unsplash.com/photo-1568254183919-78a4f43a2877?w=1200&q=80';
const ORDER_IMG = 'https://images.unsplash.com/photo-1509440159596-0249088772ff?w=1200&q=80';

// ─── Animation Variants ───
const blurSlideVariants = {
  container: {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.015 } },
    exit: { opacity: 0, transition: { staggerChildren: 0.01, staggerDirection: -1 } },
  },
  item: {
    hidden: { opacity: 0, filter: 'blur(10px) brightness(0%)', y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      filter: 'blur(0px) brightness(100%)',
      transition: { duration: 0.4, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] },
    },
    exit: {
      opacity: 0,
      y: -20,
      filter: 'blur(10px) brightness(0%)',
      transition: { duration: 0.3, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] },
    },
  },
};

const otherElementVariants: Variants = {
  hidden: { opacity: 0, y: 35 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.9, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] } },
  exit: { opacity: 0, y: -25, transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] } },
};

export default function App() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isVideoOpen, setIsVideoOpen] = useState(false);
  const [activeGallery, setActiveGallery] = useState<GalleryConfig | null>(null);
  const returningFromGalleryRef = useRef(false);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const videoRef2 = useRef<HTMLVideoElement>(null);
  const heroRef = useRef<HTMLElement>(null);
  const aboutRef = useRef<HTMLElement>(null);
  const solutionsRef = useRef<HTMLElement>(null);

  const inViewHero = useInView(heroRef, { amount: 0.15, once: false });
  const inViewAbout = useInView(aboutRef, { amount: 0.15, once: false });

  // Scroll tracking for video opacity
  const { scrollYProgress: videoScrollProgress } = useScroll({
    target: scrollContainerRef,
    offset: ['start start', 'end start'],
  });
  const videoOpacity = useTransform(videoScrollProgress, [0.9, 1.0], [1, 0]);
  const video2Opacity = useTransform(videoScrollProgress, [0.9, 1.0], [0, 1]);

  // Sync scroll position with hero video
  useEffect(() => {
    const video = videoRef.current;
    const container = scrollContainerRef.current;
    if (!video || !container) return;

    // Amorçage : play() puis pause() déverrouille le seek vidéo pour que le
    // scrubbing au scroll rende les frames, y compris sur mobile (iOS/Android).
    video.muted = true;
    const primeVideo = () => {
      const pr = video.play();
      if (pr && typeof pr.then === 'function') pr.then(() => video.pause()).catch(() => {});
    };
    primeVideo();
    const onFirstInteract = () => primeVideo();
    window.addEventListener('touchstart', onFirstInteract, { passive: true, once: true });

    let targetProgress = 0;
    let currentProgress = 0;
    let animationFrameId: number;

    const handleScroll = () => {
      const rect = container.getBoundingClientRect();
      const scrollHeight = container.scrollHeight;
      if (scrollHeight <= 0) return;
      const scrolled = -rect.top;
      targetProgress = Math.max(0, Math.min(1, scrolled / scrollHeight));
    };

    const updateVideoProgress = () => {
      currentProgress += (targetProgress - currentProgress) * 0.08;
      if (Math.abs(targetProgress - currentProgress) < 0.0001) {
        currentProgress = targetProgress;
      }
      const duration = video.duration;
      if (duration && !isNaN(duration)) {
        const targetTime = currentProgress * duration;
        if (!video.seeking && Math.abs(video.currentTime - targetTime) > 0.02) {
          video.currentTime = targetTime;
        }
      }
      animationFrameId = requestAnimationFrame(updateVideoProgress);
    };

    handleScroll();
    currentProgress = targetProgress;
    window.addEventListener('scroll', handleScroll, { passive: true });
    animationFrameId = requestAnimationFrame(updateVideoProgress);

    const handleLoadedMetadata = () => {
      handleScroll();
      currentProgress = targetProgress;
    };
    video.addEventListener('loadedmetadata', handleLoadedMetadata);

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('touchstart', onFirstInteract);
      video.removeEventListener('loadedmetadata', handleLoadedMetadata);
    };
  }, []);

  // Sync scroll position with solutions video
  useEffect(() => {
    const video = videoRef2.current;
    const container = solutionsRef.current;
    if (!video || !container) return;

    // Amorçage (play+pause) pour déverrouiller le seek au scroll, mobile inclus.
    video.muted = true;
    const primeVideo = () => {
      const pr = video.play();
      if (pr && typeof pr.then === 'function') pr.then(() => video.pause()).catch(() => {});
    };
    primeVideo();
    const onFirstInteract = () => primeVideo();
    window.addEventListener('touchstart', onFirstInteract, { passive: true, once: true });

    let targetProgress = 0;
    let currentProgress = 0;
    let animationFrameId: number;

    const handleScroll = () => {
      const rect = container.getBoundingClientRect();
      const scrollableHeight = container.scrollHeight - window.innerHeight;
      if (scrollableHeight <= 0) return;
      const scrolled = -rect.top;
      targetProgress = Math.max(0, Math.min(1, scrolled / scrollableHeight));
    };

    const updateVideoProgress = () => {
      currentProgress += (targetProgress - currentProgress) * 0.08;
      if (Math.abs(targetProgress - currentProgress) < 0.0001) {
        currentProgress = targetProgress;
      }
      const duration = video.duration;
      if (duration && !isNaN(duration)) {
        const targetTime = currentProgress * duration;
        if (!video.seeking && Math.abs(video.currentTime - targetTime) > 0.02) {
          video.currentTime = targetTime;
        }
      }
      animationFrameId = requestAnimationFrame(updateVideoProgress);
    };

    handleScroll();
    currentProgress = targetProgress;
    window.addEventListener('scroll', handleScroll, { passive: true });
    animationFrameId = requestAnimationFrame(updateVideoProgress);

    const handleLoadedMetadata = () => {
      handleScroll();
      currentProgress = targetProgress;
    };
    video.addEventListener('loadedmetadata', handleLoadedMetadata);

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('touchstart', onFirstInteract);
      video.removeEventListener('loadedmetadata', handleLoadedMetadata);
    };
  }, []);

  const { scrollYProgress } = useScroll({
    target: solutionsRef,
    offset: ['start start', 'end end'],
  });
  const { scrollYProgress: heroScroll } = useScroll({
    target: heroRef,
    offset: ['start start', 'end start'],
  });

  // Hero section transformations
  const heroTitleOpacity = useTransform(heroScroll, [0, 0.45], [1, 0]);
  const heroTitleBlur = useTransform(heroScroll, [0, 0.45], ['blur(0px)', 'blur(20px)']);
  const heroTitleY = useTransform(heroScroll, [0, 0.45], [0, -60]);
  const heroOtherOpacity = useTransform(heroScroll, [0, 0.45], [1, 0]);
  const heroOtherY = useTransform(heroScroll, [0, 0.45], [0, -40]);

  // About section transformations
  const { scrollYProgress: aboutScroll } = useScroll({
    target: aboutRef,
    offset: ['start end', 'end start'],
  });
  const aboutTitleOpacity = useTransform(aboutScroll, [0.1, 0.35, 0.65, 0.9], [0, 1, 1, 0]);
  const aboutTitleBlur = useTransform(aboutScroll, [0.1, 0.35, 0.65, 0.9], ['blur(20px)', 'blur(0px)', 'blur(0px)', 'blur(20px)']);
  const aboutTitleY = useTransform(aboutScroll, [0.1, 0.35, 0.65, 0.9], [60, 0, 0, -60]);
  const aboutOtherOpacity = useTransform(aboutScroll, [0.15, 0.35, 0.65, 0.85], [0, 1, 1, 0]);
  const aboutOtherY = useTransform(aboutScroll, [0.15, 0.35, 0.65, 0.85], [50, 0, 0, -50]);

  // Solutions sub-set translations (003, 004, 005)
  const opacitySet1 = useTransform(scrollYProgress, [0, 0.05, 0.22, 0.29], [0, 1, 1, 0]);
  const blurSet1 = useTransform(scrollYProgress, [0, 0.05, 0.22, 0.29], ['blur(15px)', 'blur(0px)', 'blur(0px)', 'blur(15px)']);
  const yTopSet1 = useTransform(scrollYProgress, [0, 0.29], ['0px', '-120px']);
  const yBottomSet1 = useTransform(scrollYProgress, [0, 0.29], ['0px', '120px']);

  const opacitySet2 = useTransform(scrollYProgress, [0.33, 0.4, 0.58, 0.65], [0, 1, 1, 0]);
  const blurSet2 = useTransform(scrollYProgress, [0.33, 0.4, 0.58, 0.65], ['blur(15px)', 'blur(0px)', 'blur(0px)', 'blur(15px)']);
  const yTopSet2 = useTransform(scrollYProgress, [0.33, 0.65], ['0px', '-120px']);
  const yBottomSet2 = useTransform(scrollYProgress, [0.33, 0.65], ['0px', '120px']);

  const opacitySet3 = useTransform(scrollYProgress, [0.69, 0.76, 0.92, 0.99], [0, 1, 1, 0]);
  const blurSet3 = useTransform(scrollYProgress, [0.69, 0.76, 0.92, 0.99], ['blur(15px)', 'blur(0px)', 'blur(0px)', 'blur(15px)']);
  const yTopSet3 = useTransform(scrollYProgress, [0.69, 0.99], ['0px', '-120px']);
  const yBottomSet3 = useTransform(scrollYProgress, [0.69, 0.99], ['0px', '120px']);

  // Précharge en arrière-plan les images des 4 galeries -> ouverture instantanée au clic
  useEffect(() => {
    const urls = [breadGallery, viennoiserieGallery, patisserieGallery, snackingGallery]
      .flatMap((g) => g.specimens.map((s) => s.photo.url));
    const preload = () => urls.forEach((u) => { const img = new Image(); img.src = u; });
    const w = window as unknown as { requestIdleCallback?: (cb: () => void) => void };
    if (typeof w.requestIdleCallback === 'function') w.requestIdleCallback(preload);
    else setTimeout(preload, 1500);
  }, []);

  // Retour depuis la galerie : replacer l'utilisateur sur la section Atelier
  useEffect(() => {
    if (!activeGallery && returningFromGalleryRef.current) {
      returningFromGalleryRef.current = false;
      requestAnimationFrame(() => {
        document.getElementById('atelier')?.scrollIntoView();
      });
    }
  }, [activeGallery]);

  const closeGallery = () => {
    returningFromGalleryRef.current = true;
    setActiveGallery(null);
  };

  // Vue galerie plein écran (clic sur une carte de l'Atelier liée à une galerie)
  if (activeGallery) {
    return <PanisGallery config={activeGallery} onBack={closeGallery} />;
  }

  return (
    <div id="app-container" className="relative w-full min-h-screen">
      {/* ─── Header ─── */}
      <header
        id="app-header"
        className="fixed top-4 lg:top-5 left-1/2 -translate-x-1/2 z-50 w-[calc(100%-32px)] md:w-auto bg-stone-950/70 backdrop-blur-xl rounded-xl p-1.5 pl-3 pr-3 md:pr-5 flex items-center justify-between md:gap-8 border border-amber-950/20 shadow-xl transition-all"
      >
        <a
          id="header-logo"
          href="#cortex"
          aria-label="Retour au début"
          className="flex items-center justify-center w-9 h-9 bg-amber-500/20 hover:bg-amber-500/30 rounded-lg text-amber-300 text-lg select-none leading-none cursor-pointer transition-all duration-300 hover:rotate-45 active:scale-95 shrink-0"
        >
          🥖
        </a>
        
        {/* Desktop Nav */}
        <nav id="header-nav-desktop" className="hidden md:flex items-center gap-5">
          <a
            id="nav-link-about"
            href="#about"
            className="text-amber-100/75 hover:text-amber-200 text-xs lg:text-[13.5px] font-medium tracking-tight whitespace-nowrap transition-colors"
          >
            À Propos
          </a>
          <a
            id="nav-link-menu"
            href="#atelier"
            className="text-amber-100/75 hover:text-amber-200 text-xs lg:text-[13.5px] font-medium tracking-tight whitespace-nowrap transition-colors"
          >
            La Carte
          </a>
          <a
            id="nav-link-avis"
            href="#temoignages"
            className="text-amber-100/75 hover:text-amber-200 text-xs lg:text-[13.5px] font-medium tracking-tight whitespace-nowrap transition-colors"
          >
            Avis
          </a>
        </nav>

        {/* Mobile Menu Toggle Button */}
        <button
          id="mobile-menu-toggle"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="md:hidden flex items-center justify-center w-9 h-9 text-amber-100 hover:text-white rounded-lg active:scale-95 transition-all"
        >
          {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </header>

      {/* Mobile Drawer Navigation overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            id="mobile-nav-drawer"
            initial={{ opacity: 0, y: -20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.95 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="fixed top-[76px] left-1/2 -translate-x-1/2 z-40 w-[calc(100%-32px)] bg-stone-950/95 backdrop-blur-2xl rounded-2xl p-6 border border-amber-900/30 flex flex-col gap-4 shadow-2xl md:hidden"
          >
            <nav id="mobile-nav-links" className="flex flex-col gap-3">
              <a
                id="mob-link-about"
                href="#about"
                onClick={() => setIsMobileMenuOpen(false)}
                className="text-amber-100/80 hover:text-white py-2 text-base font-medium tracking-tight border-b border-white/5 transition-colors"
              >
                À Propos
              </a>
              <a
                id="mob-link-menu"
                href="#atelier"
                onClick={() => setIsMobileMenuOpen(false)}
                className="text-amber-100/80 hover:text-white py-2 text-base font-medium tracking-tight border-b border-white/5 transition-colors"
              >
                La Carte
              </a>
              <a
                id="mob-link-avis"
                href="#temoignages"
                onClick={() => setIsMobileMenuOpen(false)}
                className="text-amber-100/80 hover:text-white py-2 text-base font-medium tracking-tight border-b border-white/5 transition-colors"
              >
                Avis
              </a>
            </nav>
            <a
              id="mob-link-gps"
              href="https://maps.app.goo.gl/PVWaAoi14BR8aqrs9"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-2 inline-flex items-center justify-center gap-2 bg-amber-400 hover:bg-amber-300 text-stone-950 py-3 rounded-xl text-sm font-medium transition-colors"
            >
              <MapPin className="w-4 h-4" />
              <span>Itinéraire Google Maps</span>
            </a>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ─── Background Video 1 ─── */}
      <motion.div
        id="bg-video-wrapper-1"
        style={{ opacity: videoOpacity }}
        className="fixed inset-0 w-full h-full z-[2] select-none pointer-events-none overflow-hidden"
      >
        <video
          id="bg-video-hero"
          ref={videoRef}
          src="/videos/hero.mp4"
          poster="/videos/hero-poster.webp"
          className="w-full h-full object-cover"
          muted
          playsInline
          preload="auto"
        />
      </motion.div>

      {/* ─── Background Video 2 ─── */}
      <motion.div
        id="bg-video-wrapper-2"
        style={{ opacity: video2Opacity }}
        className="fixed inset-0 w-full h-full z-[1] select-none pointer-events-none overflow-hidden"
      >
        <video
          id="bg-video-solutions"
          ref={videoRef2}
          src="/videos/solutions.mp4"
          poster="/videos/solutions-poster.webp"
          className="w-full h-full object-cover"
          muted
          playsInline
          preload="auto"
        />
      </motion.div>

      {/* ─── Scroll Container (Hero + About) ─── */}
      <div
        id="scroll-container"
        ref={scrollContainerRef}
        className="relative z-10 w-full bg-transparent"
      >
        {/* ─── Hero Section ─── */}
        <section
          id="cortex"
          ref={heroRef}
          className="relative w-full h-screen flex items-center overflow-hidden bg-transparent"
        >
          <main
            id="hero-main"
            className="relative z-10 w-full max-w-none mx-auto h-screen px-4 lg:px-[56px] pt-28 lg:pt-0 grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center"
          >
            {/* Left Column */}
            <div
              id="hero-left-col"
              className="lg:col-span-7 flex flex-col justify-center h-full lg:-translate-y-[112px] transform"
            >
              <motion.div
                id="hero-title-container"
                style={{ opacity: heroTitleOpacity, filter: heroTitleBlur, y: heroTitleY }}
              >
                <h1
                  id="hero-headline"
                  className="text-[clamp(38px,6.5vw,95px)] font-normal leading-[0.95] tracking-tight mb-10 text-amber-100 flex flex-col"
                >
                  <span className="block text-white/90">
                    <TextEffect per="char" variants={blurSlideVariants} trigger={inViewHero}>
                      La Miche
                    </TextEffect>
                  </span>
                  <span className="block text-amber-300 font-medium">
                    <TextEffect
                      per="char"
                      variants={blurSlideVariants}
                      trigger={inViewHero}
                      delay={0.15}
                    >
                      de Pain.
                    </TextEffect>
                  </span>
                </h1>
              </motion.div>
              <motion.div
                id="hero-cta-container"
                style={{ opacity: heroOtherOpacity, y: heroOtherY }}
              >
                <motion.div
                  variants={otherElementVariants}
                  initial="hidden"
                  animate={inViewHero ? 'visible' : 'exit'}
                >
                  <button
                    id="hero-cta-button"
                    onClick={() => setIsVideoOpen(true)}
                    className="group inline-flex items-center justify-center bg-amber-400 hover:bg-amber-300 text-stone-950 rounded-full px-7 py-3.5 text-sm font-medium w-fit gap-3 shadow-xl hover:shadow-amber-500/10 transition-all duration-300 cursor-pointer"
                  >
                    <span className="flex items-center justify-center w-5 h-5 rounded-full bg-stone-950 text-amber-400 transition-transform group-hover:scale-105">
                      <ArrowUpRight className="w-3.5 h-3.5 stroke-[2.5]" />
                    </span>
                    <span className="tracking-tight font-semibold">Consulter les Horaires</span>
                  </button>


                </motion.div>
              </motion.div>
            </div>
            {/* Right Column */}
            <motion.div
              id="hero-right-col"
              style={{ opacity: heroOtherOpacity, y: heroOtherY }}
              className="lg:col-span-4 lg:col-start-9 flex flex-col justify-center lg:self-end lg:mb-[56px] lg:justify-self-end w-full max-w-[328px]"
            >
              <motion.div
                id="hero-concept-card"
                variants={otherElementVariants}
                initial="hidden"
                animate={inViewHero ? 'visible' : 'exit'}
                className="bg-stone-950/40 backdrop-blur-md p-5 rounded-xl border border-amber-900/20"
              >
                <div
                  id="concept-label"
                  className="text-[11px] font-normal uppercase text-amber-400/70 tracking-[0.15em] mb-3"
                >
                  001 — La Philosophie
                </div>
                <p
                  id="concept-description"
                  className="text-[14px] font-normal leading-relaxed text-amber-50/95 tracking-tight"
                >
                  La pâte est une matière vivante. Miche de Pain célèbre l'authenticité d'un levain naturel sauvage et d'une cuisson exigeante pour sublimer vos tables parisiennes.
                </p>
              </motion.div>
            </motion.div>
          </main>
        </section>

        {/* ─── About Section ─── */}
        <section
          id="about"
          ref={aboutRef}
          className="w-full max-w-none mx-auto px-4 lg:px-[56px] h-screen min-h-[600px] py-[56px] flex flex-col justify-between items-start bg-transparent"
        >
          {/* Top */}
          <div id="about-top" className="w-full flex flex-col gap-6">
            <motion.div style={{ opacity: aboutOtherOpacity, y: aboutOtherY }}>
              <motion.div
                variants={otherElementVariants}
                initial="hidden"
                animate={inViewAbout ? 'visible' : 'exit'}
              >
                <span
                  id="about-label"
                  className="text-[11.5px] font-medium uppercase text-amber-400/80 tracking-[0.15em]"
                >
                  002 — Tradition Vivante
                </span>
              </motion.div>
            </motion.div>

          </div>
          {/* Bottom */}
          <div id="about-bottom" className="grid grid-cols-1 lg:grid-cols-12 w-full gap-8">
            <motion.div
              style={{ opacity: aboutOtherOpacity, y: aboutOtherY }}
              className="lg:col-start-1 lg:col-span-5 flex flex-col w-full max-w-[400px]"
            >
              <motion.div
                id="capabilities-container"
                variants={otherElementVariants}
                initial="hidden"
                animate={inViewAbout ? 'visible' : 'exit'}
                className="w-full"
              >
                <div
                  id="capabilities-label"
                  className="text-xs font-bold uppercase text-amber-400 tracking-[0.18em] mb-4 flex items-center gap-2"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-amber-400"></span>
                  Nos Spécialités :
                </div>
                <div id="capabilities-list" className="flex flex-col w-full border-b border-white/20">
                  {[
                    { title: 'Pains au Levain Naturel & Farines Bio', desc: 'Fermentation lente de 24h', gallery: breadGallery },
                    { title: 'Viennoiseries Pur Beurre AOP', desc: 'Feuilletage d\'une croustillance divine', gallery: viennoiserieGallery },
                    { title: 'Pâtisseries Fines & Saisonnières', desc: 'Fruits locaux et sucres non raffinés', gallery: patisserieGallery },
                    { title: 'Snacking', desc: 'Sandwichs frais & recettes boulangères', gallery: snackingGallery }
                  ].map((item, index) => (
                    <div
                      id={`capability-item-${index}`}
                      key={item.title}
                      onClick={() => setActiveGallery(item.gallery)}
                      role="button"
                      tabIndex={0}
                      onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') setActiveGallery(item.gallery); }}
                      className="group flex flex-col py-4 border-t border-white/20 text-white hover:bg-white/5 px-2 rounded-lg transition-all duration-300 cursor-pointer"
                    >
                      <div className="flex justify-between items-center">
                        <span className="text-[15.5px] font-bold tracking-tight text-white group-hover:text-amber-300 transition-colors">
                          {item.title}
                        </span>
                        <span className="flex items-center justify-center w-5 h-5 rounded-full bg-amber-400 text-stone-950 transition-transform group-hover:translate-x-1 group-hover:scale-110 ml-3 shrink-0">
                          <ArrowUpRight className="w-3 h-3 stroke-[2.5]" />
                        </span>
                      </div>
                      <span className="text-[13px] font-semibold text-amber-300 mt-1">{item.desc}</span>
                    </div>
                  ))}
                </div>
              </motion.div>
            </motion.div>
          </div>
        </section>
      </div>

      {/* ─── Solutions Section ─── */}
      <section
        id="solutions"
        ref={solutionsRef}
        className="w-full min-h-[350vh] bg-transparent relative z-10"
      >
        <div id="solutions-sticky-wrapper" className="w-full h-screen sticky top-0 overflow-hidden flex flex-col justify-between">
          {/* Content */}
          <div id="solutions-content" className="relative z-10 w-full max-w-none mx-auto h-full px-4 lg:px-[56px] flex flex-col justify-center items-start">
            <div id="solutions-slides-container" className="w-full max-w-[1000px] h-[320px] lg:h-[400px] relative flex items-center justify-start">
              {/* Set 1 */}
              <motion.div
                id="solutions-set-1"
                style={{ opacity: opacitySet1, filter: blurSet1 }}
                className="absolute inset-0 flex flex-col gap-[30px] justify-center pointer-events-none"
              >
                <motion.div style={{ y: yTopSet1 }} className="w-full flex flex-col gap-4">
                  <span
                    id="set1-label"
                    className="text-[11.5px] font-medium uppercase text-amber-400/80 tracking-[0.15em]"
                  >
                    003 — Geste Ancestral
                  </span>
                  <h1
                    id="set1-title-top"
                    className="text-[clamp(36px,6vw,85px)] font-normal leading-[1] tracking-tight text-amber-50 w-full"
                  >
                    La pâte fermente doucement.
                  </h1>
                </motion.div>
                <motion.div style={{ y: yBottomSet1 }} className="w-full">
                  <h1
                    id="set1-title-bottom"
                    className="text-[clamp(36px,6vw,85px)] font-semibold leading-[1] tracking-tight text-amber-300 w-full"
                  >
                    L'art du levain sauvage.
                  </h1>
                </motion.div>
              </motion.div>

              {/* Set 2 */}
              <motion.div
                id="solutions-set-2"
                style={{ opacity: opacitySet2, filter: blurSet2 }}
                className="absolute inset-0 flex flex-col gap-[30px] justify-center pointer-events-none"
              >
                <motion.div style={{ y: yTopSet2 }} className="w-full flex flex-col gap-4">
                  <span
                    id="set2-label"
                    className="text-[11.5px] font-medium uppercase text-amber-400/80 tracking-[0.15em]"
                  >
                    004 — L'Alchimie
                  </span>
                  <h1
                    id="set2-title-top"
                    className="text-[clamp(36px,6vw,85px)] font-normal leading-[1] tracking-tight text-amber-50 w-full"
                  >
                    Farine de meule, eau pure, sel de mer.
                  </h1>
                </motion.div>
                <motion.div style={{ y: yBottomSet2 }} className="w-full">
                  <h1
                    id="set2-title-bottom"
                    className="text-[clamp(36px,6vw,85px)] font-semibold leading-[1] tracking-tight text-amber-300 w-full"
                  >
                    La croûte dorée.
                  </h1>
                </motion.div>
              </motion.div>

              {/* Set 3 */}
              <motion.div
                id="solutions-set-3"
                style={{ opacity: opacitySet3, filter: blurSet3 }}
                className="absolute inset-0 flex flex-col gap-[30px] justify-center pointer-events-none"
              >
                <motion.div style={{ y: yTopSet3 }} className="w-full flex flex-col gap-4">
                  <span
                    id="set3-label"
                    className="text-[11.5px] font-medium uppercase text-amber-400/80 tracking-[0.15em]"
                  >
                    005 — L'Excellence
                  </span>
                  <h1
                    id="set3-title-top"
                    className="text-[clamp(36px,6vw,85px)] font-normal leading-[1] tracking-tight text-amber-50 w-full"
                  >
                    Un goût de noisette inoubliable.
                  </h1>
                </motion.div>
                <motion.div style={{ y: yBottomSet3 }} className="w-full">
                  <h1
                    id="set3-title-bottom"
                    className="text-[clamp(36px,6vw,85px)] font-semibold leading-[1] tracking-tight text-amber-300 w-full"
                  >
                    L'Émotion pure.
                  </h1>
                </motion.div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── Nous Trouver Section (Chess Layout) ─── */}
      <section
        id="nous-trouver"
        className="relative z-30 w-full bg-black py-24 px-6 md:px-16 lg:px-24"
      >
        {/* Section header */}
        <motion.div
          variants={otherElementVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.4 }}
          className="text-center mb-16 lg:mb-20 flex flex-col items-center"
        >
          <span className="liquid-glass rounded-full px-3.5 py-1 text-xs font-medium text-amber-300 font-body inline-block mb-5 uppercase tracking-[0.15em]">
            Nous Trouver
          </span>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-heading italic text-white tracking-tight leading-[0.9]">
            Passez nous voir. <span className="text-amber-300">Au 42 Rue Cadet.</span>
          </h2>
        </motion.div>

        {/* Row 1: Content left, Image right */}
        <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-20 mb-24">
          <motion.div
            variants={otherElementVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            className="flex-1 space-y-6"
          >
            <span className="text-[11.5px] font-medium uppercase text-amber-400/80 tracking-[0.15em] font-body">
              Notre Maison
            </span>
            <h3 className="text-3xl md:text-4xl font-heading italic text-white leading-[0.9] tracking-tight">
              Au cœur du 9ᵉ. <span className="text-amber-300">À deux pas de Lafayette.</span>
            </h3>
            <p className="text-white/70 font-body font-light leading-relaxed text-sm md:text-base max-w-lg">
              Poussez la porte de notre fournil et laissez-vous porter par l'odeur du pain chaud. Retrouvez-nous au{' '}
              <span className="text-amber-300 font-medium">42 Rue Cadet, 75009 Paris</span> — quartier Poissonnière / Lafayette.
            </p>
            <div className="flex flex-wrap items-center gap-3">
              <a
                href="https://maps.app.goo.gl/PVWaAoi14BR8aqrs9"
                target="_blank"
                rel="noopener noreferrer"
                className="group bg-amber-400 hover:bg-amber-300 text-stone-950 rounded-full px-5 py-2.5 text-sm font-semibold inline-flex items-center gap-2 shadow-xl shadow-amber-500/10 transition-all font-body w-fit"
              >
                <MapPin className="h-4 w-4" />
                Itinéraire Google Maps
                <ArrowUpRight className="h-4 w-4" />
              </a>
              <a
                href="tel:+33140356629"
                className="liquid-glass-strong rounded-full px-5 py-2.5 text-sm font-medium text-amber-100 inline-flex items-center gap-2 hover:bg-white/10 transition-all font-body w-fit"
              >
                <Phone className="h-4 w-4 text-amber-300" />
                Nous appeler
              </a>
            </div>
          </motion.div>
          <motion.div
            variants={otherElementVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            className="flex-1 w-full"
          >
            <div className="liquid-glass rounded-2xl overflow-hidden aspect-[4/3] w-full shadow-2xl shadow-black/40">
              <img
                src={VISIT_IMG}
                alt="Boulangerie Miche de Pain — notre fournil à Paris"
                loading="lazy"
                className="w-full h-full object-cover"
              />
            </div>
          </motion.div>
        </div>

        {/* Row 2: Image left, Content right */}
        <div className="flex flex-col lg:flex-row-reverse items-center gap-12 lg:gap-20">
          <motion.div
            variants={otherElementVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            className="flex-1 space-y-6"
          >
            <span className="text-[11.5px] font-medium uppercase text-amber-400/80 tracking-[0.15em] font-body">
              Commandes & Horaires
            </span>
            <h3 className="text-3xl md:text-4xl font-heading italic text-white leading-[0.9] tracking-tight">
              Réservez votre pain. <span className="text-amber-300">Passez commander.</span>
            </h3>
            <p className="text-white/70 font-body font-light leading-relaxed text-sm md:text-base max-w-lg">
              Une commande spéciale, un pain sur mesure ou un grand plateau de viennoiseries ? Appelez-nous au{' '}
              <span className="text-amber-300 font-medium">+33 1 40 35 66 29</span> et nous préparons tout pour vous.
            </p>
            <div className="flex items-start gap-2.5 text-sm text-white/70 font-body">
              <Clock className="h-4 w-4 text-amber-400 shrink-0 mt-0.5" />
              <span>
                Lundi — Vendredi : <span className="text-amber-300">07:00 — 20:00</span><br />
                Samedi : <span className="text-amber-300">07:30 — 19:30</span> · Fermé le dimanche
              </span>
            </div>
            <div className="flex flex-wrap items-center gap-3">
              <a
                href="tel:+33140356629"
                className="group bg-amber-400 hover:bg-amber-300 text-stone-950 rounded-full px-5 py-2.5 text-sm font-semibold inline-flex items-center gap-2 shadow-xl shadow-amber-500/10 transition-all font-body w-fit"
              >
                <Phone className="h-4 w-4" />
                Commander : 01 40 35 66 29
              </a>
              <a
                href="https://maps.app.goo.gl/PVWaAoi14BR8aqrs9"
                target="_blank"
                rel="noopener noreferrer"
                className="liquid-glass-strong rounded-full px-5 py-2.5 text-sm font-medium text-amber-100 inline-flex items-center gap-2 hover:bg-white/10 transition-all font-body w-fit"
              >
                <MapPin className="h-4 w-4 text-amber-300" />
                Nous trouver
              </a>
            </div>
          </motion.div>
          <motion.div
            variants={otherElementVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            className="flex-1 w-full"
          >
            <div className="liquid-glass rounded-2xl overflow-hidden aspect-[4/3] w-full shadow-2xl shadow-black/40">
              <img
                src={ORDER_IMG}
                alt="Pains au levain frais de Miche de Pain"
                loading="lazy"
                className="w-full h-full object-cover"
              />
            </div>
          </motion.div>
        </div>
      </section>

      {/* ─── Atelier Section (Visualiseur de Fournil) ─── */}
      <AtelierSection
        cardActions={{
          'pains-levain': () => setActiveGallery(breadGallery),
          'viennoiseries-beurre': () => setActiveGallery(viennoiserieGallery),
          'patisseries-fines': () => setActiveGallery(patisserieGallery),
          'snacking-recettes': () => setActiveGallery(snackingGallery),
        }}
      />

      {/* ─── Témoignages (avis Google) ─── */}
      <Testimonials />

      {/* ─── Footer ─── */}
      <Footer />

      {/* ─── Video Modal ─── */}
      <AnimatePresence>
        {isVideoOpen && (
          <div
            id="video-modal-overlay"
            className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-6"
          >
            {/* Backdrop */}
            <motion.div
              id="video-modal-backdrop"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="absolute inset-0 bg-stone-950/85 backdrop-blur-md"
              onClick={() => setIsVideoOpen(false)}
            />

            {/* Video Container Card */}
            <motion.div
              id="video-modal-card"
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              transition={{ type: 'spring', damping: 25, stiffness: 250 }}
              className="relative w-full max-w-[340px] aspect-[9/16] bg-stone-900 rounded-[28px] border-2 border-amber-400/40 shadow-2xl shadow-amber-500/10 overflow-hidden flex flex-col justify-between"
            >
              {/* Floating Close Button */}
              <button
                id="close-video-modal"
                onClick={() => setIsVideoOpen(false)}
                className="absolute top-4 right-4 z-50 flex items-center justify-center w-10 h-10 bg-stone-950/80 hover:bg-stone-950 text-amber-300 hover:text-white rounded-full border border-amber-400/20 active:scale-95 transition-all cursor-pointer"
                aria-label="Fermer"
              >
                <X className="w-5 h-5" />
              </button>

              {/* Looping Video */}
              <video
                id="modal-loop-video"
                src="/videos/modal.mp4"
                className="w-full h-full object-cover select-none pointer-events-none"
                autoPlay
                loop
                muted
                playsInline
                preload="auto"
              />
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
