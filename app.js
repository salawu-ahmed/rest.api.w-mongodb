const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
require('dotenv/config')

const app = express()
mongoose.connect(process.env.DB_CONNECTION_STRING)

// Middle ware
app.use(bodyParser.json())

// routes
const postRoutes = require('./routes/posts')

app.use('/posts', postRoutes)

const port = 5000
app.listen(port, () => console.log(`server running on port ${port}`))