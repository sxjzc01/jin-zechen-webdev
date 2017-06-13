var mongoose = require('mongoose');
    var websiteSchema = mongoose.Schema({
        _user: {type: mongoose.Schema.ObjectId, ref:"UserModel"},
        name: String,
        description: String,
        pages: {type: mongoose.Schema.ObjectId, ref:"PageModel"},
        dateCreated: {type: Date, default: Date.now},
    }, {collection: 'websiteCollection'});

    module.exports = websiteSchema;

