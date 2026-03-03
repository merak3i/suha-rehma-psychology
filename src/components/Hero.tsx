import { BackgroundCircles } from './ui/background-circles'

const CALENDLY_LINK = 'https://calendly.com/suha-rehma-therapy'

export default function Hero() {
  return (
    <section className="relative min-h-screen overflow-hidden bg-cream">
      {/* Animated background circles — suppress internal text */}
      <div className="absolute inset-0 pointer-events-none">
        <BackgroundCircles
          title=""
          description=""
          variant="suha"
          className="!bg-transparent"
        />
      </div>

      {/* Hero content overlay */}
      <div className="relative z-20 min-h-screen flex items-center justify-center px-6">
        <div className="max-w-3xl mx-auto text-center">
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
      </div>
    </section>
  )
}
