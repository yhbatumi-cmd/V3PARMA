import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import data from '../data/georgia-properties.json';
import type { Lang, Page, Property } from './types';
import { privacyText } from './types';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import CatalogPage from './components/CatalogPage';
import PropertyPage from './components/PropertyPage';
import AboutPage from './components/AboutPage';
import ContactsPage from './components/ContactsPage';
import FAQPage from './components/FAQPage';
import Footer from './components/Footer';

const properties = data as Property[];

export default function App() {
  const [lang, setLang] = useState<Lang>('RU');
  const [page, setPage] = useState<Page>('home');
  const [selectedSlug, setSelectedSlug] = useState<string | null>(null);

  const selected = selectedSlug ? properties.find((p) => p.slug === selectedSlug) || null : null;

  const navigate = (next: Exclude<Page, 'property'>) => {
    setPage(next);
    setSelectedSlug(null);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const openProperty = (slug: string) => {
    setSelectedSlug(slug);
    setPage('property');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-[#0c0c14] text-white">
      <Navbar
        lang={lang}
        setLang={setLang}
        currentPage={page}
        onNavigate={navigate}
      />

      <AnimatePresence mode="wait">
        <motion.main
          key={page + (selectedSlug || '')}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
        >
          {page === 'home' && (
            <Hero lang={lang} onNavigate={navigate} />
          )}

          {page === 'catalog' && (
            <CatalogPage
              lang={lang}
              properties={properties}
              onSelectProperty={openProperty}
            />
          )}

          {page === 'property' && selected && (
            <PropertyPage
              property={selected}
              properties={properties}
              lang={lang}
              onBack={() => navigate('catalog')}
              onSelectProperty={openProperty}
            />
          )}

          {page === 'about' && (
            <AboutPage lang={lang} onNavigate={navigate} />
          )}

          {page === 'contacts' && (
            <ContactsPage lang={lang} />
          )}

          {page === 'faq' && (
            <FAQPage lang={lang} onNavigate={navigate} />
          )}

          {page === 'privacy' && (
            <div className="min-h-screen pt-20 pb-16 px-4">
              <div className="mx-auto max-w-3xl">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                >
                  <h1 className="text-3xl md:text-4xl font-bold text-white mb-4">
                    {privacyText[lang].title}
                  </h1>
                  <div className="h-px w-16 bg-gradient-to-r from-transparent via-[#c9a84c] to-transparent mb-8" />
                  <div className="rounded-2xl border border-white/8 bg-white/5 backdrop-blur-sm p-8">
                    <p className="text-white/60 leading-relaxed">{privacyText[lang].body}</p>
                  </div>
                </motion.div>
              </div>
            </div>
          )}
        </motion.main>
      </AnimatePresence>

      <Footer lang={lang} onNavigate={navigate} />
    </div>
  );
}
