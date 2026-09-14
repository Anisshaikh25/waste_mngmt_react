import { Navigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

// Props:
//   children    — the page to render if allowed
//   role        — 'admin' | 'resident' | undefined (any logged in user)

export default function ProtectedRoute({ children, role }) {
  const { user } = useAuth()

  // Not logged in → go to login
  if (!user) return <Navigate to="/login" />

  // Wrong role → redirect
  if (role && user.role !== role) {
    return <Navigate to={user.role === 'admin' ? '/admin' : '/home'} />
  }

  return children
}