import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Navbar from '../components/Navbar'
import PhotoUpload from '../components/PhotoUpload'
import LocationPicker from '../components/LocationPicker'
import api from '../utils/api'
import uploadPhoto from '../utils/uploadPhoto'

const CATEGORIES = [
  'Roadside dump',
  'Bin overflow',
  'Construction waste',
  'Other',
]

export default function ReportDump() {
  const navigate = useNavigate()

  const [title, setTitle]           = useState('')
  const [description, setDescription] = useState('')
  const [category, setCategory]     = useState('')
  const [photo, setPhoto]           = useState(null)
  const [location, setLocation]     = useState(null)
  const [loading, setLoading]       = useState(false)
  const [error, setError]           = useState(null)

  // ── Validation ──────────────────────────────────────────────────────────────
  function validate() {
    if (!title.trim())       return 'Please add a title.'
    if (!description.trim()) return 'Please add a description.'
    if (!category)           return 'Please select a category.'
    if (!location?.address)  return 'Please provide a location.'
    return null
  }

  // ── Submit ──────────────────────────────────────────────────────────────────
  async function handleSubmit() {
    const err = validate()
    if (err) { setError(err); return }

    setLoading(true)
    setError(null)

    try {
      // Photo upload to Cloudinary will go here later
      const photoUrl = photo ? await uploadPhoto(photo) : null

      await api.post('/complaints', {
        title,
        description,
        category,
        photoUrl,   // replace with photoUrl after Cloudinary setup
        location,
      })

      navigate('/complaints')

    } catch (err) {
      setError(err.response?.data?.message || 'Failed to submit complaint.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div style={s.page}>
      <Navbar />

      <div style={s.body}>
        <button style={s.backBtn} onClick={() => navigate('/home')}>← Back</button>
        <h1 style={s.title}>Report a garbage dump</h1>
        <p style={s.sub}>Your report goes to your ward admin directly.</p>

        {/* Title */}
        <div style={s.field}>
          <label style={s.label}>Title <span style={s.required}>*</span></label>
          <input
            style={s.input}
            placeholder="e.g. Garbage near Pimpri Bus Stand"
            value={title}
            onChange={e => setTitle(e.target.value)}
          />
        </div>

        {/* Description */}
        <div style={s.field}>
          <label style={s.label}>Description <span style={s.required}>*</span></label>
          <textarea
            rows={3}
            placeholder="Describe the issue in detail…"
            value={description}
            onChange={e => setDescription(e.target.value)}
            style={s.textarea}
          />
        </div>

        {/* Category */}
        <div style={s.field}>
          <label style={s.label}>Category <span style={s.required}>*</span></label>
          <select
            value={category}
            onChange={e => setCategory(e.target.value)}
            style={s.input}
          >
            <option value="">Select a category</option>
            {CATEGORIES.map(c => (
              <option key={c} value={c}>{c}</option>
            ))}
          </select>
        </div>

        {/* Photo */}
        <div style={s.field}>
          <label style={s.label}>Photo</label>
          <PhotoUpload onFileSelect={setPhoto} />
          <p style={s.hint}>Photo upload to cloud coming soon.</p>
        </div>

        {/* Location */}
        <div style={s.field}>
          <label style={s.label}>Location <span style={s.required}>*</span></label>
          <LocationPicker onLocation={setLocation} />
        </div>

        {/* Error */}
        {error && <p style={s.error}>{error}</p>}

        {/* Submit */}
        <button
          style={{ ...s.submitBtn, opacity: loading ? 0.7 : 1 }}
          onClick={handleSubmit}
          disabled={loading}
        >
          {loading ? 'Submitting...' : 'Submit complaint'}
        </button>
      </div>
    </div>
  )
}

const s = {
  page: { minHeight: '100vh', backgroundColor: '#F7F5F0', fontFamily: "'DM Sans', system-ui, sans-serif" },
  body: { maxWidth: '680px', margin: '0 auto', padding: '24px 20px' },
  backBtn: { background: 'none', border: 'none', fontSize: '13px', color: '#185FA5', cursor: 'pointer', padding: 0, marginBottom: '16px', fontFamily: 'inherit' },
  title: { fontSize: '22px', fontWeight: '500', color: '#111', margin: '0 0 4px' },
  sub: { fontSize: '13px', color: '#888', margin: '0 0 24px' },
  field: { marginBottom: '20px' },
  label: { display: 'block', fontSize: '13px', fontWeight: '500', color: '#111', marginBottom: '6px' },
  required: { color: '#A32D2D' },
  input: { width: '100%', padding: '9px 12px', border: '1px solid #E8E4DC', borderRadius: '8px', fontSize: '13px', fontFamily: 'inherit', color: '#111', backgroundColor: '#fff', outline: 'none' },
  textarea: { width: '100%', padding: '9px 12px', border: '1px solid #E8E4DC', borderRadius: '8px', fontSize: '13px', fontFamily: 'inherit', color: '#111', resize: 'none', outline: 'none', backgroundColor: '#fff' },
  hint: { fontSize: '11px', color: '#aaa', margin: '5px 0 0' },
  error: { fontSize: '13px', color: '#A32D2D', backgroundColor: '#FCEBEB', padding: '10px 12px', borderRadius: '6px', marginBottom: '14px' },
  submitBtn: { width: '100%', padding: '14px', backgroundColor: '#1A7A4A', color: '#fff', border: 'none', borderRadius: '8px', fontSize: '15px', fontWeight: '500', cursor: 'pointer', fontFamily: 'inherit' },
}