import { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { Link, useLocation } from 'react-router';
import { motion, AnimatePresence } from 'motion/react';
import { Instagram, Linkedin, Youtube, User, Phone, Mail, X } from 'lucide-react';
import { CREAM, DARK, SAGE } from '../theme';
import Logo from '../images/LOGO.png';

import Menu1 from '../images/Menu-1.jpeg';
import Menu2 from '../images/Menu-2.jpeg';
import Menu3 from '../images/Menu-3.jpeg';
import Menu4 from '../images/Menu-4.jpeg';
import { menuPreviewCards } from '../content/menuContent';

const links = [
  { label: 'Home', to: '/' },
  { label: 'Our Story', to: '/story' },
  { label: 'Menu', to: '/menu' },
  { label: 'Subscription', to: '/subscription' },
  { label: 'Franchise', to: '/franchise' },
  { label: 'Career', to: '/career' },
  { label: 'Contact Us', to: '/#contact' },
];

export function BurgerMenu({ headerText, headerMuted }: { headerText: string; headerMuted: string }) {
  const [isOpen, setIsOpen] = useState(false);
  const [isDesktop, setIsDesktop] = useState(false);
  const location = useLocation();

  useEffect(() => {
    setIsOpen(false);
  }, [location.pathname, location.hash]);

  useEffect(() => {
    const media = window.matchMedia('(min-width: 1024px)');

    const update = () => {
      setIsDesktop(media.matches);
      setIsOpen(false);
    };

    update();
    media.addEventListener('change', update);

    return () => media.removeEventListener('change', update);
  }, []);

  // Handle body scroll & ESC key
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      document.documentElement.style.overflow = 'hidden';
      const handleEsc = (e: KeyboardEvent) => {
        if (e.key === 'Escape') setIsOpen(false);
      };
      window.addEventListener('keydown', handleEsc);
      return () => {
        document.body.style.overflow = '';
        document.documentElement.style.overflow = '';
        window.removeEventListener('keydown', handleEsc);
      };
    } else {
      document.body.style.overflow = '';
      document.documentElement.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
      document.documentElement.style.overflow = '';
    };
  }, [isOpen]);

  const ease: [number, number, number, number] = [0.22, 1, 0.36, 1];
  const showMobileMenu = isOpen && !isDesktop;
  const showDesktopMenu = isOpen && isDesktop;

  return (
    <>
      {/* Burger Icon - Stays in the header DOM tree to preserve positioning and animation */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="relative z-[100] flex lg:hidden flex-col justify-center items-center gap-[6px] w-10 h-10 transition-transform hover:scale-105 ml-2 md:ml-4"
        aria-label="Toggle menu"
      >
        <motion.span
          animate={showMobileMenu ? { rotate: 45, y: 7.5 } : { rotate: 0, y: 0 }}
          transition={{ duration: 0.4, ease }}
          className="w-6 h-[1.5px] block rounded-full"
          style={{ background: showMobileMenu ? CREAM : headerText }}
        />
        <motion.span
          animate={showMobileMenu ? { opacity: 0 } : { opacity: 1 }}
          transition={{ duration: 0.4, ease }}
          className="w-6 h-[1.5px] block rounded-full"
          style={{ background: showMobileMenu ? CREAM : headerText }}
        />
        <motion.span
          animate={showMobileMenu ? { rotate: -45, y: -7.5 } : { rotate: 0, y: 0 }}
          transition={{ duration: 0.4, ease }}
          className="w-6 h-[1.5px] block rounded-full"
          style={{ background: showMobileMenu ? CREAM : headerText }}
        />
      </button>

      <button
  onClick={() => setIsOpen(!isOpen)}
  className="hidden lg:flex relative z-[9999] items-center justify-center w-[44px] h-[44px] ml-4"
  aria-label="Toggle desktop menu"
>

  <div className="relative w-[26px] h-[18px]">

    {/* TOP */}
    <motion.span
      animate={
        showDesktopMenu
          ? { rotate: 45, y: 8 }
          : { rotate: 0, y: 0 }
      }
      transition={{ duration: 0.35 }}
      className="absolute top-0 left-0 w-full h-[1.5px] rounded-full"
      style={{
        backgroundColor: showDesktopMenu
          ? '#8B6B4A'
          : headerText,
      }}
    />

    {/* MIDDLE */}
    <motion.span
      animate={
        showDesktopMenu
          ? { opacity: 0 }
          : { opacity: 1 }
      }
      transition={{ duration: 0.2 }}
      className="absolute top-[8px] left-0 w-full h-[1.5px] rounded-full"
      style={{
        backgroundColor: showDesktopMenu
          ? '#8B6B4A'
          : headerText,
      }}
    />

    {/* BOTTOM */}
    <motion.span
      animate={
        showDesktopMenu
          ? { rotate: -45, y: -8 }
          : { rotate: 0, y: 0 }
      }
      transition={{ duration: 0.35 }}
      className="absolute top-[16px] left-0 w-full h-[1.5px] rounded-full"
      style={{
        backgroundColor: showDesktopMenu
          ? '#8B6B4A'
          : headerText,
      }}
    />

  </div>

</button>

      {/* Menu Overlay - Portaled to document.body to escape header's backdrop-filter containing block */}
      {typeof document !== 'undefined' && createPortal(
        <AnimatePresence>
          {showMobileMenu && (
            <div className="fixed top-0 left-0 w-screen h-screen z-[9998] pointer-events-none flex justify-end overflow-hidden">

              {/* Backdrop */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5, ease }}
                className="absolute inset-0 pointer-events-auto"
                style={{ position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh', background: 'rgba(28,24,20,0.92)', backdropFilter: 'blur(8px)', WebkitBackdropFilter: 'blur(8px)' }}
                onClick={() => setIsOpen(false)}
              />

              {/* Side Drawer */}
              <motion.div
                initial={{ x: '100%' }}
                animate={{ x: 0 }}
                exit={{ x: '100%' }}
                transition={{ duration: 0.7, ease }}
                className="relative w-[85%] max-w-[420px] md:max-w-none md:w-[480px] lg:w-[540px] h-full shadow-2xl flex flex-col pointer-events-auto"
                style={{ background: DARK }}
              >
                <div className="flex flex-col flex-1 h-full px-6 md:px-14 pt-24 pb-10 md:pb-14 overflow-y-auto" style={{ scrollbarWidth: 'none' }}>

                  <div className="mb-8 flex items-center justify-between">
                    <Link
                      to="/login"
                      onClick={() => setIsOpen(false)}
                      className="inline-flex items-center gap-2 tracking-[0.2em] uppercase transition-colors duration-300"
                      style={{ fontSize: '10px', color: 'rgba(244,239,230,0.7)' }}
                    >
                      <User size={13} strokeWidth={1.4} /> Login
                    </Link>
                  </div>

                  {/* Navigation Links */}
                  <nav className="flex flex-col gap-4">
                    {links.map((link, i) => (
                      <motion.div
                        key={link.label}
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: 20 }}
                        transition={{ duration: 0.5, delay: 0.1 + i * 0.04, ease }}
                      >
                        <Link
                          to={link.to}
                          onClick={() => setIsOpen(false)}
                          className="font-serif text-[22px] md:text-[26px] font-light leading-none transition-colors duration-300 hover:text-[#A3B19B] block w-fit"
                          style={{ color: CREAM, fontWeight: 300 }}
                        >
                          {link.label}
                        </Link>
                      </motion.div>
                    ))}
                  </nav>

                  {/* Divider */}
                  <motion.div
                    initial={{ scaleX: 0 }}
                    animate={{ scaleX: 1 }}
                    exit={{ scaleX: 0 }}
                    transition={{ duration: 0.7, delay: 0.3, ease }}
                    className="w-full h-[1px] my-8 origin-left shrink-0"
                    style={{ background: 'rgba(244,239,230,0.1)' }}
                  />

                  {/* Food Showcase */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    transition={{ duration: 0.5, delay: 0.4, ease }}
                    className="mb-8 shrink-0"
                  >
                    <p className="tracking-[0.2em] uppercase text-[10px] mb-4" style={{ color: SAGE }}>
                      Menu Chapters
                    </p>
                    <div className="grid grid-cols-4 gap-2 md:gap-3">
                      {menuPreviewCards.map((food, i) => (
                        <a
                          key={i}
                          href="https://www.instagram.com/ryvive_roots?igsh=aHc1Z3hmMWVheWdl"
                          target="_blank"
                          rel="noreferrer"
                          onClick={() => setIsOpen(false)}
                          className="group relative aspect-square overflow-hidden rounded-[2px] cursor-pointer block"
                        >
                          <img
                            src={[Menu1, Menu2, Menu3, Menu4][i]}
                            alt={food.imageLabel}
                            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                          />
                          <div className="absolute inset-0 bg-black/20 group-hover:bg-black/50 transition-colors duration-500" />
                          <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                            <span className="text-white tracking-[0.2em] uppercase" style={{ fontSize: '9px' }}>{food.title}</span>
                          </div>
                        </a>
                      ))}
                    </div>
                  </motion.div>

                  {/* Spacer to push social media to bottom */}
                  <div className="flex-grow min-h-[20px]" />

                  {/* Social Media */}
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.5, delay: 0.5 }}
                    className="flex items-center gap-6 mt-auto pt-6 border-t shrink-0"
                    style={{ borderColor: 'rgba(244,239,230,0.1)' }}
                  >
                    <a href="https://www.instagram.com/ryvive_roots?igsh=aHc1Z3hmMWVheWdl" target="_blank" rel="noreferrer" className="transition-transform duration-300 hover:scale-110 hover:text-[#A3B19B]" style={{ color: CREAM }}>
                      <Instagram strokeWidth={1.2} size={18} />
                    </a>
                    <a href="#" className="transition-transform duration-300 hover:scale-110 hover:text-[#A3B19B]" style={{ color: CREAM }}>
                      <Linkedin strokeWidth={1.2} size={18} />
                    </a>
                    <a href="#" className="transition-transform duration-300 hover:scale-110 hover:text-[#A3B19B]" style={{ color: CREAM }}>
                      <Youtube strokeWidth={1.2} size={18} />
                    </a>
                  </motion.div>

                </div>
              </motion.div>
            </div>
          )}
        </AnimatePresence>,
        document.body
      )}

      {typeof document !== 'undefined' && createPortal(
        <AnimatePresence>
          {showDesktopMenu && (
  <div className="fixed inset-0 z-[9998] flex justify-end overflow-hidden">
    
    {/* BACKDROP */}
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.45, ease }}
      className="absolute inset-0"
      style={{
        background: 'rgba(8,7,6,0.72)',
        backdropFilter: 'blur(10px)',
        WebkitBackdropFilter: 'blur(10px)',
      }}
      onClick={() => setIsOpen(false)}
    />

    {/* MENU PANEL */}
    <motion.div
      initial={{ x: '100%' }}
      animate={{ x: 0 }}
      exit={{ x: '100%' }}
      transition={{ duration: 0.65, ease }}
      className="relative h-screen w-[420px] bg-[#F5F1E8] overflow-hidden"
    >
      <div
       className="flex h-full flex-col px-[40px] pt-[34px] pb-[28px]"
        style={{ scrollbarWidth: 'none' }}
      >

        {/* TOP */}
        <div className="flex items-start justify-between">
          
          {/* LOGO */}
          <img
            src={Logo}
            alt="Ryvive Roots"
            className="w-[132px] object-contain"
          />

        
        </div>

        {/* TAGLINE */}
        <p
         className="mt-[28px] max-w-[290px]"
          style={{
            fontSize: '13px',
            lineHeight: 1.8,
            color: 'rgba(30,25,21,0.72)',
          }}
        >
          Crafted for balance, freshness, and flavour.
        </p>

        {/* IMAGE COMPOSITION */}
        <div className="mt-7 flex flex-col items-center">

          {/* TOP ROW */}
          <div className="flex gap-3">
            <div className="overflow-hidden rounded-[8px]">
              <img
                src={Menu1}
                alt=""
                className="h-[92px] w-[154px] object-cover transition-transform duration-700 hover:scale-[1.04]"
              />
            </div>

            <div className="overflow-hidden rounded-[8px]">
              <img
                src={Menu2}
                alt=""
                className="h-[92px] w-[154px] object-cover transition-transform duration-700 hover:scale-[1.04]"
              />
            </div>
          </div>

          {/* BOTTOM IMAGE */}
          <div className="mt-5 overflow-hidden rounded-[8px]">
              <img
                src={Menu3}
                alt=""
                className="h-[132px] w-[320px] object-cover transition-transform duration-700 hover:scale-[1.04]"
              />
          </div>
        </div>

        {/* SOCIAL ICONS */}
        <div className="mt-9 flex items-center justify-center gap-8">

          {[
            { Icon: Instagram, href: 'https://www.instagram.com/ryvive_roots?igsh=aHc1Z3hmMWVheWdl' },
            { Icon: Linkedin, href: '#' },
            { Icon: Youtube, href: '#' },
          ].map(({ Icon, href }, index) => (
            <a
              key={index}
              href={href}
              className="flex h-[38px] w-[38px] items-center justify-center rounded-full border border-black/10 transition-all duration-300 hover:border-black/20 hover:-translate-y-[1px]"
              {...(index === 0 ? { target: '_blank', rel: 'noreferrer' } : {})}
            >
              <Icon
                size={16}
                strokeWidth={1.5}
                className="text-[#2B2622]"
              />
            </a>
          ))}
        </div>

        {/* ADDRESS */}
        <div className="mt-8 border-t border-black/5 pt-6">

          <div
            className="text-center"
            style={{
              fontSize: '13px',
              lineHeight: 2,
              color: 'rgba(30,25,21,0.72)',
            }}
          >
            Shop No 01, Saraswati Bhuvan,<br />
            Near Roshan Automobile, Phadke Cross Road,<br />
            Opp. Hotel Nav Gomantak,<br />
            Dombivli East, Maharashtra 421201.
          </div>

        </div>

      </div>
    </motion.div>
  </div>
)}
        </AnimatePresence>,
        document.body
      )}
    </>
  );
}
