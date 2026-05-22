import { useEffect, useRef } from 'react';
import { useLocation } from 'react-router';
import { Instagram, Linkedin, Youtube, Phone } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { CREAM, SAGE } from '../theme';

const footerImage = new URL('../images/Landing-1.jpeg', import.meta.url).href;

gsap.registerPlugin(ScrollTrigger);

export function SiteFooter() {
  const footerRef = useRef<HTMLElement | null>(null);
  const contentRef = useRef<HTMLDivElement | null>(null);
  const imageRef = useRef<HTMLDivElement | null>(null);
  const location = useLocation();

  // Ensure ScrollTrigger gets refreshed when navigating between pages
  useEffect(() => {
    const timeout = setTimeout(() => {
      ScrollTrigger.refresh();
    }, 150);
    return () => clearTimeout(timeout);
  }, [location.pathname]);

  useEffect(() => {
    const footer = footerRef.current;
    const content = contentRef.current;
    const image = imageRef.current;

    if (!footer || !content || !image) return;

    const leftGroup = footer.querySelector<HTMLElement>('[data-footer-left]');
    const centerGroup = footer.querySelector<HTMLElement>('[data-footer-center]');
    const rightGroup = footer.querySelector<HTMLElement>('[data-footer-right]');
    const bottomRow = footer.querySelector<HTMLElement>('[data-footer-bottom]');
    const navItems = footer.querySelectorAll<HTMLElement>('[data-footer-nav-item]');
    const contactItems = footer.querySelectorAll<HTMLElement>('[data-footer-contact-item]');
    const socialItems = footer.querySelectorAll<HTMLElement>('[data-footer-social-item]');
    const footerMarks = footer.querySelectorAll<HTMLElement>('[data-footer-mark]');

    const ctx = gsap.context(() => {
      // Initial states
      gsap.set(content, { opacity: 0, y: 30 });
      gsap.set(image, { transformOrigin: 'center center' });
      gsap.set([leftGroup, centerGroup, rightGroup, bottomRow, navItems, contactItems, socialItems, footerMarks].flat().filter(Boolean), { y: 0, willChange: 'transform' });

      if (leftGroup) {
        gsap.fromTo(leftGroup, { y: 14 }, { y: -10, ease: 'none', scrollTrigger: { trigger: footer, start: 'top bottom', end: 'bottom top', scrub: 1.15 } });
      }

      if (centerGroup) {
        gsap.fromTo(centerGroup, { y: 10 }, { y: -12, ease: 'none', scrollTrigger: { trigger: footer, start: 'top 92%', end: 'bottom top', scrub: 1.2 } });
      }

      if (rightGroup) {
        gsap.fromTo(rightGroup, { y: 12 }, { y: -8, ease: 'none', scrollTrigger: { trigger: footer, start: 'top 88%', end: 'bottom top', scrub: 1.18 } });
      }

      if (bottomRow) {
        gsap.fromTo(bottomRow, { y: 8 }, { y: -6, ease: 'none', scrollTrigger: { trigger: footer, start: 'top 84%', end: 'bottom top', scrub: 1.05 } });
      }

      gsap.set(image, { yPercent: 0, scale: 1 });

      navItems.forEach((item, index) => {
        gsap.fromTo(item, { y: 8 + index * 1.5 }, { y: -6 - index * 1.5, ease: 'none', scrollTrigger: { trigger: footer, start: 'top 90%', end: 'bottom top', scrub: 1.15 } });
      });

      contactItems.forEach((item, index) => {
        gsap.fromTo(item, { y: 6 + index }, { y: -5 - index, ease: 'none', scrollTrigger: { trigger: footer, start: 'top 88%', end: 'bottom top', scrub: 1.1 } });
      });

      socialItems.forEach((item, index) => {
        gsap.fromTo(item, { y: 5 + index }, { y: -4 - index, ease: 'none', scrollTrigger: { trigger: footer, start: 'top 84%', end: 'bottom top', scrub: 1.08 } });
      });

      footerMarks.forEach((item, index) => {
        gsap.fromTo(item, { y: 4 + index }, { y: -4 - index, ease: 'none', scrollTrigger: { trigger: footer, start: 'top 86%', end: 'bottom top', scrub: 1.08 } });
      });

      // Fade in content as footer enters view
      gsap.to(content, {
        opacity: 1,
        y: 0,
        duration: 1,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: footer,
          start: 'top 85%',
        }
      });
    }, footer);

    // CRITICAL: Refresh ScrollTrigger when page height changes
    const observer = new ResizeObserver(() => {
      ScrollTrigger.refresh();
    });
    observer.observe(footer);

    return () => {
      ctx.revert();
      observer.disconnect();
    };
  }, []);

  return (
    <footer ref={footerRef} data-tone="light" className="relative overflow-hidden">
      <div className="absolute inset-0 bg-[#0f0c0a]" />
      {/* Static background image */}
      <div
        ref={imageRef}
        className="absolute left-0 right-0 w-full"
        style={{
          top: '-35%',
          bottom: '-35%',
          backgroundImage: `url(${footerImage})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          willChange: 'transform',
        }}
      />
      <div
        className="absolute inset-0"
        style={{
          background:
            'linear-gradient(180deg, rgba(10, 8, 7, 0.18) 0%, rgba(18, 14, 12, 0.46) 42%, rgba(18, 14, 12, 0.92) 100%)',
        }}
      />
      <div
        className="absolute inset-0 opacity-70 mix-blend-soft-light"
        style={{
          background:
            'radial-gradient(circle at 20% 18%, rgba(139,149,121,0.16), transparent 34%), radial-gradient(circle at 82% 78%, rgba(212,175,55,0.12), transparent 30%)',
        }}
      />

      <div ref={contentRef} className="relative z-10">
        <div className="max-w-[1400px] mx-auto px-6 sm:px-8 lg:px-14 pt-24 pb-10 lg:pt-28 lg:pb-12">
          <div className="grid gap-10 lg:grid-cols-[1.2fr_0.8fr_0.8fr] items-start">
            <div data-footer-left className="max-w-[26rem]">
              <div data-footer-mark className="font-serif tracking-[0.26em] uppercase mb-5" style={{ fontSize: '13px', color: CREAM }}>
                Ryvive <span style={{ color: SAGE }}>Roots</span>
              </div>
              <p data-footer-mark className="max-w-[22rem]" style={{ color: 'rgba(244,239,230,0.78)', fontSize: '14px', lineHeight: 1.9 }}>
                Conscious dining, crafted with calm precision and warm hospitality.
              </p>
            </div>

            <div data-footer-center>
              <div data-footer-mark className="tracking-[0.34em] uppercase mb-5" style={{ fontSize: '10px', color: SAGE }}>
                Explore
              </div>
              <ul className="space-y-3">
                {['Menu', 'Subscription', 'Story', 'Reservations'].map((item) => (
                  <li key={item} data-footer-nav-item>
                    <a
                      href="#"
                      className="transition-colors"
                      style={{ color: 'rgba(244,239,230,0.78)', fontSize: '13px', letterSpacing: '0.04em' }}
                      onMouseEnter={(e) => (e.currentTarget.style.color = CREAM)}
                      onMouseLeave={(e) => (e.currentTarget.style.color = 'rgba(244,239,230,0.78)')}
                    >
                      {item}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            <div data-footer-right>
              <div data-footer-mark className="tracking-[0.34em] uppercase mb-5" style={{ fontSize: '10px', color: SAGE }}>
                Contact
              </div>
              <ul className="space-y-3" style={{ color: 'rgba(244,239,230,0.78)', fontSize: '13px' }}>
                <li data-footer-contact-item>+91 97656 00701</li>
                <li data-footer-contact-item>hello@ryviveroots.com</li>
                <li data-footer-contact-item>Dombivli, Mumbai</li>
              </ul>
            </div>
          </div>

          <div data-footer-bottom className="mt-16 pt-6 flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between" style={{ borderTop: '1px solid rgba(244,239,230,0.16)' }}>
            <div data-footer-mark style={{ color: 'rgba(244,239,230,0.62)', fontSize: '10px', letterSpacing: '0.26em', textTransform: 'uppercase' }}>
              ©️ 2026 Ryvive Roots — Mumbai
            </div>
            <div className="flex items-center gap-5">
              {[Instagram, Linkedin, Youtube, Phone].map((Icon, i) => (
                <a
                  key={i}
                  data-footer-social-item
                  href="#"
                  className="transition-colors"
                  style={{ color: 'rgba(244,239,230,0.68)' }}
                  onMouseEnter={(e) => (e.currentTarget.style.color = CREAM)}
                  onMouseLeave={(e) => (e.currentTarget.style.color = 'rgba(244,239,230,0.68)')}
                >
                  <Icon className="w-4 h-4" strokeWidth={1.3} />
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div
        className="relative z-10 h-12 lg:h-16"
        style={{
          background:
            'linear-gradient(180deg, rgba(15,12,10,0) 0%, rgba(15,12,10,0.44) 100%)',
        }}
      />
    </footer>
  );
}
