export type Lang = 'RU' | 'EN';
export type Page = 'home' | 'catalog' | 'about' | 'contacts' | 'property' | 'privacy' | 'faq';
export type PropertyType = 'all' | 'house' | 'land';
export type SortOrder = 'new' | 'price-asc' | 'price-desc' | 'area-asc' | 'area-desc';

export interface Property {
  id: number;
  slug: string;
  type: 'house' | 'land';
  status: string;
  location: Record<'ru' | 'en' | 'ge', string>;
  title: Record<'ru' | 'en' | 'ge', string>;
  description: Record<'ru' | 'en' | 'ge', string>;
  priceUSD: number;
  priceGEL: number;
  priceRUB: number;
  landArea: number | null;
  houseArea: number | null;
  images: string[];
  features: Record<'ru' | 'en' | 'ge', string[]>;
}

export const i18n = {
  RU: {
    menu: { catalog: 'Каталог', about: 'О нас', contacts: 'Контакты', faq: 'FAQ' },
    homeBtn: 'На главную',
    homeTitle: 'Загородная недвижимость в Грузии',
    homeText: 'Дома, виллы и земельные участки в живописных уголках страны. Подбор, проверка и сопровождение сделки под ключ.',
    cta: 'Открыть каталог',
    catalogTitle: 'Каталог загородной недвижимости',
    filters: { all: 'Все', house: 'Дома', land: 'Земельные участки', location: 'Локация', sort: 'Сортировка', min: 'Цена от, $', max: 'Цена до, $', reset: 'Сбросить' },
    sort: { new: 'Сначала новые', 'price-asc': 'Цена ↑', 'price-desc': 'Цена ↓', 'area-asc': 'Площадь ↑', 'area-desc': 'Площадь ↓' },
    details: 'Подробнее',
    contact: 'Связаться',
    page: 'Стр.',
    back: 'Назад в каталог',
    location: 'Локация',
    area: 'Площадь',
    features: 'Особенности',
    aboutTitle: 'О нас',
    aboutText: 'PARMAINVEST сфокусирован на загородной недвижимости Грузии. Мы подбираем объекты, проводим due diligence, организуем сделку и помогаем после покупки.',
    contactsTitle: 'Контакты',
    contactsText: 'Выберите удобный канал связи — соберем шортлист объектов под ваш запрос.',
    formName: 'Ваше имя',
    formPhone: 'Телефон / WhatsApp',
    formMessage: 'Сообщение',
    formSend: 'Отправить',
    faqTitle: 'FAQ',
    faqItems: [
      { q: 'Как быстро можно подобрать объекты под мой запрос?', a: 'Обычно первичный шортлист мы формируем в течение 1–2 рабочих дней после брифа.' },
      { q: 'Проверяете ли вы юридическую чистоту объекта?', a: 'Да, мы проводим базовый due diligence: документы на право собственности, обременения и историю переходов.' },
      { q: 'Можно ли купить участок и оформить сделку дистанционно?', a: 'Да, в ряде случаев возможна дистанционная подготовка и сопровождение по доверенности.' },
      { q: 'С какими типами объектов вы работаете?', a: 'Дома, виллы, земельные участки, а также инвестиционные загородные проекты в разных регионах Грузии.' },
      { q: 'Помогаете ли вы с переговорами по цене?', a: 'Да, мы сопровождаем переговоры с собственником или застройщиком и помогаем согласовать условия.' },
      { q: 'Какие расходы кроме цены объекта стоит учитывать?', a: 'Дополнительно учитываются налоги/сборы, нотариальные расходы, регистрация и услуги сопровождения.' },
      { q: 'Можно ли получить консультацию перед покупкой?', a: 'Конечно. Мы проводим вводную консультацию, чтобы определить стратегию и подходящие локации.' },
      { q: 'Сопровождаете ли вы после покупки?', a: 'Да, помогаем с пост-сделочными шагами: регистрация, базовые бытовые и организационные вопросы.' },
    ],
  },
  EN: {
    menu: { catalog: 'Catalog', about: 'About', contacts: 'Contacts', faq: 'FAQ' },
    homeBtn: 'Home',
    homeTitle: 'Country Real Estate in Georgia',
    homeText: 'Homes, villas and land plots in the most picturesque corners of the country. Full-cycle selection, legal check, and transaction support.',
    cta: 'Open Catalog',
    catalogTitle: 'Country Real Estate Catalog',
    filters: { all: 'All', house: 'Houses', land: 'Land Plots', location: 'Location', sort: 'Sort', min: 'Price from, $', max: 'Price to, $', reset: 'Reset' },
    sort: { new: 'Newest', 'price-asc': 'Price ↑', 'price-desc': 'Price ↓', 'area-asc': 'Area ↑', 'area-desc': 'Area ↓' },
    details: 'More',
    contact: 'Contact',
    page: 'Page',
    back: 'Back to catalog',
    location: 'Location',
    area: 'Area',
    features: 'Features',
    aboutTitle: 'About Us',
    aboutText: 'PARMAINVEST is focused on Georgia country real estate. We shortlist properties, run due diligence, close transactions, and support post-deal onboarding.',
    contactsTitle: 'Contacts',
    contactsText: 'Choose your preferred channel — we will prepare a shortlist for your goals.',
    formName: 'Your name',
    formPhone: 'Phone / WhatsApp',
    formMessage: 'Message',
    formSend: 'Send',
    faqTitle: 'FAQ',
    faqItems: [
      { q: 'How fast can you prepare a shortlist for my request?', a: 'We usually deliver the first shortlist within 1–2 business days after receiving your brief.' },
      { q: 'Do you check legal status of properties?', a: 'Yes. We run a basic due diligence review: title documents, encumbrances, and ownership history.' },
      { q: 'Can I buy land remotely?', a: 'In many cases yes — remote preparation and representation via power of attorney is possible.' },
      { q: 'What property types do you cover?', a: 'Houses, villas, land plots, and investment countryside projects across Georgia.' },
      { q: 'Do you assist with price negotiations?', a: 'Yes, we support negotiations with owners and developers to align terms and pricing.' },
      { q: 'What additional costs should I plan beyond price?', a: 'Typical extras include taxes/fees, notary costs, registration, and support services.' },
      { q: 'Can I get a consultation before making a decision?', a: 'Absolutely. We provide an initial consultation to define strategy and suitable locations.' },
      { q: 'Do you support clients after purchase?', a: 'Yes, we assist with post-deal onboarding: registration and key practical next steps.' },
    ],
  },
} as const;

export const privacyText = {
  RU: {
    title: 'Политика конфиденциальности',
    body: 'Оказание консультационных услуг по подбору и сопровождению сделок с недвижимостью в Грузии. Мы обрабатываем только необходимые персональные данные для связи и сопровождения сделки. Данные хранятся в защищенных системах и не передаются третьим лицам без законных оснований.',
  },
  EN: {
    title: 'Privacy Policy',
    body: 'Providing consulting services for real estate selection and transaction support in Georgia. We process only the personal data required for communication and transaction support. Data is stored in secure systems and is not shared with third parties without legal grounds.',
  },
} as const;

export function money(value: number, code: 'USD' | 'GEL' | 'RUB') {
  return `${new Intl.NumberFormat('en-US').format(value)} ${code}`;
}

export const imageModules = import.meta.glob('../imports/*.{webp,png,jpg,jpeg}', {
  eager: true,
  import: 'default',
}) as Record<string, string>;

export const imagePath = (name: string) => imageModules[`../imports/${name}`] || '';
