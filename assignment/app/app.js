var app = require('../../express');

var connectionString = 'mongodb://127.0.0.1:27017/webdev_summer1_2017'; // for local
if(process.env.MLAB_USERNAME_WEBDEV) { // check if running remotely
    var username = process.env.MLAB_USERNAME_WEBDEV; // get from environment
    var password = process.env.MLAB_PASSWORD_WEBDEV;
    connectionString = 'mongodb://' + username + ':' + password;
    connectionString += '@ds159517.mlab.com:59517/heroku_r73v1gq7';
}
var mongoose = require('mongoose');
mongoose.Promise = require('q').Promise;
mongoose.connect(connectionString);



require("../model/models.server.js");

require('../services/user.service.server');
require('../services/website.service.server');
require('../services/page.service.server');
require('../services/widget.service.server');
require('../services/movie.service.server');
