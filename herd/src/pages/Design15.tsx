import { useRef, useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { motion, useInView, useScroll, useTransform } from 'framer-motion'
import {
  Brain,
  Shield,
  Activity,
  ClipboardCheck,
  ChevronLeft,
  ChevronRight,
  Eye,
  FileText,
  Lock,
  Stamp,
  Home,
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

/* ─── palette ─── */
const MANILA = '#e8d5a3'
const MANILA_DARK = '#d4be87'
const MANILA_LIGHT = '#f0e4c4'
const RED_STAMP = '#dc2626'
const DARK_BROWN = '#3d2b1f'
const BLACK = '#1a1a1a'
const REDACT_BLACK = '#111111'

/* ─── document metadata ─── */
const DOC_ID = 'HERD-NRL-2026-0451'
const CLEARANCE = 'TOP SECRET // NOFORN // ORCON'
const DATE_ISSUED = '05 FEB 2026'
const CLASSIFICATION_GUIDE = 'CG-HERD-07 REV.3'

/* ─── icon map ─── */
const featureIcons: Record<string, React.ReactNode> = {
  brain: <Brain className="w-5 h-5" />,
  shield: <Shield className="w-5 h-5" />,
  activity: <Activity className="w-5 h-5" />,
  clipboard: <ClipboardCheck className="w-5 h-5" />,
}

/* ─── redaction bar component ─── */
function RedactionBar({
  children,
  className,
  delay = 0,
}: {
  children: React.ReactNode
  className?: string
  delay?: number
}) {
  const ref = useRef<HTMLSpanElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-50px' })

  return (
    <span ref={ref} className={cn('relative inline', className)}>
      <motion.span
        className="absolute inset-0 z-10"
        style={{ backgroundColor: REDACT_BLACK }}
        initial={{ scaleX: 1 }}
        animate={isInView ? { scaleX: 0 } : { scaleX: 1 }}
        transition={{ duration: 0.8, delay: delay, ease: [0.22, 1, 0.36, 1] }}
        // Wipe from right to left
      />
      <motion.span
        initial={{ opacity: 0 }}
        animate={isInView ? { opacity: 1 } : { opacity: 0 }}
        transition={{ duration: 0.3, delay: delay + 0.5 }}
      >
        {children}
      </motion.span>
    </span>
  )
}

/* ─── block-level redaction (for paragraphs, etc.) ─── */
function RedactedBlock({
  children,
  className,
  delay = 0,
}: {
  children: React.ReactNode
  className?: string
  delay?: number
}) {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-60px' })

  return (
    <div ref={ref} className={cn('relative', className)}>
      <motion.div
        className="absolute inset-0 z-10 pointer-events-none"
        style={{ backgroundColor: REDACT_BLACK }}
        initial={{ clipPath: 'inset(0 0 0 0)' }}
        animate={
          isInView
            ? { clipPath: 'inset(0 100% 0 0)' }
            : { clipPath: 'inset(0 0 0 0)' }
        }
        transition={{ duration: 1.0, delay, ease: [0.22, 1, 0.36, 1] }}
      />
      <motion.div
        initial={{ opacity: 0 }}
        animate={isInView ? { opacity: 1 } : { opacity: 0 }}
        transition={{ duration: 0.4, delay: delay + 0.6 }}
      >
        {children}
      </motion.div>
    </div>
  )
}

/* ─── classified stamp ─── */
function ClassifiedStamp({
  text,
  rotation = -12,
  className,
  delay = 0,
}: {
  text: string
  rotation?: number
  className?: string
  delay?: number
}) {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-30px' })

  return (
    <motion.div
      ref={ref}
      className={cn('absolute pointer-events-none select-none z-20', className)}
      style={{ rotate: `${rotation}deg` }}
      initial={{ opacity: 0, scale: 1.8 }}
      animate={isInView ? { opacity: 0.7, scale: 1 } : { opacity: 0, scale: 1.8 }}
      transition={{
        duration: 0.15,
        delay,
        ease: 'easeOut',
      }}
    >
      <div
        className="px-4 py-1.5 border-[3px] font-bold tracking-[0.2em] text-sm uppercase"
        style={{
          borderColor: RED_STAMP,
          color: RED_STAMP,
          fontFamily: '"IBM Plex Mono", monospace',
          // Rough stamp edges simulated with shadow
          filter: 'url(#stamp-roughen)',
        }}
      >
        {text}
      </div>
    </motion.div>
  )
}

/* ─── section wrapper with document styling ─── */
function DocumentSection({
  id,
  refNum,
  title,
  classification = 'SECRET',
  children,
  className,
}: {
  id: string
  refNum: string
  title: string
  classification?: string
  children: React.ReactNode
  className?: string
}) {
  const ref = useRef<HTMLElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <motion.section
      ref={ref}
      id={id}
      className={cn('relative py-12 md:py-16', className)}
      initial={{ opacity: 0 }}
      animate={isInView ? { opacity: 1 } : { opacity: 0 }}
      transition={{ duration: 0.6 }}
    >
      {/* Section header line */}
      <div className="mb-8">
        <div
          className="text-[10px] tracking-[0.3em] uppercase mb-1 opacity-50"
          style={{
            fontFamily: '"IBM Plex Mono", monospace',
            color: DARK_BROWN,
          }}
        >
          [{classification}] REF: {refNum}
        </div>
        <div className="flex items-center gap-4">
          <h2
            className="text-2xl md:text-3xl font-bold uppercase tracking-wide"
            style={{
              fontFamily: '"Libre Baskerville", serif',
              color: DARK_BROWN,
            }}
          >
            {title}
          </h2>
          <div className="flex-1 border-b border-dashed" style={{ borderColor: `${DARK_BROWN}40` }} />
        </div>
      </div>
      {children}
    </motion.section>
  )
}

/* ─── coffee stain decoration ─── */
function CoffeeStain({ className, size = 120 }: { className?: string; size?: number }) {
  return (
    <div
      className={cn('absolute pointer-events-none opacity-[0.06] rounded-full', className)}
      style={{
        width: size,
        height: size,
        background: `radial-gradient(ellipse at 40% 40%, #8B6914 0%, transparent 50%),
                      radial-gradient(ellipse at 60% 55%, #7a5c12 0%, transparent 45%),
                      radial-gradient(circle at 50% 50%, transparent 35%, #6b4c10 38%, transparent 42%)`,
      }}
    />
  )
}

/* ─── main component ─── */
export default function Design15() {
  const [cursorPos, setCursorPos] = useState({ x: 0, y: 0 })
  const containerRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll()
  const headerOpacity = useTransform(scrollYProgress, [0, 0.05], [0, 1])

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setCursorPos({ x: e.clientX, y: e.clientY })
    }
    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [])

  return (
    <div
      ref={containerRef}
      className="design-page relative min-h-screen overflow-x-hidden"
      style={{
        backgroundColor: MANILA,
        color: DARK_BROWN,
        fontFamily: '"IBM Plex Mono", monospace',
      }}
    >
      {/* SVG Filter for stamp roughness */}
      <svg className="absolute w-0 h-0">
        <defs>
          <filter id="stamp-roughen">
            <feTurbulence type="turbulence" baseFrequency="0.04" numOctaves="4" result="noise" />
            <feDisplacementMap in="SourceGraphic" in2="noise" scale="2" />
          </filter>
        </defs>
      </svg>

      {/* Paper texture overlay */}
      <div
        className="fixed inset-0 pointer-events-none z-[1] opacity-[0.03]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
          backgroundSize: '200px 200px',
        }}
      />

      {/* Subtle flashlight / magnifying glass effect following cursor */}
      <div
        className="fixed pointer-events-none z-[2] opacity-[0.04]"
        style={{
          left: cursorPos.x - 150,
          top: cursorPos.y - 150,
          width: 300,
          height: 300,
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(255,255,255,0.8) 0%, transparent 70%)',
        }}
      />

      {/* ─── Floating Navigation Bar ─── */}
      <motion.nav
        className="fixed top-0 left-0 right-0 z-50"
        style={{ opacity: headerOpacity }}
      >
        <div
          className="mx-4 mt-3 px-4 py-2 rounded flex items-center justify-between border"
          style={{
            backgroundColor: `${MANILA}f0`,
            borderColor: `${DARK_BROWN}30`,
            backdropFilter: 'blur(8px)',
          }}
        >
          <Link
            to="/14"
            className="flex items-center gap-1 text-xs uppercase tracking-wider hover:opacity-70 transition-opacity"
            style={{ color: DARK_BROWN, fontFamily: '"IBM Plex Mono", monospace' }}
          >
            <ChevronLeft className="w-3.5 h-3.5" />
            Prev
          </Link>
          <div
            className="text-[10px] uppercase tracking-[0.3em] font-semibold"
            style={{ color: DARK_BROWN }}
          >
            Document #15 — Redacted
          </div>
          <Link
            to="/"
            className="flex items-center gap-1 text-xs uppercase tracking-wider hover:opacity-70 transition-opacity"
            style={{ color: DARK_BROWN, fontFamily: '"IBM Plex Mono", monospace' }}
          >
            <Home className="w-3.5 h-3.5" />
            Gallery
          </Link>
        </div>
      </motion.nav>

      {/* ─── Always-visible top navigation ─── */}
      <div className="relative z-30 pt-4 px-4 md:px-8">
        <div className="max-w-4xl mx-auto flex items-center justify-between">
          <Link
            to="/14"
            className="flex items-center gap-1.5 text-xs uppercase tracking-wider hover:opacity-60 transition-opacity"
            style={{ color: DARK_BROWN }}
          >
            <ChevronLeft className="w-4 h-4" />
            Previous File
          </Link>
          <Link
            to="/"
            className="flex items-center gap-1.5 text-xs uppercase tracking-wider hover:opacity-60 transition-opacity"
            style={{ color: DARK_BROWN }}
          >
            Return to Archive
            <ChevronRight className="w-4 h-4" />
          </Link>
        </div>
      </div>

      {/* ─── Document Container ─── */}
      <div className="relative z-10 max-w-4xl mx-auto px-6 md:px-12 pb-20">
        {/* Coffee stains scattered around */}
        <CoffeeStain className="top-[200px] -right-16" size={160} />
        <CoffeeStain className="top-[900px] -left-8" size={100} />
        <CoffeeStain className="top-[2200px] right-4" size={130} />
        <CoffeeStain className="top-[3600px] -left-12" size={90} />

        {/* ═══════════════════════════════════════════════
            DOCUMENT HEADER / HERO
        ═══════════════════════════════════════════════ */}
        <header className="relative pt-12 pb-16 border-b-2 border-dashed" style={{ borderColor: `${DARK_BROWN}30` }}>
          {/* Classification headers */}
          <motion.div
            className="text-center mb-2"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <div
              className="inline-block px-6 py-1.5 border-2 text-xs tracking-[0.4em] font-bold"
              style={{
                borderColor: RED_STAMP,
                color: RED_STAMP,
                fontFamily: '"IBM Plex Mono", monospace',
              }}
            >
              {CLEARANCE}
            </div>
          </motion.div>

          {/* Document ID block */}
          <motion.div
            className="text-center mt-6 mb-8"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <div className="text-[10px] tracking-[0.3em] uppercase opacity-50 mb-1">
              Document Identification Number
            </div>
            <div className="text-sm tracking-[0.2em] font-semibold">{DOC_ID}</div>
            <div className="text-[10px] tracking-[0.2em] uppercase opacity-40 mt-1">
              Date Issued: {DATE_ISSUED} &nbsp;|&nbsp; Classification Guide: {CLASSIFICATION_GUIDE}
            </div>
          </motion.div>

          {/* Subject line — the brand */}
          <motion.div
            className="text-center mb-8"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
          >
            <div className="text-[10px] tracking-[0.3em] uppercase opacity-50 mb-3">
              Subject
            </div>
            <h1
              className="text-5xl md:text-7xl font-bold tracking-tight uppercase"
              style={{
                fontFamily: '"Libre Baskerville", serif',
                color: DARK_BROWN,
              }}
            >
              {brandName}
            </h1>
            <div
              className="mt-3 text-xs tracking-[0.2em] uppercase opacity-60"
              style={{ fontFamily: '"IBM Plex Mono", monospace' }}
            >
              {tagline}
            </div>
          </motion.div>

          {/* Hero headline — redacted reveal */}
          <motion.div
            className="relative max-w-2xl mx-auto text-center mt-10"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.9 }}
          >
            <div className="text-[10px] tracking-[0.3em] uppercase opacity-50 mb-4">
              Executive Summary
            </div>
            <RedactedBlock delay={1.2}>
              <h2
                className="text-2xl md:text-3xl font-bold leading-snug"
                style={{
                  fontFamily: '"Libre Baskerville", serif',
                  color: DARK_BROWN,
                }}
              >
                {heroHeadline}
              </h2>
            </RedactedBlock>
            <RedactedBlock delay={1.6} className="mt-6">
              <p
                className="text-sm leading-relaxed opacity-70 max-w-xl mx-auto"
                style={{ fontFamily: '"IBM Plex Mono", monospace' }}
              >
                {heroSubheadline}
              </p>
            </RedactedBlock>
          </motion.div>

          {/* CTA buttons styled as document actions */}
          <motion.div
            className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-10"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 2.0 }}
          >
            <button
              className="px-8 py-3 text-xs uppercase tracking-[0.25em] font-bold border-2 transition-all duration-200 hover:scale-[1.02]"
              style={{
                backgroundColor: DARK_BROWN,
                borderColor: DARK_BROWN,
                color: MANILA,
                fontFamily: '"IBM Plex Mono", monospace',
              }}
            >
              <Lock className="w-3.5 h-3.5 inline mr-2 -mt-0.5" />
              {ctaPrimary}
            </button>
            <button
              className="px-8 py-3 text-xs uppercase tracking-[0.25em] font-bold border-2 transition-all duration-200 hover:scale-[1.02]"
              style={{
                backgroundColor: 'transparent',
                borderColor: DARK_BROWN,
                color: DARK_BROWN,
                fontFamily: '"IBM Plex Mono", monospace',
              }}
            >
              <Eye className="w-3.5 h-3.5 inline mr-2 -mt-0.5" />
              {ctaSecondary}
            </button>
          </motion.div>

          {/* CLASSIFIED stamp overlaid */}
          <ClassifiedStamp
            text="CLASSIFIED"
            rotation={-15}
            className="top-16 right-0 md:right-8"
            delay={2.5}
          />
          <ClassifiedStamp
            text="APPROVED"
            rotation={8}
            className="bottom-12 left-2 md:left-4"
            delay={2.8}
          />
        </header>

        {/* ═══════════════════════════════════════════════
            SECTION 1: INTELLIGENCE SUMMARY (STATS)
        ═══════════════════════════════════════════════ */}
        <DocumentSection
          id="stats"
          refNum="HERD-0451-A"
          title="Intelligence Summary"
          classification="SECRET"
        >
          <ClassifiedStamp
            text="VERIFIED"
            rotation={-6}
            className="-top-2 right-0 md:right-12"
            delay={0.3}
          />

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {stats.map((stat, i) => (
              <RedactedBlock key={stat.label} delay={0.15 * i}>
                <div
                  className="p-5 border relative"
                  style={{
                    borderColor: `${DARK_BROWN}25`,
                    backgroundColor: `${MANILA_LIGHT}80`,
                  }}
                >
                  <div className="text-[9px] tracking-[0.3em] uppercase opacity-40 mb-1">
                    DATA ENTRY {String(i + 1).padStart(3, '0')}
                  </div>
                  <div
                    className="text-3xl font-bold"
                    style={{
                      fontFamily: '"Libre Baskerville", serif',
                      color: DARK_BROWN,
                    }}
                  >
                    {stat.value}
                  </div>
                  <div className="text-[10px] tracking-[0.15em] uppercase mt-1.5 opacity-60">
                    {stat.label}
                  </div>
                  {/* Small redaction decorative mark */}
                  <div
                    className="absolute top-3 right-3 w-12 h-1.5"
                    style={{ backgroundColor: `${REDACT_BLACK}15` }}
                  />
                </div>
              </RedactedBlock>
            ))}
          </div>

          {/* Paragraph with redaction marks */}
          <div className="mt-8 text-xs leading-loose opacity-60 pl-6 border-l-2" style={{ borderColor: `${DARK_BROWN}20` }}>
            <RedactedBlock delay={0.6}>
              <p>
                The above figures represent verified intelligence gathered from operational assets
                within the HERD network as of {DATE_ISSUED}. All data points have been cross-referenced
                with{' '}
                <span className="bg-black/10 px-1">&#9608;&#9608;&#9608;&#9608;&#9608;</span>{' '}
                and confirmed by authorized personnel. Distribution limited to cleared individuals only.
              </p>
            </RedactedBlock>
          </div>
        </DocumentSection>

        {/* ═══════════════════════════════════════════════
            SECTION 2: AUTHORIZED CAPABILITIES (FEATURES)
        ═══════════════════════════════════════════════ */}
        <DocumentSection
          id="features"
          refNum="HERD-0451-B"
          title="Authorized Capabilities"
          classification="TOP SECRET"
        >
          <ClassifiedStamp
            text="TOP SECRET"
            rotation={-10}
            className="-top-4 right-0 md:right-4"
            delay={0.2}
          />

          <div className="space-y-6">
            {features.map((feature, i) => (
              <RedactedBlock key={feature.title} delay={0.2 * i}>
                <div
                  className="p-6 border relative overflow-hidden"
                  style={{
                    borderColor: `${DARK_BROWN}20`,
                    backgroundColor: `${MANILA_LIGHT}50`,
                  }}
                >
                  {/* Capability number */}
                  <div
                    className="absolute top-0 right-0 px-3 py-1 text-[9px] tracking-[0.3em] uppercase font-bold"
                    style={{
                      backgroundColor: `${DARK_BROWN}10`,
                      color: `${DARK_BROWN}80`,
                    }}
                  >
                    CAP-{String(i + 1).padStart(2, '0')}
                  </div>

                  <div className="flex items-start gap-4">
                    <div
                      className="mt-1 p-2 border"
                      style={{
                        borderColor: `${DARK_BROWN}30`,
                        color: DARK_BROWN,
                      }}
                    >
                      {featureIcons[feature.icon]}
                    </div>
                    <div className="flex-1">
                      <h3
                        className="text-base font-bold uppercase tracking-wide mb-2"
                        style={{
                          fontFamily: '"Libre Baskerville", serif',
                          color: DARK_BROWN,
                        }}
                      >
                        {feature.title}
                      </h3>
                      <p className="text-xs leading-relaxed opacity-65">
                        {feature.description}
                      </p>
                    </div>
                  </div>

                  {/* Decorative classification line at bottom */}
                  <div className="mt-4 pt-3 border-t border-dashed flex items-center justify-between" style={{ borderColor: `${DARK_BROWN}15` }}>
                    <span className="text-[8px] tracking-[0.2em] uppercase opacity-30">
                      Authorization Level: SIGMA-{i + 3}
                    </span>
                    <span className="text-[8px] tracking-[0.2em] uppercase opacity-30">
                      Status: ACTIVE
                    </span>
                  </div>
                </div>
              </RedactedBlock>
            ))}
          </div>
        </DocumentSection>

        {/* ═══════════════════════════════════════════════
            SECTION 3: MISSION BRIEFINGS (STUDIES)
        ═══════════════════════════════════════════════ */}
        <DocumentSection
          id="studies"
          refNum="HERD-0451-C"
          title="Mission Briefings"
          classification="SECRET // NOFORN"
        >
          <ClassifiedStamp
            text="EYES ONLY"
            rotation={5}
            className="-top-2 left-0 md:left-8"
            delay={0.3}
          />

          <div className="space-y-5">
            {studies.map((study, i) => {
              const progress = study.target > 0
                ? Math.round((study.patients / study.target) * 100)
                : 0

              return (
                <RedactedBlock key={study.title} delay={0.15 * i}>
                  <div
                    className="p-5 border relative"
                    style={{
                      borderColor: `${DARK_BROWN}20`,
                      backgroundColor: `${MANILA_LIGHT}40`,
                    }}
                  >
                    {/* Mission number header */}
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <div className="text-[9px] tracking-[0.3em] uppercase opacity-40 mb-0.5">
                          MISSION BRIEF {String(i + 1).padStart(3, '0')} &mdash; {study.phase}
                        </div>
                        <h3
                          className="text-sm font-bold uppercase tracking-wide"
                          style={{
                            fontFamily: '"Libre Baskerville", serif',
                            color: DARK_BROWN,
                          }}
                        >
                          {study.title}
                        </h3>
                      </div>
                      <div
                        className="px-2 py-0.5 border text-[9px] tracking-[0.2em] uppercase font-bold shrink-0 ml-4"
                        style={{
                          borderColor:
                            study.status === 'Enrolling' ? `${RED_STAMP}60` : `${DARK_BROWN}30`,
                          color:
                            study.status === 'Enrolling' ? RED_STAMP : `${DARK_BROWN}80`,
                        }}
                      >
                        {study.status === 'Enrolling' ? 'ACTIVE' : 'PENDING'}
                      </div>
                    </div>

                    {/* Intel grid */}
                    <div className="grid grid-cols-3 gap-4 text-[10px] tracking-[0.15em] uppercase opacity-60 mb-3">
                      <div>
                        <span className="opacity-50">Station:</span>{' '}
                        <span className="font-semibold">{study.university}</span>
                      </div>
                      <div>
                        <span className="opacity-50">Condition:</span>{' '}
                        <span className="font-semibold">{study.condition}</span>
                      </div>
                      <div>
                        <span className="opacity-50">Assets:</span>{' '}
                        <span className="font-semibold">{study.patients}/{study.target}</span>
                      </div>
                    </div>

                    {/* Progress bar styled as declassification meter */}
                    <div className="relative">
                      <div className="text-[8px] tracking-[0.2em] uppercase opacity-30 mb-1">
                        Deployment Progress
                      </div>
                      <div
                        className="h-2 w-full relative overflow-hidden"
                        style={{ backgroundColor: `${DARK_BROWN}10` }}
                      >
                        <motion.div
                          className="absolute inset-y-0 left-0"
                          style={{ backgroundColor: `${DARK_BROWN}50` }}
                          initial={{ width: 0 }}
                          whileInView={{ width: `${progress}%` }}
                          viewport={{ once: true }}
                          transition={{ duration: 1.2, delay: 0.3 + i * 0.1, ease: 'easeOut' }}
                        />
                        {/* Hash marks */}
                        {[25, 50, 75].map((mark) => (
                          <div
                            key={mark}
                            className="absolute inset-y-0 w-px"
                            style={{ left: `${mark}%`, backgroundColor: `${MANILA}90` }}
                          />
                        ))}
                      </div>
                      <div className="text-right text-[8px] tracking-[0.2em] uppercase opacity-30 mt-0.5">
                        {progress}% complete
                      </div>
                    </div>
                  </div>
                </RedactedBlock>
              )
            })}
          </div>
        </DocumentSection>

        {/* ═══════════════════════════════════════════════
            SECTION 4: FIELD AGENT REPORTS (TESTIMONIALS)
        ═══════════════════════════════════════════════ */}
        <DocumentSection
          id="testimonials"
          refNum="HERD-0451-D"
          title="Field Agent Reports"
          classification="CONFIDENTIAL"
        >
          <ClassifiedStamp
            text="CONFIRMED"
            rotation={-8}
            className="-top-4 right-4 md:right-16"
            delay={0.2}
          />

          <div className="space-y-6">
            {testimonials.map((testimonial, i) => (
              <RedactedBlock key={testimonial.name} delay={0.2 * i}>
                <div
                  className="p-6 border relative"
                  style={{
                    borderColor: `${DARK_BROWN}20`,
                    backgroundColor: `${MANILA_LIGHT}40`,
                  }}
                >
                  {/* Report header */}
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <div
                        className="w-10 h-10 flex items-center justify-center border text-xs font-bold"
                        style={{
                          borderColor: `${DARK_BROWN}40`,
                          color: DARK_BROWN,
                          backgroundColor: `${MANILA_DARK}40`,
                        }}
                      >
                        {testimonial.avatar}
                      </div>
                      <div>
                        <div className="text-[9px] tracking-[0.3em] uppercase opacity-40">
                          Field Agent Report — FA-{String(i + 1).padStart(3, '0')}
                        </div>
                        <div
                          className="text-xs font-bold tracking-wide uppercase"
                          style={{ color: DARK_BROWN }}
                        >
                          {testimonial.name}
                        </div>
                      </div>
                    </div>
                    <Stamp
                      className="w-4 h-4 opacity-30"
                      style={{ color: RED_STAMP }}
                    />
                  </div>

                  {/* Testimony text */}
                  <div
                    className="pl-5 border-l-2 text-sm leading-relaxed italic opacity-75"
                    style={{
                      borderColor: `${DARK_BROWN}20`,
                      fontFamily: '"Libre Baskerville", serif',
                    }}
                  >
                    "{testimonial.quote}"
                  </div>

                  {/* Agent credentials */}
                  <div className="mt-3 text-[9px] tracking-[0.15em] uppercase opacity-40">
                    Credentials: {testimonial.credential}
                  </div>

                  {/* Decorative bottom */}
                  <div className="mt-3 pt-2 border-t border-dashed flex items-center gap-4" style={{ borderColor: `${DARK_BROWN}10` }}>
                    <span className="text-[8px] tracking-[0.2em] uppercase opacity-25">
                      Verified: {DATE_ISSUED}
                    </span>
                    <span className="text-[8px] tracking-[0.2em] uppercase opacity-25">
                      Reliability: A-1 (Confirmed)
                    </span>
                  </div>
                </div>
              </RedactedBlock>
            ))}
          </div>
        </DocumentSection>

        {/* ═══════════════════════════════════════════════
            SECTION 5: AUTHORIZATION REQUEST (CTA)
        ═══════════════════════════════════════════════ */}
        <DocumentSection
          id="cta"
          refNum="HERD-0451-E"
          title="Authorization Request"
          classification="TOP SECRET"
        >
          <div className="relative text-center py-8">
            <ClassifiedStamp
              text="ACTION REQUIRED"
              rotation={-4}
              className="top-0 right-0 md:right-12"
              delay={0.3}
            />

            <RedactedBlock delay={0.2}>
              <div className="max-w-lg mx-auto">
                <FileText
                  className="w-8 h-8 mx-auto mb-4 opacity-40"
                  style={{ color: DARK_BROWN }}
                />
                <div className="text-[10px] tracking-[0.3em] uppercase opacity-40 mb-4">
                  Request for Network Access Authorization
                </div>
                <h3
                  className="text-xl md:text-2xl font-bold uppercase tracking-wide mb-4"
                  style={{
                    fontFamily: '"Libre Baskerville", serif',
                    color: DARK_BROWN,
                  }}
                >
                  Your Clearance Awaits
                </h3>
                <p className="text-xs leading-relaxed opacity-60 mb-8 max-w-md mx-auto">
                  Authorized neurologists may request access to the HERD classified network. Upon
                  verification of credentials, full operational capabilities will be granted. Submit
                  your authorization request to proceed.
                </p>

                <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                  <button
                    className="px-8 py-3 text-xs uppercase tracking-[0.25em] font-bold border-2 transition-all duration-200 hover:scale-[1.02] hover:shadow-lg"
                    style={{
                      backgroundColor: RED_STAMP,
                      borderColor: RED_STAMP,
                      color: '#fff',
                      fontFamily: '"IBM Plex Mono", monospace',
                    }}
                  >
                    <Lock className="w-3.5 h-3.5 inline mr-2 -mt-0.5" />
                    Request Access
                  </button>
                  <button
                    className="px-8 py-3 text-xs uppercase tracking-[0.25em] font-bold border-2 transition-all duration-200 hover:scale-[1.02]"
                    style={{
                      backgroundColor: 'transparent',
                      borderColor: DARK_BROWN,
                      color: DARK_BROWN,
                      fontFamily: '"IBM Plex Mono", monospace',
                    }}
                  >
                    <Eye className="w-3.5 h-3.5 inline mr-2 -mt-0.5" />
                    View Dossier
                  </button>
                </div>
              </div>
            </RedactedBlock>
          </div>
        </DocumentSection>

        {/* ═══════════════════════════════════════════════
            DOCUMENT FOOTER
        ═══════════════════════════════════════════════ */}
        <footer
          className="relative pt-8 pb-6 mt-8 border-t-2 border-dashed"
          style={{ borderColor: `${DARK_BROWN}20` }}
        >
          {/* Top watermark */}
          <div className="absolute inset-x-0 top-4 flex items-center justify-center pointer-events-none">
            <div
              className="text-[100px] md:text-[140px] font-bold uppercase opacity-[0.02] leading-none tracking-[0.1em] select-none"
              style={{
                fontFamily: '"Libre Baskerville", serif',
                color: DARK_BROWN,
                transform: 'rotate(-5deg)',
              }}
            >
              CLASSIFIED
            </div>
          </div>

          <div className="relative z-10 text-center">
            <div className="text-[10px] tracking-[0.3em] uppercase opacity-30 mb-2">
              End of Document &mdash; {DOC_ID}
            </div>
            <div className="text-[9px] tracking-[0.2em] uppercase opacity-25 mb-6">
              Unauthorized disclosure subject to criminal sanctions under applicable law.
              &nbsp;|&nbsp; Destroy when no longer needed.
            </div>

            {/* Classification footer bar */}
            <div
              className="inline-block px-8 py-2 border text-[10px] tracking-[0.3em] uppercase font-bold mb-6"
              style={{
                borderColor: RED_STAMP,
                color: RED_STAMP,
                opacity: 0.5,
              }}
            >
              {CLEARANCE}
            </div>

            {/* Navigation */}
            <div className="flex items-center justify-center gap-8 mt-4">
              <Link
                to="/14"
                className="flex items-center gap-2 text-xs uppercase tracking-[0.2em] hover:opacity-60 transition-opacity"
                style={{ color: DARK_BROWN }}
              >
                <ChevronLeft className="w-4 h-4" />
                Previous File
              </Link>
              <Link
                to="/"
                className="flex items-center gap-2 text-xs uppercase tracking-[0.2em] hover:opacity-60 transition-opacity"
                style={{ color: DARK_BROWN }}
              >
                Return to Archive
                <ChevronRight className="w-4 h-4" />
              </Link>
            </div>

            <div className="text-[8px] tracking-[0.15em] uppercase opacity-20 mt-6">
              &copy; 2026 {brandName} &mdash; All rights reserved &mdash; Classification authority: OCA {CLASSIFICATION_GUIDE}
            </div>
          </div>
        </footer>
      </div>

      {/* ─── Full-page watermarks ─── */}
      <div className="fixed inset-0 pointer-events-none z-[3] overflow-hidden">
        {/* Diagonal "TOP SECRET" watermark */}
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 whitespace-nowrap"
          style={{
            transform: 'translate(-50%, -50%) rotate(-35deg)',
            fontSize: '8vw',
            fontFamily: '"IBM Plex Mono", monospace',
            fontWeight: 700,
            letterSpacing: '0.15em',
            color: RED_STAMP,
            opacity: 0.018,
            textTransform: 'uppercase',
            userSelect: 'none',
          }}
        >
          TOP SECRET &nbsp;&bull;&nbsp; TOP SECRET &nbsp;&bull;&nbsp; TOP SECRET
        </div>

        {/* Repeating horizontal classification lines */}
        {[15, 40, 65, 90].map((top) => (
          <div
            key={top}
            className="absolute left-0 right-0 text-center whitespace-nowrap overflow-hidden"
            style={{
              top: `${top}%`,
              fontSize: '9px',
              fontFamily: '"IBM Plex Mono", monospace',
              letterSpacing: '0.5em',
              color: DARK_BROWN,
              opacity: 0.02,
              textTransform: 'uppercase',
              userSelect: 'none',
              transform: `rotate(${top % 2 === 0 ? -1 : 1}deg)`,
            }}
          >
            CLASSIFIED &mdash; HERD NETWORK &mdash; CLASSIFIED &mdash; HERD NETWORK &mdash; CLASSIFIED &mdash; HERD NETWORK &mdash; CLASSIFIED
          </div>
        ))}
      </div>

      {/* ─── Edge markings (like document margin annotations) ─── */}
      <div className="fixed left-2 top-1/2 -translate-y-1/2 pointer-events-none z-[4] hidden lg:block">
        <div
          className="writing-vertical-lr text-[8px] tracking-[0.5em] uppercase opacity-[0.08] select-none"
          style={{
            fontFamily: '"IBM Plex Mono", monospace',
            color: DARK_BROWN,
            writingMode: 'vertical-lr',
            transform: 'rotate(180deg)',
          }}
        >
          {DOC_ID} &mdash; {CLEARANCE} &mdash; PAGE 01 OF 01
        </div>
      </div>
      <div className="fixed right-2 top-1/2 -translate-y-1/2 pointer-events-none z-[4] hidden lg:block">
        <div
          className="text-[8px] tracking-[0.5em] uppercase opacity-[0.08] select-none"
          style={{
            fontFamily: '"IBM Plex Mono", monospace',
            color: DARK_BROWN,
            writingMode: 'vertical-lr',
          }}
        >
          CONTROLLED DISTRIBUTION &mdash; DO NOT COPY &mdash; {DATE_ISSUED}
        </div>
      </div>
    </div>
  )
}
