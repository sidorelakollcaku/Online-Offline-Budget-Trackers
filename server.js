const express = require('express')
const logger = require('morgan')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const compression = require('compression')

// Initialize the express application
const app = express()

// Set up the middlewares
app.use(logger('dev'))
app.use(compression())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

// Middleware that allows express to server static files to the client
app.use(express.static('public'))

mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost/budget', {
  useNewUrlParser: true,
  useFindAndModify: false,
  useUnifiedTopology: true,
  useCreateIndex: true
})

// Import all api routes
app.use(require('./routes/api.js'))

const PORT = process.env.PORT || 3000
app.listen(PORT, () => {
  console.log(`App running on port ${PORT}!`)
})