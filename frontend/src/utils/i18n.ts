export function pick(es: string, en: string | null | undefined, locale: string): string {
  if (locale === 'en' && en && en.trim() !== '') return en;
  return es;
}
