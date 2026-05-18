import { useMemo, useState } from 'react';
import { motion } from 'motion/react';
import { ChevronLeft, ChevronRight, SlidersHorizontal } from 'lucide-react';
import type { Lang, Property, PropertyType, SortOrder } from '../types';
import { i18n } from '../types';
import PropertyCard from './PropertyCard';

const perPage = 6;

function getSettlementName(location: string, lang: Lang) {
  const clean = (value: string) => value.replace(/\s*\([^)]*\)/g, '').trim();
  const parts = location.split(',').map(clean).filter(Boolean);
  const first = parts[0] ?? location;
  const second = parts[1];

  if (second && ['Батуми', 'Batumi'].includes(first)) return second;
  if (second && (first.startsWith('Пляж') || first.includes('Beach'))) return second;
  if (lang === 'EN' && first === 'Bakuriani Ski Resort') return 'Bakuriani';
  if (lang === 'RU' && first === 'Винный регион Кахетии') return 'Кахетия';
  if (lang === 'EN' && first === 'Kakheti Wine Region') return 'Kakheti';

  return first;
}

interface CatalogPageProps {
  lang: Lang;
  properties: Property[];
  onSelectProperty: (slug: string) => void;
}

export default function CatalogPage({ lang, properties, onSelectProperty }: CatalogPageProps) {
  const t = i18n[lang];
  const lk = lang.toLowerCase() as 'ru' | 'en';

  const [kind, setKind] = useState<PropertyType>('all');
  const [location, setLocation] = useState('all');
  const [sort, setSort] = useState<SortOrder>('new');
  const [minPrice, setMinPrice] = useState('');
  const [maxPrice, setMaxPrice] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [filtersOpen, setFiltersOpen] = useState(false);
  const [currency, setCurrency] = useState<'USD' | 'GEL'>('USD');

  const locations = useMemo(
    () => {
      const names = new Set(properties.map((p) => getSettlementName(p.location[lk], lang)));
      return ['all', ...Array.from(names).sort((a, b) => a.localeCompare(b, lang === 'RU' ? 'ru' : 'en'))];
    },
    [properties, lk, lang]
  );

  const filtered = useMemo(() => {
    const min = minPrice ? Number(minPrice) : 0;
    const max = maxPrice ? Number(maxPrice) : Number.MAX_SAFE_INTEGER;
    const list = properties.filter((p) => {
      if (kind !== 'all' && p.type !== kind) return false;
      if (location !== 'all' && getSettlementName(p.location[lk], lang) !== location) return false;
      return p.priceUSD >= min && p.priceUSD <= max;
    });
    return list.sort((a, b) => {
      if (sort === 'price-asc') return a.priceUSD - b.priceUSD;
      if (sort === 'price-desc') return b.priceUSD - a.priceUSD;
      const aa = (a.type === 'land' ? a.landArea : a.houseArea) ?? 0;
      const bb = (b.type === 'land' ? b.landArea : b.houseArea) ?? 0;
      if (sort === 'area-asc') return aa - bb;
      if (sort === 'area-desc') return bb - aa;
      return b.id - a.id;
    });
  }, [kind, location, lk, lang, minPrice, maxPrice, sort, properties]);

  const pages = Math.max(1, Math.ceil(filtered.length / perPage));
  const list = filtered.slice((currentPage - 1) * perPage, currentPage * perPage);

  const resetFilters = () => {
    setKind('all');
    setLocation('all');
    setSort('new');
    setMinPrice('');
    setMaxPrice('');
    setCurrentPage(1);
  };

  const selectKind = (k: PropertyType) => {
    setKind(k);
    setCurrentPage(1);
  };

  return (
    <div className="min-h-screen pt-20 pb-16 px-4">
      <div className="mx-auto max-w-7xl">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-8 text-center"
        >
          <h1 className="text-4xl md:text-5xl font-bold text-white">
            {t.catalogTitle}
          </h1>
          <div className="mt-3 h-px w-20 bg-gradient-to-r from-transparent via-[#c9a84c] to-transparent mx-auto" />
        </motion.div>

        {/* Currency + Filters toggle */}
        <div className="mb-4 flex items-center justify-between">
          <div className="flex gap-1 rounded-full bg-white/10 p-0.5">
            {(['USD', 'GEL'] as const).map((c) => (
              <button
                key={c}
                onClick={() => setCurrency(c)}
                className={`h-8 min-w-12 rounded-full px-3 text-sm font-semibold transition-all duration-200 ${
                  currency === c
                    ? 'bg-[#c9a84c] text-white shadow-[0_0_8px_rgba(201,168,76,0.5)]'
                    : 'text-white/60 hover:text-white'
                }`}
              >
                {c}
              </button>
            ))}
          </div>
          <button
            onClick={() => setFiltersOpen((v) => !v)}
            className="flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-white/60 transition hover:border-[#c9a84c]/40 hover:text-[#c9a84c]"
          >
            <SlidersHorizontal size={15} />
            {filtersOpen ? (lang === 'RU' ? 'Скрыть фильтры' : 'Hide filters') : (lang === 'RU' ? 'Показать фильтры' : 'Show filters')}
          </button>
        </div>

        {/* Filters bar */}
        {filtersOpen && (
          <motion.section
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="mb-8 rounded-2xl border border-white/8 bg-white/5 backdrop-blur-sm p-5"
          >
            <div className="grid gap-4 sm:grid-cols-2">
              {/* Type pills */}
              <div className="flex flex-wrap items-center gap-2 sm:col-span-2">
                {(['all', 'house', 'land'] as PropertyType[]).map((k) => (
                  <button
                    key={k}
                    onClick={() => selectKind(k)}
                    className={`rounded-full border px-4 py-2 text-sm font-medium transition-all duration-200 ${
                      kind === k
                        ? 'border-[#c9a84c] bg-[#c9a84c] text-white shadow-[0_0_12px_rgba(201,168,76,0.3)]'
                        : 'border-white/15 text-white/60 hover:border-[#c9a84c]/50 hover:text-[#c9a84c]'
                    }`}
                  >
                    {k === 'all' ? t.filters.all : k === 'house' ? t.filters.house : t.filters.land}
                  </button>
                ))}
              </div>

              {/* Location */}
              <select
                value={location}
                onChange={(e) => { setLocation(e.target.value); setCurrentPage(1); }}
                className="min-w-0 w-full rounded-xl border border-white/15 bg-white/8 px-3 py-2.5 text-sm text-white/80 focus:border-[#c9a84c]/50 focus:outline-none backdrop-blur-sm"
              >
                <option value="all" className="bg-[#1a1a2e]">{t.filters.location}</option>
                {locations.slice(1).map((loc) => (
                  <option key={loc} value={loc} className="bg-[#1a1a2e]">{loc}</option>
                ))}
              </select>

              {/* Sort */}
              <select
                value={sort}
                onChange={(e) => { setSort(e.target.value as SortOrder); setCurrentPage(1); }}
                className="min-w-0 w-full rounded-xl border border-white/15 bg-white/8 px-3 py-2.5 text-sm text-white/80 focus:border-[#c9a84c]/50 focus:outline-none backdrop-blur-sm"
              >
                {Object.entries(t.sort).map(([k, v]) => (
                  <option key={k} value={k} className="bg-[#1a1a2e]">{v}</option>
                ))}
              </select>

              {/* Reset */}
              <button
                onClick={resetFilters}
                className="min-w-0 w-full rounded-xl border border-white/15 bg-white/5 px-3 py-2.5 text-sm text-white/60 transition-all duration-200 hover:border-[#c9a84c]/40 hover:text-[#c9a84c]"
              >
                {t.filters.reset}
              </button>

              <input
                value={minPrice}
                onChange={(e) => { setMinPrice(e.target.value); setCurrentPage(1); }}
                placeholder={t.filters.min}
                inputMode="numeric"
                className="min-w-0 w-full rounded-xl border border-white/15 bg-white/8 px-3 py-2.5 text-sm text-white/80 placeholder-white/30 focus:border-[#c9a84c]/50 focus:outline-none backdrop-blur-sm"
              />
              <input
                value={maxPrice}
                onChange={(e) => { setMaxPrice(e.target.value); setCurrentPage(1); }}
                placeholder={t.filters.max}
                inputMode="numeric"
                className="min-w-0 w-full rounded-xl border border-white/15 bg-white/8 px-3 py-2.5 text-sm text-white/80 placeholder-white/30 focus:border-[#c9a84c]/50 focus:outline-none backdrop-blur-sm"
              />
            </div>
          </motion.section>
        )}

        {/* Results count */}
        <p className="mb-6 text-sm text-white/40">
          {lang === 'RU' ? `Найдено объектов: ${filtered.length}` : `Properties found: ${filtered.length}`}
        </p>

        {/* Grid */}
        <section className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {list.map((p) => (
            <PropertyCard key={p.id} property={p} lang={lang} onSelect={onSelectProperty} currency={currency} />
          ))}
        </section>

        {/* Pagination */}
        {pages > 1 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="mt-10 flex items-center justify-center gap-3"
          >
            <button
              onClick={() => setCurrentPage((v) => Math.max(1, v - 1))}
              disabled={currentPage === 1}
              className="rounded-full border border-white/15 bg-white/5 p-2.5 text-white/70 transition hover:border-[#c9a84c]/50 hover:text-[#c9a84c] disabled:opacity-30 disabled:cursor-not-allowed"
            >
              <ChevronLeft size={18} />
            </button>
            <span className="text-sm text-white/60">
              {t.page} {currentPage} / {pages}
            </span>
            <button
              onClick={() => setCurrentPage((v) => Math.min(pages, v + 1))}
              disabled={currentPage === pages}
              className="rounded-full border border-white/15 bg-white/5 p-2.5 text-white/70 transition hover:border-[#c9a84c]/50 hover:text-[#c9a84c] disabled:opacity-30 disabled:cursor-not-allowed"
            >
              <ChevronRight size={18} />
            </button>
          </motion.div>
        )}
      </div>
    </div>
  );
}
