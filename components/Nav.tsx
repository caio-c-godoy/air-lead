'use client'
import Image from 'next/image'
import {useEffect, useState} from 'react'

function tFrom(messages:any){
  return (key:string)=> key.split('.').reduce((o,p)=>o?.[p], messages) ?? key
}

export default function Nav({messages, locale}:{messages:any, locale:string}){
  const t = tFrom(messages)
  const [scrolled, setScrolled] = useState(false)
  useEffect(()=>{
    const onScroll=()=>setScrolled(window.scrollY>10)
    window.addEventListener('scroll', onScroll)
    return ()=>window.removeEventListener('scroll', onScroll)
  },[])

  return (
    <nav className={`fixed top-0 inset-x-0 z-50 transition-colors ${scrolled?'bg-brand-blue/85 shadow-brand':'bg-transparent'} backdrop-blur`}>
      <div className="container flex items-center justify-between py-3">
        <a href={`/${locale}`} className="flex items-center gap-3">
          <Image
            src="/logo-victorious.webp"
            alt="Logo da Victorious"
            width={95}
            height={95}
            priority
          />

         
        </a>

        <div className="hidden md:flex items-center gap-6 text-sm font-medium">
          <a href="#benefits" className="hover:text-brand-gold">{t('nav.benefits')}</a>
          <a href="#plans" className="hover:text-brand-gold">{t('nav.plans')}</a>
          <a href="#sentinel" className="hover:text-brand-gold">Sentinel360</a>
          <a href="#gallery" className="hover:text-brand-gold">{t('nav.gallery')}</a>
          <a href="#contact" className="btn-primary">{t('nav.contact')}</a>
          <a className="underline" href="/en">EN</a>
          <a className="underline" href="/pt">PT</a>
          <a className="underline" href="/es">ES</a>
        </div>
      </div>
    </nav>
  )
}
