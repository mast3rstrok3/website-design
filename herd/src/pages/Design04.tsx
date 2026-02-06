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

// ── palette ──────────────────────────────────────────
const CREAM = '#f5f0e8'
const INK = '#1a1a1a'
const MUTED_RED = '#9b2c2c'
const RULE = '#c4b99a'
const WARM_GRAY = '#8a7e6b'

// ── helpers ──────────────────────────────────────────
const featureIcons: Record<string, React.ReactNode> = {
  brain: <Brain size={22} />,
  shield: <Shield size={22} />,
  activity: <Activity size={22} />,
  clipboard: <ClipboardList size={22} />,
}

const statIcons = [
  <Users key="u" size={18} />,
  <FlaskConical key="f" size={18} />,
  <Building2 key="b" size={18} />,
  <HeartPulse key="h" size={18} />,
]

function today() {
  const d = new Date()
  return d.toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })
}

// ── stagger helper ───────────────────────────────────
const stagger = {
  container: {
    hidden: {},
    show: { transition: { staggerChildren: 0.07 } },
  },
  item: {
    hidden: { opacity: 0, y: 14 },
    show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' } },
  },
}

// ── Thin rule component ──────────────────────────────
function Rule({ className }: { className?: string }) {
  return <div className={cn('w-full', className)} style={{ height: 1, background: RULE }} />
}

function VerticalRule({ className }: { className?: string }) {
  return (
    <div
      className={cn('self-stretch hidden lg:block', className)}
      style={{ width: 1, background: RULE }}
    />
  )
}

// ── drop cap ─────────────────────────────────────────
function DropCapParagraph({
  children,
  className,
}: {
  children: string
  className?: string
}) {
  const first = children.charAt(0)
  const rest = children.slice(1)
  return (
    <p className={cn('leading-relaxed', className)} style={{ fontFamily: "'Inter', sans-serif" }}>
      <span
        className="float-left mr-2 leading-none"
        style={{
          fontFamily: "'Libre Baskerville', serif",
          fontSize: '3.4rem',
          lineHeight: '0.8',
          paddingTop: '0.1em',
          color: MUTED_RED,
          fontWeight: 700,
        }}
      >
        {first}
      </span>
      {rest}
    </p>
  )
}

// ══════════════════════════════════════════════════════
//  MAIN COMPONENT
// ══════════════════════════════════════════════════════
export default function Design04() {
  const pageRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({ target: pageRef })
  const headerOpacity = useTransform(scrollYProgress, [0, 0.04], [1, 0])
  const headerY = useTransform(scrollYProgress, [0, 0.04], [0, -30])

  return (
    <div
      ref={pageRef}
      className="design-page relative"
      style={{
        background: CREAM,
        color: INK,
        fontFamily: "'Inter', sans-serif",
      }}
    >
      {/* ── FLOATING NAV ──────────────────────────── */}
      <motion.nav
        initial={{ y: -60 }}
        animate={{ y: 0 }}
        transition={{ delay: 0.3, duration: 0.5, ease: 'easeOut' }}
        className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-5 py-2"
        style={{
          background: 'rgba(245,240,232,0.92)',
          backdropFilter: 'blur(12px)',
          borderBottom: `1px solid ${RULE}`,
        }}
      >
        <Link
          to="/3"
          className="flex items-center gap-1 text-sm transition-colors"
          style={{ color: WARM_GRAY, fontFamily: "'Inter', sans-serif" }}
        >
          <ChevronLeft size={16} />
          <span className="hidden sm:inline">Prev</span>
        </Link>
        <span
          className="text-xs tracking-widest uppercase"
          style={{ color: WARM_GRAY, fontFamily: "'Inter', sans-serif", letterSpacing: '0.15em' }}
        >
          Design 04 / 15 &mdash;{' '}
          <Link to="/" className="underline underline-offset-2" style={{ color: WARM_GRAY }}>
            Gallery
          </Link>
        </span>
        <Link
          to="/5"
          className="flex items-center gap-1 text-sm transition-colors"
          style={{ color: WARM_GRAY, fontFamily: "'Inter', sans-serif" }}
        >
          <span className="hidden sm:inline">Next</span>
          <ChevronRight size={16} />
        </Link>
      </motion.nav>

      {/* ── MASTHEAD ──────────────────────────────── */}
      <motion.header
        style={{ opacity: headerOpacity, y: headerY }}
        className="pt-16 pb-0 text-center select-none"
      >
        <div className="max-w-5xl mx-auto px-6 pt-10">
          {/* top thin rule */}
          <Rule className="mb-3" />

          {/* dateline row */}
          <div
            className="flex items-center justify-between text-xs mb-1 uppercase tracking-widest"
            style={{ color: WARM_GRAY, fontFamily: "'Inter', sans-serif", letterSpacing: '0.12em' }}
          >
            <span>Vol. I &middot; No. 1</span>
            <span>{today()}</span>
            <span>Est. 2024</span>
          </div>

          <Rule className="mb-6" />

          {/* newspaper name */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
            className="mb-1"
            style={{
              fontFamily: "'Libre Baskerville', serif",
              fontSize: 'clamp(3rem, 8vw, 6.5rem)',
              fontWeight: 700,
              lineHeight: 1,
              letterSpacing: '-0.02em',
              color: INK,
            }}
          >
            {brandName}
          </motion.h1>

          {/* tagline under name */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.6 }}
            className="italic mb-6"
            style={{
              fontFamily: "'Libre Baskerville', serif",
              fontSize: '0.95rem',
              color: WARM_GRAY,
            }}
          >
            {tagline}
          </motion.p>

          {/* double rule */}
          <div className="mb-1" style={{ height: 3, background: INK }} />
          <Rule />
        </div>
      </motion.header>

      {/* ── FRONT PAGE: HEADLINE + SIDEBAR ────────── */}
      <section className="max-w-5xl mx-auto px-6 pt-10 pb-8">
        <motion.div
          variants={stagger.container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.2 }}
          className="grid grid-cols-1 lg:grid-cols-12 gap-0"
        >
          {/* main headline column (8 cols) */}
          <motion.div variants={stagger.item} className="lg:col-span-8 lg:pr-8">
            <h2
              style={{
                fontFamily: "'Libre Baskerville', serif",
                fontSize: 'clamp(1.8rem, 4vw, 2.8rem)',
                fontWeight: 700,
                lineHeight: 1.15,
                color: INK,
              }}
              className="mb-6"
            >
              {heroHeadline}
            </h2>

            <DropCapParagraph className="text-base mb-5" >
              {heroSubheadline}
            </DropCapParagraph>

            <p
              className="text-sm leading-relaxed mb-6"
              style={{ color: '#4a4a4a', fontFamily: "'Inter', sans-serif" }}
            >
              The platform streamlines the referral process between practicing neurologists and
              university-led clinical trials, reducing enrollment timelines and ensuring patients
              gain access to the most relevant investigational treatments. With built-in compliance
              tooling and real-time tracking, Herd removes the administrative friction that has long
              plagued clinical research coordination.
            </p>

            {/* CTA row */}
            <motion.div variants={stagger.item} className="flex flex-wrap gap-4 mb-8">
              <button
                className="group flex items-center gap-2 px-6 py-3 text-sm font-semibold tracking-wide transition-all duration-200"
                style={{
                  background: INK,
                  color: CREAM,
                  fontFamily: "'Inter', sans-serif",
                }}
              >
                {ctaPrimary}
                <ArrowRight
                  size={15}
                  className="transition-transform group-hover:translate-x-1"
                />
              </button>
              <button
                className="px-6 py-3 text-sm font-semibold tracking-wide transition-all duration-200"
                style={{
                  background: 'transparent',
                  color: INK,
                  border: `1.5px solid ${INK}`,
                  fontFamily: "'Inter', sans-serif",
                }}
              >
                {ctaSecondary}
              </button>
            </motion.div>
          </motion.div>

          {/* vertical rule */}
          <VerticalRule />

          {/* sidebar stats column (4 cols) */}
          <motion.aside
            variants={stagger.item}
            className="lg:col-span-3 lg:pl-8 pt-6 lg:pt-0"
          >
            <h3
              className="text-xs uppercase tracking-widest mb-5 pb-2"
              style={{
                fontFamily: "'Inter', sans-serif",
                color: MUTED_RED,
                letterSpacing: '0.18em',
                borderBottom: `1px solid ${RULE}`,
              }}
            >
              By the Numbers
            </h3>
            <div className="space-y-5">
              {stats.map((s, i) => (
                <div key={s.label}>
                  <div className="flex items-center gap-2 mb-1" style={{ color: WARM_GRAY }}>
                    {statIcons[i]}
                    <span
                      className="text-xs uppercase tracking-wider"
                      style={{ fontFamily: "'Inter', sans-serif", letterSpacing: '0.1em' }}
                    >
                      {s.label}
                    </span>
                  </div>
                  <div
                    className="font-bold"
                    style={{
                      fontFamily: "'Libre Baskerville', serif",
                      fontSize: '1.9rem',
                      lineHeight: 1.1,
                      color: INK,
                    }}
                  >
                    {s.value}
                  </div>
                  {i < stats.length - 1 && <Rule className="mt-4" />}
                </div>
              ))}
            </div>
          </motion.aside>
        </motion.div>
      </section>

      {/* ── SECTION RULE ──────────────────────────── */}
      <div className="max-w-5xl mx-auto px-6">
        <div style={{ height: 3, background: INK }} />
        <Rule className="mt-1" />
      </div>

      {/* ── FEATURES: ARTICLE COLUMNS ─────────────── */}
      <section className="max-w-5xl mx-auto px-6 py-12">
        <motion.h2
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-2"
          style={{
            fontFamily: "'Libre Baskerville', serif",
            fontSize: 'clamp(1.4rem, 3vw, 2rem)',
            fontWeight: 700,
            color: INK,
          }}
        >
          Platform Capabilities
        </motion.h2>
        <p
          className="text-center text-xs uppercase tracking-widest mb-8"
          style={{ color: WARM_GRAY, letterSpacing: '0.15em' }}
        >
          A report on core features &amp; functionality
        </p>
        <Rule className="mb-10" />

        <motion.div
          variants={stagger.container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.15 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-0"
        >
          {features.map((f, i) => (
            <motion.article
              key={f.title}
              variants={stagger.item}
              className={cn('px-5 py-2', i < features.length - 1 && 'md:border-r')}
              style={{ borderColor: RULE }}
            >
              <div className="flex items-center gap-2 mb-3" style={{ color: MUTED_RED }}>
                {featureIcons[f.icon]}
                <h3
                  className="font-bold text-sm"
                  style={{
                    fontFamily: "'Libre Baskerville', serif",
                    color: INK,
                  }}
                >
                  {f.title}
                </h3>
              </div>
              <p
                className="text-sm leading-relaxed"
                style={{ color: '#4a4a4a', fontFamily: "'Inter', sans-serif" }}
              >
                {f.description}
              </p>
            </motion.article>
          ))}
        </motion.div>
      </section>

      {/* ── SECTION RULE ──────────────────────────── */}
      <div className="max-w-5xl mx-auto px-6">
        <div style={{ height: 3, background: INK }} />
        <Rule className="mt-1" />
      </div>

      {/* ── STUDIES: CLASSIFIED-STYLE LISTINGS ────── */}
      <section className="max-w-5xl mx-auto px-6 py-12">
        <motion.h2
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-1"
          style={{
            fontFamily: "'Libre Baskerville', serif",
            fontSize: 'clamp(1.4rem, 3vw, 2rem)',
            fontWeight: 700,
            color: INK,
          }}
        >
          Active Listings
        </motion.h2>
        <p
          className="text-xs uppercase tracking-widest mb-6"
          style={{ color: WARM_GRAY, letterSpacing: '0.15em' }}
        >
          Clinical studies currently seeking enrollment
        </p>
        <Rule className="mb-0" />

        <motion.div
          variants={stagger.container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.1 }}
          className="grid grid-cols-1 md:grid-cols-2 gap-0"
        >
          {studies.map((s, i) => {
            const pct = s.target > 0 ? Math.round((s.patients / s.target) * 100) : 0
            return (
              <motion.div
                key={s.title}
                variants={stagger.item}
                className={cn(
                  'py-5 px-4',
                  i % 2 === 0 && 'md:border-r',
                )}
                style={{ borderColor: RULE, borderBottom: `1px solid ${RULE}` }}
              >
                {/* phase + condition tag */}
                <div className="flex items-center gap-2 mb-2">
                  <span
                    className="text-[10px] uppercase tracking-wider font-semibold px-2 py-0.5"
                    style={{
                      background: MUTED_RED,
                      color: CREAM,
                      letterSpacing: '0.1em',
                    }}
                  >
                    {s.phase}
                  </span>
                  <span
                    className="text-[10px] uppercase tracking-wider font-semibold px-2 py-0.5"
                    style={{
                      background: INK,
                      color: CREAM,
                      letterSpacing: '0.1em',
                    }}
                  >
                    {s.condition}
                  </span>
                </div>

                <h4
                  className="font-bold mb-1"
                  style={{
                    fontFamily: "'Libre Baskerville', serif",
                    fontSize: '1rem',
                    lineHeight: 1.3,
                    color: INK,
                  }}
                >
                  {s.title}
                </h4>
                <p
                  className="text-xs mb-3"
                  style={{ color: WARM_GRAY, fontFamily: "'Inter', sans-serif" }}
                >
                  {s.university} &middot;{' '}
                  <span style={{ color: s.status === 'Enrolling' ? '#2d6a4f' : WARM_GRAY }}>
                    {s.status}
                  </span>
                </p>

                {/* enrollment bar */}
                <div className="flex items-center gap-3">
                  <div
                    className="flex-1 h-1.5 rounded-full overflow-hidden"
                    style={{ background: RULE }}
                  >
                    <motion.div
                      initial={{ width: 0 }}
                      whileInView={{ width: `${pct}%` }}
                      viewport={{ once: true }}
                      transition={{ duration: 1, ease: 'easeOut', delay: 0.2 }}
                      className="h-full rounded-full"
                      style={{ background: MUTED_RED }}
                    />
                  </div>
                  <span
                    className="text-xs font-semibold tabular-nums whitespace-nowrap"
                    style={{ color: WARM_GRAY, fontFamily: "'Inter', sans-serif" }}
                  >
                    {s.patients}/{s.target}
                  </span>
                </div>
              </motion.div>
            )
          })}
        </motion.div>
      </section>

      {/* ── SECTION RULE ──────────────────────────── */}
      <div className="max-w-5xl mx-auto px-6">
        <div style={{ height: 3, background: INK }} />
        <Rule className="mt-1" />
      </div>

      {/* ── TESTIMONIALS: PULL QUOTES ─────────────── */}
      <section className="max-w-5xl mx-auto px-6 py-12">
        <motion.h2
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-1"
          style={{
            fontFamily: "'Libre Baskerville', serif",
            fontSize: 'clamp(1.4rem, 3vw, 2rem)',
            fontWeight: 700,
            color: INK,
          }}
        >
          Voices from the Field
        </motion.h2>
        <p
          className="text-center text-xs uppercase tracking-widest mb-8"
          style={{ color: WARM_GRAY, letterSpacing: '0.15em' }}
        >
          Testimony from physicians &amp; investigators
        </p>
        <Rule className="mb-10" />

        <motion.div
          variants={stagger.container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.15 }}
          className="grid grid-cols-1 md:grid-cols-2 gap-0"
        >
          {testimonials.map((t, i) => (
            <motion.blockquote
              key={t.name}
              variants={stagger.item}
              className={cn(
                'py-6 px-6',
                i % 2 === 0 && 'md:border-r',
                i < testimonials.length - 2 && 'border-b',
                /* on mobile every item except last gets border-b */
                i < testimonials.length - 1 && 'max-md:border-b',
              )}
              style={{ borderColor: RULE }}
            >
              {/* Large opening quote mark */}
              <span
                aria-hidden
                className="block leading-none select-none mb-1"
                style={{
                  fontFamily: "'Libre Baskerville', serif",
                  fontSize: '3.5rem',
                  lineHeight: '0.8',
                  color: MUTED_RED,
                  opacity: 0.4,
                }}
              >
                &ldquo;
              </span>
              <p
                className="italic mb-4 leading-relaxed"
                style={{
                  fontFamily: "'Libre Baskerville', serif",
                  fontSize: '0.95rem',
                  color: INK,
                }}
              >
                {t.quote}
              </p>
              <footer className="flex items-center gap-3">
                <div
                  className="w-9 h-9 rounded-full flex items-center justify-center text-xs font-bold shrink-0"
                  style={{
                    background: INK,
                    color: CREAM,
                    fontFamily: "'Inter', sans-serif",
                  }}
                >
                  {t.avatar}
                </div>
                <div>
                  <div
                    className="font-semibold text-sm"
                    style={{ fontFamily: "'Inter', sans-serif", color: INK }}
                  >
                    {t.name}
                  </div>
                  <div
                    className="text-xs"
                    style={{ fontFamily: "'Inter', sans-serif", color: WARM_GRAY }}
                  >
                    {t.credential}
                  </div>
                </div>
              </footer>
            </motion.blockquote>
          ))}
        </motion.div>
      </section>

      {/* ── SECTION RULE ──────────────────────────── */}
      <div className="max-w-5xl mx-auto px-6">
        <div style={{ height: 3, background: INK }} />
        <Rule className="mt-1" />
      </div>

      {/* ── EDITORIAL CTA (BACK PAGE) ─────────────── */}
      <section className="max-w-5xl mx-auto px-6 py-16 text-center">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: 'easeOut' }}
        >
          <p
            className="text-xs uppercase tracking-widest mb-6"
            style={{ color: WARM_GRAY, letterSpacing: '0.18em', fontFamily: "'Inter', sans-serif" }}
          >
            A message from the editors
          </p>

          <h2
            className="mb-6"
            style={{
              fontFamily: "'Libre Baskerville', serif",
              fontSize: 'clamp(1.6rem, 4vw, 2.6rem)',
              fontWeight: 700,
              lineHeight: 1.2,
              color: INK,
            }}
          >
            The future of neurology research
            <br />
            begins with collaboration.
          </h2>

          <p
            className="max-w-xl mx-auto mb-8 leading-relaxed"
            style={{ fontFamily: "'Inter', sans-serif", fontSize: '0.95rem', color: '#4a4a4a' }}
          >
            Join a growing network of physicians and institutions working together to accelerate
            neurological discovery. Your patients deserve access to tomorrow's treatments, today.
          </p>

          <div className="flex flex-wrap justify-center gap-4">
            <button
              className="group flex items-center gap-2 px-8 py-3.5 text-sm font-semibold tracking-wide transition-all duration-200"
              style={{
                background: MUTED_RED,
                color: CREAM,
                fontFamily: "'Inter', sans-serif",
              }}
            >
              {ctaPrimary}
              <ArrowRight size={15} className="transition-transform group-hover:translate-x-1" />
            </button>
            <button
              className="px-8 py-3.5 text-sm font-semibold tracking-wide transition-all duration-200"
              style={{
                background: 'transparent',
                color: INK,
                border: `1.5px solid ${INK}`,
                fontFamily: "'Inter', sans-serif",
              }}
            >
              {ctaSecondary}
            </button>
          </div>
        </motion.div>
      </section>

      {/* ── FOOTER (COLOPHON) ─────────────────────── */}
      <footer className="max-w-5xl mx-auto px-6 pb-12">
        <Rule className="mb-6" />
        <div
          className="flex flex-col md:flex-row items-center justify-between gap-4 text-xs"
          style={{ color: WARM_GRAY, fontFamily: "'Inter', sans-serif" }}
        >
          <span>
            &copy; {new Date().getFullYear()}{' '}
            <span style={{ fontFamily: "'Libre Baskerville', serif", fontWeight: 700 }}>
              {brandName}
            </span>
            . All rights reserved.
          </span>
          <span className="flex items-center gap-4">
            <span>Privacy</span>
            <span>&middot;</span>
            <span>Terms</span>
            <span>&middot;</span>
            <span>Contact</span>
          </span>
        </div>

        {/* prev/next navigation */}
        <Rule className="my-6" />
        <div className="flex items-center justify-between">
          <Link
            to="/3"
            className="flex items-center gap-2 text-sm font-semibold transition-colors"
            style={{ color: INK, fontFamily: "'Inter', sans-serif" }}
          >
            <ChevronLeft size={16} />
            Previous Design
          </Link>
          <Link
            to="/5"
            className="flex items-center gap-2 text-sm font-semibold transition-colors"
            style={{ color: INK, fontFamily: "'Inter', sans-serif" }}
          >
            Next Design
            <ChevronRight size={16} />
          </Link>
        </div>
      </footer>
    </div>
  )
}
