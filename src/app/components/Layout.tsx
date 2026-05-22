import { useEffect } from 'react';
import { Outlet, useLocation } from 'react-router';
import { SiteHeader } from './SiteHeader';
import { SiteFooter } from './SiteFooter';
import { DARK } from '../theme';

export function Layout() {
  const location = useLocation();

  useEffect(() => {
    if (location.hash) {
      const id = location.hash.slice(1);
      requestAnimationFrame(() => {
        document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
      });
    } else {
      window.scrollTo(0, 0);
    }
  }, [location.pathname, location.hash]);

  return (
    <div style={{ background: DARK }} className="min-h-screen overflow-x-hidden">
      <SiteHeader />
      <Outlet />
      <SiteFooter />
    </div>
  );
}
