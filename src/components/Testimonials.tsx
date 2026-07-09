import { useState, useRef } from 'react';
import { motion, AnimatePresence, useInView, Variants } from 'motion/react';
import { ArrowLeft, ArrowRight, Star, ArrowUpRight } from 'lucide-react';

// Note & lien Google
const GOOGLE_REVIEWS_URL = 'https://share.google/zO5yZSomEHcDOjkdv';
const GOOGLE_RATING = '4,8';
const GOOGLE_COUNT = 470;

// ─── Typewriter : révélation caractère par caractère au scroll ───
interface TypewriterProps {
  text: string;
  delay?: number;
  speed?: number;
  className?: string;
}

function Typewriter({ text, delay = 0, speed = 0.015, className = '' }: TypewriterProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: '-10px' });

  const container: Variants = {
    hidden: { opacity: 1 },
    visible: { opacity: 1, transition: { staggerChildren: speed, delayChildren: delay } },
  };
  const child: Variants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
  };

  return (
    <motion.span
      ref={ref}
      className={className}
      variants={container}
      initial="hidden"
      animate={inView ? 'visible' : 'hidden'}
      aria-label={text}
    >
      {text.split('').map((char, i) => (
        <motion.span key={i} variants={child} aria-hidden="true">
          {char}
        </motion.span>
      ))}
    </motion.span>
  );
}

// ─── Données : vrais avis Google de la boulangerie ───
interface Feedback {
  quote: string;
  author: string;
  title: string;
}

const feedbacks: Feedback[] = [
  {
    quote:
      '«The pastries and cakes are just amazing, especially the éclairs and the vanilla slice — and you have to try the opera cake. Service is warm and friendly. We ended up going four times!»',
    author: 'Nham',
    title: 'Local Guide · 137 avis · Google',
  },
  {
    quote:
      "«We've tried éclairs from several places in Paris, but none have come close to this one. Incredibly fresh, delicious and perfectly balanced in sweetness — you can tell real care goes into every single one.»",
    author: 'Furkan Altunok',
    title: 'Local Guide · 24 avis · Google',
  },
  {
    quote:
      '«Quelle boulangerie incroyable… Ce sont vraiment les MEILLEURS croissants aux amandes que j\'ai jamais mangés ! L\'accueil est chaleureux et tout est préparé sur place, à la minute.»',
    author: 'Mendy Thomas',
    title: 'Guide Local · 207 avis · Google',
  },
  {
    quote:
      '«Wonderful neighbourhood patisserie. The apple tarts had a beautifully laminated crust, just like the croissants. Buttery flavour, yet no greasy feel — so flakey and delicious!»',
    author: 'Janet McLain',
    title: 'Local Guide · 11 avis · Google',
  },
  {
    quote:
      '«The bread here is divine!! I absolutely love this bakery. The lady is the sweetest French person I\'ve met — but the bread is the main reason I keep coming back.»',
    author: 'Steve',
    title: 'Local Guide · 34 avis · Google',
  },
  {
    quote:
      '«Je travaille dans le quartier depuis 20 ans et je confirme que la qualité et l\'accueil sont au top. Tous les pains spéciaux sont délicieux. Je recommande sans hésiter !»',
    author: 'Nicole AO',
    title: 'Guide Local · Rue Cadet · Google',
  },
  {
    quote:
      "«Possibly the best boulangerie I've ever been to in Paris — run by the cutest, friendliest couple, and the pain au chocolat was unbelievable.»",
    author: 'Chris Weekley',
    title: 'Local Guide · 19 avis · Google',
  },
];

// ─── Variants de slide directionnels ───
const slideVariants: Variants = {
  enter: (direction: number) => ({ x: direction > 0 ? 100 : -100, opacity: 0 }),
  center: { zIndex: 1, x: 0, opacity: 1 },
  exit: (direction: number) => ({ zIndex: 0, x: direction < 0 ? 100 : -100, opacity: 0 }),
};

const containerReveal: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.05 } },
};

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } },
};

const scaleX: Variants = {
  hidden: { scaleX: 0 },
  visible: { scaleX: 1, transition: { duration: 0.8, ease: 'easeOut' } },
};

export default function Testimonials() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(1);

  const nextSlide = () => {
    setDirection(1);
    setCurrentIndex((prev) => (prev + 1) % feedbacks.length);
  };
  const prevSlide = () => {
    setDirection(-1);
    setCurrentIndex((prev) => (prev - 1 + feedbacks.length) % feedbacks.length);
  };

  const f = feedbacks[currentIndex];
  const initials = f.author
    .split(' ')
    .slice(0, 2)
    .map((w) => w[0])
    .join('')
    .toUpperCase();

  return (
    <section
      id="temoignages"
      className="relative z-40 -mt-8 md:-mt-16 rounded-t-[28px] md:rounded-t-[48px] shadow-[0_-28px_80px_-30px_rgba(0,0,0,0.6)] w-full bg-white text-black font-body pt-16 md:pt-28 pb-12 md:pb-24 px-6 md:px-12 lg:px-[120px] flex flex-col justify-center overflow-hidden"
    >
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-100px' }}
        variants={containerReveal}
        className="w-full"
      >
        {/* Header : label + note Google (seule touche de couleur = étoiles dorées) */}
        <motion.div
          variants={fadeUp}
          className="flex flex-col sm:flex-row sm:items-center justify-between gap-5 mb-6"
        >
          <h2 className="text-sm md:text-base font-medium tracking-[0.15em] uppercase text-black">
            <Typewriter text="Avis Clients" delay={0} speed={0.012} />
          </h2>

          {/* Bloc note Google cliquable → tous les avis */}
          <a
            href={GOOGLE_REVIEWS_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-flex items-center gap-3 self-start sm:self-auto"
          >
            <span className="text-3xl md:text-4xl font-medium text-black leading-none">{GOOGLE_RATING}</span>
            <span className="flex items-center gap-0.5">
              {[0, 1, 2, 3, 4].map((i) => (
                <Star key={i} className="w-5 h-5 md:w-6 md:h-6 fill-[#FBBC04] text-[#FBBC04]" />
              ))}
            </span>
            <span className="flex items-center gap-1 text-sm text-gray-600 group-hover:text-black transition-colors">
              <span className="underline underline-offset-4 decoration-gray-300 group-hover:decoration-black">
                {GOOGLE_COUNT} avis sur Google
              </span>
              <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </span>
          </a>
        </motion.div>

        {/* Divider haut */}
        <motion.div variants={scaleX} className="w-full h-[1px] bg-[#D9D9D9] mb-12 md:mb-20 origin-left" />

        {/* Carrousel de citations */}
        <motion.div
          variants={fadeUp}
          className="relative overflow-hidden min-h-[300px] md:min-h-[250px] flex items-center"
        >
          <AnimatePresence initial={false} custom={direction} mode="wait">
            <motion.div
              key={currentIndex}
              custom={direction}
              variants={slideVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ x: { type: 'spring', stiffness: 300, damping: 30 }, opacity: { duration: 0.2 } }}
              className="w-full"
            >
              <p className="font-heading text-2xl md:text-4xl lg:text-[44px] font-light leading-snug md:leading-tight text-right tracking-tight text-black">
                <Typewriter text={f.quote} delay={0.2} speed={0.01} />
              </p>
            </motion.div>
          </AnimatePresence>
        </motion.div>

        {/* Divider bas */}
        <motion.div variants={scaleX} className="w-full h-[1px] bg-[#D9D9D9] mt-12 md:mt-20 mb-8 origin-left" />

        {/* Auteur + navigation */}
        <motion.div
          variants={fadeUp}
          className="flex flex-col sm:flex-row justify-between items-center gap-6"
        >
          <AnimatePresence mode="wait">
            <motion.div
              key={currentIndex}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
              className="flex items-center gap-4 w-full sm:w-auto"
            >
              {/* Avatar neutre à initiales */}
              <div className="w-14 h-14 rounded-full flex items-center justify-center font-semibold text-lg bg-neutral-900 text-white shrink-0">
                {initials}
              </div>
              <div>
                <h3 className="font-medium text-lg text-black">
                  <Typewriter text={f.author} delay={0.2} speed={0.02} />
                </h3>
                <p className="text-gray-500 text-sm">
                  <Typewriter text={f.title} delay={0.3} speed={0.012} />
                </p>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Flèches */}
          <div className="flex gap-2 w-full sm:w-auto justify-end">
            <button
              onClick={prevSlide}
              aria-label="Avis précédent"
              className="w-14 h-14 bg-[#D9D9D9] hover:bg-[#c9c9c9] transition-colors flex items-center justify-center rounded-full active:scale-95"
            >
              <ArrowLeft className="w-6 h-6 text-black" strokeWidth={1.5} />
            </button>
            <button
              onClick={nextSlide}
              aria-label="Avis suivant"
              className="w-14 h-14 bg-[#D9D9D9] hover:bg-[#c9c9c9] transition-colors flex items-center justify-center rounded-full active:scale-95"
            >
              <ArrowRight className="w-6 h-6 text-black" strokeWidth={1.5} />
            </button>
          </div>
        </motion.div>

        {/* CTA : lire tous les avis Google */}
        <motion.div variants={fadeUp} className="flex justify-center sm:justify-start mt-10">
          <a
            href={GOOGLE_REVIEWS_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-flex items-center gap-2 bg-black hover:bg-neutral-800 text-white text-sm font-medium px-6 py-3 rounded-full transition-colors"
          >
            <Star className="w-4 h-4 fill-[#FBBC04] text-[#FBBC04]" />
            Lire les {GOOGLE_COUNT} avis sur Google
            <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
          </a>
        </motion.div>
      </motion.div>
    </section>
  );
}
