var app = require('../../express');
var mongoose = require('mongoose');
mongoose.Promise = require('q').Promise;
// mongoose.connect('mongodb://localhost/webdev_summer1_2017');

var connectionString = 'mongodb://127.0.0.1:27017/webdev_summer1_2017'; // for local
if(process.env.MLAB_USERNAME_WEBDEV) { // check if running remotely
    var username = process.env.MLAB_USERNAME_WEBDEV; // get from environment
    var password = process.env.MLAB_PASSWORD_WEBDEV;
    connectionString = 'mongodb://' + username + ':' + password;
}

require("../model/models.server.js");
// require('../model/user/user.schema.server.js');
// require('../model/user/user.model.server.js')(mongoose);
// require('../model/website/website.schema.server.js');
// require('../model/website/website.model.server.js')(mongoose);
// require('../model/page/page.schema.server.js');
// require('../model/page/page.model.server.js')(mongoose);
// require('../model/widget/widget.schema.server.js');
// require('../model/widget/widget.model.server.js')(mongoose);

require('../services/user.service.server');
require('../services/website.service.server');
require('../services/page.service.server');
require('../services/widget.service.server');
//
// app.get('/goodbye', sayHello);
// app.get('/websites', sendWebsites);
//
// console.log(2);
//
// function sendWebsites(req, res) {
//     var websites = [
//         {name: 'facebook'},
//         {name: 'twitter'},
//         {name: 'linkedin'}
//     ];
//     res.send(websites);
// }
//
// function sayHello() {
//     console.log('hello');
// }
