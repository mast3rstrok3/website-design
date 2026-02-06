import { Link } from 'react-router-dom'
import {
  motion,
  useScroll,
  useTransform,
  useInView,
  useMotionValue,
  useSpring,
} from 'framer-motion'
import {
  Brain,
  Shield,
  Activity,
  ClipboardList,
  ArrowLeft,
  ArrowRight,
  ArrowUpRight,
  Sparkles,
  Zap,
} from 'lucide-react'
import { useRef, useEffect, useState, useCallback } from 'react'
import {
  stats,
  testimonials,
  studies,
  features,
  brandName,
  tagline,
  heroHeadline,
  heroSubheadline,
  ctaPrimary,
  ctaSecondary,
} from '../shared/MockData'
import { cn } from '../shared/cn'

// ---------------------------------------------------------------------------
// Kinetic — Design #10
// Motion-first design. Everything is animated on scroll. Heaviest animation
// of all 15 designs. Scroll-driven choreography with framer-motion's
// useScroll, useTransform, useInView.
// Palette: #fafafa bg + electric indigo #4f46e5 + hot pink #ec4899 + #0f0f0f
// Fonts: Space Grotesk headlines, Inter body
// ---------------------------------------------------------------------------

const FONT_HEADLINE = "'Space Grotesk', system-ui, sans-serif"
const FONT_BODY = "'Inter', system-ui, sans-serif"

const iconMap: Record<string, React.ComponentType<{ size?: number; strokeWidth?: number; className?: string }>> = {
  brain: Brain,
  shield: Shield,
  activity: Activity,
  clipboard: ClipboardList,
}

// ---------------------------------------------------------------------------
// Counter animation hook — numbers count up when in view
// ---------------------------------------------------------------------------
function useCounter(target: number, duration: number = 2000) {
  const [count, setCount] = useState(0)
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, amount: 0.5 })
  const hasAnimated = useRef(false)

  useEffect(() => {
    if (inView && !hasAnimated.current) {
      hasAnimated.current = true
      const startTime = performance.now()
      const animate = (now: number) => {
        const elapsed = now - startTime
        const progress = Math.min(elapsed / duration, 1)
        // Ease out cubic
        const eased = 1 - Math.pow(1 - progress, 3)
        setCount(Math.round(eased * target))
        if (progress < 1) requestAnimationFrame(animate)
      }
      requestAnimationFrame(animate)
    }
  }, [inView, target, duration])

  return { count, ref }
}

// ---------------------------------------------------------------------------
// Floating geometric decorations that move with scroll
// ---------------------------------------------------------------------------
function FloatingShape({
  className,
  scrollYProgress,
  yRange,
  rotateRange,
  xRange,
}: {
  className?: string
  scrollYProgress: ReturnType<typeof useMotionValue>
  yRange: [string, string]
  rotateRange: [number, number]
  xRange?: [string, string]
}) {
  const y = useTransform(scrollYProgress as ReturnType<typeof useMotionValue<number>>, [0, 1], yRange)
  const rotate = useTransform(scrollYProgress as ReturnType<typeof useMotionValue<number>>, [0, 1], rotateRange)
  const x = xRange
    ? useTransform(scrollYProgress as ReturnType<typeof useMotionValue<number>>, [0, 1], xRange)
    : undefined

  return (
    <motion.div
      className={cn('absolute pointer-events-none', className)}
      style={{ y, rotate, ...(x ? { x } : {}) }}
    />
  )
}

// ---------------------------------------------------------------------------
// Parallax wrapper for sections
// ---------------------------------------------------------------------------
function ParallaxSection({
  children,
  className,
  id,
  speed = 0.1,
}: {
  children: React.ReactNode
  className?: string
  id?: string
  speed?: number
}) {
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  })
  const y = useTransform(scrollYProgress, [0, 1], [`${speed * 100}px`, `${-speed * 100}px`])

  return (
    <div ref={ref} id={id} className={cn('relative overflow-hidden', className)}>
      <motion.div style={{ y }}>{children}</motion.div>
    </div>
  )
}

// ---------------------------------------------------------------------------
// Animated gradient text
// ---------------------------------------------------------------------------
function GradientText({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <span
      className={cn(
        'bg-gradient-to-r from-indigo-600 via-pink-500 to-indigo-600 bg-clip-text text-transparent bg-[length:200%_auto]',
        className
      )}
      style={{
        animation: 'gradient-shift 4s ease-in-out infinite',
      }}
    >
      {children}
    </span>
  )
}

// ---------------------------------------------------------------------------
// Feature card that cascades from alternating sides
// ---------------------------------------------------------------------------
function FeatureCard({
  feature,
  index,
}: {
  feature: (typeof features)[number]
  index: number
}) {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, amount: 0.3 })
  const Icon = iconMap[feature.icon] || Brain
  const fromLeft = index % 2 === 0

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, x: fromLeft ? -120 : 120, rotateY: fromLeft ? -8 : 8 }}
      animate={
        inView
          ? { opacity: 1, x: 0, rotateY: 0 }
          : { opacity: 0, x: fromLeft ? -120 : 120, rotateY: fromLeft ? -8 : 8 }
      }
      transition={{
        duration: 0.8,
        ease: [0.16, 1, 0.3, 1],
        delay: index * 0.12,
      }}
      className="group relative"
    >
      <div
        className={cn(
          'relative p-8 md:p-10 rounded-2xl border border-[#0f0f0f]/8',
          'bg-white/80 backdrop-blur-sm',
          'hover:border-indigo-500/30 hover:shadow-[0_8px_40px_rgba(79,70,229,0.08)]',
          'transition-all duration-500'
        )}
      >
        {/* Accent line */}
        <motion.div
          className="absolute top-0 left-8 right-8 h-[2px] rounded-full bg-gradient-to-r from-indigo-600 to-pink-500"
          initial={{ scaleX: 0 }}
          animate={inView ? { scaleX: 1 } : { scaleX: 0 }}
          transition={{ duration: 0.6, delay: index * 0.12 + 0.4, ease: [0.16, 1, 0.3, 1] }}
          style={{ transformOrigin: fromLeft ? 'left' : 'right' }}
        />

        <div className="flex items-start gap-5">
          <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-gradient-to-br from-indigo-600 to-pink-500 flex items-center justify-center text-white shadow-lg shadow-indigo-500/20">
            <Icon size={20} strokeWidth={1.8} />
          </div>
          <div className="flex-1">
            <h3
              className="text-[17px] font-semibold tracking-[-0.01em] text-[#0f0f0f] mb-2"
              style={{ fontFamily: FONT_HEADLINE }}
            >
              {feature.title}
            </h3>
            <p className="text-[14px] leading-[1.75] text-[#0f0f0f]/50" style={{ fontFamily: FONT_BODY }}>
              {feature.description}
            </p>
          </div>
        </div>
      </div>
    </motion.div>
  )
}

// ---------------------------------------------------------------------------
// Study card for horizontal scroll
// ---------------------------------------------------------------------------
function StudyCard({
  study,
  index,
}: {
  study: (typeof studies)[number]
  index: number
}) {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, amount: 0.3 })
  const pct = study.target > 0 ? Math.round((study.patients / study.target) * 100) : 0

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 60, scale: 0.95 }}
      animate={inView ? { opacity: 1, y: 0, scale: 1 } : {}}
      transition={{
        duration: 0.7,
        ease: [0.16, 1, 0.3, 1],
        delay: index * 0.1,
      }}
      className="flex-shrink-0 w-[340px] md:w-[400px]"
    >
      <div
        className={cn(
          'h-full p-7 rounded-2xl border border-white/10',
          'bg-gradient-to-br from-white/[0.06] to-white/[0.02]',
          'backdrop-blur-sm hover:border-indigo-500/30',
          'transition-all duration-500 group cursor-pointer'
        )}
      >
        <div className="flex items-center gap-2 mb-5">
          <span
            className={cn(
              'text-[10px] font-bold tracking-[0.12em] uppercase px-2.5 py-1 rounded-full',
              study.status === 'Enrolling'
                ? 'bg-indigo-500/20 text-indigo-300'
                : 'bg-white/10 text-white/40'
            )}
          >
            {study.status}
          </span>
          <span className="text-[10px] font-bold tracking-[0.1em] uppercase text-white/30">
            {study.phase}
          </span>
        </div>

        <h3
          className="text-[17px] font-semibold tracking-[-0.01em] text-white mb-2 group-hover:text-indigo-300 transition-colors"
          style={{ fontFamily: FONT_HEADLINE }}
        >
          {study.title}
        </h3>

        <p className="text-[13px] text-white/40 mb-1" style={{ fontFamily: FONT_BODY }}>
          {study.university}
        </p>
        <p className="text-[13px] text-pink-400/70 mb-6" style={{ fontFamily: FONT_BODY }}>
          {study.condition}
        </p>

        {/* Enrollment bar */}
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-[11px] text-white/30 font-medium">Enrollment</span>
            <span className="text-[11px] text-white/50 font-semibold tabular-nums">
              {study.patients}/{study.target}
            </span>
          </div>
          <div className="h-1.5 bg-white/10 rounded-full overflow-hidden">
            <motion.div
              className="h-full rounded-full bg-gradient-to-r from-indigo-500 to-pink-500"
              initial={{ width: 0 }}
              animate={inView ? { width: `${pct}%` } : { width: 0 }}
              transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1], delay: 0.4 + index * 0.1 }}
            />
          </div>
        </div>
      </div>
    </motion.div>
  )
}

// ---------------------------------------------------------------------------
// Testimonial card that scales up from small
// ---------------------------------------------------------------------------
function TestimonialCard({
  testimonial,
  index,
}: {
  testimonial: (typeof testimonials)[number]
  index: number
}) {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, amount: 0.3 })

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, scale: 0.6, y: 40 }}
      animate={inView ? { opacity: 1, scale: 1, y: 0 } : {}}
      transition={{
        duration: 0.8,
        ease: [0.16, 1, 0.3, 1],
        delay: index * 0.15,
      }}
    >
      <blockquote
        className={cn(
          'h-full p-8 md:p-10 rounded-2xl border border-[#0f0f0f]/6',
          'bg-white hover:shadow-[0_12px_50px_rgba(79,70,229,0.06)]',
          'transition-all duration-500'
        )}
      >
        {/* Quote mark */}
        <div className="mb-5">
          <GradientText className="text-[48px] leading-none font-bold" >&ldquo;</GradientText>
        </div>

        <p
          className="text-[15px] md:text-[16px] leading-[1.75] text-[#0f0f0f]/60 mb-8"
          style={{ fontFamily: FONT_BODY }}
        >
          {testimonial.quote}
        </p>

        <footer className="flex items-center gap-4">
          <div className="w-11 h-11 rounded-full bg-gradient-to-br from-indigo-600 to-pink-500 flex items-center justify-center text-white text-[12px] font-bold tracking-[0.05em]">
            {testimonial.avatar}
          </div>
          <div>
            <div
              className="text-[14px] font-semibold text-[#0f0f0f]"
              style={{ fontFamily: FONT_HEADLINE }}
            >
              {testimonial.name}
            </div>
            <div className="text-[12px] text-[#0f0f0f]/40 mt-0.5" style={{ fontFamily: FONT_BODY }}>
              {testimonial.credential}
            </div>
          </div>
        </footer>
      </blockquote>
    </motion.div>
  )
}

// ---------------------------------------------------------------------------
// Stat counter component
// ---------------------------------------------------------------------------
function StatCounter({ stat, index }: { stat: (typeof stats)[number]; index: number }) {
  // Parse numeric value from stat string
  const numericStr = stat.value.replace(/[^0-9]/g, '')
  const numericVal = parseInt(numericStr, 10) || 0
  const prefix = stat.value.match(/^[^0-9]*/)?.[0] || ''
  const suffix = stat.value.match(/[^0-9]*$/)?.[0] || ''
  const { count, ref } = useCounter(numericVal, 2200)

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.5 }}
      transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1], delay: index * 0.12 }}
      className="text-center"
    >
      <div
        className="text-[clamp(2.5rem,6vw,5rem)] font-bold tracking-[-0.04em] leading-none mb-3"
        style={{ fontFamily: FONT_HEADLINE }}
      >
        <GradientText>
          {prefix}
          {count.toLocaleString()}
          {suffix}
        </GradientText>
      </div>
      <div
        className="text-[12px] font-medium tracking-[0.15em] uppercase text-[#0f0f0f]/40"
        style={{ fontFamily: FONT_BODY }}
      >
        {stat.label}
      </div>
    </motion.div>
  )
}

// ---------------------------------------------------------------------------
// Mouse-following gradient orb for hero
// ---------------------------------------------------------------------------
function HeroOrb() {
  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)
  const springX = useSpring(mouseX, { stiffness: 50, damping: 30 })
  const springY = useSpring(mouseY, { stiffness: 50, damping: 30 })

  const handleMouseMove = useCallback(
    (e: MouseEvent) => {
      mouseX.set(e.clientX - window.innerWidth / 2)
      mouseY.set(e.clientY - window.innerHeight / 2)
    },
    [mouseX, mouseY]
  )

  useEffect(() => {
    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [handleMouseMove])

  return (
    <motion.div
      className="absolute w-[600px] h-[600px] rounded-full pointer-events-none"
      style={{
        x: springX,
        y: springY,
        background:
          'radial-gradient(circle, rgba(79,70,229,0.08) 0%, rgba(236,72,153,0.04) 50%, transparent 70%)',
        top: '50%',
        left: '50%',
        marginTop: '-300px',
        marginLeft: '-300px',
      }}
    />
  )
}

// ---------------------------------------------------------------------------
// Hero headline words that assemble from different directions
// ---------------------------------------------------------------------------
const heroWords = heroHeadline.split(' ')

const wordDirections: Array<{ x: number; y: number; rotate: number }> = [
  { x: -200, y: -60, rotate: -12 },
  { x: 150, y: 80, rotate: 8 },
  { x: -100, y: 100, rotate: -5 },
  { x: 200, y: -40, rotate: 15 },
  { x: -180, y: 50, rotate: -10 },
  { x: 120, y: -80, rotate: 6 },
  { x: -60, y: 120, rotate: -8 },
  { x: 180, y: 60, rotate: 12 },
  { x: -140, y: -90, rotate: -14 },
  { x: 100, y: 110, rotate: 9 },
]

// ---------------------------------------------------------------------------
// Main Component
// ---------------------------------------------------------------------------
export default function Design10() {
  const pageRef = useRef<HTMLDivElement>(null)
  const heroRef = useRef<HTMLDivElement>(null)
  const studiesScrollRef = useRef<HTMLDivElement>(null)

  // Full-page scroll progress for floating decorations
  const { scrollYProgress: pageScroll } = useScroll()

  // Hero parallax
  const { scrollYProgress: heroScrollProgress } = useScroll({
    target: heroRef,
    offset: ['start start', 'end start'],
  })
  const heroY = useTransform(heroScrollProgress, [0, 1], ['0%', '30%'])
  const heroOpacity = useTransform(heroScrollProgress, [0, 0.7], [1, 0])

  // Studies horizontal scroll
  const { scrollYProgress: studiesScroll } = useScroll({
    target: studiesScrollRef,
    offset: ['start end', 'end start'],
  })
  const studiesX = useTransform(studiesScroll, [0, 1], ['5%', '-15%'])

  return (
    <div
      ref={pageRef}
      className="design-page bg-[#fafafa] text-[#0f0f0f] selection:bg-indigo-600 selection:text-white overflow-hidden"
      style={{ fontFamily: FONT_BODY }}
    >
      {/* Keyframes for gradient animation */}
      <style>{`
        @keyframes gradient-shift {
          0%, 100% { background-position: 0% center; }
          50% { background-position: 100% center; }
        }
        @keyframes float-slow {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-20px); }
        }
        @keyframes pulse-ring {
          0% { transform: scale(1); opacity: 0.3; }
          100% { transform: scale(1.5); opacity: 0; }
        }
      `}</style>

      {/* ================================================================= */}
      {/* Floating Geometric Decorations */}
      {/* ================================================================= */}
      <FloatingShape
        scrollYProgress={pageScroll}
        yRange={['0px', '-400px']}
        rotateRange={[0, 180]}
        className="top-[200px] right-[8%] w-20 h-20 rounded-full border-2 border-indigo-600/10 hidden lg:block"
      />
      <FloatingShape
        scrollYProgress={pageScroll}
        yRange={['0px', '-600px']}
        rotateRange={[0, -120]}
        className="top-[600px] left-[5%] w-3 h-3 rounded-full bg-pink-500/20 hidden lg:block"
      />
      <FloatingShape
        scrollYProgress={pageScroll}
        yRange={['0px', '-300px']}
        rotateRange={[0, 90]}
        className="top-[900px] right-[12%] w-16 h-16 border border-pink-500/10 hidden lg:block"
      />
      <FloatingShape
        scrollYProgress={pageScroll}
        yRange={['0px', '-500px']}
        rotateRange={[45, -45]}
        xRange={['0px', '40px']}
        className="top-[1400px] left-[10%] w-6 h-6 bg-indigo-600/8 rounded-sm hidden lg:block"
      />
      <FloatingShape
        scrollYProgress={pageScroll}
        yRange={['0px', '-700px']}
        rotateRange={[0, 270]}
        className="top-[1800px] right-[6%] w-24 h-24 rounded-full border border-indigo-600/6 hidden lg:block"
      />
      <FloatingShape
        scrollYProgress={pageScroll}
        yRange={['0px', '-350px']}
        rotateRange={[0, -200]}
        xRange={['0px', '-30px']}
        className="top-[2400px] left-[3%] w-10 h-10 border-2 border-pink-500/8 rounded-full hidden lg:block"
      />
      <FloatingShape
        scrollYProgress={pageScroll}
        yRange={['0px', '-450px']}
        rotateRange={[30, -60]}
        className="top-[3200px] right-[15%] w-4 h-20 bg-gradient-to-b from-indigo-600/6 to-pink-500/6 rounded-full hidden lg:block"
      />
      <FloatingShape
        scrollYProgress={pageScroll}
        yRange={['0px', '-550px']}
        rotateRange={[0, 150]}
        className="top-[3800px] left-[8%] w-14 h-14 border border-indigo-500/8 rounded-lg hidden lg:block"
      />

      {/* ================================================================= */}
      {/* Floating Nav Bar */}
      {/* ================================================================= */}
      <motion.nav
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
        className="fixed top-0 left-0 right-0 z-50"
      >
        <div className="mx-4 mt-4">
          <div className="max-w-[1200px] mx-auto px-5 h-12 flex items-center justify-between rounded-full bg-white/80 backdrop-blur-xl border border-[#0f0f0f]/6 shadow-[0_2px_20px_rgba(0,0,0,0.04)]">
            <div className="flex items-center gap-3">
              <Link
                to="/"
                className="text-[11px] font-medium tracking-[0.1em] uppercase text-[#0f0f0f]/40 hover:text-[#0f0f0f] transition-colors"
                style={{ fontFamily: FONT_BODY }}
              >
                Gallery
              </Link>
              <span className="text-[#0f0f0f]/15">/</span>
              <span
                className="text-[11px] font-bold tracking-[0.1em] uppercase"
                style={{ fontFamily: FONT_HEADLINE }}
              >
                <GradientText>10 Kinetic</GradientText>
              </span>
            </div>
            <div className="flex items-center gap-1.5">
              <Link
                to="/9"
                className="flex items-center gap-1.5 px-3.5 h-8 text-[10px] font-semibold tracking-[0.08em] uppercase rounded-full border border-[#0f0f0f]/10 hover:bg-indigo-600 hover:text-white hover:border-indigo-600 transition-all duration-300"
                style={{ fontFamily: FONT_BODY }}
              >
                <ArrowLeft size={11} strokeWidth={2.5} />
                Prev
              </Link>
              <Link
                to="/11"
                className="flex items-center gap-1.5 px-3.5 h-8 text-[10px] font-semibold tracking-[0.08em] uppercase rounded-full border border-[#0f0f0f]/10 hover:bg-indigo-600 hover:text-white hover:border-indigo-600 transition-all duration-300"
                style={{ fontFamily: FONT_BODY }}
              >
                Next
                <ArrowRight size={11} strokeWidth={2.5} />
              </Link>
            </div>
          </div>
        </div>
      </motion.nav>

      {/* ================================================================= */}
      {/* Site Header */}
      {/* ================================================================= */}
      <header className="pt-24">
        <div className="max-w-[1200px] mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="h-14 flex items-center justify-between"
          >
            <div className="flex items-baseline gap-3">
              <span
                className="text-[24px] font-bold tracking-[-0.03em]"
                style={{ fontFamily: FONT_HEADLINE }}
              >
                <GradientText>{brandName}</GradientText>
              </span>
              <span
                className="hidden sm:inline text-[11px] font-normal tracking-[0.03em] text-[#0f0f0f]/35"
                style={{ fontFamily: FONT_BODY }}
              >
                {tagline}
              </span>
            </div>
            <nav className="hidden md:flex items-center gap-7">
              {['Studies', 'Features', 'Network', 'Contact'].map((item, i) => (
                <motion.a
                  key={item}
                  href={`#${item.toLowerCase()}`}
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: 0.6 + i * 0.08 }}
                  className="text-[12px] font-medium text-[#0f0f0f]/50 hover:text-indigo-600 transition-colors"
                  style={{ fontFamily: FONT_BODY }}
                >
                  {item}
                </motion.a>
              ))}
              <motion.button
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: 1 }}
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                className="h-10 px-6 rounded-full bg-gradient-to-r from-indigo-600 to-pink-500 text-white text-[12px] font-semibold tracking-[0.02em] shadow-lg shadow-indigo-500/20 hover:shadow-indigo-500/30 transition-shadow"
                style={{ fontFamily: FONT_BODY }}
              >
                {ctaPrimary}
              </motion.button>
            </nav>
          </motion.div>
        </div>
      </header>

      {/* ================================================================= */}
      {/* Hero — Words Assemble from Different Directions */}
      {/* ================================================================= */}
      <div ref={heroRef} className="relative overflow-hidden">
        <HeroOrb />

        <motion.div
          style={{ y: heroY, opacity: heroOpacity }}
          className="max-w-[1200px] mx-auto px-6 pt-20 pb-32 md:pt-28 md:pb-44 relative"
        >
          {/* Decorative ring */}
          <motion.div
            className="absolute top-12 right-0 md:right-16 w-48 h-48 rounded-full border border-indigo-600/8"
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 1.2, delay: 1.5, ease: [0.16, 1, 0.3, 1] }}
          />
          <motion.div
            className="absolute bottom-20 left-0 md:left-10 w-20 h-20 rounded-full border-2 border-pink-500/10"
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 1, delay: 1.8, ease: [0.16, 1, 0.3, 1] }}
          />

          {/* Label */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="flex items-center gap-2.5 mb-10"
          >
            <Sparkles size={14} strokeWidth={2} className="text-indigo-600" />
            <span
              className="text-[11px] font-bold tracking-[0.2em] uppercase text-indigo-600"
              style={{ fontFamily: FONT_BODY }}
            >
              The Neurology Research Network
            </span>
          </motion.div>

          {/* Headline — each word enters from a different direction */}
          <h1 className="relative" style={{ fontFamily: FONT_HEADLINE }}>
            <span className="flex flex-wrap gap-x-[0.3em] text-[clamp(2.8rem,8vw,7rem)] font-bold leading-[1.0] tracking-[-0.04em]">
              {heroWords.map((word, i) => {
                const dir = wordDirections[i % wordDirections.length]
                return (
                  <motion.span
                    key={i}
                    initial={{
                      opacity: 0,
                      x: dir.x,
                      y: dir.y,
                      rotate: dir.rotate,
                      filter: 'blur(8px)',
                    }}
                    animate={{
                      opacity: 1,
                      x: 0,
                      y: 0,
                      rotate: 0,
                      filter: 'blur(0px)',
                    }}
                    transition={{
                      duration: 1,
                      delay: 0.5 + i * 0.1,
                      ease: [0.16, 1, 0.3, 1],
                    }}
                    className="inline-block"
                  >
                    {i === 3 || i === heroWords.length - 1 ? (
                      <GradientText>{word}</GradientText>
                    ) : (
                      word
                    )}
                  </motion.span>
                )
              })}
            </span>
          </h1>

          {/* Subheadline */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.3, ease: [0.16, 1, 0.3, 1] }}
            className="mt-10 md:mt-14 grid grid-cols-1 md:grid-cols-12 gap-8"
          >
            <p
              className="md:col-span-5 text-[15px] md:text-[16px] leading-[1.8] text-[#0f0f0f]/50"
              style={{ fontFamily: FONT_BODY }}
            >
              {heroSubheadline}
            </p>
            <div className="md:col-start-7 md:col-span-6 flex flex-wrap gap-3 items-start">
              <motion.button
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 1.6 }}
                whileHover={{ scale: 1.03, y: -2 }}
                whileTap={{ scale: 0.97 }}
                className="h-13 px-8 rounded-full bg-gradient-to-r from-indigo-600 to-indigo-700 text-white text-[13px] font-semibold tracking-[0.02em] shadow-xl shadow-indigo-600/25 hover:shadow-indigo-600/40 transition-shadow flex items-center gap-2"
                style={{ fontFamily: FONT_BODY }}
              >
                <Zap size={15} strokeWidth={2.2} />
                {ctaPrimary}
              </motion.button>
              <motion.button
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 1.75 }}
                whileHover={{ scale: 1.03, y: -2 }}
                whileTap={{ scale: 0.97 }}
                className="h-13 px-8 rounded-full border-2 border-[#0f0f0f]/10 text-[13px] font-semibold tracking-[0.02em] hover:border-indigo-600/30 hover:text-indigo-600 transition-all flex items-center gap-2"
                style={{ fontFamily: FONT_BODY }}
              >
                {ctaSecondary}
                <ArrowUpRight size={15} strokeWidth={2} />
              </motion.button>
            </div>
          </motion.div>

          {/* Animated line under hero */}
          <motion.div
            className="mt-20 h-[1px] bg-gradient-to-r from-transparent via-indigo-600/20 to-transparent"
            initial={{ scaleX: 0, opacity: 0 }}
            animate={{ scaleX: 1, opacity: 1 }}
            transition={{ duration: 1.5, delay: 2, ease: [0.16, 1, 0.3, 1] }}
          />
        </motion.div>
      </div>

      {/* ================================================================= */}
      {/* Stats — Counter Animation */}
      {/* ================================================================= */}
      <ParallaxSection speed={0.05}>
        <div className="max-w-[1200px] mx-auto px-6 py-20 md:py-28">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12">
            {stats.map((stat, i) => (
              <StatCounter key={stat.label} stat={stat} index={i} />
            ))}
          </div>
        </div>
      </ParallaxSection>

      {/* ================================================================= */}
      {/* Features — Cards Cascade from Alternating Sides */}
      {/* ================================================================= */}
      <section id="features" className="relative py-24 md:py-36">
        {/* Background gradient accent */}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-indigo-600/[0.015] to-transparent pointer-events-none" />

        <div className="max-w-[1200px] mx-auto px-6 relative">
          {/* Section header */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="text-center mb-16 md:mb-20"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-indigo-600/5 border border-indigo-600/10 mb-6"
            >
              <span
                className="text-[11px] font-bold tracking-[0.15em] uppercase text-indigo-600"
                style={{ fontFamily: FONT_BODY }}
              >
                Platform
              </span>
            </motion.div>
            <h2
              className="text-[clamp(2rem,5vw,3.8rem)] font-bold tracking-[-0.03em] leading-[1.05]"
              style={{ fontFamily: FONT_HEADLINE }}
            >
              Built for{' '}
              <GradientText>Clinical Precision</GradientText>
            </h2>
            <p
              className="mt-5 text-[15px] md:text-[16px] leading-[1.7] text-[#0f0f0f]/45 max-w-[50ch] mx-auto"
              style={{ fontFamily: FONT_BODY }}
            >
              Every feature engineered to eliminate friction between neurologists
              and research institutions.
            </p>
          </motion.div>

          {/* Feature cards — cascading from alternating sides */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {features.map((feature, i) => (
              <FeatureCard key={feature.title} feature={feature} index={i} />
            ))}
          </div>
        </div>
      </section>

      {/* ================================================================= */}
      {/* Studies — Horizontal Scroll Section */}
      {/* ================================================================= */}
      <section
        id="studies"
        ref={studiesScrollRef}
        className="relative py-24 md:py-36 bg-[#0f0f0f] text-white overflow-hidden"
      >
        {/* Decorative gradients */}
        <div className="absolute top-0 left-0 w-96 h-96 rounded-full bg-indigo-600/5 blur-[120px] pointer-events-none" />
        <div className="absolute bottom-0 right-0 w-80 h-80 rounded-full bg-pink-500/5 blur-[100px] pointer-events-none" />

        <div className="max-w-[1200px] mx-auto px-6 relative mb-12">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="flex items-end justify-between mb-4">
              <div>
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5 }}
                  className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/5 border border-white/10 mb-6"
                >
                  <span
                    className="text-[11px] font-bold tracking-[0.15em] uppercase text-indigo-400"
                    style={{ fontFamily: FONT_BODY }}
                  >
                    Active Trials
                  </span>
                </motion.div>
                <h2
                  className="text-[clamp(2rem,5vw,3.8rem)] font-bold tracking-[-0.03em] leading-[1.05]"
                  style={{ fontFamily: FONT_HEADLINE }}
                >
                  Open <GradientText>Studies</GradientText>
                </h2>
              </div>
              <motion.button
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.3 }}
                whileHover={{ x: 4 }}
                className="hidden md:flex items-center gap-2 text-[12px] font-semibold text-white/40 hover:text-white transition-colors"
                style={{ fontFamily: FONT_BODY }}
              >
                View All
                <ArrowUpRight size={14} strokeWidth={2} />
              </motion.button>
            </div>
          </motion.div>
        </div>

        {/* Horizontal scrolling study cards */}
        <motion.div style={{ x: studiesX }} className="px-6">
          <div className="flex gap-5 pb-4">
            {studies.map((study, i) => (
              <StudyCard key={study.title} study={study} index={i} />
            ))}
          </div>
        </motion.div>

        {/* Scroll hint line */}
        <motion.div
          className="max-w-[1200px] mx-auto px-6 mt-12"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.8 }}
        >
          <div className="h-[1px] bg-gradient-to-r from-indigo-600/30 via-pink-500/20 to-transparent" />
        </motion.div>
      </section>

      {/* ================================================================= */}
      {/* Testimonials — Scale Up from Small */}
      {/* ================================================================= */}
      <section className="relative py-24 md:py-36">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-pink-500/[0.01] to-transparent pointer-events-none" />

        <div className="max-w-[1200px] mx-auto px-6 relative">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="text-center mb-16 md:mb-20"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-pink-500/5 border border-pink-500/10 mb-6"
            >
              <span
                className="text-[11px] font-bold tracking-[0.15em] uppercase text-pink-500"
                style={{ fontFamily: FONT_BODY }}
              >
                Testimonials
              </span>
            </motion.div>
            <h2
              className="text-[clamp(2rem,5vw,3.8rem)] font-bold tracking-[-0.03em] leading-[1.05]"
              style={{ fontFamily: FONT_HEADLINE }}
            >
              Trusted by{' '}
              <GradientText>the Network</GradientText>
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {testimonials.map((t, i) => (
              <TestimonialCard key={t.name} testimonial={t} index={i} />
            ))}
          </div>
        </div>
      </section>

      {/* ================================================================= */}
      {/* CTA Section */}
      {/* ================================================================= */}
      <ParallaxSection speed={0.08} className="bg-[#0f0f0f] text-white">
        <div className="relative py-28 md:py-40 overflow-hidden">
          {/* Animated gradient background */}
          <div className="absolute inset-0">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full bg-gradient-to-br from-indigo-600/15 to-pink-500/10 blur-[150px]" />
          </div>

          {/* Decorative rings */}
          <motion.div
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] rounded-full border border-white/5"
            animate={{ scale: [1, 1.1, 1], rotate: [0, 180, 360] }}
            transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
          />
          <motion.div
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full border border-white/3"
            animate={{ scale: [1.1, 1, 1.1], rotate: [360, 180, 0] }}
            transition={{ duration: 25, repeat: Infinity, ease: 'linear' }}
          />

          <div className="max-w-[1200px] mx-auto px-6 relative text-center">
            <motion.div
              initial={{ opacity: 0, y: 60, scale: 0.9 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            >
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="text-[11px] font-bold tracking-[0.25em] uppercase text-indigo-400 mb-8"
                style={{ fontFamily: FONT_BODY }}
              >
                Get Started Today
              </motion.p>

              <h2
                className="text-[clamp(2.2rem,6vw,5rem)] font-bold tracking-[-0.04em] leading-[1.05] max-w-[16ch] mx-auto mb-8"
                style={{ fontFamily: FONT_HEADLINE }}
              >
                Join{' '}
                <GradientText>2,400+ Neurologists</GradientText>{' '}
                on the Network
              </h2>

              <p
                className="text-[15px] md:text-[16px] leading-[1.8] text-white/40 max-w-[45ch] mx-auto mb-12"
                style={{ fontFamily: FONT_BODY }}
              >
                Connect with university clinics running groundbreaking clinical studies.
                Your patients deserve access to the latest research.
              </p>

              <div className="flex flex-wrap items-center justify-center gap-4">
                <motion.button
                  whileHover={{ scale: 1.05, y: -3 }}
                  whileTap={{ scale: 0.97 }}
                  className="h-14 px-10 rounded-full bg-gradient-to-r from-indigo-600 to-pink-500 text-white text-[14px] font-semibold tracking-[0.02em] shadow-2xl shadow-indigo-600/30 hover:shadow-indigo-600/50 transition-shadow flex items-center gap-2.5"
                  style={{ fontFamily: FONT_BODY }}
                >
                  <Zap size={16} strokeWidth={2.2} />
                  {ctaPrimary}
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.05, y: -3 }}
                  whileTap={{ scale: 0.97 }}
                  className="h-14 px-10 rounded-full border-2 border-white/15 text-white text-[14px] font-semibold tracking-[0.02em] hover:border-white/30 transition-all flex items-center gap-2.5"
                  style={{ fontFamily: FONT_BODY }}
                >
                  {ctaSecondary}
                  <ArrowUpRight size={16} strokeWidth={2} />
                </motion.button>
              </div>
            </motion.div>
          </div>
        </div>
      </ParallaxSection>

      {/* ================================================================= */}
      {/* Footer */}
      {/* ================================================================= */}
      <footer className="bg-[#0f0f0f] text-white border-t border-white/5">
        <div className="max-w-[1200px] mx-auto px-6 py-16 md:py-20">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="grid grid-cols-2 md:grid-cols-4 gap-10 md:gap-8 mb-16">
              {/* Brand */}
              <div className="col-span-2 md:col-span-1">
                <span
                  className="text-[22px] font-bold tracking-[-0.02em]"
                  style={{ fontFamily: FONT_HEADLINE }}
                >
                  <GradientText>{brandName}</GradientText>
                </span>
                <p
                  className="mt-3 text-[12px] leading-[1.7] text-white/25 max-w-[28ch]"
                  style={{ fontFamily: FONT_BODY }}
                >
                  {tagline}
                </p>
              </div>

              {/* Links */}
              {[
                { title: 'Platform', links: ['For Neurologists', 'For Clinics', 'Studies', 'Pricing'] },
                { title: 'Resources', links: ['Documentation', 'API', 'Compliance', 'Support'] },
                { title: 'Company', links: ['About', 'Careers', 'Press', 'Contact'] },
              ].map((col) => (
                <div key={col.title}>
                  <h4
                    className="text-[10px] font-bold tracking-[0.2em] uppercase text-white/25 mb-5"
                    style={{ fontFamily: FONT_BODY }}
                  >
                    {col.title}
                  </h4>
                  <ul className="space-y-3">
                    {col.links.map((link) => (
                      <li key={link}>
                        <a
                          href="#"
                          className="text-[12px] text-white/40 hover:text-indigo-400 transition-colors"
                          style={{ fontFamily: FONT_BODY }}
                        >
                          {link}
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>

            {/* Bottom */}
            <div className="border-t border-white/8 pt-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
              <p className="text-[11px] text-white/15" style={{ fontFamily: FONT_BODY }}>
                &copy; {new Date().getFullYear()} {brandName}. All rights reserved.
              </p>
              <div className="flex items-center gap-6">
                {['Privacy', 'Terms', 'Cookies'].map((item) => (
                  <a
                    key={item}
                    href="#"
                    className="text-[11px] text-white/15 hover:text-white/40 transition-colors"
                    style={{ fontFamily: FONT_BODY }}
                  >
                    {item}
                  </a>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </footer>

      {/* ================================================================= */}
      {/* Bottom Prev/Next Bar */}
      {/* ================================================================= */}
      <div className="border-t border-[#0f0f0f]/8 bg-[#fafafa]">
        <div className="max-w-[1200px] mx-auto grid grid-cols-2">
          <Link
            to="/9"
            className="flex items-center justify-center gap-2.5 py-5 border-r border-[#0f0f0f]/8 text-[11px] font-semibold tracking-[0.1em] uppercase text-[#0f0f0f]/50 hover:text-indigo-600 hover:bg-indigo-600/3 transition-all"
            style={{ fontFamily: FONT_BODY }}
          >
            <ArrowLeft size={13} strokeWidth={2.5} />
            Previous Design
          </Link>
          <Link
            to="/11"
            className="flex items-center justify-center gap-2.5 py-5 text-[11px] font-semibold tracking-[0.1em] uppercase text-[#0f0f0f]/50 hover:text-indigo-600 hover:bg-indigo-600/3 transition-all"
            style={{ fontFamily: FONT_BODY }}
          >
            Next Design
            <ArrowRight size={13} strokeWidth={2.5} />
          </Link>
        </div>
      </div>
    </div>
  )
}
