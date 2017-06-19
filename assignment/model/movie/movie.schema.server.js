var mongoose = require('mongoose');
    var movieSchema = mongoose.Schema({
        imdbID: String,
        comment: [{type: String}],
        dateCreated: {type: Date, default: Date.now},
    }, {collection: 'movieCollection'});

    module.exports = movieSchema;

