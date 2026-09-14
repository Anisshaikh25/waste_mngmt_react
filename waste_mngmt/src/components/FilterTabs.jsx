// Props:
//   active (string)       — current active filter
//   onChange(filter)      — sends selected filter up to parent
//   counts (object)       — { all, pending, in_progress, resolved }

const TABS = [
  { label: 'All',         value: 'all' },
  { label: 'Pending',     value: 'pending' },
  { label: 'In Progress', value: 'in_progress' },
  { label: 'Resolved',    value: 'resolved' },
]

export default function FilterTabs({ active, onChange, counts = {} }) {
  return (
    <div style={s.row}>
      {TABS.map(tab => {
        const isActive = active === tab.value
        const count    = counts[tab.value]

        return (
          <button
            key={tab.value}
            style={isActive ? { ...s.tab, ...s.tabActive } : s.tab}
            onClick={() => onChange(tab.value)}
          >
            {tab.label}
            {count !== undefined && (
              <span style={isActive ? { ...s.count, ...s.countActive } : s.count}>
                {count}
              </span>
            )}
          </button>
        )
      })}
    </div>
  )
}

const s = {
  row: {
    display: 'flex',
    gap: '6px',
    flexWrap: 'wrap',
    marginBottom: '16px',
  },
  tab: {
    display: 'inline-flex',
    alignItems: 'center',
    gap: '6px',
    padding: '6px 14px',
    borderRadius: '20px',
    border: '1px solid #E8E4DC',
    backgroundColor: '#fff',
    fontSize: '12px',
    color: '#666',
    cursor: 'pointer',
    fontFamily: 'inherit',
  },
  tabActive: {
    backgroundColor: '#1A7A4A',
    color: '#fff',
    borderColor: '#1A7A4A',
  },
  count: {
    fontSize: '10px',
    backgroundColor: '#F1EFE8',
    color: '#888',
    padding: '1px 6px',
    borderRadius: '10px',
    fontWeight: '500',
  },
  countActive: {
    backgroundColor: 'rgba(255,255,255,0.25)',
    color: '#fff',
  },
}