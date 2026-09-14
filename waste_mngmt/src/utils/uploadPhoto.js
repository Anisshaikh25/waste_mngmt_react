// Uploads a photo file to Cloudinary and returns the image URL
// Usage: const photoUrl = await uploadPhoto(file)

export default async function uploadPhoto(file) {
  if (!file) return null

  const formData = new FormData()
  formData.append('file', file)
  formData.append('upload_preset', 'swachhalert_uploads')  // your upload preset name

  const cloudName = 'dmhqkuy59'  // replace with your actual cloud name

  const res = await fetch(
    `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`,
    {
      method: 'POST',
      body:   formData,
    }
  )

  const data = await res.json()

  if (!res.ok) {
    throw new Error(data.error?.message || 'Photo upload failed')
  }

  return data.secure_url  // the permanent image URL
}