'use client'
import { useState } from 'react'

type Props = {
  open: boolean
  onClose: () => void
  plan: string
  locale?: string
}

export default function LeadModal({ open, onClose, plan, locale }: Props) {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [address, setAddress] = useState('')
  const [loading, setLoading] = useState(false)
  const [ok, setOk] = useState<boolean | null>(null)

  if (!open) return null

  const submit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setOk(null)
    try {
      const utm = {
        source: new URLSearchParams(window.location.search).get('utm_source'),
        medium: new URLSearchParams(window.location.search).get('utm_medium'),
        campaign: new URLSearchParams(window.location.search).get('utm_campaign'),
      }

      const res = await fetch('/api/lead', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, phone, address, plan, locale, utm }),
      })

      setOk(res.ok)
      if (res.ok) {
        setName(''); setEmail(''); setPhone(''); setAddress('')
      }
    } catch {
      setOk(false)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="fixed inset-0 z-[999] flex items-center justify-center bg-black/60 backdrop-blur">
      <div className="w-full max-w-lg rounded-2xl border border-white/10 bg-brand-blue p-6 text-white shadow-2xl">
        <div className="flex items-start justify-between mb-4">
          <h3 className="text-xl font-bold">Complete seus dados</h3>
          <button onClick={onClose} className="opacity-70 hover:opacity-100">✕</button>
        </div>

        <p className="mb-4 text-sm opacity-80">
          Plano selecionado: <b>{plan}</b>
        </p>

        <form onSubmit={submit} className="space-y-3">
          <input className="w-full rounded-lg bg-white/10 px-3 py-2 outline-none"
                 placeholder="Nome" value={name} onChange={e=>setName(e.target.value)} required />
          <input className="w-full rounded-lg bg-white/10 px-3 py-2 outline-none"
                 placeholder="E-mail" type="email" value={email} onChange={e=>setEmail(e.target.value)} required />
          <input className="w-full rounded-lg bg-white/10 px-3 py-2 outline-none"
                 placeholder="Telefone" value={phone} onChange={e=>setPhone(e.target.value)} required />
          <input className="w-full rounded-lg bg-white/10 px-3 py-2 outline-none"
                 placeholder="Endereço" value={address} onChange={e=>setAddress(e.target.value)} />

          <button
            disabled={loading}
            className="btn-primary w-full disabled:opacity-60"
            type="submit"
          >
            {loading ? 'Enviando…' : 'Entrar em contato'}
          </button>
        </form>

        {ok === true && <p className="mt-3 text-emerald-400 text-sm">Recebemos seus dados. Em breve entraremos em contato!</p>}
        {ok === false && <p className="mt-3 text-red-400 text-sm">Houve um erro ao enviar. Tente novamente.</p>}
      </div>
    </div>
  )
}
