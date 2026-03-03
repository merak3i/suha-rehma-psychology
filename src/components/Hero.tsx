const CALENDLY_LINK = 'https://calendly.com/suha-rehma-therapy'

export default function Hero() {
  return (
    <section className="relative min-h-[90vh] flex items-center justify-center px-6">
      {/* Subtle gradient accent */}
      <div className="absolute top-20 right-10 w-72 h-72 bg-peach/40 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-20 left-10 w-56 h-56 bg-cool-grey/20 rounded-full blur-3xl pointer-events-none" />

      <div className="relative max-w-3xl mx-auto text-center">
        <p className="text-sm md:text-base font-medium text-cool-grey tracking-widest uppercase mb-6">
          Psychologist
        </p>

        <h1 className="font-serif text-5xl md:text-7xl lg:text-8xl font-medium text-slate-blue leading-[1.05] mb-8">
          Mental Health
          <br />
          <span className="italic">is a Skill.</span>
        </h1>

        <p className="text-lg md:text-xl text-slate-blue/70 max-w-xl mx-auto leading-relaxed mb-12">
          Evidence-based tools for the modern mind.
        </p>

        <a
          href={CALENDLY_LINK}
          className="inline-flex items-center px-8 py-3.5 bg-slate-blue text-cream font-medium rounded-2xl hover:bg-slate-blue/90 transition-all hover:shadow-lg hover:shadow-slate-blue/20"
        >
          Begin Here
        </a>
      </div>
    </section>
  )
}
