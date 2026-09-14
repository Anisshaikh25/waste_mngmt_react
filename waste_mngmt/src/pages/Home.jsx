import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import Navbar from '../components/Navbar'
import ComplaintCard from '../components/ComplaintCard'
import { useAuth } from '../context/AuthContext'
import api from '../utils/api'

// ─── StatsBar ─────────────────────────────────────────────────────────────────
function StatsBar({ complaints }) {
  const total      = complaints.length
  const inProgress = complaints.filter(c => c.status === 'in_progress').length
  const resolved   = complaints.filter(c => c.status === 'resolved').length

  const stats = [
    { label: 'Filed',       num: total,      color: '#111' },
    { label: 'In Progress', num: inProgress,  color: '#185FA5' },
    { label: 'Resolved',    num: resolved,    color: '#1A7A4A' },
  ]

  return (
    <div style={s.statsRow}>
      {stats.map(stat => (
        <div key={stat.label} style={s.statCard}>
          <div style={{ ...s.statNum, color: stat.color }}>{stat.num}</div>
          <div style={s.statLabel}>{stat.label}</div>
        </div>
      ))}
    </div>
  )
}

// ─── Home page ────────────────────────────────────────────────────────────────
export default function Home() {
  const navigate = useNavigate()
  const { user }  = useAuth()

  const [complaints, setComplaints] = useState([])
  const [loading, setLoading]       = useState(true)
  const [error, setError]           = useState(null)

  useEffect(() => {
    api.get('/complaints/mine')
      .then(res => {
        setComplaints(res.data)
        setLoading(false)
      })
      .catch(err => {
        setError('Failed to load complaints.')
        setLoading(false)
      })
  }, [])

  return (
    <div style={s.page}>
      <Navbar />

      <div style={s.body}>
        {/* Greeting */}
        <div style={s.greeting}>
          <h1 style={s.greetTitle}>Good morning, {user?.name} 👋</h1>
          <p style={s.greetSub}>{user?.ward}, {user?.city}</p>
        </div>

        {/* Stats */}
        <StatsBar complaints={complaints} />

        {/* Report button */}
        <button style={s.reportBtn} onClick={() => navigate('/report')}>
          + Report a new dump
        </button>

        {/* Recent complaints */}
        <div style={s.section}>
          <div style={s.sectionHeader}>
            <p style={s.sectionLabel}>Recent complaints</p>
            <span style={s.viewAll} onClick={() => navigate('/complaints')}>
              View all →
            </span>
          </div>

          {loading ? (
            <p style={s.msg}>Loading...</p>
          ) : error ? (
            <p style={s.msg}>{error}</p>
          ) : complaints.length === 0 ? (
            <p style={s.msg}>No complaints yet. Report your first one!</p>
          ) : (
            complaints.slice(0, 3).map(c => (
              <ComplaintCard
                key={c._id}
                id={c._id}
                title={c.title}
                date={new Date(c.createdAt).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}
                category={c.category}
                status={c.status}
                ward={c.ward}
              />
            ))
          )}
        </div>
      </div>
    </div>
  )
}

const s = {
  page: {
    minHeight: '100vh',
    backgroundColor: '#F7F5F0',
    fontFamily: "'DM Sans', system-ui, sans-serif",
  },
  body: {
    maxWidth: '680px',
    margin: '0 auto',
    padding: '24px 20px',
  },
  greeting: { marginBottom: '20px' },
  greetTitle: { fontSize: '22px', fontWeight: '500', color: '#111', margin: 0 },
  greetSub: { fontSize: '13px', color: '#888', margin: '4px 0 0' },
  statsRow: {
    display: 'grid',
    gridTemplateColumns: 'repeat(3, 1fr)',
    gap: '10px',
    marginBottom: '20px',
  },
  statCard: {
    backgroundColor: '#fff',
    border: '1px solid #E8E4DC',
    borderRadius: '8px',
    padding: '14px',
    textAlign: 'center',
  },
  statNum: { fontSize: '24px', fontWeight: '500' },
  statLabel: { fontSize: '11px', color: '#888', marginTop: '3px' },
  reportBtn: {
    width: '100%',
    padding: '14px',
    backgroundColor: '#1A7A4A',
    color: '#fff',
    border: 'none',
    borderRadius: '8px',
    fontSize: '15px',
    fontWeight: '500',
    cursor: 'pointer',
    fontFamily: 'inherit',
    marginBottom: '28px',
  },
  section: { marginBottom: '20px' },
  sectionHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '12px',
  },
  sectionLabel: {
    fontSize: '11px',
    letterSpacing: '1px',
    textTransform: 'uppercase',
    color: '#999',
    margin: 0,
  },
  viewAll: { fontSize: '12px', color: '#185FA5', cursor: 'pointer' },
  msg: { fontSize: '13px', color: '#888', textAlign: 'center', padding: '20px 0' },
}