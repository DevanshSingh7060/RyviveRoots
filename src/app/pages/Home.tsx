import { motion, AnimatePresence } from 'motion/react';
import { Link } from 'react-router';
import { Check, ChevronLeft, ChevronRight } from 'lucide-react';
import { useState, useEffect } from 'react';

// Images
import heroImage from "@/app/images/Avocado-Shake.JPG";
import landing1 from "@/app/images/Landing-1.jpeg";
import landing2 from "@/app/images/Landing-2.jpeg";
import landing3 from "@/app/images/Landing-3.jpeg";
import landing4 from "@/app/images/Landing-4.jpeg";
import story1 from "@/app/images/Story-1.JPG";
import menu1 from "@/app/images/Menu-1.jpeg";
import menu2 from "@/app/images/Menu-2.jpeg";
import menu4 from "@/app/images/Menu-4.jpeg";

import { ImageWithFallback } from '../components/figma/ImageWithFallback';
import { CREAM, CREAM_2, DARK, DARK_2, INK, SAGE, SAGE_DARK } from '../theme';

// Testimonials Data exactly as requested
const testimonials = [
  {
    name: "Monika Korgaonkar",
    text: "One of the best dining experiences I’ve had. The ingredients were fresh, the flavors were perfect, and the presentation was excellent. Highly recommended for food lovers."
  },
  {
    name: "Dileep Kumar",
    text: "Tried this place for the first time today and honestly didn’t expect healthy food to taste this good. Everything was fresh and nicely seasoned. Definitely coming back."
  },
  {
    name: "Deepak World Vacation",
    text: "Best healthy food option in Dombivli right now. Clean packaging, good portions, and consistent taste. Been ordering for 3 weeks straight."
  },
  {
    name: "Santosh Gupta",
    text: "I Tried the immunity booster and libido booster. I feel energetic and it tastes so good. Thank you Ryvive Roots for giving me such a good experience and ambience is so good."
  },
  {
    name: "Rajan Jadhav",
    text: "Loved the detox juices here. Very refreshing and natural taste."
  },
  {
    name: "Afroza Khan",
    text: "Loved the detox juices here. Very refreshing and natural taste."
  },
  {
    name: "Shashi Shetty",
    text: "Excellent ambience and soulful food."
  },
  {
    name: "Vishal Shetty",
    text: "This place is a hidden gem! If you guys are into conscious and healthy eating, look no further."
  },
  {
    name: "Sonali Ovhal",
    text: "It's outstanding awesome and healthy please try, be fit stay healthy."
  },
  {
    name: "The Alok Tamhankar Show",
    text: "A super healthy alternative to unwanted junk food... Bon appetite... Must try"
  }
];

// 4 Categories Data mapped to original card visuals
const categories = [
  { title: "Bowls", desc: "Macro-balanced energy reserves utilizing plant clean protein", price: "Clean Protein", image: menu4 },
  { title: "Salads", desc: "Organic garden beds with microgreens & house seed toppings", price: "House Bowls", image: landing1 },
  { title: "Wraps", desc: "Antioxidant wheat rolls with crisp fresh vegetables", price: "Fresh Rolls", image: landing2 },
  { title: "Cold-Pressed Juices", desc: "Cold-pressed elixirs & premium functional wellness shots", price: "Elixirs", image: heroImage }
];

export default function Home() {
  // Testimonial sliding state
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const visibleCards = 1;

  // Autoplay Slider - Slides one by one with a 2800ms delay
  useEffect(() => {
    if (isHovered) return;
    const interval = setInterval(() => {
      setCurrentIndex((prev) => {
        const maxIndex = testimonials.length - visibleCards;
        return prev >= maxIndex ? 0 : prev + 1;
      });
    }, 2800);
    return () => clearInterval(interval);
  }, [isHovered]);

  const handleNextTestimonial = () => {
    setCurrentIndex((prev) => {
      const maxIndex = testimonials.length - visibleCards;
      return prev >= maxIndex ? 0 : prev + 1;
    });
  };

  const handlePrevTestimonial = () => {
    setCurrentIndex((prev) => {
      const maxIndex = testimonials.length - visibleCards;
      return prev === 0 ? maxIndex : prev - 1;
    });
  };

  return (
    <>
      {/* HERO — DARK (ORIGINAL VISUAL DESIGN PRESERVED EXACTLY) */}
      <section className="relative min-h-screen flex items-center overflow-hidden" style={{ background: DARK_2 }}>
        <div className="absolute inset-0">
          <ImageWithFallback
            src={heroImage}
            alt="Hero"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0" style={{ background: 'linear-gradient(180deg, rgba(20,17,15,0.55) 0%, rgba(20,17,15,0.4) 50%, rgba(20,17,15,0.95) 100%)' }} />
        </div>

        <div className="relative z-10 max-w-[1400px] mx-auto px-8 lg:px-14 w-full pt-32">
          <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1, ease: 'easeOut' }} className="max-w-3xl">
            {/* Eyebrow Text */}
            <div className="tracking-[0.42em] uppercase mb-10 flex items-center gap-4" style={{ fontSize: '11px', color: SAGE }}>
              <span style={{ width: '36px', height: '1px', background: SAGE, display: 'inline-block' }} />
              CRAFTED FOR BALANCE, FRESHNESS, AND FLAVOUR.
            </div>
            
            {/* Main Heading */}
            <h1 className="font-serif mb-10 text-left" style={{ fontSize: 'clamp(42px, 6.2vw, 84px)', lineHeight: 1.04, letterSpacing: '-0.012em', color: CREAM, fontWeight: 300 }}>
              Welcome to<br />
              <span style={{ fontStyle: 'normal', color: SAGE }}>Ryvive Roots</span>
            </h1>
            
            {/* Subheading */}
            <p className="mb-14 max-w-xl text-left" style={{ fontSize: '15px', lineHeight: 1.85, color: 'rgba(244,239,230,0.65)' }}>
              Live better, relive your natural energy, and believe in the power of authentic food.
            </p>
            
            {/* CTA Buttons */}
            <div className="flex flex-wrap items-center gap-8">
              <Link to="/subscription" className="tracking-[0.22em] uppercase transition-colors" style={{ fontSize: '11px', color: 'rgba(244,239,230,0.7)' }}>
                Start Subscription →
              </Link>
            </div>

          </motion.div>
        </div>

        <motion.div animate={{ y: [0, 6, 0] }} transition={{ repeat: Infinity, duration: 2.4 }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2 z-10 tracking-[0.34em] uppercase"
          style={{ fontSize: '10px', color: 'rgba(244,239,230,0.55)' }}>
          Scroll
        </motion.div>
      </section>

      {/* 2. WHAT WE SERVE SECTION — LIGHT (ORIGINAL VISUAL STYLE PRESERVED) */}
      <section data-tone="light" className="pt-20 pb-16 lg:pt-28 lg:pb-20" style={{ background: CREAM }}>
        <div className="max-w-[1100px] mx-auto px-8 lg:px-14 text-center">
          <motion.div initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.9 }}>
            {/* Section Label */}
            <div className="tracking-[0.42em] uppercase mb-8" style={{ fontSize: '11px', color: SAGE_DARK }}>WHAT WE SERVE</div>
            
            {/* Main Heading */}
            <h2 className="font-serif mx-auto mb-8" style={{ fontSize: 'clamp(28px, 3.4vw, 44px)', lineHeight: 1.2, color: INK, fontWeight: 300, maxWidth: '900px' }}>
              NOURISHMENT<br />
              WITHOUT<br />
              <em style={{ fontStyle: 'italic', color: SAGE_DARK }}>COMPROMISE</em>
            </h2>

            {/* Paragraph Text */}
            <p className="mx-auto max-w-2xl text-[14px]" style={{ lineHeight: 1.85, color: 'rgba(42,37,32,0.78)' }}>
              At Ryvive Roots, nothing is accidental. Every bowl, every wrap, every juice is built around what your body genuinely needs — clean proteins, natural boosters, real vegetables, zero compromise. For those who believe that living well begins with eating well.
            </p>
          </motion.div>
        </div>
      </section>

      {/* 3. FEATURED CATEGORIES SECTION — LIGHT (ORIGINAL CARD STYLING PRESERVED) */}
      <section data-tone="light" className="pt-12 pb-24 lg:pt-16 lg:pb-32" style={{ background: CREAM }}>
        <div className="max-w-[1400px] mx-auto px-8 lg:px-14">
          <div className="flex items-end justify-between mb-20 flex-wrap gap-8">
            <div>
              <div className="tracking-[0.42em] uppercase mb-6" style={{ fontSize: '11px', color: SAGE_DARK }}>— Signature</div>
              <h2 className="font-serif text-left" style={{ fontSize: 'clamp(34px, 4.2vw, 56px)', lineHeight: 1.05, color: INK, fontWeight: 300, letterSpacing: '-0.01em' }}>
                Our signature<br />
                <em style={{ fontStyle: 'italic' }}>categories.</em>
              </h2>
            </div>
            <Link to="/menu" className="tracking-[0.22em] uppercase pb-1" style={{ fontSize: '11px', color: INK, borderBottom: `1px solid ${INK}` }}>
              View Full Menu →
            </Link>
          </div>

          {/* Existing card designs and spacing. Loops the 8 requested categories. */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-8">
            {categories.map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ delay: (i % 4) * 0.08, duration: 0.7 }}
                className="group cursor-pointer text-left"
              >
                <div
                  className="relative overflow-hidden mb-7"
                  style={{ aspectRatio: '3/4' }}
                >
                  <ImageWithFallback
                    src={item.image}
                    alt={item.title}
                    className="w-full h-full object-cover transition-transform duration-[1400ms] ease-out group-hover:scale-105"
                  />
                </div>

                <div className="flex items-baseline justify-between mb-2 gap-4">
                  <h3
                    className="font-serif"
                    style={{ fontSize: '20px', color: INK, fontWeight: 400 }}
                  >
                    {item.title}
                  </h3>

                  <span
                    style={{
                      fontSize: '13px',
                      color: SAGE_DARK,
                      letterSpacing: '0.05em'
                    }}
                  >
                    {item.price}
                  </span>
                </div>

                <p
                  style={{
                    fontSize: '13px',
                    color: 'rgba(42,37,32,0.6)',
                    lineHeight: 1.7
                  }}
                >
                  {item.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. ABOUT / PHILOSOPHY SECTION — DARK (ORIGINAL VISUAL STYLE PRESERVED) */}
      <section id="story" className="py-32 lg:py-44" style={{ background: DARK }}>
        <div className="max-w-[1300px] mx-auto px-8 lg:px-14">
          <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-center">
            <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.9 }} className="overflow-hidden" style={{ aspectRatio: '4/5' }}>
              <ImageWithFallback
                src={story1}
                alt="Carefully plated food"
                className="w-full h-full object-cover"
              />
            </motion.div>

            <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.9, delay: 0.15 }}>
              <div className="tracking-[0.42em] uppercase mb-6 text-left" style={{ fontSize: '11px', color: SAGE }}>— Philosophy</div>
              <h2 className="font-serif mb-12 text-left" style={{ fontSize: 'clamp(32px, 3.8vw, 50px)', lineHeight: 1.1, color: CREAM, fontWeight: 300 }}>
                Real food.<br />
                <em style={{ fontStyle: 'italic' }}>Real intention.</em>
              </h2>
              
              {/* PDF Copy Paragraph */}
              <p className="text-left" style={{ fontSize: '15px', color: 'rgba(244,239,230,0.72)', lineHeight: 1.85, marginBottom: '48px', maxWidth: '480px' }}>
                “At Ryvive Roots, nothing is accidental. From sandwiches and salads to wraps and pasta, soups and juices to reimagined chaat every dish is built around what your body genuinely needs. Clean proteins, fresh vegetables, real ingredients, zero compromise.”
              </p>

              <div className="grid grid-cols-3 gap-8 mb-12 pt-10" style={{ borderTop: '1px solid rgba(244,239,230,0.15)' }}>
                {[
                  { label: 'Farm Sourced', v: '100', s: '%' },
                  { label: 'Preservatives', v: '00', s: '%' },
                  { label: 'Daily Prep', v: '24', s: 'h' },
                ].map((stat, i) => (
                  <div key={i} className="text-left">
                    <div className="font-serif mb-2" style={{ fontSize: '34px', color: CREAM, fontWeight: 300 }}>
                      {stat.v}<span style={{ color: SAGE, fontSize: '18px' }}>{stat.s}</span>
                    </div>
                    <div className="tracking-[0.2em] uppercase" style={{ fontSize: '10px', color: 'rgba(244,239,230,0.55)' }}>{stat.label}</div>
                  </div>
                ))}
              </div>

            </motion.div>
          </div>
        </div>
      </section>

      {/* 5. TESTIMONIALS / CLIENT DIARIES — LIGHT CAROUSEL (ORIGINAL CARD STYLING PRESERVED) */}
      <section 
        data-tone="light" 
        className="py-32 lg:py-40 relative overflow-hidden" 
        style={{ background: CREAM_2 }}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <div className="max-w-[1100px] mx-auto px-8 lg:px-14">
          {/* Section Header */}
          <div className="text-center mb-20 relative">
            <div className="tracking-[0.42em] uppercase mb-6" style={{ fontSize: '11px', color: SAGE_DARK }}>— Voices</div>
            <h2 className="font-serif" style={{ fontSize: 'clamp(30px, 3.5vw, 46px)', lineHeight: 1.1, color: INK, fontWeight: 300 }}>
              CLIENT DIARIES
            </h2>
          </div>

          {/* Testimonials Carousel Track Container with swipe controls */}
          <div className="relative w-full max-w-2xl mx-auto overflow-hidden py-4">
            <motion.div 
              className="flex gap-12 items-stretch"
              animate={{ x: `calc(-${currentIndex} * (100% + 48px) / ${visibleCards})` }}
              transition={{ type: "spring", stiffness: 90, damping: 18 }}
              onPanEnd={(event, info) => {
                const threshold = 50;
                if (info.offset.x < -threshold) {
                  handleNextTestimonial();
                } else if (info.offset.x > threshold) {
                  handlePrevTestimonial();
                }
              }}
            >
              {testimonials.map((t, idx) => (
                <div 
                  key={idx}
                  className="flex-shrink-0 flex flex-col justify-between text-left"
                  style={{
                    width: `calc((100% - ${(visibleCards - 1) * 48}px) / ${visibleCards})`,
                  }}
                >
                  {/* Testimonial Quote Text with Original Styling */}
                  <div 
                    className="font-serif mb-8" 
                    style={{ fontSize: '22px', lineHeight: 1.6, color: INK, fontWeight: 300, fontStyle: 'italic' }}
                  >
                    “{t.text}”
                  </div>
                  
                  {/* Testimonial Divider & Client Name */}
                  <div className="pt-6" style={{ borderTop: '1px solid rgba(42,37,32,0.15)' }}>
                    <div style={{ fontSize: '13px', color: INK, letterSpacing: '0.04em', fontWeight: 600 }}>{t.name}</div>
                    <div className="tracking-[0.22em] uppercase mt-1" style={{ fontSize: '10px', color: 'rgba(42,37,32,0.55)' }}>Verified Client</div>
                  </div>
                </div>
              ))}
            </motion.div>
          </div>

          {/* Left/Right Navigation and Autoplay Indicators */}
          <div className="flex items-center justify-center gap-6 mt-12">
            {/* Left Glassmorphism Arrow Button */}
            <button 
              onClick={handlePrevTestimonial}
              className="p-3 rounded-full border transition-all duration-300 group cursor-pointer"
              style={{
                borderColor: 'rgba(42, 37, 32, 0.15)',
                background: 'rgba(42, 37, 32, 0.01)',
                backdropFilter: 'blur(8px)'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = 'rgba(42, 37, 32, 0.05)';
                e.currentTarget.style.borderColor = 'rgba(42, 37, 32, 0.3)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = 'rgba(42, 37, 32, 0.01)';
                e.currentTarget.style.borderColor = 'rgba(42, 37, 32, 0.15)';
              }}
            >
              <ChevronLeft size={16} style={{ color: INK }} />
            </button>
            
            {/* Dynamic Slider Pagination Dots */}
            <div className="flex items-center gap-2">
              {Array.from({ length: testimonials.length - visibleCards + 1 }).map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentIndex(index)}
                  className="h-1.5 rounded-full transition-all duration-500 cursor-pointer"
                  style={{ 
                    width: currentIndex === index ? '18px' : '6px',
                    background: currentIndex === index ? SAGE_DARK : 'rgba(42, 37, 32, 0.15)' 
                  }}
                />
              ))}
            </div>

            {/* Right Glassmorphism Arrow Button */}
            <button 
              onClick={handleNextTestimonial}
              className="p-3 rounded-full border transition-all duration-300 group cursor-pointer"
              style={{
                borderColor: 'rgba(42, 37, 32, 0.15)',
                background: 'rgba(42, 37, 32, 0.01)',
                backdropFilter: 'blur(8px)'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = 'rgba(42, 37, 32, 0.05)';
                e.currentTarget.style.borderColor = 'rgba(42, 37, 32, 0.3)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = 'rgba(42, 37, 32, 0.01)';
                e.currentTarget.style.borderColor = 'rgba(42, 37, 32, 0.15)';
              }}
            >
              <ChevronRight size={16} style={{ color: INK }} />
            </button>
          </div>

        </div>
      </section>

      {/* 6. FINAL CTA SECTION — DARK (ORIGINAL VISUAL STYLE PRESERVED) */}
      <section className="relative py-32 lg:py-44 overflow-hidden" style={{ background: DARK_2 }}>
        <div className="absolute inset-0 opacity-[0.07]" style={{ background: 'radial-gradient(circle at 50% 50%, rgba(139,149,121,0.5), transparent 60%)' }} />
        
        <div className="relative max-w-[900px] mx-auto px-8 lg:px-14 text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.9 }}>
            <div className="tracking-[0.42em] uppercase mb-8" style={{ fontSize: '11px', color: SAGE }}>— Final Creed</div>
            
            {/* Main Heading */}
            <h2 className="font-serif mb-12" style={{ fontSize: 'clamp(34px, 4.4vw, 60px)', lineHeight: 1.05, color: CREAM, fontWeight: 300, letterSpacing: '-0.01em' }}>
              REAL FOOD.<br />
              <em style={{ fontStyle: 'italic', color: SAGE }}>REAL CHANGE.</em>
            </h2>

            {/* Action CTA Buttons */}
            <div className="flex flex-wrap justify-center items-center gap-8">
              <Link to="/menu"
                className="inline-block px-9 py-4 tracking-[0.26em] uppercase transition-all duration-300"
                style={{ fontSize: '11px', border: `1px solid ${SAGE}`, color: DARK_2, background: SAGE, borderRadius: '1px' }}
                onMouseEnter={(e) => { e.currentTarget.style.background = CREAM; e.currentTarget.style.borderColor = CREAM; }}
                onMouseLeave={(e) => { e.currentTarget.style.background = SAGE; e.currentTarget.style.borderColor = SAGE; }}>
                Explore Menu
              </Link>
              <Link to="/subscription"
                className="inline-block px-9 py-4 tracking-[0.26em] uppercase transition-all duration-300"
                style={{ fontSize: '11px', border: `1px solid rgba(244,239,230,0.25)`, color: CREAM, background: 'transparent', borderRadius: '1px' }}
                onMouseEnter={(e) => { e.currentTarget.style.background = CREAM; e.currentTarget.style.color = INK; e.currentTarget.style.borderColor = CREAM; }}
                onMouseLeave={(e) => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = CREAM; e.currentTarget.style.borderColor = 'rgba(244,239,230,0.25)'; }}>
                Join Subscription
              </Link>
            </div>

          </motion.div>
        </div>
      </section>
    </>
  );
}
