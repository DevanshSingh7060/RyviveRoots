import { motion } from 'motion/react';
import { Link } from 'react-router';
import { Check } from 'lucide-react';
import heroImage from "@/app/images/Homepage bg.png";
import landing1 from "@/app/images/Landing-1.jpeg";
import landing2 from "@/app/images/Landing-2.jpeg";
import landing3 from "@/app/images/Landing-3.jpeg";
import landing4 from "@/app/images/Landing-4.jpeg";
import story1 from "@/app/images/Story-1.JPG";
import { ImageWithFallback } from '../components/figma/ImageWithFallback';
import { CREAM, CREAM_2, DARK, DARK_2, INK, SAGE, SAGE_DARK } from '../theme';
import { homeSignatureCards } from '../content/menuContent';

export default function Home() {
  return (
    <>
      {/* HERO — DARK */}
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
            <div className="tracking-[0.42em] uppercase mb-10 flex items-center gap-4" style={{ fontSize: '11px', color: SAGE }}>
              <span style={{ width: '36px', height: '1px', background: SAGE, display: 'inline-block' }} />
              A Mumbai Wellness Atelier
            </div>
            <h1 className="font-serif mb-10" style={{ fontSize: 'clamp(42px, 6.2vw, 84px)', lineHeight: 1.04, letterSpacing: '-0.012em', color: CREAM, fontWeight: 300 }}>
              Nourishment,<br />
              <em style={{ fontStyle: 'italic', color: SAGE }}>quietly</em> considered.
            </h1>
            <p className="mb-14 max-w-xl" style={{ fontSize: '15px', lineHeight: 1.85, color: 'rgba(244,239,230,0.65)' }}>
              Honest food crafted from clean, seasonal ingredients — for a slower, more deliberate way of living well.
            </p>
            <div className="flex flex-wrap items-center gap-8">
              <Link to="/menu"
                className="px-8 py-3.5 tracking-[0.22em] uppercase transition-all duration-300"
                style={{ fontSize: '11px', border: `1px solid ${CREAM}`, color: CREAM, borderRadius: '1px' }}
                onMouseEnter={(e) => { e.currentTarget.style.background = CREAM; e.currentTarget.style.color = INK; }}
                onMouseLeave={(e) => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = CREAM; }}>
                Discover the Menu
              </Link>
              <Link to="/subscription" className="tracking-[0.22em] uppercase transition-colors" style={{ fontSize: '11px', color: 'rgba(244,239,230,0.7)' }}>
                Daily Subscription →
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

      {/* INTRO — LIGHT */}
      <section data-tone="light" className="pt-20 pb-12 lg:pt-28 lg:pb-16" style={{ background: CREAM }}>
        <div className="max-w-[1100px] mx-auto px-8 lg:px-14 text-center">
          <motion.div initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.9 }}>
            <div className="tracking-[0.42em] uppercase mb-8" style={{ fontSize: '11px', color: SAGE_DARK }}>— Est. Mumbai</div>
            <h2 className="font-serif mx-auto" style={{ fontSize: 'clamp(28px, 3.4vw, 44px)', lineHeight: 1.4, color: INK, fontWeight: 300, maxWidth: '900px' }}>
              We believe in food that arrives without performance — composed of clean ingredients, prepared the same morning, and served with{' '}
              <em style={{ fontStyle: 'italic', color: SAGE_DARK }}>uncommon care</em>.
            </h2>
          </motion.div>
        </div>
      </section>

      {/* SIGNATURE DISHES — LIGHT */}
      <section data-tone="light" className="pt-12 pb-24 lg:pt-16 lg:pb-32" style={{ background: CREAM }}>
        <div className="max-w-[1400px] mx-auto px-8 lg:px-14">
          <div className="flex items-end justify-between mb-20 flex-wrap gap-8">
            <div>
              <div className="tracking-[0.42em] uppercase mb-6" style={{ fontSize: '11px', color: SAGE_DARK }}>— Signature</div>
              <h2 className="font-serif" style={{ fontSize: 'clamp(34px, 4.2vw, 56px)', lineHeight: 1.05, color: INK, fontWeight: 300, letterSpacing: '-0.01em' }}>
                A few of our<br />
                <em style={{ fontStyle: 'italic' }}>quiet favourites.</em>
              </h2>
            </div>
            <Link to="/menu" className="tracking-[0.22em] uppercase pb-1" style={{ fontSize: '11px', color: INK, borderBottom: `1px solid ${INK}` }}>
              View Full Menu →
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-8">
  {homeSignatureCards.map((item, i) => (
    <motion.div
      key={i}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ delay: i * 0.08, duration: 0.7 }}
      className="group cursor-pointer"
    >
      <div
        className="relative overflow-hidden mb-7"
        style={{ aspectRatio: '3/4' }}
      >
        <ImageWithFallback
          src={[landing1, landing2, landing3, landing4][i]}
          alt={item.imageLabel}
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
        {item.description}
      </p>
    </motion.div>
  ))}
</div>
        </div>
      </section>

      {/* PHILOSOPHY — DARK */}
      <section id="story" className="py-32 lg:py-44" style={{ background: DARK }}>
        <div className="max-w-[1300px] mx-auto px-8 lg:px-14">
          <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-center">
            <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.9 }} className="overflow-hidden" style={{ aspectRatio: '4/5' }}>
              image: story1,
              <ImageWithFallback
                src={story1}
                alt="Carefully plated food"
                className="w-full h-full object-cover"
              />
            </motion.div>

            <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.9, delay: 0.15 }}>
              <div className="tracking-[0.42em] uppercase mb-6" style={{ fontSize: '11px', color: SAGE }}>— Philosophy</div>
              <h2 className="font-serif mb-12" style={{ fontSize: 'clamp(32px, 3.8vw, 50px)', lineHeight: 1.1, color: CREAM, fontWeight: 300 }}>
                Real food.<br />
                <em style={{ fontStyle: 'italic' }}>Real intention.</em>
              </h2>
              <p style={{ fontSize: '15px', color: 'rgba(244,239,230,0.65)', lineHeight: 1.85, marginBottom: '24px', maxWidth: '480px' }}>
                Wellness, we believe, begins quietly — in what you choose to eat, and in the care taken to prepare it. Every plate is sourced from trusted farms across India and made the same morning.
              </p>
              <p style={{ fontSize: '15px', color: 'rgba(244,239,230,0.65)', lineHeight: 1.85, marginBottom: '48px', maxWidth: '480px' }}>
                No shortcuts. No compromises. Only honest nourishment, considered to the last detail.
              </p>

              <div className="grid grid-cols-3 gap-8 mb-12 pt-10" style={{ borderTop: '1px solid rgba(244,239,230,0.15)' }}>
                {[
                  { label: 'Farm Sourced', v: '100', s: '%' },
                  { label: 'Preservatives', v: '00', s: '%' },
                  { label: 'Daily Prep', v: '24', s: 'h' },
                ].map((stat, i) => (
                  <div key={i}>
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

      {/* TESTIMONIALS — LIGHT */}
      <section data-tone="light" className="py-32 lg:py-40" style={{ background: CREAM_2 }}>
        <div className="max-w-[1100px] mx-auto px-8 lg:px-14">
          <div className="text-center mb-20">
            <div className="tracking-[0.42em] uppercase mb-6" style={{ fontSize: '11px', color: SAGE_DARK }}>— Voices</div>
            <h2 className="font-serif" style={{ fontSize: 'clamp(30px, 3.5vw, 46px)', lineHeight: 1.1, color: INK, fontWeight: 300 }}>
              Words from <em style={{ fontStyle: 'italic' }}>our table.</em>
            </h2>
          </div>

          <div className="grid md:grid-cols-2 gap-12 lg:gap-20">
            {[
              { q: 'A quiet alternative to the noise of modern dining. The ingredients speak for themselves — this is what considered wellness looks like.', a: 'The Alok Tamhankar Show', r: 'Mumbai' },
              { q: 'Ryvive Roots has reshaped my mornings. Each meal is an act of care, and the flavours linger for hours.', a: 'Priya Sharma', r: 'Wellness Coach' },
            ].map((t, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.15, duration: 0.8 }}>
                <div className="font-serif mb-8" style={{ fontSize: '22px', lineHeight: 1.6, color: INK, fontWeight: 300, fontStyle: 'italic' }}>“{t.q}”</div>
                <div className="pt-6" style={{ borderTop: '1px solid rgba(42,37,32,0.15)' }}>
                  <div style={{ fontSize: '13px', color: INK, letterSpacing: '0.04em' }}>{t.a}</div>
                  <div className="tracking-[0.22em] uppercase mt-1" style={{ fontSize: '10px', color: 'rgba(42,37,32,0.55)' }}>{t.r}</div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>


      {/* SUBSCRIPTION TEASER — DARK */}
      <section className="relative py-32 lg:py-44 overflow-hidden" style={{ background: DARK_2 }}>
        <div className="absolute inset-0 opacity-[0.07]" style={{ background: 'radial-gradient(circle at 50% 50%, rgba(139,149,121,0.5), transparent 60%)' }} />
        <div className="relative max-w-[900px] mx-auto px-8 lg:px-14 text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.9 }}>
            <div className="tracking-[0.42em] uppercase mb-8" style={{ fontSize: '11px', color: SAGE }}>— Membership</div>
            <h2 className="font-serif mb-10" style={{ fontSize: 'clamp(34px, 4.4vw, 60px)', lineHeight: 1.05, color: CREAM, fontWeight: 300, letterSpacing: '-0.01em' }}>
              A daily ritual,<br />
              <em style={{ fontStyle: 'italic', color: SAGE }}>delivered.</em>
            </h2>
            <p className="mx-auto mb-12" style={{ fontSize: '15px', color: 'rgba(244,239,230,0.65)', lineHeight: 1.85, maxWidth: '520px' }}>
              Chef-curated meals arriving each morning — the most considered way to begin your day. Memberships open by invitation each season.
            </p>
            <Link to="/subscription"
              className="inline-block px-9 py-4 tracking-[0.26em] uppercase transition-all duration-300"
              style={{ fontSize: '11px', border: `1px solid ${SAGE}`, color: DARK_2, background: SAGE, borderRadius: '1px' }}
              onMouseEnter={(e) => { e.currentTarget.style.background = CREAM; e.currentTarget.style.borderColor = CREAM; }}
              onMouseLeave={(e) => { e.currentTarget.style.background = SAGE; e.currentTarget.style.borderColor = SAGE; }}>
              Explore Memberships
            </Link>
          </motion.div>
        </div>
      </section>

      {false && (
      <section className="hidden">
        <div className="absolute inset-0 opacity-[0.08]" style={{ background: 'radial-gradient(circle at 50% 0%, rgba(139,149,121,0.4), transparent 60%)' }} />

        <div className="relative max-w-[1300px] mx-auto px-8 lg:px-14">
          <div className="text-center mb-24 max-w-2xl mx-auto">
            <div className="tracking-[0.42em] uppercase mb-8" style={{ fontSize: '11px', color: SAGE }}>— Membership</div>
            <h2 className="font-serif mb-10" style={{ fontSize: 'clamp(36px, 4.6vw, 64px)', lineHeight: 1.05, color: CREAM, fontWeight: 300, letterSpacing: '-0.01em' }}>
              Eat with intention,<br />
              <em style={{ fontStyle: 'italic', color: SAGE }}>every day.</em>
            </h2>
            <p style={{ fontSize: '15px', color: 'rgba(244,239,230,0.65)', lineHeight: 1.85 }}>
              A private membership delivering chef-curated meals to your home each morning — the most considered way to begin your day.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6 lg:gap-8">
            {[
              { title: 'RYVIVE SILVER', tagline: 'A gentle introduction.', meals: '14 meals weekly', price: '4,999', features: ['Two meals daily', 'Seasonal menu', 'Concierge support'] },
              { title: 'RYVIVE GOLD', tagline: 'Our most chosen plan.', meals: '21 meals weekly', price: '5,999', features: ['Three meals daily', 'Priority chef access', 'Cold-pressed elixirs', 'Personal nutritionist'], featured: true },
              { title: 'RYVIVE PLATINUM', tagline: 'A devoted ritual.', meals: '28 meals weekly', price: '6,999', features: ['Four meals daily', 'Bespoke menu design', 'Private tastings', 'Wellness consultations'] },
            ].map((plan, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 28 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.12, duration: 0.8 }}
                className="relative p-10 lg:p-12 flex flex-col"
                style={{ background: plan.featured ? 'rgba(244,239,230,0.04)' : 'transparent', border: plan.featured ? `1px solid ${SAGE}` : '1px solid rgba(244,239,230,0.12)', borderRadius: '2px' }}>
                {plan.featured && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 tracking-[0.3em] uppercase" style={{ fontSize: '9px', color: DARK_2, background: SAGE }}>
                    Most Chosen
                  </div>
                )}
                <div className="tracking-[0.32em] uppercase mb-5" style={{ fontSize: '10px', color: SAGE }}>Plan 0{i + 1}</div>
                <h3 className="font-serif mb-2" style={{ fontSize: '34px', color: CREAM, fontWeight: 300 }}>{plan.title}</h3>
                <p className="mb-10" style={{ fontSize: '13px', color: 'rgba(244,239,230,0.6)', fontStyle: 'italic' }}>{plan.tagline}</p>

                <div className="pb-8 mb-8" style={{ borderBottom: '1px solid rgba(244,239,230,0.12)' }}>
                  <div className="flex items-baseline gap-2 mb-1">
                    <span style={{ fontSize: '14px', color: 'rgba(244,239,230,0.55)' }}>₹</span>
                    <span className="font-serif" style={{ fontSize: '46px', color: CREAM, fontWeight: 300, letterSpacing: '-0.01em' }}>{plan.price}</span>
                  </div>
                  <div className="tracking-[0.22em] uppercase" style={{ fontSize: '10px', color: 'rgba(244,239,230,0.55)' }}>Per Month · {plan.meals}</div>
                </div>

                <ul className="space-y-4 mb-12 flex-1">
                  {plan.features.map((f) => (
                    <li key={f} className="flex items-start gap-3">
                      <Check className="w-3.5 h-3.5 mt-1 flex-shrink-0" strokeWidth={1.5} style={{ color: SAGE }} />
                      <span style={{ fontSize: '13px', color: 'rgba(244,239,230,0.78)', lineHeight: 1.6 }}>{f}</span>
                    </li>
                  ))}
                </ul>

                <button className="w-full py-3.5 tracking-[0.24em] uppercase transition-all duration-300"
                  style={{ fontSize: '11px', border: `1px solid ${plan.featured ? SAGE : 'rgba(244,239,230,0.25)'}`, color: plan.featured ? DARK_2 : CREAM, background: plan.featured ? SAGE : 'transparent', borderRadius: '1px' }}
                  onMouseEnter={(e) => {
                    if (!plan.featured) { e.currentTarget.style.background = CREAM; e.currentTarget.style.color = INK; }
                    else { e.currentTarget.style.background = CREAM; e.currentTarget.style.borderColor = CREAM; }
                  }}
                  onMouseLeave={(e) => {
                    if (!plan.featured) { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = CREAM; }
                    else { e.currentTarget.style.background = SAGE; e.currentTarget.style.borderColor = SAGE; }
                  }}>
                  Begin Membership
                </button>
              </motion.div>
            ))}
          </div>

          <div className="text-center mt-16 tracking-[0.22em] uppercase" style={{ fontSize: '10px', color: 'rgba(244,239,230,0.5)' }}>
            Pause or cancel anytime · Free first delivery
          </div>
        </div>
      </section>
      )}
    </>
  );
}
