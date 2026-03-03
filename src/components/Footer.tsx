import { Linkedin, Instagram, ArrowRight } from 'lucide-react'

const CALENDLY_LINK = 'https://calendly.com/suha-rehma-therapy'

export default function Footer() {
  return (
    <footer className="border-t border-slate-blue/8 py-20 md:py-28 px-6">
      <div className="max-w-4xl mx-auto text-center">
        {/* Quote */}
        <blockquote className="mb-14">
          <p className="font-serif text-xl md:text-2xl lg:text-3xl text-slate-blue/80 italic leading-relaxed max-w-2xl mx-auto">
            "At the center of your being you have the answer; you know who you are and you know what you want."
          </p>
          <cite className="block mt-4 text-sm text-cool-grey not-italic tracking-wide">
            — Lao Tzu
          </cite>
        </blockquote>

        {/* CTA */}
        <a
          href={CALENDLY_LINK}
          className="inline-flex items-center gap-2 px-8 py-3.5 bg-slate-blue text-cream font-medium rounded-2xl hover:bg-slate-blue/90 transition-all hover:shadow-lg hover:shadow-slate-blue/20 hover:gap-3 mb-14"
        >
          Book a Session <ArrowRight size={16} />
        </a>

        {/* Social */}
        <div className="flex items-center justify-center gap-4 mb-12">
          <a
            href="https://www.linkedin.com/in/suha-rehma-/"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="LinkedIn"
            className="w-10 h-10 flex items-center justify-center rounded-full border border-slate-blue/10 text-slate-blue/50 hover:text-slate-blue hover:border-slate-blue/30 transition-colors"
          >
            <Linkedin size={18} />
          </a>
          <a
            href="https://www.instagram.com/suha.xrehma/"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Instagram"
            className="w-10 h-10 flex items-center justify-center rounded-full border border-slate-blue/10 text-slate-blue/50 hover:text-slate-blue hover:border-slate-blue/30 transition-colors"
          >
            <Instagram size={18} />
          </a>
        </div>

        {/* Bottom */}
        <p className="text-xs text-cool-grey/60">
          &copy; {new Date().getFullYear()} Suha Rehma. All rights reserved.
        </p>
      </div>
    </footer>
  )
}
