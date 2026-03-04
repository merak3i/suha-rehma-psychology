import React, { useRef, useState } from 'react'
import type { MouseEvent, ReactNode } from 'react'

interface HoverGlowButtonProps {
  children: ReactNode
  onClick?: () => void
  className?: string
  disabled?: boolean
  glowColor?: string
  backgroundColor?: string
  textColor?: string
  hoverTextColor?: string
  href?: string
  target?: string
  rel?: string
  size?: 'sm' | 'default' | 'lg' | 'xl' | 'xxl'
}

const sizeClasses: Record<string, string> = {
  sm: 'px-5 py-2 text-sm rounded-lg',
  default: 'px-6 py-3 text-base rounded-lg',
  lg: 'px-7 py-3.5 text-base rounded-lg',
  xl: 'px-8 py-4 text-lg rounded-xl',
  xxl: 'px-10 py-5 text-xl rounded-xl',
}

function HoverGlowButton({
  children,
  onClick,
  className = '',
  disabled = false,
  glowColor = '#AABEC7',
  backgroundColor = 'transparent',
  textColor = '#517589',
  hoverTextColor = '#517589',
  href,
  target,
  rel,
  size = 'xl',
}: HoverGlowButtonProps) {
  const ref = useRef<HTMLElement>(null)
  const [glowPosition, setGlowPosition] = useState({ x: 50, y: 50 })
  const [isHovered, setIsHovered] = useState(false)

  const handleMouseMove = (e: MouseEvent<HTMLElement>) => {
    if (ref.current) {
      const rect = ref.current.getBoundingClientRect()
      const x = e.clientX - rect.left
      const y = e.clientY - rect.top
      setGlowPosition({ x, y })
    }
  }

  const handleMouseEnter = () => setIsHovered(true)
  const handleMouseLeave = () => setIsHovered(false)

  const sharedProps = {
    ref: ref as React.RefObject<any>,
    onClick,
    onMouseMove: handleMouseMove,
    onMouseEnter: handleMouseEnter,
    onMouseLeave: handleMouseLeave,
    className: `relative inline-flex items-center justify-center gap-2 border border-slate-blue/15 cursor-pointer overflow-hidden transition-all duration-300 font-sans font-medium hover:scale-[1.03] hover:shadow-lg hover:shadow-slate-blue/8 ${sizeClasses[size]} ${disabled ? 'opacity-50 cursor-not-allowed' : ''} ${className}`,
    style: {
      backgroundColor,
      color: isHovered ? hoverTextColor : textColor,
    },
  }

  const inner = (
    <>
      <div
        className={`absolute rounded-full pointer-events-none transition-transform duration-500 ease-out ${isHovered ? 'scale-[1.5]' : 'scale-0'}`}
        style={{
          width: 200,
          height: 200,
          left: `${glowPosition.x}px`,
          top: `${glowPosition.y}px`,
          transform: `translate(-50%, -50%) ${isHovered ? 'scale(1.5)' : 'scale(0)'}`,
          background: `radial-gradient(circle, ${glowColor} 0%, transparent 70%)`,
          opacity: 0.4,
          zIndex: 0,
        }}
      />
      <span className="relative z-10 inline-flex items-center gap-2">{children}</span>
    </>
  )

  if (href) {
    return (
      <a href={href} target={target} rel={rel} {...(sharedProps as any)}>
        {inner}
      </a>
    )
  }

  return (
    <button disabled={disabled} {...(sharedProps as any)}>
      {inner}
    </button>
  )
}

export { HoverGlowButton }
