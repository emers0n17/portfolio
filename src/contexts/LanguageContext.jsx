import { createContext, useContext, useState, useEffect } from 'react'
import ptTranslations from '../locales/pt'
import enTranslations from '../locales/en'

const LanguageContext = createContext(null)

const translations = {
  pt: ptTranslations,
  en: enTranslations
}

export function LanguageProvider({ children }) {
  const [language, setLanguage] = useState(() => {
    const savedLanguage = localStorage.getItem('language')
    return savedLanguage || 'pt'
  })

  useEffect(() => {
    localStorage.setItem('language', language)
    document.documentElement.lang = language
  }, [language])

  const t = (key) => {
    try {
      const keys = key.split('.')
      let value = translations[language]
      
      for (const k of keys) {
        if (value === undefined) return key
        value = value[k]
      }
      
      return value || key
    } catch (error) {
      console.error(`Translation error for key: ${key}`, error)
      return key
    }
  }

  const value = {
    language,
    setLanguage,
    t
  }

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  )
}

export const useLanguage = () => {
  const context = useContext(LanguageContext)
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider')
  }
  return context
} 