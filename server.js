var app = require('./express');

var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var session      = require('express-session');
var passport = require('passport');



app.use(cookieParser());
// app.use(session({ secret: process.env.SESSION_SECRET })
app.use(session({ secret: "put some text here" }));
app.use(passport.initialize());
app.use(passport.session());

app.get('/api/session', function (req, res) {
    console.log(req.session);
    res.send(req.session);
});
app.get('/api/session/:name/:value', function (req, res) {
    var name = req.params.name;
    var value = req.params.value;

    req.session[name] = value;

    console.log(req.session);
    res.send(req.session);
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
// configure a public directory to host static content

app.use(app.express.static(__dirname + '/public'));

require ("./test/app.js");



require ("./test/app.js");


require ("./assignment/app/app");
var port = process.env.PORT || 3000;

app.listen(port);
