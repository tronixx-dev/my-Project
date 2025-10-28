const contactModel = require('../models/contactShema')
const getHome = (req, res) => {
    res.send('This is the home route')
}

const getContact = (req, res) => {
    res.send('Contact me')
}

const postContact = async (req, res) => {
    try {
        const {fullName, email, phoneNumber, message} = req.body

        if(email !== "" && message !== ""){
            const contact = await contactModel.create({
                fullName,
                email,
                phoneNumber,
                message
            })

            res.status(201).json(contact)
        }

        res.status(400).json({error: 'Email and message is required'})

    } catch (error) {
        console.error(error)
        res.status(500).json({error: 'Internal server error!!'})
    }
}
module.exports = { getHome, getContact, postContact }