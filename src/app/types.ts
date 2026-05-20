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
  badge?: string;
  oldPriceUSD?: number;
  oldPriceGEL?: number;
  oldPriceRUB?: number;
}

export const i18n = {
  RU: {
    menu: { catalog: 'Каталог', about: 'О нас', contacts: 'Контакты', faq: 'FAQ' },
    homeBtn: 'На главную',
    homeTitle: 'Загородная недвижимость в Грузии',
    homeText: 'Дома, виллы и земельные участки в живописных уголках страны. Подбор, проверка и сопровождение сделки под ключ.',
    cta: 'Открыть каталог',
    catalogTitle: 'Каталог загородной недвижимости',
    filters: { all: 'Все', house: 'Дома', land: 'Участки', location: 'Локация', sort: 'Сортировка', min: 'Цена от, $', max: 'Цена до, $', reset: 'Сбросить' },
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
    contactsText: 'Выберите удобный канал связи - соберем шортлист объектов под ваш запрос.',
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
    filters: { all: 'All', house: 'Houses', land: 'Plots', location: 'Location', sort: 'Sort', min: 'Price from, $', max: 'Price to, $', reset: 'Reset' },
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
    contactsText: 'Choose your preferred channel - we will prepare a shortlist for your goals.',
    formName: 'Your name',
    formPhone: 'Phone / WhatsApp',
    formMessage: 'Message',
    formSend: 'Send',
    faqTitle: 'FAQ',
    faqItems: [
      { q: 'How fast can you prepare a shortlist for my request?', a: 'We usually deliver the first shortlist within 1–2 business days after receiving your brief.' },
      { q: 'Do you check legal status of properties?', a: 'Yes. We run a basic due diligence review: title documents, encumbrances, and ownership history.' },
      { q: 'Can I buy land remotely?', a: 'In many cases yes - remote preparation and representation via power of attorney is possible.' },
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
    body: `1. Общие положения

Настоящая Политика конфиденциальности регулирует порядок обработки и защиты персональных данных пользователей сайта PARMAINVEST (далее — «Сайт»).

Используя Сайт, пользователь подтверждает согласие с условиями настоящей Политики конфиденциальности.

Администрация Сайта уважает право пользователей на конфиденциальность и принимает разумные организационные и технические меры для защиты персональных данных в соответствии с применимым международным законодательством о защите данных.

2. Какие данные могут собираться

При использовании Сайта могут собираться следующие данные: имя; номер телефона; адрес электронной почты; информация из форм обратной связи; данные через мессенджеры и соцсети; IP-адрес; cookies; тип устройства и браузер; данные посещаемости и аналитики.

Пользователь предоставляет данные добровольно через формы Сайта, мессенджеры или иные каналы коммуникации.

3. Цели обработки данных

Персональные данные могут использоваться для: связи с пользователем; обработки запросов и заявок; предоставления информации об объектах недвижимости и инвестиционных возможностях; организации сопровождения сделок; улучшения работы Сайта; аналитики и маркетинга; отправки информационных и рекламных материалов при наличии согласия.

4. Передача данных третьим лицам

Администрация Сайта не продаёт персональные данные третьим лицам. Передача возможна только: если это необходимо для оказания услуг; партнёрам, участвующим в сопровождении сделок; сторонним сервисам аналитики, CRM, хостинга, рекламных платформ; если такой передачи требует применимое законодательство.

5. Международная обработка данных

Сайт ориентирован на международную аудиторию. Пользователь понимает и соглашается, что его персональные данные могут обрабатываться, храниться и передаваться в различные юрисдикции.

6. Информация для пользователей из Российской Федерации

Если пользователь является гражданином РФ или предоставляет данные с территории РФ, обработка осуществляется в соответствии с Требованиями Федерального закона №152-ФЗ «О персональных данных». Отправляя данные, пользователь выражает согласие на их обработку, хранение и возможную трансграничную передачу.

7. Cookies и аналитика

Сайт может использовать cookies, пиксели, системы аналитики и рекламные инструменты для корректной работы, анализа посещаемости, улучшения пользовательского опыта и персонализации контента. Пользователь может ограничить использование cookies через настройки браузера.

8. Защита данных

Администрация Сайта принимает разумные меры для защиты персональных данных от несанкционированного доступа, изменения, раскрытия и уничтожения. Передача информации через интернет не может быть гарантирована как абсолютно безопасная.

9. Права пользователя

Пользователь вправе: запросить информацию о своих данных; потребовать их исправления или удаления; отозвать согласие на обработку; отказаться от маркетинговых сообщений. Для реализации прав свяжитесь через контакты на Сайте.

10. Ссылки на сторонние ресурсы

Сайт может содержать ссылки на сторонние сайты. Администрация Сайта не несёт ответственности за содержание и политику конфиденциальности таких ресурсов.

11. Изменения политики

Администрация Сайта оставляет за собой право изменять настоящую Политику без предварительного уведомления. Актуальная версия всегда публикуется на данной странице.`,
  },
  EN: {
    title: 'Privacy Policy',
    body: `1. General Provisions

This Privacy Policy governs the processing and protection of personal data of users of the PARMAINVEST website (hereinafter — the “Site”).

By using the Site, the user confirms their agreement with the terms of this Privacy Policy.

The Site Administration respects users’ right to privacy and takes reasonable organizational and technical measures to protect personal data in accordance with applicable international data protection legislation.

2. What Data May Be Collected

When using the Site, the following data may be collected: name; phone number; email address; information provided in contact forms; data transmitted via messengers and social networks; IP address; cookies; device type and browser; traffic and analytics data.

The user provides data voluntarily through Site forms, messengers, or other communication channels.

3. Purposes of Data Processing

Personal data may be used for: communicating with the user; processing requests and applications; providing information about real estate, investment opportunities and immigration services; organizing transaction support; improving the Site; analytics and marketing; sending informational and promotional materials with the user’s consent.

4. Transfer of Data to Third Parties

The Site Administration does not sell personal data to third parties. Transfer is possible only: if necessary for service provision; to partners involved in transaction support; to third-party analytics, CRM, hosting, and advertising services; if required by applicable law.

5. International Data Processing

The Site is aimed at an international audience. The user understands and agrees that their personal data may be processed, stored and transferred across various jurisdictions.

6. Information for Users from the Russian Federation

If the user is a citizen of the Russian Federation or provides data from Russian territory, processing is carried out in accordance with Federal Law No. 152-FZ “On Personal Data”. By submitting data, the user consents to its processing, storage and possible cross-border transfer.

7. Cookies and Analytics

The Site may use cookies, pixels, analytics systems and advertising tools for correct operation, traffic analysis, user experience improvement and content personalization. The user may restrict cookies through browser settings.

8. Data Protection

The Site Administration takes reasonable measures to protect personal data from unauthorized access, modification, disclosure and destruction. Transmission of information over the internet cannot be guaranteed as absolutely secure.

9. User Rights

The user has the right to: request information about their data; request correction or deletion; withdraw consent; opt out of marketing. To exercise these rights, contact the Site Administration through the contact details on the Site.

10. Links to Third-Party Resources

The Site may contain links to third-party sites. The Site Administration is not responsible for the content or privacy policies of such resources.

11. Policy Changes

The Site Administration reserves the right to amend this Policy without prior notice. The current version is always published on this page.`,
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
