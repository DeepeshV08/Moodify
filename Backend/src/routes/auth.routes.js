const express = require('express')

const authRouter = express.Router()

const authMiddleware = require('../middlewares/auth.middleware')
// controller import
const authController = require('../controllers/auth.controller')
/**
 * @route - /api/auth/register
 * @description used to create a new user in the mongodb database
 */
authRouter.post('/register',authController.registerController)

/**
 * @route /api/auth/login
 * @description used to login in the website
 */
authRouter.post('/login',authController.loginController)

authRouter.get('/logout',authController.logoutUserController)
authRouter.get('/get-me',authMiddleware.authUser,authController.getMeController)
module.exports = authRouter