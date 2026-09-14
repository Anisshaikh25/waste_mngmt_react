import { useNavigate } from 'react-router-dom'
import StatusBadge from './StatusBadge'

// Props:
//   id, title, date, category, status, ward

const BORDER_COLOR = {
  pending:     '#BA7517',
  in_progress: '#185FA5',
  resolved:    '#1A7A4A',
}

export default function ComplaintCard({ id, title, date, category, status, ward }) {
  const navigate = useNavigate()

  return (
    <div
      style={{ ...s.card, borderLeftColor: BORDER_COLOR[status] || '#ccc' }}
      onClick={() => navigate(`/complaints/${id}`)}
    >
      <div style={s.left}>
        <h3 style={s.title}>{title}</h3>
        <p style={s.meta}>{date} · {category} · {ward}</p>
      </div>
      <StatusBadge status={status} />
    </div>
  )
}

const s = {
  card: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: '12px 14px',
    backgroundColor: '#fff',
    border: '1px solid #E8E4DC',
    borderLeft: '3px solid',
    borderRadius: '8px',
    marginBottom: '10px',
    cursor: 'pointer',
  },
  left:  { display: 'flex', flexDirection: 'column', gap: '4px' },
  title: { fontSize: '13px', fontWeight: '500', color: '#111', margin: 0 },
  meta:  { fontSize: '11px', color: '#888', margin: 0 },
}