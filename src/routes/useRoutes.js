
const express = require('express')
const router = express.Router()
const {getHome, getContact, postContact} = require('../controller/contactController')
const {postUser} = require('../controller/userControlleer')

router.get('/', getHome).get('/contact', getContact).post('/post-contact', postContact).post('/post-user', postUser)

module.exports = router