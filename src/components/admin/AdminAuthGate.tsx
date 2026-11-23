'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Lock, Eye, EyeOff, RefreshCw, AlertCircle, ShieldCheck } from 'lucide-react';
import { useConfig } from '@/context/ConfigContext';
import { TRANSLATIONS } from '@/lib/translations';

interface AdminAuthGateProps {
  onLogin: (key: string) => Promise<boolean>;
  isVerifying: boolean;
  authError: string;
}

export function AdminAuthGate({ onLogin, isVerifying, authError }: AdminAuthGateProps) {
  const [inputKey, setInputKey] = useState('');
  const [showKey, setShowKey] = useState(false);
  const { language } = useConfig();
  const t = TRANSLATIONS[language];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputKey.trim()) return;
    await onLogin(inputKey.trim());
  };

  return (
    <div className="flex-1 flex items-center justify-center p-4 sm:p-6">
      <div className="w-full max-w-md rounded-3xl bg-white p-8 shadow-xl border border-zinc-200/80">
        <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-zinc-950 text-white mb-6 shadow-md">
          <Lock className="h-7 w-7 text-emerald-400" />
        </div>

        <h2 className="text-xl font-extrabold text-center text-zinc-950">
          {t.adminKeyPrompt}
        </h2>
        <p className="text-xs text-center text-zinc-500 mt-2 mb-6">
          {t.adminKeyDesc}
        </p>

        {authError && (
          <div className="mb-4 rounded-xl border border-red-200 bg-red-50 p-3 text-xs text-red-800 flex items-center gap-2">
            <AlertCircle className="h-4 w-4 text-red-600 shrink-0" />
            <span>{authError}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-zinc-700 mb-1.5">
              {language === 'ua' ? 'Секретний ключ (x-admin-key)' : 'Secret Key (x-admin-key)'}
            </label>
            <div className="relative">
              <input
                type={showKey ? 'text' : 'password'}
                placeholder={t.enterKeyPlaceholder}
                value={inputKey}
                onChange={(e) => setInputKey(e.target.value)}
                className="w-full rounded-xl border border-zinc-200 px-3.5 py-2.5 text-xs text-zinc-900 placeholder-zinc-400 focus:border-zinc-900 focus:outline-none focus:ring-1 focus:ring-zinc-900 pr-10 font-mono"
              />
              <button
                type="button"
                onClick={() => setShowKey(!showKey)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-400 hover:text-zinc-600"
              >
                {showKey ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
              </button>
            </div>
          </div>

          <button
            type="submit"
            disabled={isVerifying}
            className="w-full rounded-xl bg-zinc-950 py-3 text-xs font-semibold text-white shadow-md hover:bg-zinc-800 disabled:opacity-50 transition-all flex items-center justify-center gap-2"
          >
            {isVerifying ? (
              <>
                <RefreshCw className="h-4 w-4 animate-spin text-zinc-300" />
                <span>{language === 'ua' ? 'Перевірка авторизації...' : 'Verifying Key...'}</span>
              </>
            ) : (
              <span>{t.loginBtn}</span>
            )}
          </button>
        </form>

        <div className="mt-6 pt-4 border-t border-zinc-100 flex items-center justify-between text-[11px] text-zinc-500">
          <Link href="/" className="hover:text-zinc-900 flex items-center gap-1 font-medium">
            ← {language === 'ua' ? 'До вітрини магазину' : 'Back to Store'}
          </Link>
          <span className="flex items-center gap-1 text-emerald-700 font-medium">
            <ShieldCheck className="h-3.5 w-3.5" />
            {language === 'ua' ? 'Захист роуту x-admin-key' : 'Protected by x-admin-key'}
          </span>
        </div>
      </div>
    </div>
  );
}
