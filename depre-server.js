var express = require('express');

var app = express();
var bodyParser = require('body-parser');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(express.static(__dirname + '/dist/learnquotes/'));

app.route('/').get((req, res) => {
    res.sendFile(__dirname + '/dist/learnquotes/index.html');
});

app.route('/api/cats').get((req, res) => {
    res.json({name: 'pelidunho', cor: 'preto'});
});

app.listen('3000', function() {
    console.log("Server running at port 3000!!")
});