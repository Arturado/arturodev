"use client";

import { createContext, useContext, useEffect, useState } from "react";
import es from "@/messages/es.json";
import en from "@/messages/en.json";

export type Locale = "es" | "en";
type Messages = typeof es;

interface LanguageContextValue {
  locale: Locale;
  setLocale: (locale: Locale) => void;
  t: (key: keyof Messages) => string;
}

const LanguageContext = createContext<LanguageContextValue | null>(null);

const messages: Record<Locale, Messages> = { es, en: en as Messages };

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>("es");

  useEffect(() => {
    const saved = localStorage.getItem("locale") as Locale | null;
    if (saved === "es" || saved === "en") setLocaleState(saved);
  }, []);

  const setLocale = (l: Locale) => {
    setLocaleState(l);
    localStorage.setItem("locale", l);
  };

  const t = (key: keyof Messages): string =>
    (messages[locale][key] as string) ?? (key as string);

  return (
    <LanguageContext.Provider value={{ locale, setLocale, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const ctx = useContext(LanguageContext);
  if (!ctx) throw new Error("useLanguage must be used inside LanguageProvider");
  return ctx;
}
