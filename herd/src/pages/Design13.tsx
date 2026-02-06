import { Link } from 'react-router-dom'
import { motion, useScroll, useTransform } from 'framer-motion'
import {
  Brain,
  Shield,
  Activity,
  ClipboardList,
  ChevronLeft,
  ChevronRight,
  ArrowRight,
  FlaskConical,
  Users,
  Building2,
  HeartPulse,
  Waves,
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
import { useRef, useMemo } from 'react'

// ── palette ──────────────────────────────────────────
const OCEAN_BLACK = '#020810'
const DEEP_NAVY = '#040e1a'
const ABYSS = '#061224'
const CYAN = '#06b6d4'
const GREEN = '#10b981'
const VIOLET = '#8b5cf6'
const SOFT_WHITE = '#e0f2fe'
const MUTED_BLUE = '#94a3b8'
const DIM_BLUE = '#1e3a5f'

// ── glow helpers ────────────────────────────────────
const glowCyan = (intensity: number = 1) =>
  `0 0 ${20 * intensity}px rgba(6,182,212,${0.3 * intensity}), 0 0 ${60 * intensity}px rgba(6,182,212,${0.15 * intensity})`
const glowGreen = (intensity: number = 1) =>
  `0 0 ${20 * intensity}px rgba(16,185,129,${0.3 * intensity}), 0 0 ${60 * intensity}px rgba(16,185,129,${0.15 * intensity})`
const glowViolet = (intensity: number = 1) =>
  `0 0 ${20 * intensity}px rgba(139,92,246,${0.3 * intensity}), 0 0 ${60 * intensity}px rgba(139,92,246,${0.15 * intensity})`

const textGlowCyan = `0 0 10px rgba(6,182,212,0.6), 0 0 30px rgba(6,182,212,0.3), 0 0 60px rgba(6,182,212,0.15)`
const textGlowGreen = `0 0 10px rgba(16,185,129,0.5), 0 0 30px rgba(16,185,129,0.25)`

const featureGlows = [glowCyan, glowGreen, glowViolet, glowCyan]
const featureColors = [CYAN, GREEN, VIOLET, CYAN]

// ── icon map ────────────────────────────────────────
const featureIcons: Record<string, React.ReactNode> = {
  brain: <Brain size={24} />,
  shield: <Shield size={24} />,
  activity: <Activity size={24} />,
  clipboard: <ClipboardList size={24} />,
}

const statIcons = [
  <Users key="u" size={20} />,
  <FlaskConical key="f" size={20} />,
  <Building2 key="b" size={20} />,
  <HeartPulse key="h" size={20} />,
]

const statGlows = [CYAN, GREEN, VIOLET, CYAN]

// ── particle config ─────────────────────────────────
interface Particle {
  id: number
  left: string
  size: number
  duration: number
  delay: number
  color: string
  opacity: number
  drift: number
}

function generateParticles(count: number): Particle[] {
  const colors = [
    'rgba(6,182,212,0.8)',
    'rgba(16,185,129,0.7)',
    'rgba(139,92,246,0.6)',
    'rgba(6,182,212,0.5)',
    'rgba(16,185,129,0.5)',
    'rgba(224,242,254,0.3)',
  ]
  const particles: Particle[] = []
  for (let i = 0; i < count; i++) {
    particles.push({
      id: i,
      left: `${(i / count) * 100 + (Math.sin(i * 7.3) * 8)}%`,
      size: 2 + (i % 5) * 1.1,
      duration: 10 + (i % 7) * 2.5,
      delay: (i % 11) * 1.3,
      color: colors[i % colors.length],
      opacity: 0.3 + (i % 4) * 0.18,
      drift: -20 + (i % 9) * 5,
    })
  }
  return particles
}

// ── CSS keyframes (injected via style tag) ──────────
const particleKeyframes = `
@keyframes bioFloat {
  0% {
    transform: translateY(100vh) translateX(0px);
    opacity: 0;
  }
  5% {
    opacity: var(--particle-opacity);
  }
  50% {
    transform: translateY(50vh) translateX(var(--particle-drift));
  }
  95% {
    opacity: var(--particle-opacity);
  }
  100% {
    transform: translateY(-10vh) translateX(calc(var(--particle-drift) * -0.5));
    opacity: 0;
  }
}

@keyframes bioPulse {
  0%, 100% { opacity: 0.4; transform: scale(1); }
  50% { opacity: 1; transform: scale(1.5); }
}

@keyframes bioGlow {
  0%, 100% { box-shadow: 0 0 15px rgba(6,182,212,0.2), 0 0 40px rgba(6,182,212,0.1); }
  50% { box-shadow: 0 0 25px rgba(6,182,212,0.4), 0 0 60px rgba(6,182,212,0.2); }
}

@keyframes orbFloat {
  0%, 100% { transform: translateY(0px) rotate(0deg); }
  33% { transform: translateY(-8px) rotate(1deg); }
  66% { transform: translateY(4px) rotate(-1deg); }
}

@keyframes borderGlow {
  0%, 100% {
    border-color: rgba(6,182,212,0.15);
    box-shadow: 0 0 10px rgba(6,182,212,0.05), inset 0 0 10px rgba(6,182,212,0.02);
  }
  50% {
    border-color: rgba(6,182,212,0.35);
    box-shadow: 0 0 20px rgba(6,182,212,0.15), inset 0 0 15px rgba(6,182,212,0.05);
  }
}

@keyframes waveShimmer {
  0% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
  100% { background-position: 0% 50%; }
}
`

// ── stagger animation ───────────────────────────────
const stagger = {
  container: {
    hidden: {},
    show: { transition: { staggerChildren: 0.1, delayChildren: 0.1 } },
  },
  item: {
    hidden: { opacity: 0, y: 24 },
    show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: 'easeOut' } },
  },
}

// ── Particle field component ────────────────────────
function ParticleField({ count = 35, className }: { count?: number; className?: string }) {
  const particles = useMemo(() => generateParticles(count), [count])
  return (
    <div className={cn('absolute inset-0 overflow-hidden pointer-events-none', className)}>
      {particles.map((p) => (
        <div
          key={p.id}
          className="absolute rounded-full"
          style={{
            left: p.left,
            bottom: '-10px',
            width: p.size,
            height: p.size,
            background: p.color,
            boxShadow: `0 0 ${p.size * 3}px ${p.color}`,
            animation: `bioFloat ${p.duration}s ${p.delay}s infinite ease-in-out`,
            '--particle-opacity': p.opacity,
            '--particle-drift': `${p.drift}px`,
          } as React.CSSProperties}
        />
      ))}
    </div>
  )
}

// ── Glowing orb (decorative) ────────────────────────
function GlowOrb({
  color,
  size,
  top,
  left,
  blur = 80,
  opacity = 0.15,
}: {
  color: string
  size: number
  top: string
  left: string
  blur?: number
  opacity?: number
}) {
  return (
    <div
      className="absolute rounded-full pointer-events-none"
      style={{
        top,
        left,
        width: size,
        height: size,
        background: color,
        filter: `blur(${blur}px)`,
        opacity,
        animation: `orbFloat ${12 + Math.random() * 6}s infinite ease-in-out`,
      }}
    />
  )
}

// ══════════════════════════════════════════════════════
//  MAIN COMPONENT — Design 13: Bioluminescent
// ══════════════════════════════════════════════════════
export default function Design13() {
  const pageRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({ target: pageRef })
  const heroParallax = useTransform(scrollYProgress, [0, 0.3], [0, -60])

  return (
    <div
      ref={pageRef}
      className="design-page relative min-h-screen"
      style={{
        background: OCEAN_BLACK,
        color: SOFT_WHITE,
        fontFamily: "'Inter', sans-serif",
        fontWeight: 300,
      }}
    >
      {/* inject keyframe animations */}
      <style dangerouslySetInnerHTML={{ __html: particleKeyframes }} />

      {/* ── FLOATING NAV ──────────────────────────── */}
      <motion.nav
        initial={{ y: -60, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.5, duration: 0.6, ease: 'easeOut' }}
        className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-5 py-2.5"
        style={{
          background: 'rgba(2,8,16,0.8)',
          backdropFilter: 'blur(20px)',
          borderBottom: '1px solid rgba(6,182,212,0.1)',
        }}
      >
        <Link
          to="/12"
          className="flex items-center gap-1 text-sm transition-all duration-300 hover:text-cyan-400"
          style={{ color: MUTED_BLUE }}
        >
          <ChevronLeft size={16} />
          <span className="hidden sm:inline">Prev</span>
        </Link>
        <span
          className="text-xs tracking-[0.2em] uppercase"
          style={{ color: MUTED_BLUE }}
        >
          Design 13 / 15 &mdash;{' '}
          <Link
            to="/"
            className="underline underline-offset-2 transition-colors duration-300 hover:text-cyan-400"
            style={{ color: MUTED_BLUE }}
          >
            Gallery
          </Link>
        </span>
        <Link
          to="/14"
          className="flex items-center gap-1 text-sm transition-all duration-300 hover:text-cyan-400"
          style={{ color: MUTED_BLUE }}
        >
          <span className="hidden sm:inline">Next</span>
          <ChevronRight size={16} />
        </Link>
      </motion.nav>

      {/* ── HERO SECTION ──────────────────────────── */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Deep ambient glow orbs */}
        <GlowOrb color={CYAN} size={400} top="10%" left="-5%" blur={120} opacity={0.08} />
        <GlowOrb color={GREEN} size={350} top="60%" left="70%" blur={100} opacity={0.06} />
        <GlowOrb color={VIOLET} size={300} top="30%" left="80%" blur={110} opacity={0.07} />
        <GlowOrb color={CYAN} size={250} top="70%" left="20%" blur={90} opacity={0.05} />

        {/* Particle field */}
        <ParticleField count={35} />

        {/* Hero content */}
        <motion.div
          style={{ y: heroParallax }}
          className="relative z-10 max-w-4xl mx-auto px-6 text-center pt-24"
        >
          {/* Brand */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: 'easeOut', delay: 0.2 }}
            className="mb-6"
          >
            <div className="flex items-center justify-center gap-3 mb-4">
              <Waves size={20} style={{ color: CYAN, filter: `drop-shadow(0 0 8px ${CYAN})` }} />
              <span
                className="text-xs tracking-[0.3em] uppercase"
                style={{ color: CYAN, textShadow: `0 0 15px rgba(6,182,212,0.4)` }}
              >
                {brandName}
              </span>
              <Waves size={20} style={{ color: CYAN, filter: `drop-shadow(0 0 8px ${CYAN})` }} />
            </div>
            <p
              className="text-sm tracking-[0.15em]"
              style={{ color: MUTED_BLUE }}
            >
              {tagline}
            </p>
          </motion.div>

          {/* Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, ease: 'easeOut', delay: 0.4 }}
            className="mb-6"
            style={{
              fontSize: 'clamp(2.2rem, 6vw, 4.2rem)',
              fontWeight: 300,
              lineHeight: 1.15,
              letterSpacing: '-0.02em',
              color: SOFT_WHITE,
              textShadow: textGlowCyan,
            }}
          >
            {heroHeadline}
          </motion.h1>

          {/* Subheadline */}
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: 'easeOut', delay: 0.7 }}
            className="max-w-2xl mx-auto mb-10 text-base leading-relaxed"
            style={{ color: MUTED_BLUE, fontWeight: 300 }}
          >
            {heroSubheadline}
          </motion.p>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: 'easeOut', delay: 1 }}
            className="flex flex-wrap justify-center gap-4"
          >
            <button
              className="group relative flex items-center gap-2 px-8 py-3.5 text-sm font-normal tracking-wider rounded-full overflow-hidden transition-all duration-500"
              style={{
                background: `linear-gradient(135deg, ${CYAN}, ${GREEN})`,
                color: OCEAN_BLACK,
                boxShadow: `0 0 25px rgba(6,182,212,0.3), 0 0 60px rgba(6,182,212,0.1)`,
              }}
            >
              <span className="relative z-10">{ctaPrimary}</span>
              <ArrowRight size={15} className="relative z-10 transition-transform group-hover:translate-x-1" />
            </button>
            <button
              className="flex items-center gap-2 px-8 py-3.5 text-sm font-normal tracking-wider rounded-full transition-all duration-500 hover:border-cyan-400"
              style={{
                background: 'transparent',
                color: CYAN,
                border: `1px solid rgba(6,182,212,0.3)`,
                boxShadow: `0 0 15px rgba(6,182,212,0.05)`,
              }}
            >
              {ctaSecondary}
            </button>
          </motion.div>

          {/* Scroll indicator */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.5, duration: 1 }}
            className="mt-20"
          >
            <motion.div
              animate={{ y: [0, 8, 0] }}
              transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
              className="w-5 h-8 mx-auto rounded-full border flex items-start justify-center pt-1.5"
              style={{ borderColor: 'rgba(6,182,212,0.3)' }}
            >
              <div
                className="w-1 h-2 rounded-full"
                style={{ background: CYAN, boxShadow: `0 0 6px ${CYAN}` }}
              />
            </motion.div>
          </motion.div>
        </motion.div>

        {/* Bottom gradient fade */}
        <div
          className="absolute bottom-0 left-0 right-0 h-40 pointer-events-none"
          style={{
            background: `linear-gradient(to top, ${DEEP_NAVY}, transparent)`,
          }}
        />
      </section>

      {/* ── STATS SECTION ─────────────────────────── */}
      <section
        className="relative py-24 overflow-hidden"
        style={{ background: DEEP_NAVY }}
      >
        <GlowOrb color={CYAN} size={200} top="20%" left="10%" blur={80} opacity={0.06} />
        <GlowOrb color={GREEN} size={180} top="50%" left="75%" blur={70} opacity={0.05} />

        <div className="max-w-5xl mx-auto px-6 relative z-10">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2
              className="text-xs tracking-[0.3em] uppercase mb-3"
              style={{ color: CYAN, textShadow: `0 0 10px rgba(6,182,212,0.3)` }}
            >
              Network Overview
            </h2>
            <div
              className="w-16 h-px mx-auto"
              style={{ background: `linear-gradient(to right, transparent, ${CYAN}, transparent)` }}
            />
          </motion.div>

          <motion.div
            variants={stagger.container}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.3 }}
            className="grid grid-cols-2 md:grid-cols-4 gap-8"
          >
            {stats.map((s, i) => (
              <motion.div
                key={s.label}
                variants={stagger.item}
                className="text-center group"
              >
                {/* Glowing orb icon */}
                <div
                  className="w-14 h-14 mx-auto mb-5 rounded-full flex items-center justify-center transition-all duration-500"
                  style={{
                    background: `rgba(${statGlows[i] === CYAN ? '6,182,212' : statGlows[i] === GREEN ? '16,185,129' : '139,92,246'},0.08)`,
                    border: `1px solid rgba(${statGlows[i] === CYAN ? '6,182,212' : statGlows[i] === GREEN ? '16,185,129' : '139,92,246'},0.2)`,
                    color: statGlows[i],
                    boxShadow: `0 0 20px rgba(${statGlows[i] === CYAN ? '6,182,212' : statGlows[i] === GREEN ? '16,185,129' : '139,92,246'},0.1)`,
                    animation: `bioPulse ${3 + i * 0.7}s infinite ease-in-out`,
                  }}
                >
                  {statIcons[i]}
                </div>
                {/* Number */}
                <div
                  className="text-3xl md:text-4xl font-light mb-2 tabular-nums"
                  style={{
                    color: SOFT_WHITE,
                    textShadow: `0 0 20px rgba(${statGlows[i] === CYAN ? '6,182,212' : statGlows[i] === GREEN ? '16,185,129' : '139,92,246'},0.5), 0 0 40px rgba(${statGlows[i] === CYAN ? '6,182,212' : statGlows[i] === GREEN ? '16,185,129' : '139,92,246'},0.2)`,
                  }}
                >
                  {s.value}
                </div>
                {/* Label */}
                <div
                  className="text-xs tracking-[0.15em] uppercase"
                  style={{ color: MUTED_BLUE }}
                >
                  {s.label}
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── gradient transition ───────────────────── */}
      <div
        className="h-24"
        style={{
          background: `linear-gradient(to bottom, ${DEEP_NAVY}, ${ABYSS})`,
        }}
      />

      {/* ── FEATURES SECTION ──────────────────────── */}
      <section
        className="relative py-24 overflow-hidden"
        style={{ background: ABYSS }}
      >
        <ParticleField count={15} />
        <GlowOrb color={VIOLET} size={300} top="10%" left="60%" blur={100} opacity={0.06} />

        <div className="max-w-5xl mx-auto px-6 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2
              className="text-2xl md:text-3xl font-light mb-4"
              style={{
                color: SOFT_WHITE,
                textShadow: textGlowCyan,
              }}
            >
              Platform Capabilities
            </h2>
            <p
              className="text-sm max-w-lg mx-auto"
              style={{ color: MUTED_BLUE }}
            >
              Engineered for the deep complexities of neurological research coordination
            </p>
            <div
              className="w-24 h-px mx-auto mt-6"
              style={{ background: `linear-gradient(to right, transparent, ${CYAN}, ${GREEN}, transparent)` }}
            />
          </motion.div>

          <motion.div
            variants={stagger.container}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.2 }}
            className="grid grid-cols-1 md:grid-cols-2 gap-6"
          >
            {features.map((f, i) => (
              <motion.div
                key={f.title}
                variants={stagger.item}
                className="group relative p-8 rounded-2xl transition-all duration-700"
                style={{
                  background: `linear-gradient(135deg, rgba(${featureColors[i] === CYAN ? '6,182,212' : featureColors[i] === GREEN ? '16,185,129' : '139,92,246'},0.03), rgba(2,8,16,0.6))`,
                  border: `1px solid rgba(${featureColors[i] === CYAN ? '6,182,212' : featureColors[i] === GREEN ? '16,185,129' : '139,92,246'},0.12)`,
                  animation: `borderGlow ${4 + i * 0.5}s infinite ease-in-out`,
                }}
              >
                {/* Icon orb */}
                <div
                  className="w-12 h-12 rounded-full flex items-center justify-center mb-5"
                  style={{
                    background: `rgba(${featureColors[i] === CYAN ? '6,182,212' : featureColors[i] === GREEN ? '16,185,129' : '139,92,246'},0.1)`,
                    color: featureColors[i],
                    boxShadow: featureGlows[i](0.5),
                  }}
                >
                  {featureIcons[f.icon]}
                </div>
                <h3
                  className="text-lg font-normal mb-3"
                  style={{
                    color: SOFT_WHITE,
                    textShadow: `0 0 10px rgba(${featureColors[i] === CYAN ? '6,182,212' : featureColors[i] === GREEN ? '16,185,129' : '139,92,246'},0.2)`,
                  }}
                >
                  {f.title}
                </h3>
                <p
                  className="text-sm leading-relaxed"
                  style={{ color: MUTED_BLUE, fontWeight: 300 }}
                >
                  {f.description}
                </p>

                {/* Corner glow dot */}
                <div
                  className="absolute top-4 right-4 w-2 h-2 rounded-full"
                  style={{
                    background: featureColors[i],
                    boxShadow: `0 0 8px ${featureColors[i]}, 0 0 20px ${featureColors[i]}`,
                    animation: `bioPulse ${2.5 + i * 0.3}s infinite ease-in-out`,
                  }}
                />
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── gradient transition ───────────────────── */}
      <div
        className="h-24"
        style={{
          background: `linear-gradient(to bottom, ${ABYSS}, ${OCEAN_BLACK})`,
        }}
      />

      {/* ── STUDIES SECTION ────────────────────────── */}
      <section
        className="relative py-24 overflow-hidden"
        style={{ background: OCEAN_BLACK }}
      >
        <GlowOrb color={GREEN} size={250} top="15%" left="5%" blur={90} opacity={0.06} />
        <GlowOrb color={CYAN} size={200} top="65%" left="80%" blur={80} opacity={0.05} />
        <ParticleField count={12} />

        <div className="max-w-5xl mx-auto px-6 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2
              className="text-2xl md:text-3xl font-light mb-4"
              style={{
                color: SOFT_WHITE,
                textShadow: textGlowGreen,
              }}
            >
              Active Studies
            </h2>
            <p
              className="text-sm max-w-lg mx-auto"
              style={{ color: MUTED_BLUE }}
            >
              Clinical trials currently seeking enrollment across the network
            </p>
            <div
              className="w-24 h-px mx-auto mt-6"
              style={{ background: `linear-gradient(to right, transparent, ${GREEN}, ${CYAN}, transparent)` }}
            />
          </motion.div>

          <motion.div
            variants={stagger.container}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.1 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5"
          >
            {studies.map((s, i) => {
              const pct = s.target > 0 ? Math.round((s.patients / s.target) * 100) : 0
              const cardColors = [CYAN, GREEN, VIOLET, CYAN, GREEN]
              const cardColor = cardColors[i % cardColors.length]
              const rgbVal =
                cardColor === CYAN
                  ? '6,182,212'
                  : cardColor === GREEN
                    ? '16,185,129'
                    : '139,92,246'

              return (
                <motion.div
                  key={s.title}
                  variants={stagger.item}
                  className="group relative p-6 rounded-xl transition-all duration-500"
                  style={{
                    background: `linear-gradient(160deg, rgba(${rgbVal},0.04), rgba(2,8,16,0.8))`,
                    border: `1px solid rgba(${rgbVal},0.15)`,
                    boxShadow: `0 0 15px rgba(${rgbVal},0.03), inset 0 0 15px rgba(${rgbVal},0.02)`,
                  }}
                >
                  {/* Phase + condition */}
                  <div className="flex flex-wrap items-center gap-2 mb-4">
                    <span
                      className="text-[10px] tracking-[0.12em] uppercase px-2.5 py-1 rounded-full"
                      style={{
                        background: `rgba(${rgbVal},0.12)`,
                        color: cardColor,
                        border: `1px solid rgba(${rgbVal},0.2)`,
                      }}
                    >
                      {s.phase}
                    </span>
                    <span
                      className="text-[10px] tracking-[0.12em] uppercase px-2.5 py-1 rounded-full"
                      style={{
                        background: 'rgba(224,242,254,0.04)',
                        color: MUTED_BLUE,
                        border: '1px solid rgba(224,242,254,0.08)',
                      }}
                    >
                      {s.condition}
                    </span>
                  </div>

                  {/* Title */}
                  <h4
                    className="text-base font-normal mb-2 leading-snug"
                    style={{ color: SOFT_WHITE }}
                  >
                    {s.title}
                  </h4>

                  {/* University + status */}
                  <p
                    className="text-xs mb-5"
                    style={{ color: MUTED_BLUE }}
                  >
                    {s.university} &middot;{' '}
                    <span
                      style={{
                        color: s.status === 'Enrolling' ? GREEN : MUTED_BLUE,
                        textShadow:
                          s.status === 'Enrolling'
                            ? `0 0 8px rgba(16,185,129,0.4)`
                            : 'none',
                      }}
                    >
                      {s.status}
                    </span>
                  </p>

                  {/* Enrollment bar */}
                  <div className="flex items-center gap-3">
                    <div
                      className="flex-1 h-1 rounded-full overflow-hidden"
                      style={{ background: `rgba(${rgbVal},0.1)` }}
                    >
                      <motion.div
                        initial={{ width: 0 }}
                        whileInView={{ width: `${pct}%` }}
                        viewport={{ once: true }}
                        transition={{ duration: 1.2, ease: 'easeOut', delay: 0.3 + i * 0.1 }}
                        className="h-full rounded-full"
                        style={{
                          background: `linear-gradient(to right, ${cardColor}, rgba(${rgbVal},0.6))`,
                          boxShadow: `0 0 8px rgba(${rgbVal},0.4)`,
                        }}
                      />
                    </div>
                    <span
                      className="text-xs tabular-nums whitespace-nowrap"
                      style={{ color: MUTED_BLUE }}
                    >
                      {s.patients}/{s.target}
                    </span>
                  </div>

                  {/* Glow dot */}
                  <div
                    className="absolute top-3 right-3 w-1.5 h-1.5 rounded-full"
                    style={{
                      background: cardColor,
                      boxShadow: `0 0 6px ${cardColor}`,
                      animation: `bioPulse ${3 + i * 0.4}s infinite ease-in-out`,
                    }}
                  />
                </motion.div>
              )
            })}
          </motion.div>
        </div>
      </section>

      {/* ── gradient transition ───────────────────── */}
      <div
        className="h-24"
        style={{
          background: `linear-gradient(to bottom, ${OCEAN_BLACK}, ${DEEP_NAVY})`,
        }}
      />

      {/* ── TESTIMONIALS SECTION ──────────────────── */}
      <section
        className="relative py-24 overflow-hidden"
        style={{ background: DEEP_NAVY }}
      >
        <GlowOrb color={VIOLET} size={280} top="20%" left="0%" blur={100} opacity={0.06} />
        <GlowOrb color={CYAN} size={220} top="60%" left="70%" blur={90} opacity={0.05} />
        <ParticleField count={10} />

        <div className="max-w-5xl mx-auto px-6 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2
              className="text-2xl md:text-3xl font-light mb-4"
              style={{
                color: SOFT_WHITE,
                textShadow: `0 0 10px rgba(139,92,246,0.5), 0 0 30px rgba(139,92,246,0.25)`,
              }}
            >
              Voices from the Deep
            </h2>
            <p
              className="text-sm max-w-lg mx-auto"
              style={{ color: MUTED_BLUE }}
            >
              What physicians and researchers say about the platform
            </p>
            <div
              className="w-24 h-px mx-auto mt-6"
              style={{ background: `linear-gradient(to right, transparent, ${VIOLET}, ${CYAN}, transparent)` }}
            />
          </motion.div>

          <motion.div
            variants={stagger.container}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.15 }}
            className="grid grid-cols-1 md:grid-cols-2 gap-6"
          >
            {testimonials.map((t, i) => {
              const tColors = [CYAN, VIOLET, GREEN, CYAN]
              const tColor = tColors[i % tColors.length]
              const tRgb =
                tColor === CYAN
                  ? '6,182,212'
                  : tColor === GREEN
                    ? '16,185,129'
                    : '139,92,246'

              return (
                <motion.blockquote
                  key={t.name}
                  variants={stagger.item}
                  className="relative p-7 rounded-2xl"
                  style={{
                    background: `linear-gradient(145deg, rgba(${tRgb},0.04), rgba(2,8,16,0.5))`,
                    border: `1px solid rgba(${tRgb},0.1)`,
                    boxShadow: `inset 0 0 30px rgba(${tRgb},0.02)`,
                  }}
                >
                  {/* Ambient glow circle behind quote */}
                  <div
                    className="absolute -top-10 -right-10 w-32 h-32 rounded-full pointer-events-none"
                    style={{
                      background: tColor,
                      filter: 'blur(60px)',
                      opacity: 0.04,
                    }}
                  />

                  {/* Opening quote */}
                  <span
                    aria-hidden
                    className="block text-5xl leading-none mb-3 select-none"
                    style={{
                      color: tColor,
                      opacity: 0.3,
                      textShadow: `0 0 15px ${tColor}`,
                      fontWeight: 300,
                    }}
                  >
                    &ldquo;
                  </span>

                  <p
                    className="text-sm leading-relaxed mb-6 italic"
                    style={{ color: 'rgba(224,242,254,0.8)', fontWeight: 300 }}
                  >
                    {t.quote}
                  </p>

                  <footer className="flex items-center gap-3">
                    <div
                      className="w-10 h-10 rounded-full flex items-center justify-center text-xs font-normal shrink-0"
                      style={{
                        background: `rgba(${tRgb},0.12)`,
                        color: tColor,
                        border: `1px solid rgba(${tRgb},0.25)`,
                        boxShadow: `0 0 12px rgba(${tRgb},0.15)`,
                      }}
                    >
                      {t.avatar}
                    </div>
                    <div>
                      <div
                        className="text-sm font-normal"
                        style={{ color: SOFT_WHITE }}
                      >
                        {t.name}
                      </div>
                      <div
                        className="text-xs"
                        style={{ color: MUTED_BLUE }}
                      >
                        {t.credential}
                      </div>
                    </div>
                  </footer>
                </motion.blockquote>
              )
            })}
          </motion.div>
        </div>
      </section>

      {/* ── gradient transition ───────────────────── */}
      <div
        className="h-24"
        style={{
          background: `linear-gradient(to bottom, ${DEEP_NAVY}, ${OCEAN_BLACK})`,
        }}
      />

      {/* ── CTA SECTION ───────────────────────────── */}
      <section
        className="relative py-28 overflow-hidden"
        style={{ background: OCEAN_BLACK }}
      >
        <ParticleField count={25} />
        <GlowOrb color={CYAN} size={350} top="30%" left="40%" blur={120} opacity={0.1} />
        <GlowOrb color={GREEN} size={250} top="50%" left="60%" blur={100} opacity={0.07} />
        <GlowOrb color={VIOLET} size={200} top="20%" left="20%" blur={90} opacity={0.06} />

        <div className="max-w-3xl mx-auto px-6 relative z-10 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.9, ease: 'easeOut' }}
          >
            {/* Decorative ring */}
            <div
              className="w-20 h-20 mx-auto mb-8 rounded-full flex items-center justify-center"
              style={{
                border: `1px solid rgba(6,182,212,0.2)`,
                boxShadow: `0 0 30px rgba(6,182,212,0.1), inset 0 0 30px rgba(6,182,212,0.05)`,
                animation: 'bioGlow 4s infinite ease-in-out',
              }}
            >
              <div
                className="w-3 h-3 rounded-full"
                style={{
                  background: CYAN,
                  boxShadow: `0 0 15px ${CYAN}, 0 0 40px ${CYAN}`,
                  animation: 'bioPulse 3s infinite ease-in-out',
                }}
              />
            </div>

            <h2
              className="text-2xl md:text-4xl font-light mb-6"
              style={{
                color: SOFT_WHITE,
                textShadow: textGlowCyan,
                lineHeight: 1.2,
              }}
            >
              Illuminate the path to
              <br />
              neurological discovery
            </h2>

            <p
              className="text-sm leading-relaxed mb-10 max-w-xl mx-auto"
              style={{ color: MUTED_BLUE, fontWeight: 300 }}
            >
              Join a growing network of physicians and institutions working together
              to accelerate neurological research. Your patients deserve access to
              tomorrow's treatments, today.
            </p>

            <div className="flex flex-wrap justify-center gap-4">
              <button
                className="group relative flex items-center gap-2 px-8 py-3.5 text-sm font-normal tracking-wider rounded-full overflow-hidden transition-all duration-500"
                style={{
                  background: `linear-gradient(135deg, ${CYAN}, ${GREEN})`,
                  color: OCEAN_BLACK,
                  boxShadow: `0 0 30px rgba(6,182,212,0.35), 0 0 80px rgba(6,182,212,0.15)`,
                }}
              >
                <span className="relative z-10">{ctaPrimary}</span>
                <ArrowRight size={15} className="relative z-10 transition-transform group-hover:translate-x-1" />
              </button>
              <button
                className="flex items-center gap-2 px-8 py-3.5 text-sm font-normal tracking-wider rounded-full transition-all duration-500 hover:border-cyan-400"
                style={{
                  background: 'transparent',
                  color: CYAN,
                  border: `1px solid rgba(6,182,212,0.3)`,
                  boxShadow: `0 0 15px rgba(6,182,212,0.05)`,
                }}
              >
                {ctaSecondary}
              </button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── FOOTER ────────────────────────────────── */}
      <footer
        className="relative py-12 overflow-hidden"
        style={{
          background: OCEAN_BLACK,
          borderTop: `1px solid rgba(6,182,212,0.08)`,
        }}
      >
        <div className="max-w-5xl mx-auto px-6 relative z-10">
          {/* divider */}
          <div
            className="w-full h-px mb-8"
            style={{ background: `linear-gradient(to right, transparent, rgba(6,182,212,0.15), transparent)` }}
          />

          <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-xs mb-8">
            <span style={{ color: MUTED_BLUE }}>
              &copy; {new Date().getFullYear()}{' '}
              <span
                style={{
                  color: CYAN,
                  textShadow: `0 0 8px rgba(6,182,212,0.3)`,
                }}
              >
                {brandName}
              </span>
              . All rights reserved.
            </span>
            <span className="flex items-center gap-4" style={{ color: MUTED_BLUE }}>
              <span className="transition-colors duration-300 cursor-pointer hover:text-cyan-400">Privacy</span>
              <span style={{ color: DIM_BLUE }}>&middot;</span>
              <span className="transition-colors duration-300 cursor-pointer hover:text-cyan-400">Terms</span>
              <span style={{ color: DIM_BLUE }}>&middot;</span>
              <span className="transition-colors duration-300 cursor-pointer hover:text-cyan-400">Contact</span>
            </span>
          </div>

          {/* divider */}
          <div
            className="w-full h-px mb-8"
            style={{ background: `linear-gradient(to right, transparent, rgba(6,182,212,0.08), transparent)` }}
          />

          {/* prev/next navigation */}
          <div className="flex items-center justify-between">
            <Link
              to="/12"
              className="flex items-center gap-2 text-sm transition-all duration-300 hover:text-cyan-400"
              style={{ color: MUTED_BLUE }}
            >
              <ChevronLeft size={16} />
              Previous Design
            </Link>
            <Link
              to="/14"
              className="flex items-center gap-2 text-sm transition-all duration-300 hover:text-cyan-400"
              style={{ color: MUTED_BLUE }}
            >
              Next Design
              <ChevronRight size={16} />
            </Link>
          </div>
        </div>
      </footer>
    </div>
  )
}
