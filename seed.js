const Sequelize = require("sequelize");
const fetch = require("node-fetch");
const { white, blue, green } = require("chalk");
if (module === require.main) {
  const result = require("dotenv").config();
}

const {
  db,
  models: { Video },
} = require("./server/db/index");

const fetchYoutubeVideos = async () => {
  const number = Math.round(Math.random() * 5000);

  console.log(white(`Searching for: IMG ${number}`));
  try {
    const res = await fetch(
      `https://youtube.googleapis.com/youtube/v3/search?part=snippet&maxResults=50&q=img%20${number}&type=video&videoDuration=short&videoEmbeddable=true&key=${process.env.YTK}`
    );
    const json = await res.json();
    const videos = json.items;

    await Promise.all(
      videos.map(async (video) => {
        const newVideo = await Video.create({
          videoId: `https://www.youtube.com/watch?v=${video.id.videoId}`,
        });
        return newVideo;
      })
    );
  } catch (error) {
    console.log(error);
  }
};

const seedDBReset = async () => {
  await db.sync({ force: true });

  console.log(
    `${blue("db synced and refreshed!")}: process.env.NODE_ENV: ${
      process.env.NODE_ENV
    }`
  );
  await fetchYoutubeVideos();
};

const seedDB = async (num) => {
  await db.sync();
  await fetchYoutubeVideos();
  console.log(`round ${num} done!`);
};

const runSeed = async (seedCount = 10) => {
  console.log("seeding...");
  try {
    await seedDBReset();
    for (let i = 2; i <= seedCount; i++) {
      await seedDB(i);
    }
  } catch (err) {
    console.error(err);
    process.exitCode = 1;
  } finally {
    console.log(blue("closing db connection"));
    await db.close();
    console.log(blue("db connection closed"));
  }
};

if (module === require.main) {
  runSeed();
}

module.exports = runSeed;
