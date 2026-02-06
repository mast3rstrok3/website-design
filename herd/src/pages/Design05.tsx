import { Link } from 'react-router-dom'
import { motion, useScroll, useTransform, useInView } from 'framer-motion'
import {
  Brain,
  Shield,
  Activity,
  ClipboardCheck,
  MapPin,
  Mountain,
  ArrowRight,
  ChevronLeft,
  ChevronRight,
  Compass,
  Quote,
  FlaskConical,
  Triangle,
} from 'lucide-react'
import { useRef } from 'react'
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

// ─── Palette ───────────────────────────────────────────────
const C = {
  sand: '#e8dcc8',
  sandLight: '#f5f2ec',
  forest: '#2d5016',
  forestDark: '#1e3a0e',
  forestLight: '#4a7a2e',
  terracotta: '#c2703e',
  terracottaLight: '#d4915e',
  ink: '#2a2318',
  cream: '#f5f2ec',
  warmWhite: '#faf8f4',
} as const

// ─── Icon Map ──────────────────────────────────────────────
const iconMap: Record<string, React.ReactNode> = {
  brain: <Brain size={24} />,
  shield: <Shield size={24} />,
  activity: <Activity size={24} />,
  clipboard: <ClipboardCheck size={24} />,
}

// ─── Coordinate labels for decorative use ──────────────────
const coordinates = [
  '47.3769\u00b0N 8.5417\u00b0E',
  '52.5200\u00b0N 13.4050\u00b0E',
  '59.3293\u00b0N 18.0686\u00b0E',
  '39.2904\u00b0N 76.6122\u00b0W',
  '44.0582\u00b0N 92.4680\u00b0W',
  '48.8566\u00b0N 2.3522\u00b0E',
]

// ─── SVG Topographic Contour Pattern ───────────────────────
function ContourPattern({
  className,
  opacity = 0.12,
  color = C.forest,
}: {
  className?: string
  opacity?: number
  color?: string
}) {
  return (
    <svg
      className={cn('absolute inset-0 w-full h-full pointer-events-none', className)}
      viewBox="0 0 1200 800"
      preserveAspectRatio="xMidYMid slice"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g fill="none" stroke={color} strokeWidth="1.2" opacity={opacity}>
        {/* Concentric irregular contour loops — center cluster */}
        <path d="M600,400 C650,350 720,360 740,400 C760,440 720,490 660,480 C610,470 560,440 600,400Z" />
        <path d="M580,380 C640,310 760,330 790,400 C820,470 750,540 640,520 C550,505 520,440 580,380Z" />
        <path d="M550,360 C620,260 800,290 840,400 C880,510 780,600 620,570 C490,545 470,440 550,360Z" />
        <path d="M520,340 C600,210 850,250 900,400 C950,550 820,660 600,620 C420,585 410,440 520,340Z" />
        <path d="M480,320 C580,160 900,210 960,400 C1020,590 860,720 580,670 C350,625 350,440 480,320Z" />
        <path d="M440,300 C560,110 950,170 1020,400 C1090,630 900,780 560,720 C280,665 290,440 440,300Z" />

        {/* Secondary cluster — upper left */}
        <path d="M250,200 C280,170 330,175 340,200 C350,225 320,250 280,245 C255,240 230,225 250,200Z" />
        <path d="M230,185 C270,140 360,150 380,200 C400,250 350,290 260,275 C200,265 195,225 230,185Z" />
        <path d="M210,165 C260,100 400,120 430,200 C460,280 390,340 240,310 C140,290 150,220 210,165Z" />

        {/* Tertiary cluster — lower right */}
        <path d="M900,600 C930,575 970,580 980,600 C990,620 960,640 920,635 C900,630 880,620 900,600Z" />
        <path d="M880,580 C920,545 1000,555 1020,600 C1040,645 1000,680 900,665 C840,655 845,610 880,580Z" />
        <path d="M860,560 C910,510 1040,525 1070,600 C1100,675 1040,730 880,700 C770,680 800,595 860,560Z" />

        {/* Loose contour lines — long sweeping curves */}
        <path d="M0,600 C200,550 400,620 600,580 C800,540 1000,610 1200,570" />
        <path d="M0,650 C200,610 400,670 600,640 C800,610 1000,660 1200,630" />
        <path d="M0,150 C200,120 400,180 600,140 C800,100 1000,170 1200,130" />
        <path d="M0,200 C200,175 400,230 600,195 C800,160 1000,220 1200,185" />
      </g>
    </svg>
  )
}

// ─── Small contour accent for cards ────────────────────────
function ContourAccent({ className }: { className?: string }) {
  return (
    <svg
      className={cn('absolute pointer-events-none', className)}
      viewBox="0 0 200 200"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g fill="none" stroke={C.forest} strokeWidth="1" opacity={0.15}>
        <path d="M100,100 C120,80 150,85 155,100 C160,115 140,135 110,130 C90,125 85,115 100,100Z" />
        <path d="M90,90 C115,60 165,70 175,100 C185,130 155,160 105,150 C70,142 65,115 90,90Z" />
        <path d="M80,80 C110,40 180,55 195,100 C210,145 170,185 100,170 C50,158 45,115 80,80Z" />
      </g>
    </svg>
  )
}

// ─── Animated section wrapper ──────────────────────────────
function FadeInSection({
  children,
  className,
  delay = 0,
}: {
  children: React.ReactNode
  className?: string
  delay?: number
}) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-60px' })

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
      transition={{ duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  )
}

// ─── Map Legend Label ──────────────────────────────────────
function LegendLabel({ label, color = C.forest }: { label: string; color?: string }) {
  return (
    <div className="flex items-center gap-3 mb-8">
      <div className="flex items-center gap-2">
        <div className="w-4 h-[2px]" style={{ backgroundColor: color }} />
        <div className="w-2 h-[2px]" style={{ backgroundColor: color }} />
        <div className="w-1 h-[2px]" style={{ backgroundColor: color }} />
      </div>
      <span
        className="text-xs font-medium tracking-[0.25em] uppercase"
        style={{ fontFamily: "'Space Grotesk', sans-serif", color }}
      >
        {label}
      </span>
      <div className="flex items-center gap-2">
        <div className="w-1 h-[2px]" style={{ backgroundColor: color }} />
        <div className="w-2 h-[2px]" style={{ backgroundColor: color }} />
        <div className="w-8 h-[2px]" style={{ backgroundColor: color, opacity: 0.4 }} />
      </div>
    </div>
  )
}

// ─── Coordinate Decoration ─────────────────────────────────
function CoordinateLabel({
  text,
  className,
  style,
}: {
  text: string
  className?: string
  style?: React.CSSProperties
}) {
  return (
    <span
      className={cn(
        'absolute text-[10px] tracking-[0.15em] select-none pointer-events-none',
        className
      )}
      style={{
        fontFamily: "'Space Grotesk', monospace",
        color: C.forest,
        opacity: 0.2,
        ...style,
      }}
    >
      {text}
    </span>
  )
}

// ─── Main Component ────────────────────────────────────────
export default function Design05() {
  const heroRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ['start start', 'end start'],
  })
  const heroContourY = useTransform(scrollYProgress, [0, 1], [0, 120])
  const heroTextY = useTransform(scrollYProgress, [0, 1], [0, -40])

  return (
    <div
      className="design-page relative"
      style={{
        backgroundColor: C.cream,
        color: C.ink,
        fontFamily: "'Inter', sans-serif",
      }}
    >
      {/* ─── Floating Nav ─────────────────────────────────── */}
      <motion.nav
        initial={{ y: -60, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="fixed top-4 left-1/2 -translate-x-1/2 z-50 flex items-center gap-4 px-6 py-3 rounded-full border backdrop-blur-md"
        style={{
          backgroundColor: 'rgba(245,242,236,0.85)',
          borderColor: 'rgba(45,80,22,0.15)',
        }}
      >
        <Link
          to="/4"
          className="flex items-center gap-1 text-sm transition-colors duration-200"
          style={{ color: C.forest, fontFamily: "'Space Grotesk', sans-serif" }}
        >
          <ChevronLeft size={16} />
          Prev
        </Link>
        <div className="flex items-center gap-2 px-4 border-x" style={{ borderColor: 'rgba(45,80,22,0.15)' }}>
          <Compass size={14} style={{ color: C.terracotta }} />
          <span
            className="text-sm font-semibold tracking-wide"
            style={{ fontFamily: "'Space Grotesk', sans-serif", color: C.forest }}
          >
            05 / Topography
          </span>
        </div>
        <Link
          to="/6"
          className="flex items-center gap-1 text-sm transition-colors duration-200"
          style={{ color: C.forest, fontFamily: "'Space Grotesk', sans-serif" }}
        >
          Next
          <ChevronRight size={16} />
        </Link>
      </motion.nav>

      {/* ─── Hero Section ─────────────────────────────────── */}
      <section ref={heroRef} className="relative min-h-screen flex items-center overflow-hidden">
        {/* Background contour pattern with parallax */}
        <motion.div className="absolute inset-0" style={{ y: heroContourY }}>
          <ContourPattern opacity={0.1} color={C.forest} />
        </motion.div>

        {/* Gradient overlay for depth */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: `radial-gradient(ellipse 80% 60% at 30% 50%, ${C.sand}88 0%, transparent 70%)`,
          }}
        />

        {/* Coordinate decorations */}
        <CoordinateLabel text={coordinates[0]} className="top-24 right-12 hidden lg:block" />
        <CoordinateLabel text={coordinates[1]} className="bottom-32 left-8 hidden lg:block" />
        <CoordinateLabel text={coordinates[2]} className="top-40 left-16 hidden lg:block" style={{ transform: 'rotate(-90deg)' }} />
        <CoordinateLabel text={coordinates[3]} className="bottom-20 right-24 hidden lg:block" />

        {/* Elevation markers on the side */}
        <div className="absolute right-6 top-1/2 -translate-y-1/2 hidden xl:flex flex-col items-center gap-3 opacity-20">
          {[800, 600, 400, 200, 0].map((elev) => (
            <div key={elev} className="flex items-center gap-2">
              <span
                className="text-[9px] tracking-wider"
                style={{ fontFamily: "'Space Grotesk', monospace", color: C.forest }}
              >
                {elev}m
              </span>
              <div className="w-3 h-[1px]" style={{ backgroundColor: C.forest }} />
            </div>
          ))}
        </div>

        <motion.div
          className="relative z-10 max-w-6xl mx-auto px-6 md:px-12 pt-32 pb-20"
          style={{ y: heroTextY }}
        >
          {/* Brand badge */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="flex items-center gap-3 mb-8"
          >
            <div
              className="w-10 h-10 rounded-lg flex items-center justify-center"
              style={{ backgroundColor: C.forest }}
            >
              <Mountain size={20} color={C.cream} />
            </div>
            <div>
              <span
                className="text-lg font-bold tracking-wide"
                style={{ fontFamily: "'Space Grotesk', sans-serif", color: C.forest }}
              >
                {brandName}
              </span>
              <span
                className="block text-[10px] tracking-[0.3em] uppercase opacity-60"
                style={{ fontFamily: "'Space Grotesk', sans-serif", color: C.terracotta }}
              >
                {tagline}
              </span>
            </div>
          </motion.div>

          {/* Hero headline */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
            className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold leading-[1.05] mb-6 max-w-4xl"
            style={{
              fontFamily: "'Space Grotesk', sans-serif",
              color: C.forestDark,
            }}
          >
            {heroHeadline.split(' ').map((word, i) => (
              <span key={i}>
                {word === 'studies' || word === 'patients' ? (
                  <span style={{ color: C.terracotta }}>{word}</span>
                ) : (
                  word
                )}{' '}
              </span>
            ))}
          </motion.h1>

          {/* Subheadline */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.7 }}
            className="text-base md:text-lg leading-relaxed max-w-2xl mb-10 opacity-75"
            style={{ color: C.ink }}
          >
            {heroSubheadline}
          </motion.p>

          {/* CTA buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.9 }}
            className="flex flex-wrap gap-4"
          >
            <button
              className="group flex items-center gap-2 px-7 py-3.5 rounded-lg text-sm font-semibold tracking-wide transition-all duration-300 hover:shadow-lg hover:scale-[1.02]"
              style={{
                backgroundColor: C.forest,
                color: C.cream,
                fontFamily: "'Space Grotesk', sans-serif",
              }}
            >
              <MapPin size={16} />
              {ctaPrimary}
              <ArrowRight
                size={16}
                className="transition-transform duration-300 group-hover:translate-x-1"
              />
            </button>
            <button
              className="flex items-center gap-2 px-7 py-3.5 rounded-lg text-sm font-semibold tracking-wide border-2 transition-all duration-300 hover:shadow-md"
              style={{
                borderColor: C.forest,
                color: C.forest,
                backgroundColor: 'transparent',
                fontFamily: "'Space Grotesk', sans-serif",
              }}
            >
              <Compass size={16} />
              {ctaSecondary}
            </button>
          </motion.div>

          {/* Decorative contour line beneath hero */}
          <motion.div
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 1.2, delay: 1.1, ease: [0.22, 1, 0.36, 1] }}
            className="mt-16 origin-left"
          >
            <svg width="100%" height="40" viewBox="0 0 800 40" preserveAspectRatio="none">
              <path
                d="M0,20 C100,5 200,35 300,20 C400,5 500,30 600,15 C700,0 750,25 800,20"
                fill="none"
                stroke={C.forest}
                strokeWidth="1.5"
                opacity="0.3"
              />
              <path
                d="M0,28 C100,15 200,38 300,25 C400,12 500,35 600,22 C700,10 750,30 800,25"
                fill="none"
                stroke={C.terracotta}
                strokeWidth="1"
                opacity="0.2"
              />
            </svg>
          </motion.div>
        </motion.div>
      </section>

      {/* ─── Stats as Elevation Markers ───────────────────── */}
      <section className="relative py-20 overflow-hidden" style={{ backgroundColor: C.sand }}>
        <ContourPattern opacity={0.06} color={C.forestDark} />
        <CoordinateLabel text={coordinates[4]} className="top-8 left-10 hidden lg:block" />

        <div className="relative z-10 max-w-6xl mx-auto px-6 md:px-12">
          <FadeInSection>
            <LegendLabel label="Survey Elevation Data" />
          </FadeInSection>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {stats.map((stat, i) => (
              <FadeInSection key={stat.label} delay={i * 0.1}>
                <div
                  className="relative p-6 rounded-xl border group hover:shadow-lg transition-all duration-300"
                  style={{
                    backgroundColor: C.cream,
                    borderColor: 'rgba(45,80,22,0.12)',
                  }}
                >
                  {/* Elevation triangle marker */}
                  <div className="flex items-center gap-2 mb-3">
                    <Triangle
                      size={12}
                      style={{ color: C.terracotta, fill: C.terracotta }}
                    />
                    <span
                      className="text-[10px] tracking-[0.2em] uppercase opacity-50"
                      style={{ fontFamily: "'Space Grotesk', monospace" }}
                    >
                      ELEV.{String(i + 1).padStart(2, '0')}
                    </span>
                  </div>
                  <div
                    className="text-3xl md:text-4xl font-bold mb-1"
                    style={{
                      fontFamily: "'Space Grotesk', sans-serif",
                      color: C.forest,
                    }}
                  >
                    {stat.value}
                  </div>
                  <div
                    className="text-sm opacity-60"
                    style={{ color: C.ink }}
                  >
                    {stat.label}
                  </div>
                  {/* Bottom contour accent */}
                  <div
                    className="absolute bottom-0 left-0 right-0 h-[2px] rounded-b-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                    style={{ backgroundColor: C.terracotta }}
                  />
                </div>
              </FadeInSection>
            ))}
          </div>
        </div>
      </section>

      {/* ─── Features as Map Legend ────────────────────────── */}
      <section className="relative py-24 overflow-hidden" style={{ backgroundColor: C.cream }}>
        <ContourPattern opacity={0.05} color={C.terracotta} />
        <CoordinateLabel text={coordinates[5]} className="bottom-12 right-8 hidden lg:block" />

        <div className="relative z-10 max-w-6xl mx-auto px-6 md:px-12">
          <FadeInSection>
            <LegendLabel label="Map Legend" />
            <h2
              className="text-3xl md:text-4xl font-bold mb-4 max-w-xl"
              style={{ fontFamily: "'Space Grotesk', sans-serif", color: C.forestDark }}
            >
              Navigate the research landscape
            </h2>
            <p className="text-base opacity-60 max-w-lg mb-14" style={{ color: C.ink }}>
              Every tool you need to chart a course through clinical trials, from patient matching to compliance tracking.
            </p>
          </FadeInSection>

          <div className="grid md:grid-cols-2 gap-6">
            {features.map((feature, i) => (
              <FadeInSection key={feature.title} delay={i * 0.12}>
                <div
                  className="group relative p-7 rounded-xl border overflow-hidden transition-all duration-300 hover:shadow-lg hover:-translate-y-1"
                  style={{
                    backgroundColor: C.warmWhite,
                    borderColor: 'rgba(45,80,22,0.1)',
                  }}
                >
                  <ContourAccent className="w-40 h-40 -top-10 -right-10 opacity-50 group-hover:opacity-100 transition-opacity duration-500" />

                  <div className="relative z-10">
                    {/* Legend symbol row */}
                    <div className="flex items-center gap-3 mb-5">
                      <div
                        className="w-11 h-11 rounded-lg flex items-center justify-center"
                        style={{
                          backgroundColor: i % 2 === 0 ? C.forest : C.terracotta,
                          color: C.cream,
                        }}
                      >
                        {iconMap[feature.icon]}
                      </div>
                      <div className="flex items-center gap-2">
                        <div
                          className="h-[2px] w-8"
                          style={{
                            backgroundColor: i % 2 === 0 ? C.forest : C.terracotta,
                            opacity: 0.4,
                          }}
                        />
                        <span
                          className="text-[10px] tracking-[0.2em] uppercase opacity-40"
                          style={{ fontFamily: "'Space Grotesk', monospace" }}
                        >
                          FEAT.{String(i + 1).padStart(2, '0')}
                        </span>
                      </div>
                    </div>

                    <h3
                      className="text-xl font-bold mb-2"
                      style={{
                        fontFamily: "'Space Grotesk', sans-serif",
                        color: C.forestDark,
                      }}
                    >
                      {feature.title}
                    </h3>
                    <p className="text-sm leading-relaxed opacity-65" style={{ color: C.ink }}>
                      {feature.description}
                    </p>
                  </div>
                </div>
              </FadeInSection>
            ))}
          </div>
        </div>
      </section>

      {/* ─── Studies as Waypoints / Map Pins ──────────────── */}
      <section className="relative py-24 overflow-hidden" style={{ backgroundColor: C.forestDark }}>
        <ContourPattern opacity={0.08} color={C.sand} />

        {/* Margin coordinates */}
        <CoordinateLabel
          text="CARTOGRAPHIC SURVEY v2.4"
          className="top-8 left-10 hidden lg:block"
          style={{ color: C.sand, opacity: 0.15 }}
        />

        <div className="relative z-10 max-w-6xl mx-auto px-6 md:px-12">
          <FadeInSection>
            <LegendLabel label="Waypoints" color={C.sand} />
            <h2
              className="text-3xl md:text-4xl font-bold mb-4 max-w-xl"
              style={{ fontFamily: "'Space Grotesk', sans-serif", color: C.cream }}
            >
              Active research waypoints
            </h2>
            <p className="text-base mb-14 max-w-lg" style={{ color: C.sand, opacity: 0.6 }}>
              Each study is a destination on the map. Chart your route to the trials that align with your patients.
            </p>
          </FadeInSection>

          <div className="space-y-4">
            {studies.map((study, i) => {
              const progress = study.target > 0 ? (study.patients / study.target) * 100 : 0

              return (
                <FadeInSection key={study.title} delay={i * 0.08}>
                  <div
                    className="group relative p-5 md:p-6 rounded-xl border transition-all duration-300 hover:border-opacity-40 overflow-hidden"
                    style={{
                      backgroundColor: 'rgba(245,242,236,0.04)',
                      borderColor: 'rgba(232,220,200,0.1)',
                    }}
                  >
                    {/* Hover glow */}
                    <div
                      className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                      style={{
                        background: `radial-gradient(ellipse at 0% 50%, rgba(194,112,62,0.08) 0%, transparent 60%)`,
                      }}
                    />

                    <div className="relative z-10 flex flex-col md:flex-row md:items-center gap-4">
                      {/* Pin icon */}
                      <div className="flex items-center gap-4 md:w-[45%]">
                        <div
                          className="flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center"
                          style={{
                            backgroundColor:
                              study.status === 'Enrolling'
                                ? 'rgba(45,80,22,0.25)'
                                : 'rgba(194,112,62,0.2)',
                          }}
                        >
                          <MapPin
                            size={18}
                            style={{
                              color:
                                study.status === 'Enrolling' ? C.forestLight : C.terracottaLight,
                            }}
                          />
                        </div>
                        <div>
                          <h3
                            className="text-sm md:text-base font-semibold leading-snug"
                            style={{
                              fontFamily: "'Space Grotesk', sans-serif",
                              color: C.cream,
                            }}
                          >
                            {study.title}
                          </h3>
                          <span className="text-xs opacity-50" style={{ color: C.sand }}>
                            {study.university}
                          </span>
                        </div>
                      </div>

                      {/* Phase + Condition */}
                      <div className="flex items-center gap-3 md:w-[25%]">
                        <span
                          className="text-[10px] tracking-[0.15em] uppercase px-2.5 py-1 rounded-full border"
                          style={{
                            color: C.cream,
                            borderColor: 'rgba(232,220,200,0.15)',
                            fontFamily: "'Space Grotesk', sans-serif",
                          }}
                        >
                          {study.phase}
                        </span>
                        <span
                          className="text-xs opacity-40"
                          style={{ color: C.sand }}
                        >
                          {study.condition}
                        </span>
                      </div>

                      {/* Progress bar */}
                      <div className="md:w-[30%] flex items-center gap-3">
                        <div className="flex-1 relative">
                          <div
                            className="w-full h-1.5 rounded-full overflow-hidden"
                            style={{ backgroundColor: 'rgba(232,220,200,0.1)' }}
                          >
                            <motion.div
                              className="h-full rounded-full"
                              style={{
                                backgroundColor:
                                  study.status === 'Enrolling' ? C.forestLight : C.terracotta,
                              }}
                              initial={{ width: 0 }}
                              whileInView={{ width: `${progress}%` }}
                              viewport={{ once: true }}
                              transition={{ duration: 1, delay: 0.3 + i * 0.1 }}
                            />
                          </div>
                        </div>
                        <span
                          className="text-xs font-medium tabular-nums whitespace-nowrap"
                          style={{
                            fontFamily: "'Space Grotesk', monospace",
                            color: C.sand,
                            opacity: 0.5,
                          }}
                        >
                          {study.patients}/{study.target}
                        </span>
                      </div>
                    </div>
                  </div>
                </FadeInSection>
              )
            })}
          </div>
        </div>
      </section>

      {/* ─── Testimonials as Field Notes ──────────────────── */}
      <section className="relative py-24 overflow-hidden" style={{ backgroundColor: C.sand }}>
        <ContourPattern opacity={0.05} color={C.forest} />

        <div className="relative z-10 max-w-6xl mx-auto px-6 md:px-12">
          <FadeInSection>
            <LegendLabel label="Field Notes" />
            <h2
              className="text-3xl md:text-4xl font-bold mb-14 max-w-lg"
              style={{ fontFamily: "'Space Grotesk', sans-serif", color: C.forestDark }}
            >
              Dispatches from the field
            </h2>
          </FadeInSection>

          <div className="grid md:grid-cols-2 gap-6">
            {testimonials.map((t, i) => (
              <FadeInSection key={t.name} delay={i * 0.1}>
                <div
                  className="relative p-7 rounded-xl border group transition-all duration-300 hover:shadow-md"
                  style={{
                    backgroundColor: C.cream,
                    borderColor: 'rgba(45,80,22,0.1)',
                  }}
                >
                  {/* Field note number */}
                  <span
                    className="absolute top-4 right-5 text-[10px] tracking-[0.2em] uppercase opacity-20"
                    style={{ fontFamily: "'Space Grotesk', monospace", color: C.forest }}
                  >
                    NOTE.{String(i + 1).padStart(2, '0')}
                  </span>

                  <Quote
                    size={20}
                    className="mb-4 opacity-20"
                    style={{ color: C.terracotta }}
                  />
                  <p
                    className="text-sm leading-relaxed mb-6 opacity-75"
                    style={{ color: C.ink }}
                  >
                    "{t.quote}"
                  </p>
                  <div className="flex items-center gap-3">
                    <div
                      className="w-9 h-9 rounded-full flex items-center justify-center text-xs font-bold"
                      style={{
                        backgroundColor: C.forest,
                        color: C.cream,
                        fontFamily: "'Space Grotesk', sans-serif",
                      }}
                    >
                      {t.avatar}
                    </div>
                    <div>
                      <div
                        className="text-sm font-semibold"
                        style={{
                          fontFamily: "'Space Grotesk', sans-serif",
                          color: C.forestDark,
                        }}
                      >
                        {t.name}
                      </div>
                      <div className="text-xs opacity-50" style={{ color: C.ink }}>
                        {t.credential}
                      </div>
                    </div>
                  </div>
                </div>
              </FadeInSection>
            ))}
          </div>
        </div>
      </section>

      {/* ─── CTA / Base Camp ──────────────────────────────── */}
      <section className="relative py-28 overflow-hidden" style={{ backgroundColor: C.forest }}>
        <ContourPattern opacity={0.1} color={C.sand} />

        {/* Large coordinate watermark */}
        <span
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[12vw] font-bold pointer-events-none select-none whitespace-nowrap"
          style={{
            fontFamily: "'Space Grotesk', sans-serif",
            color: C.sand,
            opacity: 0.03,
          }}
        >
          47.3769\u00b0N
        </span>

        <div className="relative z-10 max-w-3xl mx-auto px-6 md:px-12 text-center">
          <FadeInSection>
            <div className="flex justify-center mb-6">
              <div
                className="w-14 h-14 rounded-xl flex items-center justify-center"
                style={{ backgroundColor: 'rgba(232,220,200,0.1)' }}
              >
                <FlaskConical size={28} style={{ color: C.terracottaLight }} />
              </div>
            </div>
            <h2
              className="text-3xl md:text-5xl font-bold mb-5"
              style={{ fontFamily: "'Space Grotesk', sans-serif", color: C.cream }}
            >
              Establish your base camp
            </h2>
            <p className="text-base md:text-lg mb-10 max-w-xl mx-auto" style={{ color: C.sand, opacity: 0.6 }}>
              Join the network of neurologists charting new territory in clinical research. Your next discovery is waiting.
            </p>
          </FadeInSection>

          <FadeInSection delay={0.15}>
            <div className="flex flex-wrap justify-center gap-4">
              <button
                className="group flex items-center gap-2 px-8 py-4 rounded-lg text-sm font-semibold tracking-wide transition-all duration-300 hover:shadow-xl hover:scale-[1.03]"
                style={{
                  backgroundColor: C.terracotta,
                  color: C.cream,
                  fontFamily: "'Space Grotesk', sans-serif",
                }}
              >
                <MapPin size={16} />
                {ctaPrimary}
                <ArrowRight
                  size={16}
                  className="transition-transform duration-300 group-hover:translate-x-1"
                />
              </button>
              <button
                className="flex items-center gap-2 px-8 py-4 rounded-lg text-sm font-semibold tracking-wide border transition-all duration-300 hover:bg-white/5"
                style={{
                  borderColor: 'rgba(232,220,200,0.25)',
                  color: C.cream,
                  fontFamily: "'Space Grotesk', sans-serif",
                }}
              >
                <Compass size={16} />
                {ctaSecondary}
              </button>
            </div>
          </FadeInSection>
        </div>
      </section>

      {/* ─── Footer ───────────────────────────────────────── */}
      <footer
        className="relative py-12 overflow-hidden"
        style={{ backgroundColor: C.forestDark }}
      >
        <div className="relative z-10 max-w-6xl mx-auto px-6 md:px-12">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-3">
              <Mountain size={18} style={{ color: C.sand, opacity: 0.5 }} />
              <span
                className="text-sm font-semibold tracking-wider"
                style={{
                  fontFamily: "'Space Grotesk', sans-serif",
                  color: C.sand,
                  opacity: 0.5,
                }}
              >
                {brandName}
              </span>
            </div>

            {/* Decorative contour in footer */}
            <div className="hidden md:block flex-1 mx-8">
              <svg width="100%" height="20" viewBox="0 0 600 20" preserveAspectRatio="none">
                <path
                  d="M0,10 C100,3 200,17 300,10 C400,3 500,15 600,10"
                  fill="none"
                  stroke={C.sand}
                  strokeWidth="0.5"
                  opacity="0.15"
                />
              </svg>
            </div>

            <div className="flex items-center gap-6">
              <span
                className="text-xs tracking-[0.15em]"
                style={{
                  fontFamily: "'Space Grotesk', monospace",
                  color: C.sand,
                  opacity: 0.3,
                }}
              >
                {coordinates[0]}
              </span>
              <span
                className="text-xs opacity-30"
                style={{ color: C.sand }}
              >
                &copy; 2025 {brandName}
              </span>
            </div>
          </div>
        </div>
      </footer>

      {/* ─── Bottom Prev / Next Navigation ────────────────── */}
      <div
        className="flex items-center justify-between px-6 md:px-12 py-5 border-t"
        style={{
          backgroundColor: C.forestDark,
          borderColor: 'rgba(232,220,200,0.06)',
        }}
      >
        <Link
          to="/4"
          className="flex items-center gap-2 text-sm font-medium transition-colors duration-200 hover:opacity-80"
          style={{
            fontFamily: "'Space Grotesk', sans-serif",
            color: C.sand,
            opacity: 0.5,
          }}
        >
          <ChevronLeft size={16} />
          Design 04
        </Link>
        <Link
          to="/"
          className="text-xs tracking-[0.2em] uppercase transition-colors duration-200 hover:opacity-80"
          style={{
            fontFamily: "'Space Grotesk', sans-serif",
            color: C.sand,
            opacity: 0.3,
          }}
        >
          Gallery
        </Link>
        <Link
          to="/6"
          className="flex items-center gap-2 text-sm font-medium transition-colors duration-200 hover:opacity-80"
          style={{
            fontFamily: "'Space Grotesk', sans-serif",
            color: C.sand,
            opacity: 0.5,
          }}
        >
          Design 06
          <ChevronRight size={16} />
        </Link>
      </div>
    </div>
  )
}
