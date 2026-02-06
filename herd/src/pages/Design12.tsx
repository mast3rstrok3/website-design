import { Link } from 'react-router-dom'
import { motion, useScroll, useTransform } from 'framer-motion'
import {
  Brain,
  Shield,
  Activity,
  ClipboardList,
  ArrowLeft,
  ArrowRight,
  ArrowUpRight,
  X,
  Zap,
} from 'lucide-react'
import { useRef, useState } from 'react'
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
// Brutalist — Design #12
// Raw, overlapping elements, thick borders, intentionally rough.
// Anti-design that makes a statement.
// Palette: #ffffff + #000000 + #facc15 (highlighter yellow)
// Font: Space Grotesk bold headlines, Inter body
// No rounded corners. 3-4px borders. Rotated text. Overlap. Punk.
// ---------------------------------------------------------------------------

const FONT_HEADLINE = "'Space Grotesk', system-ui, sans-serif"
const FONT_BODY = "'Inter', system-ui, sans-serif"

const iconMap: Record<string, React.ComponentType<{ size?: number; strokeWidth?: number }>> = {
  brain: Brain,
  shield: Shield,
  activity: Activity,
  clipboard: ClipboardList,
}

// Brutalist stagger — fast, abrupt, no easing
const stagger = {
  container: {
    hidden: {},
    show: { transition: { staggerChildren: 0.06, delayChildren: 0.05 } },
  },
  item: {
    hidden: { opacity: 0, y: 30 },
    show: { opacity: 1, y: 0, transition: { duration: 0.35, ease: [0.0, 0.0, 0.2, 1] } },
  },
}

const slamIn = {
  hidden: { opacity: 0, scale: 1.15, y: -20 },
  show: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: { duration: 0.4, ease: [0.0, 0.0, 0.2, 1] },
  },
}

function Section({
  children,
  className,
  id,
}: {
  children: React.ReactNode
  className?: string
  id?: string
}) {
  return (
    <motion.section
      id={id}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.1 }}
      variants={stagger.container}
      className={className}
    >
      {children}
    </motion.section>
  )
}

function Item({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <motion.div variants={stagger.item} className={className}>
      {children}
    </motion.div>
  )
}

function Slam({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <motion.div variants={slamIn} className={className}>
      {children}
    </motion.div>
  )
}

// Yellow highlight marker effect
function Highlight({ children }: { children: React.ReactNode }) {
  return (
    <span className="relative inline-block">
      <span
        className="absolute inset-0 bg-yellow-400 -skew-x-2"
        style={{ top: '15%', bottom: '5%', left: '-4px', right: '-4px' }}
      />
      <span className="relative">{children}</span>
    </span>
  )
}

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------

export default function Design12() {
  const heroRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ['start start', 'end start'],
  })
  const heroY = useTransform(scrollYProgress, [0, 1], ['0%', '12%'])
  const [hoveredFeature, setHoveredFeature] = useState<number | null>(null)

  return (
    <div
      className="design-page bg-white text-black selection:bg-yellow-400 selection:text-black"
      style={{ fontFamily: FONT_BODY }}
    >
      {/* ----------------------------------------------------------------- */}
      {/* Floating Nav Bar — thick, brutal */}
      {/* ----------------------------------------------------------------- */}
      <motion.nav
        initial={{ y: -80 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.3, ease: [0.0, 0.0, 0.2, 1] }}
        className="fixed top-0 left-0 right-0 z-50 bg-black text-white"
        style={{ borderBottom: '4px solid #facc15' }}
      >
        <div className="max-w-[1400px] mx-auto px-6 h-14 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link
              to="/"
              className="text-[11px] font-bold tracking-[0.2em] uppercase text-white/50 hover:text-yellow-400 transition-colors"
              style={{ fontFamily: FONT_HEADLINE }}
            >
              Gallery
            </Link>
            <span className="text-yellow-400 font-black text-lg">/</span>
            <span
              className="text-[12px] font-bold tracking-[0.2em] uppercase text-yellow-400"
              style={{ fontFamily: FONT_HEADLINE }}
            >
              #12 Brutalist
            </span>
          </div>
          <div className="flex items-center gap-0">
            <Link
              to="/11"
              className="flex items-center gap-1.5 px-4 h-14 text-[11px] font-bold tracking-[0.15em] uppercase hover:bg-yellow-400 hover:text-black transition-all duration-100"
              style={{
                fontFamily: FONT_HEADLINE,
                borderLeft: '3px solid #facc15',
              }}
            >
              <ArrowLeft size={14} strokeWidth={3} />
              Prev
            </Link>
            <Link
              to="/13"
              className="flex items-center gap-1.5 px-4 h-14 text-[11px] font-bold tracking-[0.15em] uppercase hover:bg-yellow-400 hover:text-black transition-all duration-100"
              style={{
                fontFamily: FONT_HEADLINE,
                borderLeft: '3px solid #facc15',
              }}
            >
              Next
              <ArrowRight size={14} strokeWidth={3} />
            </Link>
          </div>
        </div>
      </motion.nav>

      {/* ----------------------------------------------------------------- */}
      {/* Site Nav — confrontational */}
      {/* ----------------------------------------------------------------- */}
      <header
        className="pt-14"
        style={{ borderBottom: '4px solid black' }}
      >
        <div className="max-w-[1400px] mx-auto px-6">
          <div className="h-20 flex items-center justify-between">
            <div className="flex items-baseline gap-4">
              <span
                className="text-[32px] font-bold tracking-[-0.04em] uppercase"
                style={{ fontFamily: FONT_HEADLINE }}
              >
                {brandName}
              </span>
              <span
                className="hidden sm:inline text-[10px] font-bold tracking-[0.2em] uppercase text-black/40 rotate-[-2deg] inline-block"
                style={{ fontFamily: FONT_HEADLINE }}
              >
                {tagline}
              </span>
            </div>
            <nav className="hidden md:flex items-center gap-0">
              {['Studies', 'Features', 'Network', 'Contact'].map((item) => (
                <a
                  key={item}
                  href={`#${item.toLowerCase()}`}
                  className="px-5 py-2 text-[11px] font-bold tracking-[0.2em] uppercase hover:bg-black hover:text-white transition-all duration-100"
                  style={{
                    fontFamily: FONT_HEADLINE,
                    border: '3px solid black',
                    marginLeft: '-3px',
                  }}
                >
                  {item}
                </a>
              ))}
              <button
                className="px-6 py-2 bg-yellow-400 text-black text-[11px] font-bold tracking-[0.2em] uppercase hover:bg-black hover:text-yellow-400 transition-all duration-100"
                style={{
                  fontFamily: FONT_HEADLINE,
                  border: '3px solid black',
                  marginLeft: '-3px',
                }}
              >
                {ctaPrimary}
              </button>
            </nav>
          </div>
        </div>
      </header>

      {/* ----------------------------------------------------------------- */}
      {/* Hero — Massive, overlapping, confrontational */}
      {/* ----------------------------------------------------------------- */}
      <div ref={heroRef} className="relative overflow-hidden" style={{ borderBottom: '4px solid black' }}>
        {/* Background cross-hatch pattern */}
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: `repeating-linear-gradient(
              0deg,
              black,
              black 1px,
              transparent 1px,
              transparent 40px
            ),
            repeating-linear-gradient(
              90deg,
              black,
              black 1px,
              transparent 1px,
              transparent 40px
            )`,
          }}
        />

        {/* Rotated decorative text */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6, duration: 0.3 }}
          className="absolute top-20 -right-8 text-[120px] md:text-[200px] font-bold tracking-[-0.06em] uppercase text-black/[0.04] select-none pointer-events-none"
          style={{
            fontFamily: FONT_HEADLINE,
            transform: 'rotate(90deg)',
            transformOrigin: 'right top',
          }}
        >
          NEURO
        </motion.div>

        <motion.div
          style={{ y: heroY }}
          className="relative max-w-[1400px] mx-auto px-6 pt-20 pb-24 md:pt-32 md:pb-40"
        >
          <Section>
            {/* Label — rotated */}
            <Item>
              <div
                className="inline-block bg-black text-yellow-400 px-4 py-2 text-[11px] font-bold tracking-[0.3em] uppercase mb-8"
                style={{
                  fontFamily: FONT_HEADLINE,
                  transform: 'rotate(-2deg)',
                  border: '3px solid black',
                }}
              >
                The Neurology Research Network
              </div>
            </Item>

            {/* Headline — brutal sizing, highlight effect */}
            <Slam>
              <h1
                className="text-[clamp(3rem,10vw,9rem)] font-bold leading-[0.85] tracking-[-0.05em] uppercase max-w-[16ch]"
                style={{ fontFamily: FONT_HEADLINE }}
              >
                Connect your patients to{' '}
                <Highlight>the studies</Highlight>{' '}
                that matter
              </h1>
            </Slam>

            {/* Subheadline and CTAs — overlapping layout */}
            <Item>
              <div className="mt-10 md:mt-16 grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
                <div className="md:col-span-5">
                  <p
                    className="text-[16px] leading-[1.75] text-black/60"
                    style={{ fontFamily: FONT_BODY }}
                  >
                    {heroSubheadline}
                  </p>
                </div>
                <div className="md:col-start-7 md:col-span-6 flex flex-col sm:flex-row gap-0">
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="px-10 py-5 bg-black text-white text-[14px] font-bold tracking-[0.15em] uppercase hover:bg-yellow-400 hover:text-black transition-colors duration-100"
                    style={{
                      fontFamily: FONT_HEADLINE,
                      border: '4px solid black',
                    }}
                  >
                    {ctaPrimary}
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="px-10 py-5 bg-white text-black text-[14px] font-bold tracking-[0.15em] uppercase hover:bg-black hover:text-white transition-colors duration-100"
                    style={{
                      fontFamily: FONT_HEADLINE,
                      border: '4px solid black',
                      marginLeft: '-4px',
                      marginTop: '-4px',
                    }}
                  >
                    {ctaSecondary}
                  </motion.button>
                </div>
              </div>
            </Item>
          </Section>
        </motion.div>

        {/* Yellow slash accent — overlapping bottom border */}
        <div
          className="absolute bottom-0 left-0 w-full h-4 bg-yellow-400"
          style={{ transform: 'skewY(-0.5deg)', transformOrigin: 'left bottom' }}
        />
      </div>

      {/* ----------------------------------------------------------------- */}
      {/* Stats — Brutally large numbers */}
      {/* ----------------------------------------------------------------- */}
      <div style={{ borderBottom: '4px solid black' }}>
        <div className="max-w-[1400px] mx-auto">
          <Section className="grid grid-cols-2 md:grid-cols-4">
            {stats.map((stat, i) => (
              <Item
                key={stat.label}
                className={cn(
                  'relative px-6 py-10 md:py-14 group',
                  'hover:bg-black hover:text-white transition-all duration-100'
                )}
                style={{
                  borderRight: i < stats.length - 1 ? '4px solid black' : 'none',
                  borderBottom: i < 2 ? '4px solid black' : 'none',
                } as React.CSSProperties}
              >
                {/* Rotated index number */}
                <span
                  className="absolute top-3 right-3 text-[10px] font-bold tracking-[0.2em] uppercase text-black/20 group-hover:text-yellow-400 transition-colors duration-100"
                  style={{
                    fontFamily: FONT_HEADLINE,
                    transform: 'rotate(3deg)',
                  }}
                >
                  0{i + 1}
                </span>
                <div
                  className="text-[clamp(2.5rem,6vw,5.5rem)] font-bold tracking-[-0.04em] leading-none"
                  style={{ fontFamily: FONT_HEADLINE }}
                >
                  {stat.value}
                </div>
                <div
                  className="mt-3 text-[11px] font-bold tracking-[0.25em] uppercase text-black/40 group-hover:text-white/50 transition-colors duration-100"
                  style={{ fontFamily: FONT_HEADLINE }}
                >
                  {stat.label}
                </div>
              </Item>
            ))}
          </Section>
        </div>
      </div>

      {/* ----------------------------------------------------------------- */}
      {/* Features — Overlapping cards, thick borders */}
      {/* ----------------------------------------------------------------- */}
      <div id="features" className="relative" style={{ borderBottom: '4px solid black' }}>
        {/* Background diagonal lines */}
        <div
          className="absolute inset-0 opacity-[0.02]"
          style={{
            backgroundImage: `repeating-linear-gradient(
              45deg,
              black,
              black 1px,
              transparent 1px,
              transparent 30px
            )`,
          }}
        />

        <div className="relative max-w-[1400px] mx-auto px-6 py-20 md:py-28">
          <Section>
            <Item>
              <div className="mb-16 md:mb-20">
                <div
                  className="inline-block bg-yellow-400 px-5 py-2 text-[11px] font-bold tracking-[0.3em] uppercase mb-6"
                  style={{
                    fontFamily: FONT_HEADLINE,
                    border: '3px solid black',
                    transform: 'rotate(-1deg)',
                  }}
                >
                  Platform
                </div>
                <h2
                  className="text-[clamp(2rem,5vw,4.5rem)] font-bold leading-[0.9] tracking-[-0.04em] uppercase"
                  style={{ fontFamily: FONT_HEADLINE }}
                >
                  Built for<br />
                  <Highlight>clinical</Highlight> precision
                </h2>
                <p className="mt-6 text-[15px] leading-[1.75] text-black/50 max-w-[50ch]">
                  Every feature engineered to eliminate friction between
                  neurologists and research institutions. No compromises.
                </p>
              </div>
            </Item>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-0">
              {features.map((feature, i) => {
                const Icon = iconMap[feature.icon] || Brain
                const isHovered = hoveredFeature === i
                return (
                  <Item key={feature.title}>
                    <motion.div
                      onHoverStart={() => setHoveredFeature(i)}
                      onHoverEnd={() => setHoveredFeature(null)}
                      className={cn(
                        'relative p-8 md:p-10 transition-all duration-100 cursor-pointer',
                        isHovered ? 'bg-black text-white' : 'bg-white text-black'
                      )}
                      style={{
                        border: '4px solid black',
                        marginTop: i >= 2 ? '-4px' : '0',
                        marginLeft: i % 2 === 1 ? '-4px' : '0',
                        transform: i === 1
                          ? 'rotate(0.5deg)'
                          : i === 2
                            ? 'rotate(-0.3deg)'
                            : 'none',
                        zIndex: isHovered ? 10 : 1,
                      }}
                    >
                      {/* Feature number — oversized, faded */}
                      <span
                        className={cn(
                          'absolute top-4 right-6 text-[72px] font-bold leading-none select-none pointer-events-none transition-colors duration-100',
                          isHovered ? 'text-yellow-400/20' : 'text-black/[0.04]'
                        )}
                        style={{ fontFamily: FONT_HEADLINE }}
                      >
                        {String(i + 1).padStart(2, '0')}
                      </span>

                      <div className="relative">
                        <div
                          className={cn(
                            'w-12 h-12 flex items-center justify-center mb-6 transition-all duration-100',
                            isHovered ? 'bg-yellow-400 text-black' : 'bg-black text-white'
                          )}
                          style={{ border: isHovered ? '3px solid #facc15' : '3px solid black' }}
                        >
                          <Icon size={22} strokeWidth={2} />
                        </div>
                        <h3
                          className="text-[16px] font-bold tracking-[0.1em] uppercase mb-4"
                          style={{ fontFamily: FONT_HEADLINE }}
                        >
                          {feature.title}
                        </h3>
                        <p
                          className={cn(
                            'text-[14px] leading-[1.75] max-w-[40ch] transition-colors duration-100',
                            isHovered ? 'text-white/60' : 'text-black/50'
                          )}
                        >
                          {feature.description}
                        </p>
                      </div>
                    </motion.div>
                  </Item>
                )
              })}
            </div>
          </Section>
        </div>
      </div>

      {/* ----------------------------------------------------------------- */}
      {/* Studies — Raw table, thick borders, aggressive layout */}
      {/* ----------------------------------------------------------------- */}
      <div id="studies" className="bg-black text-white" style={{ borderBottom: '4px solid #facc15' }}>
        <div className="max-w-[1400px] mx-auto px-6 py-20 md:py-28">
          <Section>
            <Item>
              <div className="flex flex-col md:flex-row items-start md:items-end justify-between mb-14 gap-6">
                <div>
                  <div
                    className="inline-block bg-yellow-400 text-black px-5 py-2 text-[11px] font-bold tracking-[0.3em] uppercase mb-6"
                    style={{
                      fontFamily: FONT_HEADLINE,
                      border: '3px solid #facc15',
                      transform: 'rotate(1deg)',
                    }}
                  >
                    Active Trials
                  </div>
                  <h2
                    className="text-[clamp(2rem,5vw,4.5rem)] font-bold leading-[0.9] tracking-[-0.04em] uppercase"
                    style={{ fontFamily: FONT_HEADLINE }}
                  >
                    Open <span className="text-yellow-400">Studies</span>
                  </h2>
                </div>
                <button
                  className="hidden md:flex items-center gap-2 px-6 py-3 bg-yellow-400 text-black text-[11px] font-bold tracking-[0.2em] uppercase hover:bg-white transition-colors duration-100"
                  style={{
                    fontFamily: FONT_HEADLINE,
                    border: '3px solid #facc15',
                  }}
                >
                  View All Studies
                  <ArrowUpRight size={14} strokeWidth={3} />
                </button>
              </div>
            </Item>

            {/* Studies as brutal cards */}
            <div className="space-y-0">
              {studies.map((study, i) => {
                const pct = study.target > 0 ? Math.round((study.patients / study.target) * 100) : 0
                return (
                  <Item key={study.title}>
                    <div
                      className="grid grid-cols-1 md:grid-cols-12 gap-4 md:gap-6 p-6 hover:bg-yellow-400 hover:text-black transition-all duration-100 cursor-pointer group"
                      style={{
                        borderTop: '3px solid rgba(255,255,255,0.15)',
                        ...(i === studies.length - 1 ? { borderBottom: '3px solid rgba(255,255,255,0.15)' } : {}),
                      }}
                    >
                      {/* Index */}
                      <div className="md:col-span-1 flex items-center">
                        <span
                          className="text-[28px] font-bold text-white/20 group-hover:text-black/30 transition-colors duration-100"
                          style={{ fontFamily: FONT_HEADLINE }}
                        >
                          {String(i + 1).padStart(2, '0')}
                        </span>
                      </div>
                      {/* Title + Condition */}
                      <div className="md:col-span-4 flex flex-col justify-center">
                        <span
                          className="text-[15px] font-bold tracking-[-0.01em] uppercase group-hover:text-black transition-colors duration-100"
                          style={{ fontFamily: FONT_HEADLINE }}
                        >
                          {study.title}
                        </span>
                        <span className="text-[12px] text-white/40 group-hover:text-black/50 mt-1 transition-colors duration-100">
                          {study.condition}
                        </span>
                      </div>
                      {/* University */}
                      <div className="md:col-span-2 flex items-center text-[13px] text-white/50 group-hover:text-black/60 transition-colors duration-100">
                        {study.university}
                      </div>
                      {/* Phase */}
                      <div className="md:col-span-1 flex items-center">
                        <span
                          className="px-3 py-1 text-[10px] font-bold tracking-[0.15em] uppercase bg-white/10 group-hover:bg-black/10 transition-colors duration-100"
                          style={{
                            fontFamily: FONT_HEADLINE,
                            border: '2px solid rgba(255,255,255,0.2)',
                          }}
                        >
                          {study.phase}
                        </span>
                      </div>
                      {/* Enrollment bar */}
                      <div className="md:col-span-3 flex items-center gap-4">
                        <div className="flex-1 h-3 bg-white/10 group-hover:bg-black/10 overflow-hidden transition-colors duration-100" style={{ border: '2px solid rgba(255,255,255,0.1)' }}>
                          <motion.div
                            className="h-full bg-yellow-400 group-hover:bg-black transition-colors duration-100"
                            initial={{ width: 0 }}
                            whileInView={{ width: `${pct}%` }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6, ease: [0.0, 0.0, 0.2, 1], delay: 0.15 * i }}
                          />
                        </div>
                        <span
                          className="text-[14px] font-bold tabular-nums w-[4ch] text-right text-white/50 group-hover:text-black/60 transition-colors duration-100"
                          style={{ fontFamily: FONT_HEADLINE }}
                        >
                          {pct}%
                        </span>
                      </div>
                      {/* Status */}
                      <div className="md:col-span-1 flex items-center justify-end">
                        <span
                          className={cn(
                            'text-[10px] font-bold tracking-[0.15em] uppercase transition-colors duration-100',
                            study.status === 'Enrolling'
                              ? 'text-yellow-400 group-hover:text-black'
                              : 'text-white/30 group-hover:text-black/40'
                          )}
                          style={{ fontFamily: FONT_HEADLINE }}
                        >
                          {study.status}
                        </span>
                      </div>
                    </div>
                  </Item>
                )
              })}
            </div>
          </Section>
        </div>
      </div>

      {/* ----------------------------------------------------------------- */}
      {/* Testimonials — raw, overlapping, rotated quote blocks */}
      {/* ----------------------------------------------------------------- */}
      <div id="network" style={{ borderBottom: '4px solid black' }}>
        <div className="max-w-[1400px] mx-auto px-6 py-20 md:py-28">
          <Section>
            <Item>
              <div className="mb-16">
                <div
                  className="inline-block bg-black text-yellow-400 px-5 py-2 text-[11px] font-bold tracking-[0.3em] uppercase mb-6"
                  style={{
                    fontFamily: FONT_HEADLINE,
                    border: '3px solid black',
                    transform: 'rotate(-1.5deg)',
                  }}
                >
                  Testimonials
                </div>
                <h2
                  className="text-[clamp(2rem,5vw,4.5rem)] font-bold leading-[0.9] tracking-[-0.04em] uppercase"
                  style={{ fontFamily: FONT_HEADLINE }}
                >
                  From <Highlight>the</Highlight> network
                </h2>
              </div>
            </Item>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
              {testimonials.map((t, i) => {
                const rotation = i === 0 ? -1 : i === 1 ? 0.8 : i === 2 ? -0.5 : 1.2
                return (
                  <Item key={t.name}>
                    <motion.blockquote
                      whileHover={{ rotate: 0, scale: 1.01 }}
                      transition={{ duration: 0.15 }}
                      className="relative p-8 bg-white hover:bg-black hover:text-white transition-all duration-100 cursor-default group"
                      style={{
                        border: '4px solid black',
                        transform: `rotate(${rotation}deg)`,
                      }}
                    >
                      {/* Giant quote mark */}
                      <span
                        className="absolute -top-6 -left-3 text-[80px] font-bold leading-none text-yellow-400 select-none pointer-events-none"
                        style={{ fontFamily: FONT_HEADLINE }}
                      >
                        &ldquo;
                      </span>

                      <p className="relative text-[15px] md:text-[17px] leading-[1.7] font-medium text-black/70 group-hover:text-white/70 mb-8 transition-colors duration-100">
                        {t.quote}
                      </p>
                      <footer className="flex items-center gap-4">
                        <div
                          className="w-12 h-12 bg-yellow-400 text-black flex items-center justify-center text-[13px] font-bold tracking-[0.05em] flex-shrink-0"
                          style={{
                            fontFamily: FONT_HEADLINE,
                            border: '3px solid black',
                          }}
                        >
                          {t.avatar}
                        </div>
                        <div>
                          <div
                            className="text-[14px] font-bold tracking-[0.02em]"
                            style={{ fontFamily: FONT_HEADLINE }}
                          >
                            {t.name}
                          </div>
                          <div className="text-[11px] text-black/40 group-hover:text-white/40 mt-0.5 transition-colors duration-100">
                            {t.credential}
                          </div>
                        </div>
                      </footer>
                    </motion.blockquote>
                  </Item>
                )
              })}
            </div>
          </Section>
        </div>
      </div>

      {/* ----------------------------------------------------------------- */}
      {/* CTA — Aggressive, yellow block */}
      {/* ----------------------------------------------------------------- */}
      <div className="bg-yellow-400 text-black relative overflow-hidden" style={{ borderBottom: '4px solid black' }}>
        {/* Background X pattern */}
        <div className="absolute inset-0 flex items-center justify-center opacity-[0.06] select-none pointer-events-none">
          <X size={600} strokeWidth={0.5} />
        </div>

        {/* Rotated background text */}
        <div
          className="absolute inset-0 flex items-center justify-center select-none pointer-events-none overflow-hidden"
        >
          <span
            className="text-[clamp(8rem,20vw,16rem)] font-bold tracking-[-0.06em] uppercase text-black/[0.05]"
            style={{
              fontFamily: FONT_HEADLINE,
              transform: 'rotate(-6deg)',
            }}
          >
            JOIN NOW
          </span>
        </div>

        <div className="relative max-w-[1400px] mx-auto px-6 py-20 md:py-28">
          <Section>
            <Item>
              <div className="grid grid-cols-1 md:grid-cols-12 gap-10 items-end">
                <div className="md:col-span-7">
                  <div
                    className="inline-block bg-black text-yellow-400 px-4 py-2 text-[11px] font-bold tracking-[0.3em] uppercase mb-8"
                    style={{
                      fontFamily: FONT_HEADLINE,
                      border: '3px solid black',
                      transform: 'rotate(2deg)',
                    }}
                  >
                    <Zap size={12} strokeWidth={3} className="inline mr-2 -mt-0.5" />
                    Get Started
                  </div>
                  <h2
                    className="text-[clamp(2.5rem,6vw,5.5rem)] font-bold leading-[0.85] tracking-[-0.05em] uppercase"
                    style={{ fontFamily: FONT_HEADLINE }}
                  >
                    Join 2,400+
                    <br />
                    neurologists
                    <br />
                    <span className="inline-block bg-black text-yellow-400 px-4 py-1 mt-2">
                      already here
                    </span>
                  </h2>
                </div>
                <div className="md:col-start-9 md:col-span-4 flex flex-col gap-0">
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.97 }}
                    className="px-8 py-6 bg-black text-yellow-400 text-[15px] font-bold tracking-[0.2em] uppercase hover:bg-white hover:text-black transition-colors duration-100 flex items-center justify-center gap-3"
                    style={{
                      fontFamily: FONT_HEADLINE,
                      border: '4px solid black',
                    }}
                  >
                    {ctaPrimary}
                    <ArrowUpRight size={18} strokeWidth={3} />
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.97 }}
                    className="px-8 py-6 bg-white text-black text-[15px] font-bold tracking-[0.2em] uppercase hover:bg-black hover:text-white transition-colors duration-100"
                    style={{
                      fontFamily: FONT_HEADLINE,
                      border: '4px solid black',
                      marginTop: '-4px',
                    }}
                  >
                    {ctaSecondary}
                  </motion.button>
                </div>
              </div>
            </Item>
          </Section>
        </div>
      </div>

      {/* ----------------------------------------------------------------- */}
      {/* Footer — raw, utilitarian */}
      {/* ----------------------------------------------------------------- */}
      <footer className="bg-black text-white" style={{ borderBottom: '4px solid #facc15' }}>
        <div className="max-w-[1400px] mx-auto px-6 py-14 md:py-18">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-6 mb-14">
            {/* Brand */}
            <div className="col-span-2 md:col-span-1">
              <span
                className="text-[28px] font-bold tracking-[-0.04em] uppercase"
                style={{ fontFamily: FONT_HEADLINE }}
              >
                {brandName}
                <span className="text-yellow-400">.</span>
              </span>
              <p className="mt-3 text-[12px] leading-[1.7] text-white/30 max-w-[28ch]">
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
                  className="text-[10px] font-bold tracking-[0.3em] uppercase text-yellow-400/60 mb-5"
                  style={{ fontFamily: FONT_HEADLINE }}
                >
                  {col.title}
                </h4>
                <ul className="space-y-3">
                  {col.links.map((link) => (
                    <li key={link}>
                      <a
                        href="#"
                        className="text-[12px] text-white/40 hover:text-yellow-400 transition-colors duration-100"
                      >
                        {link}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          {/* Bottom rule */}
          <div
            className="pt-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-4"
            style={{ borderTop: '3px solid rgba(255,255,255,0.1)' }}
          >
            <p className="text-[11px] text-white/20">
              &copy; {new Date().getFullYear()} {brandName}. All rights reserved. No corporate BS.
            </p>
            <div className="flex items-center gap-6">
              {['Privacy', 'Terms', 'Cookies'].map((item) => (
                <a
                  key={item}
                  href="#"
                  className="text-[11px] text-white/20 hover:text-yellow-400 transition-colors duration-100"
                >
                  {item}
                </a>
              ))}
            </div>
          </div>
        </div>
      </footer>

      {/* ----------------------------------------------------------------- */}
      {/* Bottom Prev/Next — thick, brutal */}
      {/* ----------------------------------------------------------------- */}
      <div className="bg-white" style={{ borderTop: '4px solid black' }}>
        <div className="max-w-[1400px] mx-auto grid grid-cols-2">
          <Link
            to="/11"
            className="flex items-center justify-center gap-3 py-6 text-[12px] font-bold tracking-[0.2em] uppercase hover:bg-black hover:text-yellow-400 transition-all duration-100"
            style={{
              fontFamily: FONT_HEADLINE,
              borderRight: '4px solid black',
            }}
          >
            <ArrowLeft size={16} strokeWidth={3} />
            Previous Design
          </Link>
          <Link
            to="/13"
            className="flex items-center justify-center gap-3 py-6 text-[12px] font-bold tracking-[0.2em] uppercase hover:bg-black hover:text-yellow-400 transition-all duration-100"
            style={{ fontFamily: FONT_HEADLINE }}
          >
            Next Design
            <ArrowRight size={16} strokeWidth={3} />
          </Link>
        </div>
      </div>
    </div>
  )
}
