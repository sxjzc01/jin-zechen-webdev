(function () {
    angular
        .module('WebAppMaker')
        .controller('websiteListController', websiteListController);

    function websiteListController($routeParams, webService) {
        var model = this;

        model.userId = $routeParams['userId'];

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

    // function websiteListController ($location, webService, $routeParams) {
    //     var model = this;
    //     model.id = $routeParams['uid'];
    //     function init () {
    //         model.websites = webService.findWebsitesByUser(model.id)
    //     }
    //     init()
    // }
})();
