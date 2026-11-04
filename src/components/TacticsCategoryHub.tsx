'use client';

import React from 'react';

interface TacticsCategoryHubProps {
  onSelectCategory: (category: string, filterQuery?: string) => void;
}

interface HubColumn {
  title: string;
  categoryKey: string;
  items: { label: string; query: string }[];
}

const CATEGORY_DIRECTORIES: HubColumn[] = [
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
      { label: 'Goggle Accessories', query: 'Optics' },
    ],
  },
  {
    title: "MEN'S SNOWBOARD CLOTHING",
    categoryKey: 'Одяг',
    items: [
      { label: 'Snowboard Jackets', query: 'Jacket' },
      { label: 'Snowboard Pants', query: 'Pants' },
      { label: 'Tech Apparel & Hoodies', query: 'Anorak' },
      { label: 'Snowboard Gloves & Mitts', query: 'Gloves' },
      { label: 'Base Layer & Thermal', query: 'Layer' },
      { label: 'Snowboard Headwear', query: 'Beanie' },
      { label: 'Snowboard Socks', query: 'Socks' },
    ],
  },
  {
    title: "WOMEN'S SNOWBOARD CLOTHING",
    categoryKey: 'Одяг',
    items: [
      { label: "Women's Snowboard Jackets", query: "Jacket" },
      { label: "Women's Snowboard Pants", query: "Pants" },
      { label: "Women's Tech Hoodies", query: "Hoodie" },
      { label: "Women's Gloves & Mitts", query: "Gloves" },
      { label: "Women's Base Layer", query: "Thermal" },
      { label: "Women's Beanies", query: "Beanie" },
      { label: "Women's Face Protection", query: "MFI" },
      { label: "Women's Snowboard Socks", query: "Socks" },
    ],
  },
  {
    title: 'PROTECTIVE SNOWBOARD GEAR',
    categoryKey: 'Захист',
    items: [
      { label: 'Snowboard Helmets (MIPS)', query: 'Helmet' },
      { label: 'Snowboard Body Protection', query: 'Protection' },
      { label: 'Crash Pants & Pads', query: 'Pads' },
      { label: 'Back Protectors', query: 'Back' },
    ],
  },
  {
    title: 'SNOWBOARDING ACCESSORIES',
    categoryKey: 'Аксесуари',
    items: [
      { label: 'Stomp Pads & Traction', query: 'Stomp' },
      { label: 'Binding Accessories & Discs', query: 'Disc' },
      { label: 'Boot Accessories & Laces', query: 'BOA' },
      { label: 'Snowboard Tools & Rachet', query: 'Tool' },
      { label: 'Snowboard Tune and Wax', query: 'Wax' },
      { label: 'Backcountry Accessories', query: 'RECCO' },
      { label: 'Splitboard Skins & Crampons', query: 'Splitboard' },
      { label: 'Stickers & Decals', query: 'Proboard' },
    ],
  },
];

export function TacticsCategoryHub({ onSelectCategory }: TacticsCategoryHubProps) {
  const handleClick = (categoryKey: string, query: string) => {
    onSelectCategory(categoryKey, query);
    const catalog = document.getElementById('catalog');
    if (catalog) {
      catalog.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="border-b border-zinc-200 bg-white py-12">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Tactics Mega Directory Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-x-6 gap-y-8">
          {CATEGORY_DIRECTORIES.map((col) => (
            <div key={col.title} className="flex flex-col">
              <h3
                onClick={() => handleClick(col.categoryKey, '')}
                className="text-[12px] font-black uppercase tracking-tight text-zinc-950 hover:text-emerald-600 transition-colors cursor-pointer mb-3 border-b-2 border-zinc-950 pb-1"
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
