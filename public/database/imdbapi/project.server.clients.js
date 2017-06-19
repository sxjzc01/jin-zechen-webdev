(function () {
    angular
        .module('WebAppMaker')
        .factory('apiService', apiService);


    function apiService ($http) {
        var api = {
            search: search
        }
        return api;


        function search(name) {
            var url = "https://api.themoviedb.org/3/search/movie?api_key=301f6de79b05aed7aee4ff4644ad45f9&query=" + name;

            return $http.get(url)
                .then(function (response) {
                    return response.data;
                });

        }
    }
})();
