import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import api from '../utils/api'

const CITIES = ['Pimpri-Chinchwad', 'Pune', 'Mumbai', 'Nashik', 'Nagpur']
const WARDS  = ['Ward 1', 'Ward 2', 'Ward 3', 'Ward 4', 'Ward 5', 'Ward 6']

export default function Register() {
  const navigate = useNavigate()
  const { login } = useAuth()

  const [form, setForm] = useState({
    name: '', email: '', password: '', role: 'resident', city: '', ward: '',
  })
  const [error,   setError]   = useState(null)
  const [loading, setLoading] = useState(false)

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  async function handleSubmit() {
    // Basic validation
    if (!form.name || !form.email || !form.password || !form.city || !form.ward) {
      return setError('All fields are required.')
    }
    if (form.password.length < 8) {
      return setError('Password must be at least 8 characters.')
    }

    setLoading(true)
    setError(null)

    try {
      const res = await api.post('/auth/register', form)
      login(res.data.user, res.data.token)

      // Redirect based on role
      navigate(form.role === 'admin' ? '/admin' : '/home')

    } catch (err) {
      setError(err.response?.data?.message || 'Something went wrong.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div style={s.page}>
      <div style={s.card}>
        {/* Header */}
        <div style={s.brand}>SwachhAlert</div>
        <h1 style={s.title}>Create your account</h1>

        {/* Role selector */}
        <div style={s.roleRow}>
          {['resident', 'admin'].map(role => (
            <div
              key={role}
              style={form.role === role ? { ...s.roleCard, ...s.roleActive } : s.roleCard}
              onClick={() => setForm({ ...form, role })}
            >
              <span style={s.roleIcon}>{role === 'resident' ? '👤' : '🛡️'}</span>
              <div style={s.roleName}>{role === 'resident' ? 'Resident' : 'Admin'}</div>
              <div style={s.roleDesc}>
                {role === 'resident' ? 'Report & track issues' : 'Ward officer / MCGM'}
              </div>
            </div>
          ))}
        </div>

        {/* Fields */}
        <Field label="Full name">
          <input style={s.input} name="name" placeholder="Arjun Sharma"
            value={form.name} onChange={handleChange} />
        </Field>

        <Field label="Email address">
          <input style={s.input} name="email" type="email" placeholder="arjun@example.com"
            value={form.email} onChange={handleChange} />
        </Field>

        <Field label="Password">
          <input style={s.input} name="password" type="password" placeholder="Min. 8 characters"
            value={form.password} onChange={handleChange} />
        </Field>

        <Field label="City">
          <select style={s.input} name="city" value={form.city} onChange={handleChange}>
            <option value="">Select city</option>
            {CITIES.map(c => <option key={c} value={c}>{c}</option>)}
          </select>
        </Field>

        <Field label="Ward">
          <select style={s.input} name="ward" value={form.ward} onChange={handleChange}>
            <option value="">Select ward</option>
            {WARDS.map(w => <option key={w} value={w}>{w}</option>)}
          </select>
        </Field>

        {/* Error */}
        {error && <p style={s.error}>{error}</p>}

        {/* Submit */}
        <button
          style={{ ...s.btn, opacity: loading ? 0.7 : 1 }}
          onClick={handleSubmit}
          disabled={loading}
        >
          {loading ? 'Creating account...' : 'Create account'}
        </button>

        <p style={s.footer}>
          Already have an account?{' '}
          <Link to="/login" style={s.link}>Login here</Link>
        </p>
      </div>
    </div>
  )
}

function Field({ label, children }) {
  return (
    <div style={{ marginBottom: '14px' }}>
      <label style={s.label}>{label}</label>
      {children}
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
  roleRow: {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gap: '8px',
    marginBottom: '18px',
  },
  roleCard: {
    padding: '12px',
    borderRadius: '8px',
    border: '1.5px solid #E8E4DC',
    cursor: 'pointer',
    textAlign: 'center',
  },
  roleActive: {
    borderColor: '#1A7A4A',
    backgroundColor: '#E8F5EE',
  },
  roleIcon: { fontSize: '20px', display: 'block', marginBottom: '4px' },
  roleName: { fontSize: '13px', fontWeight: '500', color: '#111' },
  roleDesc: { fontSize: '11px', color: '#888', marginTop: '2px' },
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