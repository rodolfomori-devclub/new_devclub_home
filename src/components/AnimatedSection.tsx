import { ReactNode, CSSProperties } from 'react'
import { useInView } from '../hooks/useInView'

type AnimationType =
  | 'fade-up'
  | 'fade-down'
  | 'fade-left'
  | 'fade-right'
  | 'fade'
  | 'scale'
  | 'slide-up'

interface AnimatedSectionProps {
  children: ReactNode
  animation?: AnimationType
  delay?: number
  duration?: number
  className?: string
  style?: CSSProperties
  threshold?: number
}

export function AnimatedSection({
  children,
  animation = 'fade-up',
  delay = 0,
  duration = 0.8,
  className = '',
  style = {},
  threshold = 0.1
}: AnimatedSectionProps) {
  const { ref, isInView } = useInView({ threshold })

  const animationStyles: CSSProperties = {
    opacity: isInView ? 1 : 0,
    transform: getInitialTransform(animation, isInView),
    transition: `opacity ${duration}s cubic-bezier(0.25, 0.46, 0.45, 0.94) ${delay}s, transform ${duration}s cubic-bezier(0.25, 0.46, 0.45, 0.94) ${delay}s`,
    ...style
  }

  return (
    <div
      ref={ref}
      className={className}
      style={animationStyles}
    >
      {children}
    </div>
  )
}

function getInitialTransform(animation: AnimationType, isInView: boolean): string {
  if (isInView) return 'none'

  switch (animation) {
    case 'fade-up':
      return 'translateY(40px)'
    case 'fade-down':
      return 'translateY(-40px)'
    case 'fade-left':
      return 'translateX(-40px)'
    case 'fade-right':
      return 'translateX(40px)'
    case 'scale':
      return 'scale(0.9)'
    case 'slide-up':
      return 'translateY(100px)'
    case 'fade':
    default:
      return 'none'
  }
}

export default AnimatedSection
