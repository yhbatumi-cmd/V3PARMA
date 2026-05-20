import { motion } from 'motion/react';
import { ArrowRight, CheckCircle, Globe, Shield, Users } from 'lucide-react';
import type { Lang, Page } from '../types';
import { i18n } from '../types';

interface AboutPageProps {
  lang: Lang;
  onNavigate?: (page: Exclude<Page, 'property'>) => void;
}

export default function AboutPage({ lang, onNavigate }: AboutPageProps) {
  const t = i18n[lang];

  const features = lang === 'RU'
    ? [
        { icon: <Globe size={22} />, title: 'Рынок Грузии', text: 'Глубокое знание рынка загородной недвижимости Батуми и регионов.' },
        { icon: <Shield size={22} />, title: 'Due Diligence', text: 'Проверяем документы, обременения и историю объекта.' },
        { icon: <Users size={22} />, title: 'Под ключ', text: 'От подбора до сделки и постпродажного сопровождения.' },
        { icon: <CheckCircle size={22} />, title: 'Честно', text: 'Только реальные объекты, актуальные цены и прозрачные условия.' },
      ]
    : [
        { icon: <Globe size={22} />, title: 'Georgia Market', text: 'Deep knowledge of Batumi and regional countryside real estate.' },
        { icon: <Shield size={22} />, title: 'Due Diligence', text: 'We verify documents, encumbrances, and property history.' },
        { icon: <Users size={22} />, title: 'Full Cycle', text: 'From search to closing and post-deal support.' },
        { icon: <CheckCircle size={22} />, title: 'Transparent', text: 'Only real listings, current prices, and clear terms.' },
      ];

  return (
    <div className="min-h-screen pt-20 pb-16 px-4">
      <div className="mx-auto max-w-5xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl md:text-5xl font-bold text-white">{t.aboutTitle}</h1>
          <div className="mt-3 h-px w-20 bg-gradient-to-r from-transparent via-[#c9a84c] to-transparent mx-auto" />
        </motion.div>

        <div className="grid gap-8 md:grid-cols-2">
          {/* Main text card */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="rounded-2xl border border-white/8 bg-white/5 backdrop-blur-sm p-8"
          >
            <h2 className="text-2xl font-bold text-[#c9a84c] mb-4">PARMAINVEST.</h2>
            <p className="text-white/65 leading-relaxed text-base">
              {lang === 'RU'
                ? 'PARMAINVEST. - компания, специализирующаяся на загородной недвижимости Грузии. Мы помогаем клиентам безопасно и эффективно приобретать дома, виллы и земельные участки, обеспечивая полный цикл сопровождения: от подбора объекта и юридической проверки, до организации сделки под ключ.'
                : 'PARMAINVEST. is a company specializing in countryside real estate in Georgia. We help clients safely and effectively acquire homes, villas and land plots, providing a full cycle of support: from property selection and legal verification to turnkey transaction management.'}
            </p>

            <ul className="mt-6 flex flex-col items-start gap-2 sm:flex-row sm:flex-wrap sm:items-center sm:justify-center sm:gap-x-6 sm:gap-y-2">
              {[
                lang === 'RU' ? 'Черноморское побережье' : 'Black Sea coast',
                lang === 'RU' ? 'Горные районы Грузии' : 'Mountain regions of Georgia',
                lang === 'RU' ? 'Пригороды Батуми' : 'Batumi suburbs',
              ].map((item) => (
                <li key={item} className="flex items-center gap-2 text-lg text-white/70">
                  <span className="h-1.5 w-1.5 rounded-full bg-[#c9a84c] flex-shrink-0" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Feature grid */}
          <div className="grid gap-4 sm:grid-cols-2">
            {features.map((f, i) => (
              <motion.div
                key={f.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="rounded-2xl border border-white/8 bg-white/5 backdrop-blur-sm p-5 hover:border-[#c9a84c]/20 transition-colors duration-300"
              >
                <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-xl bg-[#c9a84c]/10 text-[#c9a84c]">
                  {f.icon}
                </div>
                <h3 className="text-base font-semibold text-white">{f.title}</h3>
                <p className="mt-1 text-sm text-white/50 leading-relaxed">{f.text}</p>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Mission statement + CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mt-10 rounded-2xl border border-[#c9a84c]/20 bg-[#c9a84c]/5 p-8 text-center"
        >
          <p className="text-white text-xl leading-relaxed max-w-2xl mx-auto font-medium">
            {lang === 'RU'
              ? 'Наша миссия - помочь каждому клиенту найти правильный объект в Грузии с минимальными рисками и максимальным комфортом в процессе.'
              : 'Our mission is to help every client find the right property in Georgia with minimal risk and maximum comfort throughout the process.'}
          </p>
          <button
            onClick={() => onNavigate && onNavigate('catalog')}
            className="mt-6 inline-flex items-center gap-2 rounded-full bg-[#c9a84c] px-8 py-3.5 text-sm font-semibold text-white transition-all duration-200 hover:bg-[#d4af5a] hover:shadow-[0_0_20px_rgba(201,168,76,0.35)]"
          >
            {lang === 'RU' ? 'Посмотреть каталог' : 'Browse Catalog'}
            <ArrowRight size={16} />
          </button>
        </motion.div>
      </div>
    </div>
  );
}
