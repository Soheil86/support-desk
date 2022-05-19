const path = require('path')
const express = require('express')
const colors = require('colors')
const dotenv = require('dotenv').config()
const { errorHandler } = require('./middleware/errorMiddleware')
const connectDB = require('./config/db')
const PORT = process.env.PORT || 5000

connectDB()

const app = express()

const cors = require('cors')
const corsOptions = {
  origin: '*',
  credentials: true, //access-control-allow-credentials:true
  optionSuccessStatus: 200,
}

app.use(cors(corsOptions))

app.use(express.json())
app.use(express.urlencoded({ extended: false }))

app.get('/', (req, res) => {
  res.status(200).json({ message: 'Welcome to the Support Desk Application ' })
})

//Routes
app.use('/api/users', require('./routes/userRoutes'))
app.use('/api/tickets', require('./routes/ticketRoutes'))

//Serve Frontend
if (process.env.NODE_ENV === 'production') {
  // Set build folder as Static
  app.use(express.static(path.join(__dirname, '../frontend/build')))
  app.get('*', (req, res) =>
    res.sendFile(__dirname, '../', 'frontend', 'build', 'index.html')
  )
} else {
  app.get('/', (req, res) => {
    res
      .status(200)
      .json({ message: 'Welcomeeeeeeee to the Support Desk Application ' })
  })
}

app.use(errorHandler)

app.listen(PORT, () => console.log(`Server started on port ${PORT}`))
