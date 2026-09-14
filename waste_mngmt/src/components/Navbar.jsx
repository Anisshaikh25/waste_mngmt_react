import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

export default function Navbar() {
  const { user, logout } = useAuth()
  const navigate = useNavigate()

  function handleLogout() {
    logout()
    navigate('/')
  }

  return (
    <nav style={s.nav}>
      {/* Brand */}
      <Link to="/home" style={{ textDecoration: 'none' }}>
        <div style={s.brand}>
          <span style={s.brandDot} />
          SwachhAlert
        </div>
      </Link>

      {/* Nav links */}
      <div style={s.links}>
        <Link to="/home"       style={s.link}>Home</Link>
        <Link to="/complaints" style={s.link}>My Complaints</Link>
        <Link to="/report"     style={s.reportBtn}>+ Report</Link>
      </div>

      {/* User */}
      <div style={s.user}>
        <div style={s.avatar}>
          {user?.name?.charAt(0).toUpperCase() || 'U'}
        </div>
        <span style={s.userName}>{user?.name}</span>
        <button style={s.logout} onClick={handleLogout}>Logout</button>
      </div>
    </nav>
  )
}

const s = {
  nav: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: '12px 24px',
    backgroundColor: '#1A7A4A',
    position: 'sticky',
    top: 0,
    zIndex: 100,
  },
  brand: {
    fontFamily: 'Georgia, serif',
    fontSize: '18px',
    fontWeight: '600',
    color: '#fff',
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
  },
  brandDot: {
    width: '8px',
    height: '8px',
    borderRadius: '50%',
    backgroundColor: '#fff',
    display: 'inline-block',
  },
  links: {
    display: 'flex',
    alignItems: 'center',
    gap: '6px',
  },
  link: {
    fontSize: '13px',
    color: 'rgba(255,255,255,0.85)',
    textDecoration: 'none',
    padding: '6px 12px',
    borderRadius: '6px',
  },
  reportBtn: {
    fontSize: '13px',
    color: '#1A7A4A',
    textDecoration: 'none',
    padding: '6px 14px',
    borderRadius: '6px',
    backgroundColor: '#fff',
    fontWeight: '500',
  },
  user: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
  },
  avatar: {
    width: '30px',
    height: '30px',
    borderRadius: '50%',
    backgroundColor: 'rgba(255,255,255,0.2)',
    color: '#fff',
    fontSize: '13px',
    fontWeight: '500',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  userName: {
    fontSize: '13px',
    color: 'rgba(255,255,255,0.85)',
  },
  logout: {
    fontSize: '12px',
    color: 'rgba(255,255,255,0.75)',
    background: 'none',
    border: 'none',
    cursor: 'pointer',
    fontFamily: 'inherit',
  },
}