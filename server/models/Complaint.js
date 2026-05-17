const mongoose = require('mongoose')

const complaintSchema = new mongoose.Schema(
  {
    reportedBy: {
      type:     mongoose.Schema.Types.ObjectId,
      ref:      'User',       // links to User model
      required: true,
    },
    title: {
      type:     String,
      required: [true, 'Title is required'],
      trim:     true,
    },
    description: {
      type:     String,
      required: [true, 'Description is required'],
      trim:     true,
    },
    category: {
      type:     String,
      enum:     ['Roadside dump', 'Bin overflow', 'Construction waste', 'Other'],
      required: [true, 'Category is required'],
    },
    photoUrl: {
      type:    String,
      default: null,          // null if no photo uploaded
    },
    location: {
      lat: { type: Number, default: null },
      lng: { type: Number, default: null },
      address: {
        type:     String,
        required: [true, 'Location is required'],
        trim:     true,
      },
    },
    ward: {
      type:     String,
      required: [true, 'Ward is required'],
      trim:     true,
    },
    status: {
      type:    String,
      enum:    ['pending', 'in_progress', 'resolved'],
      default: 'pending',     // every new complaint starts as pending
    },

    // ── Tracks every status change with timestamp ──────────────────────────
    statusHistory: [
      {
        status:    { type: String },
        updatedAt: { type: Date, default: Date.now },
        updatedBy: { type: String },  // admin name or 'System'
      },
    ],
  },
  {
    timestamps: true,         // adds createdAt and updatedAt
  }
)

module.exports = mongoose.model('Complaint', complaintSchema)