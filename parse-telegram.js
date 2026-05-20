import fs from 'fs';

// Читаем Telegram JSON
const telegramData = JSON.parse(fs.readFileSync('telegram-export.json', 'utf-8'));

// Преобразуем в формат Georgia properties
const properties = telegramData.messages.map((msg, idx) => {
  const id = idx + 1;
  const area = msg.area || 0;
  const houseArea = msg.houseArea || null;
  const priceUSD = msg.price || 0;
  const priceGEL = Math.round(priceUSD * 2.7);
  const priceRUB = Math.round(priceUSD * 92);
  
  const location = msg.location || 'Грузия';
  const slug = `${location.toLowerCase()}-${area}m2-${priceUSD}`.replace(/\s+/g, '-');
  const type = houseArea ? 'house' : 'land';
  
  let title = `Земельный участок ${area} м² в ${location}`;
  if (houseArea) {
    title = `Участок ${area} м² с домом ${houseArea} м² в ${location}`;
  }
  
  const shortDesc = msg.text.substring(0, 200).replace(/[#️🌳🎋📍💼⚡💰🌿🌍📈🏗️]/g, '').trim();
  
  return {
    id,
    slug,
    type,
    status: 'new',
    location: {
      ru: location,
      en: location,
      ge: location
    },
    title: {
      ru: title,
      en: title,
      ge: title
    },
    description: {
      ru: shortDesc,
      en: shortDesc,
      ge: shortDesc
    },
    priceUSD,
    priceGEL,
    priceRUB,
    landArea: area,
    houseArea: houseArea,
    images: [],
    features: {
      ru: [
        `Площадь участка: ${area} м²`,
        `Цена: $${priceUSD.toLocaleString()}`,
        `Локация: ${location}`,
        'Статус: несельскохозяйственное назначение',
        'Доступна покупка иностранцами',
        'Все коммуникации подведены'
      ],
      en: [
        `Land area: ${area} m²`,
        `Price: $${priceUSD.toLocaleString()}`,
        `Location: ${location}`,
        'Non-agricultural status',
        'Foreign buyers can purchase',
        'All utilities available'
      ],
      ge: [
        `Land area: ${area} m²`,
        `Price: $${priceUSD.toLocaleString()}`,
        `Location: ${location}`,
        'Non-agricultural status',
        'Foreign buyers can purchase',
        'All utilities available'
      ]
    }
  };
});

fs.writeFileSync(
  'src/data/georgia-properties.json',
  JSON.stringify(properties, null, 2)
);

console.log(`✅ Загружено ${properties.length} объектов`);
properties.forEach(p => {
  console.log(`  - ${p.title.ru} ($${p.priceUSD})`);
});
