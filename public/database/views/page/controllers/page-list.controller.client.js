(function () {
    angular
        .module('WebAppMaker')
        .controller('pageListController', pageListController);

    function pageListController (currentUser, $location, pageService, $routeParams, userService) {
        var model = this;
        model.userId = $routeParams['userId'];
        model.websiteId = $routeParams['websiteId'];

        model.currentUser = currentUser._id;

        model.boolean = model.userId === model.currentUser;

        userService.findUserById(model.userId)
            .then(function (response) {
                model.user = response.username;
            });

        function init() {
            pageService
                .findAllPagesForWebsite(model.websiteId)
                .then(renderPages);
        }
        init();

        function renderPages(pages) {
            model.pages = pages;
        }
    }
})();
