'use client'

import { useMemo, useState } from 'react'
import PlanCard from '@/components/PlanCard'
import LeadModal from '@/components/LeadModal'

type VisibleId = 'p1' | 'p2' | 'p3'

export default function PlansSection({
  messages,
  locale,
  visible = ['p1', 'p2', 'p3'],
}: {
  messages: any
  locale: string
  /** Quais planos exibir (padrão: ['p1','p2','p3']) */
  visible?: VisibleId[]
}) {
  const t = (k: string) => k.split('.').reduce((o: any, p: string) => o?.[p], messages) ?? k

  const plans = useMemo(
    () => [
      {
        id: 'p1' as const,
        title: t('plan1.title'),
        price: '$98',
        features: [t('plan1.p1'), t('plan1.p2'), t('plan1.p3')],
        highlight: false,
      },
      {
        id: 'p2' as const,
        title: t('plan2.title'),
        price: '$129',
        features: [t('plan2.p1'), t('plan2.p2'), t('plan2.p3')],
        highlight: false,
      },
      {
        id: 'p3' as const,
        title: t('plan3.title'),
        price: '$179',
        features: [t('plan3.p1'), t('plan3.p2'), t('plan3.p3')],
        highlight: true,
      },
    ],
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [messages]
  )

  const [open, setOpen] = useState(false)
  const [selPlan, setSelPlan] = useState('')

  const onChoose = (planLabel: string) => {
    setSelPlan(planLabel)
    setOpen(true)
  }

  return (
    <>
      {/* Apenas a grid de cards (o <section> e o <h2> ficam no page.tsx) */}
      <div className="grid md:grid-cols-3 gap-6">
        {plans
          .filter((p) => visible.includes(p.id))
          .map((p) => (
            <PlanCard
              key={p.id}
              title={p.title}
              price={p.price}
              features={p.features}
              highlight={p.highlight}
              onSelect={onChoose}
            />
          ))}
      </div>

      <LeadModal open={open} onClose={() => setOpen(false)} plan={selPlan} locale={locale} />
    </>
  )
}
