
'use client'
import { useState } from 'react'

function tFrom(messages:any){
  return (key:string)=> key.split('.').reduce((o,p)=>o?.[p], messages) ?? key
}

export default function ContactForm({messages}:{messages:any}){
  const t = tFrom(messages)
  const [status, setStatus] = useState<'idle'|'sending'|'ok'|'err'>('idle')
  async function onSubmit(e: React.FormEvent<HTMLFormElement>){
    e.preventDefault(); setStatus('sending')
    const data = Object.fromEntries(new FormData(e.currentTarget) as any)
    try{
      const res = await fetch('/api/contact',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify(data)})
      if(!res.ok) throw new Error('x'); setStatus('ok'); (e.target as HTMLFormElement).reset()
    }catch{ setStatus('err') }
  }
  return (
    <form onSubmit={onSubmit} className="bg-white text-gray-800 p-6 rounded-xl shadow-xl max-w-xl mx-auto">
      <div className="grid md:grid-cols-2 gap-4">
        <input name="name" placeholder={t('form.name')} required className="border p-3 rounded"/>
        <input name="phone" placeholder={t('form.phone')} required className="border p-3 rounded"/>
        <input type="email" name="email" placeholder={t('form.email')} required className="border p-3 rounded md:col-span-2"/>
        <textarea name="message" placeholder={t('form.message')} rows={5} className="border p-3 rounded md:col-span-2" required></textarea>
      </div>
      <button disabled={status==='sending'} className="mt-4 w-full bg-brand.blue text-white py-3 rounded-lg hover:bg-blue-800">{t('form.send')}</button>
      {status==='ok' && <p className="text-green-700 mt-3 text-sm">{t('form.sent')}</p>}
      {status==='err' && <p className="text-red-700 mt-3 text-sm">{t('form.error')}</p>}
    </form>
  )
}
