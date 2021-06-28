const Sequelize = require('sequelize')
const db = require('../db')

const Video = db.define('video', {
  videoId: {
    type: Sequelize.STRING,
  }
})

module.exports = Video
