const Sequelize = require('sequelize')
const fetch = require('node-fetch')
const { white, blue, green} = require('chalk')

const {
  db,
  models: { Video }
} = require('./server/db/index')

const seed = async () => {
  await db.sync()

  console.log(
    `${blue('db synced!')}: process.env.NODE_ENV: ${process.env.NODE_ENV}`
  )

  const number = Math.round(Math.random()*5000)

  console.log(`Searching for: IMG ${number}`)

  console.log(green('fetching data from YouTube'))
  const res = await fetch(
    `https://youtube.googleapis.com/youtube/v3/search?part=snippet&maxResults=50&q=img%20${number}&type=video&videoDuration=short&videoEmbeddable=true&key=AIzaSyD0ZyGYcXu7XgFG3ri5PV4BD8UKyebrgDM`
  )
  const json = await res.json()
  const videos = json.items
  console.log(videos)

  console.log(green('oh boy, we got some gooodies'))

  await Promise.all(videos.map(async (video) => {
    const newVideo = await Video.create({videoId: `https://www.youtube.com/watch?v=${video.id.videoId}`})
    return newVideo
  })
  )

}

const runSeed = async () => {
  console.log('seeding...')
  try {
    await seed()
  } catch (err) {
    console.error(err)
    process.exitCode = 1
  } finally {
    console.log(blue('closing db connection'))
    await db.close()
    console.log(blue('db connection closed'))
  }
}

runSeed()

module.exports = seed
