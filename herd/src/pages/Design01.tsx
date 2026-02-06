import { useRef, useEffect, useState, useCallback } from 'react'
import { Link } from 'react-router-dom'
import { motion, useInView, AnimatePresence } from 'framer-motion'
import {
  Brain,
  Shield,
  Activity,
  ClipboardCheck,
  ArrowRight,
  ChevronLeft,
  ChevronRight,
  FlaskConical,
  Users,
  Building2,
  HeartPulse,
  Quote,
  Zap,
  Menu,
  X,
} from 'lucide-react'
import {
  stats,
  testimonials,
  studies,
  features,
  brandName,
  heroHeadline,
  heroSubheadline,
  ctaPrimary,
  ctaSecondary,
} from '../shared/MockData'
import { cn } from '../shared/cn'

/* ─── palette ─── */
const NAVY = '#0a1628'
const DEEP = '#060e1a'
const BLUE = '#3b82f6'
const CYAN = '#06b6d4'

/* ─── icon map ─── */
const featureIcons: Record<string, React.ReactNode> = {
  brain: <Brain className="w-6 h-6" />,
  shield: <Shield className="w-6 h-6" />,
  activity: <Activity className="w-6 h-6" />,
  clipboard: <ClipboardCheck className="w-6 h-6" />,
}

const statIcons = [
  <Users key="u" className="w-5 h-5" />,
  <FlaskConical key="f" className="w-5 h-5" />,
  <Building2 key="b" className="w-5 h-5" />,
  <HeartPulse key="h" className="w-5 h-5" />,
]

/* ─── neural network canvas ─── */
interface Node {
  x: number
  y: number
  vx: number
  vy: number
  radius: number
  pulsePhase: number
  layer: number // 0=deep, 1=mid, 2=foreground
}

function useNeuralCanvas(canvasRef: React.RefObject<HTMLCanvasElement | null>) {
  const nodesRef = useRef<Node[]>([])
  const mouseRef = useRef({ x: -1000, y: -1000 })
  const animRef = useRef<number>(0)

  const init = useCallback((canvas: HTMLCanvasElement) => {
    const w = canvas.width
    const h = canvas.height
    const count = Math.min(Math.floor((w * h) / 12000), 120)
    const nodes: Node[] = []
    for (let i = 0; i < count; i++) {
      const layer = i < count * 0.3 ? 0 : i < count * 0.7 ? 1 : 2
      nodes.push({
        x: Math.random() * w,
        y: Math.random() * h,
        vx: (Math.random() - 0.5) * (0.15 + layer * 0.1),
        vy: (Math.random() - 0.5) * (0.15 + layer * 0.1),
        radius: 1.5 + layer * 1.0 + Math.random() * 1.5,
        pulsePhase: Math.random() * Math.PI * 2,
        layer,
      })
    }
    nodesRef.current = nodes
  }, [])

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const resize = () => {
      const dpr = window.devicePixelRatio || 1
      const rect = canvas.getBoundingClientRect()
      canvas.width = rect.width * dpr
      canvas.height = rect.height * dpr
      ctx.scale(dpr, dpr)
      canvas.style.width = rect.width + 'px'
      canvas.style.height = rect.height + 'px'
      init(canvas)
    }

    resize()
    window.addEventListener('resize', resize)

    const handleMouse = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect()
      mouseRef.current = { x: e.clientX - rect.left, y: e.clientY - rect.top }
    }
    canvas.addEventListener('mousemove', handleMouse)

    let time = 0
    const draw = () => {
      const w = canvas.getBoundingClientRect().width
      const h = canvas.getBoundingClientRect().height
      ctx.clearRect(0, 0, w, h)
      time += 0.005

      const nodes = nodesRef.current
      const mouse = mouseRef.current

      // update positions
      for (const n of nodes) {
        n.x += n.vx
        n.y += n.vy
        if (n.x < -20) n.x = w + 20
        if (n.x > w + 20) n.x = -20
        if (n.y < -20) n.y = h + 20
        if (n.y > h + 20) n.y = -20

        // subtle mouse repulsion
        const dx = n.x - mouse.x
        const dy = n.y - mouse.y
        const dist = Math.sqrt(dx * dx + dy * dy)
        if (dist < 150 && dist > 0) {
          const force = (150 - dist) / 150 * 0.3
          n.x += (dx / dist) * force
          n.y += (dy / dist) * force
        }
      }

      // draw connections (layer-aware)
      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const a = nodes[i]
          const b = nodes[j]
          const dx = a.x - b.x
          const dy = a.y - b.y
          const dist = Math.sqrt(dx * dx + dy * dy)
          const maxDist = 120 + Math.min(a.layer, b.layer) * 30

          if (dist < maxDist) {
            const alpha = (1 - dist / maxDist) * (0.08 + Math.min(a.layer, b.layer) * 0.04)
            // pulse along connection
            const pulseAlpha = Math.sin(time * 3 + a.pulsePhase) * 0.5 + 0.5
            const finalAlpha = alpha * (0.6 + pulseAlpha * 0.4)

            const isCyan = (a.layer + b.layer) > 2
            ctx.strokeStyle = isCyan
              ? `rgba(6, 182, 212, ${finalAlpha})`
              : `rgba(59, 130, 246, ${finalAlpha})`
            ctx.lineWidth = 0.5 + Math.min(a.layer, b.layer) * 0.3
            ctx.beginPath()
            ctx.moveTo(a.x, a.y)
            ctx.lineTo(b.x, b.y)
            ctx.stroke()
          }
        }
      }

      // draw nodes
      for (const n of nodes) {
        const pulse = Math.sin(time * 2 + n.pulsePhase) * 0.5 + 0.5
        const alpha = 0.3 + n.layer * 0.15 + pulse * 0.2

        // glow
        const glowSize = n.radius * (3 + pulse * 2)
        const gradient = ctx.createRadialGradient(n.x, n.y, 0, n.x, n.y, glowSize)
        const isCyan = n.layer === 2
        if (isCyan) {
          gradient.addColorStop(0, `rgba(6, 182, 212, ${alpha * 0.6})`)
          gradient.addColorStop(1, 'rgba(6, 182, 212, 0)')
        } else {
          gradient.addColorStop(0, `rgba(59, 130, 246, ${alpha * 0.6})`)
          gradient.addColorStop(1, 'rgba(59, 130, 246, 0)')
        }
        ctx.fillStyle = gradient
        ctx.beginPath()
        ctx.arc(n.x, n.y, glowSize, 0, Math.PI * 2)
        ctx.fill()

        // core
        ctx.fillStyle = isCyan
          ? `rgba(6, 182, 212, ${alpha + 0.2})`
          : `rgba(59, 130, 246, ${alpha + 0.2})`
        ctx.beginPath()
        ctx.arc(n.x, n.y, n.radius, 0, Math.PI * 2)
        ctx.fill()
      }

      animRef.current = requestAnimationFrame(draw)
    }

    animRef.current = requestAnimationFrame(draw)

    return () => {
      cancelAnimationFrame(animRef.current)
      window.removeEventListener('resize', resize)
      canvas.removeEventListener('mousemove', handleMouse)
    }
  }, [canvasRef, init])
}

/* ─── animation variants ─── */
const EASE_OUT: [number, number, number, number] = [0.22, 1, 0.36, 1]

const fadeUp = {
  hidden: { opacity: 0, y: 32 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.1, duration: 0.7, ease: EASE_OUT },
  }),
}

const scaleIn = {
  hidden: { opacity: 0, scale: 0.92 },
  visible: (i: number) => ({
    opacity: 1,
    scale: 1,
    transition: { delay: i * 0.08, duration: 0.6, ease: EASE_OUT },
  }),
}

function AnimatedSection({ children, className }: { children: React.ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })
  return (
    <div ref={ref} className={className}>
      {inView ? children : <div style={{ opacity: 0 }}>{children}</div>}
    </div>
  )
}

/* ─── main component ─── */
export default function Design01() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  useNeuralCanvas(canvasRef)

  const [activeTestimonial, setActiveTestimonial] = useState(0)
  const [mobileNav, setMobileNav] = useState(false)

  // auto-rotate testimonials
  useEffect(() => {
    const timer = setInterval(() => {
      setActiveTestimonial((p) => (p + 1) % testimonials.length)
    }, 6000)
    return () => clearInterval(timer)
  }, [])

  return (
    <div className="design-page" style={{ fontFamily: "'Inter', sans-serif", background: DEEP }}>
      {/* ─── floating design nav ─── */}
      <div className="fixed top-4 right-4 z-50 flex items-center gap-2">
        <Link
          to="/"
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium backdrop-blur-xl border transition-all duration-300 hover:scale-105"
          style={{
            background: 'rgba(10, 22, 40, 0.8)',
            borderColor: 'rgba(59, 130, 246, 0.25)',
            color: 'rgba(148, 163, 184, 0.9)',
          }}
        >
          <ChevronLeft className="w-3 h-3" /> Gallery
        </Link>
        <span
          className="px-3 py-1.5 rounded-full text-xs font-mono font-bold backdrop-blur-xl border"
          style={{
            background: 'rgba(59, 130, 246, 0.15)',
            borderColor: 'rgba(59, 130, 246, 0.35)',
            color: BLUE,
          }}
        >
          01 / 15
        </span>
        <Link
          to="/2"
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium backdrop-blur-xl border transition-all duration-300 hover:scale-105"
          style={{
            background: 'rgba(10, 22, 40, 0.8)',
            borderColor: 'rgba(59, 130, 246, 0.25)',
            color: 'rgba(148, 163, 184, 0.9)',
          }}
        >
          Next <ChevronRight className="w-3 h-3" />
        </Link>
      </div>

      {/* ─── navigation ─── */}
      <nav
        className="fixed top-0 left-0 right-0 z-40 backdrop-blur-xl border-b transition-all duration-500"
        style={{
          background: 'rgba(6, 14, 26, 0.75)',
          borderColor: 'rgba(59, 130, 246, 0.1)',
        }}
      >
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          {/* logo */}
          <Link to="/1" className="flex items-center gap-3 group">
            <div
              className="w-8 h-8 rounded-lg flex items-center justify-center relative overflow-hidden"
              style={{ background: `linear-gradient(135deg, ${BLUE}, ${CYAN})` }}
            >
              <Zap className="w-4 h-4 text-white relative z-10" />
              <div
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                style={{ background: `linear-gradient(135deg, ${CYAN}, ${BLUE})` }}
              />
            </div>
            <span className="text-white font-bold text-lg tracking-tight">{brandName}</span>
          </Link>

          {/* desktop links */}
          <div className="hidden md:flex items-center gap-8">
            {['Features', 'Studies', 'Testimonials', 'Network'].map((item) => (
              <a
                key={item}
                href={`#${item.toLowerCase()}`}
                className="text-sm transition-colors duration-300 hover:text-white"
                style={{ color: 'rgba(148, 163, 184, 0.8)' }}
              >
                {item}
              </a>
            ))}
            <button
              className="px-5 py-2 rounded-lg text-sm font-semibold text-white transition-all duration-300 hover:shadow-lg hover:shadow-blue-500/25 hover:scale-105"
              style={{ background: `linear-gradient(135deg, ${BLUE}, ${CYAN})` }}
            >
              {ctaPrimary}
            </button>
          </div>

          {/* mobile menu button */}
          <button
            className="md:hidden text-white"
            onClick={() => setMobileNav(!mobileNav)}
          >
            {mobileNav ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>

        {/* mobile dropdown */}
        <AnimatePresence>
          {mobileNav && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="md:hidden overflow-hidden border-t"
              style={{ background: 'rgba(6, 14, 26, 0.95)', borderColor: 'rgba(59, 130, 246, 0.1)' }}
            >
              <div className="px-6 py-4 flex flex-col gap-3">
                {['Features', 'Studies', 'Testimonials', 'Network'].map((item) => (
                  <a
                    key={item}
                    href={`#${item.toLowerCase()}`}
                    className="text-sm py-2"
                    style={{ color: 'rgba(148, 163, 184, 0.8)' }}
                    onClick={() => setMobileNav(false)}
                  >
                    {item}
                  </a>
                ))}
                <button
                  className="mt-2 px-5 py-2.5 rounded-lg text-sm font-semibold text-white"
                  style={{ background: `linear-gradient(135deg, ${BLUE}, ${CYAN})` }}
                >
                  {ctaPrimary}
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      {/* ─── hero ─── */}
      <section className="relative min-h-screen flex items-center overflow-hidden">
        {/* canvas bg */}
        <canvas
          ref={canvasRef}
          className="absolute inset-0 w-full h-full"
          style={{ opacity: 0.85 }}
        />

        {/* radial overlay */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: `radial-gradient(ellipse 60% 50% at 50% 50%, transparent 0%, ${DEEP} 100%)`,
          }}
        />

        {/* bottom gradient fade */}
        <div
          className="absolute bottom-0 left-0 right-0 h-48 pointer-events-none"
          style={{
            background: `linear-gradient(to top, ${DEEP}, transparent)`,
          }}
        />

        {/* content */}
        <div className="relative z-10 max-w-7xl mx-auto px-6 pt-24 pb-16 w-full">
          <div className="max-w-3xl">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-medium mb-8 border"
              style={{
                background: 'rgba(59, 130, 246, 0.1)',
                borderColor: 'rgba(59, 130, 246, 0.25)',
                color: CYAN,
              }}
            >
              <span
                className="w-1.5 h-1.5 rounded-full animate-pulse"
                style={{ background: CYAN }}
              />
              Trusted by 2,400+ neurologists worldwide
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
              className="text-4xl sm:text-5xl lg:text-7xl font-extrabold tracking-tight leading-[1.05] mb-6"
              style={{ color: '#fff' }}
            >
              {heroHeadline.split(' ').map((word, i) => (
                <span key={i}>
                  {['studies', 'matter'].includes(word.toLowerCase()) ? (
                    <span
                      className="bg-clip-text text-transparent"
                      style={{
                        backgroundImage: `linear-gradient(135deg, ${BLUE}, ${CYAN})`,
                      }}
                    >
                      {word}
                    </span>
                  ) : (
                    word
                  )}{' '}
                </span>
              ))}
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, delay: 0.6, ease: [0.22, 1, 0.36, 1] }}
              className="text-base sm:text-lg leading-relaxed mb-10 max-w-2xl"
              style={{ color: 'rgba(148, 163, 184, 0.85)' }}
            >
              {heroSubheadline}
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.8, ease: [0.22, 1, 0.36, 1] }}
              className="flex flex-wrap gap-4"
            >
              <button
                className="group relative px-7 py-3.5 rounded-xl text-sm font-semibold text-white overflow-hidden transition-all duration-300 hover:shadow-xl hover:shadow-blue-500/20 hover:scale-105"
                style={{ background: `linear-gradient(135deg, ${BLUE}, ${CYAN})` }}
              >
                <span className="relative z-10 flex items-center gap-2">
                  {ctaPrimary}
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </span>
              </button>
              <button
                className="px-7 py-3.5 rounded-xl text-sm font-semibold border transition-all duration-300 hover:border-blue-400/50 hover:bg-blue-500/5"
                style={{
                  color: 'rgba(148, 163, 184, 0.9)',
                  borderColor: 'rgba(59, 130, 246, 0.25)',
                }}
              >
                {ctaSecondary}
              </button>
            </motion.div>
          </div>
        </div>

        {/* scrolling hint */}
        <motion.div
          className="absolute bottom-8 left-1/2 -translate-x-1/2"
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
        >
          <div
            className="w-6 h-10 rounded-full border-2 flex items-start justify-center p-1.5"
            style={{ borderColor: 'rgba(59, 130, 246, 0.3)' }}
          >
            <motion.div
              className="w-1.5 h-1.5 rounded-full"
              style={{ background: BLUE }}
              animate={{ y: [0, 14, 0], opacity: [1, 0.3, 1] }}
              transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
            />
          </div>
        </motion.div>
      </section>

      {/* ─── stats bar ─── */}
      <section
        className="relative z-10 border-y"
        style={{
          background: `linear-gradient(180deg, ${NAVY} 0%, ${DEEP} 100%)`,
          borderColor: 'rgba(59, 130, 246, 0.12)',
        }}
      >
        <div className="max-w-7xl mx-auto px-6 py-10">
          <AnimatedSection>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {stats.map((stat, i) => (
                <motion.div
                  key={stat.label}
                  custom={i}
                  variants={fadeUp}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  className="flex items-center gap-4"
                >
                  <div
                    className="w-11 h-11 rounded-xl flex items-center justify-center shrink-0"
                    style={{
                      background: 'rgba(59, 130, 246, 0.1)',
                      color: CYAN,
                    }}
                  >
                    {statIcons[i]}
                  </div>
                  <div>
                    <div className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
                      {stat.value}
                    </div>
                    <div className="text-xs uppercase tracking-widest" style={{ color: 'rgba(148, 163, 184, 0.6)' }}>
                      {stat.label}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* ─── features ─── */}
      <section id="features" className="py-24 sm:py-32" style={{ background: DEEP }}>
        <div className="max-w-7xl mx-auto px-6">
          <AnimatedSection className="text-center mb-16">
            <motion.p
              custom={0}
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="text-xs uppercase tracking-[0.25em] font-semibold mb-4"
              style={{ color: CYAN }}
            >
              Platform Capabilities
            </motion.p>
            <motion.h2
              custom={1}
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white tracking-tight"
            >
              Built for the clinical
              <br />
              <span
                className="bg-clip-text text-transparent"
                style={{ backgroundImage: `linear-gradient(135deg, ${BLUE}, ${CYAN})` }}
              >
                research workflow
              </span>
            </motion.h2>
          </AnimatedSection>

          <div className="grid md:grid-cols-2 gap-5">
            {features.map((f, i) => (
              <motion.div
                key={f.title}
                custom={i}
                variants={scaleIn}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                className="group relative rounded-2xl p-8 border transition-all duration-500 hover:border-blue-500/30 overflow-hidden"
                style={{
                  background: `linear-gradient(135deg, rgba(30, 41, 59, 0.5), rgba(10, 22, 40, 0.8))`,
                  borderColor: 'rgba(59, 130, 246, 0.1)',
                }}
              >
                {/* hover glow */}
                <div
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none"
                  style={{
                    background: `radial-gradient(circle at 30% 30%, rgba(59, 130, 246, 0.08), transparent 60%)`,
                  }}
                />

                <div className="relative z-10">
                  <div
                    className="w-12 h-12 rounded-xl flex items-center justify-center mb-5 transition-all duration-500 group-hover:scale-110"
                    style={{
                      background: `linear-gradient(135deg, rgba(59, 130, 246, 0.15), rgba(6, 182, 212, 0.1))`,
                      color: BLUE,
                    }}
                  >
                    {featureIcons[f.icon]}
                  </div>
                  <h3 className="text-lg font-bold text-white mb-3 tracking-tight">{f.title}</h3>
                  <p className="text-sm leading-relaxed" style={{ color: 'rgba(148, 163, 184, 0.75)' }}>
                    {f.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── active studies ─── */}
      <section
        id="studies"
        className="py-24 sm:py-32 border-t"
        style={{
          background: `linear-gradient(180deg, ${DEEP} 0%, ${NAVY} 50%, ${DEEP} 100%)`,
          borderColor: 'rgba(59, 130, 246, 0.08)',
        }}
      >
        <div className="max-w-7xl mx-auto px-6">
          <AnimatedSection className="mb-16">
            <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-6">
              <div>
                <motion.p
                  custom={0}
                  variants={fadeUp}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  className="text-xs uppercase tracking-[0.25em] font-semibold mb-4"
                  style={{ color: CYAN }}
                >
                  Clinical Trials
                </motion.p>
                <motion.h2
                  custom={1}
                  variants={fadeUp}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white tracking-tight"
                >
                  Active studies
                </motion.h2>
              </div>
              <motion.button
                custom={2}
                variants={fadeUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                className="flex items-center gap-2 text-sm font-medium transition-colors duration-300 hover:text-white shrink-0"
                style={{ color: BLUE }}
              >
                View all studies <ArrowRight className="w-4 h-4" />
              </motion.button>
            </div>
          </AnimatedSection>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
            {studies.slice(0, 6).map((study, i) => {
              const pct = study.target > 0 ? Math.round((study.patients / study.target) * 100) : 0
              return (
                <motion.div
                  key={study.title}
                  custom={i}
                  variants={scaleIn}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  className="group rounded-2xl border p-6 transition-all duration-500 hover:border-blue-500/30 cursor-pointer relative overflow-hidden"
                  style={{
                    background: `rgba(30, 41, 59, 0.3)`,
                    borderColor: 'rgba(59, 130, 246, 0.1)',
                  }}
                >
                  {/* hover glow */}
                  <div
                    className="absolute top-0 right-0 w-40 h-40 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none"
                    style={{
                      background: `radial-gradient(circle, rgba(6, 182, 212, 0.08), transparent 70%)`,
                    }}
                  />

                  <div className="relative z-10">
                    {/* header */}
                    <div className="flex items-start justify-between mb-4">
                      <span
                        className="px-2.5 py-1 rounded-md text-[10px] uppercase tracking-wider font-bold"
                        style={{
                          background:
                            study.status === 'Enrolling'
                              ? 'rgba(6, 182, 212, 0.15)'
                              : 'rgba(59, 130, 246, 0.1)',
                          color: study.status === 'Enrolling' ? CYAN : BLUE,
                        }}
                      >
                        {study.status}
                      </span>
                      <span
                        className="text-[10px] uppercase tracking-wider font-semibold"
                        style={{ color: 'rgba(148, 163, 184, 0.5)' }}
                      >
                        {study.phase}
                      </span>
                    </div>

                    <h3 className="text-base font-bold text-white mb-1.5 leading-snug tracking-tight">
                      {study.title}
                    </h3>
                    <p className="text-xs mb-5" style={{ color: 'rgba(148, 163, 184, 0.6)' }}>
                      {study.university} &mdash; {study.condition}
                    </p>

                    {/* progress */}
                    <div className="flex items-center justify-between text-xs mb-2" style={{ color: 'rgba(148, 163, 184, 0.6)' }}>
                      <span>
                        <span className="text-white font-semibold">{study.patients}</span> / {study.target} patients
                      </span>
                      <span className="font-mono font-bold" style={{ color: CYAN }}>
                        {pct}%
                      </span>
                    </div>
                    <div
                      className="h-1.5 rounded-full overflow-hidden"
                      style={{ background: 'rgba(59, 130, 246, 0.1)' }}
                    >
                      <motion.div
                        className="h-full rounded-full"
                        style={{ background: `linear-gradient(90deg, ${BLUE}, ${CYAN})` }}
                        initial={{ width: 0 }}
                        whileInView={{ width: `${pct}%` }}
                        viewport={{ once: true }}
                        transition={{ duration: 1.2, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] }}
                      />
                    </div>
                  </div>
                </motion.div>
              )
            })}
          </div>
        </div>
      </section>

      {/* ─── testimonials ─── */}
      <section
        id="testimonials"
        className="py-24 sm:py-32 border-t"
        style={{
          background: DEEP,
          borderColor: 'rgba(59, 130, 246, 0.08)',
        }}
      >
        <div className="max-w-7xl mx-auto px-6">
          <AnimatedSection className="text-center mb-16">
            <motion.p
              custom={0}
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="text-xs uppercase tracking-[0.25em] font-semibold mb-4"
              style={{ color: CYAN }}
            >
              From the Network
            </motion.p>
            <motion.h2
              custom={1}
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white tracking-tight"
            >
              Trusted by leading
              <br />
              <span
                className="bg-clip-text text-transparent"
                style={{ backgroundImage: `linear-gradient(135deg, ${BLUE}, ${CYAN})` }}
              >
                neurologists
              </span>
            </motion.h2>
          </AnimatedSection>

          {/* carousel */}
          <div className="max-w-3xl mx-auto">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeTestimonial}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                className="text-center"
              >
                <Quote className="w-10 h-10 mx-auto mb-8 opacity-30" style={{ color: BLUE }} />
                <blockquote className="text-xl sm:text-2xl font-light leading-relaxed mb-8 text-white/90">
                  &ldquo;{testimonials[activeTestimonial].quote}&rdquo;
                </blockquote>
                <div className="flex flex-col items-center gap-3">
                  <div
                    className="w-12 h-12 rounded-full flex items-center justify-center text-sm font-bold"
                    style={{
                      background: `linear-gradient(135deg, ${BLUE}, ${CYAN})`,
                      color: '#fff',
                    }}
                  >
                    {testimonials[activeTestimonial].avatar}
                  </div>
                  <div>
                    <div className="text-white font-semibold text-sm">
                      {testimonials[activeTestimonial].name}
                    </div>
                    <div className="text-xs mt-0.5" style={{ color: 'rgba(148, 163, 184, 0.6)' }}>
                      {testimonials[activeTestimonial].credential}
                    </div>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>

            {/* dots + arrows */}
            <div className="flex items-center justify-center gap-5 mt-10">
              <button
                onClick={() =>
                  setActiveTestimonial(
                    (p) => (p - 1 + testimonials.length) % testimonials.length
                  )
                }
                className="w-9 h-9 rounded-full border flex items-center justify-center transition-all duration-300 hover:border-blue-400/50 hover:bg-blue-500/5"
                style={{ borderColor: 'rgba(59, 130, 246, 0.2)', color: 'rgba(148,163,184,0.6)' }}
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <div className="flex gap-2">
                {testimonials.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setActiveTestimonial(i)}
                    className={cn(
                      'h-1.5 rounded-full transition-all duration-500',
                      i === activeTestimonial ? 'w-8' : 'w-1.5'
                    )}
                    style={{
                      background:
                        i === activeTestimonial
                          ? `linear-gradient(90deg, ${BLUE}, ${CYAN})`
                          : 'rgba(59, 130, 246, 0.2)',
                    }}
                  />
                ))}
              </div>
              <button
                onClick={() =>
                  setActiveTestimonial((p) => (p + 1) % testimonials.length)
                }
                className="w-9 h-9 rounded-full border flex items-center justify-center transition-all duration-300 hover:border-blue-400/50 hover:bg-blue-500/5"
                style={{ borderColor: 'rgba(59, 130, 246, 0.2)', color: 'rgba(148,163,184,0.6)' }}
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* ─── CTA ─── */}
      <section
        id="network"
        className="py-24 sm:py-32 border-t relative overflow-hidden"
        style={{
          background: NAVY,
          borderColor: 'rgba(59, 130, 246, 0.08)',
        }}
      >
        {/* ambient glow */}
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full pointer-events-none"
          style={{
            background: `radial-gradient(circle, rgba(59, 130, 246, 0.08) 0%, transparent 70%)`,
          }}
        />

        <div className="relative z-10 max-w-3xl mx-auto px-6 text-center">
          <AnimatedSection>
            <motion.div
              custom={0}
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-medium mb-8 border"
              style={{
                background: 'rgba(59, 130, 246, 0.1)',
                borderColor: 'rgba(59, 130, 246, 0.25)',
                color: CYAN,
              }}
            >
              <span
                className="w-1.5 h-1.5 rounded-full animate-pulse"
                style={{ background: CYAN }}
              />
              Free for referring physicians
            </motion.div>

            <motion.h2
              custom={1}
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white tracking-tight mb-6"
            >
              Join the neural
              <br />
              <span
                className="bg-clip-text text-transparent"
                style={{ backgroundImage: `linear-gradient(135deg, ${BLUE}, ${CYAN})` }}
              >
                network
              </span>
            </motion.h2>

            <motion.p
              custom={2}
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="text-base sm:text-lg leading-relaxed mb-10"
              style={{ color: 'rgba(148, 163, 184, 0.75)' }}
            >
              Connect with 47 university clinics, access 180+ active studies, and give your patients a pathway to cutting-edge neuroscience therapies.
            </motion.p>

            <motion.div
              custom={3}
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="flex flex-wrap justify-center gap-4"
            >
              <button
                className="group px-8 py-4 rounded-xl text-sm font-semibold text-white transition-all duration-300 hover:shadow-xl hover:shadow-blue-500/25 hover:scale-105"
                style={{ background: `linear-gradient(135deg, ${BLUE}, ${CYAN})` }}
              >
                <span className="flex items-center gap-2">
                  {ctaPrimary}
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </span>
              </button>
              <button
                className="px-8 py-4 rounded-xl text-sm font-semibold border transition-all duration-300 hover:border-blue-400/50 hover:bg-blue-500/5"
                style={{
                  color: 'rgba(148, 163, 184, 0.9)',
                  borderColor: 'rgba(59, 130, 246, 0.25)',
                }}
              >
                Schedule a demo
              </button>
            </motion.div>
          </AnimatedSection>
        </div>
      </section>

      {/* ─── footer ─── */}
      <footer
        className="border-t py-16"
        style={{
          background: DEEP,
          borderColor: 'rgba(59, 130, 246, 0.08)',
        }}
      >
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid md:grid-cols-4 gap-10 mb-12">
            {/* brand */}
            <div className="md:col-span-1">
              <div className="flex items-center gap-3 mb-4">
                <div
                  className="w-8 h-8 rounded-lg flex items-center justify-center"
                  style={{ background: `linear-gradient(135deg, ${BLUE}, ${CYAN})` }}
                >
                  <Zap className="w-4 h-4 text-white" />
                </div>
                <span className="text-white font-bold text-lg tracking-tight">{brandName}</span>
              </div>
              <p className="text-xs leading-relaxed" style={{ color: 'rgba(148, 163, 184, 0.5)' }}>
                Bridging neurology and clinical discovery. Connecting physicians with the studies that advance patient care.
              </p>
            </div>

            {/* link columns */}
            {[
              {
                title: 'Platform',
                links: ['How it Works', 'For Neurologists', 'For Clinics', 'Pricing'],
              },
              {
                title: 'Studies',
                links: ['Browse Studies', 'By Condition', 'By Phase', 'Submit a Study'],
              },
              {
                title: 'Company',
                links: ['About', 'Careers', 'Contact', 'Privacy Policy'],
              },
            ].map((col) => (
              <div key={col.title}>
                <h4
                  className="text-xs uppercase tracking-[0.2em] font-bold mb-4"
                  style={{ color: 'rgba(148, 163, 184, 0.4)' }}
                >
                  {col.title}
                </h4>
                <ul className="space-y-2.5">
                  {col.links.map((link) => (
                    <li key={link}>
                      <a
                        href="#"
                        className="text-sm transition-colors duration-300 hover:text-white"
                        style={{ color: 'rgba(148, 163, 184, 0.6)' }}
                      >
                        {link}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          {/* bottom bar */}
          <div
            className="pt-8 border-t flex flex-col sm:flex-row items-center justify-between gap-4"
            style={{ borderColor: 'rgba(59, 130, 246, 0.06)' }}
          >
            <p className="text-xs" style={{ color: 'rgba(148, 163, 184, 0.35)' }}>
              &copy; {new Date().getFullYear()} {brandName}. All rights reserved. HIPAA-compliant platform.
            </p>
            <div className="flex items-center gap-6">
              {['SOC 2', 'HIPAA', 'GDPR'].map((badge) => (
                <span
                  key={badge}
                  className="text-[10px] uppercase tracking-wider font-bold px-2.5 py-1 rounded-md border"
                  style={{
                    color: 'rgba(148, 163, 184, 0.35)',
                    borderColor: 'rgba(59, 130, 246, 0.1)',
                  }}
                >
                  {badge}
                </span>
              ))}
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
