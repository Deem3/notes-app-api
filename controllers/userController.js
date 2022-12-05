const User = require('../models/UserModel')
const jwt = require('jsonwebtoken')

// create token that can be re-used on other functions

const createToken = (_id) => {
    return jwt.sign({_id}, process.env.SECRET, {expiresIn: '3d'})
}

// login
const signinUser = async (req, res) => {
    const {email, password} = req.body

    try {
        const user = await User.signin(email, password)

        // create token

        const token = createToken(user._id)

        res.status(200).json({success: true, email, token})
    } catch (error) {
        res.status(400).json({success: false, error: error.message})
    }
}

// signup
const signupUser = async (req, res) => {
    const {email, password} = req.body

    try {
        const user = await User.signup(email, password)

        // create token

        const token = createToken(user._id)

        res.status(200).json({success: true, email, token})
    } catch (error) {
        res.status(400).json({success: false, error: error.message})
    }
}

module.exports = {
    signinUser,
    signupUser
}