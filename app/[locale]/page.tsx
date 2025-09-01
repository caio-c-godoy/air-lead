// app/[locale]/page.tsx
import Image from 'next/image'
import Nav from '@/components/Nav'
import Footer from '@/components/Footer'
import FloatingWhatsApp from '@/components/FloatingWhatsApp'
import { getMessages } from '@/lib/i18n'
import PlansSection from '@/components/PlansSection'

export default async function Page({ params }: { params: { locale: string } }) {
  const messages = getMessages(params.locale)
  const t = (k: string) => k.split('.').reduce((o: any, p: string) => o?.[p], messages) ?? k

  const wa = process.env.WHATSAPP_NUMBER || '14070000000'
  const waHref = `https://wa.me/${wa}?text=${encodeURIComponent(
    'Olá! Quero um orçamento de manutenção preventiva de ar-condicionado (Victorious).'
  )}`

  return (
    <main>
      <Nav messages={messages} locale={params.locale} />

      {/* HERO com vídeo explicativo */}
      <section className="from-brand-blue to-black bg-gradient-to-br text-white pt-28 pb-16">
        <div className="container grid md:grid-cols-2 gap-8 items-center">
          <div>
            <h1 className="text-4xl md:text-5xl font-extrabold">
              {t('hero.title')}
            </h1>
            <p className="mt-4 text-lg opacity-90">{t('hero.subtitle')}</p>

            <div className="flex gap-3 mt-6">
              <a href="#plans" className="btn-primary">
                {t('cta.schedule')}
              </a>
              <a
                href={waHref}
                target="_blank"
                className="btn-ghost border-brand-gold text-brand-gold"
              >
                {t('cta.whatsapp')}
              </a>
            </div>
          </div>

          <div className="rounded-2xl overflow-hidden border border-white/10 shadow-[0_20px_60px_-15px_rgba(0,0,0,0.6)]">
            <div className="aspect-video">
              <iframe
                className="h-full w-full"
                src="https://www.youtube.com/embed/VIDEO_ID?rel=0"
                title="Por que fazer manutenção preventiva"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>
          </div>
        </div>
      </section>

      {/* BENEFÍCIOS */}
      <section id="benefits" className="container py-16">
        <h2 className="text-3xl font-bold text-center mb-10">
          {t('benefits.title')}
        </h2>
        <div className="grid md:grid-cols-3 gap-8 text-center">
          <div className="card p-6">
            <h3 className="text-xl font-semibold text-brand-gold mb-2">Save</h3>
            <p className="opacity-90">{t('benefits.b1')}</p>
          </div>
          <div className="card p-6">
            <h3 className="text-xl font-semibold text-brand-gold mb-2">Prevent</h3>
            <p className="opacity-90">{t('benefits.b2')}</p>
          </div>
          <div className="card p-6">
            <h3 className="text-xl font-semibold text-brand-gold mb-2">Monitor</h3>
            <p className="opacity-90">{t('benefits.b3')}</p>
          </div>
        </div>
      </section>

      {/* PLANOS */}
      <section id="plans" className="py-16 bg-white/5">
        <div className="container">
          <h2 className="text-3xl font-bold text-center mb-10">
            {t('plans')}
          </h2>

          {/* Passo as mensagens inteiras para o client; é serializável */}
          <PlansSection messages={messages} locale={params.locale} />
        </div>
      </section>

      {/* SENTINEL360 */}
      <section id="sentinel" className="container py-20">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Texto */}
          <div>
            <div className="inline-flex items-center gap-2 mb-4 rounded-full bg-white/10 border border-white/10 px-3 py-1 text-xs uppercase tracking-wide">
              <span className="text-brand-gold font-bold">Parceira</span>
              <span className="opacity-80">Victorious + Sentinel360</span>
            </div>

            <h2 className="text-3xl md:text-4xl font-extrabold leading-tight mb-4">
              {t('sentinel.title')}
            </h2>

            <p className="opacity-90 mb-4">{t('sentinel.p')}</p>

            <div className="mt-1 inline-flex items-center gap-2 rounded-lg border border-white/10 bg-white/5 px-3 py-2">
              <span className="text-[11px] uppercase tracking-wider text-white/70">
                Tecnologia:
              </span>
              <Image
                src="/sentinel360.png"
                alt="Sentinel360"
                width={120}
                height={32}
                className="h-6 w-auto object-contain"
              />
            </div>

            <ul className="mt-4 space-y-2 text-sm opacity-90">
              <li>• {t('sentinel.li1')}</li>
              <li>• {t('sentinel.li2')}</li>
              <li>• {t('sentinel.li3')}</li>
            </ul>
          </div>

          {/* Card showcase estilizado */}
          <div className="relative flex justify-center">
            <div className="pointer-events-none absolute -inset-6 rounded-3xl bg-gradient-to-r from-brand-gold/20 via-transparent to-brand-gold/20 blur-2xl opacity-60" />
            <div className="group relative w-full max-w-xl rounded-3xl border border-white/10 bg-white/5/80 backdrop-blur-xl shadow-[0_20px_60px_-15px_rgba(0,0,0,0.7)] ring-1 ring-white/10 hover:ring-brand-gold/40 transition-all duration-500">
              <div className="pointer-events-none absolute -inset-[2px] rounded-3xl bg-gradient-to-r from-brand-gold/35 via-transparent to-brand-gold/35 opacity-0 blur-lg transition-opacity duration-500 group-hover:opacity-100" />
              <div className="absolute inset-0 rounded-3xl [background:radial-gradient(1200px_400px_at_0%_0%,rgba(255,215,0,0.06),transparent_60%),radial-gradient(1200px_400px_at_100%_100%,rgba(255,215,0,0.05),transparent_60%)]" />

              <div className="relative p-3 md:p-4">
                <div className="overflow-hidden rounded-2xl aspect-[4/3] bg-black/20 shadow-[0_8px_30px_rgba(0,0,0,0.35)]">
                  <Image
                    src="/sensor1.png"
                    alt="Sensor Sentinel360 instalado em ambiente interno"
                    width={1200}
                    height={900}
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                    priority
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CONTATO enxuto */}
      <section id="contact" className="py-16">
        <div className="container text-center">
          <h2 className="text-3xl font-bold mb-4">{t('contact.title')}</h2>
          <p className="opacity-80 mb-6">
          {t('contact.subtitle')}
        </p>

          <div className="flex flex-col sm:flex-row justify-center gap-3">
            <a href={waHref} target="_blank" className="btn-primary">
              WhatsApp
            </a>
            <a href="mailto:caio@4uit.us" className="btn-ghost border-white/20">
              E-mail
            </a>
          </div>
        </div>
      </section>

      <Footer t={(k: string) => t(k)} />
      <FloatingWhatsApp waHref={waHref} />
    </main>
  )
}
