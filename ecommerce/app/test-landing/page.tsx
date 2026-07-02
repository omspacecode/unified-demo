"use client";

import { useState } from "react";
import { Inter } from "next/font/google";
import { Button } from "@/src/components/ui/button";

const inter = Inter({ subsets: ["latin"], weight: ["400", "500", "600"] });

const HERO_SLIDES = [
  {
    src: "https://api.builder.io/api/v1/image/assets/TEMP/a623ee38fc91398635b8034da0b2347074a1befb?width=2362",
    alt: "Nike athlete training with a battle rope",
  },
  {
    src: "https://api.builder.io/api/v1/image/assets/TEMP/a0aec7389b59c267fe9e6cb147a75e605ac97963?width=2362",
    alt: "Nike athlete in motion",
  },
];

const FEATURED_CARDS = [
  {
    image:
      "https://api.builder.io/api/v1/image/assets/TEMP/4b16d92e3e5fa4222f415344a82b38008e2d6bdd?width=1182",
    eyebrow: "Nike Running",
    title: "Power for Every Run",
  },
  {
    image: null,
    eyebrow: null,
    title: "Nike Air Max",
  },
  {
    image: null,
    eyebrow: "Shrayas Iyer",
    title: "Athlete Picks",
  },
  {
    image: null,
    eyebrow: "Nike Training",
    title: "Just Do the Work",
  },
];

const SPORTS = ["Running", "Training", "Sportswear", "Cricket"];

const SPOTLIGHT_ITEMS = [
  "Air Jordan 1",
  "Air Force 1",
  "Pegasus",
  "Tights",
  "Trainers",
  "Jackets",
  "Court",
  "Cleats",
  "Dri-FIT",
  "P-6000",
  "Caps",
  "Air Max",
  "Sports Bra",
  "Shorts",
];

function SpotlightIcon() {
  return (
    <svg
      width="28"
      height="28"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="text-black"
    >
      <path
        d="M2 16.5c0-1.4 1.2-2.2 2.4-2.7l4.1-1.7c.6-.3 1-.6 1.5-1.1l2.8-2.9c.9-.9 2.2-1.4 3.5-1.1.8.2 1.4.8 1.5 1.6.1.8-.3 1.6-1 2l-1.6 1c1 .1 2 .4 2.8 1 .6.5 1 1.2 1 2v.9H2Z"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export default function TestLandingPage() {
  const [activeSlide, setActiveSlide] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  const goToSlide = (index: number) => {
    setActiveSlide((index + HERO_SLIDES.length) % HERO_SLIDES.length);
  };

  return (
    <div className={inter.className}>
      {/* Hero carousel */}
      <section className="-mx-8 relative overflow-hidden bg-black">
        <div className="relative h-[280px] sm:h-[380px] md:h-[494px] w-full">
          {HERO_SLIDES.map((slide, index) => (
            <img
              key={slide.src}
              src={slide.src}
              alt={slide.alt}
              className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-500 ${
                index === activeSlide ? "opacity-100" : "opacity-0"
              }`}
            />
          ))}
          <div className="pointer-events-none absolute inset-x-0 bottom-0 h-2/5 bg-gradient-to-t from-black/60 to-transparent" />

          <div className="absolute bottom-4 left-4 flex items-center gap-3 sm:bottom-6 sm:left-6">
            <button
              type="button"
              aria-label={isPaused ? "Play carousel" : "Pause carousel"}
              onClick={() => setIsPaused((p) => !p)}
              className="flex h-6 w-6 items-center justify-center text-white"
            >
              {isPaused ? (
                <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor"><path d="M8 5v14l11-7z" /></svg>
              ) : (
                <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor"><path d="M6 5h4v14H6zM14 5h4v14h-4z" /></svg>
              )}
            </button>
            <div className="flex items-center gap-2">
              {HERO_SLIDES.map((_, index) => (
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
          </div>

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
        </div>
      </section>

      {/* Featured */}
      <section className="pt-10 pb-4">
        <h2 className="mb-6 text-2xl capitalize text-black">Featured</h2>
      </section>
      <section className="-mx-8 grid grid-cols-1 sm:grid-cols-2">
        {FEATURED_CARDS.map((card, index) => (
          <div key={index} className="relative aspect-[591/574] w-full overflow-hidden bg-neutral-200">
            {card.image ? (
              <img src={card.image} alt={card.title} className="h-full w-full object-cover" />
            ) : (
              <div className="h-full w-full bg-neutral-300" />
            )}
            <div className="pointer-events-none absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-black/50 to-transparent" />
            <div className="absolute bottom-6 left-6 sm:bottom-8 sm:left-8">
              {card.eyebrow && (
                <p className="mb-1 text-sm text-white">{card.eyebrow}</p>
              )}
              <p className="mb-4 text-xl font-medium text-white sm:text-2xl">{card.title}</p>
              <Button variant="secondary" size="sm" className="rounded-full">
                Shop
              </Button>
            </div>
          </div>
        ))}
      </section>

      {/* Shop by sport */}
      <section className="pt-14 pb-4">
        <h2 className="mb-6 text-2xl text-black">Shop By Sport</h2>
      </section>
      <section className="-mx-8 relative">
        <div className="flex gap-2 overflow-x-auto px-8 pb-2 scrollbar-hide sm:gap-0 sm:px-0">
          {SPORTS.map((sport) => (
            <div key={sport} className="w-[45%] shrink-0 sm:w-1/4 sm:px-0">
              <div className="aspect-[268/338] w-full bg-neutral-300" />
              <p className="mt-3 pl-1 text-base text-black">{sport}</p>
            </div>
          ))}
        </div>
        <button
          type="button"
          aria-label="Next sports"
          className="absolute right-2 top-[38%] hidden h-10 w-10 items-center justify-center rounded-full bg-white shadow sm:flex"
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
            <path d="M8.47412 18.966L15.4401 12L8.47412 5.03296" stroke="black" strokeWidth="1.5" />
          </svg>
        </button>
      </section>

      {/* Nike app banner */}
      <section className="-mx-8 mt-16 flex flex-col items-center justify-center gap-4 bg-[#EFE7D8] px-8 py-10 text-center sm:flex-row sm:justify-between sm:text-left">
        <div className="flex items-center gap-4">
          <svg width="28" height="28" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
              d="M2 16.5c0-1.4 1.2-2.2 2.4-2.7l4.1-1.7c.6-.3 1-.6 1.5-1.1l2.8-2.9c.9-.9 2.2-1.4 3.5-1.1.8.2 1.4.8 1.5 1.6.1.8-.3 1.6-1 2l-1.6 1c1 .1 2 .4 2.8 1 .6.5 1 1.2 1 2v.9H2Z"
              fill="black"
            />
          </svg>
          <p className="text-xl font-bold uppercase tracking-tight text-black sm:text-2xl">
            It&apos;s Better on the Nike App
          </p>
        </div>
        <div className="flex h-16 w-16 items-center justify-center bg-black">
          <div className="grid h-12 w-12 grid-cols-4 grid-rows-4 gap-[2px]">
            {Array.from({ length: 16 }).map((_, i) => (
              <div key={i} className={`${i % 3 === 0 ? "bg-white" : "bg-black"}`} />
            ))}
          </div>
        </div>
      </section>

      {/* Spotlight */}
      <section className="py-16 text-center">
        <h2 className="text-3xl font-black uppercase tracking-tight text-black sm:text-4xl">
          Spotlight
        </h2>
        <p className="mx-auto mt-2 max-w-md text-sm text-neutral-600">
          Classic silhouettes and cutting-edge innovation to build your game from the ground up.
        </p>
        <div className="mx-auto mt-10 grid max-w-4xl grid-cols-4 gap-x-4 gap-y-8 sm:grid-cols-7">
          {SPOTLIGHT_ITEMS.map((item) => (
            <div key={item} className="flex flex-col items-center gap-2">
              <SpotlightIcon />
              <p className="text-xs text-black">{item}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
