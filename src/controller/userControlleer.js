
const { userValidator } = require('../validator/userValidator')
const userModel = require('../models/userSchema');
const { findOne } = require('../models/contactShema');
const bcrypt = require('bcryptjs')

const postUser = async (req, res) => {
    try {
        const { username, email, password } = req.body

        const { error } = userValidator.validate({ username, email, password })
        if (error) {
            return res.status(400).json({
                error: error.details[0].message
            })
        }

        const userExist = await userModel.findOne({email})
        if(userExist) {
            return res.status(400).json({message: 'user already exists!!'})
        }

        const user = userModel.create({
            username,
            email,
            password
        })

        return res.status(201).json({
            message: 'User created successfully',
            user,
        });
    } catch (err) {
        console.error(err)
        res.status(500).json({
            reason: 'Internal server error!!!',
        });
    }
};

const login = async (req, res) => {
    try {
        const {email, password} = req.body

        const existingUser = await userModel.findOne({email})
        
        if (!existingUser)  return res.status(400).json({message: 'User already exist, please sign up.'})

            const checkpassword = await bcrypt.compare(password, existingUser.password)

            if(!checkpassword) return res.status(400).json({message: 'Invalid credentials'});

                return res.status(200).json({
                    message: 'User logged in',
                    existingUser
                });



    } catch (error) {
        console.error(error)
    }
}
module.exports = {postUser, login}