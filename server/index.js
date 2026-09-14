const express  = require('express')
const mongoose = require('mongoose')
const cors     = require('cors')
const dotenv   = require('dotenv')

// Load .env variables
dotenv.config()

const app = express()

// ─── Middleware ───────────────────────────────────────────────────────────────
app.use(cors())                    // allow React frontend to call this server
app.use(express.json())            // parse incoming JSON request bodies

// ─── Routes (we'll uncomment these as we build them) ─────────────────────────
app.use('/api/auth',       require('./routes/auth'))
app.use('/api/complaints', require('./routes/complaints'))
app.use('/api/admin',      require('./routes/admin'))

// ─── Test route ───────────────────────────────────────────────────────────────
app.get('/', (req, res) => {
  res.json({ message: 'SwachhAlert server is running 🚀' })
})

process.on('unhandledRejection', (err) => {
  console.log('UNHANDLED REJECTION:', err)
})
// ─── Connect to MongoDB then start server ─────────────────────────────────────
const PORT = process.env.PORT || 5000

mongoose
  .connect(process.env.MONGO_URI, {
    serverSelectionTimeoutMS: 10000,
  })
  .then(() => {
    console.log('✅ MongoDB connected')

    app.listen(PORT, '0.0.0.0', () => {
      console.log(`✅ Server running on port ${PORT}`)
    })
  })
  .catch(err => {
    console.error('❌ MongoDB connection failed:', err.message)
  })