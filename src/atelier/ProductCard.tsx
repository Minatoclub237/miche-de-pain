import React from 'react';
import { CardData } from './types';

interface ProductCardProps {
  card: CardData;
  isNight: boolean;
  onClick: () => void;
}

const ProductCard: React.FC<ProductCardProps> = ({ card, isNight, onClick }) => {
  // Les deux images (jour + nuit) sont chargées d'emblée et empilées :
  // basculer le mode ne fait qu'un fondu d'opacité instantané, sans rechargement.
  const imgClass =
    'absolute inset-0 w-full h-full object-cover transition-opacity duration-300 group-hover:scale-105';

  return (
    <div
      id={`cardFrame-${card.id}`}
      onClick={onClick}
      className="group relative aspect-[319/404] w-full rounded-2xl md:rounded-[26px] overflow-hidden bg-[#0e0d0c] cursor-pointer shadow-lg hover:shadow-2xl hover:shadow-amber-950/30 hover:scale-[1.02] active:scale-[0.99] transition-all duration-500 select-none"
    >
      {/* Image mode Jour */}
      <img
        src={card.photoSrc}
        alt={card.altText}
        loading="eager"
        decoding="async"
        style={{ opacity: isNight ? 0 : 1, objectPosition: '50% 42%' }}
        className={imgClass}
      />
      {/* Image mode Nuit */}
      <img
        src={card.nightPhotoSrc}
        alt={card.altText}
        loading="eager"
        decoding="async"
        style={{ opacity: isNight ? 1 : 0, objectPosition: '50% 42%' }}
        className={imgClass}
      />

      {/* Dégradé pour la lisibilité */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/35 to-black/10 pointer-events-none" />

      {/* Badge flottant */}
      <div className="absolute top-4 right-4 z-10 flex items-center gap-1.5 bg-[#1a1714]/80 backdrop-blur-md px-3 py-1.5 rounded-full border border-white/15 opacity-90 group-hover:opacity-100 group-hover:bg-[#1a1714] transition-all duration-300 shadow-lg">
        <span className="font-mono font-medium text-white tracking-[0.1em] text-[10px] md:text-[11px]">
          RECETTE &amp; SECRETS
        </span>
        <span className="material-icons text-amber-400 text-[15px] leading-none">menu_book</span>
      </div>

      {/* Pied : icône + titre + description */}
      <div className="absolute bottom-0 left-0 right-0 p-5 z-10">
        <div className="flex items-center gap-3 mb-2">
          <div
            className="flex-none w-9 h-9 md:w-10 md:h-10 rounded-full flex items-center justify-center shadow-lg"
            style={{ background: card.iconBg }}
          >
            <span className="material-icons text-white text-[18px] md:text-[20px] leading-none">{card.icon}</span>
          </div>
          <h3 className="font-heading italic text-white text-lg md:text-xl leading-[1.05] tracking-tight">
            {card.title}
          </h3>
        </div>
        <p className="font-body text-amber-100/80 text-[13px] md:text-sm font-medium leading-snug">
          {card.description}
        </p>
      </div>
    </div>
  );
};

export default ProductCard;
