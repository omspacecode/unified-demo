"use client";

import { useMemo, useState } from "react";

type CarouselCard = {
  title?: string;
  description?: string;
  image?: string;
  imageAlt?: string;
  link?: string;
  linkText?: string;
};

type CarouselV1Props = {
  cards?: CarouselCard[];
  backgroundColor?: string;
  accentColor?: string;
};

const defaultCards: CarouselCard[] = [
  {
    title: "New arrivals",
    description: "Fresh silhouettes and everyday essentials made for your next chapter.",
    image: "https://cdn.builder.io/api/v1/image/assets%2F823257bc2abd4ebfb9f360afbc282eaf%2F830b0c8283054d4c876bc1dc3b58ae90",
    imageAlt: "New arrivals",
    linkText: "Shop now",
    link: "/category/new-arrivals",
  },
  {
    title: "The essentials",
    description: "Thoughtful staples designed to work harder in your wardrobe.",
    image: "https://cdn.builder.io/api/v1/image/assets%2F823257bc2abd4ebfb9f360afbc282eaf%2F830b0c8283054d4c876bc1dc3b58ae90",
    imageAlt: "The essentials",
    linkText: "Explore collection",
    link: "/category/tops",
  },
];

export default function CarouselV1({
  cards = defaultCards,
  backgroundColor = "#f4f1ed",
  accentColor = "#111111",
}: CarouselV1Props) {
  const items = useMemo(() => cards.filter(Boolean), [cards]);
  const [activeIndex, setActiveIndex] = useState(0);
  const pageCount = Math.max(1, Math.ceil(items.length / 2));
  const activePage = Math.min(Math.floor(activeIndex / 2), pageCount - 1);
  const offset = activePage * 100;

  const goToPage = (page: number) => {
    const nextPage = (page + pageCount) % pageCount;
    setActiveIndex(nextPage * 2);
  };

  return (
    <section
      aria-label="Featured collections"
      className="w-full overflow-hidden rounded-2xl px-5 py-8 sm:px-8 sm:py-10"
      style={{ backgroundColor }}
    >
      <div className="mb-6 flex items-end justify-between gap-4 sm:mb-8">
        <div>
          <p className="mb-2 text-xs font-semibold uppercase tracking-[0.24em]" style={{ color: accentColor }}>
            Curated for you
          </p>
          <h2 className="text-2xl font-semibold tracking-tight text-black sm:text-3xl">
            Discover your next favorite
          </h2>
        </div>
        <div className="flex shrink-0 gap-2">
          <button
            type="button"
            aria-label="Previous cards"
            onClick={() => goToPage(activePage - 1)}
            className="flex h-10 w-10 items-center justify-center rounded-full border border-black/20 bg-white text-xl transition hover:bg-black hover:text-white focus:outline-none focus:ring-2 focus:ring-black focus:ring-offset-2"
          >
            <span aria-hidden="true">←</span>
          </button>
          <button
            type="button"
            aria-label="Next cards"
            onClick={() => goToPage(activePage + 1)}
            className="flex h-10 w-10 items-center justify-center rounded-full border border-black/20 bg-white text-xl transition hover:bg-black hover:text-white focus:outline-none focus:ring-2 focus:ring-black focus:ring-offset-2"
          >
            <span aria-hidden="true">→</span>
          </button>
        </div>
      </div>

      <div className="overflow-hidden">
        <div
          className="flex transition-transform duration-700 ease-in-out"
          style={{ transform: `translateX(-${offset}%)` }}
        >
          {items.map((card, index) => (
            <article
              key={`${card.title || "card"}-${index}`}
              className="w-full shrink-0 pr-0 sm:w-1/2 sm:pr-5"
            >
              <div className="group flex h-full min-h-[280px] flex-col overflow-hidden rounded-xl bg-white shadow-sm transition duration-500 hover:-translate-y-1 hover:shadow-xl sm:min-h-[340px]">
                {card.image && (
                  <div className="h-44 overflow-hidden sm:h-56">
                    <img
                      src={card.image}
                      alt={card.imageAlt || card.title || ""}
                      className="h-full w-full object-cover transition duration-700 group-hover:scale-105"
                    />
                  </div>
                )}
                <div className="flex flex-1 flex-col p-5 sm:p-6">
                  <h3 className="text-xl font-semibold text-black">{card.title}</h3>
                  {card.description && <p className="mt-3 text-sm leading-6 text-black/60">{card.description}</p>}
                  {card.link && (
                    <a
                      href={card.link}
                      className="mt-auto pt-6 text-sm font-semibold uppercase tracking-[0.16em] text-black underline decoration-black/30 underline-offset-4 transition hover:decoration-black"
                    >
                      {card.linkText || "Learn more"}
                    </a>
                  )}
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>

      <div className="mt-6 flex justify-center gap-2" aria-label="Carousel pages">
        {Array.from({ length: pageCount }, (_, index) => (
          <button
            key={index}
            type="button"
            aria-label={`Go to page ${index + 1}`}
            aria-current={index === activePage}
            onClick={() => goToPage(index)}
            className="h-1.5 rounded-full transition-all duration-300"
            style={{
              width: index === activePage ? 28 : 8,
              backgroundColor: index === activePage ? accentColor : `${accentColor}33`,
            }}
          />
        ))}
      </div>
    </section>
  );
}
