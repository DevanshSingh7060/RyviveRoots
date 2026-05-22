import { motion } from 'motion/react';
import { Eye, Target, Diamond, Sparkles, ChefHat, Leaf, UtensilsCrossed, HeartPulse, ShieldCheck, Recycle } from 'lucide-react';
import { ImageWithFallback } from '../components/figma/ImageWithFallback';
import { CurtainParallaxShowcase, type CurtainSlide } from '../components/story/CurtainParallaxShowcase';
import StoryHero from '../images/Story-1.JPG';
import ImageBreak from '../images/Landing-3.jpeg';
import BagasseImg from '../images/Landing-4.jpeg';
import Landing1 from '../images/Landing-1.jpeg';
import Landing2 from '../images/Landing-2.jpeg';
import MenuHeader from '../images/Menu-header.JPG';
import { CREAM, DARK, INK, SAGE, SAGE_DARK } from '../theme';

const ease: [number, number, number, number] = [0.22, 1, 0.36, 1];

const promises = [
  { icon: Sparkles, title: 'Pure Hygiene', desc: 'Zero-Compromise Cleanliness. Daily sanitization, strict food-safety checks, and spotless kitchens, your meals are prepared in an environment built on absolute trust.' },
  { icon: ChefHat, title: '100% In-House Craft', desc: 'Everything Made by Us. From spices to dressings to cashew cheese, every element is handcrafted in-house to maintain purity, authenticity, and real flavours.' },
  { icon: Leaf, title: 'Finest Ingredients Only', desc: 'Quality You Can Taste. We use premium, fresh, responsibly sourced ingredients that meet our strict standards, no fillers, no shortcuts, only real nourishment.' },
  { icon: UtensilsCrossed, title: 'Fresh From Scratch', desc: 'No Reheat. No Leftovers. Ever. Every batch is freshly crafted from scratch, never reheated, never reused, so you receive food in its purest, freshest form.' },
  { icon: HeartPulse, title: 'Nutrition With Purpose', desc: 'Designed for Real Wellness. Every meal is scientifically curated with balance, clarity, and intention, supporting sustained energy, gut health, and daily vitality.' },
  { icon: ShieldCheck, title: 'Honest Food', desc: 'Nothing Hidden, Nothing Artificial. No preservatives, no refined sugar, no adulteration, just honest, transparent food the way nature intended.' }
];

const showcaseSlides: CurtainSlide[] = [
  // 1 — SOLID (upper layer image + content)
  {
    image: StoryHero,
    eyebrow: 'Live. Relive. Believe.',
    title: 'Our <em>Story</em>',
    subtitle: 'A return to honest, considered food',
    ctaLabel: 'Read More',
    ctaHref: '#our-philosophy',
    alt: 'Ryvive Roots fresh meal',
  },
  // 2 — TRANSPARENT (fixed lower layer image visible)
  {
    image: Landing1,
    eyebrow: 'Crafted in-house',
    title: 'Made by <em>Hand</em>',
    subtitle: 'Every spice, dressing, and detail',
    ctaLabel: 'Read More',
    ctaHref: '#our-philosophy',
    alt: 'Handcrafted in-house',
  },
  // 3 — SOLID
  {
    image: ImageBreak,
    eyebrow: 'Rooted in nature',
    title: 'Real <em>Ingredients</em>',
    subtitle: 'Premium, responsibly sourced',
    ctaLabel: 'Read More',
    ctaHref: '#our-philosophy',
    alt: 'Roots and nature',
  },
  // 4 — TRANSPARENT
  {
    image: Landing2,
    eyebrow: 'Nutrition with intention',
    title: 'Eat <em>Well</em>',
    subtitle: 'Designed for sustained vitality',
    ctaLabel: 'Read More',
    ctaHref: '#our-philosophy',
    alt: 'Balanced nutrition',
  },
  // 5 — SOLID
  {
    image: MenuHeader,
    eyebrow: 'A refined ritual',
    title: 'Mindful <em>Hospitality</em>',
    subtitle: 'Food that respects you and the planet',
    ctaLabel: 'Read More',
    ctaHref: '#our-philosophy',
    alt: 'Refined dining',
  },
  // 6 — TRANSPARENT
  {
    image: BagasseImg,
    eyebrow: 'Quietly sustainable',
    title: 'Pure <em>Living</em>',
    subtitle: 'Where wellness feels effortless',
    ctaLabel: 'Read More',
    ctaHref: '#our-philosophy',
    alt: 'Sustainable serving',
  },
];

export default function Story() {
  return (
    <div style={{ background: CREAM }} className="min-h-screen">

      {/* CINEMATIC CURTAIN PARALLAX SHOWCASE */}
      <CurtainParallaxShowcase slides={showcaseSlides} />

      {/* OUR PHILOSOPHY - unified Vision/Mission/Values */}
      <section id="our-philosophy" className="px-5 sm:px-8 lg:px-14 py-20 lg:py-32 overflow-hidden" style={{ background: CREAM }}>
        <div className="max-w-[1400px] mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 1.2, ease }}
            className="text-center mb-16 lg:mb-24"
          >
            <h2 className="font-serif" style={{ fontSize: 'clamp(36px, 4.8vw, 56px)', color: INK, fontWeight: 300, marginBottom: '16px' }}>
              Our Philosophy
            </h2>
            <p style={{ fontSize: 'clamp(15px, 1.8vw, 17px)', color: 'rgba(42,37,32,0.68)', lineHeight: 1.7, maxWidth: '700px', margin: '0 auto' }}>
              Guided by a commitment to wellness, purity, and intentional living.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8 lg:gap-12">
            {/* Vision Card */}
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-100px' }}
              transition={{ duration: 0.8, delay: 0, ease }}
              className="flex flex-col text-center"
            >
              <div className="mb-6 w-16 h-16 mx-auto flex items-center justify-center rounded-full border transition-transform duration-700 hover:scale-110" style={{ borderColor: 'rgba(42,37,32,0.06)' }}>
                <Eye size={26} strokeWidth={1.2} color={SAGE_DARK} />
              </div>
              <h3 className="font-serif mb-4" style={{ fontSize: 'clamp(20px, 2.4vw, 26px)', color: INK, fontWeight: 300 }}>
                Vision
              </h3>
              <p style={{ fontSize: 'clamp(14px, 1.7vw, 16px)', color: 'rgba(42,37,32,0.74)', lineHeight: 1.7 }}>
                We believe health should be simple, effortless, and a natural part of daily life. Our aim is to make wholesome, balanced eating accessible so people can feel lighter, clearer, and more in tune with themselves.
              </p>
            </motion.div>

            {/* Mission Card */}
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-100px' }}
              transition={{ duration: 0.8, delay: 0.1, ease }}
              className="flex flex-col text-center"
            >
              <div className="mb-6 w-16 h-16 mx-auto flex items-center justify-center rounded-full border transition-transform duration-700 hover:scale-110" style={{ borderColor: 'rgba(42,37,32,0.06)' }}>
                <Target size={26} strokeWidth={1.2} color={SAGE_DARK} />
              </div>
              <h3 className="font-serif mb-4" style={{ fontSize: 'clamp(20px, 2.4vw, 26px)', color: INK, fontWeight: 300 }}>
                Mission
              </h3>
              <p style={{ fontSize: 'clamp(14px, 1.7vw, 16px)', color: 'rgba(42,37,32,0.74)', lineHeight: 1.7 }}>
                To make healthy eating easy, enjoyable, and accessible for all through mindful preparation, quality ingredients, and balanced nutrition.
              </p>
            </motion.div>

            {/* Values Card */}
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-100px' }}
              transition={{ duration: 0.8, delay: 0.2, ease }}
              className="flex flex-col text-center"
            >
              <div className="mb-6 w-16 h-16 mx-auto flex items-center justify-center rounded-full border transition-transform duration-700 hover:scale-110" style={{ borderColor: 'rgba(42,37,32,0.06)' }}>
                <Diamond size={26} strokeWidth={1.2} color={SAGE_DARK} />
              </div>
              <h3 className="font-serif mb-4" style={{ fontSize: 'clamp(20px, 2.4vw, 26px)', color: INK, fontWeight: 300 }}>
                Values
              </h3>
              <p style={{ fontSize: 'clamp(14px, 1.7vw, 16px)', color: 'rgba(42,37,32,0.74)', lineHeight: 1.7 }}>
                We strive to redefine healthy eating across India by making nutritious, sustainable, wholesome food easy for everyone. We aim to create a future where good health is a lifestyle, not a privilege.
              </p>
            </motion.div>
          </div>
        </div>
      </section>
      {/* OUR STORY (DARK) */}
      <section className="px-5 sm:px-8 lg:px-14 py-20 lg:py-32 overflow-hidden" style={{ background: DARK }}>
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 1.2, ease }}
          className="max-w-[1200px] mx-auto w-full"
        >
          <div className="grid lg:grid-cols-2 gap-10 items-start">
            <div>
              <h2 className="font-serif mb-4" style={{ fontSize: 'clamp(28px, 3.6vw, 44px)', color: CREAM, fontWeight: 300 }}>The Beginning</h2>
              <p className="mb-4" style={{ fontSize: 'clamp(15px, 1.8vw, 17px)', color: 'rgba(244,239,230,0.78)', lineHeight: 1.7 }}>
                Ryvive Roots was born from a simple question: Can food truly nourish us anymore? Everywhere we ate, we found frozen, artificial, and over-processed ingredients that lacked both freshness and purpose. We missed real food—the kind that energizes the body and clears the mind.
              </p>
              <p className="mb-4" style={{ fontSize: 'clamp(15px, 1.8vw, 17px)', color: 'rgba(244,239,230,0.78)', lineHeight: 1.7 }}>
                So we created Ryvive Roots: a place where food is made the way it’s meant to be. Every dish is prepared fresh from scratch, with in-house dressings and zero artificial flavours, colours, or sauces. Just honest ingredients, chosen with intention.
              </p>
              <p style={{ fontSize: 'clamp(15px, 1.8vw, 17px)', color: 'rgba(244,239,230,0.78)', lineHeight: 1.7 }}>
                We believe health is not a trend—it’s a revival. Our menu is designed to support digestion, immunity, brain function, and overall balance, working with your body, not against it. Sustainability matters to us too. That’s why every order is served in eco-friendly sugarcane-based packaging—because true wellness includes caring for the planet.
              </p>
            </div>

            <motion.div className="w-full h-[40vh] md:h-[52vh] overflow-hidden rounded-sm"
              initial={{ scale: 1.02, opacity: 0.96 }} whileInView={{ scale: 1, opacity: 1 }} viewport={{ once: true, margin: '-100px' }} transition={{ duration: 1.6 }}>
              <ImageWithFallback src={ImageBreak} alt="Ryvive Roots Kitchen" className="w-full h-full object-cover object-center" />
            </motion.div>
          </div>
        </motion.div>
      </section>

      {/* WHAT IS RYVIVE ROOTS? (LIGHT) */}
      <section className="px-5 sm:px-8 lg:px-14 py-20 lg:py-32 overflow-hidden" style={{ background: CREAM }}>
        <div className="max-w-[1400px] mx-auto w-full">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 1.2, ease }}
            className="w-full"
          >
            <div className="grid lg:grid-cols-[56%_44%] gap-10 items-center">
              <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: '-100px' }} transition={{ duration: 1.1 }}>
                <h2 className="font-serif mb-6" style={{ fontSize: 'clamp(32px, 4vw, 48px)', color: INK, fontWeight: 300 }}>
                  What is <em style={{ fontStyle: 'italic' }}>Ryvive Roots?</em>
                </h2>
                <p className="mb-5" style={{ fontSize: 'clamp(15px, 1.8vw, 17px)', color: 'rgba(42,37,32,0.74)', lineHeight: 1.8 }}>
                  Ryvive Roots is an invitation to return to what is pure, grounded, and real. Born from a respect for nature and the body’s innate wisdom, every dish is prepared from scratch using clean, carefully chosen ingredients that nourish without excess and restore without force.
                </p>
                <p style={{ fontSize: 'clamp(15px, 1.8vw, 17px)', color: 'rgba(42,37,32,0.74)', lineHeight: 1.8 }}>
                  Free from artificial flavours, preservatives, and shortcuts, our food is designed to move in harmony with your natural rhythm—awakening energy, sustaining balance, and leaving you feeling light, clear, and renewed. We don't chase trends or promise quick fixes; we offer thoughtful nourishment, crafted with care, meant to support a refined way of living where wellness feels effortless and enduring.
                </p>
              </motion.div>
              <motion.div className="w-full h-[40vh] md:h-[52vh] overflow-hidden rounded-sm" initial={{ scale: 1.02 }} whileHover={{ scale: 1.04 }} transition={{ duration: 1.4 }}>
                <ImageWithFallback src={StoryHero} alt="Ryvive Roots" className="w-full h-full object-cover object-center" />
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* SUSTAINABILITY / BAGASSE */}
      <section className="px-5 sm:px-8 lg:px-14 py-20 lg:py-32 overflow-hidden" style={{ background: CREAM }}>
        <div className="max-w-[1400px] mx-auto w-full">
          <div className="grid grid-cols-1 lg:grid-cols-[44%_56%] gap-10 items-center">
            {/* IMAGE - LEFT */}
            <div className="w-full flex items-center justify-center">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-100px' }}
                transition={{ duration: 0.9, ease }}
                className="relative w-full max-w-[640px]"
              >
                <div className="overflow-hidden rounded-md" style={{ borderRadius: '8px', boxShadow: '0 14px 40px -24px rgba(20,17,15,0.06)' }}>
                  <motion.div whileHover={{ scale: 1.02 }} transition={{ duration: 0.6 }}>
                    <ImageWithFallback src={BagasseImg} alt="Bagasse serving" className="w-full h-[48vh] lg:h-[62vh] object-cover object-center" style={{ filter: 'saturate(0.92) contrast(0.98)' }} />
                  </motion.div>
                </div>
              </motion.div>
            </div>

            {/* CONTENT - RIGHT */}
            <div>
              <motion.div
                initial={{ opacity: 0, y: 36 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-100px' }}
                transition={{ duration: 1.05, ease }}
                className="max-w-[760px] ml-auto"
              >
                <p className="mb-4 uppercase tracking-[0.35em]" style={{ fontSize: '11px', color: SAGE_DARK, letterSpacing: '0.35em' }}>
                  Quiet Sustainability
                </p>
                <h2 className="font-serif mb-4" style={{ fontSize: 'clamp(30px, 3.6vw, 44px)', color: INK, fontWeight: 300, lineHeight: 1.04 }}>
                  Bagasse packaging, made to feel as considered as the food itself.
                </h2>
                <p className="mb-8" style={{ fontSize: 'clamp(15px, 1.7vw, 16px)', color: 'rgba(42,37,32,0.72)', lineHeight: 1.75 }}>
                  Our tableware is chosen with the same care as our food — crafted from sugarcane bagasse to be food-safe, compostable, and quietly elegant. This is sustainability designed to belong in a refined hospitality ritual.
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {[
                    { icon: ShieldCheck, title: 'Food Safe', desc: 'Direct-contact safe, crafted for daily dining with a trustworthy finish.' },
                    { icon: Recycle, title: 'Compostable', desc: 'Returns to earth gently — part of a circular hospitality practice.' },
                    { icon: Leaf, title: 'Biodegradable', desc: 'Naturally breaks down, reducing footprint without ceremony.' },
                    { icon: UtensilsCrossed, title: 'Sugarcane Bagasse', desc: 'An agricultural by-product transformed into refined serving pieces.' },
                  ].map((pillar, i) => (
                    <motion.div
                      key={pillar.title}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true, margin: '-100px' }}
                      transition={{ duration: 0.6, delay: i * 0.06, ease }}
                      whileHover={{ y: -6 }}
                      className="group rounded-sm border p-4 lg:p-5"
                      style={{ background: 'rgba(255,255,255,0.22)', borderColor: 'rgba(42,37,32,0.05)', boxShadow: '0 6px 18px -12px rgba(20,17,15,0.03)', transition: 'box-shadow 0.28s ease, border-color 0.28s ease' }}
                    >
                      <div className="flex items-start gap-3">
                        <div className="flex-shrink-0 w-9 h-9 rounded-full flex items-center justify-center" style={{ background: 'rgba(255,255,255,0.34)', border: '1px solid rgba(61,85,60,0.06)' }}>
                          <pillar.icon size={16} strokeWidth={1.25} color={SAGE_DARK} />
                        </div>
                        <div>
                          <div className="font-serif" style={{ fontSize: '15px', color: INK, fontWeight: 300 }}>{pillar.title}</div>
                          <p style={{ fontSize: '13px', color: 'rgba(42,37,32,0.72)', lineHeight: 1.6 }}>{pillar.desc}</p>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* OUR PROMISES GRID (DARK) */}
      <section className="px-5 sm:px-8 lg:px-14 py-20 lg:py-32 overflow-hidden" style={{ background: DARK }}>
        <div className="max-w-[1300px] mx-auto">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 1.2, ease }}
            className="text-center mb-16 lg:mb-24"
          >
            <h2 className="font-serif mb-6" style={{ fontSize: 'clamp(32px, 4vw, 48px)', color: CREAM, fontWeight: 300 }}>
              Our Promises
            </h2>
            <div className="w-12 h-px mx-auto" style={{ background: SAGE }} />
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {promises.map((promise, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-100px' }}
                transition={{ duration: 0.8, delay: i * 0.1, ease }}
                whileHover={{ y: -4 }}
                className="p-6 lg:p-8 rounded-sm border transition-all duration-500 group cursor-default"
                style={{ background: 'rgba(244,239,230,0.02)', borderColor: 'rgba(244,239,230,0.04)' }}
              >
                <div className="mb-6 w-12 h-12 flex items-center justify-center rounded-full border transition-colors duration-500 group-hover:bg-[#14110F]" style={{ borderColor: 'rgba(244,239,230,0.15)' }}>
                  <promise.icon size={20} strokeWidth={1.2} color={SAGE} />
                </div>
                <h3 className="font-serif text-xl mb-3" style={{ color: CREAM, fontWeight: 300 }}>
                  {promise.title}
                </h3>
                <p style={{ fontSize: '14px', color: 'rgba(244,239,230,0.6)', lineHeight: 1.7 }}>
                  {promise.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

    </div>
  );
}
