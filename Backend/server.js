require('dotenv').config()
const app = require('./src/app.js')
const connectToDb = require('./src/config/connectToDb.js')

/**
 * Connect with the mongo db database 
 */
connectToDb() 

/**
 * server is start at port 3000
 */
app.listen(3000,()=>{
    console.log("Server is runnig at port 3000")
})