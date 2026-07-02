"use client";

import { useCallback, useEffect, useRef, useState } from "react";

export interface HeroCarouselSlide {
  src: string;
  alt?: string;
}

export interface HeroCarouselProps {
  /** Slides to render, in order. */
  slides: HeroCarouselSlide[];
  /** Advance slides automatically. Defaults to true. */
  autoPlay?: boolean;
  /** Time between auto-advances, in ms. Defaults to 5000. */
  interval?: number;
  /** Show the pagination dots. Defaults to true. */
  showDots?: boolean;
  /** Show the prev/next arrow buttons. Defaults to true. */
  showArrows?: boolean;
  /** Show the play/pause toggle. Defaults to true. */
  showPauseControl?: boolean;
  /** Tailwind height classes for the carousel viewport. */
  heightClassName?: string;
  /** Extra classes applied to the outer <section>. */
  className?: string;
}

export function HeroCarousel({
  slides,
  autoPlay = true,
  interval = 5000,
  showDots = true,
  showArrows = true,
  showPauseControl = true,
  heightClassName = "h-[280px] sm:h-[380px] md:h-[494px]",
  className = "",
}: HeroCarouselProps) {
  const [activeSlide, setActiveSlide] = useState(0);
  const [isPaused, setIsPaused] = useState(!autoPlay);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const goToSlide = useCallback(
    (index: number) => {
      setActiveSlide((index + slides.length) % slides.length);
    },
    [slides.length]
  );

  useEffect(() => {
    if (isPaused || slides.length <= 1) return;

    timerRef.current = setInterval(() => {
      setActiveSlide((current) => (current + 1) % slides.length);
    }, interval);

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isPaused, interval, slides.length]);

  if (slides.length === 0) return null;

  return (
    <section className={`relative overflow-hidden bg-black ${className}`}>
      <div className={`relative w-full ${heightClassName}`}>
        {slides.map((slide, index) => (
          <img
            key={slide.src}
            src={slide.src}
            alt={slide.alt ?? ""}
            className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-500 ${
              index === activeSlide ? "opacity-100" : "opacity-0"
            }`}
          />
        ))}
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-2/5 bg-gradient-to-t from-black/60 to-transparent" />

        {(showPauseControl || showDots) && (
          <div className="absolute bottom-4 left-4 flex items-center gap-3 sm:bottom-6 sm:left-6">
            {showPauseControl && (
              <button
                type="button"
                aria-label={isPaused ? "Play carousel" : "Pause carousel"}
                onClick={() => setIsPaused((p) => !p)}
                className="flex h-6 w-6 items-center justify-center text-white"
              >
                {isPaused ? (
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M8 5v14l11-7z" />
                  </svg>
                ) : (
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M6 5h4v14H6zM14 5h4v14h-4z" />
                  </svg>
                )}
              </button>
            )}
            {showDots && slides.length > 1 && (
              <div className="flex items-center gap-2">
                {slides.map((_, index) => (
                  <button
                    key={index}
                    type="button"
                    aria-label={`Go to slide ${index + 1}`}
                    onClick={() => goToSlide(index)}
                    className={`h-2 w-2 rounded-full transition-colors ${
                      index === activeSlide ? "bg-white" : "bg-white/40"
                    }`}
                  />
                ))}
              </div>
            )}
          </div>
        )}

        {showArrows && slides.length > 1 && (
          <div className="absolute bottom-4 right-4 flex items-center gap-2 sm:bottom-6 sm:right-6">
            <button
              type="button"
              aria-label="Previous slide"
              onClick={() => goToSlide(activeSlide - 1)}
              className="flex h-9 w-9 items-center justify-center rounded-full bg-white/70 hover:bg-white"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                <path d="M15.5251 18.966L8.55811 12L15.5251 5.03296" stroke="black" strokeWidth="1.5" />
              </svg>
            </button>
            <button
              type="button"
              aria-label="Next slide"
              onClick={() => goToSlide(activeSlide + 1)}
              className="flex h-9 w-9 items-center justify-center rounded-full bg-white/70 hover:bg-white"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                <path d="M8.47412 18.966L15.4401 12L8.47412 5.03296" stroke="black" strokeWidth="1.5" />
              </svg>
            </button>
          </div>
        )}
      </div>
    </section>
  );
}

export default HeroCarousel;
