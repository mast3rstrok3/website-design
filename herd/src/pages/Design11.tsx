import { Link } from 'react-router-dom'
import { motion, useScroll, useTransform } from 'framer-motion'
import {
  ArrowLeft,
  ArrowRight,
} from 'lucide-react'
import { useRef } from 'react'
import {
  stats,
  testimonials,
  studies,
  features,
  brandName,
  tagline,
  ctaPrimary,
  ctaSecondary,
} from '../shared/MockData'
import { cn } from '../shared/cn'

// ---------------------------------------------------------------------------
// Meridian — Design #11
// Japanese minimalism. Extreme whitespace. One element per viewport section.
// Near-monochrome: #fbfbfb bg, #2d2d2d text, #6366f1 sole accent (sparse).
// Font: Inter (light weight primarily, medium for emphasis).
// The most minimal design — calm, contemplative, purposeful.
// ---------------------------------------------------------------------------

// Slow, gentle fade-in used throughout
const gentleFade = {
  hidden: { opacity: 0, y: 8 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 1.2, ease: [0.25, 0.1, 0.25, 1] as const },
  },
}

const gentleFadeDelayed = (delay: number) => ({
  hidden: { opacity: 0, y: 6 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 1.4, ease: [0.25, 0.1, 0.25, 1] as const, delay },
  },
})

// Viewport-triggered section — one element per view
function ViewSection({
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
      viewport={{ once: true, amount: 0.3 }}
      variants={{
        hidden: {},
        show: { transition: { staggerChildren: 0.2, delayChildren: 0.1 } },
      }}
      className={cn('relative', className)}
    >
      {children}
    </motion.section>
  )
}

// Hairline divider
function Hairline({ className }: { className?: string }) {
  return (
    <motion.div
      variants={gentleFade}
      className={cn('h-px bg-[#2d2d2d]/[0.08]', className)}
    />
  )
}

export default function Design11() {
  const containerRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({ target: containerRef })

  // Subtle parallax for the hero brand name
  const heroY = useTransform(scrollYProgress, [0, 0.15], [0, -40])
  const heroOpacity = useTransform(scrollYProgress, [0, 0.12], [1, 0])

  // Pick one representative from each data set
  const featuredStat = stats[0] // "2,400+ Neurologists"
  const featuredFeature = features[0] // "Intelligent Patient Matching"
  const featuredStudy = studies[0] // "Phase III Migraine Prevention Trial"
  const featuredTestimonial = testimonials[0] // Dr. Elena Vasquez

  return (
    <div
      ref={containerRef}
      className="design-page relative min-h-screen"
      style={{
        fontFamily: 'Inter, system-ui, sans-serif',
        backgroundColor: '#fbfbfb',
        color: '#2d2d2d',
      }}
    >
      {/* ================================================================= */}
      {/* Floating Nav — absolute minimum */}
      {/* ================================================================= */}
      <motion.nav
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.6, delay: 0.8 }}
        className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-8 py-5 md:px-12"
        style={{ backgroundColor: 'rgba(251, 251, 251, 0.85)', backdropFilter: 'blur(12px)' }}
      >
        <Link
          to="/10"
          className="flex items-center gap-1.5 text-[11px] tracking-[0.08em] uppercase text-[#2d2d2d]/40 hover:text-[#6366f1] transition-colors duration-500"
          style={{ fontWeight: 300 }}
        >
          <ArrowLeft size={12} strokeWidth={1.2} />
          <span>Prev</span>
        </Link>

        <span
          className="text-[11px] tracking-[0.15em] uppercase text-[#2d2d2d]/30"
          style={{ fontWeight: 300 }}
        >
          11 / 15
        </span>

        <Link
          to="/12"
          className="flex items-center gap-1.5 text-[11px] tracking-[0.08em] uppercase text-[#2d2d2d]/40 hover:text-[#6366f1] transition-colors duration-500"
          style={{ fontWeight: 300 }}
        >
          <span>Next</span>
          <ArrowRight size={12} strokeWidth={1.2} />
        </Link>
      </motion.nav>

      {/* ================================================================= */}
      {/* Hero — Brand name + single tagline, immense breathing room */}
      {/* ================================================================= */}
      <section className="relative flex flex-col items-center justify-center min-h-screen px-8">
        <motion.div
          style={{ y: heroY, opacity: heroOpacity }}
          className="flex flex-col items-center text-center"
        >
          <motion.h1
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 2, ease: [0.25, 0.1, 0.25, 1], delay: 0.3 }}
            className="text-[clamp(2.5rem,6vw,5rem)] tracking-[-0.03em] leading-none mb-8"
            style={{ fontWeight: 300 }}
          >
            {brandName}
          </motion.h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 2, ease: [0.25, 0.1, 0.25, 1], delay: 0.9 }}
            className="text-[clamp(0.8rem,1.4vw,1.05rem)] text-[#2d2d2d]/50 tracking-[0.01em] leading-relaxed max-w-md"
            style={{ fontWeight: 300 }}
          >
            {tagline}
          </motion.p>
        </motion.div>

        {/* Scroll indicator — barely visible */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.5, delay: 2.5 }}
          className="absolute bottom-12 left-1/2 -translate-x-1/2"
        >
          <motion.div
            animate={{ y: [0, 6, 0] }}
            transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
            className="w-px h-8 bg-[#2d2d2d]/10"
          />
        </motion.div>
      </section>

      {/* ================================================================= */}
      {/* Hairline */}
      {/* ================================================================= */}
      <ViewSection className="px-8 md:px-12">
        <Hairline />
      </ViewSection>

      {/* ================================================================= */}
      {/* One Stat — asymmetric, off-center right */}
      {/* ================================================================= */}
      <ViewSection className="min-h-screen flex items-center px-8 md:px-12">
        <div className="w-full max-w-6xl mx-auto">
          <div className="ml-auto w-fit md:mr-[12%]">
            <motion.p
              variants={gentleFade}
              className="text-[11px] tracking-[0.15em] uppercase text-[#2d2d2d]/30 mb-6"
              style={{ fontWeight: 300 }}
            >
              Network
            </motion.p>
            <motion.span
              variants={gentleFade}
              className="block text-[clamp(3rem,8vw,7rem)] tracking-[-0.04em] leading-none"
              style={{ fontWeight: 300 }}
            >
              {featuredStat.value}
            </motion.span>
            <motion.p
              variants={gentleFadeDelayed(0.3)}
              className="mt-4 text-[0.85rem] text-[#2d2d2d]/40 tracking-[0.02em]"
              style={{ fontWeight: 300 }}
            >
              {featuredStat.label}
            </motion.p>
          </div>
        </div>
      </ViewSection>

      {/* ================================================================= */}
      {/* Hairline */}
      {/* ================================================================= */}
      <ViewSection className="px-8 md:px-12">
        <Hairline />
      </ViewSection>

      {/* ================================================================= */}
      {/* Three More Stats — horizontal, minimal, off-center left */}
      {/* ================================================================= */}
      <ViewSection className="min-h-[70vh] flex items-center px-8 md:px-12">
        <div className="w-full max-w-6xl mx-auto">
          <div className="md:ml-[8%] flex flex-col gap-16 md:flex-row md:gap-24">
            {stats.slice(1).map((stat, i) => (
              <motion.div key={stat.label} variants={gentleFadeDelayed(i * 0.2)}>
                <span
                  className="block text-[clamp(1.8rem,4vw,3rem)] tracking-[-0.03em] leading-none"
                  style={{ fontWeight: 300 }}
                >
                  {stat.value}
                </span>
                <p
                  className="mt-2 text-[0.75rem] text-[#2d2d2d]/35 tracking-[0.03em]"
                  style={{ fontWeight: 300 }}
                >
                  {stat.label}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </ViewSection>

      {/* ================================================================= */}
      {/* Hairline */}
      {/* ================================================================= */}
      <ViewSection className="px-8 md:px-12">
        <Hairline />
      </ViewSection>

      {/* ================================================================= */}
      {/* One Feature — off-center left, sparse */}
      {/* ================================================================= */}
      <ViewSection className="min-h-screen flex items-center px-8 md:px-12">
        <div className="w-full max-w-6xl mx-auto">
          <div className="md:ml-[6%] max-w-lg">
            <motion.p
              variants={gentleFade}
              className="text-[11px] tracking-[0.15em] uppercase text-[#6366f1]/50 mb-8"
              style={{ fontWeight: 400 }}
            >
              Capability
            </motion.p>
            <motion.h2
              variants={gentleFade}
              className="text-[clamp(1.4rem,2.8vw,2.2rem)] tracking-[-0.02em] leading-[1.2] mb-6"
              style={{ fontWeight: 400 }}
            >
              {featuredFeature.title}
            </motion.h2>
            <motion.p
              variants={gentleFadeDelayed(0.3)}
              className="text-[0.85rem] text-[#2d2d2d]/40 leading-[1.8] tracking-[0.005em]"
              style={{ fontWeight: 300 }}
            >
              {featuredFeature.description}
            </motion.p>
          </div>
        </div>
      </ViewSection>

      {/* ================================================================= */}
      {/* Hairline */}
      {/* ================================================================= */}
      <ViewSection className="px-8 md:px-12">
        <Hairline />
      </ViewSection>

      {/* ================================================================= */}
      {/* Three remaining features — vertical stack, off-center right */}
      {/* ================================================================= */}
      <ViewSection className="min-h-[80vh] flex items-center px-8 md:px-12 py-32">
        <div className="w-full max-w-6xl mx-auto">
          <div className="ml-auto md:mr-[8%] max-w-md flex flex-col gap-20">
            {features.slice(1).map((feature, i) => (
              <motion.div key={feature.title} variants={gentleFadeDelayed(i * 0.15)}>
                <h3
                  className="text-[0.95rem] tracking-[-0.01em] mb-3"
                  style={{ fontWeight: 500 }}
                >
                  {feature.title}
                </h3>
                <p
                  className="text-[0.8rem] text-[#2d2d2d]/35 leading-[1.8]"
                  style={{ fontWeight: 300 }}
                >
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </ViewSection>

      {/* ================================================================= */}
      {/* Hairline */}
      {/* ================================================================= */}
      <ViewSection className="px-8 md:px-12">
        <Hairline />
      </ViewSection>

      {/* ================================================================= */}
      {/* One Study — off-center, with minimal progress line */}
      {/* ================================================================= */}
      <ViewSection className="min-h-screen flex items-center px-8 md:px-12">
        <div className="w-full max-w-6xl mx-auto">
          <div className="md:ml-[18%] max-w-lg">
            <motion.p
              variants={gentleFade}
              className="text-[11px] tracking-[0.15em] uppercase text-[#2d2d2d]/30 mb-8"
              style={{ fontWeight: 300 }}
            >
              Active Study
            </motion.p>
            <motion.h2
              variants={gentleFade}
              className="text-[clamp(1.2rem,2.4vw,1.8rem)] tracking-[-0.02em] leading-[1.3] mb-4"
              style={{ fontWeight: 400 }}
            >
              {featuredStudy.title}
            </motion.h2>
            <motion.p
              variants={gentleFadeDelayed(0.2)}
              className="text-[0.8rem] text-[#2d2d2d]/35 mb-10"
              style={{ fontWeight: 300 }}
            >
              {featuredStudy.university}
            </motion.p>

            {/* Minimal progress line */}
            <motion.div variants={gentleFadeDelayed(0.4)} className="space-y-3">
              <div className="flex items-baseline justify-between">
                <span
                  className="text-[0.7rem] tracking-[0.1em] uppercase text-[#2d2d2d]/25"
                  style={{ fontWeight: 300 }}
                >
                  Enrollment
                </span>
                <span
                  className="text-[0.7rem] text-[#2d2d2d]/30"
                  style={{ fontWeight: 300 }}
                >
                  {featuredStudy.patients} / {featuredStudy.target}
                </span>
              </div>
              <div className="h-px bg-[#2d2d2d]/[0.06] relative">
                <motion.div
                  initial={{ scaleX: 0 }}
                  whileInView={{ scaleX: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 2, ease: [0.25, 0.1, 0.25, 1], delay: 0.6 }}
                  className="absolute inset-y-0 left-0 bg-[#6366f1]/30 origin-left"
                  style={{ width: `${(featuredStudy.patients / featuredStudy.target) * 100}%` }}
                />
              </div>
            </motion.div>

            {/* Tiny metadata */}
            <motion.div
              variants={gentleFadeDelayed(0.6)}
              className="mt-8 flex gap-8"
            >
              <span className="text-[0.65rem] text-[#2d2d2d]/20 tracking-[0.05em]" style={{ fontWeight: 300 }}>
                {featuredStudy.phase}
              </span>
              <span className="text-[0.65rem] text-[#2d2d2d]/20 tracking-[0.05em]" style={{ fontWeight: 300 }}>
                {featuredStudy.condition}
              </span>
              <span className="text-[0.65rem] text-[#6366f1]/40 tracking-[0.05em]" style={{ fontWeight: 400 }}>
                {featuredStudy.status}
              </span>
            </motion.div>
          </div>
        </div>
      </ViewSection>

      {/* ================================================================= */}
      {/* Hairline */}
      {/* ================================================================= */}
      <ViewSection className="px-8 md:px-12">
        <Hairline />
      </ViewSection>

      {/* ================================================================= */}
      {/* More Studies — compact list, off-center right */}
      {/* ================================================================= */}
      <ViewSection className="min-h-[60vh] flex items-center px-8 md:px-12 py-24">
        <div className="w-full max-w-6xl mx-auto">
          <div className="ml-auto md:mr-[10%] max-w-md">
            <motion.p
              variants={gentleFade}
              className="text-[11px] tracking-[0.15em] uppercase text-[#2d2d2d]/25 mb-10"
              style={{ fontWeight: 300 }}
            >
              More Studies
            </motion.p>
            <div className="space-y-8">
              {studies.slice(1).map((study, i) => (
                <motion.div
                  key={study.title}
                  variants={gentleFadeDelayed(i * 0.12)}
                  className="group"
                >
                  <p
                    className="text-[0.85rem] tracking-[-0.005em] mb-1"
                    style={{ fontWeight: 400 }}
                  >
                    {study.title}
                  </p>
                  <p
                    className="text-[0.7rem] text-[#2d2d2d]/25"
                    style={{ fontWeight: 300 }}
                  >
                    {study.university} &middot; {study.phase}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </ViewSection>

      {/* ================================================================= */}
      {/* Hairline */}
      {/* ================================================================= */}
      <ViewSection className="px-8 md:px-12">
        <Hairline />
      </ViewSection>

      {/* ================================================================= */}
      {/* One Testimonial — off-center left, sparse */}
      {/* ================================================================= */}
      <ViewSection className="min-h-screen flex items-center px-8 md:px-12">
        <div className="w-full max-w-6xl mx-auto">
          <div className="md:ml-[10%] max-w-xl">
            <motion.p
              variants={gentleFade}
              className="text-[11px] tracking-[0.15em] uppercase text-[#2d2d2d]/25 mb-12"
              style={{ fontWeight: 300 }}
            >
              Testimony
            </motion.p>
            <motion.blockquote
              variants={gentleFade}
              className="text-[clamp(1rem,1.8vw,1.3rem)] leading-[1.8] tracking-[-0.005em] mb-10"
              style={{ fontWeight: 300 }}
            >
              &ldquo;{featuredTestimonial.quote}&rdquo;
            </motion.blockquote>
            <motion.div variants={gentleFadeDelayed(0.3)}>
              <p
                className="text-[0.8rem] tracking-[0.01em]"
                style={{ fontWeight: 500 }}
              >
                {featuredTestimonial.name}
              </p>
              <p
                className="text-[0.7rem] text-[#2d2d2d]/30 mt-1"
                style={{ fontWeight: 300 }}
              >
                {featuredTestimonial.credential}
              </p>
            </motion.div>
          </div>
        </div>
      </ViewSection>

      {/* ================================================================= */}
      {/* Hairline */}
      {/* ================================================================= */}
      <ViewSection className="px-8 md:px-12">
        <Hairline />
      </ViewSection>

      {/* ================================================================= */}
      {/* More Testimonials — right side, stacked compact */}
      {/* ================================================================= */}
      <ViewSection className="min-h-[70vh] flex items-center px-8 md:px-12 py-24">
        <div className="w-full max-w-6xl mx-auto">
          <div className="ml-auto md:mr-[6%] max-w-lg space-y-16">
            {testimonials.slice(1).map((t, i) => (
              <motion.div key={t.name} variants={gentleFadeDelayed(i * 0.15)}>
                <p
                  className="text-[0.85rem] leading-[1.8] text-[#2d2d2d]/60 mb-4"
                  style={{ fontWeight: 300 }}
                >
                  &ldquo;{t.quote}&rdquo;
                </p>
                <p className="text-[0.7rem] text-[#2d2d2d]/30" style={{ fontWeight: 400 }}>
                  {t.name}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </ViewSection>

      {/* ================================================================= */}
      {/* Hairline */}
      {/* ================================================================= */}
      <ViewSection className="px-8 md:px-12">
        <Hairline />
      </ViewSection>

      {/* ================================================================= */}
      {/* CTA — centered, enormous whitespace */}
      {/* ================================================================= */}
      <ViewSection className="min-h-screen flex items-center justify-center px-8 md:px-12">
        <div className="text-center">
          <motion.p
            variants={gentleFade}
            className="text-[clamp(1.2rem,2.4vw,1.8rem)] tracking-[-0.02em] leading-[1.5] mb-14"
            style={{ fontWeight: 300 }}
          >
            Connect your patients<br />
            to the studies that matter.
          </motion.p>

          <motion.div
            variants={gentleFadeDelayed(0.4)}
            className="flex flex-col sm:flex-row items-center justify-center gap-6"
          >
            <button
              className="text-[0.75rem] tracking-[0.1em] uppercase px-8 py-3 bg-[#2d2d2d] text-[#fbfbfb] hover:bg-[#6366f1] transition-colors duration-700"
              style={{ fontWeight: 400 }}
            >
              {ctaPrimary}
            </button>
            <button
              className="text-[0.75rem] tracking-[0.1em] uppercase px-8 py-3 text-[#2d2d2d]/40 hover:text-[#6366f1] transition-colors duration-700"
              style={{ fontWeight: 300 }}
            >
              {ctaSecondary}
            </button>
          </motion.div>
        </div>
      </ViewSection>

      {/* ================================================================= */}
      {/* Footer — barely there */}
      {/* ================================================================= */}
      <ViewSection className="px-8 md:px-12 pt-32 pb-16">
        <Hairline className="mb-12" />
        <motion.div
          variants={gentleFade}
          className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 max-w-6xl mx-auto"
        >
          <span
            className="text-[0.65rem] text-[#2d2d2d]/20 tracking-[0.05em]"
            style={{ fontWeight: 300 }}
          >
            {brandName}
          </span>
          <span
            className="text-[0.6rem] text-[#2d2d2d]/15 tracking-[0.05em]"
            style={{ fontWeight: 300 }}
          >
            Where neuroscience meets clinical discovery
          </span>
        </motion.div>
      </ViewSection>

      {/* ================================================================= */}
      {/* Bottom navigation — prev / next */}
      {/* ================================================================= */}
      <div className="px-8 md:px-12 pb-12">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <Link
            to="/10"
            className="flex items-center gap-2 text-[0.7rem] tracking-[0.08em] uppercase text-[#2d2d2d]/25 hover:text-[#6366f1] transition-colors duration-500"
            style={{ fontWeight: 300 }}
          >
            <ArrowLeft size={13} strokeWidth={1.2} />
            Previous
          </Link>
          <Link
            to="/12"
            className="flex items-center gap-2 text-[0.7rem] tracking-[0.08em] uppercase text-[#2d2d2d]/25 hover:text-[#6366f1] transition-colors duration-500"
            style={{ fontWeight: 300 }}
          >
            Next
            <ArrowRight size={13} strokeWidth={1.2} />
          </Link>
        </div>
      </div>
    </div>
  )
}
