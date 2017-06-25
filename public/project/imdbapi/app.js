(function (){
    angular
        .module('WebAppMaker')
        .controller('pocController', pocController);
    
    function pocController($http, $sce, $routeParams, userService) {
        var model = this;
        model.searchMovie = searchMovie;
        model.searchDetails = searchDetails;
        model.userId = $routeParams['userId'];
        model.addMovie = addMovie;



        function addMovie(imbdID) {
            userService
                .findUserById(model.userId)
                .then(function (user) {
                    if (user.movies.indexOf(imbdID) > -1) {
                        console.log(user.movies)
                        model.error = "Movie has already in your favorite list";
                    } else {
                        userService
                            .addMovie(model.userId, imbdID)
                            .then(function (response) {
                                model.m = response.data;
                            })
                    }
                });
        }

        function searchDetails(imdbID) {
            var url = "https://www.omdbapi.com/?apikey=e75522b8&i=" + imdbID;
            $http.jsonp($sce.trustAsResourceUrl(url))
                .then(function (response) {
                    model.movie = response.data;
                });
        }
        
        function searchMovie(title) {
            var url = "https://www.omdbapi.com/?apikey=e75522b8&s=" + title;
            $http.jsonp($sce.trustAsResourceUrl(url))
                .then(function (response) {
                    console.log(response);
                    model.movies = response.data.Search;
                });
        }
    }
    
})();