import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import {
  Brain,
  Shield,
  Activity,
  ClipboardList,
  ChevronLeft,
  ChevronRight,
  Users,
  FlaskConical,
  Building2,
  HeartPulse,
  ArrowRight,
  Quote,
  Sparkles,
  TrendingUp,
  Zap,
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
  tagline,
} from '../shared/MockData'
import { cn } from '../shared/cn'

// ─── Icon resolver ───────────────────────────────────────────────
const iconMap: Record<string, React.ReactNode> = {
  brain: <Brain className="size-6" />,
  shield: <Shield className="size-6" />,
  activity: <Activity className="size-6" />,
  clipboard: <ClipboardList className="size-6" />,
}

// ─── Stat icons ──────────────────────────────────────────────────
const statIcons = [
  <Users className="size-5" key="u" />,
  <FlaskConical className="size-5" key="f" />,
  <Building2 className="size-5" key="b" />,
  <HeartPulse className="size-5" key="h" />,
]

// ─── Tile animation variants ─────────────────────────────────────
const tileVariants = {
  hidden: { opacity: 0, y: 24, scale: 0.97 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      delay: i * 0.06,
      duration: 0.5,
      ease: [0.22, 1, 0.36, 1] as [number, number, number, number],
    },
  }),
}

// ─── Reusable Tile wrapper ───────────────────────────────────────
function Tile({
  children,
  className,
  index = 0,
  ...props
}: {
  children: React.ReactNode
  className?: string
  index?: number
} & React.ComponentProps<typeof motion.div>) {
  return (
    <motion.div
      custom={index}
      variants={tileVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.15 }}
      className={cn(
        'rounded-xl shadow-sm border border-gray-200/60 bg-white overflow-hidden',
        className,
      )}
      {...props}
    >
      {children}
    </motion.div>
  )
}

// ─── Progress bar component ──────────────────────────────────────
function ProgressBar({ current, target }: { current: number; target: number }) {
  const pct = Math.round((current / target) * 100)
  return (
    <div className="w-full">
      <div className="flex justify-between text-xs text-slate-500 mb-1.5">
        <span>{current} enrolled</span>
        <span>{pct}%</span>
      </div>
      <div className="h-1.5 rounded-full bg-gray-100 overflow-hidden">
        <motion.div
          className="h-full rounded-full bg-teal-600"
          initial={{ width: 0 }}
          whileInView={{ width: `${pct}%` }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: 'easeOut', delay: 0.3 }}
        />
      </div>
    </div>
  )
}

// ─── Phase badge ─────────────────────────────────────────────────
function PhaseBadge({ phase }: { phase: string }) {
  const colors: Record<string, string> = {
    'Phase I': 'bg-amber-50 text-amber-700 border-amber-200',
    'Phase II': 'bg-teal-50 text-teal-700 border-teal-200',
    'Phase III': 'bg-indigo-50 text-indigo-700 border-indigo-200',
  }
  return (
    <span
      className={cn(
        'text-[11px] font-semibold px-2 py-0.5 rounded-md border tracking-wide',
        colors[phase] ?? 'bg-gray-50 text-gray-600 border-gray-200',
      )}
    >
      {phase}
    </span>
  )
}

// ═════════════════════════════════════════════════════════════════
//  DESIGN 14 — MOSAIC
// ═════════════════════════════════════════════════════════════════
export default function Design14() {
  let tileIdx = 0
  const nextIdx = () => tileIdx++

  return (
    <div
      className="min-h-screen bg-[#f3f4f6] font-['Inter',sans-serif] text-slate-800"
      style={{
        backgroundImage:
          'radial-gradient(circle at 1px 1px, rgba(0,0,0,0.03) 1px, transparent 0)',
        backgroundSize: '24px 24px',
      }}
    >
      {/* ── Floating Nav ────────────────────────────────────── */}
      <motion.nav
        initial={{ y: -40, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] }}
        className="fixed top-4 left-1/2 -translate-x-1/2 z-50 flex items-center gap-3 bg-white/80 backdrop-blur-xl border border-gray-200/70 rounded-full px-2 py-1.5 shadow-lg shadow-black/5"
      >
        <Link
          to="/13"
          className="flex items-center gap-1 text-xs font-medium text-slate-500 hover:text-teal-700 transition-colors px-3 py-1.5 rounded-full hover:bg-teal-50"
        >
          <ChevronLeft className="size-3.5" />
          <span>Prev</span>
        </Link>
        <div className="flex items-center gap-2 px-3 py-1.5 bg-slate-800 rounded-full">
          <Sparkles className="size-3.5 text-teal-400" />
          <span className="text-xs font-bold text-white tracking-wide">
            #14 Mosaic
          </span>
        </div>
        <Link
          to="/15"
          className="flex items-center gap-1 text-xs font-medium text-slate-500 hover:text-teal-700 transition-colors px-3 py-1.5 rounded-full hover:bg-teal-50"
        >
          <span>Next</span>
          <ChevronRight className="size-3.5" />
        </Link>
      </motion.nav>

      {/* ── The Mosaic Grid ─────────────────────────────────── */}
      <div className="max-w-[1400px] mx-auto px-4 pt-20 pb-12">
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4 auto-rows-auto">
          {/* ────────────────────────────────────────────────── */}
          {/*  HERO TILE — spans 2 cols, 2 rows on xl           */}
          {/* ────────────────────────────────────────────────── */}
          <Tile
            index={nextIdx()}
            className="md:col-span-2 xl:row-span-2 !bg-slate-800 !border-slate-700 relative group"
          >
            <div className="p-8 md:p-10 flex flex-col justify-between h-full min-h-[340px] relative z-10">
              {/* Decorative grid overlay */}
              <div
                className="absolute inset-0 opacity-[0.04] pointer-events-none"
                style={{
                  backgroundImage:
                    'linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)',
                  backgroundSize: '40px 40px',
                }}
              />
              <div className="relative z-10">
                <div className="inline-flex items-center gap-2 bg-teal-600/20 text-teal-300 rounded-full px-3 py-1 text-xs font-semibold mb-5 backdrop-blur-sm border border-teal-500/20">
                  <Zap className="size-3" />
                  {brandName} Platform
                </div>
                <h1 className="text-3xl md:text-4xl lg:text-[2.75rem] font-extrabold text-white leading-[1.1] tracking-tight mb-4">
                  {heroHeadline}
                </h1>
                <p className="text-slate-400 text-base md:text-lg leading-relaxed max-w-xl">
                  {heroSubheadline}
                </p>
              </div>
              <div className="flex flex-wrap gap-3 mt-6 relative z-10">
                <button className="inline-flex items-center gap-2 bg-teal-600 hover:bg-teal-500 text-white font-semibold text-sm px-6 py-3 rounded-lg transition-all duration-200 shadow-lg shadow-teal-600/25 hover:shadow-teal-500/30 hover:-translate-y-0.5 cursor-pointer">
                  {ctaPrimary}
                  <ArrowRight className="size-4" />
                </button>
                <button className="inline-flex items-center gap-2 bg-white/10 hover:bg-white/15 text-white font-semibold text-sm px-6 py-3 rounded-lg border border-white/10 transition-all duration-200 backdrop-blur-sm cursor-pointer">
                  {ctaSecondary}
                </button>
              </div>
              {/* Corner accent */}
              <div className="absolute top-0 right-0 w-40 h-40 bg-gradient-to-bl from-teal-600/20 to-transparent rounded-bl-[80px] pointer-events-none" />
              <div className="absolute bottom-0 left-0 w-32 h-32 bg-gradient-to-tr from-orange-500/10 to-transparent rounded-tr-[60px] pointer-events-none" />
            </div>
          </Tile>

          {/* ────────────────────────────────────────────────── */}
          {/*  STAT TILES — 4 small individual tiles            */}
          {/* ────────────────────────────────────────────────── */}
          {stats.map((stat, i) => (
            <Tile
              key={stat.label}
              index={nextIdx()}
              className={cn(
                'group/stat hover:-translate-y-0.5 transition-transform duration-200',
                i === 0 && '!bg-teal-600 !border-teal-500 !text-white',
                i === 3 && '!bg-orange-500 !border-orange-400 !text-white',
              )}
            >
              <div className="p-6 flex flex-col gap-3">
                <div
                  className={cn(
                    'size-9 rounded-lg flex items-center justify-center',
                    i === 0
                      ? 'bg-white/20 text-white'
                      : i === 3
                        ? 'bg-white/20 text-white'
                        : 'bg-gray-100 text-slate-600',
                  )}
                >
                  {statIcons[i]}
                </div>
                <div>
                  <div
                    className={cn(
                      'text-3xl font-extrabold tracking-tight',
                      i === 0 || i === 3 ? 'text-white' : 'text-slate-800',
                    )}
                  >
                    {stat.value}
                  </div>
                  <div
                    className={cn(
                      'text-sm font-medium mt-0.5',
                      i === 0 || i === 3 ? 'text-white/80' : 'text-slate-500',
                    )}
                  >
                    {stat.label}
                  </div>
                </div>
              </div>
            </Tile>
          ))}

          {/* ────────────────────────────────────────────────── */}
          {/*  TAGLINE / BRAND TILE — teal accent, wide         */}
          {/* ────────────────────────────────────────────────── */}
          <Tile
            index={nextIdx()}
            className="md:col-span-2 !bg-gradient-to-br !from-teal-600 !to-teal-700 !border-teal-500"
          >
            <div className="p-8 relative overflow-hidden">
              <div
                className="absolute inset-0 opacity-10 pointer-events-none"
                style={{
                  backgroundImage:
                    'radial-gradient(circle at 2px 2px, white 1px, transparent 0)',
                  backgroundSize: '20px 20px',
                }}
              />
              <div className="relative z-10">
                <div className="text-teal-200 text-xs font-bold uppercase tracking-[0.15em] mb-2">
                  Our mission
                </div>
                <p className="text-white text-xl md:text-2xl font-bold leading-snug">
                  {tagline}
                </p>
                <p className="text-teal-200/80 text-sm mt-3 max-w-md leading-relaxed">
                  Bridging the gap between clinical practice and research, one
                  neurologist at a time.
                </p>
              </div>
            </div>
          </Tile>

          {/* ────────────────────────────────────────────────── */}
          {/*  FEATURE TILES — 4 medium tiles                   */}
          {/* ────────────────────────────────────────────────── */}
          {features.map((feature, i) => (
            <Tile
              key={feature.title}
              index={nextIdx()}
              className="group/feat hover:-translate-y-0.5 transition-transform duration-200"
            >
              <div className="p-6 flex flex-col gap-4 h-full">
                <div
                  className={cn(
                    'size-11 rounded-xl flex items-center justify-center',
                    i % 2 === 0
                      ? 'bg-teal-50 text-teal-600'
                      : 'bg-orange-50 text-orange-600',
                  )}
                >
                  {iconMap[feature.icon]}
                </div>
                <div>
                  <h3 className="font-bold text-slate-800 text-[15px] mb-1.5">
                    {feature.title}
                  </h3>
                  <p className="text-slate-500 text-sm leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              </div>
            </Tile>
          ))}

          {/* ────────────────────────────────────────────────── */}
          {/*  TESTIMONIAL TILE #1 — wide                       */}
          {/* ────────────────────────────────────────────────── */}
          <Tile index={nextIdx()} className="md:col-span-2">
            <div className="p-7 flex flex-col gap-4">
              <Quote className="size-7 text-teal-500/40" />
              <blockquote className="text-slate-700 text-[15px] leading-relaxed italic">
                "{testimonials[0].quote}"
              </blockquote>
              <div className="flex items-center gap-3 mt-1">
                <div className="size-10 rounded-full bg-slate-800 text-white flex items-center justify-center text-xs font-bold tracking-wide">
                  {testimonials[0].avatar}
                </div>
                <div>
                  <div className="font-semibold text-sm text-slate-800">
                    {testimonials[0].name}
                  </div>
                  <div className="text-xs text-slate-500">
                    {testimonials[0].credential}
                  </div>
                </div>
              </div>
            </div>
          </Tile>

          {/* ────────────────────────────────────────────────── */}
          {/*  STUDY TILES — 3 visible studies                  */}
          {/* ────────────────────────────────────────────────── */}
          {studies.slice(0, 3).map((study) => (
            <Tile
              key={study.title}
              index={nextIdx()}
              className="group/study hover:-translate-y-0.5 transition-transform duration-200"
            >
              <div className="p-6 flex flex-col gap-4 h-full">
                <div className="flex items-start justify-between gap-2">
                  <PhaseBadge phase={study.phase} />
                  <span
                    className={cn(
                      'text-[11px] font-semibold px-2 py-0.5 rounded-md',
                      study.status === 'Enrolling'
                        ? 'bg-emerald-50 text-emerald-700'
                        : 'bg-slate-100 text-slate-500',
                    )}
                  >
                    {study.status}
                  </span>
                </div>
                <div className="flex-1">
                  <h4 className="font-bold text-slate-800 text-[15px] leading-snug mb-1">
                    {study.title}
                  </h4>
                  <p className="text-slate-500 text-xs flex items-center gap-1">
                    <Building2 className="size-3" />
                    {study.university}
                  </p>
                </div>
                <div>
                  <ProgressBar current={study.patients} target={study.target} />
                </div>
              </div>
            </Tile>
          ))}

          {/* ────────────────────────────────────────────────── */}
          {/*  ORANGE ACCENT TILE — CTA                         */}
          {/* ────────────────────────────────────────────────── */}
          <Tile
            index={nextIdx()}
            className="!bg-gradient-to-br !from-orange-500 !to-orange-600 !border-orange-400"
          >
            <div className="p-7 flex flex-col justify-between h-full min-h-[180px] relative overflow-hidden">
              <div
                className="absolute -bottom-6 -right-6 size-28 rounded-full border-[3px] border-white/15 pointer-events-none"
              />
              <div
                className="absolute -top-4 -left-4 size-20 rounded-full border-[3px] border-white/10 pointer-events-none"
              />
              <div className="relative z-10">
                <TrendingUp className="size-6 text-white/70 mb-3" />
                <h3 className="text-white font-extrabold text-lg leading-snug">
                  Start matching patients today
                </h3>
                <p className="text-orange-100/80 text-sm mt-1.5">
                  Free for neurologists. Setup takes under 5 minutes.
                </p>
              </div>
              <button className="self-start mt-4 inline-flex items-center gap-2 bg-white text-orange-600 font-semibold text-sm px-5 py-2.5 rounded-lg hover:bg-orange-50 transition-colors cursor-pointer relative z-10">
                Get Started
                <ArrowRight className="size-3.5" />
              </button>
            </div>
          </Tile>

          {/* ────────────────────────────────────────────────── */}
          {/*  TESTIMONIAL TILE #2                               */}
          {/* ────────────────────────────────────────────────── */}
          <Tile index={nextIdx()} className="md:col-span-2">
            <div className="p-7 flex flex-col gap-4">
              <Quote className="size-7 text-orange-400/40" />
              <blockquote className="text-slate-700 text-[15px] leading-relaxed italic">
                "{testimonials[1].quote}"
              </blockquote>
              <div className="flex items-center gap-3 mt-1">
                <div className="size-10 rounded-full bg-teal-700 text-white flex items-center justify-center text-xs font-bold tracking-wide">
                  {testimonials[1].avatar}
                </div>
                <div>
                  <div className="font-semibold text-sm text-slate-800">
                    {testimonials[1].name}
                  </div>
                  <div className="text-xs text-slate-500">
                    {testimonials[1].credential}
                  </div>
                </div>
              </div>
            </div>
          </Tile>

          {/* ────────────────────────────────────────────────── */}
          {/*  REMAINING STUDY TILES                             */}
          {/* ────────────────────────────────────────────────── */}
          {studies.slice(3).map((study) => (
            <Tile
              key={study.title}
              index={nextIdx()}
              className="group/study hover:-translate-y-0.5 transition-transform duration-200"
            >
              <div className="p-6 flex flex-col gap-4 h-full">
                <div className="flex items-start justify-between gap-2">
                  <PhaseBadge phase={study.phase} />
                  <span
                    className={cn(
                      'text-[11px] font-semibold px-2 py-0.5 rounded-md',
                      study.status === 'Enrolling'
                        ? 'bg-emerald-50 text-emerald-700'
                        : 'bg-slate-100 text-slate-500',
                    )}
                  >
                    {study.status}
                  </span>
                </div>
                <div className="flex-1">
                  <h4 className="font-bold text-slate-800 text-[15px] leading-snug mb-1">
                    {study.title}
                  </h4>
                  <p className="text-slate-500 text-xs flex items-center gap-1">
                    <Building2 className="size-3" />
                    {study.university}
                  </p>
                </div>
                <div>
                  <ProgressBar current={study.patients} target={study.target} />
                </div>
              </div>
            </Tile>
          ))}

          {/* ────────────────────────────────────────────────── */}
          {/*  TESTIMONIAL TILE #3 — colored bg                  */}
          {/* ────────────────────────────────────────────────── */}
          <Tile
            index={nextIdx()}
            className="md:col-span-2 !bg-slate-800 !border-slate-700"
          >
            <div className="p-7 flex flex-col gap-4">
              <Quote className="size-7 text-teal-400/50" />
              <blockquote className="text-slate-300 text-[15px] leading-relaxed italic">
                "{testimonials[2].quote}"
              </blockquote>
              <div className="flex items-center gap-3 mt-1">
                <div className="size-10 rounded-full bg-teal-600 text-white flex items-center justify-center text-xs font-bold tracking-wide">
                  {testimonials[2].avatar}
                </div>
                <div>
                  <div className="font-semibold text-sm text-white">
                    {testimonials[2].name}
                  </div>
                  <div className="text-xs text-slate-400">
                    {testimonials[2].credential}
                  </div>
                </div>
              </div>
            </div>
          </Tile>

          {/* ────────────────────────────────────────────────── */}
          {/*  TESTIMONIAL TILE #4                               */}
          {/* ────────────────────────────────────────────────── */}
          <Tile index={nextIdx()} className="md:col-span-2">
            <div className="p-7 flex flex-col gap-4">
              <Quote className="size-7 text-teal-500/40" />
              <blockquote className="text-slate-700 text-[15px] leading-relaxed italic">
                "{testimonials[3].quote}"
              </blockquote>
              <div className="flex items-center gap-3 mt-1">
                <div className="size-10 rounded-full bg-orange-600 text-white flex items-center justify-center text-xs font-bold tracking-wide">
                  {testimonials[3].avatar}
                </div>
                <div>
                  <div className="font-semibold text-sm text-slate-800">
                    {testimonials[3].name}
                  </div>
                  <div className="text-xs text-slate-500">
                    {testimonials[3].credential}
                  </div>
                </div>
              </div>
            </div>
          </Tile>

          {/* ────────────────────────────────────────────────── */}
          {/*  FOOTER / BRAND TILE — full width                 */}
          {/* ────────────────────────────────────────────────── */}
          <Tile
            index={nextIdx()}
            className="md:col-span-2 xl:col-span-4 !bg-white !border-gray-200/60"
          >
            <div className="p-8 flex flex-col md:flex-row items-center justify-between gap-6">
              <div className="flex items-center gap-3">
                <div className="size-10 bg-slate-800 rounded-xl flex items-center justify-center">
                  <Sparkles className="size-5 text-teal-400" />
                </div>
                <div>
                  <span className="font-extrabold text-slate-800 text-lg tracking-tight">
                    {brandName}
                  </span>
                  <span className="text-slate-400 text-sm ml-2">{tagline}</span>
                </div>
              </div>
              <div className="flex items-center gap-3 text-sm text-slate-500">
                <span>&copy; {new Date().getFullYear()} {brandName}</span>
                <span className="text-slate-300">|</span>
                <span className="hover:text-teal-600 transition-colors cursor-pointer">
                  Privacy
                </span>
                <span className="hover:text-teal-600 transition-colors cursor-pointer">
                  Terms
                </span>
                <span className="hover:text-teal-600 transition-colors cursor-pointer">
                  Contact
                </span>
              </div>
            </div>
          </Tile>
        </div>
      </div>
    </div>
  )
}
