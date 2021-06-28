const router = require('express').Router()
module.exports = router
const {models: { Video } } = require('./db')

// GET /videos
router.get('/', async(req, res, next) => {
  const videos = await Video.findAll()
  res.json(videos)
})

// router.post('/', (req, res, next) => {

// })

// router.delete('/', (req, res, next) => {

// })
