
const express = require('express')
const router = express.Router()
const {getHome, getContact, postContact} = require('../controller/userController')

router.get('/', getHome).get('/contact', getContact).post('/post-contact', postContact)

module.exports = router