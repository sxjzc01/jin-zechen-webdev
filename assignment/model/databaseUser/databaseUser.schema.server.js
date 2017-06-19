var mongoose = require('mongoose');
var databaseUserSchema = mongoose.Schema({
    username: {type: String, require: true},
    password: {type: String, require: true},
    firstName: String,
    lastName: String,
    roles: [{type: String, default: 'USER', enum: ['USER', 'ADMIN']}],

    followList: [{type: String}],
    followedBy: [{type: String}],
    movies: [{type: mongoose.Schema.Types.ObjectId, ref: "WebsiteModel"}],

    email: String,
    phone: String,
    dateCreated: {type: Date, default: Date.now},

    facebook: {
        id:    String,
        token: String
    }
}, {collection: "databaseUser"});
module.exports = databaseUserSchema;