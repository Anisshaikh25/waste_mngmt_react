const mongoose = require('mongoose')
const bcrypt   = require('bcryptjs')

const userSchema = new mongoose.Schema(
  {
    name: {
      type:     String,
      required: [true, 'Name is required'],
      trim:     true,
    },
    email: {
      type:      String,
      required:  [true, 'Email is required'],
      unique:    true,
      lowercase: true,
      trim:      true,
    },
    password: {
      type:     String,
      required: [true, 'Password is required'],
      minlength: 8,
    },
    role: {
      type:    String,
      enum:    ['resident', 'admin'],
      default: 'resident',
    },
    city: {
      type: String,
      trim: true,
    },
    ward: {
      type: String,
      trim: true,
    },
  },
  {
    timestamps: true,   // adds createdAt and updatedAt automatically
  }
)

// ─── Hash password before saving ─────────────────────────────────────────────
// This runs automatically every time a user is saved
userSchema.pre('save', async function () {
  if (!this.isModified('password')) return
  const salt = await bcrypt.genSalt(10)
  this.password = await bcrypt.hash(this.password, salt)
})

// ─── Method to compare password on login ─────────────────────────────────────
// Usage: const isMatch = await user.comparePassword(enteredPassword)
userSchema.methods.comparePassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password)
}

module.exports = mongoose.model('User', userSchema)