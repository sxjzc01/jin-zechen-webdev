(function (){
    angular
        .module('pocApp', [])
        .controller('pocController', pocController)
    
    function pocController($http, $sce) {
        var model = this;
        model.searchMovie = searchMovie;
        model.searchDetails = searchDetails;


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