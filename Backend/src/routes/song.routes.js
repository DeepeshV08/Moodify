const express = require('express')

const songRouter = express.Router()
const upload = require('../middlewares/upload.middleware')
const songController = require('../controllers/song.controller')


songRouter.post('/',upload.single("song"),songController.uploadSong)

songRouter.get('/',songController.getSong)
module.exports = songRouter