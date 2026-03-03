import { Clock, ArrowRight } from 'lucide-react'

const CALENDLY_LINK = 'https://calendly.com/suha-rehma-therapy'

const services = [
  {
    title: 'Discovery Call',
    duration: '15 min',
    price: 'Free',
    description:
      'A brief, structured conversation to assess fit and outline a path forward.',
  },
  {
    title: 'Therapy Session',
    duration: '50 min',
    price: '\u20B91,000',
    description:
      'Evidence-based individual therapy grounded in cognitive and behavioural frameworks.',
  },
]

export default function Services() {
  return (
    <section id="services" className="py-28 md:py-36 px-6">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-16 md:mb-20">
          <p className="text-sm font-medium text-cool-grey tracking-widest uppercase mb-4">
            Services
          </p>
          <h2 className="font-serif text-3xl md:text-5xl text-slate-blue font-medium">
            Two entry points. Zero friction.
          </h2>
        </div>

        <div className="grid md:grid-cols-2 gap-6 md:gap-8">
          {services.map((s) => (
            <a
              key={s.title}
              href={CALENDLY_LINK}
              className="group block bg-white/60 backdrop-blur-sm border border-slate-blue/8 rounded-3xl p-8 md:p-10 hover:shadow-xl hover:shadow-slate-blue/5 transition-all duration-300 hover:-translate-y-1"
            >
              <div className="flex items-center gap-2 text-cool-grey mb-6">
                <Clock size={16} />
                <span className="text-sm">{s.duration}</span>
              </div>

              <h3 className="font-serif text-2xl md:text-3xl text-slate-blue font-medium mb-3">
                {s.title}
              </h3>

              <p className="text-slate-blue/60 leading-relaxed mb-8">
                {s.description}
              </p>

              <div className="flex items-center justify-between">
                <span className="text-2xl md:text-3xl font-serif font-medium text-slate-blue">
                  {s.price}
                </span>
                <span className="inline-flex items-center gap-2 text-sm font-medium text-slate-blue group-hover:gap-3 transition-all">
                  Book Now <ArrowRight size={16} />
                </span>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  )
}
