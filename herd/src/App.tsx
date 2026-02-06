import { Routes, Route } from 'react-router-dom'
import { lazy, Suspense } from 'react'

const Index = lazy(() => import('./pages/Index'))
const Design01 = lazy(() => import('./pages/Design01'))
const Design02 = lazy(() => import('./pages/Design02'))
const Design03 = lazy(() => import('./pages/Design03'))
const Design04 = lazy(() => import('./pages/Design04'))
const Design05 = lazy(() => import('./pages/Design05'))
const Design06 = lazy(() => import('./pages/Design06'))
const Design07 = lazy(() => import('./pages/Design07'))
const Design08 = lazy(() => import('./pages/Design08'))
const Design09 = lazy(() => import('./pages/Design09'))
const Design10 = lazy(() => import('./pages/Design10'))
const Design11 = lazy(() => import('./pages/Design11'))
const Design12 = lazy(() => import('./pages/Design12'))
const Design13 = lazy(() => import('./pages/Design13'))
const Design14 = lazy(() => import('./pages/Design14'))
const Design15 = lazy(() => import('./pages/Design15'))

function Loading() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-neutral-950 text-white">
      <div className="animate-pulse text-lg tracking-wide">Loading…</div>
    </div>
  )
}

export default function App() {
  return (
    <Suspense fallback={<Loading />}>
      <Routes>
        <Route path="/" element={<Index />} />
        <Route path="/1" element={<Design01 />} />
        <Route path="/2" element={<Design02 />} />
        <Route path="/3" element={<Design03 />} />
        <Route path="/4" element={<Design04 />} />
        <Route path="/5" element={<Design05 />} />
        <Route path="/6" element={<Design06 />} />
        <Route path="/7" element={<Design07 />} />
        <Route path="/8" element={<Design08 />} />
        <Route path="/9" element={<Design09 />} />
        <Route path="/10" element={<Design10 />} />
        <Route path="/11" element={<Design11 />} />
        <Route path="/12" element={<Design12 />} />
        <Route path="/13" element={<Design13 />} />
        <Route path="/14" element={<Design14 />} />
        <Route path="/15" element={<Design15 />} />
      </Routes>
    </Suspense>
  )
}
