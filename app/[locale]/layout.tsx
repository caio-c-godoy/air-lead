import '../globals.css'
import { ReactNode } from 'react'
import LanguageSwitcher from '@/components/LanguageSwitcher'

export async function generateStaticParams(){
  return [{locale:'en'},{locale:'pt'},{locale:'es'}]
}

export default function LocaleLayout({children, params}:{children:React.ReactNode, params:{locale:string}}){
  return (
    <html lang={params.locale}>
      <body>
        <LanguageSwitcher />   {/* 👈 aqui também */}
        {children}
      </body>
    </html>
  )
}
