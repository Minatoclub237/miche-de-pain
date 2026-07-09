import React, { useState, useEffect } from 'react';
import { CardData } from './types';
import { X, Clock, Droplets, Flame, Check, ExternalLink, Sparkles, Award } from 'lucide-react';

interface RecipeDetailProps {
  card: CardData | null;
  isNight: boolean;
  onClose: () => void;
}

const RecipeDetail: React.FC<RecipeDetailProps> = ({ card, isNight, onClose }) => {
  if (!card) return null;

  // Checklist state for ingredients
  const [checkedIngredients, setCheckedIngredients] = useState<Record<string, boolean>>({});
  
  // Baking Simulator States
  const [isBaking, setIsBaking] = useState(false);
  const [bakeProgress, setBakeProgress] = useState(0);
  const [bakeStepText, setBakeStepText] = useState('');

  // Support pressing escape key to close
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  // Prevent scrolling under the modal overlay
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, []);

  const toggleIngredient = (ing: string) => {
    setCheckedIngredients(prev => ({
      ...prev,
      [ing]: !prev[ing]
    }));
  };

  // Run the baking simulation
  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (isBaking) {
      if (bakeProgress < 100) {
        timer = setTimeout(() => {
          setBakeProgress(prev => {
            const next = prev + 1;
            // Update baking stages description
            if (next < 20) {
              setBakeStepText('Introduction dans le four à briques & injection de buée... 🌬️');
            } else if (next < 45) {
              setBakeStepText('Gonflement rapide de la pâte (le grigne s’ouvre)... 🥖');
            } else if (next < 70) {
              setBakeStepText('Développement d’une croûte dorée croustillante... 🔥');
            } else if (next < 95) {
              setBakeStepText('Caramélisation et brunissement de l’enveloppe... ☕');
            } else {
              setBakeStepText('Prêt à sortir ! Repos sur grille pour ressuage... 🧺');
            }
            return next;
          });
        }, 60); // fast crisp simulation
      } else {
        setIsBaking(false);
      }
    }
    return () => clearTimeout(timer);
  }, [isBaking, bakeProgress]);

  const startBakeSimulation = () => {
    setBakeProgress(0);
    setBakeStepText('Préchauffage de la pierre de cuisson à température maximale...');
    setIsBaking(true);
  };

  return (
    <div className="font-body fixed inset-0 z-50 flex items-center justify-center p-4 md:p-6 select-none animate-fadeIn">
      {/* Immersive backdrop scrim */}
      <div 
        className="absolute inset-0 bg-black/70 backdrop-blur-md cursor-pointer transition-opacity duration-500" 
        onClick={onClose}
      />

      {/* Main recipe card sheet */}
      <div 
        className={`relative w-full max-w-4xl h-[90vh] md:h-[80vh] flex flex-col rounded-3xl overflow-hidden shadow-2xl border transition-all duration-700 transform scale-100 ${
          isNight 
            ? 'bg-[#12100e] text-[#f5f2eb] border-amber-900/40' 
            : 'bg-[#fdfcf7] text-[#1a1714] border-amber-100'
        }`}
      >
        {/* Absolute Header Controls */}
        <div className="absolute top-4 right-4 z-20">
          <button 
            onClick={onClose}
            className={`p-2.5 rounded-full transition-all duration-300 shadow-md ${
              isNight 
                ? 'bg-[#1c1a17] text-amber-100 hover:bg-[#2c2824]' 
                : 'bg-white text-[#1a1714] hover:bg-zinc-100'
            }`}
            title="Fermer la fiche"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Scrollable Layout Grid */}
        <div className="flex-1 overflow-y-auto custom-scrollbar">
          
          {/* Header Banner - split grid */}
          <div className="grid md:grid-cols-2 min-h-[280px] border-b border-opacity-5 border-current">
            
            {/* Visual presentation block */}
            <div className="relative overflow-hidden bg-[#0c0a09] min-h-[220px] md:min-h-full">
              <img 
                src={isNight ? card.nightPhotoSrc : card.photoSrc} 
                alt={card.altText} 
                className="absolute inset-0 w-full h-full object-fit-cover object-center transition-all duration-1000"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-black/30" />
              
              <div className="absolute bottom-6 left-6 right-6 text-white flex flex-col gap-2">
                <span 
                  className="px-3 py-1 rounded-full text-[10px] uppercase tracking-widest font-mono self-start font-bold"
                  style={{ background: card.iconBg }}
                >
                  {card.fermentationTime ? 'Artisanat Boulanger' : 'Pâtissier'}
                </span>
                <h3 className="text-2xl md:text-4xl font-heading italic tracking-tight leading-[0.95]">
                  {card.title}
                </h3>
                <p className="text-xs md:text-sm text-zinc-300 font-serif italic">
                  « {card.description} »
                </p>
              </div>
            </div>

            {/* Secret metrics overview */}
            <div className={`p-6 md:p-8 flex flex-col justify-center ${isNight ? 'bg-[#181512]' : 'bg-[#faf8f2]'}`}>
              <h4 className="text-xs uppercase tracking-wider font-mono opacity-50 mb-6 flex items-center gap-1.5">
                <Award className="w-4 h-4 text-amber-500" />
                Paramètres Techniques d'Atelier
              </h4>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className={`p-4 rounded-2xl border ${isNight ? 'bg-[#1c1915] border-amber-950/40' : 'bg-[#f4ebd9]/30 border-amber-100'}`}>
                  <div className="flex items-center gap-1.5 opacity-60 text-xs mb-1 font-mono">
                    <Clock className="w-3.5 h-3.5 text-amber-600" />
                    <span>FERMENTATION</span>
                  </div>
                  <span className="text-sm font-bold block leading-snug">
                    {card.fermentationTime || 'N/A'}
                  </span>
                </div>

                <div className={`p-4 rounded-2xl border ${isNight ? 'bg-[#1c1915] border-amber-950/40' : 'bg-[#f4ebd9]/30 border-amber-100'}`}>
                  <div className="flex items-center gap-1.5 opacity-60 text-xs mb-1 font-mono">
                    <Droplets className="w-3.5 h-3.5 text-blue-500" />
                    <span>HYDRATATION</span>
                  </div>
                  <span className="text-sm font-bold block leading-snug">
                    {card.hydration || 'N/A'}
                  </span>
                </div>

                <div className={`p-4 rounded-2xl border ${isNight ? 'bg-[#1c1915] border-amber-950/40' : 'bg-[#f4ebd9]/30 border-amber-100'}`}>
                  <div className="flex items-center gap-1.5 opacity-60 text-xs mb-1 font-mono">
                    <Flame className="w-3.5 h-3.5 text-orange-500" />
                    <span>CUISSON</span>
                  </div>
                  <span className="text-sm font-bold block leading-snug">
                    {card.bakingTemp || 'N/A'}
                  </span>
                </div>
              </div>

              {card.funFact && (
                <div className="mt-6 text-xs border-l-2 border-amber-500 pl-4 py-1 italic opacity-85 leading-relaxed">
                  <strong>Le Saviez-vous ?</strong> {card.funFact}
                </div>
              )}
            </div>

          </div>

          {/* Details Section */}
          <div className="p-6 md:p-8 grid md:grid-cols-2 gap-8">
            
            {/* Ingredients column */}
            <div>
              <h4 className="text-sm uppercase tracking-wider font-bold opacity-80 mb-4 flex items-center gap-2">
                <span className="w-1.5 h-3 bg-amber-600 rounded-sm" />
                Ingrédients Requis ({card.ingredients?.length || 0})
              </h4>
              <p className="text-xs opacity-60 mb-4 font-mono">
                Cochez les ingrédients à mesure que vous les préparez :
              </p>
              
              <div className="space-y-2.5">
                {card.ingredients?.map((ing, idx) => {
                  const isChecked = !!checkedIngredients[ing];
                  return (
                    <div 
                      key={idx}
                      onClick={() => toggleIngredient(ing)}
                      className={`flex items-center gap-3 p-3 rounded-xl border cursor-pointer select-none transition-all duration-300 ${
                        isChecked 
                          ? 'border-emerald-500/30 bg-emerald-500/5 text-emerald-600 dark:text-emerald-400' 
                          : isNight 
                            ? 'border-zinc-800 bg-zinc-900/30 hover:bg-zinc-800/40' 
                            : 'border-zinc-200 bg-white hover:bg-zinc-50'
                      }`}
                    >
                      <div className={`w-5 h-5 rounded-md flex items-center justify-center transition-all duration-300 ${
                        isChecked 
                          ? 'bg-emerald-500 text-white' 
                          : 'border border-zinc-400 dark:border-zinc-600'
                      }`}>
                        {isChecked && <Check className="w-3.5 h-3.5 stroke-[3px]" />}
                      </div>
                      <span className={`text-xs md:text-sm ${isChecked ? 'line-through opacity-60' : ''}`}>
                        {ing}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Preparation Steps */}
            <div>
              <h4 className="text-sm uppercase tracking-wider font-bold opacity-80 mb-4 flex items-center gap-2">
                <span className="w-1.5 h-3 bg-amber-600 rounded-sm" />
                Protocole de Préparation
              </h4>
              <div className="space-y-4">
                {card.steps?.map((step, idx) => (
                  <div key={idx} className="flex gap-4">
                    <div className="flex-none w-6 h-6 rounded-full bg-amber-500/10 text-amber-600 dark:text-amber-400 flex items-center justify-center font-mono text-xs font-bold">
                      {idx + 1}
                    </div>
                    <p className="text-xs md:text-sm opacity-85 leading-relaxed pt-0.5">
                      {step}
                    </p>
                  </div>
                ))}
              </div>

              {card.bakerTip && (
                <div className={`mt-6 p-4 rounded-2xl text-xs flex gap-3 ${
                  isNight ? 'bg-amber-950/20 text-amber-200' : 'bg-amber-50/70 text-amber-900'
                }`}>
                  <Sparkles className="w-4 h-4 text-amber-500 flex-none" />
                  <div>
                    <strong className="block mb-0.5">Conseil de l'Artisan</strong>
                    <p className="leading-relaxed opacity-90">{card.bakerTip}</p>
                  </div>
                </div>
              )}
            </div>

          </div>

          {/* Interactive baking simulator section */}
          <div className="px-6 md:px-8 pb-10">
            <div className={`p-6 rounded-3xl border transition-all duration-500 ${
              isNight ? 'bg-[#1b1814] border-amber-900/20' : 'bg-[#faf8f4] border-amber-100'
            }`}>
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-4">
                <div>
                  <h4 className="font-bold text-base flex items-center gap-2">
                    <Flame className="w-5 h-5 text-orange-500 animate-pulse" />
                    Boulange Virtuelle : Simuler la Cuisson
                  </h4>
                  <p className="text-xs opacity-75 mt-1">
                    Vivez en temps réel la réaction de Maillard et l'expansion du pâton dans notre four virtuel.
                  </p>
                </div>

                <button 
                  onClick={startBakeSimulation}
                  disabled={isBaking}
                  className={`px-5 py-2.5 rounded-xl font-mono text-xs font-semibold uppercase tracking-wider flex items-center gap-2 transition-all duration-300 active:scale-95 ${
                    isBaking 
                      ? 'bg-zinc-600 text-zinc-300 cursor-not-allowed' 
                      : 'bg-amber-600 hover:bg-amber-700 text-white shadow-md hover:shadow-lg cursor-pointer'
                  }`}
                >
                  <Flame className="w-4 h-4" />
                  {isBaking ? 'Cuisson en cours...' : 'Lancer la Cuisson'}
                </button>
              </div>

              {/* Progress Bar & Status */}
              {(isBaking || bakeProgress > 0) && (
                <div className="space-y-2 mt-4 animate-fadeIn">
                  <div className="flex justify-between text-xs font-mono">
                    <span className="opacity-80 truncate max-w-[80%]">{bakeStepText}</span>
                    <span className="font-bold text-amber-600">{bakeProgress}%</span>
                  </div>
                  
                  {/* Progress bar outer container */}
                  <div className="w-full h-3 rounded-full bg-zinc-200 dark:bg-zinc-800 overflow-hidden">
                    <div 
                      className="h-full bg-gradient-to-r from-orange-500 via-amber-500 to-amber-700 transition-all duration-75"
                      style={{ width: `${bakeProgress}%` }}
                    />
                  </div>

                  {bakeProgress === 100 && (
                    <div className="text-xs text-emerald-600 dark:text-emerald-400 font-semibold flex items-center gap-1.5 animate-bounce mt-2">
                      <Check className="w-4 h-4 stroke-[3px]" />
                      <span>Incroyable ! Votre fournée de "{card.title}" est cuite à la perfection avec un alvéolage divin.</span>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>

        </div>

        {/* Footer actions with actual French artisan hyperlinks */}
        <div className={`p-5 border-t flex flex-col sm:flex-row justify-between items-center gap-4 ${
          isNight ? 'bg-[#0f0e0c] border-zinc-900' : 'bg-[#f4ebd9]/20 border-zinc-100'
        }`}>
          
          <div className="flex items-center gap-2">
            <span className="inline-block w-2.5 h-2.5 rounded-full bg-emerald-500" />
            <span className="text-[11px] font-mono opacity-70">
              ATELIER OUVERT AU PUBLIC • MARAIS, PARIS
            </span>
          </div>

          <div className="flex items-center gap-3">
            {/* Real Link to the National Bakery Federation for recipe learning or french sourdough */}
            <a 
              href="https://www.boulangerie.org" 
              target="_blank" 
              rel="noopener noreferrer"
              className={`px-4 py-2 rounded-full text-xs font-semibold flex items-center gap-1.5 border transition-all duration-300 cursor-pointer ${
                isNight 
                  ? 'border-zinc-800 hover:bg-[#1a1714] text-amber-200 hover:text-white' 
                  : 'border-zinc-200 hover:bg-zinc-50 text-amber-900 hover:text-black'
              }`}
            >
              <span>Fédération de la Boulangerie</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>

            <button 
              onClick={() => {
                navigator.clipboard.writeText(window.location.href);
                alert("Lien de la recette copié avec succès ! Partagez-le avec vos proches.");
              }}
              className={`px-4 py-2 rounded-full text-xs font-semibold flex items-center gap-1.5 transition-all duration-300 cursor-pointer ${
                isNight 
                  ? 'bg-amber-950/40 hover:bg-amber-900/40 text-amber-300' 
                  : 'bg-amber-100/60 hover:bg-amber-200/50 text-amber-950'
              }`}
            >
              <span>Partager la fiche</span>
            </button>
          </div>

        </div>

      </div>
    </div>
  );
};

export default RecipeDetail;
