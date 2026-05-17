const express = require('express');

/**
 * Server instance create karna
 */
const app = express();

// middlewares
app.use(express.json())

/**
 * Router import
 */
const authRouter = require('./routes/auth.routes')

/**
 * routes create karna
 */
app.use('/api/auth',authRouter)






module.exports = app;