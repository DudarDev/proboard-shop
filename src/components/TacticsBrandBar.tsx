'use client';

import React from 'react';

interface TacticsBrandBarProps {
  selectedBrand?: string;
  onSelectBrand: (brand: string) => void;
}

const BRANDS = [
  { name: 'BURTON', id: 'Burton' },
  { name: 'CAPITA', id: 'Capita' },
  { name: 'LIB TECH', id: 'Lib Tech' },
  { name: 'UNION', id: 'Union' },
  { name: 'THIRTYTWO', id: 'ThirtyTwo' },
  { name: 'VANS', id: 'Vans' },
  { name: 'SALOMON', id: 'Salomon' },
  { name: 'GNU', id: 'GNU' },
  { name: 'NITRO', id: 'Nitro' },
  { name: 'JONES', id: 'Jones' },
  { name: 'BATALEON', id: 'Bataleon' },
  { name: 'ANON', id: 'Anon' },
  { name: 'SMITH', id: 'Smith' },
  { name: 'OAKLEY', id: 'Oakley' },
  { name: 'VOLCOM', id: 'Volcom' },
  { name: 'SANTA CRUZ', id: 'Santa Cruz' },
  { name: 'DAKINE', id: 'Dakine' },
];

export function TacticsBrandBar({ selectedBrand, onSelectBrand }: TacticsBrandBarProps) {
  return (
    <div className="w-full border-y border-zinc-200 bg-white py-3.5">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between gap-4 overflow-x-auto scrollbar-none py-1">
          <button
            onClick={() => onSelectBrand('')}
            className={`text-[11px] font-black uppercase tracking-wider px-3 py-1.5 rounded transition-all whitespace-nowrap ${
              !selectedBrand
                ? 'bg-zinc-950 text-white'
                : 'text-zinc-500 hover:text-zinc-950 hover:bg-zinc-100'
            }`}
          >
            ALL BRANDS
          </button>

          <div className="h-4 w-[1px] bg-zinc-200 shrink-0" />

          {BRANDS.map((brand) => {
            const isSelected = selectedBrand?.toLowerCase() === brand.id.toLowerCase();
            return (
              <button
                key={brand.id}
                onClick={() => onSelectBrand(isSelected ? '' : brand.id)}
                className={`text-[11px] font-black uppercase tracking-widest px-3 py-1.5 rounded transition-all whitespace-nowrap ${
                  isSelected
                    ? 'bg-zinc-950 text-white shadow-sm'
                    : 'text-zinc-600 hover:text-zinc-950 hover:bg-zinc-100'
                }`}
              >
                {brand.name}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
