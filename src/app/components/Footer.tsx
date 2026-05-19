import { Instagram, MessageCircle, Send } from 'lucide-react';
import logoImage from '../../imports/logo-georgia-black.png';
import type { Lang, Page } from '../types';
import { i18n, privacyText } from '../types';

interface FooterProps {
  lang: Lang;
  onNavigate: (page: Exclude<Page, 'property'>) => void;
}

export default function Footer({ lang, onNavigate }: FooterProps) {
  const t = i18n[lang];

  return (
    <footer className="border-t border-white/8 bg-[#080810] px-4 py-4 md:py-6">
      <div className="mx-auto max-w-6xl">
        <div className="grid gap-4 md:grid-cols-3 md:gap-8">
          {/* Brand */}
          <div className="flex flex-col items-center md:items-start">
            <div className="flex flex-row items-center gap-3">
              <button onClick={() => onNavigate('home')} className="opacity-90 hover:opacity-100 transition-opacity flex-shrink-0">
                <img
                  src={logoImage}
                  alt="PARMAINVEST"
                  className="h-28 w-auto object-contain md:h-32"
                  style={{ filter: 'invert(1) drop-shadow(0 1px 6px rgba(201,168,76,0.3))' }}
                />
              </button>
              <p className="max-w-xs text-sm leading-snug text-white">
                {lang === 'RU'
                  ? <>Загородная недвижимость Грузии.<br />Подбор, проверка и сопровождение.</>
                  : <>Georgia countryside real estate.<br />Search, check, and support.</>}
              </p>
            </div>
          </div>

          {/* Nav */}
          <div>
            <h3 className="text-xs font-semibold uppercase tracking-widest text-[#c9a84c]/70 mb-4">
              {lang === 'RU' ? 'Навигация' : 'Navigation'}
            </h3>
            <nav className="flex flex-col gap-2">
              {[
                { key: 'catalog' as const, label: t.menu.catalog },
                { key: 'about' as const, label: t.menu.about },
                { key: 'contacts' as const, label: t.menu.contacts },
                { key: 'faq' as const, label: t.menu.faq },
              ].map(({ key, label }) => (
                <button
                  key={key}
                  onClick={() => onNavigate(key)}
                  className="text-left text-base text-white/40 hover:text-[#c9a84c] transition-colors duration-200"
                >
                  {label}
                </button>
              ))}
            </nav>
          </div>

          {/* Social */}
          <div>
            <h3 className="text-xs font-semibold uppercase tracking-widest text-[#c9a84c]/70 mb-4">
              {lang === 'RU' ? 'Контакты' : 'Contacts'}
            </h3>
            <div className="flex gap-3">
              {[
                { href: 'https://instagram.com/parmainvest', icon: <Instagram size={24} /> },
                { href: 'https://t.me/parmainvest', icon: <Send size={24} /> },
                { href: 'https://wa.me/995557520693', icon: <MessageCircle size={24} /> },
              ].map(({ href, icon }) => (
                <a
                  key={href}
                  href={href}
                  target="_blank"
                  rel="noreferrer"
                  className="flex h-14 w-14 items-center justify-center rounded-full border border-white/10 text-white/40 transition-all duration-200 hover:border-[#c9a84c]/40 hover:text-[#c9a84c] hover:bg-[#c9a84c]/8"
                >
                  {icon}
                </a>
              ))}
            </div>
            <p className="mt-4 text-base text-white/30">+995 557 520 693</p>
          </div>
        </div>

        <div className="mt-4 border-t border-white/6 pt-4 text-center md:mt-6">
          <p className="text-xs text-white/20">© 2020 PARMAINVEST. {lang === 'RU' ? 'Все права защищены.' : 'All rights reserved.'}</p>
          <button
            onClick={() => onNavigate('privacy')}
            className="mt-2 text-xs text-white/25 hover:text-white/50 transition-colors duration-200"
          >
            {privacyText[lang].title}
          </button>
        </div>
      </div>
    </footer>
  );
}
