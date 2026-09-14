import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import Navbar from '../components/Navbar'
import ComplaintCard from '../components/ComplaintCard'
import FilterTabs from '../components/FilterTabs'
import api from '../utils/api'

export default function MyComplaints() {
  const navigate = useNavigate()

  const [complaints, setComplaints] = useState([])
  const [filter, setFilter]         = useState('all')
  const [search, setSearch]         = useState('')
  const [loading, setLoading]       = useState(true)
  const [error, setError]           = useState(null)

  useEffect(() => {
    api.get('/complaints/mine')
      .then(res => {
        setComplaints(res.data)
        setLoading(false)
      })
      .catch(() => {
        setError('Failed to load complaints.')
        setLoading(false)
      })
  }, [])

  // ── Filter + search ───────────────────────────────────────────────────────
  const filtered = complaints
    .filter(c => filter === 'all' || c.status === filter)
    .filter(c => c.title.toLowerCase().includes(search.toLowerCase()))

  const counts = {
    all:         complaints.length,
    pending:     complaints.filter(c => c.status === 'pending').length,
    in_progress: complaints.filter(c => c.status === 'in_progress').length,
    resolved:    complaints.filter(c => c.status === 'resolved').length,
  }

  return (
    <div style={s.page}>
      <Navbar />

      <div style={s.body}>
        <div style={s.header}>
          <h1 style={s.title}>
            My Complaints
            <span style={s.countBadge}>{complaints.length}</span>
          </h1>
          <button style={s.reportBtn} onClick={() => navigate('/report')}>
            + New
          </button>
        </div>

        <input
          style={s.search}
          placeholder="Search complaints…"
          value={search}
          onChange={e => setSearch(e.target.value)}
        />

        <FilterTabs active={filter} onChange={setFilter} counts={counts} />

        {loading ? (
          <p style={s.msg}>Loading...</p>
        ) : error ? (
          <p style={s.msg}>{error}</p>
        ) : filtered.length === 0 ? (
          <div style={s.emptyBox}>
            <p style={s.emptyIcon}>🗂️</p>
            <p style={s.emptyText}>No complaints found.</p>
            <button style={s.emptyBtn} onClick={() => navigate('/report')}>
              Report your first one
            </button>
          </div>
        ) : (
          filtered.map(c => (
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
  header: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: '16px',
  },
  title: {
    fontSize: '22px',
    fontWeight: '500',
    color: '#111',
    margin: 0,
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
  },
  countBadge: { fontSize: '13px', color: '#888', fontWeight: '400' },
  reportBtn: {
    backgroundColor: '#1A7A4A',
    color: '#fff',
    border: 'none',
    borderRadius: '8px',
    padding: '8px 16px',
    fontSize: '13px',
    fontWeight: '500',
    cursor: 'pointer',
    fontFamily: 'inherit',
  },
  search: {
    width: '100%',
    padding: '9px 12px',
    border: '1px solid #E8E4DC',
    borderRadius: '8px',
    fontSize: '13px',
    fontFamily: 'inherit',
    color: '#111',
    backgroundColor: '#fff',
    outline: 'none',
    marginBottom: '12px',
  },
  msg: { fontSize: '13px', color: '#888', textAlign: 'center', padding: '30px 0' },
  emptyBox: { textAlign: 'center', padding: '40px 0' },
  emptyIcon: { fontSize: '32px', marginBottom: '8px' },
  emptyText: { fontSize: '14px', color: '#888', marginBottom: '14px' },
  emptyBtn: {
    backgroundColor: '#1A7A4A',
    color: '#fff',
    border: 'none',
    borderRadius: '8px',
    padding: '10px 20px',
    fontSize: '13px',
    fontWeight: '500',
    cursor: 'pointer',
    fontFamily: 'inherit',
  },
}