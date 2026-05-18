import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronDown, Send } from 'lucide-react';
import type { Lang, Page } from '../types';
import { i18n } from '../types';

interface FAQPageProps {
  lang: Lang;
  onNavigate?: (page: Exclude<Page, 'property'>) => void;
}



export default function FAQPage({ lang, onNavigate }: FAQPageProps) {
  const t = i18n[lang];
  const [openIdx, setOpenIdx] = useState<number | null>(0);

  return (
    <div className="min-h-screen pt-20 pb-16 px-4">
      <div className="mx-auto max-w-3xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl md:text-5xl font-bold text-white">{t.faqTitle}</h1>
          <div className="mt-3 h-px w-20 bg-gradient-to-r from-transparent via-[#c9a84c] to-transparent mx-auto" />
        </motion.div>

        <div className="space-y-3">
          {t.faqItems.map((item, idx) => (
            <motion.div
              key={item.q}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: idx * 0.05 }}
              className={`rounded-2xl border transition-all duration-300 ${
                openIdx === idx
                  ? 'border-[#c9a84c]/30 bg-[#c9a84c]/5'
                  : 'border-white/8 bg-white/5 hover:border-white/15'
              }`}
            >
              <button
                onClick={() => setOpenIdx(openIdx === idx ? null : idx)}
                className="flex w-full items-center justify-between gap-4 px-6 py-5 text-left"
              >
                <span className="text-sm md:text-base font-medium text-white leading-snug">
                  <span className="text-[#c9a84c] mr-2 font-semibold">{idx + 1}.</span>
                  {item.q}
                </span>
                <motion.div
                  animate={{ rotate: openIdx === idx ? 180 : 0 }}
                  transition={{ duration: 0.25 }}
                  className="shrink-0 text-[#c9a84c]/70"
                >
                  <ChevronDown size={22} />
                </motion.div>
              </button>

              <AnimatePresence initial={false}>
                {openIdx === idx && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.25 }}
                    className="overflow-hidden"
                  >
                    <p className="px-6 pb-5 text-sm text-white/55 leading-relaxed">
                      {item.a}
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>

        {/* CTA block */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mt-12 rounded-2xl border border-[#c9a84c]/20 bg-[#c9a84c]/5 p-8 text-center"
        >
          <h3 className="text-xl font-bold text-white mb-2">
            {lang === 'RU' ? 'Остались вопросы?' : 'Still have questions?'}
          </h3>
          <p className="text-white/55 mb-6">
            {lang === 'RU'
              ? 'Свяжитесь с нами — ответим на любые вопросы.'
              : 'Contact us — we’ll answer any questions you have.'}
          </p>
          <button
            onClick={() => onNavigate && onNavigate('contacts')}
            className="inline-flex items-center gap-2 rounded-full bg-[#c9a84c] px-8 py-3.5 text-sm font-semibold text-white transition-all duration-200 hover:bg-[#d4af5a] hover:shadow-[0_0_20px_rgba(201,168,76,0.35)]"
          >
            <Send size={16} />
            {lang === 'RU' ? 'Связаться с нами' : 'Contact us'}
          </button>
        </motion.div>
      </div>
    </div>
  );
}
