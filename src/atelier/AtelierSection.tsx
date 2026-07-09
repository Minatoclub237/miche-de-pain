import React, { useState, useEffect } from 'react';
import ProductCard from './ProductCard';
import RecipeDetail from './RecipeDetail';
import { showcaseCards } from './data';
import { CardData } from './types';
import { Sun, Moon, Sliders } from 'lucide-react';

interface AtelierSectionProps {
  // Actions personnalisées par carte : si une carte a une action, le clic la déclenche
  // (ex. ouvrir une galerie) au lieu d'ouvrir la fiche recette.
  cardActions?: Record<string, () => void>;
}

export default function AtelierSection({ cardActions }: AtelierSectionProps = {}) {
  // Démarre en mode Nuit pour se fondre dans le site sombre (boucles vidéo actives)
  const [isNight, setIsNight] = useState(true);
  const [activeCard, setActiveCard] = useState<CardData | null>(null);

  const handleCardClick = (card: CardData) => {
    const action = cardActions?.[card.id];
    if (action) {
      action();
    } else {
      setActiveCard(card);
    }
  };

  // Synchronise la classe body.is-night (lue par le CSS des cartes)
  useEffect(() => {
    if (isNight) {
      document.body.classList.add('is-night');
    } else {
      document.body.classList.remove('is-night');
    }
    return () => {
      document.body.classList.remove('is-night');
    };
  }, [isNight]);

  const toggleTheme = () => setIsNight((prev) => !prev);

  return (
    <section
      id="atelier"
      className={`font-body relative z-30 w-full transition-colors duration-1000 ${
        isNight ? 'bg-[#0a0908] text-[#f5f2eb]' : 'bg-[#fcfbfa] text-[#1a1714]'
      }`}
    >
      {/* Liseré décoratif */}
      <div
        className={`h-1.5 w-full transition-colors duration-1000 ${
          isNight
            ? 'bg-gradient-to-r from-amber-600 via-orange-500 to-amber-900'
            : 'bg-gradient-to-r from-amber-500 via-orange-400 to-amber-300'
        }`}
      />

      {/* En-tête / Studio */}
      <header className="max-w-7xl mx-auto px-6 pt-16 pb-8 md:pt-20 md:pb-12">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 border-b pb-8 transition-colors duration-1000 border-opacity-10 border-current">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className={`inline-block w-2.5 h-2.5 rounded-full ${isNight ? 'bg-amber-500 animate-pulse' : 'bg-emerald-500'}`} />
              <p className="text-xs uppercase tracking-[0.2em] font-medium opacity-60 font-mono">
                Miche de Pain — Atelier Interactif
              </p>
            </div>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-heading italic tracking-tight leading-[0.9] mb-3">
              Visualiseur de Fournil
            </h2>
            <p className="max-w-xl text-sm md:text-base opacity-75 leading-relaxed">
              Explorez nos créations boulangères et pâtissières artisanales. Basculez l'ambiance Jour / Nuit grâce à un fondu enchaîné délicat, et cliquez une carte pour découvrir sa recette et ses secrets.
            </p>
          </div>

          {/* Contrôles / bascule de thème */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 w-full md:w-auto">
            <div className="hidden lg:flex flex-col text-right font-mono text-[10px] opacity-40">
              <span>SCHÉMA ACTIF : {isNight ? 'NUIT (BOUCLE VIDÉO)' : 'JOUR (PHOTO FIXE)'}</span>
              <span>DURÉE DU FONDU : 0.35S</span>
            </div>

            <button
              onClick={toggleTheme}
              id="themeToggleButton"
              className={`relative flex items-center justify-between gap-3 px-5 py-3 rounded-full font-medium text-sm transition-all duration-500 shadow-sm cursor-pointer select-none active:scale-95 ${
                isNight
                  ? 'bg-[#1e1c1a] hover:bg-[#282522] text-[#f5f2eb] border border-zinc-800/80 ring-1 ring-white/5'
                  : 'bg-white hover:bg-zinc-50 text-[#1a1714] border border-zinc-200 ring-1 ring-zinc-100'
              }`}
            >
              <div className="flex items-center gap-2">
                {isNight ? (
                  <Moon className="w-4 h-4 text-amber-400 fill-amber-400/20" />
                ) : (
                  <Sun className="w-4 h-4 text-orange-500 fill-orange-500/10" />
                )}
                <span>Ambiance : {isNight ? 'Minuit' : 'Midi'}</span>
              </div>

              <div className={`w-9 h-5 rounded-full p-0.5 transition-colors duration-500 ${isNight ? 'bg-amber-500' : 'bg-zinc-200'}`}>
                <div className={`w-4 h-4 rounded-full bg-white transition-transform duration-500 transform ${isNight ? 'translate-x-4' : 'translate-x-0'}`} />
              </div>
            </button>
          </div>
        </div>
      </header>

      {/* Grille des cartes */}
      <main className="max-w-7xl mx-auto px-6 pb-24">
        <div className="flex items-center justify-between mb-8">
          <h3 className="text-xs uppercase tracking-[0.25em] font-bold opacity-50 font-mono">
            Nos Spécialités
          </h3>
          <div className="flex items-center gap-2 text-xs opacity-40 font-mono">
            <Sliders className="w-3 h-3" />
            <span>Cliquez pour la recette</span>
          </div>
        </div>

        <div className="cards">
          {showcaseCards.map((card) => (
            <ProductCard
              key={card.id}
              card={card}
              isNight={isNight}
              onClick={() => handleCardClick(card)}
            />
          ))}
        </div>
      </main>

      {/* Overlay fiche recette */}
      <RecipeDetail
        card={activeCard}
        isNight={isNight}
        onClose={() => setActiveCard(null)}
      />
    </section>
  );
}
