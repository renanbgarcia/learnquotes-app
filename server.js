var express = require('express');
var passport = require('passport');
var Strategy = require('passport-google-oauth').OAuth2Strategy;
var mongoose = require('mongoose');
var userModel = require('./server/models/user.js');
require('./server/auth/jwt.js');
var genToken = require('./server/auth/token.js');


// Configure the Facebook strategy for use by Passport.
//
// OAuth 2.0-based strategies require a `verify` function which receives the
// credential (`accessToken`) for accessing the Facebook API on the user's
// behalf, along with the user's profile.  The function must invoke `cb`
// with a user object, which will be set at `req.user` in route handlers after
// authentication.
passport.use(new Strategy({
    clientID: '736982925792-h2vvuqse3ob51tcqgknfrqscjvlejipq.apps.googleusercontent.com',
    clientSecret: 'F0rU8bx9idwP0AdJoQaBR9k6',
    callbackURL: 'http://localhost:3000/auth/google/callback'
  },
  function(accessToken, refreshToken, profile, cb) {
    console.log('Now Check User');
    userModel.findOne({
      googleUser_id: profile.id
    }, function (err, doc) {
      if (err) {
        console.log('Não pôde completar a query');
        return cb(err);
      }
      if (!doc) {
        var newUser = new userModel({
          name: profile.displayName,
          googleUser_id: profile.id
        });
        newUser.save(function (err) {
          if (err) {
            console.log(err);
          } else {
            console.log('Saved');

          }
          //return cb(null, doc);
        });
      } else {
        //found user. Return
        if (doc) {
          console.log('user is alredy registered!');
        }
        console.log('usuario nao criado');
        //return cb(null, doc);
      }
    });
    return cb(null, profile);
  }));


// Configure Passport authenticated session persistence.
//
// In order to restore authentication state across HTTP requests, Passport needs
// to serialize users into and deserialize users out of the session.  In a
// production-quality application, this would typically be as simple as
// supplying the user ID when serializing, and querying the user record by ID
// from the database when deserializing.  However, due to the fact that this
// example does not have a database, the complete Facebook profile is serialized
// and deserialized.
passport.serializeUser(function(user, cb) {
  cb(null, user);
});

passport.deserializeUser(function(obj, cb) {
  cb(null, obj);
});


// Create a new Express application.
var app = express();

// Configure view engine to render EJS templates.
// app.set('views', __dirname + '/views');
// app.set('view engine', 'ejs');

// Use application-level middleware for common functionality, including
// logging, parsing, and session handling.
app.use(require('morgan')('combined'));
app.use(require('cookie-parser')());
app.use(require('body-parser').urlencoded({ extended: true }));
app.use(require('express-session')({ secret: 'keyboard cat', resave: true, saveUninitialized: true }));

// Initialize Passport and restore authentication state, if any, from the
// session.
app.use(passport.initialize());
app.use(passport.session());


// Define routes.

app.use(express.static(__dirname + '/dist/learnquotes/'));

mongoose.connect('mongodb://master:master258@ds125381.mlab.com:25381/testemongo');

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function () {
  console.log('MongoDB successfully connected!');
});

app.get('/auth/google',
  passport.authenticate('google', {
    scope: ['profile', 'email', 'openid']
  }));
    //scope: ['https://www.googleapis.com/auth/plus.login']
app.get('/auth/google/callback',
  passport.authenticate('google', {
    failureRedirect: '/' //mudar para pagina de login
  }),
  function (req, res) {
    console.log(req.user);
    var token = genToken(req.user.id);
    console.log('tokennn: ' + token)
    res.redirect('/home?token=' + token);
  });

app.get('/api/user', function(req, res) {
  if (req.user) {
    var token = genToken(req.user.id);
    res.json({user: req.user, token: token});
  }
})

app.get('/api/auth', passport.authenticate('jwt', { session: false }),
  (req, res) => {
    console.log('Secure response from ' + JSON.stringify(req.user));
    res.send({auth: 'Authenticated', user: req.user});
  });

app.route('*').get((req, res) => {
  res.sendFile(__dirname + '/dist/learnquotes/index.html');
});

app.listen('3000', function () {
  console.log("Server running at port 3000!!")
});