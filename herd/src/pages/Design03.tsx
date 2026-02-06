import { useRef } from 'react'
import { Link } from 'react-router-dom'
import { motion, useInView, useScroll, useTransform } from 'framer-motion'
import {
  Brain,
  Shield,
  Activity,
  ClipboardList,
  ChevronLeft,
  ChevronRight,
  ArrowRight,
  Users,
  FlaskConical,
  Building2,
  HeartPulse,
} from 'lucide-react'
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

// ─── Palette ────────────────────────────────────────────────────────
const GOLD = '#d4a853'
const GOLD_LIGHT = '#e4c078'
const BG = '#0a0a0a'
const BG_ELEVATED = '#111111'
const BG_CARD = '#161616'
const TEXT = '#f5f5f0'
const TEXT_DIM = '#a8a8a0'
const TEXT_MUTED = '#6b6b64'

// ─── Font Stacks ────────────────────────────────────────────────────
const serif = "'Playfair Display', 'Libre Baskerville', Georgia, serif"
const sans = "'DM Sans', 'Inter', system-ui, sans-serif"

// ─── Icon Map ───────────────────────────────────────────────────────
const iconMap: Record<string, React.ElementType> = {
  brain: Brain,
  shield: Shield,
  activity: Activity,
  clipboard: ClipboardList,
}

const statIcons = [Users, FlaskConical, Building2, HeartPulse]

// ─── Reusable Scroll-Reveal Wrapper ─────────────────────────────────
function Reveal({
  children,
  className,
  delay = 0,
  direction = 'up',
}: {
  children: React.ReactNode
  className?: string
  delay?: number
  direction?: 'up' | 'left' | 'right'
}) {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  const directionOffset = {
    up: { x: 0, y: 48 },
    left: { x: -48, y: 0 },
    right: { x: 48, y: 0 },
  }

  return (
    <motion.div
      ref={ref}
      initial={{
        opacity: 0,
        x: directionOffset[direction].x,
        y: directionOffset[direction].y,
      }}
      animate={
        inView
          ? { opacity: 1, x: 0, y: 0 }
          : {
              opacity: 0,
              x: directionOffset[direction].x,
              y: directionOffset[direction].y,
            }
      }
      transition={{
        duration: 0.9,
        delay,
        ease: [0.22, 1, 0.36, 1],
      }}
      className={className}
    >
      {children}
    </motion.div>
  )
}

// ─── Gold Divider ───────────────────────────────────────────────────
function GoldRule() {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-40px' })

  return (
    <div ref={ref} className="flex items-center justify-center py-2">
      <motion.div
        initial={{ scaleX: 0, opacity: 0 }}
        animate={inView ? { scaleX: 1, opacity: 1 } : { scaleX: 0, opacity: 0 }}
        transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
        className="w-full max-w-5xl mx-auto"
        style={{ height: 1, background: `linear-gradient(90deg, transparent 0%, ${GOLD}44 20%, ${GOLD}88 50%, ${GOLD}44 80%, transparent 100%)`, transformOrigin: 'center' }}
      />
    </div>
  )
}

// ─── Section Label ──────────────────────────────────────────────────
function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <span
      className="inline-block text-xs tracking-[0.35em] uppercase mb-6"
      style={{ fontFamily: sans, color: GOLD, letterSpacing: '0.35em' }}
    >
      {children}
    </span>
  )
}

// ─── NAV ────────────────────────────────────────────────────────────
function Nav() {
  return (
    <motion.nav
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
      className="fixed top-0 left-0 right-0 z-50 backdrop-blur-xl border-b"
      style={{
        background: `${BG}cc`,
        borderColor: `${GOLD}18`,
      }}
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12 h-16 flex items-center justify-between">
        <div className="flex items-center gap-6">
          <Link
            to="/"
            className="text-lg font-bold tracking-wide"
            style={{ fontFamily: serif, color: TEXT }}
          >
            {brandName}
          </Link>
          <span
            className="hidden md:inline text-xs tracking-widest uppercase"
            style={{ color: TEXT_MUTED, fontFamily: sans }}
          >
            {tagline}
          </span>
        </div>

        <div className="flex items-center gap-2">
          <span
            className="text-xs font-medium px-3 py-1 rounded-full border mr-2"
            style={{
              color: GOLD,
              borderColor: `${GOLD}33`,
              fontFamily: sans,
              background: `${GOLD}08`,
            }}
          >
            Design 03 &mdash; Dark Matter
          </span>
          <Link
            to="/2"
            className="p-2 rounded-full transition-colors duration-200 hover:bg-white/5"
            style={{ color: TEXT_DIM }}
            aria-label="Previous design"
          >
            <ChevronLeft size={18} />
          </Link>
          <Link
            to="/4"
            className="p-2 rounded-full transition-colors duration-200 hover:bg-white/5"
            style={{ color: TEXT_DIM }}
            aria-label="Next design"
          >
            <ChevronRight size={18} />
          </Link>
        </div>
      </div>
    </motion.nav>
  )
}

// ─── HERO ───────────────────────────────────────────────────────────
function Hero() {
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start start', 'end start'],
  })
  const bgY = useTransform(scrollYProgress, [0, 1], ['0%', '30%'])
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0])

  return (
    <section
      ref={ref}
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
      style={{ background: BG }}
    >
      {/* Radial spotlight */}
      <motion.div
        className="absolute inset-0 pointer-events-none"
        style={{
          y: bgY,
          background: `radial-gradient(ellipse 70% 50% at 50% 40%, ${GOLD}0c 0%, transparent 70%)`,
        }}
      />

      {/* Grain overlay */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.03]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
          backgroundRepeat: 'repeat',
          backgroundSize: '128px 128px',
        }}
      />

      <motion.div style={{ opacity }} className="relative z-10 max-w-5xl mx-auto px-6 md:px-12 text-center">
        {/* Gold accent line */}
        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 1.4, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
          className="mx-auto mb-12"
          style={{
            width: 80,
            height: 2,
            background: GOLD,
            transformOrigin: 'center',
          }}
        />

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
          className="text-xs tracking-[0.4em] uppercase mb-8"
          style={{ fontFamily: sans, color: GOLD }}
        >
          For Neurologists
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="text-4xl sm:text-5xl md:text-7xl lg:text-8xl font-bold leading-[1.05] mb-10"
          style={{ fontFamily: serif, color: TEXT }}
        >
          {heroHeadline.split(' ').map((word, i) => (
            <span key={i}>
              {word === 'studies' || word === 'matter' ? (
                <span style={{ color: GOLD, fontStyle: 'italic' }}>{word}</span>
              ) : (
                word
              )}{' '}
            </span>
          ))}
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.9, ease: [0.22, 1, 0.36, 1] }}
          className="text-base md:text-lg leading-relaxed max-w-2xl mx-auto mb-14"
          style={{ fontFamily: sans, color: TEXT_DIM }}
        >
          {heroSubheadline}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 1.1, ease: [0.22, 1, 0.36, 1] }}
          className="flex flex-col sm:flex-row items-center justify-center gap-5"
        >
          <button
            className="group px-10 py-4 text-sm tracking-widest uppercase font-medium transition-all duration-300 cursor-pointer"
            style={{
              fontFamily: sans,
              background: GOLD,
              color: BG,
              border: 'none',
              letterSpacing: '0.15em',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = GOLD_LIGHT
              e.currentTarget.style.boxShadow = `0 0 40px ${GOLD}40`
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = GOLD
              e.currentTarget.style.boxShadow = 'none'
            }}
          >
            {ctaPrimary}
            <ArrowRight className="inline ml-3 -mt-0.5" size={16} />
          </button>
          <button
            className="px-10 py-4 text-sm tracking-widest uppercase font-medium border transition-all duration-300 cursor-pointer"
            style={{
              fontFamily: sans,
              background: 'transparent',
              color: TEXT,
              borderColor: `${TEXT}22`,
              letterSpacing: '0.15em',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.borderColor = GOLD
              e.currentTarget.style.color = GOLD
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.borderColor = `${TEXT}22`
              e.currentTarget.style.color = TEXT
            }}
          >
            {ctaSecondary}
          </button>
        </motion.div>
      </motion.div>

      {/* Bottom fade */}
      <div
        className="absolute bottom-0 left-0 right-0 h-32 pointer-events-none"
        style={{
          background: `linear-gradient(to top, ${BG}, transparent)`,
        }}
      />
    </section>
  )
}

// ─── STATS ──────────────────────────────────────────────────────────
function Stats() {
  return (
    <section className="py-28 md:py-36" style={{ background: BG }}>
      <div className="max-w-6xl mx-auto px-6 md:px-12">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-0">
          {stats.map((stat, i) => {
            const Icon = statIcons[i]
            return (
              <Reveal key={stat.label} delay={i * 0.12}>
                <div
                  className={cn(
                    'text-center py-10 md:py-14 px-6 relative',
                    i < stats.length - 1 && 'lg:border-r',
                    i < 2 && 'border-b lg:border-b-0'
                  )}
                  style={{ borderColor: `${GOLD}20` }}
                >
                  <Icon
                    size={20}
                    className="mx-auto mb-5"
                    style={{ color: GOLD }}
                    strokeWidth={1.5}
                  />
                  <div
                    className="text-4xl md:text-5xl font-bold mb-3"
                    style={{ fontFamily: serif, color: TEXT }}
                  >
                    {stat.value}
                  </div>
                  <div
                    className="text-xs tracking-[0.25em] uppercase"
                    style={{ fontFamily: sans, color: TEXT_MUTED }}
                  >
                    {stat.label}
                  </div>
                </div>
              </Reveal>
            )
          })}
        </div>
      </div>
    </section>
  )
}

// ─── FEATURES ───────────────────────────────────────────────────────
function Features() {
  return (
    <section className="py-28 md:py-40" style={{ background: BG }}>
      <div className="max-w-6xl mx-auto px-6 md:px-12">
        <Reveal>
          <div className="text-center mb-20">
            <SectionLabel>Platform</SectionLabel>
            <h2
              className="text-3xl md:text-5xl font-bold"
              style={{ fontFamily: serif, color: TEXT }}
            >
              Engineered for <span style={{ color: GOLD, fontStyle: 'italic' }}>precision</span>
            </h2>
          </div>
        </Reveal>

        <div className="grid md:grid-cols-2 gap-8">
          {features.map((feature, i) => {
            const Icon = iconMap[feature.icon] || Brain
            return (
              <Reveal key={feature.title} delay={i * 0.1}>
                <div
                  className="group relative p-10 md:p-12 border transition-all duration-500 overflow-hidden cursor-default"
                  style={{
                    background: BG_CARD,
                    borderColor: `${TEXT}08`,
                  }}
                  onMouseEnter={(e) => {
                    const card = e.currentTarget
                    card.style.borderColor = `${GOLD}30`
                    card.style.background = BG_ELEVATED
                    const spotlight = card.querySelector<HTMLDivElement>('.spotlight')
                    if (spotlight) spotlight.style.opacity = '1'
                  }}
                  onMouseLeave={(e) => {
                    const card = e.currentTarget
                    card.style.borderColor = `${TEXT}08`
                    card.style.background = BG_CARD
                    const spotlight = card.querySelector<HTMLDivElement>('.spotlight')
                    if (spotlight) spotlight.style.opacity = '0'
                  }}
                  onMouseMove={(e) => {
                    const card = e.currentTarget
                    const rect = card.getBoundingClientRect()
                    const x = e.clientX - rect.left
                    const y = e.clientY - rect.top
                    const spotlight = card.querySelector<HTMLDivElement>('.spotlight')
                    if (spotlight) {
                      spotlight.style.background = `radial-gradient(400px circle at ${x}px ${y}px, ${GOLD}0a, transparent 60%)`
                    }
                  }}
                >
                  {/* Spotlight layer */}
                  <div
                    className="spotlight absolute inset-0 pointer-events-none transition-opacity duration-500"
                    style={{ opacity: 0 }}
                  />

                  <div className="relative z-10">
                    <div
                      className="w-12 h-12 flex items-center justify-center mb-8 border"
                      style={{ borderColor: `${GOLD}30` }}
                    >
                      <Icon size={22} style={{ color: GOLD }} strokeWidth={1.5} />
                    </div>
                    <h3
                      className="text-xl md:text-2xl font-semibold mb-4"
                      style={{ fontFamily: serif, color: TEXT }}
                    >
                      {feature.title}
                    </h3>
                    <p
                      className="text-sm leading-relaxed"
                      style={{ fontFamily: sans, color: TEXT_DIM }}
                    >
                      {feature.description}
                    </p>
                  </div>
                </div>
              </Reveal>
            )
          })}
        </div>
      </div>
    </section>
  )
}

// ─── STUDIES ────────────────────────────────────────────────────────
function Studies() {
  return (
    <section className="py-28 md:py-40" style={{ background: BG }}>
      <div className="max-w-6xl mx-auto px-6 md:px-12">
        <Reveal>
          <div className="text-center mb-20">
            <SectionLabel>Active Trials</SectionLabel>
            <h2
              className="text-3xl md:text-5xl font-bold"
              style={{ fontFamily: serif, color: TEXT }}
            >
              Where science <span style={{ color: GOLD, fontStyle: 'italic' }}>advances</span>
            </h2>
          </div>
        </Reveal>

        <div className="space-y-4">
          {studies.map((study, i) => {
            const progress = study.target > 0 ? (study.patients / study.target) * 100 : 0
            return (
              <Reveal key={study.title} delay={i * 0.08}>
                <div
                  className="group p-8 md:p-10 border transition-all duration-400 cursor-default"
                  style={{
                    background: BG_CARD,
                    borderColor: `${TEXT}06`,
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.borderColor = `${GOLD}25`
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.borderColor = `${TEXT}06`
                  }}
                >
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-3">
                        <span
                          className="text-[10px] tracking-[0.2em] uppercase px-3 py-1 font-medium"
                          style={{
                            fontFamily: sans,
                            color: GOLD,
                            background: `${GOLD}10`,
                            border: `1px solid ${GOLD}20`,
                          }}
                        >
                          {study.phase}
                        </span>
                        <span
                          className="text-[10px] tracking-[0.2em] uppercase px-3 py-1"
                          style={{
                            fontFamily: sans,
                            color: study.status === 'Enrolling' ? '#6fcc8a' : TEXT_MUTED,
                            background: study.status === 'Enrolling' ? '#6fcc8a10' : `${TEXT}06`,
                            border: `1px solid ${study.status === 'Enrolling' ? '#6fcc8a20' : `${TEXT}10`}`,
                          }}
                        >
                          {study.status}
                        </span>
                      </div>
                      <h3
                        className="text-lg md:text-xl font-semibold mb-1"
                        style={{ fontFamily: serif, color: TEXT }}
                      >
                        {study.title}
                      </h3>
                      <p
                        className="text-xs tracking-wide"
                        style={{ fontFamily: sans, color: TEXT_MUTED }}
                      >
                        {study.university} &middot; {study.condition}
                      </p>
                    </div>

                    <div className="w-full md:w-56 flex-shrink-0">
                      <div className="flex justify-between text-xs mb-2" style={{ fontFamily: sans, color: TEXT_DIM }}>
                        <span>{study.patients} enrolled</span>
                        <span style={{ color: TEXT_MUTED }}>/ {study.target}</span>
                      </div>
                      <div
                        className="h-1 w-full overflow-hidden"
                        style={{ background: `${TEXT}08` }}
                      >
                        <motion.div
                          className="h-full"
                          initial={{ width: 0 }}
                          whileInView={{ width: `${progress}%` }}
                          viewport={{ once: true }}
                          transition={{ duration: 1.4, delay: 0.2 + i * 0.08, ease: [0.22, 1, 0.36, 1] }}
                          style={{
                            background: `linear-gradient(90deg, ${GOLD}, ${GOLD_LIGHT})`,
                          }}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </Reveal>
            )
          })}
        </div>
      </div>
    </section>
  )
}

// ─── TESTIMONIALS ───────────────────────────────────────────────────
function Testimonials() {
  return (
    <section className="py-28 md:py-40" style={{ background: BG }}>
      <div className="max-w-6xl mx-auto px-6 md:px-12">
        <Reveal>
          <div className="text-center mb-20">
            <SectionLabel>Testimonials</SectionLabel>
            <h2
              className="text-3xl md:text-5xl font-bold"
              style={{ fontFamily: serif, color: TEXT }}
            >
              Trusted by <span style={{ color: GOLD, fontStyle: 'italic' }}>leaders</span>
            </h2>
          </div>
        </Reveal>

        <div className="grid md:grid-cols-2 gap-8">
          {testimonials.map((t, i) => (
            <Reveal key={t.name} delay={i * 0.1}>
              <div
                className="relative p-10 md:p-12 border h-full"
                style={{
                  background: BG_CARD,
                  borderColor: `${TEXT}06`,
                }}
              >
                {/* Large decorative quote mark */}
                <span
                  className="absolute top-6 left-8 text-[120px] leading-none font-bold pointer-events-none select-none"
                  style={{
                    fontFamily: serif,
                    color: `${GOLD}12`,
                  }}
                  aria-hidden="true"
                >
                  &ldquo;
                </span>

                <div className="relative z-10">
                  <p
                    className="text-base md:text-lg leading-relaxed mb-10"
                    style={{
                      fontFamily: serif,
                      color: TEXT,
                      fontStyle: 'italic',
                      fontWeight: 400,
                    }}
                  >
                    &ldquo;{t.quote}&rdquo;
                  </p>

                  <div className="flex items-center gap-4">
                    <div
                      className="w-11 h-11 flex items-center justify-center text-xs font-semibold tracking-wider flex-shrink-0"
                      style={{
                        fontFamily: sans,
                        background: `${GOLD}12`,
                        color: GOLD,
                        border: `1px solid ${GOLD}25`,
                      }}
                    >
                      {t.avatar}
                    </div>
                    <div>
                      <div
                        className="text-sm font-semibold"
                        style={{ fontFamily: sans, color: TEXT }}
                      >
                        {t.name}
                      </div>
                      <div
                        className="text-xs mt-0.5"
                        style={{ fontFamily: sans, color: TEXT_MUTED }}
                      >
                        {t.credential}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}

// ─── CTA ────────────────────────────────────────────────────────────
function CTA() {
  return (
    <section className="py-28 md:py-40 relative overflow-hidden" style={{ background: BG }}>
      {/* Subtle radial glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: `radial-gradient(ellipse 60% 40% at 50% 60%, ${GOLD}08 0%, transparent 70%)`,
        }}
      />

      <div className="relative z-10 max-w-3xl mx-auto px-6 md:px-12 text-center">
        <Reveal>
          <SectionLabel>Get Started</SectionLabel>
        </Reveal>
        <Reveal delay={0.1}>
          <h2
            className="text-3xl md:text-5xl lg:text-6xl font-bold mb-8 leading-tight"
            style={{ fontFamily: serif, color: TEXT }}
          >
            The future of neurology<br />
            trials is <span style={{ color: GOLD, fontStyle: 'italic' }}>here</span>
          </h2>
        </Reveal>
        <Reveal delay={0.2}>
          <p
            className="text-base md:text-lg mb-14 leading-relaxed"
            style={{ fontFamily: sans, color: TEXT_DIM }}
          >
            Join a growing network of 2,400+ neurologists who trust {brandName} to connect their patients with groundbreaking clinical studies.
          </p>
        </Reveal>
        <Reveal delay={0.3}>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-5">
            <button
              className="group px-12 py-5 text-sm tracking-widest uppercase font-medium transition-all duration-300 cursor-pointer"
              style={{
                fontFamily: sans,
                background: GOLD,
                color: BG,
                border: 'none',
                letterSpacing: '0.15em',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = GOLD_LIGHT
                e.currentTarget.style.boxShadow = `0 0 60px ${GOLD}30`
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = GOLD
                e.currentTarget.style.boxShadow = 'none'
              }}
            >
              {ctaPrimary}
              <ArrowRight className="inline ml-3 -mt-0.5" size={16} />
            </button>
            <button
              className="px-12 py-5 text-sm tracking-widest uppercase font-medium border transition-all duration-300 cursor-pointer"
              style={{
                fontFamily: sans,
                background: 'transparent',
                color: TEXT,
                borderColor: `${TEXT}22`,
                letterSpacing: '0.15em',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = GOLD
                e.currentTarget.style.color = GOLD
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = `${TEXT}22`
                e.currentTarget.style.color = TEXT
              }}
            >
              {ctaSecondary}
            </button>
          </div>
        </Reveal>
      </div>
    </section>
  )
}

// ─── FOOTER ─────────────────────────────────────────────────────────
function Footer() {
  return (
    <footer
      className="py-16 border-t"
      style={{ background: BG, borderColor: `${TEXT}06` }}
    >
      <div className="max-w-6xl mx-auto px-6 md:px-12">
        <div className="flex flex-col md:flex-row items-center justify-between gap-8">
          <div>
            <div
              className="text-xl font-bold tracking-wide mb-2"
              style={{ fontFamily: serif, color: TEXT }}
            >
              {brandName}
            </div>
            <div
              className="text-xs tracking-wide"
              style={{ fontFamily: sans, color: TEXT_MUTED }}
            >
              {tagline}
            </div>
          </div>

          <div className="flex items-center gap-8">
            {['Platform', 'Studies', 'About', 'Contact'].map((label) => (
              <a
                key={label}
                href="#"
                className="text-xs tracking-widest uppercase transition-colors duration-200"
                style={{ fontFamily: sans, color: TEXT_MUTED }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.color = GOLD
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.color = TEXT_MUTED
                }}
              >
                {label}
              </a>
            ))}
          </div>
        </div>

        <div
          className="mt-12 pt-8 border-t text-center"
          style={{ borderColor: `${TEXT}06` }}
        >
          <p className="text-xs" style={{ fontFamily: sans, color: TEXT_MUTED }}>
            &copy; {new Date().getFullYear()} {brandName}. All rights reserved. This is a design prototype.
          </p>
        </div>
      </div>
    </footer>
  )
}

// ─── MAIN PAGE ──────────────────────────────────────────────────────
export default function Design03() {
  return (
    <div className="design-page" style={{ background: BG, color: TEXT }}>
      <Nav />
      <Hero />
      <GoldRule />
      <Stats />
      <GoldRule />
      <Features />
      <GoldRule />
      <Studies />
      <GoldRule />
      <Testimonials />
      <GoldRule />
      <CTA />
      <Footer />
    </div>
  )
}
