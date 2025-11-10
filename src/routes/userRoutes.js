
const express = require('express')
const router = express.Router()
const {getHome, getContact, postContact} = require('../controller/contactController')
const {postUser, login, getALL} = require('../controller/userControlleer')
const {protect} = require('../middleware/authMiddleware')

router.get('/', getHome).get('/contact', getContact).post('/post-contact', postContact).post('/post-user', postUser).post('/login', login).get('/all-users', protect, getALL)

module.exports = router