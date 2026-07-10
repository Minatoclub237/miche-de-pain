import React, { useState, useEffect, useRef, HTMLAttributes } from 'react';
import { optimizeImg } from './optimizeImg';

const cn = (...classes: (string | undefined | null | false)[]) => {
  return classes.filter(Boolean).join(' ');
};

export interface GalleryItem {
  common: string;
  binomial: string;
  photo: {
    url: string; 
    text: string;
    pos?: string;
    by: string;
  };
}

interface CircularGalleryProps extends HTMLAttributes<HTMLDivElement> {
  items: GalleryItem[];
  radius?: number;
  cardWidth?: number;
  cardHeight?: number;
  autoRotateSpeed?: number;
  onActiveItemChange?: (index: number) => void;
  onItemClick?: (item: GalleryItem, index: number) => void;
  onCommander?: () => void;
}

const CircularGallery = React.forwardRef<HTMLDivElement, CircularGalleryProps>(
  ({ items, className, radius = 600, cardWidth = 320, cardHeight = 420, autoRotateSpeed = 0.02, onActiveItemChange, onItemClick, onCommander, ...props }, ref) => {
    const [rotation, setRotation] = useState(0);
    const [isScrolling, setIsScrolling] = useState(false);
    const [isDragging, setIsDragging] = useState(false);
    
    const scrollTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
    const animationFrameRef = useRef<number | null>(null);
    const activeIndexRef = useRef<number>(-1);
    
    // Dragging state
    const isDraggingRef = useRef(false);
    const startXRef = useRef(0);
    const startRotationRef = useRef(0);
    const lastXRef = useRef(0);
    const velocityRef = useRef(0);

    // Effect to handle scroll-based rotation
    useEffect(() => {
      const handleScroll = () => {
        // If the user is actively dragging, ignore scroll events to prevent jumping
        if (isDraggingRef.current) return;

        setIsScrolling(true);
        if (scrollTimeoutRef.current) {
          clearTimeout(scrollTimeoutRef.current);
        }

        const scrollableHeight = document.documentElement.scrollHeight - window.innerHeight;
        const scrollProgress = scrollableHeight > 0 ? window.scrollY / scrollableHeight : 0;
        const scrollRotation = scrollProgress * 360;
        setRotation(scrollRotation);

        scrollTimeoutRef.current = setTimeout(() => {
          setIsScrolling(false);
        }, 150);
      };

      window.addEventListener('scroll', handleScroll, { passive: true });
      return () => {
        window.removeEventListener('scroll', handleScroll);
        if (scrollTimeoutRef.current) {
          clearTimeout(scrollTimeoutRef.current);
        }
      };
    }, []);

    // Effect for auto-rotation when not scrolling and not dragging
    useEffect(() => {
      const autoRotate = () => {
        if (!isScrolling && !isDragging) {
          setRotation(prev => prev + autoRotateSpeed);
        }
        animationFrameRef.current = requestAnimationFrame(autoRotate);
      };

      animationFrameRef.current = requestAnimationFrame(autoRotate);

      return () => {
        if (animationFrameRef.current) {
          cancelAnimationFrame(animationFrameRef.current);
        }
      };
    }, [isScrolling, isDragging, autoRotateSpeed]);

    // Calculate and trigger active index changes
    useEffect(() => {
      if (items.length === 0) return;
      const anglePerItem = 360 / items.length;
      let minAngle = Infinity;
      let activeIdx = 0;

      items.forEach((_, i) => {
        const itemAngle = i * anglePerItem;
        const totalRotation = rotation % 360;
        // relativeAngle puts the rotation together with item position
        const relativeAngle = (itemAngle + totalRotation + 360) % 360;
        const normalizedAngle = Math.abs(relativeAngle > 180 ? 360 - relativeAngle : relativeAngle);
        if (normalizedAngle < minAngle) {
          minAngle = normalizedAngle;
          activeIdx = i;
        }
      });

      if (activeIdx !== activeIndexRef.current) {
        activeIndexRef.current = activeIdx;
        if (onActiveItemChange) {
          onActiveItemChange(activeIdx);
        }
      }
    }, [rotation, items, onActiveItemChange]);

    const anglePerItem = 360 / items.length;

    // Direct drag events handling (Mouse)
    const handleMouseDown = (e: React.MouseEvent) => {
      // Don't drag if clicking buttons or links inside cards
      if ((e.target as HTMLElement).closest('button, a')) return;
      
      isDraggingRef.current = true;
      setIsDragging(true);
      startXRef.current = e.clientX;
      startRotationRef.current = rotation;
      lastXRef.current = e.clientX;
      velocityRef.current = 0;
    };

    const handleMouseMove = (e: MouseEvent) => {
      if (!isDraggingRef.current) return;
      const deltaX = e.clientX - startXRef.current;
      // Convert screen pixels to rotation degrees (sensitivity: 0.2 degrees per pixel)
      const newRotation = startRotationRef.current - deltaX * 0.25;
      
      velocityRef.current = e.clientX - lastXRef.current;
      lastXRef.current = e.clientX;
      
      setRotation(newRotation);
    };

    const handleMouseUp = () => {
      if (!isDraggingRef.current) return;
      isDraggingRef.current = false;
      setIsDragging(false);

      // Apply physics-based drift if we released with some speed
      if (Math.abs(velocityRef.current) > 1) {
        let currentVelocity = -velocityRef.current * 0.3;
        const drift = () => {
          if (Math.abs(currentVelocity) < 0.05 || isDraggingRef.current) return;
          setRotation(prev => prev + currentVelocity);
          currentVelocity *= 0.92; // Friction
          requestAnimationFrame(drift);
        };
        requestAnimationFrame(drift);
      }
    };

    // Direct drag events handling (Touch)
    const handleTouchStart = (e: React.TouchEvent) => {
      if ((e.target as HTMLElement).closest('button, a')) return;
      
      isDraggingRef.current = true;
      setIsDragging(true);
      startXRef.current = e.touches[0].clientX;
      startRotationRef.current = rotation;
      lastXRef.current = e.touches[0].clientX;
      velocityRef.current = 0;
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (!isDraggingRef.current) return;
      const deltaX = e.touches[0].clientX - startXRef.current;
      const newRotation = startRotationRef.current - deltaX * 0.25;
      
      velocityRef.current = e.touches[0].clientX - lastXRef.current;
      lastXRef.current = e.touches[0].clientX;
      
      setRotation(newRotation);
    };

    const handleTouchEnd = () => {
      if (!isDraggingRef.current) return;
      isDraggingRef.current = false;
      setIsDragging(false);
      
      if (Math.abs(velocityRef.current) > 1) {
        let currentVelocity = -velocityRef.current * 0.3;
        const drift = () => {
          if (Math.abs(currentVelocity) < 0.05 || isDraggingRef.current) return;
          setRotation(prev => prev + currentVelocity);
          currentVelocity *= 0.92;
          requestAnimationFrame(drift);
        };
        requestAnimationFrame(drift);
      }
    };

    // Bind window event listeners for dragging so dragging doesn't break when mouse leaves container
    useEffect(() => {
      const handleGlobalMouseMove = (e: MouseEvent) => handleMouseMove(e);
      const handleGlobalMouseUp = () => handleMouseUp();
      const handleGlobalTouchMove = (e: TouchEvent) => handleTouchMove(e);
      const handleGlobalTouchEnd = () => handleTouchEnd();

      window.addEventListener('mousemove', handleGlobalMouseMove);
      window.addEventListener('mouseup', handleGlobalMouseUp);
      window.addEventListener('touchmove', handleGlobalTouchMove, { passive: true });
      window.addEventListener('touchend', handleGlobalTouchEnd);

      return () => {
        window.removeEventListener('mousemove', handleGlobalMouseMove);
        window.removeEventListener('mouseup', handleGlobalMouseUp);
        window.removeEventListener('touchmove', handleGlobalTouchMove);
        window.removeEventListener('touchend', handleGlobalTouchEnd);
      };
    }, [rotation]);

    // Programmatic centering when clicking a specimen
    const centerOnItem = (index: number) => {
      const itemAngle = index * anglePerItem;
      
      // Calculate current rotation modulo 360
      const currentModRotation = rotation % 360;
      
      // Target rotation is such that (itemAngle + targetRotation) % 360 === 0
      // So targetRotation modulo 360 should be -itemAngle % 360
      const targetModRotation = (-itemAngle + 360) % 360;
      
      // Find the absolute difference and go the shortest route
      let diff = targetModRotation - (currentModRotation < 0 ? currentModRotation + 360 : currentModRotation);
      if (diff > 180) diff -= 360;
      if (diff < -180) diff += 360;
      
      const targetRotation = rotation + diff;
      
      // Animate rotation smoothly
      let currentStep = 0;
      const steps = 25;
      const startRot = rotation;
      const rotDiff = targetRotation - startRot;
      
      const animateRotation = () => {
        if (currentStep >= steps || isDraggingRef.current) return;
        currentStep++;
        // Ease out quadratic
        const progress = currentStep / steps;
        const easeProgress = progress * (2 - progress);
        setRotation(startRot + rotDiff * easeProgress);
        requestAnimationFrame(animateRotation);
      };
      
      animateRotation();
    };

    return (
      <div
        ref={ref}
        role="region"
        aria-label="Circular 3D Gallery"
        className={cn(
          "relative w-full h-full flex items-center justify-center cursor-grab active:cursor-grabbing select-none",
          className
        )}
        style={{ perspective: '2000px' }}
        onMouseDown={handleMouseDown}
        onTouchStart={handleTouchStart}
        {...props}
      >
        <div
          className="relative w-full h-full flex items-center justify-center"
          style={{
            transform: `rotateY(${rotation}deg)`,
            transformStyle: 'preserve-3d',
            willChange: 'transform',
          }}
        >
          {items.map((item, i) => {
            const itemAngle = i * anglePerItem;
            const totalRotation = rotation % 360;
            const relativeAngle = (itemAngle + totalRotation + 360) % 360;
            const normalizedAngle = Math.abs(relativeAngle > 180 ? 360 - relativeAngle : relativeAngle);
            // Masque les cartes de dos (au-delà de 92°) pour éviter le texte inversé,
            // fondu progressif pour les cartes latérales.
            const opacity = normalizedAngle >= 92 ? 0 : Math.max(0.2, 1 - (normalizedAngle / 92) * 0.85);
            const isFront = normalizedAngle < 20;

            return (
              <div
                key={item.photo.url}
                role="group"
                aria-label={item.common}
                onClick={() => {
                  if (isFront) {
                    if (onItemClick) onItemClick(item, i);
                  } else {
                    centerOnItem(i);
                  }
                }}
                className="absolute cursor-pointer"
                style={{
                  width: cardWidth,
                  height: cardHeight,
                  transform: `rotateY(${itemAngle}deg) translateZ(${radius}px)`,
                  left: '50%',
                  top: '50%',
                  marginLeft: -cardWidth / 2,
                  marginTop: -cardHeight / 2,
                  opacity: opacity,
                  zIndex: Math.round(opacity * 100),
                  pointerEvents: opacity > 0.5 ? 'auto' : 'none',
                  backfaceVisibility: 'hidden',
                  WebkitBackfaceVisibility: 'hidden',
                }}
              >
                <div className={cn(
                  "relative w-full h-full rounded-2xl overflow-hidden group border transition-all duration-500 bg-white shadow-xl",
                  isFront 
                    ? "border-emerald-500 shadow-[0_15px_40px_rgba(16,185,129,0.22)] ring-1 ring-emerald-500/20" 
                    : "border-stone-200/80 shadow-md hover:border-stone-400"
                )}>
                  <img
                    src={optimizeImg(item.photo.url, 640)}
                    alt={item.photo.text}
                    loading="eager"
                    decoding="async"
                    referrerPolicy="no-referrer"
                    className="absolute inset-0 w-full h-full object-cover select-none transition-transform duration-750 group-hover:scale-105"
                    style={{ objectPosition: item.photo.pos || 'center' }}
                  />
                  
                  {/* Elegant overlay card details */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent flex flex-col justify-end p-5 select-none text-white">
                    <div className="translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
                      <h2 className="text-xl md:text-2xl font-serif tracking-tight text-white font-medium">
                        {item.common}
                      </h2>
                      <em className="text-xs md:text-sm font-serif italic text-emerald-300 block mt-1">
                        {item.binomial}
                      </em>
                      <p className="text-[10px] mt-2 text-stone-300 font-mono tracking-wider">
                        Photo by: {item.photo.by}
                      </p>
                    </div>
                  </div>
                  
                  {/* Bouton COMMANDER -> renvoie vers les CTA de Nous Trouver */}
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      if (onCommander) onCommander();
                    }}
                    className="absolute top-4 left-4 z-20 bg-emerald-600 hover:bg-emerald-700 text-white text-[11px] font-mono font-semibold py-1.5 px-3.5 rounded-full tracking-wider shadow-md cursor-pointer transition-colors active:scale-95"
                  >
                    COMMANDER
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    );
  }
);

CircularGallery.displayName = 'CircularGallery';

export { CircularGallery };
