import { useState, type CSSProperties } from 'react';
import { Link } from 'react-router';
import { motion } from 'motion/react';
import { Eye, EyeOff } from 'lucide-react';
import { ImageWithFallback } from '../components/figma/ImageWithFallback';
import { CREAM, CREAM_2, DARK, INK, SAGE, SAGE_DARK } from '../theme';

export default function Login() {
  const [showPwd, setShowPwd] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [remember, setRemember] = useState(true);

  const inputStyle: CSSProperties = {
    width: '100%',
    background: 'transparent',
    border: 'none',
    borderBottom: `1px solid ${SAGE_DARK}`,
    padding: '12px 2px',
    fontSize: '14px',
    color: INK,
    outline: 'none',
    fontFamily: 'inherit',
  };
  const labelStyle: CSSProperties = {
    fontSize: '10px',
    letterSpacing: '0.32em',
    textTransform: 'uppercase',
    color: SAGE_DARK,
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden" style={{ background: DARK }}>
      <div className="absolute inset-0">
        <ImageWithFallback
          src="https://images.unsplash.com/photo-1554118811-1e0d58224f24?auto=format&fit=crop&w=2000&q=80"
          alt="Café"
          className="w-full h-full object-cover"
          style={{ filter: 'blur(8px) brightness(0.55)' }}
        />
        <div className="absolute inset-0" style={{ background: 'linear-gradient(180deg, rgba(20,17,15,0.55) 0%, rgba(20,17,15,0.7) 100%)' }} />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
        className="relative z-10 w-full max-w-[460px] mx-6 my-20 p-12"
        style={{ background: CREAM, border: `1px solid rgba(244,239,230,0.2)`, boxShadow: '0 40px 80px rgba(0,0,0,0.4)' }}
      >
        <div className="text-center mb-10">
          <Link to="/" className="font-serif tracking-[0.22em] uppercase" style={{ fontSize: '13px', color: INK }}>
            Ryvive <span style={{ color: SAGE_DARK }}>Roots</span>
          </Link>
          <div className="tracking-[0.42em] uppercase mt-10 mb-5" style={{ fontSize: '10px', color: SAGE_DARK }}>— Members</div>
          <h1 className="font-serif" style={{ fontSize: '36px', lineHeight: 1.15, color: INK, fontWeight: 300 }}>
            Welcome <em style={{ fontStyle: 'italic' }}>back.</em>
          </h1>
          <p className="mt-4" style={{ fontSize: '13px', color: 'rgba(42,37,32,0.6)', lineHeight: 1.7 }}>
            Sign in to manage your subscription and orders.
          </p>
        </div>

        <form onSubmit={(e) => e.preventDefault()} className="space-y-8">
          <div>
            <div style={labelStyle}>Email or Phone</div>
            <input value={email} onChange={(e) => setEmail(e.target.value)} style={inputStyle} />
          </div>

          <div>
            <div style={labelStyle}>Password</div>
            <div className="relative">
              <input
                type={showPwd ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                style={{ ...inputStyle, paddingRight: '32px' }}
              />
              <button type="button" onClick={() => setShowPwd((s) => !s)}
                className="absolute right-0 top-1/2 -translate-y-1/2 p-1" style={{ color: SAGE_DARK }}>
                {showPwd ? <EyeOff size={16} strokeWidth={1.4} /> : <Eye size={16} strokeWidth={1.4} />}
              </button>
            </div>
          </div>

          <div className="flex items-center justify-between" style={{ fontSize: '11px' }}>
            <label className="flex items-center gap-2 cursor-pointer" style={{ color: 'rgba(42,37,32,0.7)', letterSpacing: '0.08em' }}>
              <input type="checkbox" checked={remember} onChange={(e) => setRemember(e.target.checked)}
                style={{ accentColor: SAGE_DARK }} />
              Remember me
            </label>
            <a href="#" style={{ color: SAGE_DARK, letterSpacing: '0.12em', textTransform: 'uppercase', fontSize: '10px' }}>
              Forgot password?
            </a>
          </div>

          <Link
            to="/dashboard"
            className="block text-center px-9 py-4 tracking-[0.24em] uppercase transition-all duration-300"
            style={{ fontSize: '11px', background: INK, color: CREAM, border: `1px solid ${INK}`, borderRadius: '1px' }}
            onMouseEnter={(e) => { e.currentTarget.style.background = SAGE_DARK; e.currentTarget.style.borderColor = SAGE_DARK; }}
            onMouseLeave={(e) => { e.currentTarget.style.background = INK; e.currentTarget.style.borderColor = INK; }}
          >
            Sign In
          </Link>

          <div className="flex items-center gap-4" style={{ color: 'rgba(42,37,32,0.4)', fontSize: '10px', letterSpacing: '0.32em', textTransform: 'uppercase' }}>
            <span style={{ flex: 1, height: '1px', background: 'rgba(42,37,32,0.18)' }} />
            or
            <span style={{ flex: 1, height: '1px', background: 'rgba(42,37,32,0.18)' }} />
          </div>

          <button type="button"
            className="w-full px-9 py-4 tracking-[0.24em] uppercase transition-all duration-300"
            style={{ fontSize: '11px', background: 'transparent', color: INK, border: `1px solid ${SAGE_DARK}`, borderRadius: '1px' }}
            onMouseEnter={(e) => { e.currentTarget.style.background = CREAM_2; }}
            onMouseLeave={(e) => { e.currentTarget.style.background = 'transparent'; }}
          >
            Continue with Google
          </button>

          <div className="text-center pt-2" style={{ fontSize: '12px', color: 'rgba(42,37,32,0.65)' }}>
            New to our table?{' '}
            <a href="#" style={{ color: INK, borderBottom: `1px solid ${SAGE_DARK}` }}>Create an account</a>
          </div>
        </form>
      </motion.div>
    </section>
  );
}
