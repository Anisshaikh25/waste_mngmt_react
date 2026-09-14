import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import api from '../utils/api'

export default function Login() {
  const navigate = useNavigate()
  const { login } = useAuth()

  const [form, setForm]     = useState({ email: '', password: '' })
  const [error, setError]   = useState(null)
  const [loading, setLoading] = useState(false)

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  async function handleSubmit() {
    if (!form.email || !form.password) {
      return setError('Email and password are required.')
    }

    setLoading(true)
    setError(null)

    try {
      const res = await api.post('/auth/login', form)
      login(res.data.user, res.data.token)

      // Redirect based on role
      navigate(res.data.user.role === 'admin' ? '/admin' : '/home')

    } catch (err) {
      setError(err.response?.data?.message || 'Invalid email or password.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div style={s.page}>
      <div style={s.card}>
        <div style={s.brand}>SwachhAlert</div>
        <h1 style={s.title}>Login to your account</h1>

        <div style={{ marginBottom: '14px' }}>
          <label style={s.label}>Email address</label>
          <input
            style={s.input}
            name="email"
            type="email"
            placeholder="arjun@example.com"
            value={form.email}
            onChange={handleChange}
          />
        </div>

        <div style={{ marginBottom: '14px' }}>
          <label style={s.label}>Password</label>
          <input
            style={s.input}
            name="password"
            type="password"
            placeholder="Your password"
            value={form.password}
            onChange={handleChange}
          />
        </div>

        {error && <p style={s.error}>{error}</p>}

        <button
          style={{ ...s.btn, opacity: loading ? 0.7 : 1 }}
          onClick={handleSubmit}
          disabled={loading}
        >
          {loading ? 'Logging in...' : 'Login'}
        </button>

        <p style={s.footer}>
          Don't have an account?{' '}
          <Link to="/register" style={s.link}>Register here</Link>
        </p>
      </div>
    </div>
  )
}

const s = {
  page: {
    minHeight: '100vh',
    backgroundColor: '#F7F5F0',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontFamily: "'DM Sans', system-ui, sans-serif",
    padding: '24px',
  },
  card: {
    backgroundColor: '#fff',
    border: '1px solid #E8E4DC',
    borderRadius: '12px',
    padding: '32px 28px',
    width: '100%',
    maxWidth: '420px',
  },
  brand: {
    fontFamily: 'Georgia, serif',
    fontSize: '20px',
    color: '#1A7A4A',
    fontWeight: '600',
    marginBottom: '6px',
  },
  title: {
    fontSize: '18px',
    fontWeight: '500',
    color: '#111',
    margin: '0 0 20px',
  },
  label: {
    display: 'block',
    fontSize: '12px',
    fontWeight: '500',
    color: '#111',
    marginBottom: '5px',
  },
  input: {
    width: '100%',
    padding: '9px 12px',
    border: '1px solid #E8E4DC',
    borderRadius: '8px',
    fontSize: '13px',
    fontFamily: 'inherit',
    color: '#111',
    backgroundColor: '#fff',
    outline: 'none',
  },
  error: {
    fontSize: '13px',
    color: '#A32D2D',
    backgroundColor: '#FCEBEB',
    padding: '10px 12px',
    borderRadius: '6px',
    marginBottom: '12px',
  },
  btn: {
    width: '100%',
    padding: '12px',
    backgroundColor: '#1A7A4A',
    color: '#fff',
    border: 'none',
    borderRadius: '8px',
    fontSize: '14px',
    fontWeight: '500',
    cursor: 'pointer',
    fontFamily: 'inherit',
    marginBottom: '14px',
  },
  footer: {
    fontSize: '13px',
    color: '#888',
    textAlign: 'center',
    margin: 0,
  },
  link: {
    color: '#185FA5',
    textDecoration: 'none',
  },
}