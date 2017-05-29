(function () {
    angular
        .module('WebAppMaker')
        .controller('websiteListController', websiteListController);

    function websiteListController ($location, webService, $routeParams) {
        var model = this;
        model.id = $routeParams['uid'];
        function init () {
            model.websites = webService.findWebsitesByUser(model.id)
        }
        init()
    }
})();
