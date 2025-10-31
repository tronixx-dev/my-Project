
const express = require('express')
const mongoose = require('mongoose')
const { getHome, getContact, postContact } = require('./controller/contactController')
const app = express()
require('dotenv').config()
const userRoute = require('./routes/useRoutes')

mongoose.connect(process.env.MONGODB_URI)
.then(() => console.log('Database connected!!!'))
.catch((err) => console.error(err))

app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(userRoute)


app.get('/', getHome) 
app.get('/contact', getContact)
app.post('/post-contact', postContact)

app.listen(3000, () => {
    console.log('server running on port 3000')
})
