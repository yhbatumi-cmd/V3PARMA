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
        <div className="flex flex-col md:flex-row gap-8 md:gap-8 md:items-start md:justify-between">
          {/* Brand - left */}
          <div className="flex flex-col items-center md:items-start flex-shrink-0">
            <div className="flex flex-col items-center md:items-start gap-1 md:max-w-xs">
              <div className="flex justify-center md:justify-start">
                <button onClick={() => onNavigate('home')} className="opacity-90 hover:opacity-100 transition-opacity flex-shrink-0">
                  <img
                    src={logoImage}
                    alt="PARMAINVEST"
                    className="h-24 w-auto object-contain md:h-28"
                    style={{ filter: 'invert(1) drop-shadow(0 1px 6px rgba(201,168,76,0.3))' }}
                  />
                </button>
              </div>
              <p className="max-w-xs text-xs md:text-sm leading-snug text-white text-center">
                {lang === 'RU'
                  ? <>Загородная недвижимость Грузии.<br />Подбор, проверка и сопровождение.</>
                  : <>Georgia countryside real estate.<br />Search, check, and support.</>}
              </p>
            </div>
          </div>

          {/* Nav - center */}
          <div className="flex-1 flex flex-col items-center">
            <h3 className="text-sm font-semibold uppercase tracking-widest text-[#c9a84c]/70 mb-4">
              {lang === 'RU' ? 'Навигация' : 'Navigation'}
            </h3>
            <nav className="flex flex-col gap-2 items-center">
              {[
                { key: 'catalog' as const, label: t.menu.catalog },
                { key: 'about' as const, label: t.menu.about },
                { key: 'contacts' as const, label: t.menu.contacts },
                { key: 'faq' as const, label: t.menu.faq },
              ].map(({ key, label }) => (
                <button
                  key={key}
                  onClick={() => onNavigate(key)}
                  className="text-center text-base text-white/40 hover:text-[#c9a84c] transition-colors duration-200"
                >
                  {label}
                </button>
              ))}
            </nav>
          </div>

          {/* Contacts - right */}
          <div className="flex flex-col items-center flex-shrink-0">
            <h3 className="text-sm font-semibold uppercase tracking-widest text-[#c9a84c]/70 mb-4">
              {lang === 'RU' ? 'Контакты' : 'Contacts'}
            </h3>
            <div className="flex flex-col items-center gap-3">
              <div className="flex gap-3">
                {[
                  { href: 'https://instagram.com/parmainvest', icon: <Instagram size={24} /> },
                  { href: 'https://t.me/mokhova_pro', icon: <Send size={24} /> },
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
              <a href="tel:+995557520693" className="text-lg text-[#c9a84c] font-semibold hover:text-[#d4af5a] transition-colors duration-200">
                +995 557 520 693
              </a>
            </div>
          </div>
        </div>

        <div className="mt-4 border-t border-white/6 pt-4 text-center md:mt-6 md:text-left">
          <div>
            <p className="text-xs text-white/20">© 2020 PARMAINVEST. {lang === 'RU' ? 'Все права защищены.' : 'All rights reserved.'}</p>
            <button
              onClick={() => onNavigate('privacy')}
              className="mt-2 text-xs text-white/25 hover:text-white/50 transition-colors duration-200"
            >
              {privacyText[lang].title}
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}
