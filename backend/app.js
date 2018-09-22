const express = require('express');
const path = require('path');
const favicon = require('serve-favicon');
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const MongoClient = require('mongodb').MongoClient;
const app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

const url = process.env.URL || 'mongodb://nsimmonds:parcialweb1@ds211143.mlab.com:11143/parcialweb';
const dbName = 'parcialweb';


MongoClient.connect(url, (err, client) => {
  if (err) {
    throw err;
  }

  const db = client.db(dbName);

  const vizCollection = db.collection('viz');
  const vizRouter = express.Router();

  vizRouter.get('/viz/last/:num', (req, res, next) => {
    const num = parseInt(req.params.num);
    vizCollection.find().limit(num).toArray((err, results) => {
      if (err) {
        throw err;
      }
      res.send(results);
    });
  });

  vizRouter.post('/viz', (req, res, next) => {
    try {
      const {name, author, vegaJson} = req.body;
      vizCollection.insertOne({
        name: name,
        author: author,
        vegaJson: vegaJson,
        timestamp: new Date(),
      }, (err, id) => {
        if (err) {
          throw err;
        }
        res.send("inserted document");
      });
    } catch (err) {
      err.status = 401;
      next(err);
    }
  });

  app.use(vizRouter);

  const reviewsRouter = express.Router();
  const reviewsCollection = db.collection('reviews');

  reviewsRouter.get('/reviews', (req, res, next) => {
    reviewsCollection.find().toArray((err, results) => {
      if (err) {
        throw err;
      }
      res.send(results);
    });
  });

  reviewsRouter.post('/reviews', (req, res, next) => {
    try {
      const {name, rating} = req.body;
      reviewsCollection.insertOne({
        name: name,
        rating: rating,
      }, (err, id) => {
        if (err) {
          throw err;
        }
        res.send("inserted document");
      });
    } catch (err) {
      err.status = 401;
      next(err);
    }
  });

  // catch 404 and forward to error handler
  app.use((req, res, next) => {
    const err = new Error('Not Found');
    err.status = 404;
    next(err);
  });

  // error handler
  app.use((err, req, res, next) => {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render('error');
  });
});

module.exports = app;
