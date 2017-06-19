var app = require('../../express');
var movieModel = require('../model/movie/movie.model.server');

// app.get("/api/assignment/user/:userId/movie", findAllMoviesForUser);
// app.post("/api/assignment/user/:userId/movie", createMovie);
app.get ("/api/assignment/movie/:movieId", findMovieById);
app.put ("/api/assignment/movie/:movieId", updateMovie);
app.delete ("/api/assignment/movie/:movieId", deleteMovie);
app.put("/api/assignment/user/:userId/movie/:movieId", addCommentToMovie);


function deleteMovie(req, res) {
    var movieId = req.params['movieId'];

    movieModel
        .deleteMovie(websiteId)
        .then(function (status) {
            res.sendStatus(200);
        });
}

function addCommentToMovie(req, res) {

    var movieId = req.params['movieId'];
    var comment = req.body.String;

    movieModel
        .addComment(movieId, comment)
        .then(function (response) {
        res.sendStatus(200);
    });
}

function updateMovie (req, res) {
    var movieId = req.params['movieId'];
    var movie = req.body;
    movieModel
        .updateMovie(movieId, movie)
        .then(function (status) {
            res.sendStatus(200)
        })
}



function findMovieById(req, res) {
    console.log("123");
    var movieId = req.params['movieId'];
    console.log(movieId);
    movieModel
        .findMovieById(movieId)
        .then(function (movie) {
            if (movie !== null) {
                console.log(movie)
                res.json(movie)
            } else {
                console.log("no movie need to create one")
                movieModel.createMovie({imdbID: movieId, comment: [""]})
                    .then(function (response) {
                        res.send(response)
                    });
            }
        },
        function(err) {
            console.log(err)
        })
    // var websiteId = req.params['websiteId'];
    // for(var w in websites) {
    //     if(websites[w]._id === websiteId) {
    //         res.send(websites[w]);
    //         return;
    //     }
    // }
    // res.sendStatus(404);
}
