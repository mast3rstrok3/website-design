import { Link } from 'react-router-dom'

const designs = [
  { id: 1, name: 'Neural Network', concept: 'Animated neural network viz as hero', palette: 'Navy + electric blue + cyan', color: '#0a1628' },
  { id: 2, name: 'Swiss Clinic', concept: 'Strict grid, typography-only', palette: 'White + black + clinical red', color: '#ffffff' },
  { id: 3, name: 'Dark Matter', concept: 'Premium dark luxury, spotlight reveals', palette: 'Near-black + warm gold', color: '#0a0a0a' },
  { id: 4, name: 'The Broadsheet', concept: 'Newspaper/medical journal editorial', palette: 'Cream + ink black + muted red', color: '#f5f0e8' },
  { id: 5, name: 'Topography', concept: 'Topographic map contours', palette: 'Sand + forest green + terracotta', color: '#e8dcc8' },
  { id: 6, name: 'Blueprint', concept: 'Technical drawing/architectural', palette: 'Blueprint blue + white lines', color: '#1a3a5c' },
  { id: 7, name: 'Kodachrome', concept: '1970s warm photography, human stories', palette: 'Warm white + amber + coral', color: '#faf5ef' },
  { id: 8, name: 'Terminal', concept: 'Hacker CLI aesthetic, typed commands', palette: 'Black + phosphor green + amber', color: '#0d0d0d' },
  { id: 9, name: 'Stained Glass', concept: 'Jewel-toned full-viewport panels', palette: 'Emerald / sapphire / amethyst', color: '#1a1a2e' },
  { id: 10, name: 'Kinetic', concept: 'Motion-first, scroll-driven', palette: 'White + electric indigo + hot pink', color: '#fafafa' },
  { id: 11, name: 'Meridian', concept: 'Japanese minimalism, extreme whitespace', palette: 'Near-monochrome + muted indigo', color: '#fbfbfb' },
  { id: 12, name: 'Brutalist', concept: 'Raw, overlapping, thick borders', palette: 'White + black + highlighter yellow', color: '#ffffff' },
  { id: 13, name: 'Bioluminescent', concept: 'Deep ocean, glowing particles', palette: 'Ocean black + cyan/green/violet', color: '#020810' },
  { id: 14, name: 'Mosaic', concept: 'Data dashboard bento grid', palette: 'Light gray + slate + teal + orange', color: '#f3f4f6' },
  { id: 15, name: 'Redacted', concept: 'Classified document, redactions reveal', palette: 'Manila + black bars + red stamps', color: '#e8d5a3' },
]

export default function Index() {
  return (
    <div className="min-h-screen bg-neutral-950 text-white" style={{ fontFamily: 'Inter, system-ui, sans-serif' }}>
      <div className="max-w-7xl mx-auto px-6 py-16">
        <header className="mb-16">
          <h1 className="text-5xl font-bold tracking-tight mb-4">
            Herd
            <span className="text-neutral-500 font-light ml-3">Design Gallery</span>
          </h1>
          <p className="text-neutral-400 text-lg max-w-2xl">
            15 radically different marketing homepage designs for a platform connecting neurologists with university clinical studies.
          </p>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {designs.map((d) => (
            <Link
              key={d.id}
              to={`/${d.id}`}
              className="group relative overflow-hidden rounded-2xl border border-neutral-800 hover:border-neutral-600 transition-all duration-300 hover:scale-[1.02]"
            >
              <div
                className="h-40 flex items-center justify-center relative"
                style={{ backgroundColor: d.color }}
              >
                <span
                  className="text-6xl font-black opacity-20 group-hover:opacity-40 transition-opacity"
                  style={{ color: d.color === '#ffffff' || d.color === '#fafafa' || d.color === '#fbfbfb' || d.color === '#f5f0e8' || d.color === '#e8dcc8' || d.color === '#faf5ef' || d.color === '#f3f4f6' || d.color === '#e8d5a3' ? '#000' : '#fff' }}
                >
                  {String(d.id).padStart(2, '0')}
                </span>
              </div>
              <div className="p-5 bg-neutral-900">
                <div className="flex items-baseline justify-between mb-2">
                  <h2 className="text-lg font-semibold">{d.name}</h2>
                  <span className="text-xs text-neutral-500 font-mono">#{String(d.id).padStart(2, '0')}</span>
                </div>
                <p className="text-sm text-neutral-400 mb-2">{d.concept}</p>
                <p className="text-xs text-neutral-600">{d.palette}</p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}
