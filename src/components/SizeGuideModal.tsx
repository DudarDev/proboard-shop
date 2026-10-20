'use client';

import React, { useState } from 'react';
import { X, Ruler, Check } from 'lucide-react';

interface SizeGuideModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const SIZES_CM = [
  { size: 'S', chest: '92 - 96', length: '68', sleeve: '63', height: '165 - 175' },
  { size: 'M', chest: '98 - 104', length: '71', sleeve: '65', height: '172 - 182' },
  { size: 'L', chest: '106 - 112', length: '74', sleeve: '67', height: '178 - 188' },
  { size: 'XL', chest: '114 - 120', length: '76', sleeve: '68', height: '185 - 195' },
];

export function SizeGuideModal({ isOpen, onClose }: SizeGuideModalProps) {
  const [unit, setUnit] = useState<'cm' | 'in'>('cm');

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6">
      <div
        className="fixed inset-0 bg-black/60 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      />

      <div className="relative w-full max-w-lg overflow-hidden rounded-3xl bg-white p-6 sm:p-8 shadow-2xl z-10 transition-all">
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-zinc-100">
          <div className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-zinc-100 text-zinc-900">
              <Ruler className="h-4 w-4" />
            </div>
            <div>
              <h3 className="text-base font-bold text-zinc-950">Таблиця розмірів</h3>
              <p className="text-[11px] text-zinc-400">Параметри виробу та рекомендації</p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {/* Unit switcher */}
            <div className="flex rounded-lg bg-zinc-100 p-0.5 text-xs font-semibold">
              <button
                onClick={() => setUnit('cm')}
                className={`rounded-md px-2 py-1 transition-all ${
                  unit === 'cm' ? 'bg-white text-zinc-950 shadow-sm' : 'text-zinc-500'
                }`}
              >
                см
              </button>
              <button
                onClick={() => setUnit('in')}
                className={`rounded-md px-2 py-1 transition-all ${
                  unit === 'in' ? 'bg-white text-zinc-950 shadow-sm' : 'text-zinc-500'
                }`}
              >
                дюйми
              </button>
            </div>

            <button
              onClick={onClose}
              className="p-1.5 rounded-full text-zinc-400 hover:text-zinc-700 hover:bg-zinc-100 transition-colors"
            >
              <X className="h-5 w-5" />
            </button>
          </div>
        </div>

        {/* Table */}
        <div className="my-6 overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-zinc-50 text-zinc-500 font-semibold border-y border-zinc-100">
              <tr>
                <th className="py-2.5 px-3">Розмір</th>
                <th className="py-2.5 px-3">Обхват грудей</th>
                <th className="py-2.5 px-3">Довжина</th>
                <th className="py-2.5 px-3">Рукав</th>
                <th className="py-2.5 px-3">Зріст</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-100">
              {SIZES_CM.map((row) => (
                <tr key={row.size} className="hover:bg-zinc-50/50">
                  <td className="py-3 px-3 font-bold text-zinc-900">{row.size}</td>
                  <td className="py-3 px-3 text-zinc-600">
                    {unit === 'cm' ? `${row.chest} см` : `${(Number(row.chest.split(' - ')[0]) / 2.54).toFixed(0)} - ${(Number(row.chest.split(' - ')[1]) / 2.54).toFixed(0)}″`}
                  </td>
                  <td className="py-3 px-3 text-zinc-600">
                    {unit === 'cm' ? `${row.length} см` : `${(Number(row.length) / 2.54).toFixed(1)}″`}
                  </td>
                  <td className="py-3 px-3 text-zinc-600">
                    {unit === 'cm' ? `${row.sleeve} см` : `${(Number(row.sleeve) / 2.54).toFixed(1)}″`}
                  </td>
                  <td className="py-3 px-3 text-zinc-500">
                    {unit === 'cm' ? `${row.height} см` : `${(Number(row.height.split(' - ')[0]) / 2.54).toFixed(0)} - ${(Number(row.height.split(' - ')[1]) / 2.54).toFixed(0)}″`}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Tips */}
        <div className="rounded-2xl bg-zinc-50 p-4 border border-zinc-200/80 text-[11px] text-zinc-600 space-y-1">
          <p className="font-semibold text-zinc-900">💡 Порада щодо посадки:</p>
          <p>
            Наші худі та одяг мають комфортну вільну посадку (oversized). Якщо ви віддаєте перевагу більш приталеному силуету — рекомендуємо обрати на розмір менше.
          </p>
        </div>

        <button
          onClick={onClose}
          className="mt-6 w-full rounded-xl bg-zinc-900 py-3 text-xs font-semibold text-white hover:bg-zinc-800 transition-colors shadow-md"
        >
          Зрозуміло, дякую
        </button>
      </div>
    </div>
  );
}
