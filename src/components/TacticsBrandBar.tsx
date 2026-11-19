'use client';

import React from 'react';

interface TacticsBrandBarProps {
  selectedBrand?: string;
  onSelectBrand: (brand: string) => void;
}

const BRANDS = [
  { name: 'BURTON', id: 'Burton', tag: '🏂' },
  { name: 'CAPITA', id: 'Capita', tag: '⚡' },
  { name: 'LIB TECH', id: 'Lib Tech', tag: '🌊' },
  { name: 'UNION', id: 'Union', tag: '🛡️' },
  { name: 'THIRTYTWO', id: 'ThirtyTwo', tag: '32' },
  { name: 'VANS', id: 'Vans', tag: '🛹' },
  { name: 'SALOMON', id: 'Salomon', tag: '🏔️' },
  { name: 'GNU', id: 'GNU', tag: '🌀' },
  { name: 'NITRO', id: 'Nitro', tag: '🔥' },
  { name: 'JONES', id: 'Jones', tag: '🌲' },
  { name: 'BATALEON', id: 'Bataleon', tag: '3BT' },
  { name: 'ANON', id: 'Anon', tag: '🥽' },
  { name: 'SMITH', id: 'Smith', tag: '👓' },
  { name: 'OAKLEY', id: 'Oakley', tag: '🎯' },
  { name: 'VOLCOM', id: 'Volcom', tag: '💎' },
  { name: 'SANTA CRUZ', id: 'Santa Cruz', tag: '🔴' },
  { name: 'DAKINE', id: 'Dakine', tag: '🎒' },
];

export function TacticsBrandBar({ selectedBrand, onSelectBrand }: TacticsBrandBarProps) {
  return (
    <div className="w-full border-y border-zinc-200 bg-white py-3">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between gap-3 overflow-x-auto scrollbar-none py-1">
          <button
            onClick={() => onSelectBrand('')}
            className={`text-xs font-black uppercase tracking-wider px-3.5 py-1.5 transition-all whitespace-nowrap border ${
              !selectedBrand
                ? 'bg-zinc-950 text-white border-zinc-950 shadow-sm'
                : 'bg-zinc-50 text-zinc-600 border-zinc-200 hover:text-zinc-950 hover:bg-zinc-100'
            }`}
          >
            ALL BRANDS
          </button>

          <div className="h-5 w-[1px] bg-zinc-300 shrink-0" />

          {BRANDS.map((brand) => {
            const isSelected = selectedBrand?.toLowerCase() === brand.id.toLowerCase();
            return (
              <button
                key={brand.id}
                onClick={() => onSelectBrand(isSelected ? '' : brand.id)}
                className={`flex items-center gap-1.5 text-xs font-black uppercase tracking-widest px-3 py-1.5 transition-all whitespace-nowrap border ${
                  isSelected
                    ? 'bg-zinc-950 text-white border-zinc-950 shadow-sm'
                    : 'bg-white text-zinc-700 border-transparent hover:border-zinc-300 hover:bg-zinc-50 hover:text-zinc-950'
                }`}
              >
                <span className="text-[10px] opacity-70">{brand.tag}</span>
                <span>{brand.name}</span>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
