import { Link } from 'react-router-dom'
import { motion, useScroll, useTransform } from 'framer-motion'
import {
  Brain,
  Shield,
  Activity,
  ClipboardCheck,
  ChevronLeft,
  ChevronRight,
  ArrowDown,
  Users,
  FlaskConical,
  Building2,
  HeartPulse,
  Quote,
  Sparkles,
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
import { useRef } from 'react'

// ─── Icon mapping ───────────────────────────────────────────────────────────
const iconMap: Record<string, React.ReactNode> = {
  brain: <Brain className="w-7 h-7" />,
  shield: <Shield className="w-7 h-7" />,
  activity: <Activity className="w-7 h-7" />,
  clipboard: <ClipboardCheck className="w-7 h-7" />,
}

const statIcons = [
  <Users className="w-6 h-6" key="u" />,
  <FlaskConical className="w-6 h-6" key="f" />,
  <Building2 className="w-6 h-6" key="b" />,
  <HeartPulse className="w-6 h-6" key="h" />,
]

// ─── Stained glass panel configuration ──────────────────────────────────────
const panels = {
  hero: {
    bg: '#065f46',
    gradient: 'radial-gradient(ellipse at 50% 40%, rgba(16,185,129,0.18) 0%, transparent 65%)',
    name: 'Emerald',
  },
  stats: {
    bg: '#1e3a5f',
    gradient: 'radial-gradient(ellipse at 50% 50%, rgba(59,130,246,0.15) 0%, transparent 65%)',
    name: 'Sapphire',
  },
  features: {
    bg: '#4c1d95',
    gradient: 'radial-gradient(ellipse at 50% 45%, rgba(167,139,250,0.14) 0%, transparent 65%)',
    name: 'Amethyst',
  },
  studies: {
    bg: '#7f1d1d',
    gradient: 'radial-gradient(ellipse at 50% 50%, rgba(248,113,113,0.14) 0%, transparent 65%)',
    name: 'Ruby',
  },
  testimonials: {
    bg: '#78350f',
    gradient: 'radial-gradient(ellipse at 50% 45%, rgba(251,191,36,0.14) 0%, transparent 65%)',
    name: 'Amber',
  },
} as const

const LEADING_COLOR = '#1a1a1a'
const LEADING_WIDTH = 10

// ─── Reusable panel wrapper with stained-glass effect ───────────────────────
function GlassPanel({
  panel,
  children,
  className,
  id,
}: {
  panel: (typeof panels)[keyof typeof panels]
  children: React.ReactNode
  className?: string
  id?: string
}) {
  return (
    <section
      id={id}
      className={cn('relative min-h-screen flex items-center justify-center overflow-hidden', className)}
      style={{
        backgroundColor: panel.bg,
        borderTop: `${LEADING_WIDTH}px solid ${LEADING_COLOR}`,
        borderBottom: `${LEADING_WIDTH}px solid ${LEADING_COLOR}`,
      }}
    >
      {/* Inner glow / glass gradient */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ background: panel.gradient }}
      />
      {/* Vignette edges to simulate glass depth */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          boxShadow: `inset 0 0 120px 60px ${panel.bg}`,
        }}
      />
      {/* Subtle texture overlay */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.03]"
        style={{
          backgroundImage:
            'url("data:image/svg+xml,%3Csvg width=\'60\' height=\'60\' viewBox=\'0 0 60 60\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cg fill=\'none\' fill-rule=\'evenodd\'%3E%3Cg fill=\'%23ffffff\' fill-opacity=\'1\'%3E%3Cpath d=\'M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z\'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")',
        }}
      />
      <div className="relative z-10 w-full">{children}</div>
    </section>
  )
}

// ─── Stagger animation variants ─────────────────────────────────────────────
const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.15,
    },
  },
}

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] },
  },
}

const scaleIn = {
  hidden: { opacity: 0, scale: 0.85 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
  },
}

// ─── Main component ─────────────────────────────────────────────────────────
export default function Design09() {
  const containerRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({ target: containerRef })

  // Progress bar at the very top
  const progressWidth = useTransform(scrollYProgress, [0, 1], ['0%', '100%'])

  return (
    <div
      ref={containerRef}
      className="design-page"
      style={{
        fontFamily: "'Inter', system-ui, sans-serif",
        backgroundColor: LEADING_COLOR,
      }}
    >
      {/* Floating nav bar */}
      <motion.nav
        initial={{ y: -80 }}
        animate={{ y: 0 }}
        transition={{ delay: 0.5, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 py-3"
        style={{ backgroundColor: 'rgba(26, 26, 26, 0.92)', backdropFilter: 'blur(12px)' }}
      >
        <Link
          to="/8"
          className="flex items-center gap-1 text-white/60 hover:text-white transition-colors text-sm"
        >
          <ChevronLeft className="w-4 h-4" />
          <span className="hidden sm:inline">Prev</span>
        </Link>
        <div className="flex items-center gap-3">
          <span
            className="text-white/90 font-semibold tracking-wide text-sm"
            style={{ fontFamily: "'Playfair Display', serif" }}
          >
            {brandName}
          </span>
          <span className="text-white/30 text-xs font-mono">#09</span>
          <span className="text-white/40 text-xs hidden sm:inline">Stained Glass</span>
        </div>
        <Link
          to="/10"
          className="flex items-center gap-1 text-white/60 hover:text-white transition-colors text-sm"
        >
          <span className="hidden sm:inline">Next</span>
          <ChevronRight className="w-4 h-4" />
        </Link>
      </motion.nav>

      {/* Scroll progress bar */}
      <motion.div
        className="fixed top-[52px] left-0 h-[2px] z-50"
        style={{
          width: progressWidth,
          background: 'linear-gradient(90deg, #10b981, #3b82f6, #a78bfa, #f87171, #fbbf24)',
        }}
      />

      {/* ═══════════════════ HERO — EMERALD ═══════════════════ */}
      <GlassPanel panel={panels.hero} id="hero">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="max-w-5xl mx-auto px-6 py-24 text-center"
        >
          {/* Decorative cross-shaped leading */}
          <motion.div variants={itemVariants} className="flex justify-center mb-8">
            <div className="relative">
              <div
                className="w-[2px] h-16 mx-auto"
                style={{ backgroundColor: 'rgba(255,255,255,0.15)' }}
              />
              <div
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-16 h-[2px]"
                style={{ backgroundColor: 'rgba(255,255,255,0.15)' }}
              />
            </div>
          </motion.div>

          <motion.p
            variants={itemVariants}
            className="text-emerald-200/70 tracking-[0.3em] uppercase text-xs mb-6"
          >
            {tagline}
          </motion.p>

          <motion.h1
            variants={itemVariants}
            className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold text-white leading-[1.05] mb-8 tracking-tight"
            style={{ fontFamily: "'Playfair Display', serif" }}
          >
            {heroHeadline}
          </motion.h1>

          <motion.p
            variants={itemVariants}
            className="text-lg sm:text-xl text-emerald-100/70 max-w-2xl mx-auto leading-relaxed mb-12"
          >
            {heroSubheadline}
          </motion.p>

          <motion.div variants={itemVariants} className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="px-8 py-4 bg-white text-emerald-900 font-semibold rounded-sm hover:bg-emerald-50 transition-colors text-lg tracking-wide">
              {ctaPrimary}
            </button>
            <button className="px-8 py-4 border-2 border-white/30 text-white font-medium rounded-sm hover:bg-white/10 hover:border-white/50 transition-all text-lg tracking-wide">
              {ctaSecondary}
            </button>
          </motion.div>

          <motion.div
            variants={itemVariants}
            className="mt-20"
          >
            <motion.div
              animate={{ y: [0, 8, 0] }}
              transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
              className="inline-flex flex-col items-center gap-2 text-emerald-200/40 cursor-pointer"
              onClick={() => document.getElementById('stats')?.scrollIntoView({ behavior: 'smooth' })}
            >
              <span className="text-xs tracking-[0.2em] uppercase">Scroll</span>
              <ArrowDown className="w-4 h-4" />
            </motion.div>
          </motion.div>
        </motion.div>

        {/* Decorative corner leading marks */}
        <div className="absolute top-6 left-6 w-12 h-12 border-t-2 border-l-2 border-white/10" />
        <div className="absolute top-6 right-6 w-12 h-12 border-t-2 border-r-2 border-white/10" />
        <div className="absolute bottom-6 left-6 w-12 h-12 border-b-2 border-l-2 border-white/10" />
        <div className="absolute bottom-6 right-6 w-12 h-12 border-b-2 border-r-2 border-white/10" />
      </GlassPanel>

      {/* ═══════════════════ STATS — SAPPHIRE ═══════════════════ */}
      <GlassPanel panel={panels.stats} id="stats">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          className="max-w-6xl mx-auto px-6 py-24"
        >
          <motion.div variants={itemVariants} className="text-center mb-16">
            <p className="text-blue-200/50 tracking-[0.3em] uppercase text-xs mb-4">
              The Network
            </p>
            <h2
              className="text-4xl sm:text-5xl md:text-6xl font-bold text-white tracking-tight"
              style={{ fontFamily: "'Playfair Display', serif" }}
            >
              Growing Every Day
            </h2>
          </motion.div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-0">
            {stats.map((stat, i) => (
              <motion.div
                key={stat.label}
                variants={scaleIn}
                className="relative flex flex-col items-center justify-center py-12 px-4"
                style={{
                  borderRight: i < stats.length - 1 ? `2px solid rgba(255,255,255,0.08)` : 'none',
                  borderBottom: i < 2 ? `2px solid rgba(255,255,255,0.08)` : 'none',
                }}
              >
                <div className="text-blue-300/50 mb-4">{statIcons[i]}</div>
                <span
                  className="text-4xl sm:text-5xl md:text-6xl font-bold text-white mb-2"
                  style={{ fontFamily: "'Playfair Display', serif" }}
                >
                  {stat.value}
                </span>
                <span className="text-blue-200/60 text-sm tracking-wider uppercase">
                  {stat.label}
                </span>
                {/* Glass highlight dot */}
                <div className="absolute top-4 right-4 w-2 h-2 rounded-full bg-blue-300/20" />
              </motion.div>
            ))}
          </div>

          {/* Decorative leading pattern */}
          <motion.div variants={itemVariants} className="flex justify-center mt-16">
            <div className="flex items-center gap-4">
              <div className="w-24 h-[2px] bg-white/10" />
              <Sparkles className="w-4 h-4 text-blue-300/30" />
              <div className="w-24 h-[2px] bg-white/10" />
            </div>
          </motion.div>
        </motion.div>

        {/* Decorative vertical leading bars on sides */}
        <div className="absolute top-0 left-16 w-[2px] h-full bg-white/[0.04]" />
        <div className="absolute top-0 right-16 w-[2px] h-full bg-white/[0.04]" />
      </GlassPanel>

      {/* ═══════════════════ FEATURES — AMETHYST ═══════════════════ */}
      <GlassPanel panel={panels.features} id="features">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          className="max-w-6xl mx-auto px-6 py-24"
        >
          <motion.div variants={itemVariants} className="text-center mb-16">
            <p className="text-violet-200/50 tracking-[0.3em] uppercase text-xs mb-4">
              Platform Capabilities
            </p>
            <h2
              className="text-4xl sm:text-5xl md:text-6xl font-bold text-white tracking-tight"
              style={{ fontFamily: "'Playfair Display', serif" }}
            >
              Built for Precision
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-0">
            {features.map((feature, i) => (
              <motion.div
                key={feature.title}
                variants={itemVariants}
                className="group relative p-8 sm:p-10"
                style={{
                  borderRight: i % 2 === 0 ? `2px solid rgba(255,255,255,0.08)` : 'none',
                  borderBottom: i < 2 ? `2px solid rgba(255,255,255,0.08)` : 'none',
                }}
              >
                {/* Glass pane interior glow on hover */}
                <div className="absolute inset-0 bg-white/0 group-hover:bg-white/[0.03] transition-colors duration-500" />
                <div className="relative z-10">
                  <div className="flex items-start gap-5">
                    <div className="shrink-0 w-14 h-14 rounded-sm flex items-center justify-center bg-white/[0.08] text-violet-200 border border-white/[0.06]">
                      {iconMap[feature.icon]}
                    </div>
                    <div>
                      <h3
                        className="text-xl sm:text-2xl font-semibold text-white mb-3"
                        style={{ fontFamily: "'Playfair Display', serif" }}
                      >
                        {feature.title}
                      </h3>
                      <p className="text-violet-100/60 leading-relaxed text-sm sm:text-base">
                        {feature.description}
                      </p>
                    </div>
                  </div>
                </div>
                {/* Corner accent mark */}
                <div className="absolute bottom-3 right-3 w-4 h-4 border-b border-r border-white/10" />
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Diamond-shaped decorative leading */}
        <div className="absolute top-1/2 left-8 -translate-y-1/2">
          <div className="w-4 h-4 rotate-45 border border-white/10" />
        </div>
        <div className="absolute top-1/2 right-8 -translate-y-1/2">
          <div className="w-4 h-4 rotate-45 border border-white/10" />
        </div>
      </GlassPanel>

      {/* ═══════════════════ STUDIES — RUBY ═══════════════════ */}
      <GlassPanel panel={panels.studies} id="studies">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.15 }}
          className="max-w-6xl mx-auto px-6 py-24"
        >
          <motion.div variants={itemVariants} className="text-center mb-16">
            <p className="text-red-200/50 tracking-[0.3em] uppercase text-xs mb-4">
              Active Trials
            </p>
            <h2
              className="text-4xl sm:text-5xl md:text-6xl font-bold text-white tracking-tight"
              style={{ fontFamily: "'Playfair Display', serif" }}
            >
              Studies Seeking Patients
            </h2>
          </motion.div>

          <div className="space-y-0">
            {studies.map((study, i) => {
              const progress = study.target > 0 ? (study.patients / study.target) * 100 : 0
              return (
                <motion.div
                  key={study.title}
                  variants={itemVariants}
                  className="group relative p-6 sm:p-8"
                  style={{
                    borderBottom:
                      i < studies.length - 1
                        ? `2px solid rgba(255,255,255,0.08)`
                        : 'none',
                  }}
                >
                  <div className="absolute inset-0 bg-white/0 group-hover:bg-white/[0.03] transition-colors duration-500" />
                  <div className="relative z-10">
                    <div className="flex flex-col md:flex-row md:items-center gap-4 md:gap-8">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <span
                            className={cn(
                              'text-[10px] tracking-wider uppercase px-2 py-0.5 rounded-sm font-semibold',
                              study.status === 'Enrolling'
                                ? 'bg-green-500/20 text-green-200'
                                : 'bg-yellow-500/20 text-yellow-200'
                            )}
                          >
                            {study.status}
                          </span>
                          <span className="text-red-200/40 text-xs">{study.phase}</span>
                        </div>
                        <h3
                          className="text-lg sm:text-xl font-semibold text-white mb-1"
                          style={{ fontFamily: "'Playfair Display', serif" }}
                        >
                          {study.title}
                        </h3>
                        <p className="text-red-200/50 text-sm">
                          {study.university} &mdash; {study.condition}
                        </p>
                      </div>
                      <div className="md:w-56 shrink-0">
                        <div className="flex justify-between text-xs text-red-200/50 mb-2">
                          <span>
                            {study.patients} / {study.target} patients
                          </span>
                          <span>{Math.round(progress)}%</span>
                        </div>
                        <div className="w-full h-2 bg-white/[0.08] rounded-full overflow-hidden">
                          <motion.div
                            initial={{ width: 0 }}
                            whileInView={{ width: `${progress}%` }}
                            viewport={{ once: true }}
                            transition={{ duration: 1.2, delay: 0.3 + i * 0.1, ease: [0.22, 1, 0.36, 1] }}
                            className="h-full rounded-full"
                            style={{
                              background: 'linear-gradient(90deg, #fca5a5, #f87171)',
                            }}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )
            })}
          </div>

          <motion.div variants={itemVariants} className="flex justify-center mt-12">
            <button className="px-8 py-3 border-2 border-white/20 text-white font-medium rounded-sm hover:bg-white/10 hover:border-white/40 transition-all tracking-wide text-sm">
              View All Studies
            </button>
          </motion.div>
        </motion.div>

        {/* Horizontal leading accent lines */}
        <div className="absolute top-12 left-0 w-full h-[1px] bg-white/[0.04]" />
        <div className="absolute bottom-12 left-0 w-full h-[1px] bg-white/[0.04]" />
      </GlassPanel>

      {/* ═══════════════════ TESTIMONIALS — AMBER ═══════════════════ */}
      <GlassPanel panel={panels.testimonials} id="testimonials">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          className="max-w-6xl mx-auto px-6 py-24"
        >
          <motion.div variants={itemVariants} className="text-center mb-16">
            <p className="text-amber-200/50 tracking-[0.3em] uppercase text-xs mb-4">
              Voices from the Network
            </p>
            <h2
              className="text-4xl sm:text-5xl md:text-6xl font-bold text-white tracking-tight"
              style={{ fontFamily: "'Playfair Display', serif" }}
            >
              Trusted by Leaders
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-0">
            {testimonials.map((t, i) => (
              <motion.div
                key={t.name}
                variants={itemVariants}
                className="group relative p-8 sm:p-10"
                style={{
                  borderRight: i % 2 === 0 ? `2px solid rgba(255,255,255,0.08)` : 'none',
                  borderBottom: i < 2 ? `2px solid rgba(255,255,255,0.08)` : 'none',
                }}
              >
                <div className="absolute inset-0 bg-white/0 group-hover:bg-white/[0.03] transition-colors duration-500" />
                <div className="relative z-10">
                  <Quote className="w-6 h-6 text-amber-300/30 mb-4" />
                  <p
                    className="text-white/80 leading-relaxed mb-6 text-sm sm:text-base italic"
                    style={{ fontFamily: "'Playfair Display', serif" }}
                  >
                    &ldquo;{t.quote}&rdquo;
                  </p>
                  <div className="flex items-center gap-4">
                    <div className="w-11 h-11 rounded-sm flex items-center justify-center bg-amber-500/20 text-amber-200 font-bold text-sm tracking-wider border border-amber-400/10">
                      {t.avatar}
                    </div>
                    <div>
                      <p className="text-white font-semibold text-sm">{t.name}</p>
                      <p className="text-amber-200/50 text-xs">{t.credential}</p>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Arched leading accent at top */}
        <svg
          className="absolute top-0 left-1/2 -translate-x-1/2 text-white/[0.06]"
          width="200"
          height="60"
          viewBox="0 0 200 60"
          fill="none"
        >
          <path
            d="M0 60 Q100 -20 200 60"
            stroke="currentColor"
            strokeWidth="2"
          />
        </svg>
      </GlassPanel>

      {/* ═══════════════════ FOOTER / CTA — DARK LEADING ═══════════════════ */}
      <motion.footer
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="relative py-24 px-6 text-center"
        style={{
          backgroundColor: LEADING_COLOR,
          borderTop: `${LEADING_WIDTH}px solid ${LEADING_COLOR}`,
        }}
      >
        {/* Subtle multi-colored glow from the panels above */}
        <div
          className="absolute top-0 left-0 right-0 h-40 pointer-events-none"
          style={{
            background:
              'linear-gradient(to bottom, rgba(251,191,36,0.05) 0%, transparent 100%)',
          }}
        />

        <div className="relative z-10 max-w-3xl mx-auto">
          <h2
            className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-6 tracking-tight"
            style={{ fontFamily: "'Playfair Display', serif" }}
          >
            Step Through the Window
          </h2>
          <p className="text-white/40 text-lg mb-10 leading-relaxed">
            Join the growing network of neurologists and university clinics shaping the
            future of clinical neuroscience.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
            <button
              className="px-8 py-4 font-semibold rounded-sm text-lg tracking-wide transition-all"
              style={{
                background: 'linear-gradient(135deg, #10b981, #065f46)',
                color: 'white',
              }}
            >
              {ctaPrimary}
            </button>
            <button className="px-8 py-4 border-2 border-white/20 text-white font-medium rounded-sm hover:bg-white/5 hover:border-white/40 transition-all text-lg tracking-wide">
              {ctaSecondary}
            </button>
          </div>

          {/* Stained glass color bar */}
          <div className="flex justify-center gap-0 mb-10">
            {Object.values(panels).map((p) => (
              <div
                key={p.name}
                className="w-12 h-2 first:rounded-l-sm last:rounded-r-sm"
                style={{ backgroundColor: p.bg }}
                title={p.name}
              />
            ))}
          </div>

          <p className="text-white/20 text-xs tracking-wider uppercase">
            &copy; 2026 {brandName}. {tagline}.
          </p>
        </div>

        {/* Navigation */}
        <div className="relative z-10 flex justify-between max-w-6xl mx-auto mt-16 pt-8 border-t border-white/[0.06]">
          <Link
            to="/8"
            className="flex items-center gap-2 text-white/40 hover:text-white transition-colors text-sm"
          >
            <ChevronLeft className="w-4 h-4" />
            <span>Design #08 &mdash; Terminal</span>
          </Link>
          <Link
            to="/10"
            className="flex items-center gap-2 text-white/40 hover:text-white transition-colors text-sm"
          >
            <span>Design #10 &mdash; Kinetic</span>
            <ChevronRight className="w-4 h-4" />
          </Link>
        </div>
      </motion.footer>
    </div>
  )
}
