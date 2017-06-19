(function () {
    angular
        .module('WebAppMaker')
        .controller('websiteEditController', websiteEditController);

    function websiteEditController($location,webService, $routeParams) {

        var model = this;
        model.userId = $routeParams['userId'];
        model.websiteId = $routeParams['websiteId'];
        model.deleteWebsite = deleteWebsite;
        model.updateWebsite = updateWebsite;

        function init () {
            webService
                .findAllWebsitesForUser(model.userId)
                .then(renderWebsites);

            webService
                .findWebsiteById(model.websiteId)
                .then(renderWebsite);

            model.websites = webService.findAllWebsitesForUser(model.userId);
            model.website = webService.findWebsiteById(model.websiteId)
        }
        init();

        function renderWebsites(websites) {
            model.websites = websites;
        }

        function renderWebsite(website) {
            model.website = website;
        }

        function deleteWebsite(websiteId) {
            webService
                .deleteWebsite(websiteId)
                .then(function () {
                    $location.url('/user/' + model.userId + '/website');
                })
        }

        function updateWebsite(websiteId, website) {

            if (website.name === '' || website.name === null || typeof name === 'undefined') {
                model.error = "Must have a name";
            }
            webService
                .updateWebsite(websiteId, website)
                .then(function () {
                    $location.url('/user/' + model.userId +'/website/');
                })
        }

        // function updateWebsite(websiteId, website) {
        //         // webService.updateWebsite(model.webid, newWeb)
        //     // webService
        //     //     .updateWebsite(websiteId, website)
        //     //     .then(function () {
        //     //         $location.url('/user/' + model.userId + '/website');
        //     //     })
        // }

        // model.update = (function (name, description) {
        //     if (name === '' || name === null || typeof name === undefined) {
        //         model.error = "name can't be empty";
        //         return
        //     }
        //     var newWeb = {name: name,
        //                   description: description};
        //     webService.updateWebsite(model.websiteId, newWeb)
        // });
        //
        // model.delete = (function () {
        //     webService.deleteWebsite(model.websiteId)
        // })
    }
})();
