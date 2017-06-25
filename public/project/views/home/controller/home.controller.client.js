(function () {
    angular
        .module('WebAppMaker')
        .controller('homeController', homeController);

    function homeController(currentUser, $sce) {
        var model = this;
        model.currentUser = currentUser;
        model.searchMovie = searchMovie;

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