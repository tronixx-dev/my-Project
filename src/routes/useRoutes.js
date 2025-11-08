
const express = require('express')
const router = express.Router()
const {getHome, getContact, postContact} = require('../controller/contactController')
const {postUser, login} = require('../controller/userControlleer')

router.get('/', getHome).get('/contact', getContact).post('/post-contact', postContact).post('/post-user', postUser).post('/login', login)

module.exports = router