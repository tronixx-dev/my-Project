
const express = require('express')
const cors = require("cors")
const mongoose = require('mongoose')
const { getHome, getContact, postContact } = require('./controller/contactController')
const app = express()
require('dotenv').config()
const userRoute = require('./routes/userRoutes')

mongoose.connect(process.env.MONGODB_URI,{
    serverSelectionTimeoutMS: 30000
})
.then(() => console.log('Database connected!!!'))
.catch((err) => console.error(err))

app.use(cors({
    origin:"*",
    methods: ["GET", "POST", "DELETE"],
    allowedHeaders: ["content-Type", "Authorization", "Accept", "Origin", "X-Requested-with"],
}))
app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(userRoute)

if(process.env.NODE_ENV !== 'production') {
    app.listen(3000, () => {
        console.log('Server running on port 3000')
    })
}


app.get('/', getHome) 
app.get('/contact', getContact)
app.post('/post-contact', postContact)

// app.listen(3000, () => {
//     console.log('server running on port 3000')
// })

module.exports = app