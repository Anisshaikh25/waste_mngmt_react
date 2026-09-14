import { Link, useNavigate } from 'react-router-dom'

// ─── Data (swap with API later) ───────────────────────────────────────────────
const STATS = [
  { num: '1,240', label: 'Reports filed' },
  { num: '890',   label: 'Resolved' },
  { num: '12',    label: 'Active wards' },
  { num: '72%',   label: 'Resolution rate' },
]

const HOW_IT_WORKS = [
  { step: '01', icon: '📷', title: 'Spot a dump',    desc: 'Take a photo, describe the issue.' },
  { step: '02', icon: '📍', title: 'Report in 30s',  desc: 'Add location and submit your complaint.' },
  { step: '03', icon: '✅', title: 'Track to done',  desc: 'Follow status until resolved.' },
]

// ─── Navbar ───────────────────────────────────────────────────────────────────
function Navbar() {
  return (
    <nav style={s.nav}>
      <div style={s.brand}>
        <span style={s.brandDot} />
        SwachhAlert
      </div>

      <div style={s.navLinks}>
        <button
          style={s.navLink}
          onClick={() =>
            document.getElementById('how-it-works')
              ?.scrollIntoView({ behavior: 'smooth' })
          }
        >
          How it works
        </button>

        <Link to="/login" style={{ textDecoration: 'none' }}>
          <button style={s.navLink}>Login</button>
        </Link>

        <Link to="/register" style={{ textDecoration: 'none' }}>
          <button style={{ ...s.navLink, ...s.navCta }}>Register free</button>
        </Link>
      </div>
    </nav>
  )
}

// ─── Hero ─────────────────────────────────────────────────────────────────────
function Hero() {
  const navigate = useNavigate()

  return (
    <section style={s.hero}>
      <div style={s.blob1} aria-hidden="true" />
      <div style={s.blob2} aria-hidden="true" />

      <div style={{ position: 'relative', zIndex: 1 }}>
        <p style={s.eyebrow}>Civic tech for Indian cities</p>

        <h1 style={s.heroTitle}>
          Report garbage.{' '}
          <em style={{ color: '#1A7A4A', fontStyle: 'italic' }}>Track</em> the fix.
        </h1>

        <p style={s.heroSub}>
          SwachhAlert connects residents with municipal ward officers to resolve
          garbage issues — fast, transparently, and accountably.
        </p>

        <div style={s.heroBtns}>
          <button style={s.btnPrimary} onClick={() => navigate('/register')}>
            + Report a dump
          </button>
          <button style={s.btnOutline} onClick={() => navigate('/login')}>
            Admin login →
          </button>
        </div>
      </div>
    </section>
  )
}

// ─── Stats bar ────────────────────────────────────────────────────────────────
function StatsBar() {
  return (
    <div style={s.statsBar}>
      {STATS.map((stat, i) => (
        <div
          key={stat.label}
          style={{
            ...s.statItem,
            borderRight: i < STATS.length - 1
              ? '1px solid rgba(255,255,255,0.15)'
              : 'none',
          }}
        >
          <div style={s.statNum}>{stat.num}</div>
          <div style={s.statLabel}>{stat.label}</div>
        </div>
      ))}
    </div>
  )
}

// ─── How it works ─────────────────────────────────────────────────────────────
function HowItWorks() {
  return (
    <section id="how-it-works" style={s.section}>
      <p style={s.sectionLabel}>How it works</p>

      <div style={s.stepsGrid}>
        {HOW_IT_WORKS.map((item) => (
          <div key={item.step} style={s.stepCard}>
            <div style={s.stepNum}>{item.step}</div>
            <div style={s.stepIcon}>{item.icon}</div>
            <h3 style={s.stepTitle}>{item.title}</h3>
            <p style={s.stepDesc}>{item.desc}</p>
          </div>
        ))}
      </div>
    </section>
  )
}

// ─── CTA strip ────────────────────────────────────────────────────────────────
function CtaStrip() {
  const navigate = useNavigate()

  return (
    <div style={s.ctaStrip}>
      <div style={s.ctaText}>
        Join <strong>1,240 residents</strong> already keeping their city clean
      </div>
      <button style={s.ctaBtn} onClick={() => navigate('/register')}>
        Get started free →
      </button>
    </div>
  )
}

// ─── Footer ───────────────────────────────────────────────────────────────────
function Footer() {
  return (
    <footer style={s.footer}>
      <div style={s.footerBrand}>SwachhAlert</div>
      {/* <div style={s.footerText}>Built with React + Node.js</div> */}
      <div style={s.footerLinks}>
        <Link to="/register" style={s.footerLink}>Register</Link>
        <Link to="/login"    style={s.footerLink}>Login</Link>
      </div>
    </footer>
  )
}

// ─── Page ─────────────────────────────────────────────────────────────────────
export default function Landing() {
  return (
    <div style={s.page}>
      <Navbar />
      <Hero />
      <StatsBar />
      <HowItWorks />
      <CtaStrip />
      <Footer />
    </div>
  )
}

// ─── Styles ───────────────────────────────────────────────────────────────────
const GREEN       = '#1A7A4A'
const GREEN_LIGHT = '#E8F5EE'
const WHITE       = '#FFFFFF'
const BG          = '#F7F5F0'
const DARK        = '#111111'
const GRAY        = '#666666'
const BORDER      = '#E8E4DC'

const s = {
  page: {
    minHeight: '100vh',
    backgroundColor: BG,
    fontFamily: "'DM Sans', system-ui, sans-serif",
    color: DARK,
  },

  // Navbar
  nav: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: '14px 24px',
    backgroundColor: WHITE,
    borderBottom: `1px solid ${BORDER}`,
    position: 'sticky',
    top: 0,
    zIndex: 100,
  },
  brand: {
    fontFamily: 'Georgia, serif',
    fontSize: '20px',
    fontWeight: '600',
    color: GREEN,
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
  },
  brandDot: {
    width: '8px',
    height: '8px',
    borderRadius: '50%',
    backgroundColor: GREEN,
    display: 'inline-block',
  },
  navLinks: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
  },
  navLink: {
    fontSize: '13px',
    color: '#444',
    padding: '7px 14px',
    borderRadius: '6px',
    border: `1px solid ${BORDER}`,
    backgroundColor: WHITE,
    cursor: 'pointer',
    fontFamily: 'inherit',
  },
  navCta: {
    backgroundColor: GREEN,
    color: WHITE,
    borderColor: GREEN,
  },

  // Hero
  hero: {
    padding: '56px 24px 48px',
    backgroundColor: WHITE,
    borderBottom: `1px solid ${BORDER}`,
    position: 'relative',
    overflow: 'hidden',
  },
  blob1: {
    position: 'absolute',
    right: '-20px',
    top: '20px',
    width: '200px',
    height: '200px',
    borderRadius: '50%',
    backgroundColor: GREEN_LIGHT,
    opacity: 0.7,
    zIndex: 0,
  },
  blob2: {
    position: 'absolute',
    right: '60px',
    bottom: '-40px',
    width: '120px',
    height: '120px',
    borderRadius: '50%',
    backgroundColor: '#C8EADA',
    opacity: 0.5,
    zIndex: 0,
  },
  eyebrow: {
    fontSize: '11px',
    letterSpacing: '1.5px',
    textTransform: 'uppercase',
    color: GREEN,
    marginBottom: '16px',
    fontWeight: '500',
  },
  heroTitle: {
    fontFamily: 'Georgia, serif',
    fontSize: '42px',
    lineHeight: 1.1,
    color: DARK,
    marginBottom: '16px',
    maxWidth: '440px',
  },
  heroSub: {
    fontSize: '15px',
    color: GRAY,
    lineHeight: 1.7,
    maxWidth: '400px',
    marginBottom: '28px',
  },
  heroBtns: {
    display: 'flex',
    gap: '10px',
    flexWrap: 'wrap',
  },
  btnPrimary: {
    backgroundColor: GREEN,
    color: WHITE,
    padding: '12px 24px',
    borderRadius: '8px',
    fontSize: '14px',
    fontWeight: '500',
    cursor: 'pointer',
    border: 'none',
    fontFamily: 'inherit',
  },
  btnOutline: {
    backgroundColor: 'transparent',
    color: GREEN,
    padding: '12px 24px',
    borderRadius: '8px',
    fontSize: '14px',
    fontWeight: '500',
    cursor: 'pointer',
    border: `1.5px solid ${GREEN}`,
    fontFamily: 'inherit',
  },

  // Stats bar
  statsBar: {
    display: 'grid',
    gridTemplateColumns: 'repeat(4, 1fr)',
    backgroundColor: GREEN,
  },
  statItem: {
    padding: '16px 12px',
    textAlign: 'center',
  },
  statNum: {
    fontFamily: 'Georgia, serif',
    fontSize: '22px',
    fontWeight: '600',
    color: WHITE,
  },
  statLabel: {
    fontSize: '10px',
    color: 'rgba(255,255,255,0.75)',
    marginTop: '3px',
    letterSpacing: '0.5px',
    textTransform: 'uppercase',
  },

  // How it works
  section: {
    padding: '40px 24px',
    backgroundColor: BG,
  },
  sectionLabel: {
    fontSize: '11px',
    letterSpacing: '1.5px',
    textTransform: 'uppercase',
    color: '#999',
    marginBottom: '20px',
    fontWeight: '500',
  },
  stepsGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(3, 1fr)',
    gap: '14px',
  },
  stepCard: {
    backgroundColor: WHITE,
    border: `1px solid ${BORDER}`,
    borderRadius: '10px',
    padding: '20px 18px',
  },
  stepNum: {
    fontFamily: 'Georgia, serif',
    fontSize: '28px',
    color: GREEN,
    opacity: 0.35,
    lineHeight: 1,
    marginBottom: '8px',
  },
  stepIcon: {
    fontSize: '22px',
    marginBottom: '8px',
  },
  stepTitle: {
    fontSize: '13px',
    fontWeight: '500',
    color: DARK,
    marginBottom: '5px',
  },
  stepDesc: {
    fontSize: '12px',
    color: GRAY,
    lineHeight: 1.6,
  },

  // CTA strip
  ctaStrip: {
    backgroundColor: GREEN_LIGHT,
    border: '1px solid #C8E6D8',
    margin: '0 24px 40px',
    borderRadius: '10px',
    padding: '18px 20px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    flexWrap: 'wrap',
    gap: '12px',
  },
  ctaText: {
    fontSize: '14px',
    color: '#0F5C35',
  },
  ctaBtn: {
    backgroundColor: GREEN,
    color: WHITE,
    padding: '9px 18px',
    borderRadius: '8px',
    fontSize: '13px',
    fontWeight: '500',
    cursor: 'pointer',
    border: 'none',
    fontFamily: 'inherit',
  },

  // Footer
  footer: {
    padding: '18px 24px',
    backgroundColor: WHITE,
    borderTop: `1px solid ${BORDER}`,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    flexWrap: 'wrap',
    gap: '10px',
  },
  footerBrand: {
    fontFamily: 'Georgia, serif',
    fontSize: '15px',
    color: GREEN,
    fontWeight: '600',
  },
  footerText: {
    fontSize: '12px',
    color: '#aaa',
  },
  footerLinks: {
    display: 'flex',
    gap: '14px',
  },
  footerLink: {
    fontSize: '12px',
    color: GRAY,
    textDecoration: 'none',
  },
}