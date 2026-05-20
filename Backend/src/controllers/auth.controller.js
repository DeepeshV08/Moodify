const userModel = require('../models/user.model')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const blacklistModel = require('../models/blacklist.mode')
const redis = require('../config/cache')

async function registerController(req, res) {

    const { username, email, password } = req.body

    const isUserAlreadyExists = await userModel.findOne({
        $or: [
            { username }, { email }
        ]
    })

    if (isUserAlreadyExists) {
        return res.status(404).json({
            message: "user already exits"
        })
    }

    // hash password
    const hash = await bcrypt.hash(password, 10)

    // user create
    const user = await userModel.create({
        username,
        email,
        password: hash
    })
    // Token generate
    const token = jwt.sign({
        id: user._id
    }, process.env.JWT_SECRET, { expiresIn: '3d' })

    res.cookie('jwt_token', token)

    return res.status(201).json({
        message: "User registered successfully..",
        user: {
            id: user._id,
            email: user.email,
            username: user.username
        }
    })
}
async function loginController(req, res) {

    const { email, username, password } = req.body

    const user = await userModel.findOne({
        $or: [
            { email }, { username }
        ]
    }).select('+password')

    if (!user) {
        return res.status(400).json({
            message: "Invalid credential"
        })
    }

    const isPasswordMatched = await bcrypt.compare(password, user.password)

    if (!isPasswordMatched) {
        return res.status(400).json({
            message: "Invalid credentials"
        })
    }

    const token = jwt.sign({
        id: user._id
    }, process.env.JWT_SECRET, { expiresIn: '3d' })

    return res.status(200).json({
        message: "User logged in successfully..",
        user: {
            id: user._id,
            email: user.email,
            username: user.username
        }
    })
}
async function getMeController(req, res) {

    const user = await userModel.findById(req.user.id)

    res.status(200).json({
        message: "User fetched successfully.",
        user
    })


}
async function logoutUserController(req, res) {

    const token = req.cookies.jwt_token
    res.clearCookie('jwt_token')

    // await blacklistModel.create({
    //     token
    // })

    await redis.set(token,Date.now().toString())

    res.status(201).json({
        message:"Logout user successfully.."
    })
}
module.exports = {
    registerController,
    loginController,
    getMeController,
    logoutUserController
}