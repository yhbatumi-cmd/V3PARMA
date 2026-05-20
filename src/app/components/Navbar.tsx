import { useEffect, useState } from 'react';
import { motion } from 'motion/react';
import { Menu, X } from 'lucide-react';
import logoImage from '../../imports/logo-georgia-black.png';
import type { Lang, Page } from '../types';
import { i18n } from '../types';

interface NavbarProps {
  lang: Lang;
  setLang: (v: Lang) => void;
  currentPage: Page;
  onNavigate: (page: Exclude<Page, 'property' | 'privacy'>) => void;
}

export default function Navbar({ lang, setLang, currentPage, onNavigate }: NavbarProps) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const t = i18n[lang];
  const isHome = currentPage === 'home';

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', handler, { passive: true });
    return () => window.removeEventListener('scroll', handler);
  }, []);

  const solid = !isHome || scrolled;

  const navLinks: { key: Exclude<Page, 'property' | 'privacy' | 'home'>; label: string }[] = [
    { key: 'catalog', label: t.menu.catalog },
    { key: 'about', label: t.menu.about },
    { key: 'contacts', label: t.menu.contacts },
    { key: 'faq', label: t.menu.faq },
  ];

  return (
    <motion.header
      initial={false}
      animate={{
        backgroundColor: solid ? 'rgba(12,12,20,0.92)' : 'transparent',
        borderBottomColor: solid ? 'rgba(201,168,76,0.2)' : 'transparent',
      }}
      transition={{ duration: 0.3 }}
      className="fixed top-0 left-0 right-0 z-50 border-b backdrop-blur-md"
    >
      <div className="mx-auto flex h-16 max-w-7xl items-center px-4 md:px-8 relative">
        {/* Logo + lang switcher - left */}
        <div className="flex items-center gap-2 flex-shrink-0">
          <button
            onClick={() => onNavigate('home')}
            className="flex items-center"
            aria-label="Home"
          >
            <img
              src={logoImage}
              alt="PARMAINVEST"
              className="h-16 md:h-[4.8rem] w-auto object-contain"
              style={{ filter: 'invert(1) drop-shadow(0 1px 4px rgba(201,168,76,0.4))' }}
            />
          </button>
          <div className="hidden md:flex gap-1 rounded-full bg-white/10 p-0.5">
            {(['RU', 'EN'] as Lang[]).map((code) => (
              <button
                key={code}
                onClick={() => setLang(code)}
                className={`h-7 min-w-9 rounded-full px-2 text-[11px] font-semibold transition-all duration-200 ${
                  lang === code
                    ? 'bg-[#c9a84c] text-white shadow-[0_0_8px_rgba(201,168,76,0.5)]'
                    : 'text-white/60 hover:text-white'
                }`}
              >
                {code}
              </button>
            ))}
          </div>
        </div>

        {/* Desktop nav - centered */}
        <nav className="hidden md:flex items-center gap-6 absolute left-1/2 -translate-x-1/2">
          {navLinks.map(({ key, label }) => (
            <button
              key={key}
              onClick={() => onNavigate(key)}
              className={`relative text-2xl font-medium tracking-wide transition-colors duration-200 pb-0.5 ${
                currentPage === key
                  ? 'text-[#c9a84c] after:absolute after:bottom-0 after:left-0 after:right-0 after:h-0.5 after:bg-[#c9a84c] after:rounded-full'
                  : 'text-white/70 hover:text-[#c9a84c]'
              }`}
            >
              {label}
            </button>
          ))}
        </nav>

        {/* Mobile lang switcher - near logo */}
        <div className="md:hidden flex gap-1 rounded-full bg-white/10 p-0.5 ml-2">
          {(['RU', 'EN'] as Lang[]).map((code) => (
            <button
              key={code}
              onClick={() => setLang(code)}
              className={`h-7 min-w-9 rounded-full px-2 text-[11px] font-semibold transition-all duration-200 ${
                lang === code
                  ? 'bg-[#c9a84c] text-white shadow-[0_0_8px_rgba(201,168,76,0.5)]'
                  : 'text-white/60 hover:text-white'
              }`}
            >
              {code}
            </button>
          ))}
        </div>

        {/* Spacer to push hamburger right */}
        <div className="flex-1 md:hidden" />

        {/* Mobile hamburger - far right, bigger */}
        <button
          className="md:hidden flex h-12 w-12 items-center justify-center rounded-xl border border-white/15 bg-white/10 text-white hover:border-[#c9a84c]/50 hover:text-[#c9a84c] transition-all duration-200"
          onClick={() => setMobileOpen((v) => !v)}
          aria-label="Toggle menu"
        >
          {mobileOpen ? <X size={26} /> : <Menu size={26} />}
        </button>
      </div>

      {/* Mobile drawer */}
      {mobileOpen && (
        <motion.div
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          className="md:hidden border-t border-[#c9a84c]/20 bg-[#080810]/98 px-4 pb-4 shadow-[0_14px_28px_rgba(0,0,0,0.45)]"
        >
          {navLinks.map(({ key, label }) => (
            <button
              key={key}
              onClick={() => { onNavigate(key); setMobileOpen(false); }}
              className={`block w-full border-b border-white/5 py-3 text-left text-base font-medium last:border-0 transition-colors ${
                currentPage === key ? 'text-[#c9a84c]' : 'text-white/70 hover:text-[#c9a84c]'
              }`}
            >
              {label}
            </button>
          ))}
        </motion.div>
      )}
    </motion.header>
  );
}
