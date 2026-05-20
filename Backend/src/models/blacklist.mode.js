const mongoose = require('mongoose')


const blacklistSchema = new mongoose.Schema({
    token: {
        type: String,
        required: [true, "token is require for blacklisting."],
        unique: [true, "same token cannot be blacklisted"]
    }
}, {
    timestamps: true
})

const blacklistModel = mongoose.model('blacklist', blacklistSchema)

module.exports = blacklistModel