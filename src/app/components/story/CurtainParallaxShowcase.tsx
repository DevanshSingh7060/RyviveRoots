import {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import './CurtainParallaxShowcase.css';

/* ============================================================
 * CurtainParallaxShowcase
 *
 * Faithful port of the reference Barista parallax pattern
 * (parallex.html). Mechanics:
 *
 *   1. ONE fixed lower-layer image sits behind everything.
 *   2. Slides alternate:
 *        odd-positioned (1st, 3rd, 5th…) → SOLID, carries its own
 *        background image with `background-attachment: fixed`.
 *        even-positioned (2nd, 4th, 6th…) → TRANSPARENT, so the
 *        fixed lower layer shows through.
 *   3. As the user scrolls, solid slides reveal/hide the lower
 *      fixed image — the curtain feel.
 *   4. Slim dividers between slides, content fades in via
 *      IntersectionObserver, scroll indicator on the first slide.
 *
 * The fixed lower-layer image is the image of the most-recent
 * even-positioned (transparent) slide whose turn it is, so each
 * "transparent" reveal shows a different image.
 * ============================================================ */

export type CurtainSlide = {
  /** Image URL for this slide. For solid slides, this paints the
   *  slide. For transparent slides, this becomes the fixed lower
   *  layer that's visible while this slide is in view. */
  image: string;
  eyebrow?: string;
  /** Title; supports a single <em>...</em> for an accent. */
  title: string;
  subtitle?: string;
  /** Optional CTA label. If omitted, the button is hidden. */
  ctaLabel?: string;
  /** Optional CTA href (defaults to `#`). */
  ctaHref?: string;
  /** Alt text used by the preloader for accessibility. */
  alt?: string;
};

type Props = {
  slides: CurtainSlide[];
  /** Show the scroll indicator on the first slide. Default true. */
  showScrollIndicator?: boolean;
  /** Show dividers between slides. Default true. */
  showDividers?: boolean;
  className?: string;
};

const renderTitle = (title: string) => {
  const match = title.match(/^(.*?)<em>(.*?)<\/em>(.*)$/);
  if (match) {
    return (
      <>
        {match[1]}
        <em>{match[2]}</em>
        {match[3]}
      </>
    );
  }
  return title;
};

export function CurtainParallaxShowcase({
  slides,
  showScrollIndicator = true,
  showDividers = true,
  className,
}: Props) {
  const total = slides.length;

  /** index currently most-visible (used to drive the fixed lower layer) */
  const [activeIndex, setActiveIndex] = useState(0);
  /** which slide-content elements have been revealed */
  const [revealed, setRevealed] = useState<Set<number>>(() => new Set([0]));

  const slideRefs = useRef<Array<HTMLElement | null>>([]);
  const contentRefs = useRef<Array<HTMLDivElement | null>>([]);

  /* ---------- Preload all images once ---------- */
  useEffect(() => {
    const imgs: HTMLImageElement[] = slides.map((s) => {
      const img = new Image();
      img.src = s.image;
      img.decoding = 'async';
      return img;
    });
    return () => {
      imgs.length = 0;
    };
  }, [slides]);

  /* ---------- Active slide tracker (drives fixed bg) ---------- */
  useEffect(() => {
    if (typeof window === 'undefined' || !('IntersectionObserver' in window)) {
      return;
    }
    const obs = new IntersectionObserver(
      (entries) => {
        let best: { idx: number; ratio: number } | null = null;
        for (const e of entries) {
          const idx = Number((e.target as HTMLElement).dataset.idx ?? '0');
          if (e.isIntersecting && (!best || e.intersectionRatio > best.ratio)) {
            best = { idx, ratio: e.intersectionRatio };
          }
        }
        if (best) setActiveIndex(best.idx);
      },
      {
        threshold: [0.25, 0.5, 0.75],
        rootMargin: '-25% 0px -25% 0px',
      },
    );

    slideRefs.current.forEach((el) => el && obs.observe(el));
    return () => obs.disconnect();
  }, [total]);

  /* ---------- Content reveal observer ----------
     Add-only: once a slide's content has been revealed, it stays
     revealed. This prevents content from "fading away" when the
     user scrolls past or back up. The observer un-observes each
     element after its first reveal to minimise work. */
  useEffect(() => {
    if (typeof window === 'undefined' || !('IntersectionObserver' in window)) {
      // Fallback: reveal everything immediately
      setRevealed(new Set(slides.map((_, i) => i)));
      return;
    }
    const obs = new IntersectionObserver(
      (entries) => {
        let added = false;
        const toUnobserve: Element[] = [];
        setRevealed((prev) => {
          const next = new Set(prev);
          for (const e of entries) {
            if (!e.isIntersecting) continue;
            const idx = Number((e.target as HTMLElement).dataset.idx ?? '0');
            if (!next.has(idx)) {
              next.add(idx);
              added = true;
            }
            toUnobserve.push(e.target);
          }
          return added ? next : prev;
        });
        // Disconnect each element from further observation once revealed
        toUnobserve.forEach((el) => obs.unobserve(el));
      },
      { threshold: 0.2 },
    );

    // Defer observation by one frame so layout settles before the
    // observer fires its initial callback.
    const raf = requestAnimationFrame(() => {
      contentRefs.current.forEach((el) => el && obs.observe(el));
    });

    // Safety net: force the first slide visible if no callback
    // fires within 250ms (e.g. hash-restored scroll elsewhere).
    const safety = window.setTimeout(() => {
      setRevealed((prev) => {
        if (prev.has(0)) return prev;
        const next = new Set(prev);
        next.add(0);
        return next;
      });
    }, 250);

    return () => {
      cancelAnimationFrame(raf);
      window.clearTimeout(safety);
      obs.disconnect();
    };
  }, [slides]);

  /* ---------- Compute the fixed lower-layer image ----------
     Rule (matches the spec):
       - First slide → upper layer image visible (the slide itself).
       - Next slide  → transparent; fixed lower layer shows the
         next image.
       - Continues alternating. We use the most-recent even-position
         slide image (i.e. slides at index 1, 3, 5...) as the lower
         layer while the user is on a transparent slide; while on a
         solid slide, we preload the NEXT transparent slide's image
         so its reveal is seamless. */
  const fixedBgImage = useMemo(() => {
    const len = slides.length;
    if (!len) return undefined;

    const isTransparentIdx = (i: number) => i % 2 === 1;

    // Find next transparent index ≥ from. Wraps if necessary.
    const nextTransparent = (from: number): number => {
      for (let i = from; i < len; i++) if (isTransparentIdx(i)) return i;
      for (let i = 0; i < len; i++) if (isTransparentIdx(i)) return i;
      return -1;
    };

    let target: number;
    if (isTransparentIdx(activeIndex)) {
      target = activeIndex; // user is currently on a transparent slide
    } else {
      target = nextTransparent(activeIndex + 1); // preload the next reveal
    }
    if (target < 0) target = 0;
    return slides[target]?.image;
  }, [activeIndex, slides]);

  /* ---------- Smooth refs collector ---------- */
  const setSlideRef = useCallback(
    (idx: number) => (el: HTMLElement | null) => {
      slideRefs.current[idx] = el;
    },
    [],
  );
  const setContentRef = useCallback(
    (idx: number) => (el: HTMLDivElement | null) => {
      contentRefs.current[idx] = el;
    },
    [],
  );

  if (!total) return null;

  return (
    <section
      className={`crtn-pshow${className ? ` ${className}` : ''}`}
      aria-label="Story showcase"
    >
      {/* Fixed lower layer (visible behind transparent slides) */}
      <div
        className="crtn-pshow-bg"
        style={fixedBgImage ? { backgroundImage: `url("${fixedBgImage}")` } : undefined}
        aria-hidden="true"
      />

      {/* Slides */}
      <div className="crtn-pshow-wrap">
        {slides.map((slide, i) => {
          const isSolid = i % 2 === 0; // 0, 2, 4 → solid (upper layer image)
          const isVisible = revealed.has(i);
          const isFirst = i === 0;
          const isLast = i === total - 1;

          const cls = [
            'crtn-slide',
            isSolid ? 'is-solid' : 'is-transparent',
          ].join(' ');

          const sectionStyle: React.CSSProperties | undefined = isSolid
            ? ({ ['--slide-bg' as string]: `url("${slide.image}")` } as React.CSSProperties)
            : undefined;

          return (
            <div key={i}>
              <section
                ref={setSlideRef(i)}
                data-idx={i}
                className={cls}
                style={sectionStyle}
                aria-roledescription="slide"
                aria-label={`${i + 1} of ${total}: ${slide.title.replace(/<\/?em>/g, '')}`}
              >
                <div
                  ref={setContentRef(i)}
                  data-idx={i}
                  className={`crtn-slide-content${isVisible ? ' is-visible' : ''}`}
                >
                  {slide.eyebrow && (
                    <span className="crtn-slide-eyebrow">{slide.eyebrow}</span>
                  )}
                  <h2 className="crtn-slide-title">{renderTitle(slide.title)}</h2>
                  {slide.subtitle && <p className="crtn-slide-sub">{slide.subtitle}</p>}
                  {slide.ctaLabel && (
                    <a className="crtn-slide-btn" href={slide.ctaHref ?? '#'}>
                      {slide.ctaLabel}
                    </a>
                  )}
                </div>

                {showScrollIndicator && isFirst && (
                  <div className="crtn-scroll" aria-hidden="true">
                    <div className="crtn-scroll-line" />
                    <span className="crtn-scroll-label">Scroll</span>
                  </div>
                )}
              </section>

              {showDividers && !isLast && <div className="crtn-divider" />}
            </div>
          );
        })}
      </div>
    </section>
  );
}

export default CurtainParallaxShowcase;
