import React, { useEffect, useRef, useState } from 'react';
import { CardData } from './types';

interface ProductCardProps {
  card: CardData;
  isNight: boolean;
  onClick: () => void;
}

const ProductCard: React.FC<ProductCardProps> = ({ card, isNight, onClick }) => {
  const cardRef = useRef<HTMLDivElement | null>(null);
  const videoRef = useRef<HTMLVideoElement | null>(null);
  
  // Transition and source swapping states for the still photo
  const [photoSrc, setPhotoSrc] = useState(isNight ? card.nightPhotoSrc : card.photoSrc);
  const [photoOpacity, setPhotoOpacity] = useState(1);
  const targetSrcRef = useRef(isNight ? card.nightPhotoSrc : card.photoSrc);

  // 1. Compute --direct-scale and recompute on load & resize
  useEffect(() => {
    const updateScale = () => {
      if (cardRef.current) {
        const clientWidth = cardRef.current.clientWidth;
        const clientHeight = cardRef.current.clientHeight;
        const scale = Math.min(clientWidth / 660, clientHeight / 836);
        cardRef.current.style.setProperty('--direct-scale', scale.toString());
      }
    };

    updateScale();

    const resizeObserver = new ResizeObserver(() => {
      updateScale();
    });

    if (cardRef.current) {
      resizeObserver.observe(cardRef.current);
    }

    // Handlers for browser load and resize
    window.addEventListener('resize', updateScale);
    window.addEventListener('load', updateScale);

    return () => {
      resizeObserver.disconnect();
      window.removeEventListener('resize', updateScale);
      window.removeEventListener('load', updateScale);
    };
  }, []);

  // 2. Video play / pause behavior on Night Mode toggle
  useEffect(() => {
    if (videoRef.current) {
      if (isNight) {
        // play() when entering night (catch/ignore promise rejection)
        videoRef.current.play().catch((err) => {
          console.warn('Video play interrupted or blocked by browser policy:', err);
        });
      } else {
        // pause() when leaving night
        videoRef.current.pause();
      }
    }
  }, [isNight]);

  // 3. Photo source crossfade logic:
  // (fade to 0, swap on load, fade back to 1)
  useEffect(() => {
    const targetSrc = isNight ? card.nightPhotoSrc : card.photoSrc;
    targetSrcRef.current = targetSrc;

    if (photoSrc !== targetSrc) {
      // Fade out to 0 first
      setPhotoOpacity(0);
    } else {
      // If the photoSrc is already the target, ensure opacity is 1
      setPhotoOpacity(1);
    }
  }, [isNight, card.photoSrc, card.nightPhotoSrc, photoSrc]);

  // Triggered when opacity finishes transitioning
  const handleTransitionEnd = (e: React.TransitionEvent<HTMLImageElement>) => {
    if (e.propertyName === 'opacity' && photoOpacity === 0) {
      // Once opacity reaches 0, we perform the swap
      setPhotoSrc(targetSrcRef.current);
    }
  };

  // Triggered when the swapped image finishes loading
  const handleLoad = () => {
    if (photoSrc === targetSrcRef.current) {
      // Fade back to 1
      setPhotoOpacity(1);
    }
  };

  return (
    <div 
      className="card-frame cursor-pointer hover:scale-[1.035] active:scale-[0.985] transition-all duration-500 group shadow-lg hover:shadow-2xl hover:shadow-amber-950/20" 
      id={`cardFrame-${card.id}`}
      onClick={onClick}
    >
      <div 
        ref={cardRef} 
        className="direct-card"
        id={`directCard-${card.id}`}
      >
        <div 
          className="direct-card__artboard" 
          id={`directCardTwoArtboard-${card.id}`}
        >
          {/* Floating Action Badge */}
          <div className="absolute top-[6%] right-[6%] z-10 bg-[#1a1714]/80 backdrop-blur-md px-[4%] py-[2%] rounded-full border border-white/15 opacity-80 group-hover:opacity-100 group-hover:scale-105 group-hover:bg-[#1a1714] transition-all duration-300 flex items-center gap-1.5 shadow-lg select-none">
            <span className="font-mono font-medium text-white tracking-[0.1em]" style={{ fontSize: 'clamp(9px, 2.5cqw, 16px)' }}>
              RECETTE & SECRETS
            </span>
            <span className="material-icons text-amber-400" style={{ fontSize: 'clamp(10px, 2.8cqw, 18px)' }}>
              menu_book
            </span>
          </div>

          {/* Layer 1: Image .direct-card__photo */}
          <img
            src={photoSrc}
            onLoad={handleLoad}
            onTransitionEnd={handleTransitionEnd}
            style={{ opacity: photoOpacity }}
            className="direct-card__photo"
            alt={card.altText}
            data-night-src={card.nightPhotoSrc}
          />

          {/* Layer 2: Video .direct2-video (uniquement si une vidéo est fournie) */}
          {card.videoSrc && (
            <video
              ref={videoRef}
              src={card.videoSrc}
              muted
              loop
              playsInline
              preload="auto"
              className="direct2-video"
            />
          )}

          {/* Layer 3: Gradient scrim .direct2-grade */}
          <div className="direct2-grade" />

          {/* Footer block */}
          <div className="direct-footer">
            <div className="direct-footer__head">
              <div 
                className="direct-footer__icon"
                style={{
                  background: card.iconBg,
                  color: '#fff',
                  boxShadow: `0 10px 24px -10px ${card.iconBg}99` // adding opacity to shadow
                }}
              >
                <span className="material-icons" style={{ fontSize: 'clamp(15px, 5.6cqw, 34px)', lineHeight: 1 }}>
                  {card.icon}
                </span>
              </div>
              <div className="direct-footer__title font-heading italic">
                {card.title}
              </div>
            </div>

            <div className="direct-footer__desc font-body">
              {card.description}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
