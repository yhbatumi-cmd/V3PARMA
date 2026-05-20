import { useState } from 'react';
import { motion } from 'motion/react';
import { ArrowLeft, ArrowRight, ChevronLeft, ChevronRight, MapPin, Maximize2, MessageCircle, Send } from 'lucide-react';
import type { Lang, Property } from '../types';
import { i18n, imagePath, money } from '../types';

interface PropertyPageProps {
  property: Property;
  properties?: Property[];
  lang: Lang;
  onBack: () => void;
  onSelectProperty?: (slug: string) => void;
}

export default function PropertyPage({ property: p, properties = [], lang, onBack, onSelectProperty }: PropertyPageProps) {
  const t = i18n[lang];
  const lk = lang.toLowerCase() as 'ru' | 'en';
  const [galleryIndex, setGalleryIndex] = useState(0);

  const images = p.images.map(imagePath).filter(Boolean);
  const mainImage = images[galleryIndex] || images[0] || '';
  const prev = () => setGalleryIndex((i) => (i === 0 ? images.length - 1 : i - 1));
  const next = () => setGalleryIndex((i) => (i === images.length - 1 ? 0 : i + 1));

  const waText = encodeURIComponent(`${lang === 'RU' ? 'Интересует объект' : 'Interested in property'}: ${p.title[lk]}`);
  const tgText = encodeURIComponent(`${lang === 'RU' ? 'Интересует объект' : 'Interested in property'}: ${p.title[lk]}`);

  const similar = properties.filter((prop) => prop.slug !== p.slug && prop.type === p.type).slice(0, 3);

  return (
    <div className="min-h-screen pt-20 pb-16 px-4">
      <div className="mx-auto max-w-6xl">
        {/* Back button */}
        <motion.button
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.4 }}
          onClick={onBack}
          className="mb-8 flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-5 py-2.5 text-sm text-white/70 transition-all duration-200 hover:border-[#c9a84c]/40 hover:text-[#c9a84c]"
        >
          <ArrowLeft size={16} />
          {t.back}
        </motion.button>

        <div className="grid gap-8 lg:grid-cols-5">
          {/* Gallery — left, wider */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="lg:col-span-3"
          >
            {/* Main image */}
            <div className="relative overflow-hidden rounded-2xl border border-white/8">
              <img
                src={mainImage}
                alt={p.title[lk]}
                className="h-72 w-full object-cover md:h-[440px]"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0c0c14]/50 via-transparent to-transparent" />

              {images.length > 1 && (
                <>
                  <button
                    onClick={prev}
                    className="absolute left-3 top-1/2 -translate-y-1/2 rounded-full bg-black/50 p-2.5 text-white backdrop-blur-sm transition hover:bg-[#c9a84c]"
                  >
                    <ChevronLeft size={20} />
                  </button>
                  <button
                    onClick={next}
                    className="absolute right-3 top-1/2 -translate-y-1/2 rounded-full bg-black/50 p-2.5 text-white backdrop-blur-sm transition hover:bg-[#c9a84c]"
                  >
                    <ChevronRight size={20} />
                  </button>
                  <div className="absolute bottom-3 right-3 rounded-full bg-black/50 px-3 py-1 text-xs text-white backdrop-blur-sm">
                    {galleryIndex + 1} / {images.length}
                  </div>
                </>
              )}
            </div>

            {/* Thumbnails */}
            {images.length > 1 && (
              <div className="mt-3 grid grid-cols-5 gap-2 md:grid-cols-6">
                {images.map((img, idx) => (
                  <button
                    key={img + idx}
                    onClick={() => setGalleryIndex(idx)}
                    className={`overflow-hidden rounded-lg border-2 transition-all duration-200 ${
                      galleryIndex === idx
                        ? 'border-[#c9a84c] shadow-[0_0_8px_rgba(201,168,76,0.4)]'
                        : 'border-transparent opacity-60 hover:opacity-100'
                    }`}
                  >
                    <img src={img} alt="" className="h-14 w-full object-cover" />
                  </button>
                ))}
              </div>
            )}
          </motion.div>

          {/* Details — right */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="lg:col-span-2"
          >
            {/* Badge */}
            <span className="inline-block rounded-full bg-[#c9a84c]/15 border border-[#c9a84c]/30 px-3 py-1 text-xs font-semibold text-[#c9a84c]">
              {p.type === 'house' ? t.filters.house : t.filters.land}
            </span>

            <h1 className="mt-3 text-2xl md:text-3xl font-bold text-white leading-snug">
              {p.title[lk]}
            </h1>

            {/* Price */}
            <div className="mt-4 rounded-xl border border-[#c9a84c]/20 bg-[#c9a84c]/5 p-4">
              <p className="text-2xl font-bold text-[#c9a84c]">{money(p.priceUSD, 'USD')}</p>
              <p className="mt-1 text-sm text-white/50">{money(p.priceGEL, 'GEL')}</p>
              <p className="text-sm text-white/50">{money(p.priceRUB, 'RUB')}</p>
            </div>

            {/* Meta */}
            <div className="mt-4 space-y-2">
              <div className="flex items-center gap-2 text-sm text-white/60">
                <MapPin size={15} className="text-[#c9a84c]/70 shrink-0" />
                <span>{t.location}: <span className="text-white/80">{p.location[lk]}</span></span>
              </div>
              <div className="flex items-center gap-2 text-sm text-white/60">
                <Maximize2 size={15} className="text-[#c9a84c]/70 shrink-0" />
                <span>
                  {t.area}:{' '}
                  <span className="text-white/80">
                    {p.type === 'land'
                      ? `${p.landArea ?? 0} m²`
                      : `${p.houseArea ?? 0} m² / ${p.landArea ?? 0} m²`}
                  </span>
                </span>
              </div>
            </div>

            {/* Description */}
            <p className="mt-5 text-sm leading-relaxed text-white/60">
              {p.description[lk]}
            </p>

            {/* Features */}
            {p.features[lk].length > 0 && (
              <div className="mt-5">
                <h3 className="text-sm font-semibold uppercase tracking-widest text-[#c9a84c]/80">
                  {t.features}
                </h3>
                <ul className="mt-3 space-y-2">
                  {p.features[lk].map((f) => (
                    <li key={f} className="flex items-start gap-2 text-sm text-white/60">
                      <span className="mt-0.5 text-[#c9a84c] shrink-0">✓</span>
                      {f}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* CTA buttons */}
            <div className="mt-8 flex flex-col gap-3">
              <a
                href={`https://t.me/mokhova_pro?text=${tgText}`}
                target="_blank"
                rel="noreferrer"
                className="flex items-center justify-center gap-2 rounded-full bg-[#c9a84c] py-3.5 text-sm font-semibold text-white transition-all duration-200 hover:bg-[#d4af5a] hover:shadow-[0_0_20px_rgba(201,168,76,0.35)]"
              >
                <Send size={16} />
                Telegram
              </a>
              <a
                href={`https://wa.me/995557520693?text=${waText}`}
                target="_blank"
                rel="noreferrer"
                className="flex items-center justify-center gap-2 rounded-full border border-[#c9a84c]/30 bg-transparent py-3.5 text-sm font-medium text-[#c9a84c]/80 transition-all duration-200 hover:border-[#c9a84c] hover:text-[#c9a84c] hover:bg-[#c9a84c]/8"
              >
                <MessageCircle size={16} />
                WhatsApp
              </a>
            </div>
          </motion.div>
        </div>

        {/* Similar properties */}
        {similar.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="mt-16"
          >
            <h2 className="text-2xl font-bold text-white mb-2">
              {lang === 'RU' ? 'Похожие объекты' : 'Similar Properties'}
            </h2>
            <div className="h-px w-16 bg-gradient-to-r from-transparent via-[#c9a84c] to-transparent mb-6" />
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {similar.map((sp) => {
                const spImg = imagePath(sp.images[0]);
                return (
                  <motion.button
                    key={sp.slug}
                    onClick={() => onSelectProperty && onSelectProperty(sp.slug)}
                    whileHover={{ y: -4 }}
                    transition={{ duration: 0.2 }}
                    className="text-left overflow-hidden rounded-2xl border border-white/8 bg-white/5 hover:border-[#c9a84c]/30 transition-colors duration-300"
                  >
                    <div className="relative h-44 overflow-hidden">
                      <img src={spImg} alt={sp.title[lk]} className="h-full w-full object-cover" />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#0c0c14]/60 via-transparent to-transparent" />
                      <p className="absolute bottom-3 left-3 text-lg font-bold text-[#c9a84c] drop-shadow">{money(sp.priceUSD, 'USD')}</p>
                    </div>
                    <div className="p-4">
                      <p className="text-sm font-semibold text-white line-clamp-2">{sp.title[lk]}</p>
                      <p className="mt-1 text-xs text-white/45">{sp.location[lk]}</p>
                    </div>
                  </motion.button>
                );
              })}
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
}
