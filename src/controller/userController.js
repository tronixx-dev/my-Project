
const { userValidator } = require('../validator/userValidator')
const {userModel} = require('../models/userSchema');
const {profileModel} = require('../models/profileSchema')

const bcrypt = require('bcryptjs')
const { generateToken } = require('../middleware/generateToken')


const postUser = async (req, res) => {
  try {
    const { username, email, password, bio } = req.body;
    const profilePicture = req.file ? req.file.filename : null;

    // Validate request
    const { error } = userValidator.validate({ username, email, password, bio });
    if (error) {
      return res.status(400).json({ error: error.details[0].message });
    }

    // Check if user already exists
    const userExist = await userModel.findOne({ email });
    if (userExist) {
      return res.status(400).json({ message: "User already exists!!" });
    }

    //  Create  user 
    const user = await userModel.create({
      username,
      email,
      password,
    });

    //  create the profile linked to the user
    const profile = await profileModel.create({
      bio,
      profilePicture,
      user: user._id,
    });

    //  Link profile back to user
    await userModel.findByIdAndUpdate(user._id, { profile: profile._id });

    // Populate the profile field
    const populatedUser = await userModel.findById(user._id).populate("profile");

    return res.status(201).json({
      message: "User created successfully",
      user: populatedUser,
      token: generateToken(user._id),
    });

  } catch (err) {
    console.error(err);
    res.status(500).json({ reason: "Internal server error!!" });
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
                    existingUser,
                    token: generateToken(existingUser._id)
                });



    } catch (error) {
        console.error(error)
    }
}

const getALL = async(req, res) => {
    try {
        const users = await userModel.find()

        if(!users) return res.status(404).json({
            message: 'No users found'
        })

        res.status(200).json(users)
    } catch (error) {
        console.error(error)
        res.status(500).json({
            reason: error.message
        })

    }
}

const getSingle = async (req, res) => {
    try {
        const { id } = req.params
        const user = await userModel.findById(id)
        if(!user) return res.status(404).json({
            message: 'User not found'
        })
        
        res.status(200).json(user)
    } catch (error) {
        console.error(err)
        res.status(500).json({
            reason: err.message
        })
    }
}

const deleteUser = async (req, res) => {
    try {
        const { id } = req.params

        const deleteUser = await userModel.findByIdAndDelete(id)
        if(!deleteUser) return res.status(404).json({
            message: "User not found."
        })

        res.status(500).json({
            message: "User deleted successfully!",
            deleteUser
        })
    } catch (err) {
        console.error(err)
        res.status(500).json({
            reason: err.message
        })
    }
}
module.exports = {postUser, login, getALL, getSingle, deleteUser};