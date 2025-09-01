
export const locales = ['en','pt','es'] as const
export type Locale = typeof locales[number]

const bundles: Record<Locale, any> = {
  en: require('@/messages/en.json'),
  pt: require('@/messages/pt.json'),
  es: require('@/messages/es.json')
}

export function getMessages(locale: string) {
  const safe = locales.includes(locale as any) ? (locale as Locale) : 'en'
  return bundles[safe]
}
