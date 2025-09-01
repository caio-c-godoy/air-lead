// ...imports
type PlanCardProps = {
  title: string
  price: string
  features: string[]
  highlight?: boolean
  onSelect?: (planLabel: string) => void
}

export default function PlanCard({ title, price, features, highlight, onSelect }: PlanCardProps) {
  return (
    <div className={`rounded-2xl border ${highlight ? 'border-brand-gold/40 ring-1 ring-brand-gold/30' : 'border-white/10'} bg-white/5 p-5`}>
      <h3 className="font-semibold">{title}</h3>
      <div className="mt-2 text-3xl font-extrabold">{price}<span className="text-sm font-medium">/mo</span></div>

      <ul className="mt-4 space-y-2 text-sm opacity-90">
        {features.map((f, i)=> <li key={i}>✅ {f}</li>)}
      </ul>

      <button
        onClick={()=> onSelect?.(`${title} - ${price}`)}
        className="mt-5 w-full btn-primary"
      >
        Escolher esse
      </button>
    </div>
  )
}
