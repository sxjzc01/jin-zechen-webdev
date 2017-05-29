(function () {
    angular
        .module('WebAppMaker')
        .controller('pageListController', pageListController);

    function pageListController ($location, pageService, $routeParams) {
        var model = this;
        model.id = $routeParams['uid'];
        model.wid = $routeParams['websiteId'];

        function init () {
            model.pages = pageService.findPageByWebsiteId(model.wid)
        }

        init()
    }
})();
