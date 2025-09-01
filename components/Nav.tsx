'use client'
import Image from 'next/image'
import { useEffect, useState } from 'react'
import ReactCountryFlag from 'react-country-flag'

function tFrom(messages: any) {
  return (key: string) => key.split('.').reduce((o, p) => o?.[p], messages) ?? key
}

export default function Nav({ messages, locale }: { messages: any, locale: string }) {
  const t = tFrom(messages)
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <nav
      className={`fixed top-0 inset-x-0 z-50 transition-colors ${scrolled ? 'bg-brand-blue/85 shadow-brand' : 'bg-transparent'
        } backdrop-blur`}
    >
      <div className="container flex items-center justify-between py-3">
        {/* Logo */}
        <a href={`/${locale}`} className="flex items-center gap-3">
          <Image
            src="/logo-victorious.webp"
            alt="Logo da Victorious"
            width={95}
            height={95}
            priority
          />
        </a>

        {/* Menu Desktop */}
        <div className="hidden md:flex items-center gap-6 text-sm font-medium">
          <a href="#benefits" className="hover:text-brand-gold">{t('nav.benefits')}</a>
          <a href="#plans" className="hover:text-brand-gold">{t('nav.plans')}</a>
          <a href="#sentinel" className="hover:text-brand-gold">Sentinel360</a>
          <a href="#contact" className="btn-primary">{t('nav.contact')}</a>

          {/* Idiomas Desktop */}
          <div className="flex items-center gap-4 ml-4">
            <a href="/en" className="flex items-center gap-1 hover:text-brand-gold">
              <ReactCountryFlag countryCode="US" svg style={{ width: '1.5em', height: '1.5em' }} />
              <span className="hidden md:inline">US</span>
            </a>
            <a href="/pt" className="flex items-center gap-1 hover:text-brand-gold">
              <ReactCountryFlag countryCode="BR" svg style={{ width: '1.5em', height: '1.5em' }} />
              <span className="hidden md:inline">BR</span>
            </a>
            <a href="/es" className="flex items-center gap-1 hover:text-brand-gold">
              <ReactCountryFlag countryCode="ES" svg style={{ width: '1.5em', height: '1.5em' }} />
              <span className="hidden md:inline">ES</span>
            </a>
          </div>
        </div>

        {/* Menu Mobile */}
        <div className="md:hidden">
          <button
            onClick={() => setOpen(!open)}
            className="p-2 rounded bg-brand-gold text-black"
          >
            ☰
          </button>

          {open && (
            <div className="absolute right-4 top-14 bg-brand-blue text-white p-4 rounded shadow-lg flex flex-col gap-4 w-48">
              <a href="#benefits" onClick={() => setOpen(false)}>{t('nav.benefits')}</a>
              <a href="#plans" onClick={() => setOpen(false)}>{t('nav.plans')}</a>
              <a href="#sentinel" onClick={() => setOpen(false)}>Sentinel360</a>
              <a href="#contact" className="btn-primary" onClick={() => setOpen(false)}>{t('nav.contact')}</a>

              {/* Idiomas Mobile (somente bandeiras) */}
              <div className="flex items-center gap-3 mt-2">
                <a href="/en" onClick={() => setOpen(false)}>
                  <ReactCountryFlag countryCode="US" svg style={{ width: '2em', height: '2em' }} />
                </a>
                <a href="/pt" onClick={() => setOpen(false)}>
                  <ReactCountryFlag countryCode="BR" svg style={{ width: '2em', height: '2em' }} />
                </a>
                <a href="/es" onClick={() => setOpen(false)}>
                  <ReactCountryFlag countryCode="ES" svg style={{ width: '2em', height: '2em' }} />
                </a>
              </div>
            </div>
          )}
        </div>
      </div>
    </nav>
  )
}
