import { createI18n } from 'vue-i18n'

const localeFiles = import.meta.glob('@/locales/*.json', { eager: true })

function loadMessages() {
  type Messages = { [key: string]: any }
  const messages: Messages = {}

  Object.entries(localeFiles).forEach(([path, m]) => {
    const nameWithExtension = path.split('/').pop()

    if (nameWithExtension) {
      const name = nameWithExtension.replace(/\.\w+$/, '')
      messages[name] = (m as any).default
    }
  })

  return messages
}

const i18n = createI18n({
  legacy: false,
  locale: import.meta.env.VITE_I18N_LOCALE || 'es',
  fallbackLocale: import.meta.env.VITE_I18N_FALLBACK_LOCALE || 'es',
  messages: loadMessages(),
})

export default i18n
