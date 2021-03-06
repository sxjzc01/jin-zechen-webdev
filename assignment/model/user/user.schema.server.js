var mongoose = require('mongoose');
var userSchema = mongoose.Schema({
    username: {type: String, require: true},
    password: {type: String, require: true},
    firstName: String,
    lastName: String,
    roles: [{type: String, default: 'USER', enum: ['USER','ADMIN']}],

    followList: [{type: mongoose.Schema.Types.ObjectId, ref: "UserModel"}],
    followedBy: [{type: mongoose.Schema.Types.ObjectId, ref: "UserModel"}],
    // movies: [{type: mongoose.Schema.Types.ObjectId, ref: "WebsiteModel"}],

    email: String,
    phone: String,
    websites: {type: mongoose.Schema.Types.ObjectId, ref: "WebsiteModel"},
    dateCreated: {type: Date, default: Date.now},
    movies: [{type: String}],

    facebook: {
        id:    String,
        token: String
    },

    google: {
        id:    String,
        token: String
    }
}, {collection: "user"});
module.exports = userSchema;