"use client";

import { useEffect, useRef, useState } from "react";
import { IBM_Plex_Sans } from "next/font/google";

const ibmPlexSans = IBM_Plex_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

interface StorySlide {
  key: string;
  eyebrow: string;
  heading: string;
  description: string;
  stats: { value: string; label: string }[];
  accent: string;
  bg: string;
}

const STORY_SLIDES: StorySlide[] = [
  {
    key: "keynotes",
    eyebrow: "Day 1 · Main Stage",
    heading: "World-Class Keynotes",
    description:
      "Hear from the brightest minds reshaping the insurance landscape. CEOs, innovators, and visionaries take the stage in front of 5,000 industry leaders.",
    stats: [
      { value: "40+", label: "Keynote Speakers" },
      { value: "3", label: "Stage Days" },
    ],
    accent: "#C9A96E",
    bg: "#07070F",
  },
  {
    key: "breakouts",
    eyebrow: "Deep Dives",
    heading: "200+ Breakout Sessions",
    description:
      "From actuarial AI to climate risk modeling — dive deep into the topics defining the next decade of insurance. Twelve curated tracks, zero fluff.",
    stats: [
      { value: "200+", label: "Sessions" },
      { value: "12", label: "Tracks" },
    ],
    accent: "#DA1E28",
    bg: "#0C0204",
  },
  {
    key: "networking",
    eyebrow: "Evening Events",
    heading: "Unmatched Networking",
    description:
      "Rooftop receptions, hosted dinners, and curated meetups. The connections made at Insurecon define careers — and companies.",
    stats: [
      { value: "5,000+", label: "Attendees" },
      { value: "60+", label: "Countries" },
    ],
    accent: "#4FC3F7",
    bg: "#030A10",
  },
  {
    key: "innovation",
    eyebrow: "Insurtech Expo Floor",
    heading: "Innovation Showcase",
    description:
      "Walk 150+ live product demos from the startups and enterprises rewriting the rules of insurance technology. The future is already here.",
    stats: [
      { value: "150+", label: "Exhibitors" },
      { value: "$2.4B", label: "Combined Funding" },
    ],
    accent: "#69F0AE",
    bg: "#030C07",
  },
];

const HERO_STATS = [
  { value: "5,000+", label: "Attendees" },
  { value: "200+", label: "Sessions" },
  { value: "3", label: "Days" },
  { value: "60+", label: "Countries" },
];

const VENUE_STATS = [
  { value: "2M+ sq ft", label: "Convention Space" },
  { value: "350+", label: "Breakout Rooms" },
  { value: "3,309", label: "Hotel Rooms" },
  { value: "17", label: "Restaurants & Bars" },
];

const VENUE_BADGES = [
  "Convention Center",
  "Casino Resort",
  "Shark Reef Aquarium",
  "Beach & Wave Pool",
  "House of Blues",
];

interface PricingTier {
  key: string;
  name: string;
  price: string;
  per: string;
  features: string[];
  cta: string;
  highlighted?: boolean;
}

const PRICING_TIERS: PricingTier[] = [
  {
    key: "attendee",
    name: "Attendee",
    price: "$599",
    per: "per person",
    features: [
      "All keynotes & general sessions",
      "200+ breakout sessions",
      "Expo floor access",
      "Evening networking events",
      "Digital session recordings",
    ],
    cta: "Register as Attendee",
  },
  {
    key: "sponsor",
    name: "Sponsor",
    price: "$10,000",
    per: "per company",
    features: [
      "Everything in Attendee (×5 passes)",
      "Branded booth on expo floor",
      "Logo on all event materials",
      "Speaking slot consideration",
      "VIP dinner invitation",
      "Lead capture access",
    ],
    cta: "Become a Sponsor",
    highlighted: true,
  },
  {
    key: "executive",
    name: "Executive Sponsor",
    price: "$50,000",
    per: "per company",
    features: [
      "Everything in Sponsor (×15 passes)",
      "Headline stage naming rights",
      "Keynote speaking slot",
      "Exclusive hosted dinner (50 guests)",
      "Premier booth placement",
      "Full attendee contact list",
      "Year-round brand visibility",
    ],
    cta: "Contact Us",
  },
];

const GOLD = "#C9A96E";

function StorySection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const el = containerRef.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const total = rect.height - window.innerHeight;
      if (total <= 0) return;
      const raw = -rect.top / total;
      setProgress(Math.min(1, Math.max(0, raw)));
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleScroll);
    };
  }, []);

  const slideCount = STORY_SLIDES.length;
  const activeIndex = Math.min(
    slideCount - 1,
    Math.round(progress * (slideCount - 1))
  );

  return (
    <div
      ref={containerRef}
      className="relative"
      style={{ height: `${slideCount * 100}vh` }}
    >
      <div className="sticky top-0 h-screen w-full overflow-hidden">
        <div
          className="flex h-full transition-transform duration-100 ease-out"
          style={{
            width: `${slideCount * 100}%`,
            transform: `translateX(-${(progress * (slideCount - 1) * 100) / slideCount}%)`,
          }}
        >
          {STORY_SLIDES.map((slide) => (
            <div
              key={slide.key}
              className="flex h-full w-full shrink-0 items-center px-6 sm:px-12 md:px-16"
              style={{ backgroundColor: slide.bg }}
            >
              <div className="flex w-full max-w-xl flex-col gap-6 sm:gap-8">
                <p
                  className="text-xs font-medium uppercase tracking-[0.2em] sm:text-sm"
                  style={{ color: slide.accent }}
                >
                  {slide.eyebrow}
                </p>
                <h2 className="text-4xl font-bold leading-[0.95] tracking-tight text-white sm:text-5xl md:text-6xl">
                  {slide.heading}
                </h2>
                <p className="max-w-md text-base leading-relaxed text-white/50 sm:text-lg">
                  {slide.description}
                </p>
                <div className="flex items-start gap-8">
                  {slide.stats.map((stat, i) => (
                    <div key={stat.label} className="flex items-center gap-8">
                      {i > 0 && <div className="h-[52px] w-px self-stretch bg-white/[0.09]" />}
                      <div className="flex flex-col gap-1">
                        <span
                          className="text-3xl font-bold tracking-tight sm:text-4xl"
                          style={{ color: slide.accent }}
                        >
                          {stat.value}
                        </span>
                        <span className="text-[11px] uppercase tracking-[0.18em] text-white/50">
                          {stat.label}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
                <a
                  href="#pricing"
                  className="inline-flex w-fit items-center gap-2 border px-8 py-4 text-sm font-semibold uppercase tracking-wide transition-colors"
                  style={{ borderColor: slide.accent, color: slide.accent }}
                >
                  Secure Your Spot
                  <span aria-hidden>→</span>
                </a>
              </div>
            </div>
          ))}
        </div>

        <div className="pointer-events-none absolute inset-x-0 bottom-8 flex flex-col items-center gap-3">
          <span className="text-xs uppercase tracking-[0.25em] text-white/60">
            {STORY_SLIDES[activeIndex].eyebrow}
          </span>
          <div className="flex items-center gap-2">
            {STORY_SLIDES.map((slide, index) => (
              <div
                key={slide.key}
                className="h-1.5 w-1.5 rounded-full transition-colors"
                style={{
                  backgroundColor:
                    index === activeIndex ? slide.accent : "rgba(255,255,255,0.25)",
                }}
              />
            ))}
          </div>
          <span className="text-[11px] tracking-[0.15em] text-white/40">
            {String(activeIndex + 1).padStart(2, "0")} / {String(slideCount).padStart(2, "0")}
          </span>
        </div>
      </div>
    </div>
  );
}

function RegistrationDrawer({
  open,
  onClose,
  initialTier,
}: {
  open: boolean;
  onClose: () => void;
  initialTier: string;
}) {
  const [passType, setPassType] = useState(initialTier);

  useEffect(() => {
    setPassType(initialTier);
  }, [initialTier]);

  return (
    <>
      <div
        className={`fixed inset-0 z-40 bg-black/70 transition-opacity duration-300 ${
          open ? "opacity-100" : "pointer-events-none opacity-0"
        }`}
        onClick={onClose}
        aria-hidden
      />
      <div
        className={`fixed right-0 top-0 z-50 h-full w-full max-w-[515px] overflow-y-auto bg-[#0E0E1A] transition-transform duration-300 ${
          open ? "translate-x-0" : "translate-x-full"
        }`}
        role="dialog"
        aria-modal="true"
        aria-label="Registration form"
      >
        <div className="flex items-start justify-between border-b border-white/[0.09] px-8 py-8">
          <div className="flex flex-col gap-1">
            <p
              className="text-[11px] uppercase tracking-[0.2em]"
              style={{ color: GOLD }}
            >
              Insurecon · Sep 24 · Las Vegas
            </p>
            <h2 className="text-[28px] font-bold leading-tight tracking-tight text-white">
              Register
            </h2>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close registration form"
            className="flex h-9 w-9 items-center justify-center rounded-full border border-white/[0.09] text-white/50 hover:text-white"
          >
            ✕
          </button>
        </div>

        <form
          className="flex flex-col gap-10 px-8 py-6"
          onSubmit={(e) => e.preventDefault()}
        >
          <div className="flex flex-col gap-4">
            <p className="text-[11px] font-medium uppercase tracking-[0.18em] text-white/50">
              Your Details
            </p>
            <label className="flex flex-col gap-2 text-sm text-white/50">
              Full Name
              <input
                type="text"
                placeholder="Jane Smith"
                className="border border-white/[0.09] bg-white/[0.04] px-4 py-3 text-base text-white placeholder:text-[#999] focus:border-[#C9A96E] focus:outline-none"
              />
            </label>
            <label className="flex flex-col gap-2 text-sm text-white/50">
              Work Email
              <input
                type="email"
                placeholder="jane@acmeinsurance.com"
                className="border border-white/[0.09] bg-white/[0.04] px-4 py-3 text-base text-white placeholder:text-[#999] focus:border-[#C9A96E] focus:outline-none"
              />
            </label>
            <label className="flex flex-col gap-2 text-sm text-white/50">
              Company
              <input
                type="text"
                placeholder="Acme Insurance"
                className="border border-white/[0.09] bg-white/[0.04] px-4 py-3 text-base text-white placeholder:text-[#999] focus:border-[#C9A96E] focus:outline-none"
              />
            </label>
            <label className="flex flex-col gap-2 text-sm text-white/50">
              Job Title
              <input
                type="text"
                placeholder="VP of Claims"
                className="border border-white/[0.09] bg-white/[0.04] px-4 py-3 text-base text-white placeholder:text-[#999] focus:border-[#C9A96E] focus:outline-none"
              />
            </label>
          </div>

          <div className="flex flex-col gap-4">
            <p className="text-[11px] font-medium uppercase tracking-[0.18em] text-white/50">
              Pass Type
            </p>
            <div className="flex flex-col gap-3">
              {PRICING_TIERS.map((tier) => (
                <button
                  key={tier.key}
                  type="button"
                  onClick={() => setPassType(tier.key)}
                  className={`flex items-center justify-between border px-4 py-3 text-left transition-colors ${
                    passType === tier.key
                      ? "border-[#C9A96E] bg-[#C9A96E]/10"
                      : "border-white/[0.09] bg-white/[0.04]"
                  }`}
                >
                  <span className="text-sm text-white">{tier.name}</span>
                  <span className="text-sm text-white/50">{tier.price}</span>
                </button>
              ))}
            </div>
          </div>

          <button
            type="submit"
            className="flex items-center justify-center gap-2 bg-[#C9A96E] px-8 py-4 text-sm font-semibold uppercase tracking-wide text-[#0A0804]"
          >
            Complete Registration
            <span aria-hidden>→</span>
          </button>
        </form>
      </div>
    </>
  );
}

export default function ConferenceTwoPage() {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [selectedTier, setSelectedTier] = useState("attendee");

  const openDrawer = (tier: string) => {
    setSelectedTier(tier);
    setDrawerOpen(true);
  };

  return (
    <div className={`${ibmPlexSans.className} -mx-8 bg-black`}>
      {/* Hero */}
      <section className="relative flex flex-col items-center justify-center overflow-hidden bg-[#07070F] px-6 py-24 text-center sm:py-32">
        <div className="flex flex-col items-center gap-7">
          <div className="flex items-center gap-2">
            <span
              className="h-1.5 w-1.5 rounded-full"
              style={{ backgroundColor: GOLD }}
            />
            <span
              className="text-xs font-medium uppercase tracking-[0.2em] sm:text-sm"
              style={{ color: GOLD }}
            >
              September 24 · Las Vegas, Nevada
            </span>
          </div>

          <h1 className="flex flex-wrap items-start justify-center gap-x-4 text-[15vw] font-bold leading-[0.95] tracking-tight sm:text-8xl md:text-9xl">
            <span className="text-white">INSURE</span>
            <span style={{ color: GOLD }}>CON</span>
          </h1>

          <p className="max-w-xl text-base tracking-wide text-white/50 sm:text-xl">
            The Premier Insurance Industry Conference
          </p>

          <div className="mt-2 flex flex-col gap-3 sm:flex-row">
            <button
              type="button"
              onClick={() => openDrawer("attendee")}
              className="flex items-center justify-center gap-2 px-8 py-4 text-sm font-semibold uppercase tracking-wide text-[#0A0804]"
              style={{ backgroundColor: GOLD }}
            >
              Register Now
              <span aria-hidden>→</span>
            </button>
            <a
              href="#story"
              className="flex items-center justify-center border border-white/[0.09] px-8 py-4 text-sm font-semibold uppercase tracking-wide text-white/70"
            >
              View Agenda
            </a>
          </div>

          <div className="mt-10 flex flex-wrap items-center justify-center gap-x-10 gap-y-6 border-t border-white/[0.09] px-4 pt-8 sm:gap-x-16">
            {HERO_STATS.map((stat) => (
              <div key={stat.label} className="flex flex-col items-center gap-1">
                <span className="text-2xl font-bold text-white sm:text-3xl">
                  {stat.value}
                </span>
                <span className="text-[11px] uppercase tracking-[0.18em] text-white/40">
                  {stat.label}
                </span>
              </div>
            ))}
          </div>

          <span className="mt-6 text-[11px] uppercase tracking-[0.25em] text-white/30">
            Scroll to Explore
          </span>
        </div>
      </section>

      {/* Horizontally scroll-jacked story section */}
      <div id="story">
        <StorySection />
      </div>

      {/* Venue */}
      <section className="bg-black px-6 py-20 sm:px-12 md:px-16">
        <p
          className="mb-4 text-xs font-medium uppercase tracking-[0.2em]"
          style={{ color: GOLD }}
        >
          The Venue
        </p>
        <div className="flex flex-col gap-12 lg:flex-row lg:items-start lg:justify-between">
          <div className="flex max-w-xl flex-col gap-6">
            <div>
              <h2 className="text-4xl font-bold tracking-tight text-white sm:text-5xl">
                Mandalay Bay
              </h2>
              <p className="mt-2 text-lg text-white/50">Las Vegas, Nevada</p>
            </div>
            <p className="text-base leading-relaxed text-white/50">
              Insurecon 2024 takes place at the iconic Mandalay Bay Resort &
              Casino — 3.2 million square feet of world-class convention space
              in the heart of the Las Vegas Strip.
            </p>
            <div className="grid grid-cols-2 gap-x-8 gap-y-6">
              {VENUE_STATS.map((stat) => (
                <div key={stat.label} className="flex flex-col gap-1">
                  <span
                    className="text-2xl font-bold sm:text-3xl"
                    style={{ color: GOLD }}
                  >
                    {stat.value}
                  </span>
                  <span className="text-xs uppercase tracking-[0.1em] text-white/40">
                    {stat.label}
                  </span>
                </div>
              ))}
            </div>
          </div>

          <div className="w-full max-w-md border border-white/[0.09] bg-[#0E0E1A] p-8">
            <h3 className="text-xl font-bold text-white">Mandalay Bay</h3>
            <p className="mt-2 text-sm leading-relaxed text-white/50">
              3950 S Las Vegas Blvd
              <br />
              Las Vegas, NV 89119
            </p>
            <div className="mt-6 flex flex-wrap gap-2">
              {VENUE_BADGES.map((badge) => (
                <span
                  key={badge}
                  className="border border-white/[0.09] px-3 py-1.5 text-xs text-white/60"
                >
                  {badge}
                </span>
              ))}
            </div>
            <button
              type="button"
              className="mt-8 w-full border border-white/[0.09] py-3 text-sm font-semibold uppercase tracking-wide text-white/80"
            >
              View Property →
            </button>
          </div>
        </div>
      </section>

      {/* Pricing / Registration */}
      <section id="pricing" className="bg-black px-6 pb-24 pt-4 sm:px-12 md:px-16">
        <div className="mx-auto max-w-3xl text-center">
          <p
            className="mb-4 text-xs font-medium uppercase tracking-[0.2em]"
            style={{ color: GOLD }}
          >
            Registration
          </p>
          <h2 className="text-4xl font-bold tracking-tight text-white sm:text-5xl">
            Choose Your Pass
          </h2>
          <p className="mt-4 text-base text-white/50 sm:text-lg">
            All passes include full access to the Insurecon expo floor and
            evening networking events.
          </p>
        </div>

        <div className="mx-auto mt-14 grid max-w-6xl gap-6 md:grid-cols-3">
          {PRICING_TIERS.map((tier) => (
            <div
              key={tier.key}
              className={`relative flex flex-col justify-between border p-8 ${
                tier.highlighted
                  ? "border-[#C9A96E] bg-[#0E0E1A]"
                  : "border-white/[0.09] bg-black"
              }`}
            >
              {tier.highlighted && (
                <span
                  className="absolute right-6 top-0 -translate-y-1/2 px-3 py-1 text-[10px] font-semibold uppercase tracking-wide text-[#0A0804]"
                  style={{ backgroundColor: GOLD }}
                >
                  Most Popular
                </span>
              )}
              <div>
                <p className="text-xs uppercase tracking-[0.15em] text-white/50">
                  {tier.name}
                </p>
                <p className="mt-4 text-4xl font-bold text-white">{tier.price}</p>
                <p className="mt-1 text-sm text-white/40">{tier.per}</p>
                <ul className="mt-8 flex flex-col gap-3">
                  {tier.features.map((feature) => (
                    <li
                      key={feature}
                      className="flex items-start gap-2 text-sm text-white/70"
                    >
                      <span style={{ color: GOLD }}>✓</span>
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
              <button
                type="button"
                onClick={() => openDrawer(tier.key)}
                className={`mt-10 w-full py-3 text-sm font-semibold uppercase tracking-wide transition-colors ${
                  tier.highlighted
                    ? "text-[#0A0804]"
                    : "border border-white/[0.09] text-white/80"
                }`}
                style={tier.highlighted ? { backgroundColor: GOLD } : undefined}
              >
                {tier.cta}
              </button>
            </div>
          ))}
        </div>
      </section>

      <RegistrationDrawer
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
        initialTier={selectedTier}
      />
    </div>
  );
}
