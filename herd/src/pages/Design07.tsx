import { Link } from 'react-router-dom'
import { motion, useInView, useMotionValue, useTransform, animate } from 'framer-motion'
import {
  Brain,
  Shield,
  Activity,
  ClipboardList,
  ChevronLeft,
  ChevronRight,
  ArrowRight,
  Camera,
  Film,
  Users,
  FlaskConical,
  Building2,
  Heart,
} from 'lucide-react'
import { useRef, useEffect, useState } from 'react'
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
const C = {
  warmWhite: '#faf5ef',
  cream: '#f3ece0',
  amber: '#d97706',
  coral: '#e8795a',
  brown: '#6b4423',
  teal: '#3d7a7a',
  darkBrown: '#3d2410',
  lightAmber: '#fbbf24',
  softCoral: '#f5a589',
  warmGray: '#a89583',
} as const

const featureIcons: Record<string, React.ReactNode> = {
  brain: <Brain size={28} />,
  shield: <Shield size={28} />,
  activity: <Activity size={28} />,
  clipboard: <ClipboardList size={28} />,
}

/* ─── slide mount wrapper (the Kodachrome frame) ─── */
function SlideMountFrame({
  children,
  label,
  className,
  borderColor = C.brown,
}: {
  children: React.ReactNode
  label?: string
  className?: string
  borderColor?: string
}) {
  return (
    <div
      className={cn('relative rounded-2xl overflow-hidden', className)}
      style={{
        border: `6px solid ${borderColor}`,
        boxShadow: `0 8px 32px rgba(107,68,35,0.15), inset 0 1px 0 rgba(255,255,255,0.1)`,
      }}
    >
      {label && (
        <div
          className="absolute top-0 left-0 right-0 flex items-center justify-between px-4 py-1.5 text-[10px] tracking-[0.25em] uppercase"
          style={{
            background: borderColor,
            color: C.warmWhite,
            fontFamily: "'DM Sans', sans-serif",
            fontWeight: 600,
            letterSpacing: '0.2em',
          }}
        >
          <span>{label}</span>
          <Film size={12} className="opacity-60" />
        </div>
      )}
      <div className={label ? 'pt-7' : ''}>{children}</div>
    </div>
  )
}

/* ─── animated counter ─── */
function AnimatedStat({ value, label }: { value: string; label: string }) {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-50px' })
  const numericPart = value.replace(/[^0-9]/g, '')
  const prefix = value.match(/^[^0-9]*/)?.[0] || ''
  const suffix = value.match(/[^0-9]*$/)?.[0] || ''
  const motionVal = useMotionValue(0)
  const rounded = useTransform(motionVal, (v) => Math.round(v))
  const [display, setDisplay] = useState('0')

  useEffect(() => {
    if (isInView) {
      const target = parseInt(numericPart, 10)
      const controls = animate(motionVal, target, {
        duration: 1.8,
        ease: [0.22, 1, 0.36, 1],
      })
      const unsub = rounded.on('change', (v) => {
        setDisplay(v.toLocaleString())
      })
      return () => {
        controls.stop()
        unsub()
      }
    }
  }, [isInView, numericPart, motionVal, rounded])

  return (
    <div ref={ref} className="text-center">
      <div
        className="text-4xl md:text-5xl font-bold mb-2 tabular-nums"
        style={{
          fontFamily: "'Playfair Display', serif",
          color: C.brown,
        }}
      >
        {prefix}
        <span
          style={{
            background: `linear-gradient(135deg, ${C.amber}, ${C.coral})`,
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
          }}
        >
          {isInView ? display : '0'}
        </span>
        {suffix}
      </div>
      <div
        className="text-sm uppercase tracking-[0.15em]"
        style={{ color: C.warmGray, fontFamily: "'DM Sans', sans-serif", fontWeight: 500 }}
      >
        {label}
      </div>
    </div>
  )
}

/* ─── staggered section reveal ─── */
function Reveal({
  children,
  className,
  delay = 0,
}: {
  children: React.ReactNode
  className?: string
  delay?: number
}) {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-80px' })
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

/* ─── section label ─── */
function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex items-center gap-3 mb-3">
      <Camera size={14} style={{ color: C.coral }} />
      <span
        className="text-[11px] tracking-[0.3em] uppercase font-semibold"
        style={{ color: C.coral, fontFamily: "'DM Sans', sans-serif" }}
      >
        {children}
      </span>
    </div>
  )
}

/* ─── main page ─── */
export default function Design07() {
  const [hoveredStudy, setHoveredStudy] = useState<number | null>(null)

  return (
    <div
      className="design-page relative"
      style={{
        background: C.warmWhite,
        fontFamily: "'DM Sans', sans-serif",
        color: C.darkBrown,
      }}
    >
      {/* subtle film grain overlay */}
      <div
        className="fixed inset-0 pointer-events-none z-50 opacity-[0.03]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
          backgroundRepeat: 'repeat',
          backgroundSize: '128px 128px',
        }}
      />

      {/* ─── floating navigation ─── */}
      <motion.nav
        initial={{ y: -60, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
        className="fixed top-4 left-1/2 -translate-x-1/2 z-40 flex items-center gap-2 px-2 py-1.5 rounded-full"
        style={{
          background: 'rgba(250,245,239,0.85)',
          backdropFilter: 'blur(16px)',
          border: `1.5px solid rgba(107,68,35,0.15)`,
          boxShadow: '0 4px 24px rgba(107,68,35,0.1)',
        }}
      >
        <Link
          to="/6"
          className="flex items-center gap-1 px-3 py-1.5 rounded-full text-xs font-medium transition-colors duration-200 hover:bg-[rgba(107,68,35,0.08)]"
          style={{ color: C.brown }}
        >
          <ChevronLeft size={14} />
          <span>06</span>
        </Link>
        <div
          className="px-4 py-1.5 rounded-full text-xs font-bold tracking-wide"
          style={{
            background: `linear-gradient(135deg, ${C.amber}, ${C.coral})`,
            color: C.warmWhite,
          }}
        >
          07 / Kodachrome
        </div>
        <Link
          to="/8"
          className="flex items-center gap-1 px-3 py-1.5 rounded-full text-xs font-medium transition-colors duration-200 hover:bg-[rgba(107,68,35,0.08)]"
          style={{ color: C.brown }}
        >
          <span>08</span>
          <ChevronRight size={14} />
        </Link>
      </motion.nav>

      {/* ─── hero ─── */}
      <section className="relative min-h-screen flex items-center overflow-hidden">
        {/* warm gradient bg */}
        <div
          className="absolute inset-0"
          style={{
            background: `
              radial-gradient(ellipse 80% 60% at 30% 20%, rgba(217,119,6,0.08), transparent),
              radial-gradient(ellipse 60% 50% at 70% 70%, rgba(232,121,90,0.06), transparent),
              radial-gradient(ellipse 70% 50% at 50% 50%, rgba(61,122,122,0.04), transparent),
              ${C.warmWhite}
            `,
          }}
        />

        {/* decorative film sprocket holes (left) */}
        <div className="absolute left-4 top-0 bottom-0 flex flex-col items-center justify-center gap-8 opacity-[0.07]">
          {Array.from({ length: 14 }).map((_, i) => (
            <div
              key={i}
              className="w-3 h-5 rounded-sm"
              style={{ background: C.brown }}
            />
          ))}
        </div>

        {/* decorative film sprocket holes (right) */}
        <div className="absolute right-4 top-0 bottom-0 flex flex-col items-center justify-center gap-8 opacity-[0.07]">
          {Array.from({ length: 14 }).map((_, i) => (
            <div
              key={i}
              className="w-3 h-5 rounded-sm"
              style={{ background: C.brown }}
            />
          ))}
        </div>

        <div className="relative z-10 max-w-6xl mx-auto px-6 py-32 md:py-40 w-full">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            {/* left: text */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
            >
              <div className="flex items-center gap-3 mb-8">
                <div
                  className="w-10 h-10 rounded-xl flex items-center justify-center"
                  style={{
                    background: `linear-gradient(135deg, ${C.amber}, ${C.coral})`,
                  }}
                >
                  <Heart size={20} color={C.warmWhite} strokeWidth={2.5} />
                </div>
                <span
                  className="text-2xl font-bold tracking-tight"
                  style={{
                    fontFamily: "'Playfair Display', serif",
                    color: C.brown,
                  }}
                >
                  {brandName}
                </span>
              </div>

              <p
                className="text-sm uppercase tracking-[0.2em] mb-4 font-medium"
                style={{ color: C.coral }}
              >
                {tagline}
              </p>

              <h1
                className="text-4xl md:text-5xl lg:text-6xl font-bold leading-[1.1] mb-6"
                style={{
                  fontFamily: "'Playfair Display', serif",
                  color: C.darkBrown,
                }}
              >
                {heroHeadline.split(' ').map((word, i) =>
                  word.toLowerCase() === 'studies' || word.toLowerCase() === 'matter' ? (
                    <span
                      key={i}
                      style={{
                        background: `linear-gradient(135deg, ${C.amber}, ${C.coral})`,
                        WebkitBackgroundClip: 'text',
                        WebkitTextFillColor: 'transparent',
                      }}
                    >
                      {word}{' '}
                    </span>
                  ) : (
                    <span key={i}>{word} </span>
                  )
                )}
              </h1>

              <p
                className="text-base md:text-lg leading-relaxed mb-10 max-w-lg"
                style={{ color: C.warmGray, lineHeight: 1.75 }}
              >
                {heroSubheadline}
              </p>

              <div className="flex flex-wrap gap-4">
                <motion.button
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  className="px-7 py-3.5 rounded-xl text-sm font-semibold flex items-center gap-2 transition-shadow duration-300"
                  style={{
                    background: `linear-gradient(135deg, ${C.amber}, ${C.coral})`,
                    color: C.warmWhite,
                    boxShadow: `0 4px 20px rgba(217,119,6,0.3)`,
                  }}
                >
                  {ctaPrimary}
                  <ArrowRight size={16} />
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  className="px-7 py-3.5 rounded-xl text-sm font-semibold transition-colors duration-200"
                  style={{
                    border: `2px solid ${C.brown}`,
                    color: C.brown,
                    background: 'transparent',
                  }}
                >
                  {ctaSecondary}
                </motion.button>
              </div>
            </motion.div>

            {/* right: stacked photo frame composition */}
            <motion.div
              initial={{ opacity: 0, x: 50, rotate: 2 }}
              animate={{ opacity: 1, x: 0, rotate: 0 }}
              transition={{ duration: 1, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
              className="relative hidden md:block"
            >
              {/* Background decorative frame */}
              <motion.div
                animate={{ rotate: [4, 3, 4] }}
                transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
                className="absolute -top-4 -right-4 w-72 h-56 rounded-2xl"
                style={{
                  border: `6px solid ${C.softCoral}`,
                  background: `linear-gradient(135deg, rgba(232,121,90,0.1), rgba(217,119,6,0.05))`,
                }}
              />

              {/* Main testimonial frame */}
              <SlideMountFrame label="Kodachrome 64" borderColor={C.brown}>
                <div className="p-8" style={{ background: C.cream }}>
                  <div className="flex items-start gap-4 mb-5">
                    <div
                      className="w-14 h-14 rounded-xl flex items-center justify-center text-lg font-bold flex-shrink-0"
                      style={{
                        background: `linear-gradient(135deg, ${C.amber}, ${C.coral})`,
                        color: C.warmWhite,
                        fontFamily: "'Playfair Display', serif",
                      }}
                    >
                      {testimonials[0].avatar}
                    </div>
                    <div>
                      <p
                        className="font-bold text-sm"
                        style={{ color: C.darkBrown, fontFamily: "'Playfair Display', serif" }}
                      >
                        {testimonials[0].name}
                      </p>
                      <p className="text-xs mt-0.5" style={{ color: C.warmGray }}>
                        {testimonials[0].credential}
                      </p>
                    </div>
                  </div>
                  <p
                    className="text-base leading-relaxed italic"
                    style={{
                      color: C.brown,
                      fontFamily: "'Playfair Display', serif",
                    }}
                  >
                    &ldquo;{testimonials[0].quote}&rdquo;
                  </p>
                </div>
              </SlideMountFrame>

              {/* Smaller decorative frame */}
              <motion.div
                animate={{ rotate: [-3, -2, -3] }}
                transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
                className="absolute -bottom-6 -left-6 w-48 h-32 rounded-xl"
                style={{
                  border: `5px solid ${C.teal}`,
                  background: `linear-gradient(135deg, rgba(61,122,122,0.1), rgba(61,122,122,0.03))`,
                }}
              >
                <div className="flex items-center justify-center h-full">
                  <Users size={32} style={{ color: C.teal, opacity: 0.5 }} />
                </div>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ─── stats ─── */}
      <section className="relative py-20">
        <div
          className="absolute inset-0"
          style={{
            background: `linear-gradient(180deg, ${C.warmWhite}, ${C.cream}, ${C.warmWhite})`,
          }}
        />
        <div className="relative z-10 max-w-5xl mx-auto px-6">
          <Reveal>
            <SlideMountFrame label="Exposure Data" borderColor={C.amber}>
              <div
                className="grid grid-cols-2 md:grid-cols-4 gap-8 p-8 md:p-12"
                style={{ background: C.warmWhite }}
              >
                {stats.map((stat, i) => (
                  <Reveal key={stat.label} delay={i * 0.1}>
                    <AnimatedStat value={stat.value} label={stat.label} />
                  </Reveal>
                ))}
              </div>
            </SlideMountFrame>
          </Reveal>
        </div>
      </section>

      {/* ─── testimonials (the hero showcase) ─── */}
      <section className="py-24 relative overflow-hidden">
        <div
          className="absolute inset-0 opacity-30"
          style={{
            background: `
              radial-gradient(ellipse 60% 40% at 20% 60%, rgba(217,119,6,0.1), transparent),
              radial-gradient(ellipse 50% 40% at 80% 30%, rgba(232,121,90,0.08), transparent)
            `,
          }}
        />
        <div className="relative z-10 max-w-6xl mx-auto px-6">
          <Reveal>
            <SectionLabel>Real Stories</SectionLabel>
            <h2
              className="text-3xl md:text-4xl font-bold mb-4"
              style={{ fontFamily: "'Playfair Display', serif", color: C.darkBrown }}
            >
              Voices from the network
            </h2>
            <p className="text-base mb-14 max-w-xl" style={{ color: C.warmGray }}>
              Neurologists and researchers share their experience connecting patients
              to the studies that move science forward.
            </p>
          </Reveal>

          <div className="grid md:grid-cols-2 gap-8">
            {testimonials.map((t, i) => {
              const frameColors = [C.brown, C.coral, C.teal, C.amber]
              const frameColor = frameColors[i % frameColors.length]
              return (
                <Reveal key={t.name} delay={i * 0.12}>
                  <motion.div
                    whileHover={{ y: -4, scale: 1.01 }}
                    transition={{ duration: 0.3 }}
                  >
                    <SlideMountFrame
                      label={`Frame ${String(i + 1).padStart(2, '0')} / ${new Date().getFullYear()}`}
                      borderColor={frameColor}
                    >
                      <div className="p-7 md:p-8" style={{ background: C.warmWhite }}>
                        <div className="flex items-start gap-4 mb-5">
                          <div
                            className="w-14 h-14 rounded-xl flex items-center justify-center text-base font-bold flex-shrink-0"
                            style={{
                              background: `linear-gradient(135deg, ${frameColor}cc, ${frameColor})`,
                              color: C.warmWhite,
                              fontFamily: "'Playfair Display', serif",
                              boxShadow: `0 4px 12px ${frameColor}33`,
                            }}
                          >
                            {t.avatar}
                          </div>
                          <div>
                            <p
                              className="font-bold text-sm"
                              style={{ fontFamily: "'Playfair Display', serif", color: C.darkBrown }}
                            >
                              {t.name}
                            </p>
                            <p className="text-xs mt-1" style={{ color: C.warmGray }}>
                              {t.credential}
                            </p>
                          </div>
                        </div>
                        <p
                          className="text-[15px] leading-[1.8] italic"
                          style={{
                            fontFamily: "'Playfair Display', serif",
                            color: C.brown,
                          }}
                        >
                          &ldquo;{t.quote}&rdquo;
                        </p>
                      </div>
                    </SlideMountFrame>
                  </motion.div>
                </Reveal>
              )
            })}
          </div>
        </div>
      </section>

      {/* ─── features ─── */}
      <section className="py-24 relative">
        <div
          className="absolute inset-0"
          style={{ background: C.cream }}
        />
        <div className="relative z-10 max-w-6xl mx-auto px-6">
          <Reveal>
            <SectionLabel>Platform Features</SectionLabel>
            <h2
              className="text-3xl md:text-4xl font-bold mb-4"
              style={{ fontFamily: "'Playfair Display', serif", color: C.darkBrown }}
            >
              Built for the way you work
            </h2>
            <p className="text-base mb-14 max-w-xl" style={{ color: C.warmGray }}>
              Every feature designed with practicing neurologists in mind --
              from first referral to final enrollment.
            </p>
          </Reveal>

          <div className="grid md:grid-cols-2 gap-8">
            {features.map((f, i) => {
              const accents = [C.amber, C.coral, C.teal, C.brown]
              const accent = accents[i % accents.length]
              return (
                <Reveal key={f.title} delay={i * 0.1}>
                  <motion.div
                    whileHover={{ y: -3 }}
                    transition={{ duration: 0.25 }}
                    className="rounded-2xl p-7 md:p-8 relative overflow-hidden"
                    style={{
                      background: C.warmWhite,
                      border: `2px solid ${accent}20`,
                      boxShadow: `0 2px 16px rgba(107,68,35,0.06)`,
                    }}
                  >
                    {/* corner accent */}
                    <div
                      className="absolute top-0 right-0 w-20 h-20 opacity-[0.06]"
                      style={{
                        background: `radial-gradient(circle at top right, ${accent}, transparent)`,
                      }}
                    />
                    <div
                      className="w-12 h-12 rounded-xl flex items-center justify-center mb-5"
                      style={{
                        background: `${accent}15`,
                        color: accent,
                      }}
                    >
                      {featureIcons[f.icon]}
                    </div>
                    <h3
                      className="text-lg font-bold mb-3"
                      style={{
                        fontFamily: "'Playfair Display', serif",
                        color: C.darkBrown,
                      }}
                    >
                      {f.title}
                    </h3>
                    <p
                      className="text-sm leading-relaxed"
                      style={{ color: C.warmGray, lineHeight: 1.7 }}
                    >
                      {f.description}
                    </p>
                  </motion.div>
                </Reveal>
              )
            })}
          </div>
        </div>
      </section>

      {/* ─── studies (vintage catalog cards) ─── */}
      <section className="py-24 relative overflow-hidden">
        <div
          className="absolute inset-0"
          style={{
            background: `
              radial-gradient(ellipse 50% 50% at 80% 80%, rgba(61,122,122,0.05), transparent),
              ${C.warmWhite}
            `,
          }}
        />
        <div className="relative z-10 max-w-6xl mx-auto px-6">
          <Reveal>
            <SectionLabel>Active Studies</SectionLabel>
            <h2
              className="text-3xl md:text-4xl font-bold mb-4"
              style={{ fontFamily: "'Playfair Display', serif", color: C.darkBrown }}
            >
              Browse the catalog
            </h2>
            <p className="text-base mb-14 max-w-xl" style={{ color: C.warmGray }}>
              Currently enrolling studies from leading university clinics.
              Each one a chance to change a patient's life.
            </p>
          </Reveal>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {studies.map((s, i) => {
              const progress = s.target > 0 ? (s.patients / s.target) * 100 : 0
              const isHovered = hoveredStudy === i
              const cardColors = [C.brown, C.amber, C.coral, C.teal, C.brown]
              const cardColor = cardColors[i % cardColors.length]

              return (
                <Reveal key={s.title} delay={i * 0.08}>
                  <motion.div
                    onMouseEnter={() => setHoveredStudy(i)}
                    onMouseLeave={() => setHoveredStudy(null)}
                    whileHover={{ y: -4 }}
                    transition={{ duration: 0.25 }}
                    className="rounded-2xl overflow-hidden"
                    style={{
                      border: `3px solid ${isHovered ? cardColor : `${cardColor}30`}`,
                      background: C.warmWhite,
                      boxShadow: isHovered
                        ? `0 8px 32px ${cardColor}20`
                        : '0 2px 12px rgba(107,68,35,0.06)',
                      transition: 'border-color 0.3s, box-shadow 0.3s',
                    }}
                  >
                    {/* catalog header strip */}
                    <div
                      className="px-5 py-2.5 flex items-center justify-between"
                      style={{
                        background: `${cardColor}10`,
                        borderBottom: `1px solid ${cardColor}15`,
                      }}
                    >
                      <span
                        className="text-[10px] tracking-[0.2em] uppercase font-bold"
                        style={{ color: cardColor }}
                      >
                        {s.phase}
                      </span>
                      <span
                        className="text-[10px] px-2.5 py-0.5 rounded-full font-semibold"
                        style={{
                          background:
                            s.status === 'Enrolling'
                              ? `${C.teal}15`
                              : `${C.amber}15`,
                          color: s.status === 'Enrolling' ? C.teal : C.amber,
                        }}
                      >
                        {s.status}
                      </span>
                    </div>

                    <div className="p-5">
                      {/* condition tag */}
                      <div
                        className="inline-block text-[10px] tracking-[0.15em] uppercase font-semibold px-2.5 py-1 rounded-md mb-3"
                        style={{
                          background: `${cardColor}08`,
                          color: cardColor,
                          border: `1px solid ${cardColor}15`,
                        }}
                      >
                        {s.condition}
                      </div>

                      <h3
                        className="text-[15px] font-bold mb-2 leading-snug"
                        style={{
                          fontFamily: "'Playfair Display', serif",
                          color: C.darkBrown,
                        }}
                      >
                        {s.title}
                      </h3>

                      <div className="flex items-center gap-1.5 mb-5">
                        <Building2 size={12} style={{ color: C.warmGray }} />
                        <span className="text-xs" style={{ color: C.warmGray }}>
                          {s.university}
                        </span>
                      </div>

                      {/* progress bar */}
                      <div className="mb-2">
                        <div className="flex justify-between text-[11px] mb-1.5">
                          <span style={{ color: C.warmGray }}>Enrollment</span>
                          <span style={{ color: C.brown, fontWeight: 600 }}>
                            {s.patients} / {s.target}
                          </span>
                        </div>
                        <div
                          className="h-2 rounded-full overflow-hidden"
                          style={{ background: `${cardColor}12` }}
                        >
                          <motion.div
                            className="h-full rounded-full"
                            initial={{ width: 0 }}
                            whileInView={{ width: `${progress}%` }}
                            viewport={{ once: true }}
                            transition={{ duration: 1.2, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
                            style={{
                              background: `linear-gradient(90deg, ${cardColor}, ${cardColor}cc)`,
                            }}
                          />
                        </div>
                      </div>
                    </div>
                  </motion.div>
                </Reveal>
              )
            })}
          </div>
        </div>
      </section>

      {/* ─── CTA section ─── */}
      <section className="py-24 relative">
        <div
          className="absolute inset-0"
          style={{
            background: `linear-gradient(135deg, ${C.darkBrown}, ${C.brown})`,
          }}
        />
        {/* warm decorative glow */}
        <div
          className="absolute inset-0 opacity-20"
          style={{
            background: `
              radial-gradient(ellipse 40% 50% at 20% 50%, ${C.coral}, transparent),
              radial-gradient(ellipse 40% 50% at 80% 50%, ${C.amber}, transparent)
            `,
          }}
        />

        <div className="relative z-10 max-w-4xl mx-auto px-6 text-center">
          <Reveal>
            <SlideMountFrame label="An Invitation" borderColor={`${C.amber}88`}>
              <div className="px-8 py-14 md:py-20 md:px-16" style={{ background: C.darkBrown }}>
                <div className="flex justify-center mb-6">
                  <div
                    className="w-14 h-14 rounded-2xl flex items-center justify-center"
                    style={{
                      background: `linear-gradient(135deg, ${C.amber}, ${C.coral})`,
                    }}
                  >
                    <FlaskConical size={26} color={C.warmWhite} />
                  </div>
                </div>
                <h2
                  className="text-3xl md:text-4xl font-bold mb-5"
                  style={{
                    fontFamily: "'Playfair Display', serif",
                    color: C.warmWhite,
                  }}
                >
                  Every patient deserves access to
                  <br />
                  <span
                    style={{
                      background: `linear-gradient(135deg, ${C.lightAmber}, ${C.coral})`,
                      WebkitBackgroundClip: 'text',
                      WebkitTextFillColor: 'transparent',
                    }}
                  >
                    tomorrow's breakthroughs
                  </span>
                </h2>
                <p
                  className="text-base md:text-lg mb-10 max-w-lg mx-auto leading-relaxed"
                  style={{ color: `${C.warmGray}` }}
                >
                  Join a growing network of neurologists and university clinics
                  working together to advance neuroscience research.
                </p>
                <div className="flex flex-wrap justify-center gap-4">
                  <motion.button
                    whileHover={{ scale: 1.04 }}
                    whileTap={{ scale: 0.96 }}
                    className="px-8 py-4 rounded-xl text-sm font-bold flex items-center gap-2"
                    style={{
                      background: `linear-gradient(135deg, ${C.amber}, ${C.coral})`,
                      color: C.warmWhite,
                      boxShadow: `0 4px 24px rgba(217,119,6,0.35)`,
                    }}
                  >
                    {ctaPrimary}
                    <ArrowRight size={16} />
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.04 }}
                    whileTap={{ scale: 0.96 }}
                    className="px-8 py-4 rounded-xl text-sm font-bold"
                    style={{
                      border: `2px solid ${C.amber}66`,
                      color: C.lightAmber,
                      background: 'transparent',
                    }}
                  >
                    {ctaSecondary}
                  </motion.button>
                </div>
              </div>
            </SlideMountFrame>
          </Reveal>
        </div>
      </section>

      {/* ─── footer ─── */}
      <footer className="py-16 relative" style={{ background: C.darkBrown }}>
        <div className="max-w-6xl mx-auto px-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-3">
              <div
                className="w-8 h-8 rounded-lg flex items-center justify-center"
                style={{
                  background: `linear-gradient(135deg, ${C.amber}, ${C.coral})`,
                }}
              >
                <Heart size={16} color={C.warmWhite} strokeWidth={2.5} />
              </div>
              <span
                className="text-lg font-bold"
                style={{
                  fontFamily: "'Playfair Display', serif",
                  color: C.warmWhite,
                }}
              >
                {brandName}
              </span>
            </div>

            <p
              className="text-xs tracking-wide"
              style={{ color: `${C.warmGray}99` }}
            >
              {tagline}
            </p>

            <div className="flex items-center gap-4 text-xs" style={{ color: `${C.warmGray}88` }}>
              <span>Privacy</span>
              <span style={{ opacity: 0.3 }}>|</span>
              <span>Terms</span>
              <span style={{ opacity: 0.3 }}>|</span>
              <span>Contact</span>
            </div>
          </div>

          {/* bottom film strip */}
          <div
            className="mt-10 pt-6 flex items-center justify-center gap-3 opacity-[0.15]"
            style={{ borderTop: `1px solid ${C.warmGray}33` }}
          >
            {Array.from({ length: 8 }).map((_, i) => (
              <div
                key={i}
                className="w-8 h-6 rounded-sm"
                style={{ background: C.warmGray }}
              />
            ))}
          </div>
        </div>
      </footer>
    </div>
  )
}
