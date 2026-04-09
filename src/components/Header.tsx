import { useState, useEffect } from 'react'
import { Menu, X } from 'lucide-react'
import { HoverGlowButton } from './ui/hover-glow-button'
import { CALENDLY_URL } from '../config/constants'

const CALENDLY_LINK = CALENDLY_URL

export default function Header() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-cream/90 backdrop-blur-md shadow-sm'
          : 'bg-transparent'
      }`}
    >
      <nav className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
        <a
          href="#"
          className="font-serif text-xl md:text-2xl font-medium text-slate-blue tracking-tight"
        >
          Suha Rehma
        </a>

        {/* Desktop nav */}
        <div className="hidden md:flex items-center gap-8">
          <a
            href="#services"
            className="text-sm text-slate-blue/70 hover:text-slate-blue transition-colors"
          >
            Services
          </a>
          <a
            href="#insights"
            className="text-sm text-slate-blue/70 hover:text-slate-blue transition-colors"
          >
            Insights
          </a>
          <HoverGlowButton href={CALENDLY_LINK} size="sm">
            Book Call
          </HoverGlowButton>
        </div>

        {/* Mobile toggle */}
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="md:hidden text-slate-blue"
          aria-label="Toggle menu"
        >
          {mobileOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </nav>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="md:hidden bg-cream/95 backdrop-blur-md border-t border-slate-blue/10 px-6 py-6 space-y-4">
          <a
            href="#services"
            onClick={() => setMobileOpen(false)}
            className="block text-sm text-slate-blue/70 hover:text-slate-blue"
          >
            Services
          </a>
          <a
            href="#insights"
            onClick={() => setMobileOpen(false)}
            className="block text-sm text-slate-blue/70 hover:text-slate-blue"
          >
            Insights
          </a>
          <HoverGlowButton
            href={CALENDLY_LINK}
            size="sm"
            onClick={() => setMobileOpen(false)}
          >
            Book Call
          </HoverGlowButton>
        </div>
      )}
    </header>
  )
}
