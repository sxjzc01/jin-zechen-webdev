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
            if (typeof website === 'undefined') {
                model.error = "Can not create this website";
            }

            webService
                .createWebsite(model.userId, website)
                .then(function () {
                    $location.url("/user/" + model.userId + "/website");
                })

        }


        // function init () {
        //     model.websites = webService.findWebsitesByUser(model.id);
        //     model.website = webService.findWebsiteById(model.websiteId)
        // }
        // init();
        // function findName (name) {
        //     for (var w in model.websites) {
        //         if (model.websites[w].name === name) {
        //             return model.websites[w]
        //         }
        //     }
        //     return null
        // }
        // model.createWebsite = (function (name, desc) {
        //     if (name === null || name === '' || typeof name === 'undefined') {
        //         model.error = "Must have name!";
        //         return
        //     }
        //     var web = findName(name)
        //     if (web !== null) {
        //         model.error = 'webname already exist!'
        //         return
        //     }
        //     var newWeb = {name: name,
        //                   description: desc,
        //                   developerId: model.id}
        //     newWeb = webService.createWebsite(model.id, newWeb)
        // })
    }
})();
