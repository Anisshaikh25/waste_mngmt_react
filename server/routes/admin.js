const express          = require('express')
const Complaint        = require('../models/Complaint')
const authMiddleware   = require('../middleware/authMiddleware')
const adminMiddleware  = require('../middleware/adminMiddleware')

const router = express.Router()

// Both middlewares run on every admin route
// authMiddleware  → checks JWT
// adminMiddleware → checks role === 'admin'

// ─── GET /api/admin/complaints ────────────────────────────────────────────────
// Get all complaints in the admin's ward
router.get('/complaints', authMiddleware, adminMiddleware, async (req, res) => {
  try {
    const { status, search } = req.query

    // Build filter object dynamically
    const filter = { ward: req.user.ward }    // only show admin's ward

    if (status && status !== 'all') {
      filter.status = status                  // filter by status if provided
    }

    if (search) {
      filter.title = { $regex: search, $options: 'i' }  // case insensitive search
    }

    const complaints = await Complaint
      .find(filter)
      .populate('reportedBy', 'name email')   // attach resident name + email
      .sort({ createdAt: -1 })                // newest first

    res.json(complaints)

  } catch (err) {
    res.status(500).json({ message: err.message })
  }
})

// ─── PATCH /api/admin/complaints/:id ─────────────────────────────────────────
// Update complaint status
router.patch('/complaints/:id', authMiddleware, adminMiddleware, async (req, res) => {
  try {
    const { status } = req.body

    // Validate status value
    const allowed = ['pending', 'in_progress', 'resolved']
    if (!allowed.includes(status)) {
      return res.status(400).json({ message: 'Invalid status value' })
    }

    const complaint = await Complaint.findById(req.params.id)

    if (!complaint) {
      return res.status(404).json({ message: 'Complaint not found' })
    }

    // Update status
    complaint.status = status

    // Push new entry to statusHistory
    complaint.statusHistory.push({
      status,
      updatedAt: new Date(),
      updatedBy: req.user.name,
    })

    await complaint.save()

    res.json(complaint)

  } catch (err) {
    res.status(500).json({ message: err.message })
  }
})

module.exports = router