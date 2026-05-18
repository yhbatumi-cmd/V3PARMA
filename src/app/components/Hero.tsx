import { motion } from 'motion/react';
import { ArrowRight } from 'lucide-react';
import heroBg from '../../imports/hf_20260420_131714_89deac1a-3918-4413-97ff-5b7008d8b1e0.webp';
import logoImage from '../../imports/logo-georgia-black.png';
import type { Lang, Page } from '../types';
import { i18n } from '../types';

interface HeroProps {
  lang: Lang;
  onNavigate: (page: Exclude<Page, 'property'>) => void;
}

export default function Hero({ lang, onNavigate }: HeroProps) {
  const t = i18n[lang];

  return (
    <section className="relative flex min-h-screen flex-col items-center overflow-hidden">
      {/* Background image */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url(${heroBg})` }}
      />
      {/* Gradient overlays */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#0c0c14]/70 via-[#0c0c14]/50 to-[#0c0c14]/90" />
      <div className="absolute inset-0 bg-gradient-to-r from-[#0c0c14]/30 via-transparent to-[#0c0c14]/30" />

      {/* Gold glow accent */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] bg-[#c9a84c]/8 rounded-full blur-3xl pointer-events-none" />

      <div className="relative z-10 flex flex-col items-center text-center px-4 pt-20 md:pt-24 max-w-5xl mx-auto w-full">
        {/* Logo */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <img
            src={logoImage}
            alt="PARMAINVEST"
            className="h-40 md:h-52 w-auto object-contain mx-auto"
            style={{ filter: 'invert(1) drop-shadow(0 2px 12px rgba(201,168,76,0.5))' }}
          />
        </motion.div>

        {/* Headline */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="mt-2 text-4xl md:text-6xl lg:text-7xl font-bold text-white leading-tight tracking-tight"
        >
          {t.homeTitle}
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="mt-3 max-w-2xl text-lg md:text-xl text-white/75 leading-relaxed"
        >
          {t.homeText}
        </motion.p>

        {/* CTA Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="mt-6 flex justify-center"
        >
          <button
            onClick={() => onNavigate('catalog')}
            className="group flex items-center gap-2 rounded-full bg-[#c9a84c] px-8 py-3.5 text-base font-semibold text-white shadow-[0_0_24px_rgba(201,168,76,0.35)] transition-all duration-300 hover:bg-[#d4af5a] hover:shadow-[0_0_36px_rgba(201,168,76,0.55)] hover:-translate-y-0.5"
          >
            {t.cta}
            <ArrowRight size={18} className="transition-transform duration-300 group-hover:translate-x-1" />
          </button>
        </motion.div>
      </div>
    </section>
  );
}
