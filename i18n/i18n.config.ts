import ar from './lang/ar.json'
import en from './lang/en.json'

export default defineI18nConfig(() => ({
  legacy: false,
  locale: 'ar',
  fallbackLocale: 'ar',
  messages: {
    ar,
    en
  }
}))