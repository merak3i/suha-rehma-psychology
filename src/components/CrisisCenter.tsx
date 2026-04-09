import { Phone } from 'lucide-react'
import { CRISIS_LINES } from '../config/constants'

export default function CrisisCenter() {
  return (
    <section className="py-20 md:py-28 px-6">
      <div className="max-w-3xl mx-auto">
        <div className="bg-peach/40 border border-peach rounded-3xl p-8 md:p-12 text-center">
          <p className="text-sm font-medium text-cool-grey tracking-widest uppercase mb-4">
            India Crisis Support
          </p>

          <h2 className="font-serif text-2xl md:text-3xl text-slate-blue font-medium mb-3">
            You are not alone.
          </h2>

          <p className="text-slate-blue/60 mb-10 max-w-md mx-auto">
            If you or someone you know is in crisis, reach out to a trained professional immediately.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 md:gap-6">
            {CRISIS_LINES.map((l) => (
              <a
                key={l.name}
                href={l.tel}
                className="inline-flex items-center gap-2.5 bg-white/80 backdrop-blur-sm border border-slate-blue/10 rounded-2xl px-5 py-3 hover:shadow-md transition-all group"
              >
                <Phone
                  size={16}
                  className="text-slate-blue/50 group-hover:text-slate-blue transition-colors"
                />
                <div className="text-left">
                  <p className="text-xs text-cool-grey leading-none mb-0.5">
                    {l.name}
                  </p>
                  <p className="text-sm font-medium text-slate-blue">
                    {l.number}
                  </p>
                </div>
              </a>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
