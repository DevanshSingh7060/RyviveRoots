import { useEffect, useRef, useState } from 'react';
import './CurtainParallaxShowcase.css';

/* ============================================================
 * Story page parallax curtain primitives.
 *
 * Three exports:
 *
 *   <StoryParallaxBackground image={...} />
 *     A page-wide fixed lower-layer image. Render once at the
 *     top of the Story page. Auto-hides when the user scrolls
 *     past the parallax wrapper.
 *
 *   <StoryParallaxWrap>{children}</StoryParallaxWrap>
 *     Wraps all parallax sections. Sits above the fixed bg and
 *     drives the auto-hide via an IntersectionObserver.
 *
 *   <ParallaxStorySection variant="solid"|"transparent" image={...}>
 *     Wraps a single story section. Solid variant paints its
 *     own image with background-attachment: fixed. Transparent
 *     variant has no background — the fixed lower-layer shows
 *     through.
 *
 * Content fades in once per page load. Once revealed, it stays
 * visible (the IntersectionObserver unobserves the element).
 * ============================================================ */

/* ---------- Fixed lower-layer image ---------- */
type StoryParallaxBackgroundProps = {
  image: string;
  /** External flag toggled by <StoryParallaxWrap> to hide the
   *  bg once the user has scrolled past the parallax area. */
  hidden?: boolean;
};

export function StoryParallaxBackground({
  image,
  hidden,
}: StoryParallaxBackgroundProps) {
  return (
    <div
      className={`story-lower-bg${hidden ? ' is-hidden' : ''}`}
      style={{ backgroundImage: `url("${image}")` }}
      aria-hidden="true"
    />
  );
}

/* ---------- Parallax wrap ----------
 *  Provides a relative container so sections stack above the
 *  fixed lower layer. Also exposes an IntersectionObserver-
 *  driven `inView` hook so the lower bg can be hidden once the
 *  parallax region scrolls fully out of view. */
type StoryParallaxWrapProps = {
  children: React.ReactNode;
  onInViewChange?: (inView: boolean) => void;
  className?: string;
};

export function StoryParallaxWrap({
  children,
  onInViewChange,
  className,
}: StoryParallaxWrapProps) {
  const ref = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!onInViewChange) return;
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => onInViewChange(entry.isIntersecting),
      { threshold: 0 },
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [onInViewChange]);

  return (
    <div
      ref={ref}
      className={`story-parallax-wrap${className ? ` ${className}` : ''}`}
    >
      {children}
    </div>
  );
}

/* ---------- Single parallax section ---------- */
type ParallaxStorySectionProps = {
  /** "solid" sections paint their own image; "transparent"
   *  sections show the lower-layer fixed image through. */
  variant: 'solid' | 'transparent';
  /** Image used for solid variant. Ignored for transparent. */
  image?: string;
  /** Optional id for in-page anchor links. */
  id?: string;
  children: React.ReactNode;
  className?: string;
};

export function ParallaxStorySection({
  variant,
  image,
  id,
  children,
  className,
}: ParallaxStorySectionProps) {
  const contentRef = useRef<HTMLDivElement | null>(null);
  const [revealed, setRevealed] = useState(false);

  /* Reveal once when in view. Once revealed, stay revealed. */
  useEffect(() => {
    const el = contentRef.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setRevealed(true);
            obs.unobserve(entry.target);
          }
        }
      },
      { threshold: 0.15, rootMargin: '0px 0px -10% 0px' },
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  const sectionStyle: React.CSSProperties | undefined =
    variant === 'solid' && image
      ? ({ ['--section-bg' as string]: `url("${image}")` } as React.CSSProperties)
      : undefined;

  const cls = [
    'parallax-section',
    variant === 'solid' ? 'is-solid' : 'is-transparent',
    className,
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <section id={id} className={cls} style={sectionStyle}>
      <div
        ref={contentRef}
        className={`parallax-section-content${revealed ? ' is-visible' : ''}`}
      >
        {children}
      </div>
    </section>
  );
}

/* ---------- Slim divider ---------- */
export function ParallaxDivider() {
  return <div className="parallax-divider" aria-hidden="true" />;
}
