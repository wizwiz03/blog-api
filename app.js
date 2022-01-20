const createError = require('http-errors');
const express = require('express');
const path = require('path');
const logger = require('morgan');
require('dotenv').config();
const compression = require('compression');
const helmet = require('helmet');
const cors = require('cors');

// const passport = require('passport');
// const LocalStrategy = require('passport-local').Strategy;
// const bcrypt = require('bcryptjs');


// Routers
const apiRouter = require('./routes/apiRouter');


const app = express();



//Set up mongoose connection
const mongoose = require('mongoose');
const mongoDB = process.env.MONGODB_URL;
mongoose.connect(mongoDB, { useNewUrlParser: true , useUnifiedTopology: true});
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));


// auth
// const User = require('./models/user');

// passport.use(
//   new LocalStrategy((username, password, done) => {
//     User.findOne({ user_name: username }, (err, user) => {
//       if (err) { 
//         return done(err);
//       }
//       if (!user) {
//         return done(null, false, { message: "Incorrect username" });
//       }
//       bcrypt.compare(password, user.password, (err, res) => {
//         if (res) {
//           return done(null, user);
//         }
//         else {
//           return done(null, false, { message: 'Incorrect Password' });
//         }
//       });
//     });
//   })
// );
// passport.serializeUser(function(user, done) {
//   done(null, user.id);
// });

// passport.deserializeUser(function(id, done) {
//   User.findById(id, function(err, user) {
//     done(err, user);
//   });
// });
// app.use(session({ secret: "supercat", resave: false, saveUninitialized: true }));
// app.use(passport.initialize());
// app.use(passport.session());


app.use(cors());
app.use(helmet());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(compression());


// Routing
app.use('/api', apiRouter);


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.json({error: err.status});
});

module.exports = app;