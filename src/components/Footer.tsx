import { motion, useReducedMotion } from 'framer-motion'
import { Linkedin, Instagram, ArrowRight } from 'lucide-react'
import { HoverGlowButton } from './ui/hover-glow-button'
import type { ReactNode } from 'react'

const CALENDLY_LINK = 'https://calendly.com/suha-rehma-therapy'

interface FooterLink {
  title: string
  href: string
  icon?: React.ComponentType<{ className?: string }>
}

interface FooterSection {
  label: string
  links: FooterLink[]
}

const footerLinks: FooterSection[] = [
  {
    label: 'Navigate',
    links: [
      { title: 'Services', href: '#services' },
      { title: 'Insights', href: '#insights' },
      { title: 'Book a Call', href: CALENDLY_LINK },
    ],
  },
  {
    label: 'Resources',
    links: [
      { title: 'Vandrevala Foundation', href: 'tel:9999666555' },
      { title: 'AASRA', href: 'tel:9820466726' },
      { title: 'iCall', href: 'tel:9152987821' },
    ],
  },
  {
    label: 'Connect',
    links: [
      { title: 'LinkedIn', href: 'https://www.linkedin.com/in/suha-rehma-/', icon: Linkedin },
      { title: 'Instagram', href: 'https://www.instagram.com/suha.xrehma/', icon: Instagram },
    ],
  },
]

function AnimatedContainer({
  className,
  delay = 0.1,
  children,
}: {
  className?: string
  delay?: number
  children: ReactNode
}) {
  const shouldReduceMotion = useReducedMotion()

  if (shouldReduceMotion) {
    return <div className={className}>{children}</div>
  }

  return (
    <motion.div
      initial={{ filter: 'blur(4px)', translateY: -8, opacity: 0 }}
      whileInView={{ filter: 'blur(0px)', translateY: 0, opacity: 1 }}
      viewport={{ once: true }}
      transition={{ delay, duration: 0.8 }}
      className={className}
    >
      {children}
    </motion.div>
  )
}

export default function Footer() {
  return (
    <footer className="relative w-full max-w-6xl mx-auto flex flex-col items-center justify-center rounded-t-[2rem] md:rounded-t-[3rem] border-t border-slate-blue/8 bg-[radial-gradient(35%_128px_at_50%_0%,rgba(81,117,137,0.06),transparent)] px-6 py-16 lg:py-20">
      <div className="absolute top-0 right-1/2 left-1/2 h-px w-1/3 -translate-x-1/2 -translate-y-1/2 rounded-full blur bg-slate-blue/15" />

      {/* Quote */}
      <AnimatedContainer className="text-center mb-14 max-w-2xl">
        <blockquote>
          <p className="font-serif text-xl md:text-2xl lg:text-3xl text-slate-blue/80 italic leading-relaxed">
            "At the center of your being you have the answer; you know who you are and you know what you want."
          </p>
          <cite className="block mt-4 text-sm text-cool-grey not-italic tracking-wide">
            — Lao Tzu
          </cite>
        </blockquote>
      </AnimatedContainer>

      {/* CTA */}
      <AnimatedContainer className="mb-16" delay={0.2}>
        <HoverGlowButton href={CALENDLY_LINK} size="xl">
          Book a Session <ArrowRight size={16} />
        </HoverGlowButton>
      </AnimatedContainer>

      {/* Grid */}
      <div className="grid w-full gap-8 xl:grid-cols-3 xl:gap-8">
        <AnimatedContainer className="space-y-4" delay={0.3}>
          <span className="font-serif text-xl font-medium text-slate-blue tracking-tight">
            Suha Rehma
          </span>
          <p className="text-sm text-slate-blue/50">
            Evidence-based psychology for the modern mind.
          </p>
        </AnimatedContainer>

        <div className="grid grid-cols-2 gap-8 md:grid-cols-3 xl:col-span-2">
          {footerLinks.map((section, index) => (
            <AnimatedContainer key={section.label} delay={0.3 + index * 0.1}>
              <div className="mb-10 md:mb-0">
                <h3 className="text-xs text-slate-blue font-medium tracking-widest uppercase">
                  {section.label}
                </h3>
                <ul className="mt-4 space-y-2 text-sm">
                  {section.links.map((link) => (
                    <li key={link.title}>
                      <a
                        href={link.href}
                        target={link.href.startsWith('http') ? '_blank' : undefined}
                        rel={link.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                        className="inline-flex items-center text-slate-blue/50 hover:text-slate-blue transition-all duration-300"
                      >
                        {link.icon && <link.icon className="mr-1.5 w-4 h-4" />}
                        {link.title}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            </AnimatedContainer>
          ))}
        </div>
      </div>

      {/* Bottom */}
      <AnimatedContainer className="mt-14 pt-8 border-t border-slate-blue/5 w-full text-center" delay={0.6}>
        <p className="text-xs text-cool-grey/50">
          &copy; {new Date().getFullYear()} Suha Rehma. All rights reserved.
        </p>
      </AnimatedContainer>
    </footer>
  )
}
