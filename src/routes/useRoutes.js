
const express = require('express')
const router = express.Router()
const {getHome, getContact} = require('../controller/userController')

router.get('/', getHome).get('/contact', getContact)

module.exports = router