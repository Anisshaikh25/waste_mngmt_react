const express         = require('express')
const Complaint       = require('../models/Complaint')
const authMiddleware  = require('../middleware/authMiddleware')

const router = express.Router()

// ─── POST /api/complaints ─────────────────────────────────────────────────────
// Submit a new complaint — resident only
router.post('/', authMiddleware, async (req, res) => {
  try {
    const { title, description, category, photoUrl, location } = req.body

    // Validate required fields
    if (!title || !description || !category || !location?.address) {
      return res.status(400).json({ message: 'All fields are required' })
    }

    const complaint = await Complaint.create({
      reportedBy:  req.user._id,       // from authMiddleware
      ward:        req.user.ward,       // take ward from logged in user
      title,
      description,
      category,
      photoUrl:    photoUrl || null,
      location,
      status:      'pending',
      statusHistory: [
        {
          status:    'submitted',
          updatedAt: new Date(),
          updatedBy: req.user.name,
        },
      ],
    })

    res.status(201).json(complaint)

  } catch (err) {
    res.status(500).json({ message: err.message })
  }
})

// ─── GET /api/complaints/mine ─────────────────────────────────────────────────
// Get all complaints by logged in resident
router.get('/mine', authMiddleware, async (req, res) => {
  try {
    const complaints = await Complaint
      .find({ reportedBy: req.user._id })
      .sort({ createdAt: -1 })          // newest first

    res.json(complaints)

  } catch (err) {
    res.status(500).json({ message: err.message })
  }
})

// ─── GET /api/complaints/:id ──────────────────────────────────────────────────
// Get single complaint — resident or admin
router.get('/:id', authMiddleware, async (req, res) => {
  try {
    const complaint = await Complaint
      .findById(req.params.id)
      .populate('reportedBy', 'name email')   // attach user name+email

    if (!complaint) {
      return res.status(404).json({ message: 'Complaint not found' })
    }

    // Resident can only view their own complaint
    if (
      req.user.role === 'resident' &&
      complaint.reportedBy._id.toString() !== req.user._id.toString()
    ) {
      return res.status(403).json({ message: 'Access denied' })
    }

    res.json(complaint)

  } catch (err) {
    res.status(500).json({ message: err.message })
  }
})

module.exports = router