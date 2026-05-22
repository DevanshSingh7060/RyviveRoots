import { useState, useEffect, useRef, type CSSProperties } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Heart, X, Plus, ChevronLeft, ChevronRight } from 'lucide-react';
import { ImageWithFallback } from '../components/figma/ImageWithFallback';
import { CREAM, CREAM_2, DARK, DARK_2, INK, SAGE, SAGE_DARK } from '../theme';
import { menuSections } from '../content/menuContent';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ScrollToPlugin } from 'gsap/ScrollToPlugin';
import menu1 from '../images/Menu-1.jpeg';
import menu2 from '../images/Menu-2.jpeg';
import menu3 from '../images/Menu-3.jpeg';
import menu4 from '../images/Menu-4.jpeg';


gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

type Dish = {
  name: string;
  desc: string;
  details?: string;
  price: string;
  image: string;
};

type Spread = {
  number: string;
  title: string;
  subtitle: string;
  image: string;
  blurb: string;
  dishes: Dish[];
};

const spreadImages = [menu1, menu2, menu3, menu4];

const spreads: Spread[] = menuSections.map((section, index) => ({
  number: section.number,
  title: section.title,
  subtitle: section.subtitle,
  image: spreadImages[index % spreadImages.length],
  blurb: section.blurb,
  dishes: section.items.map((item) => ({
    name: item.name,
    desc: item.description,
    details: item.details,
    price: item.price,
    image: spreadImages[index % spreadImages.length],
  })),
}));

const ease: [number, number, number, number] = [0.22, 1, 0.36, 1];

export default function Menu() {
  const containerRef = useRef<HTMLDivElement>(null);
  const navRef = useRef<HTMLDivElement | null>(null);
  const stRef = useRef<ScrollTrigger | null>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);

  const [pageIndex, setPageIndex] = useState(0);
  const [savedDishes, setSavedDishes] = useState<Set<string>>(new Set());
  const [activeDish, setActiveDish] = useState<Dish | null>(null);

 useEffect(() => {
  const pages = gsap.utils.toArray('.spread-page') as HTMLElement[];

  if (!pages.length) return;

  gsap.set(containerRef.current, {
    perspective: 2200,
  });

  gsap.set(pages, {
    transformStyle: 'preserve-3d',
    transformOrigin: 'left center',
    backfaceVisibility: 'hidden',
    position: 'absolute',
    inset: 0,
  });

  pages.forEach((page, i) => {
    gsap.set(page, {
      zIndex: spreads.length - i,
      rotateY: 0,
      xPercent: 0,
    });
  });

  const tl = gsap.timeline({
    scrollTrigger: {
      trigger: containerRef.current,
      start: 'top top',
      end: `+=${window.innerHeight * spreads.length}`,
      scrub: 1.2,
      pin: true,
      anticipatePin: 1,
      onUpdate: (self) => {
        setPageIndex(Math.round(self.progress * Math.max(0, spreads.length - 1)));
      },
    },
  });

  pages.forEach((page, i) => {
    if (i === pages.length - 1) return;

    tl.to(
      page,
      {
        rotateY: -180,
        duration: 1,
        ease: 'power2.inOut',
      },
      i
    );
  });

  stRef.current = tl.scrollTrigger as ScrollTrigger;

  return () => {
    tl.scrollTrigger?.kill();
    tl.kill();
  };
}, []);

  const toggleSave = (name: string) => {
    setSavedDishes((s) => {
      const ns = new Set(s);
      if (ns.has(name)) ns.delete(name); else ns.add(name);
      return ns;
    });
  };

  const goTo = (i: number) => {
    setPageIndex(i);
    if (stRef.current) {
      const st = stRef.current;
      const progress = i / Math.max(1, spreads.length - 1);
      const targetScroll = st.start + (st.end - st.start) * progress;
      gsap.to(window, { scrollTo: targetScroll, duration: 1.2, ease: 'power3.inOut' });
    }
  };

  const scrollNav = (dir: 'left' | 'right') => {
    const el = navRef.current;
    if (!el) return;
    const amount = Math.max(240, Math.floor(el.clientWidth * 0.45));
    el.scrollBy({ left: dir === 'left' ? -amount : amount, behavior: 'smooth' });
  };

  // ensure nav starts at left and update arrow availability
  useEffect(() => {
    const el = navRef.current;
    if (!el) return;
    // start from left edge to avoid clipped items
    el.scrollLeft = 0;

    const update = () => {
      setCanScrollLeft(el.scrollLeft > 6);
      setCanScrollRight(el.scrollWidth - el.clientWidth - el.scrollLeft > 6);
    };

    update();
    el.addEventListener('scroll', update, { passive: true });
    window.addEventListener('resize', update);

    return () => {
      el.removeEventListener('scroll', update);
      window.removeEventListener('resize', update);
    };
  }, [navRef]);

  return (
    <div style={{ background: CREAM }} className="min-h-screen">
      {/* HERO */}
      <section data-tone="light" className="px-5 sm:px-8 lg:px-14 pt-32 lg:pt-40 pb-10 lg:pb-14 text-center">
        <div className="tracking-[0.42em] uppercase mb-5" style={{ fontSize: '10px', color: SAGE_DARK }}>— Taste the Wellness</div>
        <h1 className="font-serif" style={{ fontSize: 'clamp(40px, 6vw, 80px)', lineHeight: 1.02, color: INK, fontWeight: 300, letterSpacing: '-0.015em' }}>
          Our <em style={{ fontStyle: 'italic' }}>Menu.</em>
        </h1>
        <p className="mx-auto mt-6" style={{ fontSize: '14px', lineHeight: 1.85, color: 'rgba(42,37,32,0.6)', maxWidth: '520px' }}>
          Scroll through the chapters of cold-pressed vitality, curated salads, sandwiches, wraps, soups, chaat, zoodles, and house-crafted dips.
        </p>
      </section>

      {/* CHAPTER NAV - rebuilt clean horizontal layout */}
      <section data-tone="light" className="px-5 sm:px-8 lg:px-14 pb-8 sticky top-[72px] z-50"
        style={{ background: 'rgba(244,239,230,0.92)', backdropFilter: 'blur(12px)' }}>
        <div className="max-w-[1400px] mx-auto px-2">
          <div className="flex items-center gap-4">
            {/* Left arrow - sits outside scroll area */}
            <div className="flex-shrink-0">
              <button aria-label="Scroll categories left" onClick={() => scrollNav('left')}
                className="hidden md:inline-flex items-center justify-center"
                style={{
                  height: 36,
                  width: 36,
                  borderRadius: 6,
                  border: '1px solid rgba(20,17,15,0.06)',
                  background: 'transparent',
                  transition: 'opacity 160ms ease, transform 120ms ease, background-color 160ms ease',
                  alignItems: 'center',
                  justifyContent: 'center',
                  opacity: canScrollLeft ? 1 : 0.36,
                  pointerEvents: canScrollLeft ? 'auto' : 'none'
                }}
              >
                <ChevronLeft size={16} strokeWidth={1.2} color={'rgba(20,17,15,0.68)'} />
              </button>
            </div>

            {/* Scrollable pills container - takes remaining width */}
            <div className="flex-1 overflow-hidden">
              <div ref={navRef} className="flex items-center gap-4 whitespace-nowrap overflow-x-auto py-3 px-1"
                style={{ scrollbarWidth: 'none', msOverflowStyle: 'none', WebkitOverflowScrolling: 'touch' as any }}>
                {spreads.map((s, i) => {
                  const isActive = i === pageIndex;
                  return (
                    <button key={s.number} onClick={() => goTo(i)}
                      className="flex items-center gap-3 transition-all duration-300 flex-shrink-0"
                      style={{
                        fontSize: '11px', letterSpacing: '0.22em', textTransform: 'uppercase',
                        color: isActive ? CREAM : INK,
                        background: isActive ? INK : 'transparent',
                        border: `1px solid ${isActive ? INK : 'rgba(42,37,32,0.12)'}`,
                        borderRadius: '6px',
                        minWidth: 100,
                        whiteSpace: 'nowrap',
                        padding: '10px 18px',
                        display: 'inline-flex',
                        alignItems: 'center',
                        justifyContent: 'center'
                      }}>
                      <span style={{ opacity: 0.65, fontSize: 12, marginRight: 8 }}>{s.number}</span>
                      <span className="whitespace-nowrap" style={{ fontWeight: 400 }}>{s.title}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Right arrow - sits outside scroll area */}
            <div className="flex-shrink-0">
              <button aria-label="Scroll categories right" onClick={() => scrollNav('right')}
                className="hidden md:inline-flex items-center justify-center"
                style={{
                  height: 36,
                  width: 36,
                  borderRadius: 6,
                  border: '1px solid rgba(20,17,15,0.06)',
                  background: 'transparent',
                  transition: 'opacity 160ms ease, transform 120ms ease, background-color 160ms ease',
                  alignItems: 'center',
                  justifyContent: 'center',
                  opacity: canScrollRight ? 1 : 0.36,
                  pointerEvents: canScrollRight ? 'auto' : 'none'
                }}
              >
                <ChevronRight size={16} strokeWidth={1.2} color={'rgba(20,17,15,0.68)'} />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* GSAP SCROLL-DRIVEN BOOK */}
      <div ref={containerRef} className="relative w-full h-screen overflow-hidden bg-[var(--cream)]" style={{ perspective: '2500px' }}>
        <div className="absolute inset-0 max-w-[1400px] mx-auto px-4 sm:px-8 lg:px-14 py-8 flex items-center justify-center">
          <div className="relative w-full h-full lg:h-[85vh] max-h-[900px]">
            {spreads.map((spread, i) => {
              return (
                <div 
                  key={spread.number} 
                  className="spread-page absolute inset-0 w-full h-full"
                  style={{
                    zIndex: spreads.length - i,
                    backfaceVisibility: 'hidden',
                    background: CREAM,
                    // soft ambient paper-like shadow for premium feel
                    boxShadow: '0 18px 40px rgba(20,17,15,0.06)',
                  }}
                >
                  <SpreadView 
                    spread={spread} 
                    saved={savedDishes} 
                    onSave={toggleSave} 
                    onOpen={setActiveDish} 
                    pageIndex={i} 
                    total={spreads.length} 
                  />
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* CLOSING */}
      <section className="py-20 lg:py-28 text-center" style={{ background: DARK_2 }}>
        <div className="max-w-[680px] mx-auto px-6">
          <div className="tracking-[0.42em] uppercase mb-6" style={{ fontSize: '10px', color: SAGE }}>— A Final Note</div>
          <p className="font-serif" style={{ fontSize: 'clamp(22px, 2.4vw, 32px)', color: CREAM, lineHeight: 1.4, fontWeight: 300 }}>
            Our menu shifts with the season — <em style={{ fontStyle: 'italic', color: SAGE }}>arrive curious.</em>
          </p>
        </div>
      </section>

      {/* DISH MODAL */}
      <AnimatePresence>
        {activeDish && (
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-[100] flex items-end sm:items-center justify-center p-0 sm:p-6"
            style={{ background: 'rgba(20,17,15,0.7)', backdropFilter: 'blur(8px)' }}
            onClick={() => setActiveDish(null)}
          >
            <motion.div
              initial={{ y: 80, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 80, opacity: 0 }}
              transition={{ duration: 0.5, ease }}
              onClick={(e) => e.stopPropagation()}
              className="relative w-full sm:max-w-[520px] overflow-hidden"
              style={{ background: CREAM, borderRadius: '2px 2px 0 0' }}
            >
              <button onClick={() => setActiveDish(null)}
                className="absolute top-4 right-4 z-10 p-2 transition-transform active:scale-90"
                style={{ background: 'rgba(244,239,230,0.9)', borderRadius: '50%' }}>
                <X size={18} strokeWidth={1.4} color={INK} />
              </button>
              <div style={{ aspectRatio: '4/3' }} className="overflow-hidden">
                <ImageWithFallback src={activeDish.image} alt={activeDish.name} className="w-full h-full object-cover" />
              </div>
              <div className="p-7 sm:p-9">
                <div className="flex items-baseline justify-between gap-4 mb-3">
                  <h3 className="font-serif" style={{ fontSize: '26px', color: INK, fontWeight: 300, lineHeight: 1.15 }}>{activeDish.name}</h3>
                  <span className="font-serif flex-shrink-0" style={{ fontSize: '20px', color: SAGE_DARK }}>{activeDish.price}</span>
                </div>
                <p style={{ fontSize: '14px', color: 'rgba(42,37,32,0.7)', lineHeight: 1.75 }}>{activeDish.desc}</p>

                <div className="mt-6 pt-6" style={{ borderTop: '1px solid rgba(42,37,32,0.12)' }}>
                  <div className="tracking-[0.32em] uppercase mb-3" style={{ fontSize: '10px', color: SAGE_DARK }}>Ingredients</div>
                  <p style={{ fontSize: '13px', color: 'rgba(42,37,32,0.7)', lineHeight: 1.7 }}>{activeDish.details}</p>
                </div>

                <motion.button
                  whileTap={{ scale: 0.97 }}
                  className="mt-8 w-full flex items-center justify-center gap-3 py-4 tracking-[0.24em] uppercase"
                  style={{ fontSize: '11px', background: INK, color: CREAM, border: `1px solid ${INK}`, borderRadius: '1px' }}>
                  <Plus size={14} strokeWidth={1.6} /> Add to Order
                </motion.button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function SpreadView({
  spread, saved, onSave, onOpen, pageIndex, total,
}: {
  spread: Spread;
  saved: Set<string>;
  onSave: (n: string) => void;
  onOpen: (d: Dish) => void;
  pageIndex: number;
  total: number;
}) {
  return (
    <div className="w-full h-full flex flex-col lg:flex-row bg-[#F4EFE6] overflow-hidden relative">
      {/* LEFT PAGE — image */}
      <div className="w-full lg:w-1/2 h-[35vh] lg:h-full relative overflow-hidden flex-shrink-0"
        style={{
          background: DARK,
          boxShadow: '20px 0 40px -20px rgba(42,37,32,0.18)',
          zIndex: 2,
        }}>
        <ImageWithFallback src={spread.image} alt={spread.title} className="w-full h-full object-cover" />
        <div className="absolute inset-0" style={{ background: 'linear-gradient(180deg, rgba(20,17,15,0.15) 0%, rgba(20,17,15,0.6) 100%)' }} />
        {/* subtle page-curl on the inner edge */}
        <div className="absolute top-0 right-0 bottom-0 hidden lg:block"
          style={{ width: '24px', background: 'linear-gradient(90deg, rgba(0,0,0,0) 0%, rgba(0,0,0,0.18) 100%)' }} />
        <div className="absolute top-6 left-6 lg:top-10 lg:left-10 font-serif tracking-[0.42em]" style={{ fontSize: '11px', color: SAGE }}>
          — Chapter {spread.number}
        </div>
        <div className="absolute bottom-6 left-6 right-6 lg:bottom-10 lg:left-10 lg:right-10">
          <h2 className="font-serif" style={{ fontSize: 'clamp(28px, 3.6vw, 48px)', lineHeight: 1.05, color: CREAM, fontWeight: 300 }}>
            {spread.title}<br />
            <em style={{ fontStyle: 'italic', color: SAGE }}>{spread.subtitle}</em>
          </h2>
        </div>
      </div>

      {/* RIGHT PAGE — dishes */}
      <div className="w-full lg:w-1/2 flex-1 relative px-5 sm:px-10 lg:px-14 py-7 lg:py-12 flex flex-col overflow-y-auto overscroll-contain"
        style={{ background: CREAM_2, zIndex: 1 }}>
        {/* subtle page-curl on the inner edge */}
        <div className="absolute top-0 left-0 bottom-0 hidden lg:block"
          style={{ width: '24px', background: 'linear-gradient(270deg, rgba(0,0,0,0) 0%, rgba(0,0,0,0.08) 100%)' }} />

        <p className="font-serif italic mb-6 lg:mb-8 flex-shrink-0" style={{ fontSize: '15px', color: 'rgba(42,37,32,0.65)', lineHeight: 1.7, maxWidth: '420px' }}>
          {spread.blurb}
        </p>

        <ul className="space-y-5 flex-1">
          {spread.dishes.map((d, i) => {
            const isSaved = saved.has(d.name);
            return (
              <motion.li
                key={d.name}
                initial={{ opacity: 0, y: 14 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 + i * 0.05, duration: 0.5, ease }}
                className="pb-4"
                style={{ borderBottom: '1px solid rgba(42,37,32,0.12)' }}
              >
                <div className="flex items-start gap-4">
                  <button
                    onClick={() => onOpen(d)}
                    className="flex-1 text-left transition-transform active:scale-[0.99]"
                  >
                    <div className="flex items-baseline justify-between gap-4 mb-1">
                      <h3 className="font-serif" style={{ fontSize: '17px', color: INK, fontWeight: 400, lineHeight: 1.25 }}>{d.name}</h3>
                      <span className="font-serif flex-shrink-0" style={{ fontSize: '15px', color: SAGE_DARK, letterSpacing: '0.04em' }}>{d.price}</span>
                    </div>
                    {d.details && (
                      <div className="tracking-[0.22em] uppercase mb-2" style={{ fontSize: '9px', color: SAGE_DARK, opacity: 0.8 }}>
                        {d.details}
                      </div>
                    )}
                    <p style={{ fontSize: '13px', color: 'rgba(42,37,32,0.65)', lineHeight: 1.65 }}>{d.desc}</p>
                  </button>

                  <motion.button
                    whileTap={{ scale: 0.85 }}
                    onClick={() => onSave(d.name)}
                    className="flex-shrink-0 mt-1 p-2"
                    aria-label="Save dish"
                  >
                    <motion.div
                      animate={{ scale: isSaved ? [1, 1.3, 1] : 1 }}
                      transition={{ duration: 0.4 }}
                    >
                      <Heart
                        size={18}
                        strokeWidth={1.4}
                        fill={isSaved ? SAGE_DARK : 'transparent'}
                        color={isSaved ? SAGE_DARK : 'rgba(42,37,32,0.4)'}
                      />
                    </motion.div>
                  </motion.button>
                </div>
              </motion.li>
            );
          })}
        </ul>

        <div className="mt-6 flex items-center justify-between flex-shrink-0">
          <div className="font-serif tracking-[0.32em]" style={{ fontSize: '11px', color: SAGE_DARK }}>
            — {spread.number}
          </div>
          <div className="tracking-[0.22em] uppercase" style={{ fontSize: '10px', color: 'rgba(42,37,32,0.5)' }}>
            Page {pageIndex + 1} of {total}
          </div>
        </div>
      </div>
    </div>
  );
}
