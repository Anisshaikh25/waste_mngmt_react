import { useState, useRef } from 'react'

// Props:
//   onFileSelect(file) — sends selected file up to ReportDump

export default function PhotoUpload({ onFileSelect }) {
  const [preview, setPreview] = useState(null)
  const fileRef = useRef(null)

  function handleFile(e) {
    const file = e.target.files[0]
    if (!file) return
    setPreview(URL.createObjectURL(file))  // show preview
    onFileSelect(file)                     // send file up to parent
  }

  function handleRemove() {
    setPreview(null)
    onFileSelect(null)
    fileRef.current.value = ''            // reset file input
  }

  return (
    <div>
      {/* Hidden real file input */}
      <input
        type="file"
        accept="image/*"
        ref={fileRef}
        style={{ display: 'none' }}
        onChange={handleFile}
      />

      {preview ? (
        // Show preview after file selected
        <div style={s.previewBox}>
          <img src={preview} alt="Preview" style={s.previewImg} />
          <button style={s.removeBtn} onClick={handleRemove}>
            ✕ Remove
          </button>
        </div>
      ) : (
        // Show upload zone before file selected
        <div style={s.uploadZone} onClick={() => fileRef.current.click()}>
          <div style={s.icon}>📷</div>
          <p style={s.uploadText}>Click to upload photo</p>
          <p style={s.uploadHint}>JPG, PNG up to 10MB</p>
        </div>
      )}
    </div>
  )
}

const s = {
  uploadZone: {
    border: '1.5px dashed #C8C4BC',
    borderRadius: '8px',
    padding: '28px',
    textAlign: 'center',
    cursor: 'pointer',
    backgroundColor: '#FAFAF8',
  },
  icon: {
    fontSize: '28px',
    marginBottom: '8px',
  },
  uploadText: {
    fontSize: '13px',
    color: '#1A7A4A',
    fontWeight: '500',
    margin: '0 0 4px',
  },
  uploadHint: {
    fontSize: '11px',
    color: '#aaa',
    margin: 0,
  },
  previewBox: {
    position: 'relative',
    borderRadius: '8px',
    overflow: 'hidden',
    border: '1px solid #E8E4DC',
  },
  previewImg: {
    width: '100%',
    height: '180px',
    objectFit: 'cover',
    display: 'block',
  },
  removeBtn: {
    position: 'absolute',
    top: '8px',
    right: '8px',
    backgroundColor: 'rgba(0,0,0,0.55)',
    color: '#fff',
    border: 'none',
    borderRadius: '6px',
    padding: '4px 10px',
    fontSize: '11px',
    cursor: 'pointer',
    fontFamily: 'inherit',
  },
}