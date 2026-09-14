import { useState } from 'react'

// Props:
//   onLocation({ lat, lng, address }) — sends location up to ReportDump

export default function LocationPicker({ onLocation }) {
  const [address, setAddress]   = useState('')
  const [detected, setDetected] = useState(null)
  const [loading, setLoading]   = useState(false)
  const [error, setError]       = useState(null)

  // ── Auto detect via browser GPS ──────────────────────────────────────────
  function detectLocation() {
    if (!navigator.geolocation) {
      setError('Geolocation is not supported by your browser.')
      return
    }

    setLoading(true)
    setError(null)

    navigator.geolocation.getCurrentPosition(
      async (pos) => {
        const lat = pos.coords.latitude
        const lng = pos.coords.longitude

        // Reverse geocode using OpenStreetMap Nominatim (free, no API key)
        try {
          const res = await fetch(
            `https://nominatim.openstreetmap.org/reverse?lat=${lat}&lon=${lng}&format=json`
          )
          const data = await res.json()
          const a = data.address || {}

          // Build clean address from structured Nominatim fields
          const parts = [
            a.road || a.pedestrian || a.footway,
            a.suburb || a.neighbourhood || a.village,
            a.city || a.town || a.county,
            a.state,
          ].filter(Boolean)

          const readableAddress = parts.length > 0
            ? parts.join(', ')
            : `${lat.toFixed(4)}, ${lng.toFixed(4)}`

          setDetected(readableAddress)
          setAddress('')             // clear manual input
          onLocation({ lat, lng, address: readableAddress })
        } catch {
          // If reverse geocode fails, still pass coords
          setDetected(`${lat}, ${lng}`)
          onLocation({ lat, lng, address: `${lat}, ${lng}` })
        }

        setLoading(false)
      },
      (err) => {
        setError('Could not get location. Please enter address manually.')
        setLoading(false)
      }
    )
  }

  // ── Manual address input ──────────────────────────────────────────────────
  function handleManual(e) {
    setAddress(e.target.value)
    setDetected(null)              // clear GPS result
    onLocation({ lat: null, lng: null, address: e.target.value })
  }

  return (
    <div>
      {/* GPS button */}
      <button
        type="button"
        style={s.gpsBtn}
        onClick={detectLocation}
        disabled={loading}
      >
        {loading ? '📡 Detecting...' : '📍 Use my current location'}
      </button>

      {/* Detected address */}
      {detected && (
        <div style={s.detectedBox}>
          <span style={s.tick}>✓</span>
          <span style={s.detectedText}>{detected}</span>
        </div>
      )}

      {/* Divider */}
      <div style={s.divider}>
        <div style={s.dividerLine} />
        <span style={s.dividerText}>or</span>
        <div style={s.dividerLine} />
      </div>

      {/* Manual input */}
      <input
        type="text"
        placeholder="Enter address manually"
        value={address}
        onChange={handleManual}
        style={s.input}
      />

      {/* Error */}
      {error && <p style={s.error}>{error}</p>}
    </div>
  )
}

const s = {
  gpsBtn: {
    width: '100%',
    padding: '10px',
    backgroundColor: '#E6F1FB',
    color: '#185FA5',
    border: '1px solid #B5D4F4',
    borderRadius: '8px',
    fontSize: '13px',
    fontWeight: '500',
    cursor: 'pointer',
    fontFamily: 'inherit',
    marginBottom: '10px',
  },
  detectedBox: {
    display: 'flex',
    alignItems: 'flex-start',
    gap: '6px',
    padding: '8px 10px',
    backgroundColor: '#E8F5EE',
    borderRadius: '6px',
    marginBottom: '10px',
  },
  tick: {
    color: '#1A7A4A',
    fontWeight: '700',
    flexShrink: 0,
  },
  detectedText: {
    fontSize: '12px',
    color: '#0F5C35',
    lineHeight: 1.5,
  },
  divider: {
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
    marginBottom: '10px',
  },
  dividerLine: {
    flex: 1,
    height: '1px',
    backgroundColor: '#E8E4DC',
  },
  dividerText: {
    fontSize: '11px',
    color: '#aaa',
  },
  input: {
    width: '100%',
    padding: '9px 12px',
    border: '1px solid #E8E4DC',
    borderRadius: '8px',
    fontSize: '13px',
    color: '#111',
    fontFamily: 'inherit',
    backgroundColor: '#fff',
    outline: 'none',
  },
  error: {
    fontSize: '12px',
    color: '#A32D2D',
    marginTop: '6px',
  },
}