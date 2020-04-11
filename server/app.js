require('dotenv').config()
const express = require('express')
const PORT = process.env.PORT || 4000
const routes = require('./routes')
const cors = require('cors')
const app = express()

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: false}))

app.use(routes)

app.listen(PORT, () => console.log(`listen to port ${PORT}`))