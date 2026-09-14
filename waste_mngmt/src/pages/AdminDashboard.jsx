import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import StatusBadge from '../components/StatusBadge'
import FilterTabs from '../components/FilterTabs'
import { useAuth } from '../context/AuthContext'
import api from '../utils/api'

export default function AdminDashboard() {
  const navigate = useNavigate()
  const { user, logout } = useAuth()

  const [complaints, setComplaints] = useState([])
  const [filter, setFilter]         = useState('all')
  const [search, setSearch]         = useState('')
  const [loading, setLoading]       = useState(true)
  const [error, setError]           = useState(null)

  useEffect(() => {
    api.get('/admin/complaints')
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

  // ── Update status ─────────────────────────────────────────────────────────
  async function handleUpdate(id, currentStatus) {
    const next = currentStatus === 'pending' ? 'in_progress' : 'resolved'
    try {
      const res = await api.patch(`/admin/complaints/${id}`, { status: next })
      setComplaints(prev =>
        prev.map(c => c._id === id ? res.data : c)
      )
    } catch {
      alert('Failed to update status.')
    }
  }

  function handleLogout() {
    logout()
    navigate('/')
  }

  return (
    <div style={s.page}>
      {/* Admin navbar */}
      <nav style={s.nav}>
        <div>
          <div style={s.brand}>⚙ SwachhAlert Admin</div>
          <div style={s.wardTag}>{user?.ward}, {user?.city}</div>
        </div>
        <div style={s.navRight}>
          <span style={s.adminName}>{user?.name}</span>
          <button style={s.logout} onClick={handleLogout}>Logout</button>
        </div>
      </nav>

      <div style={s.body}>
        <h1 style={s.title}>{user?.ward} — Complaints</h1>

        {/* Overview stats */}
        <div style={s.statsRow}>
          {[
            { label: 'Total',       num: counts.all,         color: '#111' },
            { label: 'Pending',     num: counts.pending,     color: '#BA7517' },
            { label: 'In Progress', num: counts.in_progress, color: '#185FA5' },
            { label: 'Resolved',    num: counts.resolved,    color: '#1A7A4A' },
          ].map(stat => (
            <div key={stat.label} style={s.statCard}>
              <div style={{ ...s.statNum, color: stat.color }}>{stat.num}</div>
              <div style={s.statLabel}>{stat.label}</div>
            </div>
          ))}
        </div>

        {/* Search */}
        <input
          style={s.search}
          placeholder="Search complaints…"
          value={search}
          onChange={e => setSearch(e.target.value)}
        />

        {/* Filter tabs */}
        <FilterTabs active={filter} onChange={setFilter} counts={counts} />

        {/* Table */}
        {loading ? (
          <p style={s.msg}>Loading...</p>
        ) : error ? (
          <p style={s.msg}>{error}</p>
        ) : filtered.length === 0 ? (
          <p style={s.msg}>No complaints found.</p>
        ) : (
          <div style={s.table}>
            {/* Header */}
            <div style={{ ...s.row, ...s.tableHead }}>
              <span style={s.colId}>ID</span>
              <span style={s.colDesc}>Description</span>
              <span style={s.colDate}>Date</span>
              <span style={s.colStatus}>Status</span>
              <span style={s.colAction}>Action</span>
            </div>

            {/* Rows */}
            {filtered.map(c => (
              <div key={c._id} style={s.row}>
                <span style={{ ...s.colId, ...s.idText }}>
                  #{c._id.slice(-5).toUpperCase()}
                </span>
                <span
                  style={{ ...s.colDesc, ...s.descLink }}
                  onClick={() => navigate(`/complaints/${c._id}`)}
                >
                  {c.title}
                </span>
                <span style={s.colDate}>
                  {new Date(c.createdAt).toLocaleDateString('en-IN', { day: 'numeric', month: 'short' })}
                </span>
                <span style={s.colStatus}>
                  <StatusBadge status={c.status} />
                </span>
                <span style={s.colAction}>
                  {c.status !== 'resolved' ? (
                    <button
                      style={s.updateBtn}
                      onClick={() => handleUpdate(c._id, c.status)}
                    >
                      {c.status === 'pending' ? 'Start' : 'Resolve'}
                    </button>
                  ) : (
                    <span style={s.doneText}>✓ Done</span>
                  )}
                </span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

const s = {
  page: { minHeight: '100vh', backgroundColor: '#F7F5F0', fontFamily: "'DM Sans', system-ui, sans-serif" },
  nav: { display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '12px 24px', backgroundColor: '#1A1A2E', position: 'sticky', top: 0, zIndex: 100 },
  brand: { fontSize: '16px', fontWeight: '500', color: '#fff' },
  wardTag: { fontSize: '12px', color: 'rgba(255,255,255,0.5)', marginTop: '2px' },
  navRight: { display: 'flex', alignItems: 'center', gap: '12px' },
  adminName: { fontSize: '13px', color: 'rgba(255,255,255,0.75)' },
  logout: { fontSize: '12px', color: 'rgba(255,255,255,0.6)', background: 'none', border: 'none', cursor: 'pointer', fontFamily: 'inherit' },
  body: { maxWidth: '860px', margin: '0 auto', padding: '24px 20px' },
  title: { fontSize: '22px', fontWeight: '500', color: '#111', margin: '0 0 20px' },
  statsRow: { display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '10px', marginBottom: '20px' },
  statCard: { backgroundColor: '#fff', border: '1px solid #E8E4DC', borderRadius: '8px', padding: '14px', textAlign: 'center' },
  statNum: { fontSize: '22px', fontWeight: '500' },
  statLabel: { fontSize: '11px', color: '#888', marginTop: '3px' },
  search: { width: '100%', padding: '9px 12px', border: '1px solid #E8E4DC', borderRadius: '8px', fontSize: '13px', fontFamily: 'inherit', backgroundColor: '#fff', outline: 'none', marginBottom: '12px' },
  table: { backgroundColor: '#fff', border: '1px solid #E8E4DC', borderRadius: '8px', overflow: 'hidden' },
  tableHead: { backgroundColor: '#F7F5F0', borderBottom: '1px solid #E8E4DC', fontWeight: '500', fontSize: '11px', color: '#888' },
  row: { display: 'grid', gridTemplateColumns: '70px 1fr 80px 110px 80px', gap: '12px', padding: '11px 14px', borderBottom: '1px solid #F1EFE8', alignItems: 'center', fontSize: '13px', color: '#111' },
  colId: {}, colDesc: { overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' },
  colDate: { color: '#888', fontSize: '12px' }, colStatus: {}, colAction: {},
  idText: { fontFamily: 'monospace', fontSize: '11px', color: '#aaa' },
  descLink: { cursor: 'pointer', color: '#185FA5' },
  updateBtn: { padding: '4px 10px', backgroundColor: '#1A7A4A', color: '#fff', border: 'none', borderRadius: '6px', fontSize: '11px', cursor: 'pointer', fontFamily: 'inherit' },
  doneText: { fontSize: '11px', color: '#1A7A4A' },
  msg: { fontSize: '13px', color: '#888', textAlign: 'center', padding: '30px 0' },
}