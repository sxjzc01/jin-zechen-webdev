(function () {
    angular
        .module('WebAppMaker')
        .factory('commentService', commentService);


    function commentService ($http) {

        return {
            "createComment"    : createComment,
            // "findAllCommentsForMovies" : findAllCommentsForMovies,
            "findMovieById" : findMovieById,
            "updateMovie" : updateMovie,
            // "deleteComment" : deleteComment
        };

        // function findAllCommentsForMovies(movieId) {
        //     var url = "/api/assignment/user/"+movieId+"/website";
        //     return $http.get(url)
        //         .then(function (response) {
        //             return response.data;
        //         });
        // }

        function createComment(movieId, comment, userId) {
            var url = "/api/assignment/user/" + userId + "/movie/" + movieId;
            return $http.put(url, {String: comment})
                .then(function (response) {

                }, function (err) {

                    console.log(err);
                });
        }


        function findMovieById(movieId) {
            var url = "/api/assignment/movie/" + movieId;
            console.log(movieId);
            return $http.get(url)

                .then(function (response) {
                        console.log(response);
                        return response.data
                    }
                ,
                function (err) {
                    console.log(err);
                });
        }

        function updateMovie(movieId, movie) {
            var url = "/api/assignment/movie/" + movieId;
            return $http.put(url, website)
                .then(function (response) {
                    return response.data;
                });
        }

        // function deleteComment(websiteId) {
        //     var url = "/api/assignment/website/" + websiteId;
        //     return $http.delete(url)
        //         .then(function (response) {
        //             return response.data;
        //         });
        // }

    }
})();
