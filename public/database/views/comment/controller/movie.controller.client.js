(function () {
    angular
        .module('WebAppMaker')
        .controller('commentController', commentController);

    function commentController(currentUser, $routeParams, commentService, $location) {
        var model = this;

        console.log($routeParams['movieId']);
        model.movieId = $routeParams['movieId'];
        model.currentUser = currentUser;

        commentService.findMovieById(model.movieId)
            .then(function(response) {
                model.comments = response.comment;
            });

        model.createComment = createComment;

        model.userId = $routeParams['userId'];


        // function init() {
        //     model.movies = commentService.find(model.userId);
        //     commentService
        //         .findAllMoviesForUser(model.userId)
        //         .then(renderComments);
        // }
        // init();

        // function renderComments(comment) {
        //     model.comments = comments;
        // }

        function createComment(comment) {
            if (typeof comment === '') {
                model.error = "Can not create this website";
                return
            }
            comment = model.userId + ": " + comment;
            commentService.createComment(model.movieId, comment, model.userId)
                .then(function () {
                    $location.url('/user/' + model.userId + '/comment/' + model.movieId);
                    // $location.url('/user/' + model.userId + '/website/' + model.websiteId + '/page');
                }, function (err) {
                    console.log(err);
                })
        }
    }

})();
