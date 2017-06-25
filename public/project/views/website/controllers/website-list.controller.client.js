(function () {
    angular
        .module('WebAppMaker')
        .controller('websiteListController', websiteListController);

    function websiteListController(currentUser, $routeParams, webService, userService, $location) {
        var model = this;

        model.userId = $routeParams['userId'];
        model.currentUser = currentUser._id;


        userService.findUserById(model.userId)
            .then(function (response) {
                model.user = response.username;
                model.movies = response.movies;
            });



        model.boolean = model.userId === model.currentUser;

        function init() {
            model.websites = webService.findAllWebsitesForUser(model.userId);
            webService
                .findAllWebsitesForUser(model.userId)
                .then(renderWebsites);
        }
        init();

        function renderWebsites(websites) {
            model.websites = websites;
        }
    }

})();
