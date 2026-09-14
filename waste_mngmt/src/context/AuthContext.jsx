import { createContext, useContext, useState } from 'react'

// ─── Create context ───────────────────────────────────────────────────────────
const AuthContext = createContext()

// ─── Provider ─────────────────────────────────────────────────────────────────
export function AuthProvider({ children }) {
  // Initialize from localStorage so user stays logged in on page refresh
  const [user, setUser] = useState(() => {
    const saved = localStorage.getItem('user')
    return saved ? JSON.parse(saved) : null
  })

  const [token, setToken] = useState(() => {
    return localStorage.getItem('token') || null
  })

  // ── Called after successful login or register ────────────────────────────
  function login(userData, receivedToken) {
    setUser(userData)
    setToken(receivedToken)
    localStorage.setItem('user',  JSON.stringify(userData))
    localStorage.setItem('token', receivedToken)
  }

  // ── Called on logout ─────────────────────────────────────────────────────
  function logout() {
    setUser(null)
    setToken(null)
    localStorage.removeItem('user')
    localStorage.removeItem('token')
  }

  return (
    <AuthContext.Provider value={{ user, token, login, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

// ─── useAuth hook ─────────────────────────────────────────────────────────────
// Usage: const { user, login, logout } = useAuth()
export function useAuth() {
  return useContext(AuthContext)
}