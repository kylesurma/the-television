let express = require("express");
let morgan = require('morgan')
let path = require('path')
let app = express();
const result = require("dotenv").config();
const runSeed = require("../seed");
const { db } = require('./db')

module.exports = app

app.use(express.static(path.join(__dirname, '../public')));

// logging middleware
app.use(morgan('dev'))

// body parsing middleware
app.use(express.json())

app.use((req, res, next) => {
  if (path.extname(req.path).length) {
    const err = new Error('Not found')
    err.status = 404
    next(err)
  } else {
    next()
  }
})

app.use('/videos', require('./videos'))

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../public/index.html'))
});



const init = async () => {
  try {
    if (process.env.SEED === "true") {
      await runSeed(process.env.SEED_COUNT || 10);
    } else {
      await db.sync();
    }
    // start listening (and create a 'server' object representing our server)
    const port = process.env.PORT || 1337;
    app.listen(port, () => {
      console.log("Knock, knock");
      console.log("Who's there?");
      console.log(`Your server, listening on port ${port}`);
    });
  } catch (ex) {
    console.log(ex);
  }
};

init();
