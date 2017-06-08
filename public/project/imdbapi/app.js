(function (){
    angular
        .module('pocApp', [])
        .controller('pocController', pocController)
    
    function pocController($http) {
        var model = this;
        model.searchMovie = searchMovie;
        model.searchDetails = searchDetails;

        function searchDetails(imdbID) {
            var url = "http://www.omdbapi.com/?apikey=852159f0&i=" + imdbID;
            $http.jsonp(url)
                .then(function (response) {
                    model.movie = response.data;
                });
        }
        
        function searchMovie(title) {
            var url = "http://www.omdbapi.com/?apikey=852159f0&s=" + title;
            $http.jsonp(url)
                .then(function (response) {
                    console.log(response);
                    model.movies = response.data.Search;
                });
        }
    }
    
})();
