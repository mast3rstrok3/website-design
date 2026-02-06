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
  ChevronRight,
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

// ---------------------------------------------------------------------------
// Swiss Clinic — Design #02
// Josef Muller-Brockmann grid discipline. Typography-only. No images.
// Palette: #ffffff, #000000, #dc2626. Font: Inter.
// Zero decoration. No gradients, no shadows, no rounded corners.
// ---------------------------------------------------------------------------

const FONT = 'Inter, system-ui, sans-serif'

const iconMap: Record<string, React.ComponentType<{ size?: number; strokeWidth?: number }>> = {
  brain: Brain,
  shield: Shield,
  activity: Activity,
  clipboard: ClipboardList,
}

// Stagger helper
const stagger = {
  container: {
    hidden: {},
    show: { transition: { staggerChildren: 0.08, delayChildren: 0.1 } },
  },
  item: {
    hidden: { opacity: 0, y: 16 },
    show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.25, 0.1, 0.25, 1] } },
  },
}

// Section wrapper for viewport-triggered animations
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
      viewport={{ once: true, amount: 0.15 }}
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

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------

export default function Design02() {
  const heroRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ['start start', 'end start'],
  })
  const heroY = useTransform(scrollYProgress, [0, 1], ['0%', '20%'])
  const heroOpacity = useTransform(scrollYProgress, [0, 0.8], [1, 0])

  return (
    <div
      className="design-page bg-white text-black selection:bg-red-600 selection:text-white"
      style={{ fontFamily: FONT }}
    >
      {/* ----------------------------------------------------------------- */}
      {/* Floating Nav Bar */}
      {/* ----------------------------------------------------------------- */}
      <motion.nav
        initial={{ y: -60 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5, ease: [0.25, 0.1, 0.25, 1] }}
        className="fixed top-0 left-0 right-0 z-50 bg-white border-b border-black"
      >
        <div className="max-w-[1400px] mx-auto px-6 h-12 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link
              to="/"
              className="text-[11px] font-medium tracking-[0.15em] uppercase text-black/50 hover:text-black transition-colors"
            >
              Gallery
            </Link>
            <span className="text-black/20">/</span>
            <span className="text-[11px] font-bold tracking-[0.15em] uppercase">
              02 Swiss Clinic
            </span>
          </div>
          <div className="flex items-center gap-1">
            <Link
              to="/1"
              className="flex items-center gap-1 px-3 h-8 text-[11px] font-medium tracking-[0.1em] uppercase border border-black hover:bg-black hover:text-white transition-colors"
            >
              <ArrowLeft size={12} strokeWidth={2} />
              Prev
            </Link>
            <Link
              to="/3"
              className="flex items-center gap-1 px-3 h-8 text-[11px] font-medium tracking-[0.1em] uppercase border border-black hover:bg-black hover:text-white transition-colors"
            >
              Next
              <ArrowRight size={12} strokeWidth={2} />
            </Link>
          </div>
        </div>
      </motion.nav>

      {/* ----------------------------------------------------------------- */}
      {/* Site Nav */}
      {/* ----------------------------------------------------------------- */}
      <header className="pt-12 border-b border-black">
        <div className="max-w-[1400px] mx-auto px-6">
          <div className="h-16 flex items-center justify-between">
            <div className="flex items-baseline gap-3">
              <span className="text-[22px] font-black tracking-[-0.03em] uppercase">
                {brandName}
              </span>
              <span className="hidden sm:inline text-[11px] font-normal tracking-[0.05em] text-black/40 uppercase">
                {tagline}
              </span>
            </div>
            <nav className="hidden md:flex items-center gap-8">
              {['Studies', 'Features', 'Network', 'Contact'].map((item) => (
                <a
                  key={item}
                  href={`#${item.toLowerCase()}`}
                  className="text-[11px] font-medium tracking-[0.15em] uppercase text-black/60 hover:text-black transition-colors"
                >
                  {item}
                </a>
              ))}
              <button className="h-10 px-5 bg-red-600 text-white text-[11px] font-bold tracking-[0.15em] uppercase hover:bg-red-700 transition-colors">
                {ctaPrimary}
              </button>
            </nav>
          </div>
        </div>
      </header>

      {/* ----------------------------------------------------------------- */}
      {/* Hero — Massive Typography */}
      {/* ----------------------------------------------------------------- */}
      <div ref={heroRef} className="relative overflow-hidden border-b border-black">
        <motion.div
          style={{ y: heroY, opacity: heroOpacity }}
          className="max-w-[1400px] mx-auto px-6 pt-24 pb-32 md:pt-40 md:pb-48"
        >
          <Section>
            <Item>
              <p className="text-[11px] font-bold tracking-[0.3em] uppercase text-red-600 mb-8">
                The Neurology Research Network
              </p>
            </Item>
            <Item>
              <h1 className="text-[clamp(2.5rem,8vw,8rem)] font-black leading-[0.9] tracking-[-0.04em] uppercase max-w-[14ch]">
                {heroHeadline}
              </h1>
            </Item>
            <Item>
              <div className="mt-12 md:mt-16 grid grid-cols-1 md:grid-cols-12 gap-8">
                <p className="md:col-start-1 md:col-span-5 text-[15px] leading-[1.7] text-black/60 font-normal">
                  {heroSubheadline}
                </p>
                <div className="md:col-start-7 md:col-span-6 flex flex-wrap gap-3">
                  <button className="h-12 px-8 bg-red-600 text-white text-[12px] font-bold tracking-[0.15em] uppercase hover:bg-red-700 transition-colors">
                    {ctaPrimary}
                  </button>
                  <button className="h-12 px-8 border-2 border-black text-[12px] font-bold tracking-[0.15em] uppercase hover:bg-black hover:text-white transition-colors">
                    {ctaSecondary}
                  </button>
                </div>
              </div>
            </Item>
          </Section>
        </motion.div>
      </div>

      {/* ----------------------------------------------------------------- */}
      {/* Stats — Strict 4-Column Grid */}
      {/* ----------------------------------------------------------------- */}
      <div className="border-b border-black">
        <div className="max-w-[1400px] mx-auto">
          <Section className="grid grid-cols-2 md:grid-cols-4">
            {stats.map((stat, i) => (
              <Item
                key={stat.label}
                className={cn(
                  'px-6 py-12 md:py-16',
                  i < stats.length - 1 && 'border-r border-black',
                  i === 1 && 'border-r-0 md:border-r',
                  i === 0 && 'border-r border-black',
                  'border-b md:border-b-0 border-black',
                  i >= 2 && 'border-b-0'
                )}
              >
                <div className="text-[clamp(2rem,5vw,4.5rem)] font-black tracking-[-0.03em] leading-none text-red-600">
                  {stat.value}
                </div>
                <div className="mt-3 text-[11px] font-medium tracking-[0.2em] uppercase text-black/50">
                  {stat.label}
                </div>
              </Item>
            ))}
          </Section>
        </div>
      </div>

      {/* ----------------------------------------------------------------- */}
      {/* Features */}
      {/* ----------------------------------------------------------------- */}
      <div id="features" className="border-b border-black">
        <div className="max-w-[1400px] mx-auto px-6 py-24 md:py-32">
          <Section>
            <Item>
              <div className="grid grid-cols-1 md:grid-cols-12 gap-8 mb-20">
                <div className="md:col-span-4">
                  <p className="text-[11px] font-bold tracking-[0.3em] uppercase text-red-600 mb-4">
                    Platform
                  </p>
                  <h2 className="text-[clamp(1.75rem,4vw,3.5rem)] font-black leading-[0.95] tracking-[-0.03em] uppercase">
                    Built for
                    <br />
                    Clinical
                    <br />
                    Precision
                  </h2>
                </div>
                <div className="md:col-start-6 md:col-span-5 flex items-end">
                  <p className="text-[15px] leading-[1.7] text-black/50">
                    Every feature engineered to eliminate friction between neurologists and research
                    institutions. No compromises.
                  </p>
                </div>
              </div>
            </Item>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-0">
              {features.map((feature, i) => {
                const Icon = iconMap[feature.icon] || Brain
                return (
                  <Item
                    key={feature.title}
                    className={cn(
                      'border-t border-black py-10 px-0 md:px-8 group',
                      i % 2 === 0 && 'md:border-r md:pr-12',
                      i % 2 === 1 && 'md:pl-12',
                      i >= features.length - 2 && 'border-b md:border-b-0',
                      i === features.length - 1 && 'border-b border-black'
                    )}
                  >
                    <div className="flex items-start gap-5">
                      <div className="flex-shrink-0 w-10 h-10 flex items-center justify-center border border-black/15">
                        <Icon size={18} strokeWidth={1.5} />
                      </div>
                      <div>
                        <h3 className="text-[14px] font-bold tracking-[0.05em] uppercase mb-3">
                          {feature.title}
                        </h3>
                        <p className="text-[14px] leading-[1.7] text-black/50 max-w-[38ch]">
                          {feature.description}
                        </p>
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
      {/* Studies — Tabular Grid */}
      {/* ----------------------------------------------------------------- */}
      <div id="studies" className="border-b border-black bg-black text-white">
        <div className="max-w-[1400px] mx-auto px-6 py-24 md:py-32">
          <Section>
            <Item>
              <div className="flex items-end justify-between mb-16">
                <div>
                  <p className="text-[11px] font-bold tracking-[0.3em] uppercase text-red-600 mb-4">
                    Active Trials
                  </p>
                  <h2 className="text-[clamp(1.75rem,4vw,3.5rem)] font-black leading-[0.95] tracking-[-0.03em] uppercase">
                    Open Studies
                  </h2>
                </div>
                <button className="hidden md:flex items-center gap-2 text-[11px] font-bold tracking-[0.15em] uppercase text-white/50 hover:text-white transition-colors">
                  View All Studies
                  <ArrowUpRight size={14} strokeWidth={2} />
                </button>
              </div>
            </Item>

            {/* Table header */}
            <Item>
              <div className="hidden md:grid grid-cols-12 gap-4 px-0 py-3 border-b border-white/20 text-[10px] font-bold tracking-[0.2em] uppercase text-white/30">
                <div className="col-span-4">Study</div>
                <div className="col-span-2">Institution</div>
                <div className="col-span-1">Phase</div>
                <div className="col-span-2">Condition</div>
                <div className="col-span-2">Enrollment</div>
                <div className="col-span-1">Status</div>
              </div>
            </Item>

            {/* Table rows */}
            {studies.map((study) => {
              const pct = study.target > 0 ? Math.round((study.patients / study.target) * 100) : 0
              return (
                <Item key={study.title}>
                  <div className="grid grid-cols-1 md:grid-cols-12 gap-2 md:gap-4 px-0 py-5 border-b border-white/10 hover:bg-white/[0.03] transition-colors cursor-pointer group">
                    {/* Title */}
                    <div className="md:col-span-4 flex items-center gap-2">
                      <span className="text-[14px] font-semibold tracking-[-0.01em] group-hover:text-red-500 transition-colors">
                        {study.title}
                      </span>
                      <ArrowUpRight
                        size={13}
                        strokeWidth={2}
                        className="opacity-0 group-hover:opacity-100 text-red-500 transition-opacity flex-shrink-0"
                      />
                    </div>
                    {/* Institution */}
                    <div className="md:col-span-2 text-[13px] text-white/50">
                      {study.university}
                    </div>
                    {/* Phase */}
                    <div className="md:col-span-1 text-[12px] font-bold tracking-[0.05em] uppercase text-white/70">
                      {study.phase}
                    </div>
                    {/* Condition */}
                    <div className="md:col-span-2 text-[13px] text-white/50">
                      {study.condition}
                    </div>
                    {/* Enrollment bar */}
                    <div className="md:col-span-2 flex items-center gap-3">
                      <div className="flex-1 h-[3px] bg-white/10 overflow-hidden">
                        <motion.div
                          className="h-full bg-red-600"
                          initial={{ width: 0 }}
                          whileInView={{ width: `${pct}%` }}
                          viewport={{ once: true }}
                          transition={{ duration: 0.8, ease: [0.25, 0.1, 0.25, 1], delay: 0.2 }}
                        />
                      </div>
                      <span className="text-[11px] font-medium text-white/30 tabular-nums w-[3ch] text-right">
                        {pct}%
                      </span>
                    </div>
                    {/* Status */}
                    <div className="md:col-span-1">
                      <span
                        className={cn(
                          'text-[10px] font-bold tracking-[0.1em] uppercase',
                          study.status === 'Enrolling' ? 'text-red-500' : 'text-white/30'
                        )}
                      >
                        {study.status}
                      </span>
                    </div>
                  </div>
                </Item>
              )
            })}
          </Section>
        </div>
      </div>

      {/* ----------------------------------------------------------------- */}
      {/* Testimonials */}
      {/* ----------------------------------------------------------------- */}
      <div className="border-b border-black">
        <div className="max-w-[1400px] mx-auto px-6 py-24 md:py-32">
          <Section>
            <Item>
              <p className="text-[11px] font-bold tracking-[0.3em] uppercase text-red-600 mb-4">
                Testimonials
              </p>
              <h2 className="text-[clamp(1.75rem,4vw,3.5rem)] font-black leading-[0.95] tracking-[-0.03em] uppercase mb-20">
                From the
                <br />
                Network
              </h2>
            </Item>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-0">
              {testimonials.map((t, i) => (
                <Item
                  key={t.name}
                  className={cn(
                    'py-10 md:py-12',
                    'border-t border-black',
                    i % 2 === 0 && 'md:border-r md:pr-12',
                    i % 2 === 1 && 'md:pl-12',
                    i === testimonials.length - 1 && 'border-b border-black md:border-b-0',
                    i === testimonials.length - 2 && 'border-b border-black md:border-b-0'
                  )}
                >
                  <blockquote>
                    <p className="text-[16px] md:text-[18px] leading-[1.65] font-normal text-black/70 mb-8">
                      &ldquo;{t.quote}&rdquo;
                    </p>
                    <footer className="flex items-center gap-4">
                      <div className="w-10 h-10 bg-black text-white flex items-center justify-center text-[11px] font-bold tracking-[0.05em]">
                        {t.avatar}
                      </div>
                      <div>
                        <div className="text-[13px] font-bold tracking-[0.02em]">{t.name}</div>
                        <div className="text-[11px] text-black/40 mt-0.5">{t.credential}</div>
                      </div>
                    </footer>
                  </blockquote>
                </Item>
              ))}
            </div>
          </Section>
        </div>
      </div>

      {/* ----------------------------------------------------------------- */}
      {/* CTA Band */}
      {/* ----------------------------------------------------------------- */}
      <div className="border-b border-black bg-red-600 text-white">
        <div className="max-w-[1400px] mx-auto px-6 py-24 md:py-32">
          <Section>
            <Item>
              <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-end">
                <div className="md:col-span-7">
                  <p className="text-[11px] font-bold tracking-[0.3em] uppercase text-white/50 mb-6">
                    Get Started
                  </p>
                  <h2 className="text-[clamp(2rem,5vw,4.5rem)] font-black leading-[0.9] tracking-[-0.04em] uppercase">
                    Join 2,400+
                    <br />
                    Neurologists
                    <br />
                    Already on
                    <br />
                    the Network
                  </h2>
                </div>
                <div className="md:col-start-9 md:col-span-4 flex flex-col gap-3">
                  <button className="h-14 px-8 bg-white text-red-600 text-[12px] font-bold tracking-[0.15em] uppercase hover:bg-black hover:text-white transition-colors flex items-center justify-center gap-2">
                    {ctaPrimary}
                    <ChevronRight size={14} strokeWidth={2.5} />
                  </button>
                  <button className="h-14 px-8 border-2 border-white text-[12px] font-bold tracking-[0.15em] uppercase hover:bg-white hover:text-red-600 transition-colors">
                    {ctaSecondary}
                  </button>
                </div>
              </div>
            </Item>
          </Section>
        </div>
      </div>

      {/* ----------------------------------------------------------------- */}
      {/* Footer */}
      {/* ----------------------------------------------------------------- */}
      <footer className="bg-black text-white">
        <div className="max-w-[1400px] mx-auto px-6 py-16 md:py-20">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-10 md:gap-8 mb-16">
            {/* Brand */}
            <div className="col-span-2 md:col-span-1">
              <span className="text-[22px] font-black tracking-[-0.03em] uppercase">
                {brandName}
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
                <h4 className="text-[10px] font-bold tracking-[0.25em] uppercase text-white/30 mb-5">
                  {col.title}
                </h4>
                <ul className="space-y-3">
                  {col.links.map((link) => (
                    <li key={link}>
                      <a
                        href="#"
                        className="text-[12px] text-white/50 hover:text-white transition-colors"
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
          <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
            <p className="text-[11px] text-white/20">
              &copy; {new Date().getFullYear()} {brandName}. All rights reserved.
            </p>
            <div className="flex items-center gap-6">
              {['Privacy', 'Terms', 'Cookies'].map((item) => (
                <a
                  key={item}
                  href="#"
                  className="text-[11px] text-white/20 hover:text-white/50 transition-colors"
                >
                  {item}
                </a>
              ))}
            </div>
          </div>
        </div>
      </footer>

      {/* ----------------------------------------------------------------- */}
      {/* Bottom Prev/Next bar (mobile friendly) */}
      {/* ----------------------------------------------------------------- */}
      <div className="border-t border-black bg-white">
        <div className="max-w-[1400px] mx-auto grid grid-cols-2">
          <Link
            to="/1"
            className="flex items-center justify-center gap-2 py-5 border-r border-black text-[11px] font-bold tracking-[0.15em] uppercase hover:bg-black hover:text-white transition-colors"
          >
            <ArrowLeft size={14} strokeWidth={2} />
            Previous Design
          </Link>
          <Link
            to="/3"
            className="flex items-center justify-center gap-2 py-5 text-[11px] font-bold tracking-[0.15em] uppercase hover:bg-black hover:text-white transition-colors"
          >
            Next Design
            <ArrowRight size={14} strokeWidth={2} />
          </Link>
        </div>
      </div>
    </div>
  )
}
