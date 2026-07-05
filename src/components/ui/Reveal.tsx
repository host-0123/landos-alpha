import { motion, type MotionProps } from 'motion/react'
import type { ReactNode } from 'react'

interface RevealProps extends MotionProps {
  children: ReactNode
  className?: string
  delay?: number
}

/** Fades content up as it scrolls into view. */
export function Reveal({ children, className, delay = 0, ...rest }: RevealProps) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] }}
      {...rest}
    >
      {children}
    </motion.div>
  )
}
