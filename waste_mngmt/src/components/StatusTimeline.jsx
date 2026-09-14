// Props:
//   statusHistory (array) — [{ status, label, updatedAt, done }]

const DEFAULT_STEPS = [
  { status: 'submitted',   label: 'Complaint submitted' },
  { status: 'received',    label: 'Received by ward admin' },
  { status: 'in_progress', label: 'Assigned to cleanup crew' },
  { status: 'resolved',    label: 'Issue resolved' },
]

export default function StatusTimeline({ statusHistory = [] }) {
  // Match each default step against history to know if it's done
  const steps = DEFAULT_STEPS.map(step => {
    const match = statusHistory.find(h => h.status === step.status)
    return {
      ...step,
      done:      !!match,
      updatedAt: match?.updatedAt || null,
      updatedBy: match?.updatedBy || null,
    }
  })

  return (
    <div style={s.timeline}>
      {steps.map((step, i) => (
        <div key={step.status} style={s.item}>
          {/* Dot + line */}
          <div style={s.dotCol}>
            <div style={step.done ? s.dotDone : s.dotPending}>
              {step.done ? '✓' : '○'}
            </div>
            {/* Vertical line — hide on last item */}
            {i < steps.length - 1 && (
              <div style={step.done ? s.lineDone : s.linePending} />
            )}
          </div>

          {/* Text */}
          <div style={s.textCol}>
            <p style={step.done ? s.labelDone : s.labelPending}>
              {step.label}
            </p>
            {step.updatedAt && (
              <p style={s.meta}>
                {step.updatedAt}
                {step.updatedBy && ` · ${step.updatedBy}`}
              </p>
            )}
          </div>
        </div>
      ))}
    </div>
  )
}

const s = {
  timeline: {
    display: 'flex',
    flexDirection: 'column',
  },
  item: {
    display: 'flex',
    gap: '12px',
    alignItems: 'flex-start',
  },
  dotCol: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    flexShrink: 0,
  },
  dotDone: {
    width: '22px',
    height: '22px',
    borderRadius: '50%',
    backgroundColor: '#E8F5EE',
    color: '#1A7A4A',
    fontSize: '11px',
    fontWeight: '700',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  dotPending: {
    width: '22px',
    height: '22px',
    borderRadius: '50%',
    backgroundColor: '#F1EFE8',
    color: '#aaa',
    fontSize: '11px',
    border: '1px dashed #ccc',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  lineDone: {
    width: '2px',
    height: '28px',
    backgroundColor: '#C8E6D8',
  },
  linePending: {
    width: '2px',
    height: '28px',
    backgroundColor: '#E8E4DC',
  },
  textCol: {
    paddingBottom: '16px',
  },
  labelDone: {
    fontSize: '13px',
    color: '#111',
    fontWeight: '500',
    margin: '2px 0 0',
  },
  labelPending: {
    fontSize: '13px',
    color: '#aaa',
    margin: '2px 0 0',
  },
  meta: {
    fontSize: '11px',
    color: '#888',
    margin: '3px 0 0',
  },
}