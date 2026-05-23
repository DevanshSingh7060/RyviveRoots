import { useState, type CSSProperties } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Check,
  ArrowRight,
  ArrowLeft,
  ChefHat,
  Truck,
  UtensilsCrossed,
  CreditCard,
  Smartphone,
  Landmark,
  Wallet,
  ChevronDown,
  X,
} from 'lucide-react';
import { ImageWithFallback } from '../components/figma/ImageWithFallback';
import { CREAM, CREAM_2, DARK, DARK_2, INK, SAGE, SAGE_DARK } from '../theme';

const SubscriptionHeader = new URL('../images/Subscription-2.JPG', import.meta.url).href;

type DurationMonths = 1 | 3;

type Plan = {
  key: string;
  name: string;
  tagline: string;
  meals: string;
  prices: Record<DurationMonths, number>;
  features: string[];
  popular?: boolean;
};

const plans: Plan[] = [
  {
    key: 'silver',
    name: 'RYVIVE SILVER',
    tagline: 'A gentle introduction.',
    meals: '14 meals weekly',
    prices: { 1: 4999, 3: 17999 },
    features: ['Two meals daily', 'Seasonal menu', 'Concierge support']
  },
  {
    key: 'gold',
    name: 'RYVIVE GOLD',
    tagline: 'Our most chosen plan.',
    meals: '21 meals weekly',
    prices: { 1: 5999, 3: 20997 },
    popular: true,
    features: ['Three meals daily', 'Priority chef access', 'Cold-pressed elixirs', 'Personal nutritionist']
  },
  {
    key: 'platinum',
    name: 'RYVIVE PLATINUM',
    tagline: 'A devoted ritual.',
    meals: '28 meals weekly',
    prices: { 1: 6999, 3: 23997 },
    features: ['Four meals daily', 'Bespoke menu design', 'Private tastings', 'Wellness consultations']
  },
];

const steps = [
  { n: 1, label: 'Plan Selection' },
  { n: 2, label: 'Your Information' },
  { n: 3, label: 'Delivery Details' },
  { n: 4, label: 'Review' },
  { n: 5, label: 'Payment' },
];

const inputStyle: CSSProperties = {
  width: '100%',
  background: 'transparent',
  border: 'none',
  borderBottom: `1px solid rgba(42,37,32,0.25)`,
  padding: '14px 2px',
  fontSize: '15px',
  color: INK,
  outline: 'none',
  fontFamily: 'inherit',
  transition: 'border-color 0.3s ease',
};

const selectStyle: CSSProperties = {
  ...inputStyle,
  appearance: 'none',
  cursor: 'pointer',
};

const labelStyle: CSSProperties = {
  fontSize: '10px',
  letterSpacing: '0.32em',
  textTransform: 'uppercase',
  color: SAGE_DARK,
  marginBottom: '4px',
  display: 'block',
};

const ease: [number, number, number, number] = [0.22, 1, 0.36, 1];

export default function Subscription() {
  const [step, setStep] = useState(1);
  const [selectedPlan, setSelectedPlan] = useState('gold');
  const [durations, setDurations] = useState<Record<string, DurationMonths>>({
    silver: 1,
    gold: 1,
    platinum: 1,
  });

  const [info, setInfo] = useState({
    firstName: '',
    lastName: '',
    phone: '',
    email: '',
    dob: '',
    allergies: '',
    conditions: ''
  });

  const [delivery, setDelivery] = useState({
    pincode: '',
    house: '',
    street: '',
    landmark: '',
    morningSlot: '',
    eveningSlot: ''
  });

  const [agreed, setAgreed] = useState(false);

  const current = plans.find((p) => p.key === selectedPlan)!;
  const currentDuration = durations[selectedPlan] ?? 1;
  const currentPrice = current.prices[currentDuration];

  const next = () => setStep((s) => Math.min(5, s + 1));
  const back = () => setStep((s) => Math.max(1, s - 1));

  const isContinueDisabled = (step === 5 && !agreed) || (step === 3 && !delivery.morningSlot && !delivery.eveningSlot);

  return (
    <div style={{ background: CREAM }} className="min-h-screen">
      {/* HERO — DARK with overlay image */}
      <section className="relative min-h-[68vh] flex items-center overflow-hidden" style={{ background: DARK }}>
        <div className="absolute inset-0">
          <ImageWithFallback
            src={SubscriptionHeader}
            alt="Subscription Header"
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              objectPosition: 'center',
            }}
          />
          <div className="absolute inset-0" style={{ background: 'linear-gradient(180deg, rgba(20,17,15,0.55) 0%, rgba(20,17,15,0.55) 50%, rgba(20,17,15,0.96) 100%)' }} />
        </div>
        <div className="relative z-10 max-w-[1400px] mx-auto px-5 sm:px-8 lg:px-14 w-full pt-32 lg:pt-40 pb-16 lg:pb-24 text-center">
          <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1, ease }}>
            <div className="tracking-[0.42em] uppercase mb-8" style={{ fontSize: '10px', color: SAGE }}>— Membership</div>
            <h1 className="font-serif mx-auto" style={{ fontSize: 'clamp(40px, 6.4vw, 86px)', lineHeight: 1.02, color: CREAM, fontWeight: 300, letterSpacing: '-0.015em', maxWidth: '900px' }}>
              A daily ritual,<br />
              <em style={{ fontStyle: 'italic', color: SAGE }}>delivered.</em>
            </h1>
            <p className="mx-auto mt-8" style={{ fontSize: '15px', lineHeight: 1.85, color: 'rgba(244,239,230,0.7)', maxWidth: '520px' }}>
              Choose the nourishment plan that fits your lifestyle.
            </p>
          </motion.div>
        </div>
      </section>

      {/* MAIN SPLIT */}
      <section data-tone="light" className="px-5 sm:px-8 lg:px-14 pt-10 lg:pt-16 pb-20 lg:pb-32">
        <div className="max-w-[1520px] mx-auto grid lg:grid-cols-[minmax(240px,29%)_minmax(0,71%)] gap-4 lg:gap-5 xl:gap-6">
          {/* LEFT — vertical step rail (mobile + desktop) */}
          <aside className="relative w-full mb-8 lg:sticky lg:top-[100px] self-start">
            <div
              className="px-3 py-2 lg:p-8"
              style={{
                background: 'rgba(244,239,230,0.94)',
                backdropFilter: 'blur(14px)',
                borderBottom: '1px solid rgba(42,37,32,0.08)',
                borderRadius: window.innerWidth >= 1024 ? '2px' : '18px',
              }}
            >
              <div className="tracking-[0.42em] uppercase mb-8" style={{ fontSize: '10px', color: SAGE_DARK }}>— Your Journey</div>
              <ol className="flex items-center justify-between lg:block lg:space-y-7">
                {steps.map((s) => {
                  const isDone = step > s.n;
                  const isActive = step === s.n;

                  return (
                    <li
                      key={s.n}
                      className="flex flex-col items-center text-center lg:flex-row lg:text-left gap-1 lg:gap-5 flex-1"
                    >
                      <motion.div
                        animate={{ scale: isActive ? 1.05 : 1 }}
                        transition={{ duration: 0.4 }}
                        className="flex-shrink-0 flex items-center justify-center font-serif"
                        style={{
                          width: window.innerWidth >= 1024 ? '40px' : '28px',
                          height: window.innerWidth >= 1024 ? '40px' : '28px',
                          borderRadius: '50%',
                          border: `1px solid ${isDone || isActive ? INK : 'rgba(42,37,32,0.18)'}`,
                          background: isDone || isActive ? INK : 'transparent',
                          color: isDone || isActive ? CREAM : 'rgba(42,37,32,0.55)',
                          fontSize: window.innerWidth >= 1024 ? '14px' : '10px',
                        }}
                      >
                        {isDone ? <Check size={16} strokeWidth={1.5} /> : s.n}
                      </motion.div>
                      <div>
                        <div>
                          <div
                            className="hidden lg:block tracking-[0.22em] uppercase"
                            style={{
                              fontSize: '10px',
                              color: isActive ? INK : 'rgba(42,37,32,0.45)',
                            }}
                          >
                            Step {s.n}
                          </div>

                          <div
                            className="hidden lg:block"
                            style={{
                              fontSize: '14px',
                              color: isActive ? INK : 'rgba(42,37,32,0.55)',
                              marginTop: '4px',
                            }}
                          >
                            {s.label}
                          </div>

                          {isActive && (
                            <motion.div
                              layoutId="step-pulse"
                              className="mt-1.5 hidden lg:block"
                              style={{
                                width: '24px',
                                height: '1px',
                                background: SAGE_DARK,
                              }}
                            />
                          )}
                        </div>
                      </div>
                    </li>
                  );
                })}
              </ol>

              <div className="font-serif mt-10" style={{ fontSize: '24px', color: INK, fontWeight: 300 }}>{current.name}</div>
              <div style={{ fontSize: '12px', color: 'rgba(42,37,32,0.6)', marginTop: '4px' }}>
                ₹{currentPrice.toLocaleString('en-IN')} / {currentDuration === 1 ? 'month' : '3 months'}
              </div>
            </div>
          </aside>

          {/* RIGHT — main panel */}
          <main className="min-h-[460px]">
            <AnimatePresence mode="wait">
              <motion.div
                key={step}
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -16 }}
                transition={{ duration: 0.55, ease }}
              >
                {step === 1 && <PlanStep selectedPlan={selectedPlan} setSelectedPlan={setSelectedPlan} durations={durations} setDurations={setDurations} />}
                {step === 2 && <InfoStep info={info} setInfo={setInfo} />}
                {step === 3 && <DeliveryStep delivery={delivery} setDelivery={setDelivery} />}
                {step === 4 && <ReviewStep plan={current} durationMonths={currentDuration} info={info} delivery={delivery} />}
                {step === 5 && <PaymentStep plan={current} durationMonths={currentDuration} agreed={agreed} setAgreed={setAgreed} />}
              </motion.div>
            </AnimatePresence>

            {/* NAV */}
            <div className="mt-12 lg:mt-16 flex items-center justify-between gap-4">
              <motion.button
                whileTap={{ scale: 0.97 }}
                onClick={back}
                disabled={step === 1}
                className="flex items-center gap-3 px-5 py-3.5 tracking-[0.22em] uppercase transition-all duration-300"
                style={{
                  fontSize: '11px',
                  color: step === 1 ? 'rgba(42,37,32,0.3)' : INK,
                  border: `1px solid ${step === 1 ? 'rgba(42,37,32,0.15)' : 'rgba(42,37,32,0.4)'}`,
                  background: 'transparent',
                  borderRadius: '1px',
                  cursor: step === 1 ? 'not-allowed' : 'pointer',
                }}
              >
                <ArrowLeft size={14} strokeWidth={1.4} /> Back
              </motion.button>

              <motion.button
                whileTap={{ scale: isContinueDisabled ? 1 : 0.97 }}
                whileHover={{ scale: isContinueDisabled ? 1 : 1.02 }}
                onClick={step === 5 ? () => alert('Subscription confirmed') : next}
                disabled={isContinueDisabled}
                className="flex items-center gap-3 px-7 sm:px-9 py-3.5 tracking-[0.22em] uppercase transition-all duration-300"
                style={{
                  fontSize: '11px',
                  background: isContinueDisabled ? 'rgba(42,37,32,0.5)' : INK,
                  color: CREAM,
                  border: `1px solid ${isContinueDisabled ? 'rgba(42,37,32,0)' : INK}`,
                  borderRadius: '1px',
                  cursor: isContinueDisabled ? 'not-allowed' : 'pointer'
                }}
              >
                {step === 5 ? 'Confirm Subscription' : 'Continue'} <ArrowRight size={14} strokeWidth={1.4} />
              </motion.button>
            </div>
          </main>
        </div>
      </section>

      <section
        className="px-8 lg:px-14 py-20 lg:py-24 relative overflow-hidden"
        style={{
          background: CREAM,
        }}
        data-tone="light"
      >
        <div aria-hidden style={{ position: 'absolute', inset: 0, pointerEvents: 'none' }}>
          <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(180deg, rgba(28,24,20,0.03) 0%, rgba(28,24,20,0.01) 30%, rgba(28,24,20,0.05) 100%)' }} />
          <div style={{ position: 'absolute', left: '-10%', top: '-6%', width: '34%', height: '64%', background: 'radial-gradient(closest-side, rgba(139,149,121,0.10), transparent 60%)', filter: 'blur(56px)', opacity: 0.8 }} />
          <div style={{ position: 'absolute', right: '-10%', bottom: '-10%', width: '34%', height: '64%', background: 'radial-gradient(closest-side, rgba(28,24,20,0.07), transparent 62%)', filter: 'blur(56px)', opacity: 0.75 }} />
        </div>

        <div className="max-w-[1400px] mx-auto relative z-10">
          <div className="text-center mb-14 lg:mb-16">
            <p
              className="uppercase tracking-[0.28em] mb-4"
              style={{
                color: SAGE_DARK,
                fontSize: '11px',
              }}
            >
              How It Works
            </p>

            <h2
              className="font-serif mx-auto"
              style={{
                color: INK,
                fontSize: 'clamp(34px, 4.8vw, 58px)',
                lineHeight: '0.96',
                fontWeight: 300,
                maxWidth: '900px',
              }}
            >
              Simple steps to eat
              <br />
              better every day
            </h2>
          </div>

          <div className="relative">
            <div
              className="hidden lg:block absolute left-[10%] right-[10%] top-10 h-px"
              style={{ background: 'linear-gradient(90deg, transparent 0%, rgba(28,24,20,0.14) 14%, rgba(107,117,96,0.24) 50%, rgba(28,24,20,0.14) 86%, transparent 100%)' }}
            />
            <div className="hidden lg:flex absolute left-[13%] right-[13%] top-[34px] items-center justify-between pointer-events-none">
              <span style={{ width: '10px', height: '10px', borderRadius: '999px', background: SAGE, opacity: 0.42 }} />
              <span style={{ width: '10px', height: '10px', borderRadius: '999px', background: SAGE_DARK, opacity: 0.42 }} />
              <span style={{ width: '10px', height: '10px', borderRadius: '999px', background: SAGE, opacity: 0.42 }} />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8 pt-4">
              {[
                {
                  number: '01',
                  title: 'Choose Your Plan',
                  desc: 'Select from Silver, Gold, or Platinum nourishment rituals curated for your lifestyle.',
                  icon: ChefHat,
                },
                {
                  number: '02',
                  title: 'Schedule Delivery',
                  desc: 'Choose your preferred delivery cadence for effortless morning or evening nourishment.',
                  icon: Truck,
                },
                {
                  number: '03',
                  title: 'Receive Daily',
                  desc: 'Freshly prepared wellness meals arrive daily with seamless concierge-style delivery.',
                  icon: UtensilsCrossed,
                },
              ].map((item, index) => {
                const Icon = item.icon;

                return (
                  <motion.div
                    key={index}
                    whileHover={{ y: -8, scale: 1.02 }}
                    whileTap={{ y: -4, scale: 1.015 }}
                    transition={{ duration: 0.5, ease }}
                    className="relative overflow-hidden"
                    style={{
                      minHeight: '300px',
                      padding: '24px 22px 22px',
                      borderRadius: '14px',
                      background: 'rgba(248,244,237,0.96)',
                      border: '1px solid rgba(28,24,20,0.10)',
                      boxShadow: '0 18px 34px -26px rgba(28,24,20,0.24), 0 0 0 1px rgba(255,255,255,0.4) inset',
                      backdropFilter: 'blur(8px)',
                      transitionProperty: 'transform, box-shadow, border-color',
                    }}
                  >
                    <div aria-hidden style={{ position: 'absolute', inset: 0, pointerEvents: 'none' }}>
                      <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(180deg, rgba(255,255,255,0.38) 0%, rgba(255,255,255,0.06) 28%, rgba(28,24,20,0.02) 100%)' }} />
                      <div style={{ position: 'absolute', right: '-12%', top: '-18%', width: '58%', height: '72%', background: 'radial-gradient(closest-side, rgba(139,149,121,0.13), transparent 68%)', filter: 'blur(26px)', opacity: 0.7 }} />
                    </div>

                    <div className="relative z-10 flex h-full flex-col">
                      <div className="flex items-start justify-between gap-4 mb-7">
                        <div>
                          <div
                            className="font-serif"
                            style={{
                              fontSize: 'clamp(42px, 5.8vw, 72px)',
                              lineHeight: 0.9,
                              color: SAGE_DARK,
                              opacity: 0.18,
                              letterSpacing: '-0.04em',
                            }}
                          >
                            {item.number}
                          </div>
                          <div
                            className="mt-4"
                            style={{
                              width: '48px',
                              height: '1px',
                              background: `linear-gradient(90deg, ${SAGE} 0%, ${SAGE_DARK} 100%)`,
                              opacity: 0.6,
                            }}
                          />
                        </div>

                        <div
                          className="flex items-center justify-center"
                          style={{
                            width: '54px',
                            height: '54px',
                            borderRadius: '999px',
                            background: 'rgba(28,24,20,0.035)',
                            border: '1px solid rgba(28,24,20,0.08)',
                          }}
                        >
                          <Icon size={21} strokeWidth={1.35} color={SAGE_DARK} />
                        </div>
                      </div>

                      <h3
                        className="font-serif"
                        style={{
                          color: INK,
                          fontSize: 'clamp(22px, 2.6vw, 30px)',
                          lineHeight: 1.08,
                          marginBottom: '12px',
                          fontWeight: 300,
                        }}
                      >
                        {item.title}
                      </h3>

                      <p
                        style={{
                          color: 'rgba(28,24,20,0.74)',
                          fontSize: '15px',
                          lineHeight: 1.8,
                          marginBottom: '22px',
                          maxWidth: '27ch',
                        }}
                      >
                        {item.desc}
                      </p>

                      <div className="mt-auto flex items-center justify-between gap-4 pt-5" style={{ borderTop: '1px solid rgba(28,24,20,0.08)' }}>
                        <div style={{ fontSize: '10px', letterSpacing: '0.3em', textTransform: 'uppercase', color: 'rgba(28,24,20,0.52)' }}>
                          
                        </div>
                        <div style={{ width: '32px', height: '1px', background: 'rgba(28,24,20,0.22)' }} />
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* CLOSING */}
      <section className="py-16 lg:py-24 text-center" style={{ background: DARK_2 }}>
        <div className="max-w-[680px] mx-auto px-6">
          <p style={{ fontSize: '13px', color: 'rgba(244,239,230,0.55)', lineHeight: 1.85, letterSpacing: '0.04em' }}>
            Pause or cancel any cycle. Memberships renew quietly each month — no contracts, only care.
          </p>
        </div>
      </section>
    </div>
  );
}

/* — Step 1 — */
function PlanStep({
  selectedPlan,
  setSelectedPlan,
  durations,
  setDurations,
}: {
  selectedPlan: string;
  setSelectedPlan: (k: string) => void;
  durations: Record<string, DurationMonths>;
  setDurations: (d: Record<string, DurationMonths>) => void;
}) {
  const durationOptions: DurationMonths[] = [1, 3];

  const updateDuration = (planKey: string, duration: DurationMonths) => {
    setSelectedPlan(planKey);
    setDurations({
      ...durations,
      [planKey]: duration,
    });
  };

  return (
    <div>
      <h2 className="font-serif mb-3" style={{ fontSize: 'clamp(28px, 3.4vw, 40px)', color: INK, fontWeight: 300, lineHeight: 1.1, letterSpacing: '-0.01em' }}>
        Select your <em style={{ fontStyle: 'italic' }}>plan.</em>
      </h2>
      <p className="mb-10" style={{ fontSize: '14px', color: 'rgba(42,37,32,0.65)', lineHeight: 1.8 }}>
        Choose the nourishment plan that fits your lifestyle.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3.5 lg:gap-4 xl:gap-5 pt-4 lg:pt-5">
        {plans.map((p, i) => {
          const isSel = selectedPlan === p.key;
          const duration = durations[p.key] ?? 1;
          const price = p.prices[duration];

          return (
            <motion.div
              key={p.key}
              initial={{ opacity: 0, y: 20 }}
              animate={{
                opacity: 1,
                y: isSel ? -8 : 0,
                scale: isSel ? 1.03 : 1,
              }}
              transition={{ delay: i * 0.08, duration: 0.55, ease }}
              whileHover={!isSel ? { y: -4, scale: 1.02 } : undefined}
              className="relative p-[22px] lg:p-[26px] text-left flex flex-col min-h-[418px]"
              style={{
                background: isSel ? INK : CREAM_2,
                color: isSel ? CREAM : INK,
                border: `1.5px solid ${isSel ? SAGE : (p.popular ? SAGE_DARK : 'rgba(42,37,32,0.1)')}`,
                borderRadius: '3px',
                boxShadow: isSel
                  ? '0 30px 60px -20px rgba(42,37,32,0.3), 0 0 0 4px rgba(139,149,121,0.15)'
                  : '0 4px 20px -8px rgba(42,37,32,0.06)',
                transformOrigin: 'center bottom',
              }}
            >
              {p.popular && (
                <div className="absolute -top-3.5 left-8 px-4 py-1.5 tracking-[0.3em] uppercase z-10"
                  style={{ fontSize: '9px', background: SAGE, color: DARK_2, borderRadius: '2px', fontWeight: 500 }}>
                  Most Popular
                </div>
              )}
              <div className="tracking-[0.35em] uppercase mb-5" style={{ fontSize: '10px', color: isSel ? SAGE : SAGE_DARK }}>
                Plan
              </div>
              <div className="font-serif mb-2" style={{ fontSize: '32px', fontWeight: 300, lineHeight: 1.1 }}>{p.name}</div>
              <div style={{ fontSize: '14px', color: isSel ? 'rgba(244,239,230,0.7)' : 'rgba(42,37,32,0.6)', fontStyle: 'italic', marginBottom: '20px' }}>
                {p.tagline}
              </div>

              <div className="pb-5 mb-5" style={{ borderBottom: `1px solid ${isSel ? 'rgba(244,239,230,0.15)' : 'rgba(42,37,32,0.12)'}` }}>
                <div
                  className="mb-3.5 inline-flex rounded-full p-1 border relative overflow-hidden"
                  style={{
                    borderColor: isSel ? 'rgba(244,239,230,0.14)' : 'rgba(42,37,32,0.12)',
                    background: isSel ? 'rgba(244,239,230,0.05)' : 'rgba(255,255,255,0.38)',
                    boxShadow: isSel ? 'inset 0 0 0 1px rgba(139,149,121,0.12)' : 'none',
                  }}
                >
                  <motion.div
                    layoutId={`duration-pill-${p.key}`}
                    transition={{ duration: 0.35, ease }}
                    className="absolute top-1 bottom-1 rounded-full"
                    style={{
                      left: duration === 1 ? '4px' : 'calc(50% + 4px)',
                      width: 'calc(50% - 8px)',
                      background: isSel ? CREAM : 'rgba(42,37,32,0.06)',
                      boxShadow: '0 8px 20px -18px rgba(42,37,32,0.22)',
                    }}
                  />
                  {durationOptions.map((months) => {
                    const active = duration === months;
                    return (
                      <button
                        key={months}
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          updateDuration(p.key, months);
                        }}
                        className="relative z-10 tracking-[0.22em] uppercase transition-all duration-300 flex-1 text-center"
                        style={{
                          fontSize: 'clamp(9px, 1.6vw, 11px)',
                          padding: '8px 10px',
                          borderRadius: '999px',
                          color: active ? (isSel ? DARK_2 : INK) : (isSel ? 'rgba(244,239,230,0.72)' : 'rgba(42,37,32,0.56)'),
                          background: 'transparent',
                          boxShadow: 'none',
                        }}
                      >
                        {months === 1 ? '1 Month' : '3 Months'}
                      </button>
                    );
                  })}
                </div>

                <AnimatePresence mode="wait" initial={false}>
                  <motion.div
                    key={`${p.key}-${duration}`}
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -8 }}
                    transition={{ duration: 0.28, ease }}
                  >
                    <div className="flex items-baseline gap-2">
                      <span style={{ fontSize: '14px', opacity: 0.55 }}>₹</span>
                      <span className="font-serif" style={{ fontSize: '42px', fontWeight: 300, letterSpacing: '-0.02em', lineHeight: 1 }}>
                        {price.toLocaleString('en-IN')}
                      </span>
                    </div>
                    <div className="tracking-[0.24em] uppercase mt-3" style={{ fontSize: '11px', opacity: 0.65 }}>
                      / {duration === 1 ? 'month' : '3 months'} · {p.meals}
                    </div>
                  </motion.div>
                </AnimatePresence>
              </div>

              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-2.5 mb-6 flex-1">
                {p.features.map((f) => (
                  <li key={f} className="flex items-start gap-3" style={{ fontSize: '14px', lineHeight: 1.5, opacity: 0.9 }}>
                    <Check size={16} strokeWidth={1.5} style={{ color: isSel ? SAGE : SAGE_DARK, marginTop: '2px', flexShrink: 0 }} />
                    {f}
                  </li>
                ))}
              </ul>

              <motion.button
                type="button"
                onClick={() => setSelectedPlan(p.key)}
                whileTap={{ scale: 0.96 }}
                className="tracking-[0.28em] uppercase text-center py-4 transition-all w-full"
                style={{
                  fontSize: '11px',
                  background: isSel ? SAGE : 'transparent',
                  color: isSel ? DARK_2 : INK,
                  border: `1px solid ${isSel ? SAGE : 'rgba(42,37,32,0.4)'}`,
                  borderRadius: '2px',
                }}
              >
                {isSel ? 'Selected' : 'Select Plan'}
              </motion.button>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}

/* — Step 2 — */
function InfoStep({ info, setInfo }: { info: any; setInfo: (i: any) => void }) {
  const onFocus = (e: React.FocusEvent<HTMLElement>) => { e.currentTarget.style.borderBottomColor = SAGE_DARK; };
  const onBlur = (e: React.FocusEvent<HTMLElement>) => { e.currentTarget.style.borderBottomColor = 'rgba(42,37,32,0.25)'; };

  return (
    <div>
      <h2 className="font-serif mb-3" style={{ fontSize: 'clamp(28px, 3.4vw, 40px)', color: INK, fontWeight: 300, lineHeight: 1.1 }}>
        Your <em style={{ fontStyle: 'italic' }}>information.</em>
      </h2>
      <p className="mb-10" style={{ fontSize: '14px', color: 'rgba(42,37,32,0.65)', lineHeight: 1.8 }}>
        So we know who to take care of.
      </p>
      <div className="grid sm:grid-cols-2 gap-x-10 gap-y-8">
        <div>
          <label style={labelStyle}>First Name</label>
          <input value={info.firstName} onChange={(e) => setInfo({ ...info, firstName: e.target.value })} style={inputStyle} onFocus={onFocus} onBlur={onBlur} />
        </div>
        <div>
          <label style={labelStyle}>Last Name</label>
          <input value={info.lastName} onChange={(e) => setInfo({ ...info, lastName: e.target.value })} style={inputStyle} onFocus={onFocus} onBlur={onBlur} />
        </div>
        <div>
          <label style={labelStyle}>Phone Number</label>
          <input type="tel" value={info.phone} onChange={(e) => setInfo({ ...info, phone: e.target.value })} style={inputStyle} onFocus={onFocus} onBlur={onBlur} />
        </div>
        <div>
          <label style={labelStyle}>Email ID</label>
          <input type="email" value={info.email} onChange={(e) => setInfo({ ...info, email: e.target.value })} style={inputStyle} onFocus={onFocus} onBlur={onBlur} />
        </div>
        <div>
          <label style={labelStyle}>Date of Birth</label>
          <input type="date" value={info.dob} onChange={(e) => setInfo({ ...info, dob: e.target.value })} style={{ ...inputStyle, color: info.dob ? INK : 'rgba(42,37,32,0.5)' }} onFocus={onFocus} onBlur={onBlur} />
        </div>
        <div>
          <label style={labelStyle}>Allergies (If any)</label>
          <input value={info.allergies} onChange={(e) => setInfo({ ...info, allergies: e.target.value })} placeholder="e.g. Peanuts, Dairy" style={inputStyle} onFocus={onFocus} onBlur={onBlur} />
        </div>
        <div className="sm:col-span-2">
          <label style={labelStyle}>Medical Conditions</label>
          <textarea rows={3} value={info.conditions} onChange={(e) => setInfo({ ...info, conditions: e.target.value })} placeholder="Please mention any medical conditions we should be aware of..." style={{ ...inputStyle, resize: 'none', paddingTop: '10px' }} onFocus={onFocus} onBlur={onBlur} />
        </div>
      </div>
    </div>
  );
}

function CustomSelect({ value, onChange, options, placeholder, disabled }: { value: string; onChange: (v: string) => void; options: { label: string; value: string }[]; placeholder: string; disabled: boolean; }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="relative w-full" style={{ opacity: disabled ? 0.4 : 1 }}>
      <button
        type="button"
        disabled={disabled}
        onClick={() => setOpen(!open)}
        className="w-full text-left flex items-center justify-between transition-colors"
        style={{
          ...inputStyle,
          borderBottomColor: open ? SAGE_DARK : 'rgba(42,37,32,0.25)',
          cursor: disabled ? 'not-allowed' : 'pointer',
        }}
      >
        <span style={{ color: value ? INK : 'rgba(42,37,32,0.5)' }}>
          {value ? options.find(o => o.value === value)?.label : placeholder}
        </span>

        <div className="flex items-center gap-2">
          {value && !disabled && (
            <div
              onClick={(e) => { e.stopPropagation(); onChange(''); }}
              className="p-1 rounded-full hover:bg-black/5 transition-colors"
            >
              <X size={14} color="rgba(42,37,32,0.5)" />
            </div>
          )}
          <motion.div animate={{ rotate: open ? 180 : 0 }} transition={{ duration: 0.3, ease }}>
            <ChevronDown size={16} color="rgba(42,37,32,0.5)" />
          </motion.div>
        </div>
      </button>

      <AnimatePresence>
        {open && !disabled && (
          <>
            <div className="fixed inset-0 z-40" onClick={() => setOpen(false)} />
            <motion.div
              initial={{ opacity: 0, y: -4 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -4 }}
              transition={{ duration: 0.3, ease }}
              className="absolute left-0 right-0 z-50 mt-1 py-1 rounded-[2px] overflow-hidden"
              style={{
                background: CREAM_2,
                border: '1px solid rgba(42,37,32,0.08)',
                boxShadow: '0 10px 30px -10px rgba(42,37,32,0.15)',
              }}
            >
              {options.map((opt) => {
                const isSel = value === opt.value;
                return (
                  <button
                    key={opt.value}
                    type="button"
                    onClick={() => { onChange(opt.value); setOpen(false); }}
                    className="w-full text-left px-4 py-3 flex items-center justify-between transition-colors duration-200 hover:bg-[#f2efe9]"
                    style={{ background: isSel ? 'rgba(42,37,32,0.04)' : 'transparent' }}
                  >
                    <span style={{ fontSize: '14px', color: isSel ? INK : 'rgba(42,37,32,0.85)', fontWeight: isSel ? 400 : 300 }}>
                      {opt.label}
                    </span>
                    {isSel && <Check size={14} color={SAGE_DARK} />}
                  </button>
                )
              })}
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  )
}

/* — Step 3 — */
function DeliveryStep({ delivery, setDelivery }: { delivery: any; setDelivery: (d: any) => void }) {
  const onFocus = (e: React.FocusEvent<HTMLElement>) => { e.currentTarget.style.borderBottomColor = SAGE_DARK; };
  const onBlur = (e: React.FocusEvent<HTMLElement>) => { e.currentTarget.style.borderBottomColor = 'rgba(42,37,32,0.25)'; };

  return (
    <div>
      <h2 className="font-serif mb-3" style={{ fontSize: 'clamp(28px, 3.4vw, 40px)', color: INK, fontWeight: 300, lineHeight: 1.1 }}>
        Delivery <em style={{ fontStyle: 'italic' }}>details.</em>
      </h2>
      <p className="mb-10" style={{ fontSize: '14px', color: 'rgba(42,37,32,0.65)', lineHeight: 1.8 }}>
        Where and when shall we send your daily ritual?
      </p>
      <div className="grid sm:grid-cols-2 gap-x-10 gap-y-8">
        <div>
          <label style={labelStyle}>Pincode</label>
          <input value={delivery.pincode} onChange={(e) => setDelivery({ ...delivery, pincode: e.target.value })} style={inputStyle} onFocus={onFocus} onBlur={onBlur} />
        </div>
        <div>
          <label style={labelStyle}>House / Flat No.</label>
          <input value={delivery.house} onChange={(e) => setDelivery({ ...delivery, house: e.target.value })} style={inputStyle} onFocus={onFocus} onBlur={onBlur} />
        </div>
        <div>
          <label style={labelStyle}>Street / Area</label>
          <input value={delivery.street} onChange={(e) => setDelivery({ ...delivery, street: e.target.value })} style={inputStyle} onFocus={onFocus} onBlur={onBlur} />
        </div>
        <div>
          <label style={labelStyle}>Landmark (Optional)</label>
          <input value={delivery.landmark} onChange={(e) => setDelivery({ ...delivery, landmark: e.target.value })} style={inputStyle} onFocus={onFocus} onBlur={onBlur} />
        </div>
        <div>
          <label style={labelStyle}>Morning Delivery Slot</label>
          <CustomSelect
            value={delivery.morningSlot}
            onChange={(val) => setDelivery({ ...delivery, morningSlot: val })}
            options={[
              { value: '08-09 AM', label: '08:00 AM - 09:00 AM' },
              { value: '09-10 AM', label: '09:00 AM - 10:00 AM' },
              { value: '10-11 AM', label: '10:00 AM - 11:00 AM' }
            ]}
            placeholder="Select morning slot"
            disabled={!!delivery.eveningSlot}
          />
        </div>
        <div>
          <label style={labelStyle}>Evening Delivery Slot</label>
          <CustomSelect
            value={delivery.eveningSlot}
            onChange={(val) => setDelivery({ ...delivery, eveningSlot: val })}
            options={[
              { value: '05-06 PM', label: '05:00 PM - 06:00 PM' },
              { value: '06-07 PM', label: '06:00 PM - 07:00 PM' },
              { value: '07-08 PM', label: '07:00 PM - 08:00 PM' },
              { value: '08-09 PM', label: '08:00 PM - 09:00 PM' }
            ]}
            placeholder="Select evening slot"
            disabled={!!delivery.morningSlot}
          />
        </div>

        {(!delivery.morningSlot && !delivery.eveningSlot) && (
          <div className="sm:col-span-2 pt-2">
            <span style={{ fontSize: '13px', color: '#c46955', opacity: 0.9 }}>* Please select either a morning or evening delivery slot to proceed.</span>
          </div>
        )}
      </div>
    </div>
  );
}

const reviewPlanDetails: Record<string, { desc: string; included: string[]; categories: string[]; tagline: string; name: string }> = {
  silver: {
    name: 'RYVIVE SILVER',
    tagline: 'Gentle beginnings to a nourished life.',
    desc: 'Ryvive Essentials is thoughtfully designed for those taking their first intentional steps toward better eating. With balanced, wholesome meals made from fresh ingredients, this plan offers a simple yet effective foundation for healthier habits.',
    included: [
      'Two balanced meals daily with seasonal ingredients',
      'Carefully curated weekly menu',
      'Basic concierge support',
      'Focus on gut health and sustained energy',
      'Nourishing staples made with care'
    ],
    categories: [
      'Signature Detox Collection',
      'Fruit & Vegetable Elixirs',
      'Wellness Blends'
    ]
  },
  gold: {
    name: 'RYVIVE GOLD',
    tagline: 'Harmony in every meal.',
    desc: 'Ryvive Balance is our most chosen plan — crafted for those who seek consistency, vitality, and balance in their daily nourishment. It delivers the perfect equilibrium of flavor, nutrition, and convenience for a purposeful lifestyle.',
    included: [
      'Three complete meals daily',
      'Priority chef access and customizations',
      'Cold-pressed elixirs and functional juices',
      'Personal nutritionist guidance',
      'Weekly menu refinements based on your feedback'
    ],
    categories: [
      'Curated Salad Collection',
      'Sandwiches',
      'Wraps',
      'Soups',
      'Chaat'
    ]
  },
  platinum: {
    name: 'RYVIVE PLATINUM',
    tagline: 'Excellence without compromise.',
    desc: 'Ryvive Complete is created for those who desire the highest level of nourishment and personalization. Every element is meticulously curated — from ingredient sourcing to flavor pairing — delivering a truly transformative wellness experience.',
    included: [
      'Four meals daily with premium ingredients',
      'Bespoke menu design tailored to your goals',
      'Private tastings and seasonal exclusives',
      'Wellness consultations and progress tracking',
      'Full access to all signature offerings and functional beverages'
    ],
    categories: [
      'Soups & Chaat',
      'Pasta Zoodle Collections',
      'House Crafted Dips',
      'Signature Detox Collection',
      'Curated Salad Collection'
    ]
  }
};

/* — Step 4 — */
function ReviewStep({ plan, durationMonths, info, delivery }: { plan: Plan; durationMonths: DurationMonths; info: any; delivery: any; }) {
  const Row = ({ label, value }: { label: string; value: string | null }) => (
    value ? <div className="flex items-baseline justify-between py-4 gap-4" style={{ borderBottom: '1px solid rgba(42,37,32,0.1)' }}>
      <div className="tracking-[0.22em] uppercase flex-shrink-0" style={{ fontSize: '10px', color: SAGE_DARK }}>{label}</div>
      <div className="text-right" style={{ fontSize: '13px', color: INK }}>{value}</div>
    </div> : null
  );

  const fullName = `${info.firstName} ${info.lastName}`.trim();
  const address = [delivery.house, delivery.street, delivery.landmark, delivery.pincode].filter(Boolean).join(', ');
  const details = reviewPlanDetails[plan.key];
  const price = plan.prices[durationMonths];

  return (
    <div>
      <h2 className="font-serif mb-3" style={{ fontSize: 'clamp(28px, 3.4vw, 40px)', color: INK, fontWeight: 300, lineHeight: 1.1 }}>
        Order <em style={{ fontStyle: 'italic' }}>Summary.</em>
      </h2>
      <p className="mb-10" style={{ fontSize: '14px', color: 'rgba(42,37,32,0.65)', lineHeight: 1.8 }}>
        A final glance before we begin your journey.
      </p>

      {/* DETAILED PLAN SUMMARY */}
      <div className="p-7 lg:p-10 mb-8 flex flex-col gap-8" style={{ background: CREAM_2, borderRadius: '2px', border: '1px solid rgba(42,37,32,0.08)' }}>
        <div>
          <div className="tracking-[0.32em] uppercase mb-5" style={{ fontSize: '10px', color: SAGE_DARK }}>Your Selected Plan</div>
          <div className="font-serif mb-2" style={{ fontSize: 'clamp(32px, 4vw, 44px)', fontWeight: 300, color: INK, letterSpacing: '0.01em' }}>
            {details.name}
          </div>
          <div style={{ fontSize: '15px', color: SAGE_DARK, fontStyle: 'italic', marginBottom: '16px' }}>
            {details.tagline}
          </div>
          <p style={{ fontSize: '15px', color: 'rgba(42,37,32,0.7)', lineHeight: 1.85, maxWidth: '640px' }}>
            {details.desc}
          </p>

          <div className="flex items-baseline gap-2 mt-8">
            <span style={{ fontSize: '14px', opacity: 0.55 }}>₹</span>
            <span className="font-serif" style={{ fontSize: '32px', fontWeight: 300, color: INK, letterSpacing: '-0.02em', lineHeight: 1 }}>
              {price.toLocaleString('en-IN')}
            </span>
            <span className="tracking-[0.24em] uppercase ml-2" style={{ fontSize: '11px', color: 'rgba(42,37,32,0.5)' }}>
              / {durationMonths === 1 ? 'month' : '3 months'} · {plan.meals}
            </span>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-8 md:gap-12 pt-8" style={{ borderTop: '1px solid rgba(42,37,32,0.08)' }}>
          <div>
            <div className="tracking-[0.28em] uppercase mb-5" style={{ fontSize: '10px', color: SAGE_DARK }}>
              What’s Included
            </div>
            <ul className="space-y-3">
              {details.included.map((f, i) => (
                <li key={i} className="flex items-start gap-4" style={{ fontSize: '14px', color: 'rgba(42,37,32,0.85)', lineHeight: 1.6 }}>
                  <span style={{ color: SAGE_DARK, flexShrink: 0, marginTop: '7px', width: '4px', height: '4px', borderRadius: '50%', background: 'currentColor' }} />
                  {f}
                </li>
              ))}
            </ul>
          </div>
          <div>
            <div className="tracking-[0.28em] uppercase mb-5" style={{ fontSize: '10px', color: SAGE_DARK }}>
              Categories Covered
            </div>
            <ul className="space-y-3">
              {details.categories.map((c, i) => (
                <li key={i} className="flex items-start gap-4" style={{ fontSize: '14px', color: 'rgba(42,37,32,0.85)', lineHeight: 1.6 }}>
                  <span style={{ color: SAGE_DARK, flexShrink: 0, marginTop: '7px', width: '4px', height: '4px', borderRadius: '50%', background: 'currentColor' }} />
                  {c}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* USER DETAILS */}
      <div className="p-7 lg:p-9 mb-8" style={{ background: CREAM_2, borderRadius: '2px', border: '1px solid rgba(42,37,32,0.08)' }}>
        <h3 className="tracking-[0.32em] uppercase mt-8 mb-4" style={{ fontSize: '10px', color: SAGE_DARK }}>Personal Information</h3>
        <Row label="Name" value={fullName || '—'} />
        <Row label="Contact" value={info.phone || info.email ? `${info.phone} | ${info.email}` : '—'} />
        <Row label="DOB" value={info.dob || '—'} />
        {(info.allergies || info.conditions) && (
          <Row label="Health Info" value={[info.allergies ? `Allergies: ${info.allergies}` : null, info.conditions ? `Conditions: ${info.conditions}` : null].filter(Boolean).join(' | ')} />
        )}

        <h3 className="tracking-[0.32em] uppercase mt-8 mb-4" style={{ fontSize: '10px', color: SAGE_DARK }}>Delivery Information</h3>
        <Row label="Address" value={address || '—'} />
        <Row label="Morning Slot" value={delivery.morningSlot || '—'} />
        <Row label="Evening Slot" value={delivery.eveningSlot || '—'} />

        <div className="flex items-baseline justify-between pt-6 mt-2">
          <div className="tracking-[0.32em] uppercase" style={{ fontSize: '11px', color: INK }}>Total / Month</div>
          <div className="font-serif" style={{ fontSize: '34px', color: INK, fontWeight: 300 }}>
            ₹{price.toLocaleString('en-IN')}
          </div>
        </div>
      </div>
    </div>
  );
}

/* — Step 5 — */
function PaymentStep({ plan, durationMonths, agreed, setAgreed }: { plan: Plan; durationMonths: DurationMonths; agreed: boolean; setAgreed: (v: boolean) => void }) {
  const [paymentMethod, setPaymentMethod] = useState('card');
  const amount = plan.prices[durationMonths];
  const paymentOptions = [
    { id: 'card', label: 'Credit / Debit Card', icon: CreditCard },
    { id: 'upi', label: 'UPI', icon: Smartphone },
    { id: 'netbanking', label: 'Net Banking', icon: Landmark },
    { id: 'wallet', label: 'Wallet', icon: Wallet }
  ];

  return (
    <div>
      <h2 className="font-serif mb-3" style={{ fontSize: 'clamp(28px, 3.4vw, 40px)', color: INK, fontWeight: 300, lineHeight: 1.1 }}>
        Payment <em style={{ fontStyle: 'italic' }}>method.</em>
      </h2>
      <p className="mb-10" style={{ fontSize: '14px', color: 'rgba(42,37,32,0.65)', lineHeight: 1.8 }}>
        Choose how you'd like to pay for your subscription.
      </p>

      {/* PAYMENT METHODS */}
      <div className="p-7 lg:p-9 mb-8" style={{ background: CREAM_2, borderRadius: '2px', border: '1px solid rgba(42,37,32,0.08)' }}>
        <h3 className="tracking-[0.32em] uppercase mb-6" style={{ fontSize: '10px', color: SAGE_DARK }}>Payment Method</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {paymentOptions.map((opt) => {
            const isSel = paymentMethod === opt.id;
            return (
              <motion.button
                key={opt.id}
                onClick={() => setPaymentMethod(opt.id)}
                whileTap={{ scale: 0.98 }}
                whileHover={{ y: -2 }}
                className="flex items-center gap-4 p-4 lg:p-5 text-left transition-all duration-300"
                style={{
                  background: isSel ? INK : 'rgba(255,255,255,0.4)',
                  border: `1px solid ${isSel ? INK : 'rgba(42,37,32,0.1)'}`,
                  color: isSel ? CREAM : INK,
                  borderRadius: '2px',
                  boxShadow: isSel ? '0 10px 20px -10px rgba(42,37,32,0.2)' : 'none',
                }}
              >
                <div
                  className="flex items-center justify-center w-10 h-10 rounded-full shrink-0 transition-colors"
                  style={{ background: isSel ? 'rgba(244,239,230,0.1)' : CREAM }}
                >
                  <opt.icon size={18} strokeWidth={1.5} color={isSel ? SAGE : SAGE_DARK} />
                </div>
                <div style={{ fontSize: '14px', fontWeight: isSel ? 400 : 300, flex: 1 }}>{opt.label}</div>
                <div
                  className="w-4 h-4 rounded-full border-2 flex items-center justify-center transition-all shrink-0"
                  style={{ borderColor: isSel ? SAGE : 'rgba(42,37,32,0.2)' }}
                >
                  {isSel && <div className="w-2 h-2 rounded-full" style={{ background: SAGE }} />}
                </div>
              </motion.button>
            )
          })}
        </div>

        {/* Prominent Price Display */}
        <div className="mt-8 pt-8 flex items-end justify-between" style={{ borderTop: '1px solid rgba(42,37,32,0.08)' }}>
          <div>
            <div className="tracking-[0.24em] uppercase mb-2" style={{ fontSize: '10px', color: SAGE_DARK }}>Amount Due</div>
            <div className="font-serif" style={{ fontSize: 'clamp(32px, 4vw, 42px)', color: INK, fontWeight: 300, lineHeight: 1 }}>
              ₹{amount.toLocaleString('en-IN')}
            </div>
          </div>
          <div className="tracking-[0.24em] uppercase" style={{ fontSize: '11px', color: 'rgba(42,37,32,0.5)', paddingBottom: '6px' }}>
            / {durationMonths === 1 ? 'month' : '3 months'}
          </div>
        </div>
      </div>

      <label className="flex items-start gap-4 cursor-pointer" style={{ padding: '4px 0' }}>
        <div className="relative flex items-center justify-center mt-0.5" style={{ width: '18px', height: '18px' }}>
          <input
            type="checkbox"
            checked={agreed}
            onChange={(e) => setAgreed(e.target.checked)}
            className="absolute opacity-0 w-full h-full cursor-pointer z-10"
          />
          <div
            style={{
              width: '100%',
              height: '100%',
              border: `1px solid ${agreed ? SAGE_DARK : 'rgba(42,37,32,0.3)'}`,
              background: agreed ? SAGE_DARK : 'transparent',
              borderRadius: '2px',
              transition: 'all 0.2s ease',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}
          >
            {agreed && <Check size={12} strokeWidth={3} color={CREAM} />}
          </div>
        </div>
        <div style={{ fontSize: '13px', color: 'rgba(42,37,32,0.8)', lineHeight: 1.6, userSelect: 'none' }}>
          I agree to the Terms & Conditions and Privacy Policy
        </div>
      </label>
    </div>
  );
}
