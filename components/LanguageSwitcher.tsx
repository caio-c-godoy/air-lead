'use client'
import React from 'react'
import ReactCountryFlag from 'react-country-flag'
import Cookies from 'js-cookie'

export default function LanguageSwitcher() {
  const setLang = (lang: string) => {
    Cookies.set('preferred_lang', lang, { expires: 30 })
  }

  return (
    <div className="fixed top-4 right-4 z-50 flex gap-2 bg-white/80 rounded-full px-2 py-1 shadow">
      <a href="/en" onClick={() => setLang('en')} className="flex items-center gap-1 hover:opacity-80">
        <ReactCountryFlag countryCode="US" svg style={{ width: '1.2em', height: '1.2em' }} className="md:w-[1.8em] md:h-[1.8em]" />
        <span className="hidden md:inline text-xs font-medium">EN</span>
      </a>
      <a href="/pt" onClick={() => setLang('pt')} className="flex items-center gap-1 hover:opacity-80">
        <ReactCountryFlag countryCode="BR" svg style={{ width: '1.2em', height: '1.2em' }} className="md:w-[1.8em] md:h-[1.8em]" />
        <span className="hidden md:inline text-xs font-medium">PT</span>
      </a>
      <a href="/es" onClick={() => setLang('es')} className="flex items-center gap-1 hover:opacity-80">
        <ReactCountryFlag countryCode="ES" svg style={{ width: '1.2em', height: '1.2em' }} className="md:w-[1.8em] md:h-[1.8em]" />
        <span className="hidden md:inline text-xs font-medium">ES</span>
      </a>
    </div>
  )
}
