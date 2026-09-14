// ─── StatusBadge ──────────────────────────────────────────────────────────────
// Props:
//   status (string) — 'pending' | 'in_progress' | 'resolved'
//
// Usage:
//   <StatusBadge status="pending" />
//   <StatusBadge status="in_progress" />
//   <StatusBadge status="resolved" />
// ─────────────────────────────────────────────────────────────────────────────

const CONFIG = {
  pending: {
    label: 'Pending',
    backgroundColor: '#FAEEDA',
    color: '#BA7517',
  },
  in_progress: {
    label: 'In Progress',
    backgroundColor: '#E6F1FB',
    color: '#185FA5',
  },
  resolved: {
    label: 'Resolved',
    backgroundColor: '#E8F5EE',
    color: '#1A7A4A',
  },
}

export default function StatusBadge({ status }) {
  // Fallback if an unknown status is passed
  const config = CONFIG[status] || {
    label: status,
    backgroundColor: '#F1EFE8',
    color: '#666',
  }

  return (
    <span style={{ ...s.badge, backgroundColor: config.backgroundColor, color: config.color }}>
      {config.label}
    </span>
  )
}

const s = {
  badge: {
    display: 'inline-flex',
    alignItems: 'center',
    padding: '3px 10px',
    borderRadius: '20px',
    fontSize: '11px',
    fontWeight: '500',
    whiteSpace: 'nowrap',
    fontFamily: "'DM Sans', system-ui, sans-serif",
  },
}