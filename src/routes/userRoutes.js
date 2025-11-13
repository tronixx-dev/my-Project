
const express = require('express')
const router = express.Router()
const {getHome, getContact, postContact} = require('../controller/contactController')
const {postUser, login, getALL, getSingle, deleteUser} = require('../controller/userController')
const {protect} = require('../middleware/authMiddleware')
const {upload} = require("../utils/upload")

router.get('/', getHome).get('/contact', getContact).post('/post-contact', postContact).post('/post-user', upload.single("profilePicture"), postUser).post('/login', login).get('/all-users', protect, getALL).get("/get-single/:id", protect, getSingle).delete("/delete/:id", protect, deleteUser)

module.exports = router