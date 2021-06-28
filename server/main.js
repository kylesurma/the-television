let express = require("express");
let morgan = require('morgan')
let path = require('path')
let app = express();
module.exports = app
let port = 3000;

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

app.listen(port, () => {
    console.log(`Listening at http://localhost:${port}`);
});

