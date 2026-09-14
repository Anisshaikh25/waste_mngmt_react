import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import Navbar from '../components/Navbar'
import StatusBadge from '../components/StatusBadge'
import StatusTimeline from '../components/StatusTimeline'
import api from '../utils/api'

export default function ComplaintDetail() {
  const { id } = useParams()
  const navigate = useNavigate()

  const [complaint, setComplaint] = useState(null)
  const [loading, setLoading]     = useState(true)
  const [error, setError]         = useState(null)

  useEffect(() => {
    api.get(`/complaints/${id}`)
      .then(res => {
        setComplaint(res.data)
        setLoading(false)
      })
      .catch(() => {
        setError('Complaint not found.')
        setLoading(false)
      })
  }, [id])

  if (loading) return (
    <div style={s.page}><Navbar /><p style={s.msg}>Loading...</p></div>
  )

  if (error || !complaint) return (
    <div style={s.page}>
      <Navbar />
      <div style={s.body}>
        <p style={s.msg}>{error}</p>
        <button style={s.backBtn} onClick={() => navigate('/complaints')}>
          ← Back to My Complaints
        </button>
      </div>
    </div>
  )

  return (
    <div style={s.page}>
      <Navbar />

      <div style={s.body}>
        {/* Back */}
        <button style={s.backBtn} onClick={() => navigate('/complaints')}>
          ← Back to My Complaints
        </button>

        {/* Header */}
        <div style={s.header}>
          <div>
            <p style={s.complaintId}>Complaint #{complaint._id.slice(-5).toUpperCase()}</p>
            <h1 style={s.title}>{complaint.title}</h1>
            <p style={s.date}>
              Submitted on {new Date(complaint.createdAt).toLocaleDateString('en-IN', {
                day: 'numeric', month: 'long', year: 'numeric'
              })}
            </p>
          </div>
          <StatusBadge status={complaint.status} />
        </div>

        {/* Photo */}
        <div style={s.section}>
          {complaint.photoUrl ? (
            <img src={complaint.photoUrl} alt="Complaint" style={s.photo} />
          ) : (
            <div style={s.photoPlaceholder}>
              <span style={s.photoIcon}>📷</span>
              <p style={s.photoText}>No photo available</p>
            </div>
          )}
        </div>

        {/* Info */}
        <div style={{ ...s.section, ...s.infoCard }}>
          <InfoRow label="Description" value={complaint.description} />
          <Divider />
          <InfoRow label="Category"    value={complaint.category} />
          <InfoRow label="Ward"        value={complaint.ward} />
          <InfoRow label="Location"    value={`📍 ${complaint.location.address}`} />
        </div>

        {/* Timeline */}
        <div style={s.section}>
          <p style={s.sectionLabel}>Status timeline</p>
          <StatusTimeline statusHistory={complaint.statusHistory} />
        </div>
      </div>
    </div>
  )
}

function InfoRow({ label, value }) {
  return (
    <div style={s.infoRow}>
      <span style={s.infoKey}>{label}</span>
      <span style={s.infoVal}>{value}</span>
    </div>
  )
}

function Divider() {
  return <div style={s.divider} />
}

const s = {
  page: { minHeight: '100vh', backgroundColor: '#F7F5F0', fontFamily: "'DM Sans', system-ui, sans-serif" },
  body: { maxWidth: '680px', margin: '0 auto', padding: '24px 20px' },
  backBtn: { background: 'none', border: 'none', fontSize: '13px', color: '#185FA5', cursor: 'pointer', padding: 0, marginBottom: '16px', fontFamily: 'inherit' },
  header: { display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '20px' },
  complaintId: { fontSize: '11px', color: '#aaa', fontFamily: 'monospace', margin: '0 0 4px' },
  title: { fontSize: '20px', fontWeight: '500', color: '#111', margin: '0 0 4px' },
  date: { fontSize: '12px', color: '#888', margin: 0 },
  photo: { width: '100%', height: '200px', objectFit: 'cover', borderRadius: '8px', display: 'block' },
  photoPlaceholder: { width: '100%', height: '140px', backgroundColor: '#F1EFE8', borderRadius: '8px', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: '6px', border: '1px solid #E8E4DC' },
  photoIcon: { fontSize: '28px', opacity: 0.4 },
  photoText: { fontSize: '12px', color: '#aaa', margin: 0 },
  infoCard: { backgroundColor: '#fff', border: '1px solid #E8E4DC', borderRadius: '8px', padding: '14px' },
  infoRow: { display: 'flex', gap: '12px', padding: '6px 0', alignItems: 'flex-start' },
  infoKey: { fontSize: '12px', color: '#888', minWidth: '90px', flexShrink: 0 },
  infoVal: { fontSize: '13px', color: '#111', lineHeight: 1.5 },
  divider: { height: '1px', backgroundColor: '#F1EFE8', margin: '4px 0' },
  section: { marginBottom: '20px' },
  sectionLabel: { fontSize: '11px', letterSpacing: '1px', textTransform: 'uppercase', color: '#999', margin: '0 0 12px' },
  msg: { fontSize: '13px', color: '#888', textAlign: 'center', padding: '40px 0' },
}