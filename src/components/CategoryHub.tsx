'use client';

import React from 'react';
import { useConfig } from '@/context/ConfigContext';

interface CategoryHubProps {
  onSelectCategory: (category: string, filterQuery?: string) => void;
}

export type TacticsCategoryHubProps = CategoryHubProps;

interface HubColumn {
  title: string;
  categoryKey: string;
  items: { label: string; query: string }[];
}

const CATEGORY_DIRECTORIES_EN: HubColumn[] = [
  {
    title: 'SNOWBOARDS',
    categoryKey: 'Сноуборди',
    items: [
      { label: "Men's Snowboards", query: "Snowboard" },
      { label: "Women's Snowboards", query: "Women" },
      { label: "Kids' Snowboards", query: "Kids" },
      { label: 'Splitboards', query: 'Splitboard' },
    ],
  },
  {
    title: 'SNOWBOARD BOOTS',
    categoryKey: 'Взуття',
    items: [
      { label: "Men's Snowboard Boots", query: "Boots" },
      { label: "Women's Snowboard Boots", query: "Boots Women" },
      { label: "Kids' Snowboard Boots", query: "Boots Kids" },
      { label: 'Step On® Boots', query: 'Step On' },
    ],
  },
  {
    title: 'SNOWBOARD BINDINGS',
    categoryKey: 'Кріплення',
    items: [
      { label: "Men's Snowboard Bindings", query: "Bindings" },
      { label: "Women's Snowboard Bindings", query: "Bindings Women" },
      { label: "Kids' Snowboard Bindings", query: "Bindings Kids" },
      { label: 'Splitboard Bindings', query: 'Splitboard' },
    ],
  },
  {
    title: 'SNOWBOARD GOGGLES',
    categoryKey: 'Оптика',
    items: [
      { label: "Men's Snowboard Goggles", query: "Goggles" },
      { label: "Women's Snowboard Goggles", query: "Goggles" },
      { label: "Kids' Snowboard Goggles", query: "Goggles Kids" },
      { label: 'Replacement Goggle Lenses', query: 'Lens' },
    ],
  },
  {
    title: "MEN'S CLOTHING",
    categoryKey: 'Одяг',
    items: [
      { label: 'GORE-TEX Jackets', query: 'Jacket' },
      { label: 'Snowboard Pants', query: 'Pants' },
      { label: 'Tech Anoraks & Hoodies', query: 'Anorak' },
      { label: 'Snowboard Gloves & Mitts', query: 'Gloves' },
    ],
  },
  {
    title: "WOMEN'S CLOTHING",
    categoryKey: 'Одяг',
    items: [
      { label: "Women's Snowboard Jackets", query: "Jacket" },
      { label: "Women's Snowboard Pants", query: "Pants" },
      { label: "Women's Tech Hoodies", query: "Hoodie" },
      { label: "Women's Beanies & Facemasks", query: "MFI" },
    ],
  },
  {
    title: 'PROTECTIVE GEAR',
    categoryKey: 'Захист',
    items: [
      { label: 'Snowboard Helmets (MIPS)', query: 'Helmet' },
      { label: 'Crash Pants & Pads', query: 'Protection' },
      { label: 'Back Protectors', query: 'Back' },
      { label: 'Wrist Guards', query: 'Guards' },
    ],
  },
  {
    title: 'ACCESSORIES',
    categoryKey: 'Аксесуари',
    items: [
      { label: 'Snowboard Tune and Wax', query: 'Wax' },
      { label: 'Stomp Pads & Traction', query: 'Stomp' },
      { label: 'Snowboard Tools & Hardware', query: 'Tool' },
      { label: 'P-Tex Repair Sticks', query: 'P-Tex' },
    ],
  },
];

const CATEGORY_DIRECTORIES_UA: HubColumn[] = [
  {
    title: 'СНОУБОРДИ',
    categoryKey: 'Сноуборди',
    items: [
      { label: 'Чоловічі сноуборди', query: 'Snowboard' },
      { label: 'Жіночі сноуборди', query: 'Women' },
      { label: 'Дитячі сноуборди', query: 'Kids' },
      { label: 'Сплітборди', query: 'Splitboard' },
    ],
  },
  {
    title: 'ЧЕРЕВИКИ',
    categoryKey: 'Взуття',
    items: [
      { label: 'Черевики Double BOA', query: 'Boots' },
      { label: 'Шнурівка з фіксацією', query: 'Vans' },
      { label: 'Черевики Step On®', query: 'Step On' },
      { label: 'Термоформовка стопи', query: 'Intuition' },
    ],
  },
  {
    title: 'КРІПЛЕННЯ',
    categoryKey: 'Кріплення',
    items: [
      { label: 'Класичні кріплення (Union)', query: 'Bindings' },
      { label: 'Кріплення Step On®', query: 'Step On' },
      { label: 'Жорсткі фрірайд-бази', query: 'Duraflex' },
      { label: 'Сплітборд інтерфейс', query: 'Splitboard' },
    ],
  },
  {
    title: 'ОПТИКА & МАСКИ',
    categoryKey: 'Оптика',
    items: [
      { label: 'Магнітна зміна лінз (MFI)', query: 'Anon' },
      { label: 'Контрастні лінзи ChromaPop', query: 'Smith' },
      { label: 'Циліндричні маски', query: 'Squad' },
      { label: 'Змінні лінзи від сонця/туману', query: 'Lens' },
    ],
  },
  {
    title: 'ЧОЛОВІЧИЙ ОДЯГ',
    categoryKey: 'Одяг',
    items: [
      { label: 'Куртки GORE-TEX 3-Layer', query: 'Volcom' },
      { label: 'Мембранні анораки 20K', query: 'Montec' },
      { label: 'Снігозахисні штани', query: 'Pants' },
      { label: 'Рукавиці та варежки', query: 'Gloves' },
    ],
  },
  {
    title: 'ЖІНОЧИЙ ОДЯГ',
    categoryKey: 'Одяг',
    items: [
      { label: 'Жіночі теплі куртки', query: 'Jacket' },
      { label: 'Штани з мембраною', query: 'Pants' },
      { label: 'Флісові худі', query: 'Hoodie' },
      { label: 'Балаклави та шапки', query: 'MFI' },
    ],
  },
  {
    title: 'ШОЛОМИ & ЗАХИСТ',
    categoryKey: 'Захист',
    items: [
      { label: 'Шоломи із системою MIPS', query: 'Oakley' },
      { label: 'Захист голови з BOA 360', query: 'Helmet' },
      { label: 'Захисні шорти та накладки', query: 'Protection' },
      { label: 'Захист спини та куприка', query: 'Back' },
    ],
  },
  {
    title: 'АКСЕСУАРИ & СЕРВІС',
    categoryKey: 'Аксесуари',
    items: [
      { label: 'Набори для парафінування', query: 'Dakine' },
      { label: 'Канторізи 88°/90°', query: 'Канторіз' },
      { label: 'Stomp-педи для ноги', query: 'Stomp' },
      { label: 'Палички P-Tex для ремонту', query: 'P-Tex' },
    ],
  },
];

export function CategoryHub({ onSelectCategory }: CategoryHubProps) {
  const { language } = useConfig();
  const categories = language === 'ua' ? CATEGORY_DIRECTORIES_UA : CATEGORY_DIRECTORIES_EN;

  const handleClick = (categoryKey: string, query: string) => {
    onSelectCategory(categoryKey, query);
    const catalog = document.getElementById('catalog');
    if (catalog) {
      catalog.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="border-b border-zinc-200 bg-white py-10">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Mega Directory Grid with 8 Clean Columns */}
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-x-5 gap-y-7">
          {categories.map((col) => (
            <div key={col.title} className="flex flex-col">
              <h3
                onClick={() => handleClick(col.categoryKey, '')}
                className="text-[11px] sm:text-xs font-black uppercase tracking-tight text-zinc-950 hover:text-emerald-600 transition-colors cursor-pointer mb-2.5 border-b-2 border-zinc-950 pb-1"
              >
                {col.title}
              </h3>
              <ul className="space-y-1.5">
                {col.items.map((item) => (
                  <li key={item.label}>
                    <button
                      type="button"
                      onClick={() => handleClick(col.categoryKey, item.query)}
                      className="text-left text-[11px] text-zinc-500 hover:text-zinc-950 hover:underline transition-colors leading-tight"
                    >
                      {item.label}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export const TacticsCategoryHub = CategoryHub;
