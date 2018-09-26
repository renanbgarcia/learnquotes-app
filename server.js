var express = require('express');
var passport = require('passport');
var Strategy = require('passport-google-oauth').OAuth2Strategy;
var mongoose = require('mongoose');
var userModel = require('./server/models/user.js');
require('./server/auth/jwt.js');
var genToken = require('./server/auth/token.js');
var ensure = require('connect-ensure-login');
const {Translate} = require('@google-cloud/translate');


// Configuração do Google Strategy do Passport

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
          googleUser_id: profile.id,
          level: 'Noviço',
          email: profile.emails[0].value,
          photo: profile.photos[0].value,
          score: 0
        });
        newUser.save(function (err) {
          if (err) {
            console.log(err);
          } else {
            console.log('Saved');

          }
        });
      } else {
        if (doc) {
          console.log('usuário já registrado!');
        }
        console.log('usuario nao criado');
        //return cb(null, doc);
      }
    });
    return cb(null, profile);
  }));

//Serialização e deserialização de sessão
passport.serializeUser(function(user, cb) {
  cb(null, user);
});

passport.deserializeUser(function(obj, cb) {
  cb(null, obj);
});


// cria a aplicação
var app = express();

//Import de pacotes necessários
app.use(require('morgan')('combined'));
app.use(require('cookie-parser')());
var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(bodyParser.json());
app.use(require('express-session')({ secret: 'keyboard cat', resave: true, saveUninitialized: true }));

// Inicializa o Passporte e restaura sessão se houver
app.use(passport.initialize());
app.use(passport.session());

// Se o usuário não estiver logado, redireciona para a tela de login
app.use('/api', ensure.ensureLoggedIn('/'))

// Conecta ao banco
app.use(express.static(__dirname + '/dist/learnquotes/'));

mongoose.connect('mongodb://master:master258@ds125381.mlab.com:25381/testemongo');

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function () {
  console.log('MongoDB successfully connected!');
});

//Definição de rotas
    // Rotas de autenticação
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
    res.redirect('/authorizer?token=' + token);
  });

//Todo: verificar se realmente todas as rotas são necessárias

app.get('/api/user', function(req, res) {
  if (req.user) {
    //var token = genToken(req.user.id);
    console.log('api/user resposta ' + JSON.stringify(req.user.id))
    res.send({user: req.user.id});
  }
})

app.get('/api/auth', passport.authenticate('jwt', { session: false }),
  (req, res) => {
    console.log('Secure response from ' + JSON.stringify(req.user));
    res.send({auth: 'Authenticated', user: req.user.googleUser_id});
  });

    //Rotas de manipulação do banco

    //Salva uma citação para o usuário no banco
app.post('/api/save/quote', function(req, res) {
  console.log(req.body);
  userModel.findOneAndUpdate({
        googleUser_id: req.body.id
      }, {$push: { "resources.quote": {quote: req.body.quote, source: req.body.source}  }}, function (err, success) {
        if (err) {
          res.send(err) ;
        } else {
          res.send({response: 'success'});
        }
      })
    });

      // Salva uma palavra na conta do usuário
app.post('/api/save/word', function(req, res) {

  //Tira pontuação que pode ter ficado anexado na palavra
  let wordToSave = req.body.word.replace(/[.,\/#!$%\^&\*;:{}=\-_`~()]/g,"").replace(/\s{2,}/g," ");

  userModel.findOneAndUpdate({
        googleUser_id: req.body.id
      }, {$push: { "resources.words": { word: wordToSave, meaning: req.body.meaning, howKnown: req.body.howKnown}  }}, function (err, success) {
        if (err) {
          res.send(err) ;
        } else {
          res.send({response: 'success'});
        }
      })
    });

      //Atualiza os dados da palavra
app.post('/api/update/word', function(req, res) {
  //usermodel.findOne({googleUser_id: req.body.id})
  //resources.words.$.word: ${req.body.word}
  var objForUpdate = {};

  if (req.body.word !== '') {
    userModel.findOneAndUpdate({
          "resources.words._id": req.body.word_id.toString()
        }, {$set: { "resources.words.$.word": req.body.word }}, function (err, success) {
          if (err) {
            res.send(err) ;
          } else {
            res.send({response: success});
          }
        })
      }
  if (req.body.meaning !== '') {
    userModel.findOneAndUpdate({
          "resources.words._id": req.body.word_id.toString()
        }, {$set: { "resources.words.$.meaning": req.body.meaning }}, function (err, success) {
          if (err) {
            res.send(err) ;
          } else {
            //res.send({response: success});
          }
        })
      }
  if (req.body.howKnown !== '') {
    console.log(req.body.state);
    userModel.findOneAndUpdate({
          "resources.words._id": req.body.word_id.toString()
        }, {$set: { "resources.words.$.howKnown": req.body.state }}, function (err, success) {
          if (err) {
            res.send(err) ;
          } else {
            //res.send({response: success});
          }
        })
      }
});

  // Deleta uma palavra na conta do usuário
app.post('/api/delete/word', function(req, res) {
  userModel.findOneAndUpdate({
        googleUser_id: req.body.id
      }, {$pull: { "resources.words": { "_id": req.body.word_id.toString() }}}, {'new': true},function (err, success) {
        if (err) {
          res.send(err) ;
        } else {
          //res.send({response: success});
        }
      })
    });

app.post('/api/delete/quote', function(req, res) {
  userModel.findOneAndUpdate({
        googleUser_id: req.body.id
      }, {$pull: { "resources.quote": { "_id": req.body.quote_id.toString() }}}, {'new': true},function (err, success) {
        if (err) {
          res.send(err) ;
        } else {
          res.send({response: success});
        }
      })
    });

app.post('/api/userinfo', function(req, res) {
  console.log(req.body);
  userModel.findOne({googleUser_id: req.body.id}, function(err, user) {
    if (err) {console.log(err);}
    console.log('sucesso');
    res.send({user: user});
  })
})

app.post('/api/setuserinfo', function(req, res) {
  console.log(req.body);
  switch(req.body.type) {
    case 'score':
        userModel.findOneAndUpdate({googleUser_id: req.body.id},{score: req.body.info}, function (err, success) {
        if (err) {
          res.send(err) ;
        } else {
          res.send(success);
        }
      });
        console.log('aehooo');
        break;
  }
})

app.post('/api/translate', function(req, res) {
  // Imports the Google Cloud client library

  console.log(Translate);
  // Your Google Cloud Platform project ID
  const projectId = 'deft-seat-209823';

  // Instantiates a client
  const translate = new Translate({
    projectId: projectId,
  });

  // The text to translate
  const text = req.body.word;
  console.log(req.body.word);
  // The target language
  const target = 'pt';

  // Translates some text into Russian
  translate
    .translate(text, target)
    .then(results => {
      const translation = results[0];

      console.log(`Text: ${text}`);
      console.log(`Translation: ${translation}`);
      res.send({text: text, transl: translation});
    })
    .catch(err => {
      console.error('ERROR:', err);
      res.send(err);
    });


});

app.post('/api/countquotes', function (req, res) {
  console.log(req.body);
      userModel.findOne({ googleUser_id: req.body.id }, function (err, doc) {
        if (err) {
          res.send(err);
        } else {
          console.log("     fuuuuuuuuunfoooooooooouuuuuuuuuu!!!!!!!!!")
          res.send({count: doc.resources.quote.length});
        }
      });
});

app.route('*').get((req, res) => {
  res.sendFile(__dirname + '/dist/learnquotes/index.html');
});

app.listen('3000', function () {
  console.log("Servidor rodando na porta 3000!!")
});
