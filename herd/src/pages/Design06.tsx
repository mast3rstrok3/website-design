import { Link } from 'react-router-dom'
import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import {
  Brain,
  Shield,
  Activity,
  ClipboardList,
  ChevronLeft,
  ChevronRight,
  Circle,
  ArrowUpRight,
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

// --- Blueprint palette ---
const BP = {
  bg: '#1a3a5c',
  bgDark: '#132d4a',
  bgDeep: '#0e2238',
  line: '#c8ddf0',
  lineDim: 'rgba(200,221,240,0.12)',
  lineSubtle: 'rgba(200,221,240,0.25)',
  lineMed: 'rgba(200,221,240,0.45)',
  text: '#c8ddf0',
  textDim: 'rgba(200,221,240,0.55)',
  accent: '#67b8d6',
  accentBright: '#8ed4ec',
  white: '#e8f0f8',
} as const

const font = "'IBM Plex Mono', monospace"

// --- Icon map ---
const iconMap: Record<string, React.ElementType> = {
  brain: Brain,
  shield: Shield,
  activity: Activity,
  clipboard: ClipboardList,
}

// --- Reusable animated section wrapper ---
function BlueprintSection({
  children,
  className,
  id,
}: {
  children: React.ReactNode
  className?: string
  id?: string
}) {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <motion.section
      ref={ref}
      id={id}
      initial={{ opacity: 0, y: 30 }}
      animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      className={cn('relative', className)}
    >
      {children}
    </motion.section>
  )
}

// --- Dimension line component (horizontal) ---
function DimensionLine({
  label,
  className,
}: {
  label: string
  className?: string
}) {
  return (
    <div className={cn('flex items-center gap-0 select-none', className)}>
      {/* left tick */}
      <div
        className="w-px h-3 flex-shrink-0"
        style={{ backgroundColor: BP.lineMed }}
      />
      {/* line */}
      <div
        className="flex-1 h-px relative"
        style={{ backgroundColor: BP.lineMed }}
      >
        <span
          className="absolute left-1/2 -translate-x-1/2 -top-5 text-[10px] tracking-widest uppercase whitespace-nowrap px-2"
          style={{
            color: BP.textDim,
            fontFamily: font,
            backgroundColor: BP.bg,
          }}
        >
          {label}
        </span>
      </div>
      {/* right tick */}
      <div
        className="w-px h-3 flex-shrink-0"
        style={{ backgroundColor: BP.lineMed }}
      />
    </div>
  )
}

// --- Annotation marker ---
function Annotation({
  text,
  className,
  align = 'left',
}: {
  text: string
  className?: string
  align?: 'left' | 'right'
}) {
  return (
    <div
      className={cn(
        'flex items-center gap-2 select-none',
        align === 'right' && 'flex-row-reverse',
        className
      )}
    >
      <Circle
        size={6}
        fill={BP.accent}
        color={BP.accent}
        className="flex-shrink-0"
      />
      <div
        className="h-px w-8 flex-shrink-0"
        style={{ backgroundColor: BP.accent }}
      />
      <span
        className="text-[10px] tracking-wider uppercase whitespace-nowrap"
        style={{ color: BP.accent, fontFamily: font }}
      >
        {text}
      </span>
    </div>
  )
}

// --- Section label with cross-hair ---
function SectionLabel({ label, number }: { label: string; number: string }) {
  return (
    <div className="flex items-center gap-3 mb-8">
      <div
        className="w-8 h-8 border flex items-center justify-center text-xs flex-shrink-0"
        style={{
          borderColor: BP.lineSubtle,
          color: BP.accent,
          fontFamily: font,
        }}
      >
        {number}
      </div>
      <div className="h-px flex-1" style={{ backgroundColor: BP.lineSubtle }} />
      <span
        className="text-xs tracking-[0.3em] uppercase"
        style={{ color: BP.textDim, fontFamily: font }}
      >
        {label}
      </span>
      <div className="h-px flex-1" style={{ backgroundColor: BP.lineSubtle }} />
    </div>
  )
}

// ============================================================
// MAIN COMPONENT
// ============================================================
export default function Design06() {
  return (
    <div
      className="design-page relative overflow-hidden"
      style={{
        backgroundColor: BP.bg,
        color: BP.text,
        fontFamily: font,
      }}
    >
      {/* ==================== GRID BACKGROUND ==================== */}
      <div
        className="fixed inset-0 pointer-events-none"
        style={{
          backgroundImage: `
            linear-gradient(${BP.lineDim} 1px, transparent 1px),
            linear-gradient(90deg, ${BP.lineDim} 1px, transparent 1px),
            linear-gradient(${BP.lineDim.replace('0.12', '0.05')} 1px, transparent 1px),
            linear-gradient(90deg, ${BP.lineDim.replace('0.12', '0.05')} 1px, transparent 1px)
          `,
          backgroundSize: '100px 100px, 100px 100px, 20px 20px, 20px 20px',
        }}
      />

      {/* ==================== FLOATING NAV ==================== */}
      <motion.nav
        initial={{ y: -60, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="fixed top-0 left-0 right-0 z-50"
      >
        <div
          className="mx-auto mt-4 max-w-md flex items-center justify-between px-5 py-2.5 border"
          style={{
            backgroundColor: `${BP.bgDeep}ee`,
            borderColor: BP.lineSubtle,
            backdropFilter: 'blur(12px)',
          }}
        >
          <Link
            to="/5"
            className="flex items-center gap-1 text-xs tracking-wider uppercase transition-colors hover:opacity-80"
            style={{ color: BP.accent }}
          >
            <ChevronLeft size={14} />
            <span>05</span>
          </Link>
          <div className="flex items-center gap-2">
            <div
              className="w-2 h-2 rotate-45"
              style={{ backgroundColor: BP.accent }}
            />
            <span
              className="text-xs tracking-[0.25em] uppercase"
              style={{ color: BP.white }}
            >
              Design 06
            </span>
            <div
              className="w-2 h-2 rotate-45"
              style={{ backgroundColor: BP.accent }}
            />
          </div>
          <Link
            to="/7"
            className="flex items-center gap-1 text-xs tracking-wider uppercase transition-colors hover:opacity-80"
            style={{ color: BP.accent }}
          >
            <span>07</span>
            <ChevronRight size={14} />
          </Link>
        </div>
      </motion.nav>

      {/* ==================== TITLE BLOCK (corner) ==================== */}
      <motion.div
        initial={{ opacity: 0, x: 40 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8, delay: 0.6 }}
        className="fixed bottom-6 right-6 z-40 hidden lg:block"
      >
        <div
          className="border p-4 text-right"
          style={{
            borderColor: BP.lineSubtle,
            backgroundColor: `${BP.bgDeep}dd`,
            backdropFilter: 'blur(8px)',
            minWidth: '220px',
          }}
        >
          <div className="border-b pb-2 mb-2" style={{ borderColor: BP.lineDim }}>
            <div
              className="text-[10px] tracking-[0.3em] uppercase mb-1"
              style={{ color: BP.textDim }}
            >
              Project
            </div>
            <div
              className="text-sm tracking-wider uppercase font-semibold"
              style={{ color: BP.white }}
            >
              {brandName}
            </div>
          </div>
          <div className="border-b pb-2 mb-2" style={{ borderColor: BP.lineDim }}>
            <div
              className="text-[10px] tracking-[0.3em] uppercase mb-1"
              style={{ color: BP.textDim }}
            >
              Drawing
            </div>
            <div className="text-xs" style={{ color: BP.text }}>
              Marketing Homepage
            </div>
          </div>
          <div className="flex justify-between text-[10px]" style={{ color: BP.textDim }}>
            <span>DWG No. 06</span>
            <span>Rev. A</span>
          </div>
          <div
            className="flex justify-between text-[10px] mt-1"
            style={{ color: BP.textDim }}
          >
            <span>Scale 1:1</span>
            <span>Sheet 1 of 1</span>
          </div>
        </div>
      </motion.div>

      {/* ==================== MAIN CONTENT ==================== */}
      <div className="relative z-10 max-w-6xl mx-auto px-6 sm:px-10 pt-24 pb-32">
        {/* ---- HERO ---- */}
        <BlueprintSection className="pt-16 pb-20">
          <Annotation text="Entry point" className="mb-6" />

          {/* Brand */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.4 }}
            className="mb-2"
          >
            <span
              className="text-[10px] tracking-[0.5em] uppercase"
              style={{ color: BP.textDim }}
            >
              {tagline}
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="text-3xl sm:text-5xl lg:text-6xl font-semibold leading-[1.1] tracking-tight mb-8 max-w-4xl"
            style={{ color: BP.white }}
          >
            {heroHeadline}
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.7 }}
            className="text-sm sm:text-base leading-relaxed max-w-2xl mb-12"
            style={{ color: BP.text, opacity: 0.7 }}
          >
            {heroSubheadline}
          </motion.p>

          {/* CTA buttons */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.9 }}
            className="flex flex-wrap gap-4"
          >
            <button
              className="group px-6 py-3 text-xs tracking-[0.2em] uppercase border transition-all duration-300 cursor-pointer flex items-center gap-2"
              style={{
                borderColor: BP.accent,
                color: BP.bgDeep,
                backgroundColor: BP.accent,
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = BP.accentBright
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = BP.accent
              }}
            >
              {ctaPrimary}
              <ArrowUpRight size={14} className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </button>
            <button
              className="px-6 py-3 text-xs tracking-[0.2em] uppercase border transition-all duration-300 cursor-pointer"
              style={{
                borderColor: BP.lineSubtle,
                color: BP.text,
                backgroundColor: 'transparent',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = BP.accent
                e.currentTarget.style.color = BP.accent
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = BP.lineSubtle
                e.currentTarget.style.color = BP.text
              }}
            >
              {ctaSecondary}
            </button>
          </motion.div>

          {/* Decorative dimension line below hero */}
          <div className="mt-16">
            <DimensionLine label="System Specifications" />
          </div>
        </BlueprintSection>

        {/* ---- STATS / SPECIFICATIONS ---- */}
        <BlueprintSection className="py-16">
          <SectionLabel label="Specifications" number="01" />

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-px" style={{ backgroundColor: BP.lineDim }}>
            {stats.map((stat, i) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="p-6 sm:p-8 relative"
                style={{ backgroundColor: BP.bg }}
              >
                {/* Corner marks */}
                <div className="absolute top-2 left-2 w-3 h-3 border-t border-l" style={{ borderColor: BP.lineMed }} />
                <div className="absolute top-2 right-2 w-3 h-3 border-t border-r" style={{ borderColor: BP.lineMed }} />
                <div className="absolute bottom-2 left-2 w-3 h-3 border-b border-l" style={{ borderColor: BP.lineMed }} />
                <div className="absolute bottom-2 right-2 w-3 h-3 border-b border-r" style={{ borderColor: BP.lineMed }} />

                <div
                  className="text-[10px] tracking-[0.3em] uppercase mb-3"
                  style={{ color: BP.textDim }}
                >
                  {stat.label}
                </div>
                <div
                  className="text-2xl sm:text-3xl font-semibold tracking-tight"
                  style={{ color: BP.accent }}
                >
                  {stat.value}
                </div>
                <div
                  className="mt-2 text-[10px] tracking-wider"
                  style={{ color: BP.textDim }}
                >
                  DIM-{String(i + 1).padStart(2, '0')}
                </div>
              </motion.div>
            ))}
          </div>

          <div className="mt-12">
            <DimensionLine label="Component Diagrams" />
          </div>
        </BlueprintSection>

        {/* ---- FEATURES / COMPONENT DIAGRAMS ---- */}
        <BlueprintSection className="py-16">
          <SectionLabel label="Component Diagrams" number="02" />

          <div className="grid md:grid-cols-2 gap-6">
            {features.map((feature, i) => {
              const Icon = iconMap[feature.icon] || Brain
              return (
                <motion.div
                  key={feature.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.12 }}
                  className="border p-6 relative group"
                  style={{ borderColor: BP.lineSubtle }}
                >
                  {/* Technical ref number */}
                  <div
                    className="absolute -top-3 left-4 px-2 text-[10px] tracking-[0.3em] uppercase"
                    style={{
                      color: BP.textDim,
                      backgroundColor: BP.bg,
                    }}
                  >
                    CMP-{String(i + 1).padStart(2, '0')}
                  </div>

                  <div className="flex items-start gap-4">
                    {/* Icon schematic box */}
                    <div
                      className="w-12 h-12 border flex items-center justify-center flex-shrink-0 transition-colors duration-300"
                      style={{
                        borderColor: BP.lineMed,
                      }}
                    >
                      <Icon
                        size={20}
                        style={{ color: BP.accent }}
                        strokeWidth={1.5}
                      />
                    </div>

                    <div className="flex-1 min-w-0">
                      <h3
                        className="text-sm font-medium tracking-wide mb-2"
                        style={{ color: BP.white }}
                      >
                        {feature.title}
                      </h3>
                      <p
                        className="text-xs leading-relaxed"
                        style={{ color: BP.textDim }}
                      >
                        {feature.description}
                      </p>
                    </div>
                  </div>

                  {/* Bottom connector line */}
                  <div
                    className="absolute -bottom-3 left-1/2 w-px h-3"
                    style={{ backgroundColor: BP.lineSubtle }}
                  />
                  <div
                    className="absolute -bottom-3 left-1/2 -translate-x-1/2"
                  >
                    <div
                      className="w-1.5 h-1.5 rotate-45"
                      style={{ backgroundColor: BP.lineSubtle }}
                    />
                  </div>
                </motion.div>
              )
            })}
          </div>

          {/* Connection diagram between features */}
          <div className="hidden md:flex justify-center my-6">
            <svg
              width="400"
              height="40"
              viewBox="0 0 400 40"
              fill="none"
              className="overflow-visible"
            >
              <line
                x1="0"
                y1="20"
                x2="400"
                y2="20"
                stroke={BP.lineSubtle}
                strokeWidth="1"
                strokeDasharray="4 4"
              />
              <circle cx="100" cy="20" r="3" fill={BP.accent} />
              <circle cx="200" cy="20" r="3" fill={BP.accent} />
              <circle cx="300" cy="20" r="3" fill={BP.accent} />
              <text
                x="200"
                y="12"
                textAnchor="middle"
                fill={BP.textDim}
                fontSize="9"
                fontFamily={font}
                letterSpacing="0.15em"
              >
                INTEGRATED SYSTEM
              </text>
            </svg>
          </div>

          <div className="mt-12">
            <DimensionLine label="Project Specifications" />
          </div>
        </BlueprintSection>

        {/* ---- STUDIES / PROJECT SPECIFICATIONS ---- */}
        <BlueprintSection className="py-16">
          <SectionLabel label="Project Specifications" number="03" />

          <div className="space-y-4">
            {studies.map((study, i) => {
              const progress = study.target > 0
                ? Math.round((study.patients / study.target) * 100)
                : 0

              return (
                <motion.div
                  key={study.title}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.08 }}
                  className="border p-5 relative"
                  style={{ borderColor: BP.lineDim }}
                >
                  {/* Reference tag */}
                  <div
                    className="absolute -top-2.5 right-4 px-2 text-[9px] tracking-[0.3em] uppercase"
                    style={{ color: BP.accent, backgroundColor: BP.bg }}
                  >
                    PRJ-{String(i + 1).padStart(3, '0')}
                  </div>

                  <div className="flex flex-col sm:flex-row sm:items-center gap-4">
                    {/* Left: Title and meta */}
                    <div className="flex-1 min-w-0">
                      <h4
                        className="text-sm font-medium tracking-wide mb-1.5"
                        style={{ color: BP.white }}
                      >
                        {study.title}
                      </h4>
                      <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-[10px] tracking-wider">
                        <span style={{ color: BP.textDim }}>
                          {study.university}
                        </span>
                        <span style={{ color: BP.lineMed }}>|</span>
                        <span style={{ color: BP.textDim }}>
                          {study.phase}
                        </span>
                        <span style={{ color: BP.lineMed }}>|</span>
                        <span style={{ color: BP.textDim }}>
                          {study.condition}
                        </span>
                      </div>
                    </div>

                    {/* Right: Status + Progress */}
                    <div className="flex items-center gap-6 flex-shrink-0">
                      <div
                        className="text-[10px] tracking-[0.2em] uppercase px-2 py-1 border"
                        style={{
                          borderColor:
                            study.status === 'Enrolling'
                              ? BP.accent
                              : BP.lineMed,
                          color:
                            study.status === 'Enrolling'
                              ? BP.accent
                              : BP.textDim,
                        }}
                      >
                        {study.status}
                      </div>

                      <div className="w-32 sm:w-40">
                        <div className="flex justify-between text-[10px] mb-1.5">
                          <span style={{ color: BP.textDim }}>
                            {study.patients}/{study.target}
                          </span>
                          <span style={{ color: BP.accent }}>{progress}%</span>
                        </div>
                        <div
                          className="h-1 w-full relative"
                          style={{ backgroundColor: BP.lineDim }}
                        >
                          <motion.div
                            className="absolute inset-y-0 left-0"
                            style={{ backgroundColor: BP.accent }}
                            initial={{ width: 0 }}
                            whileInView={{ width: `${progress}%` }}
                            viewport={{ once: true }}
                            transition={{
                              duration: 1,
                              delay: 0.3 + i * 0.1,
                              ease: 'easeOut',
                            }}
                          />
                          {/* Tick marks */}
                          {[25, 50, 75].map((tick) => (
                            <div
                              key={tick}
                              className="absolute top-full w-px h-1"
                              style={{
                                left: `${tick}%`,
                                backgroundColor: BP.lineDim,
                              }}
                            />
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )
            })}
          </div>

          <div className="mt-12">
            <DimensionLine label="Field Reports" />
          </div>
        </BlueprintSection>

        {/* ---- TESTIMONIALS / FIELD NOTES ---- */}
        <BlueprintSection className="py-16">
          <SectionLabel label="Field Reports" number="04" />

          <div className="grid md:grid-cols-2 gap-6">
            {testimonials.map((t, i) => (
              <motion.div
                key={t.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="border p-6 relative"
                style={{ borderColor: BP.lineDim }}
              >
                {/* Note reference */}
                <div
                  className="absolute -top-2.5 left-4 px-2 text-[9px] tracking-[0.3em] uppercase"
                  style={{ color: BP.textDim, backgroundColor: BP.bg }}
                >
                  NOTE-{String(i + 1).padStart(2, '0')}
                </div>

                {/* Quote */}
                <p
                  className="text-xs leading-[1.8] mb-5 italic"
                  style={{ color: BP.text, opacity: 0.8 }}
                >
                  "{t.quote}"
                </p>

                {/* Separator */}
                <div
                  className="h-px mb-4"
                  style={{ backgroundColor: BP.lineDim }}
                />

                {/* Author */}
                <div className="flex items-center gap-3">
                  <div
                    className="w-9 h-9 border flex items-center justify-center text-[10px] font-semibold flex-shrink-0"
                    style={{
                      borderColor: BP.lineMed,
                      color: BP.accent,
                    }}
                  >
                    {t.avatar}
                  </div>
                  <div>
                    <div
                      className="text-xs font-medium tracking-wide"
                      style={{ color: BP.white }}
                    >
                      {t.name}
                    </div>
                    <div
                      className="text-[10px] tracking-wide mt-0.5"
                      style={{ color: BP.textDim }}
                    >
                      {t.credential}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          <div className="mt-12">
            <DimensionLine label="Assembly Instructions" />
          </div>
        </BlueprintSection>

        {/* ---- CTA / ASSEMBLY ---- */}
        <BlueprintSection className="py-16">
          <SectionLabel label="Assembly Instructions" number="05" />

          <div
            className="border p-8 sm:p-12 text-center relative"
            style={{ borderColor: BP.lineSubtle }}
          >
            {/* Corner registration marks */}
            {['top-3 left-3', 'top-3 right-3', 'bottom-3 left-3', 'bottom-3 right-3'].map(
              (pos, i) => (
                <div key={i} className={`absolute ${pos}`}>
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 16 16"
                    fill="none"
                  >
                    <line
                      x1="8"
                      y1="0"
                      x2="8"
                      y2="16"
                      stroke={BP.lineMed}
                      strokeWidth="0.5"
                    />
                    <line
                      x1="0"
                      y1="8"
                      x2="16"
                      y2="8"
                      stroke={BP.lineMed}
                      strokeWidth="0.5"
                    />
                    <circle
                      cx="8"
                      cy="8"
                      r="4"
                      stroke={BP.lineMed}
                      strokeWidth="0.5"
                    />
                  </svg>
                </div>
              )
            )}

            <Annotation
              text="Action required"
              className="justify-center mb-6"
            />

            <h2
              className="text-xl sm:text-2xl font-semibold tracking-wide mb-4"
              style={{ color: BP.white }}
            >
              Begin Integration Sequence
            </h2>
            <p
              className="text-xs sm:text-sm leading-relaxed max-w-lg mx-auto mb-8"
              style={{ color: BP.textDim }}
            >
              Join 2,400+ neurologists already connected to the clinical research
              network. Estimated setup time: under 5 minutes.
            </p>

            <div className="flex flex-wrap justify-center gap-4">
              <button
                className="group px-8 py-3 text-xs tracking-[0.2em] uppercase border transition-all duration-300 cursor-pointer flex items-center gap-2"
                style={{
                  borderColor: BP.accent,
                  color: BP.bgDeep,
                  backgroundColor: BP.accent,
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = BP.accentBright
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = BP.accent
                }}
              >
                {ctaPrimary}
                <ArrowUpRight size={14} className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </button>
              <button
                className="px-8 py-3 text-xs tracking-[0.2em] uppercase border transition-all duration-300 cursor-pointer"
                style={{
                  borderColor: BP.lineSubtle,
                  color: BP.text,
                  backgroundColor: 'transparent',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = BP.accent
                  e.currentTarget.style.color = BP.accent
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = BP.lineSubtle
                  e.currentTarget.style.color = BP.text
                }}
              >
                {ctaSecondary}
              </button>
            </div>
          </div>
        </BlueprintSection>

        {/* ---- FOOTER ---- */}
        <footer className="mt-20 pt-8 border-t" style={{ borderColor: BP.lineDim }}>
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div
                className="w-6 h-6 border flex items-center justify-center"
                style={{ borderColor: BP.lineMed }}
              >
                <div
                  className="w-2 h-2 rotate-45"
                  style={{ backgroundColor: BP.accent }}
                />
              </div>
              <span
                className="text-xs tracking-[0.2em] uppercase font-medium"
                style={{ color: BP.white }}
              >
                {brandName}
              </span>
            </div>

            <div
              className="text-[10px] tracking-wider"
              style={{ color: BP.textDim }}
            >
              {tagline}
            </div>

            <div className="flex items-center gap-4">
              <Link
                to="/5"
                className="text-[10px] tracking-[0.2em] uppercase transition-colors hover:opacity-80"
                style={{ color: BP.accent }}
              >
                Prev
              </Link>
              <span style={{ color: BP.lineDim }}>|</span>
              <Link
                to="/7"
                className="text-[10px] tracking-[0.2em] uppercase transition-colors hover:opacity-80"
                style={{ color: BP.accent }}
              >
                Next
              </Link>
            </div>
          </div>

          {/* Drawing border bottom */}
          <div className="mt-8 flex items-center gap-4">
            <div className="h-px flex-1" style={{ backgroundColor: BP.lineDim }} />
            <span
              className="text-[9px] tracking-[0.4em] uppercase"
              style={{ color: BP.textDim }}
            >
              End of Drawing
            </span>
            <div className="h-px flex-1" style={{ backgroundColor: BP.lineDim }} />
          </div>
        </footer>
      </div>

      {/* ==================== DECORATIVE BORDER FRAME ==================== */}
      <div className="fixed inset-0 pointer-events-none z-30">
        {/* Top */}
        <div
          className="absolute top-0 left-0 right-0 h-px"
          style={{ backgroundColor: BP.lineSubtle }}
        />
        {/* Bottom */}
        <div
          className="absolute bottom-0 left-0 right-0 h-px"
          style={{ backgroundColor: BP.lineSubtle }}
        />
        {/* Left */}
        <div
          className="absolute top-0 bottom-0 left-0 w-px"
          style={{ backgroundColor: BP.lineSubtle }}
        />
        {/* Right */}
        <div
          className="absolute top-0 bottom-0 right-0 w-px"
          style={{ backgroundColor: BP.lineSubtle }}
        />

        {/* Inner border offset */}
        <div
          className="absolute top-3 left-3 right-3 bottom-3 border"
          style={{ borderColor: BP.lineDim }}
        />
      </div>
    </div>
  )
}
