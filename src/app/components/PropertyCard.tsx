import { motion } from 'motion/react';
import { MapPin, Maximize2, Send } from 'lucide-react';
import type { Lang, Property } from '../types';
import { i18n, imagePath, money } from '../types';

interface PropertyCardProps {
  property: Property;
  lang: Lang;
  onSelect: (slug: string) => void;
  currency?: 'USD' | 'GEL';
}

export default function PropertyCard({ property: p, lang, onSelect, currency = 'USD' }: PropertyCardProps) {
  const t = i18n[lang];
  const lk = lang.toLowerCase() as 'ru' | 'en';
  const img = imagePath(p.images[0]);
  const displayArea = p.type === 'land' ? p.landArea : p.houseArea;

  return (
    <motion.article
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.5 }}
      onClick={() => onSelect(p.slug)}
      className="group cursor-pointer overflow-hidden rounded-2xl border border-white/8 bg-white/5 backdrop-blur-sm transition-all duration-400 hover:-translate-y-1 hover:border-[#c9a84c]/30 hover:shadow-[0_8px_40px_rgba(201,168,76,0.12)]"
    >
      {/* Image */}
      <div className="relative overflow-hidden h-56">
        <img
          src={img}
          alt={p.title[lk]}
          className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0c0c14]/70 via-transparent to-transparent" />
        {/* Type badge */}
        <div className="absolute top-3 left-3 flex gap-2">
          <span className="rounded-full bg-[#c9a84c] px-3 py-1 text-xs font-semibold text-white shadow-[0_0_12px_rgba(201,168,76,0.4)]">
            {p.type === 'house' ? t.filters.house : t.filters.land}
          </span>
          {p.badge === 'HOT' && (
            <span className="rounded-full bg-red-500 px-3 py-1 text-xs font-bold text-white shadow-[0_0_12px_rgba(239,68,68,0.6)] animate-pulse">
              🔥 HOT
            </span>
          )}
        </div>
        {/* Price overlay */}
        <div className="absolute bottom-3 left-3 right-3">
          {p.oldPriceUSD && (
            <p className="text-sm text-white/50 line-through">
              {currency === 'GEL' ? money(p.oldPriceGEL!, 'GEL') : money(p.oldPriceUSD, 'USD')}
            </p>
          )}
          <p className="text-xl font-bold text-[#c9a84c] drop-shadow-lg">{currency === 'GEL' ? money(p.priceGEL, 'GEL') : money(p.priceUSD, 'USD')}</p>
        </div>
      </div>

      {/* Body */}
      <div className="p-5">
        <h3 className="text-lg font-semibold text-white leading-snug line-clamp-2 group-hover:text-[#d4af5a] transition-colors duration-200">
          {p.title[lk]}
        </h3>

        <div className="mt-3 flex items-center gap-4 text-sm text-white/50">
          <span className="flex items-center gap-1.5">
            <MapPin size={14} className="text-[#c9a84c]/70" />
            {p.location[lk]}
          </span>
          {displayArea && (
            <span className="flex items-center gap-1.5">
              <Maximize2 size={14} className="text-[#c9a84c]/70" />
              {displayArea} m²
            </span>
          )}
        </div>

        <div className="mt-3 space-y-0.5 text-sm text-white/40">
          {currency === 'GEL' ? <p>{money(p.priceUSD, 'USD')}</p> : <p>{money(p.priceGEL, 'GEL')}</p>}
          <p>{money(p.priceRUB, 'RUB')}</p>
        </div>

        {/* Actions */}
        <div className="mt-5 flex gap-3">
          <button
            onClick={(e) => { e.stopPropagation(); onSelect(p.slug); }}
            className="flex-1 rounded-full bg-[#c9a84c] py-2.5 text-sm font-semibold text-white transition-all duration-200 hover:bg-[#d4af5a] hover:shadow-[0_0_16px_rgba(201,168,76,0.35)]"
          >
            {t.details}
          </button>
          <a
            href="https://t.me/mokhova_pro"
            target="_blank"
            rel="noreferrer"
            onClick={(e) => e.stopPropagation()}
            className="flex items-center justify-center gap-2 rounded-full border border-[#c9a84c]/30 bg-transparent px-4 py-2.5 text-sm font-medium text-[#c9a84c]/80 transition-all duration-200 hover:border-[#c9a84c] hover:text-[#c9a84c] hover:bg-[#c9a84c]/10"
          >
            <Send size={14} />
            {t.contact}
          </a>
        </div>
      </div>
    </motion.article>
  );
}
