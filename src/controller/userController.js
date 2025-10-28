
const getHome = (req, res) => {
    res.send('This is the home route')
}

const getContact = (req, res) => {
    res.send('Contact me')
}

module.exports = { getHome, getContact }