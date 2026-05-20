const express = require('express');
const cookieParser = require('cookie-parser')
const cors = require('cors')
/**
 * Server instance create karna
 */
const app = express();

// middlewares
app.use(express.json())
app.use(cookieParser())
app.use(cors({
    origin:"http://localhost:5173",
    credentials:true
}))
/**
 * Router import
 */
const authRouter = require('./routes/auth.routes')
const songRouter = require('./routes/song.routes')
/**
 * routes create karna
 */
app.use('/api/auth',authRouter)
app.use('/api/songs',songRouter)





module.exports = app;