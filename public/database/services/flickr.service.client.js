(function () {
    angular
        .module('WebAppMaker')
        .service('flickrService', flickrService);
    
    function flickrService($http) {

        this.searchPhotos = searchPhotos;

        var key = "18a3c5f0de1146653e2c81f6651a9b3e";
        var secret = "28b03c7401bab381";
        var urlBase = "https://api.flickr.com/services/rest/?method=flickr.photos.search&format=json&api_key=API_KEY&text=TEXT";

        function searchPhotos(searchTerm) {
            var url = urlBase
                .replace("API_KEY", key)
                .replace("TEXT", searchTerm);
            return $http.get(url);
        }
    }
})();