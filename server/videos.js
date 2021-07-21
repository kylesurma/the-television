const router = require("express").Router();
module.exports = router;
const {
  models: { Video },
} = require("./db");

// GET /videos
router.get("/", async (req, res, next) => {
  try {
    const videos = await Video.findAll();
    res.json(videos);
  } catch (error) {
    next(error);
  }
});

// router.post('/', (req, res, next) => {

// })

// router.delete('/', (req, res, next) => {

// })
