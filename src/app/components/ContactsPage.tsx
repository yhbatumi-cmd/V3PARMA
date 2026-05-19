import { useState } from 'react';
import { motion } from 'motion/react';
import { Instagram, Mail, MessageCircle, Phone, Send } from 'lucide-react';
import type { Lang } from '../types';
import { i18n } from '../types';

interface ContactsPageProps {
  lang: Lang;
}

export default function ContactsPage({ lang }: ContactsPageProps) {
  const t = i18n[lang];
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const text = encodeURIComponent(`${name ? name + '\n' : ''}${phone ? phone + '\n' : ''}${message}`);
    window.open(`https://t.me/parmainvest?text=${text}`, '_blank');
  };

  const channels = [
    { href: 'https://instagram.com/parmainvest', icon: <Instagram size={22} />, label: 'Instagram' },
    { href: 'https://t.me/parmainvest', icon: <Send size={22} />, label: 'Telegram' },
    { href: 'https://wa.me/995557520693', icon: <MessageCircle size={22} />, label: 'WhatsApp' },
    { href: 'tel:+995557520693', icon: <Phone size={22} />, label: lang === 'RU' ? 'Телефон' : 'Phone', handle: '+995 557 520 693' },
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
          <h1 className="text-4xl md:text-5xl font-bold text-white">{t.contactsTitle}</h1>
          <div className="mt-3 h-px w-20 bg-gradient-to-r from-transparent via-[#c9a84c] to-transparent mx-auto" />
          <p className="mt-6 text-white/55 max-w-xl mx-auto">{t.contactsText}</p>
        </motion.div>

        <div className="grid gap-8 md:grid-cols-2">
          {/* Channels */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <div className="grid gap-3">
              {channels.map((ch, i) => (
                <motion.a
                  key={ch.href}
                  href={ch.href}
                  target="_blank"
                  rel="noreferrer"
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: i * 0.08 }}
                  className="flex items-center gap-4 rounded-2xl border border-white/8 bg-white/5 p-5 transition-all duration-300 hover:border-[#c9a84c]/30 hover:bg-[#c9a84c]/5 hover:-translate-y-0.5 group"
                >
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#c9a84c]/10 text-[#c9a84c] transition-all duration-300 group-hover:bg-[#c9a84c]/20">
                    {ch.icon}
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-white">{ch.label}</p>
                    {'handle' in ch && ch.handle && <p className="text-sm text-white/45">{ch.handle}</p>}
                  </div>
                </motion.a>
              ))}
            </div>
          </motion.div>

          {/* Contact form */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <form
              onSubmit={handleSubmit}
              className="rounded-2xl border border-white/8 bg-white/5 backdrop-blur-sm p-6"
            >
              <h2 className="text-lg font-semibold text-white mb-5">
                {lang === 'RU' ? 'Написать нам' : 'Write to us'}
              </h2>
              <div className="space-y-4">
                <div>
                  <label className="block text-xs font-medium text-white/60 mb-1.5">{t.formName} <span className="text-[#c9a84c]">*</span></label>
                  <input
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder={t.formName}
                    required
                    className="w-full rounded-xl border border-white/12 bg-white/8 px-4 py-3 text-sm text-white placeholder-white/30 focus:border-[#c9a84c]/50 focus:outline-none transition-colors"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-white/60 mb-1.5">{t.formPhone} <span className="text-[#c9a84c]">*</span></label>
                  <input
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder={t.formPhone}
                    required
                    className="w-full rounded-xl border border-white/12 bg-white/8 px-4 py-3 text-sm text-white placeholder-white/30 focus:border-[#c9a84c]/50 focus:outline-none transition-colors"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-white/60 mb-1.5">{t.formMessage}</label>
                  <textarea
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder={t.formMessage}
                    rows={4}
                    className="w-full rounded-xl border border-white/12 bg-white/8 px-4 py-3 text-sm text-white placeholder-white/30 focus:border-[#c9a84c]/50 focus:outline-none transition-colors resize-none"
                  />
                </div>
                <button
                  type="submit"
                  className="w-full rounded-full bg-[#c9a84c] py-3.5 text-sm font-semibold text-white transition-all duration-200 hover:bg-[#d4af5a] hover:shadow-[0_0_20px_rgba(201,168,76,0.35)]"
                >
                  {t.formSend}
                </button>
                <p className="text-center text-xs text-white/35">
                  {lang === 'RU' ? 'Мы свяжемся с вами в течение 24 часов' : 'We will contact you within 24 hours'}
                </p>
              </div>
            </form>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
