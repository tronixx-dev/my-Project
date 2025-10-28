
const express = require('express')
const mongoose = require('mongoose')
const { getHome, getContact } = require('./controller/userController')
const app = express()
require('dotenv').config()
const userRoute = require('./routes/useRoutes')

mongoose.connect(process.env.MONGODB_URI)
.then(() => console.log('Database connected!!!'))
.catch((err) => console.error(err))

app.get('/', getHome) 
app.get('/contact', getContact)
app.listen(3000, () => {
    console.log('server running on port 3000')
})
