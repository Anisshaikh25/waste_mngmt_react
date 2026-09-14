const express = require('express')
const jwt     = require('jsonwebtoken')
const User    = require('../models/User')

const router = express.Router()

// ─── Helper — generate JWT token ──────────────────────────────────────────────
function generateToken(user) {
  return jwt.sign(
    { id: user._id, role: user.role },
    process.env.JWT_SECRET,
    { expiresIn: '7d' }    // token expires in 7 days
  )
}

// ─── POST /api/auth/register ──────────────────────────────────────────────────
router.post('/register', async (req, res) => {
  try {
    const { name, email, password, role, city, ward } = req.body

    if (!name || !email || !password || !role) {
      return res.status(400).json({ message: 'All fields are required' })
    }

    const existing = await User.findOne({ email })
    if (existing) {
      return res.status(400).json({ message: 'Email already registered' })
    }

    const user = await User.create({ name, email, password, role, city, ward })

    const token = generateToken(user)

    res.status(201).json({
      token,
      user: {
        id:   user._id,
        name: user.name,
        role: user.role,
        ward: user.ward,
        city: user.city,
      },
    })

  } catch (err) {
    res.status(500).json({ message: err.message })
  }
})

// ─── POST /api/auth/login ─────────────────────────────────────────────────────
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body

    if (!email || !password) {
      return res.status(400).json({ message: 'Email and password are required' })
    }

    // Find user by email
    const user = await User.findOne({ email })
    if (!user) {
      return res.status(401).json({ message: 'Invalid email or password' })
    }

    // Compare password using method from User model
    const isMatch = await user.comparePassword(password)
    if (!isMatch) {
      return res.status(401).json({ message: 'Invalid email or password' })
    }

    // Generate token
    const token = generateToken(user)

    res.json({
      token,
      user: {
        id:   user._id,
        name: user.name,
        role: user.role,
        ward: user.ward,
        city: user.city,
      },
    })

  } catch (err) {
    res.status(500).json({ message: err.message })
  }
})

module.exports = router