const userModel = require('../models/user.model')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')

async function registerController(req,res){

    const{username , email , password} = req.body

    const isUserAlreadyExists = await userModel.findOne({
        $or:[
            {username},{email}
        ]
    })

    if(isUserAlreadyExists){
        return res.status(404).json({
            message:"user already exits"
        })
    }

    // hash password
    const hash = await bcrypt.hash(password,10)

    // user create
    const user = await userModel.create({
        username,
        email,
        password:hash
    })
    // Token generate
    const token = jwt.sign({
        id : user._id
    },process.env.JWT_SECRET,{expiresIn:'3d'})

    res.cookie('jwt_token',token)

    return res.status(201).json({
        message:"User registered successfully..",
        user:{
            id:user._id,
            email:user.email,
            username:user.username
        }
    })
}
async function loginController(req,res){

    const {email,username,password} = req.body

    const user = await userModel.findOne({
        $or:[
            {email},{username}
        ]
    })

    if(!user){
        return res.status(400).json({
            message:"Invalid credential"
        })
    }

    const isPasswordMatched = await bcrypt.compare(password,user.password)

    if(!isPasswordMatched){
        return res.status(400).json({
            message:"Invalid credentials"
        })
    }

    const token = jwt.sign({
        id:user._id
    },process.env.JWT_SECRET,{expiresIn:'3d'})

    return res.status(200).json({
        message:"User logged in successfully..",
        user:{
            id:user._id,
            email:user.email,
            username:user.username
        }
    })
}

module.exports = {
    registerController
    ,loginController
}