import { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router';
import { User } from 'lucide-react';
import { CREAM, INK, SAGE } from '../theme';
import Logo from '../images/LOGO.png';
import { BurgerMenu } from './BurgerMenu';

export function SiteHeader() {
  const [scrolled, setScrolled] = useState(false);
  const [overLight, setOverLight] = useState(false);
  const location = useLocation();
  const isDashboard = location.pathname === '/dashboard';

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 40);
      const lightZones = Array.from(document.querySelectorAll('[data-tone="light"]')) as HTMLElement[];
      const y = window.scrollY + 36;
      setOverLight(lightZones.some((el) => y >= el.offsetTop && y < el.offsetTop + el.offsetHeight));
    };
    window.addEventListener('scroll', onScroll);
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, [location.pathname]);

  const headerText = overLight ? INK : CREAM;
  const headerMuted = overLight ? 'rgba(42,37,32,0.6)' : 'rgba(244,239,230,0.6)';
  const headerBorder = overLight ? 'rgba(42,37,32,0.15)' : 'rgba(244,239,230,0.15)';

  const links = [
    { label: 'Story', to: '/story' },
    { label: 'Menu', to: '/menu' },
    { label: 'Subscription', to: '/subscription' },
    { label: 'Franchise', to: '/franchise' },
    { label: 'Career', to: '/career' },
  ];

  return (
    <header
      className="fixed top-0 left-0 right-0 z-[9999] transition-all duration-500"
      style={{
        background: (scrolled || isDashboard) ? (overLight ? 'rgba(244,239,230,0.92)' : 'rgba(20,17,15,0.9)') : 'transparent',
        backdropFilter: (scrolled || isDashboard) ? 'blur(16px)' : 'none',
        borderBottom: (scrolled || isDashboard) ? `1px solid ${headerBorder}` : '1px solid transparent',
      }}
    >
      <div className="max-w-[1400px] mx-auto px-8 lg:px-14">
        <div className="flex items-center justify-between h-[72px]">
          <Link
            to="/"
            className="transition-opacity duration-300"
          >
            <img
              src={Logo}
              alt="Ryvive Roots"
              style={{
                height: '72px',
                width: 'auto',
                objectFit: 'contain',
                opacity: 0.95,
              }}
            />
          </Link>

          <nav className="hidden lg:flex items-center gap-11">
            {links.map((item) => {
              const isCurrent =
                (item.to === '/menu' && location.pathname === '/menu') ||
                (item.to === '/subscription' && location.pathname === '/subscription') ||
                (item.to === '/franchise' && location.pathname === '/franchise') ||
                (item.to === '/career' && location.pathname === '/career');
              return (
                <Link
                  key={item.label}
                  to={item.to}
                  className="tracking-[0.2em] uppercase transition-colors duration-300 relative"
                  style={{ fontSize: '11px', color: isCurrent ? headerText : headerMuted }}
                  onMouseEnter={(e) => { if (!isCurrent) e.currentTarget.style.color = headerText; }}
                  onMouseLeave={(e) => { if (!isCurrent) e.currentTarget.style.color = headerMuted; }}
                >
                  {item.label}
                  {isCurrent && (
                    <span style={{ position: 'absolute', left: 0, right: 0, bottom: '-6px', height: '1px', background: SAGE }} />
                  )}
                </Link>
              );
            })}
          </nav>

          <div className="flex items-center gap-4">
            <Link
              to="/login"
              className="hidden md:inline-flex items-center gap-2 tracking-[0.2em] uppercase transition-colors duration-300"
              style={{ fontSize: '10px', color: headerMuted }}
              onMouseEnter={(e) => { e.currentTarget.style.color = headerText; }}
              onMouseLeave={(e) => { e.currentTarget.style.color = headerMuted; }}
            >
              <User size={13} strokeWidth={1.4} /> Login
            </Link>

            <BurgerMenu headerText={headerText} headerMuted={headerMuted} />
          </div>
        </div>
      </div>
    </header>
  );
}
