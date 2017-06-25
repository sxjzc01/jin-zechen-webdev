(function () {
    angular
        .module('WebAppMaker')
        .controller('websiteNewController', websiteNewController);

    function websiteNewController($location, webService, $routeParams) {
        var model = this;
        model.userId = $routeParams['userId'];
        model.websiteId = $routeParams['websiteId'];

        model.createWebsite = createWebsite;


        function init() {
            // model.websites = websiteService.findWebsitesByUser(model.userId);
            webService
                .findAllWebsitesForUser(model.userId)
                .then(renderWebsites);
        }
        init();

        function renderWebsites(websites) {
            model.websites = websites;
        }

        function createWebsite(website) {
            if (typeof website === 'undefined' || website.name === '') {
                model.error = "Can not create this website";
            }

                webService
                    .createWebsite(model.userId, website)
                    .then(function () {
                        $location.url("/user/" + model.userId + "/website");
                    })


        }
    }
})();
