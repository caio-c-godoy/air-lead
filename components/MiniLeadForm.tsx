
'use client'
import { useState } from 'react'

function tFrom(messages:any){
  return (key:string)=> key.split('.').reduce((o,p)=>o?.[p], messages) ?? key
}

export default function MiniLeadForm({messages}:{messages:any}){
  const t = tFrom(messages)
  const [status,setStatus]=useState<'idle'|'sending'|'ok'|'err'>('idle')
  async function onSubmit(e:React.FormEvent<HTMLFormElement>){
    e.preventDefault(); setStatus('sending')
    const data = Object.fromEntries(new FormData(e.currentTarget) as any)
    try{
      const res = await fetch('/api/contact',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify(data)})
      if(!res.ok) throw new Error('x'); setStatus('ok'); (e.target as HTMLFormElement).reset()
    }catch{ setStatus('err') }
  }
  return (
    <form onSubmit={onSubmit} className="bg-white/95 backdrop-blur text-gray-800 p-4 rounded-xl shadow-lg w-full max-w-md mx-auto">
      <p className="font-semibold mb-2">{t('form.quickTitle')}</p>
      <div className="grid grid-cols-2 gap-2">
        <input name="name" placeholder={t('form.name')} required className="border p-2 rounded"/>
        <input name="phone" placeholder={t('form.phone')} required className="border p-2 rounded"/>
        <input name="email" placeholder={t('form.email')} className="border p-2 rounded col-span-2"/>
      </div>
      <button disabled={status==='sending'} className="mt-3 w-full bg-brand.gold text-gray-900 py-2 rounded-lg font-bold hover:opacity-90">{t('cta.schedule')}</button>
      {status==='ok' && <p className="text-green-700 mt-2 text-xs">{t('form.sent')}</p>}
      {status==='err' && <p className="text-red-700 mt-2 text-xs">{t('form.error')}</p>}
    </form>
  )
}
