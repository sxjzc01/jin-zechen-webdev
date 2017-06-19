var mongoose = require('mongoose');
    var movieSchema = require('./movie.schema.server.js');
    var movieModel = mongoose.model('MovieModel', movieSchema);

movieModel.createMovie = createMovie;
movieModel.findAllMovieForUser = findAllMoviesForUser;
movieModel.findMovieById = findMovieById;
movieModel.updateMovie = updateMovie;
movieModel.deleteMovie = deleteMovie;
movieModel.addComment = addComment;

    module.exports = movieModel;

    function createMovie (movie) {
        return movieModel.create(movie)
    }

    function findAllMoviesForUser (userId) {
        return movieModel.find({_user: userId})
    }

    function findMovieById (movieId) {
        return movieModel.findOne({imdbID: movieId})
    }

    function updateMovie (movieId, movie) {
        return movieModel.update({_id: movieId}, {$push: movie})
    }

    function deleteMovie (movieId) {
        return movieModel.remove({_id: movieId})
    }

    function addComment (movieId, comment) {


       return movieModel
            .findMovieById(movieId)
            .then(function(response) {
                response.comment.push(comment);
                // comment2 = response
                console.log(response.comment);
                // response.update({imdbID: movieId}, {$push: {comment: comment}});
                return movieModel.update({imdbID: movieId}, {$set: {comment: response.comment}})

                //
                // response.comment.push(comment);
                // console.log(response.comment);
                // movieModel.update({imdbID: movieId}, {$push: {comment: response.comment}});
                // console.log(response);
            }, function (err) {
            })
    }


