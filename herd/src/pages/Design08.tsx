import { useState, useEffect, useRef, useCallback } from 'react'
import { Link } from 'react-router-dom'
import { motion, useInView, AnimatePresence } from 'framer-motion'
import {
  ChevronLeft,
  ChevronRight,
  ArrowUp,
  Terminal as TerminalIcon,
} from 'lucide-react'
import { cn } from '../shared/cn'
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

// ─── Typing animation hook ─────────────────────────────────────────────────────

function useTypingAnimation(
  lines: string[],
  opts: { charDelay?: number; lineDelay?: number; startDelay?: number } = {}
) {
  const { charDelay = 35, lineDelay = 600, startDelay = 0 } = opts
  const [displayed, setDisplayed] = useState<string[]>([])
  const [currentLine, setCurrentLine] = useState(0)
  const [currentChar, setCurrentChar] = useState(0)
  const [done, setDone] = useState(false)
  const started = useRef(false)

  useEffect(() => {
    if (started.current) return
    started.current = true

    const timeout = setTimeout(() => {
      setDisplayed([''])
    }, startDelay)
    return () => clearTimeout(timeout)
  }, [startDelay])

  useEffect(() => {
    if (displayed.length === 0) return
    if (currentLine >= lines.length) {
      setDone(true)
      return
    }

    const line = lines[currentLine]
    if (currentChar < line.length) {
      const t = setTimeout(() => {
        setDisplayed((prev) => {
          const copy = [...prev]
          copy[currentLine] = line.slice(0, currentChar + 1)
          return copy
        })
        setCurrentChar((c) => c + 1)
      }, charDelay)
      return () => clearTimeout(t)
    } else {
      const t = setTimeout(() => {
        setCurrentLine((l) => l + 1)
        setCurrentChar(0)
        setDisplayed((prev) => [...prev, ''])
      }, lineDelay)
      return () => clearTimeout(t)
    }
  }, [displayed, currentLine, currentChar, lines, charDelay, lineDelay])

  return { displayed, done, currentLine, currentChar }
}

// ─── Blinking cursor ────────────────────────────────────────────────────────────

function BlinkingCursor({ className }: { className?: string }) {
  return (
    <motion.span
      className={cn('inline-block w-[0.55em] h-[1.1em] bg-green-500 align-middle ml-px', className)}
      animate={{ opacity: [1, 1, 0, 0] }}
      transition={{ duration: 1, repeat: Infinity, times: [0, 0.49, 0.5, 1], ease: 'linear' }}
    />
  )
}

// ─── Terminal window chrome ─────────────────────────────────────────────────────

function TerminalWindow({
  title = 'herd@terminal',
  children,
  className,
}: {
  title?: string
  children: React.ReactNode
  className?: string
}) {
  return (
    <div
      className={cn(
        'rounded-lg border border-[#333] overflow-hidden bg-[#0d0d0d] shadow-2xl shadow-green-500/5',
        className
      )}
    >
      {/* Title bar */}
      <div className="flex items-center gap-2 px-4 py-2.5 bg-[#1a1a1a] border-b border-[#333]">
        <div className="flex gap-1.5">
          <div className="w-3 h-3 rounded-full bg-[#ff5f57]" />
          <div className="w-3 h-3 rounded-full bg-[#febc2e]" />
          <div className="w-3 h-3 rounded-full bg-[#28c840]" />
        </div>
        <span className="ml-3 text-xs text-[#666] font-mono">{title}</span>
      </div>
      {/* Content */}
      <div className="p-5 md:p-6 font-mono text-sm leading-relaxed">{children}</div>
    </div>
  )
}

// ─── Prompt line ────────────────────────────────────────────────────────────────

function Prompt({
  command,
  output,
  outputColor = 'text-[#ccc]',
  noPrompt = false,
}: {
  command?: string
  output?: React.ReactNode
  outputColor?: string
  noPrompt?: boolean
}) {
  return (
    <div className="mb-1">
      {command && (
        <div className="flex items-center gap-0">
          {!noPrompt && <span className="text-green-500 mr-2 select-none">$</span>}
          <span className="text-[#e0e0e0]">{command}</span>
        </div>
      )}
      {output && <div className={cn('mt-0.5', outputColor)}>{output}</div>}
    </div>
  )
}

// ─── Scanline overlay ───────────────────────────────────────────────────────────

function ScanlineOverlay() {
  return (
    <div
      className="pointer-events-none fixed inset-0 z-50 opacity-[0.03]"
      style={{
        backgroundImage:
          'repeating-linear-gradient(0deg, transparent, transparent 1px, rgba(0,0,0,0.3) 1px, rgba(0,0,0,0.3) 2px)',
        backgroundSize: '100% 2px',
      }}
    />
  )
}

// ─── Section wrapper with in-view animation ─────────────────────────────────────

function TerminalSection({
  children,
  className,
  delay = 0,
}: {
  children: React.ReactNode
  className?: string
  delay?: number
}) {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay, ease: [0.25, 0.46, 0.45, 0.94] }}
      className={className}
    >
      {children}
    </motion.div>
  )
}

// ─── ASCII art banner ───────────────────────────────────────────────────────────

const ASCII_BANNER = `
 ██╗  ██╗███████╗██████╗ ██████╗
 ██║  ██║██╔════╝██╔══██╗██╔══██╗
 ███████║█████╗  ██████╔╝██║  ██║
 ██╔══██║██╔══╝  ██╔══██╗██║  ██║
 ██║  ██║███████╗██║  ██║██████╔╝
 ╚═╝  ╚═╝╚══════╝╚═╝  ╚═╝╚═════╝`.trim()

// ─── Hero typing lines ─────────────────────────────────────────────────────────

const heroCommands = [
  '$ herd init --user neurologist',
  '> Authenticating... OK',
  '> Profile loaded: Board-Certified Neurologist',
  '',
  '$ herd connect --match-patients',
  '> Scanning 180 active clinical studies...',
  '> Found 12 matches across 47 university clinics',
  '> Enrollment pipeline ready.',
  '',
  `$ echo "${heroHeadline}"`,
]

// ─── Main component ─────────────────────────────────────────────────────────────

export default function Design08() {
  // Hero typing
  const { displayed: heroLines, done: heroDone } = useTypingAnimation(heroCommands, {
    charDelay: 28,
    lineDelay: 400,
    startDelay: 800,
  })

  // Scroll-to-top
  const [showScrollTop, setShowScrollTop] = useState(false)

  const handleScroll = useCallback(() => {
    setShowScrollTop(window.scrollY > 600)
  }, [])

  useEffect(() => {
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [handleScroll])

  return (
    <div
      className="min-h-screen bg-[#0d0d0d] text-[#ccc] selection:bg-green-500/30 selection:text-green-200"
      style={{ fontFamily: "'JetBrains Mono', 'Fira Code', 'Cascadia Code', monospace" }}
    >
      {/* Google Font */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=JetBrains+Mono:ital,wght@0,100..800;1,100..800&display=swap');

        /* Custom scrollbar */
        ::-webkit-scrollbar { width: 8px; }
        ::-webkit-scrollbar-track { background: #0d0d0d; }
        ::-webkit-scrollbar-thumb { background: #333; border-radius: 4px; }
        ::-webkit-scrollbar-thumb:hover { background: #555; }

        /* Phosphor glow */
        .glow-green { text-shadow: 0 0 8px rgba(34, 197, 94, 0.4), 0 0 20px rgba(34, 197, 94, 0.15); }
        .glow-amber { text-shadow: 0 0 8px rgba(245, 158, 11, 0.4), 0 0 20px rgba(245, 158, 11, 0.15); }

        /* Terminal blink keyframe for pure CSS fallback */
        @keyframes termBlink {
          0%, 49% { opacity: 1; }
          50%, 100% { opacity: 0; }
        }
      `}</style>

      <ScanlineOverlay />

      {/* ─── Floating nav bar ──────────────────────────────────────────────── */}
      <motion.nav
        initial={{ y: -60, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="fixed top-0 inset-x-0 z-40 bg-[#0d0d0d]/90 backdrop-blur-md border-b border-[#222]"
      >
        <div className="max-w-6xl mx-auto flex items-center justify-between px-4 py-3">
          <Link
            to="/7"
            className="flex items-center gap-1 text-[#666] hover:text-green-500 transition-colors text-xs font-mono group"
          >
            <ChevronLeft className="w-4 h-4 group-hover:-translate-x-0.5 transition-transform" />
            <span>prev</span>
          </Link>

          <div className="flex items-center gap-3">
            <TerminalIcon className="w-4 h-4 text-green-500" />
            <span className="text-xs text-[#888] font-mono">
              design <span className="text-amber-500">#08</span>{' '}
              <span className="text-[#555]">—</span>{' '}
              <span className="text-green-500">terminal</span>
            </span>
          </div>

          <Link
            to="/9"
            className="flex items-center gap-1 text-[#666] hover:text-green-500 transition-colors text-xs font-mono group"
          >
            <span>next</span>
            <ChevronRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
          </Link>
        </div>
      </motion.nav>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 pt-20 pb-32">
        {/* ─── ASCII Header ────────────────────────────────────────────────── */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.1 }}
          className="pt-8 md:pt-14 mb-4"
        >
          <pre className="text-green-500 glow-green text-[0.45rem] sm:text-[0.55rem] md:text-xs leading-tight select-none overflow-x-auto">
            {ASCII_BANNER}
          </pre>
          <div className="mt-3 text-xs text-[#555]">
            <span className="text-[#666]">v2.4.1</span>
            <span className="mx-2">|</span>
            <span>{tagline}</span>
          </div>
        </motion.div>

        {/* ─── Hero: Terminal with typing animation ────────────────────────── */}
        <TerminalSection className="mb-16">
          <TerminalWindow title="herd@connect ~ neurologist">
            <div className="min-h-[280px] sm:min-h-[320px]">
              {heroLines.map((line, i) => {
                if (line === '') return <div key={i} className="h-4" />
                const isCommand = line.startsWith('$')
                const isOutput = line.startsWith('>')
                const isEcho = line.startsWith('$ echo')
                return (
                  <div key={i} className="flex">
                    <span
                      className={cn(
                        isCommand && !isEcho && 'text-green-500 glow-green',
                        isEcho && 'text-amber-500 glow-amber',
                        isOutput && 'text-[#888]',
                        !isCommand && !isOutput && 'text-[#ccc]'
                      )}
                    >
                      {line}
                    </span>
                    {i === heroLines.length - 1 && !heroDone && <BlinkingCursor />}
                  </div>
                )
              })}
              {heroDone && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.4 }}
                >
                  <div className="mt-4 text-amber-500 glow-amber text-base sm:text-lg font-bold">
                    {heroHeadline}
                  </div>
                  <div className="mt-3 text-[#777] text-xs sm:text-sm max-w-2xl leading-relaxed">
                    {heroSubheadline}
                  </div>
                  <div className="mt-6 flex flex-wrap gap-3">
                    <motion.button
                      whileHover={{ scale: 1.03 }}
                      whileTap={{ scale: 0.97 }}
                      className="px-5 py-2.5 bg-green-500 text-[#0d0d0d] font-bold text-xs rounded border border-green-400 hover:bg-green-400 transition-colors cursor-pointer"
                    >
                      <span className="mr-1.5 opacity-60">$</span>
                      {ctaPrimary}
                    </motion.button>
                    <motion.button
                      whileHover={{ scale: 1.03 }}
                      whileTap={{ scale: 0.97 }}
                      className="px-5 py-2.5 bg-transparent text-green-500 font-bold text-xs rounded border border-[#333] hover:border-green-500/50 transition-colors cursor-pointer"
                    >
                      <span className="mr-1.5 opacity-60">$</span>
                      {ctaSecondary}
                    </motion.button>
                  </div>
                  <div className="mt-4 flex items-center gap-1 text-[#555] text-[0.65rem]">
                    <span className="text-green-600">$</span>
                    <span>_</span>
                    <BlinkingCursor className="w-[0.5em] h-[0.9em] bg-green-600" />
                  </div>
                </motion.div>
              )}
            </div>
          </TerminalWindow>
        </TerminalSection>

        {/* ─── Status: herd status ─────────────────────────────────────────── */}
        <TerminalSection className="mb-16" delay={0.1}>
          <TerminalWindow title="herd@status">
            <Prompt command="herd status" />
            <div className="mt-3 mb-2 text-[#555] text-xs">
              ──────────────────────────────────────────
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
              {stats.map((stat, i) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.15 * i, duration: 0.4 }}
                  className="group"
                >
                  <div className="text-[#555] text-[0.65rem] uppercase tracking-wider mb-1">
                    {stat.label}
                  </div>
                  <div className="text-green-500 glow-green text-2xl md:text-3xl font-bold tabular-nums">
                    {stat.value}
                  </div>
                </motion.div>
              ))}
            </div>
            <div className="mt-4 text-[#555] text-xs">
              ──────────────────────────────────────────
            </div>
            <div className="mt-2 text-green-700 text-[0.65rem]">
              All systems operational. Last sync: 2 minutes ago.
            </div>
          </TerminalWindow>
        </TerminalSection>

        {/* ─── Features: herd --help ───────────────────────────────────────── */}
        <TerminalSection className="mb-16" delay={0.1}>
          <TerminalWindow title="herd@help">
            <Prompt command="herd --help" />
            <div className="mt-3 text-amber-500 glow-amber text-xs font-bold mb-3">
              USAGE: herd &lt;command&gt; [options]
            </div>
            <div className="text-[#666] text-[0.65rem] mb-4">
              {brandName} CLI — {tagline}
            </div>
            <div className="text-[#555] text-xs mb-4">OPTIONS:</div>
            <div className="space-y-5">
              {features.map((feature, i) => (
                <motion.div
                  key={feature.title}
                  initial={{ opacity: 0, x: -15 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.12 * i, duration: 0.4 }}
                  className="group"
                >
                  <div className="flex items-start gap-3">
                    <span className="text-green-500 shrink-0 select-none">
                      --{feature.icon}
                    </span>
                    <div>
                      <div className="text-amber-500 text-xs font-bold mb-0.5">
                        {feature.title}
                      </div>
                      <div className="text-[#777] text-xs leading-relaxed">
                        {feature.description}
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
            <div className="mt-6 text-[#555] text-xs">
              Run <span className="text-green-500">herd &lt;command&gt; --help</span> for more
              information on a specific command.
            </div>
          </TerminalWindow>
        </TerminalSection>

        {/* ─── Studies: herd search --studies ──────────────────────────────── */}
        <TerminalSection className="mb-16" delay={0.1}>
          <TerminalWindow title="herd@search">
            <Prompt command='herd search --studies --status "enrolling"' />
            <div className="mt-3 text-[#555] text-xs mb-3">
              Found {studies.length} results. Displaying table:
            </div>

            {/* Table header */}
            <div className="overflow-x-auto">
              <div className="min-w-[640px]">
                <div className="grid grid-cols-[2fr_1.2fr_0.7fr_0.8fr_0.8fr] gap-2 text-[0.65rem] text-amber-500 font-bold border-b border-[#333] pb-2 mb-2 uppercase tracking-wider">
                  <span>STUDY</span>
                  <span>INSTITUTION</span>
                  <span>PHASE</span>
                  <span>STATUS</span>
                  <span>ENROLLED</span>
                </div>

                {/* Table rows */}
                {studies.map((study, i) => {
                  const pct = study.target > 0 ? Math.round((study.patients / study.target) * 100) : 0
                  const barWidth = Math.min(pct, 100)
                  return (
                    <motion.div
                      key={study.title}
                      initial={{ opacity: 0 }}
                      whileInView={{ opacity: 1 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.08 * i, duration: 0.35 }}
                      className="grid grid-cols-[2fr_1.2fr_0.7fr_0.8fr_0.8fr] gap-2 text-xs py-2 border-b border-[#1a1a1a] hover:bg-[#111] transition-colors group"
                    >
                      <span className="text-[#ddd] group-hover:text-green-400 transition-colors truncate">
                        {study.title}
                      </span>
                      <span className="text-[#777] truncate">{study.university}</span>
                      <span className="text-[#888]">{study.phase}</span>
                      <span
                        className={cn(
                          study.status === 'Enrolling'
                            ? 'text-green-500'
                            : 'text-amber-500'
                        )}
                      >
                        {study.status}
                      </span>
                      <span className="text-[#888] flex items-center gap-2">
                        <span className="tabular-nums">
                          {study.patients}/{study.target}
                        </span>
                        <span className="hidden md:inline-flex w-16 h-1.5 bg-[#222] rounded-full overflow-hidden">
                          <span
                            className="h-full bg-green-500 rounded-full"
                            style={{ width: `${barWidth}%` }}
                          />
                        </span>
                      </span>
                    </motion.div>
                  )
                })}
              </div>
            </div>

            <div className="mt-4 text-[#555] text-[0.65rem]">
              <span className="text-green-600">TIP:</span> Use{' '}
              <span className="text-[#888]">herd refer --study &lt;id&gt;</span> to start a
              patient referral.
            </div>
          </TerminalWindow>
        </TerminalSection>

        {/* ─── Testimonials: user reviews ──────────────────────────────────── */}
        <TerminalSection className="mb-16" delay={0.1}>
          <TerminalWindow title="herd@reviews">
            <Prompt command="herd reviews --verified --limit 4" />
            <div className="mt-3 text-[#555] text-xs mb-4">
              Showing {testimonials.length} verified reviews:
            </div>
            <div className="space-y-5">
              {testimonials.map((t, i) => (
                <motion.div
                  key={t.name}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.1 * i, duration: 0.4 }}
                  className="border-l-2 border-[#333] pl-4 hover:border-green-500/40 transition-colors group"
                >
                  <div className="flex items-center gap-2 mb-2">
                    <span className="w-7 h-7 rounded bg-[#1a1a1a] border border-[#333] flex items-center justify-center text-[0.6rem] text-green-500 font-bold group-hover:border-green-500/40 transition-colors">
                      {t.avatar}
                    </span>
                    <span className="text-amber-500 text-xs font-bold">
                      @{t.name.toLowerCase().replace(/[\s.]+/g, '_')}
                    </span>
                    <span className="text-[#444] text-[0.6rem]">
                      (verified)
                    </span>
                  </div>
                  <div className="text-[#aaa] text-xs leading-relaxed mb-1">
                    &quot;{t.quote}&quot;
                  </div>
                  <div className="text-[#555] text-[0.6rem]">{t.credential}</div>
                </motion.div>
              ))}
            </div>
          </TerminalWindow>
        </TerminalSection>

        {/* ─── CTA: herd join ──────────────────────────────────────────────── */}
        <TerminalSection className="mb-20" delay={0.1}>
          <TerminalWindow title="herd@join">
            <Prompt
              command="herd join --network"
              output={
                <div className="mt-2">
                  <div className="text-[#888] text-xs mb-3">
                    Ready to connect with {stats[2]?.value || '47'} university clinics and{' '}
                    {stats[1]?.value || '180'} active studies?
                  </div>
                  <div className="text-amber-500 glow-amber text-sm font-bold mb-4">
                    Initialize your connection to clinical discovery.
                  </div>
                  <div className="flex flex-wrap gap-3">
                    <motion.button
                      whileHover={{ scale: 1.03, boxShadow: '0 0 20px rgba(34, 197, 94, 0.3)' }}
                      whileTap={{ scale: 0.97 }}
                      className="px-6 py-3 bg-green-500 text-[#0d0d0d] font-bold text-xs rounded border border-green-400 hover:bg-green-400 transition-colors cursor-pointer"
                    >
                      $ {ctaPrimary.toLowerCase().replace(/\s+/g, '-')}
                    </motion.button>
                    <motion.button
                      whileHover={{ scale: 1.03 }}
                      whileTap={{ scale: 0.97 }}
                      className="px-6 py-3 bg-transparent text-green-500 font-bold text-xs rounded border border-[#333] hover:border-green-500/50 transition-colors cursor-pointer"
                    >
                      $ {ctaSecondary.toLowerCase().replace(/\s+/g, '-')}
                    </motion.button>
                  </div>
                  <div className="mt-4 text-[#444] text-[0.6rem]">
                    <span className="text-green-700">$</span> No credit card required. HIPAA-compliant.
                    SOC 2 certified.
                  </div>
                </div>
              }
            />
          </TerminalWindow>
        </TerminalSection>

        {/* ─── Footer ──────────────────────────────────────────────────────── */}
        <footer className="border-t border-[#1a1a1a] pt-8 pb-4">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-[0.65rem] text-[#444]">
            <div className="flex items-center gap-2">
              <span className="text-green-600">$</span>
              <span>
                {brandName.toLowerCase()} v2.4.1 &mdash; {tagline.toLowerCase()}
              </span>
            </div>
            <div className="flex items-center gap-4">
              <span className="hover:text-[#888] transition-colors cursor-pointer">privacy</span>
              <span className="text-[#333]">|</span>
              <span className="hover:text-[#888] transition-colors cursor-pointer">terms</span>
              <span className="text-[#333]">|</span>
              <span className="hover:text-[#888] transition-colors cursor-pointer">docs</span>
              <span className="text-[#333]">|</span>
              <span className="hover:text-[#888] transition-colors cursor-pointer">github</span>
            </div>
          </div>
          <div className="mt-4 text-center text-[0.6rem] text-[#333]">
            &copy; 2026 {brandName}. All rights reserved. exit(0)
          </div>
        </footer>
      </div>

      {/* ─── Scroll to top ────────────────────────────────────────────────── */}
      <AnimatePresence>
        {showScrollTop && (
          <motion.button
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="fixed bottom-6 right-6 z-40 w-10 h-10 bg-[#1a1a1a] border border-[#333] rounded flex items-center justify-center text-green-500 hover:border-green-500/50 hover:bg-[#222] transition-colors cursor-pointer"
          >
            <ArrowUp className="w-4 h-4" />
          </motion.button>
        )}
      </AnimatePresence>
    </div>
  )
}
