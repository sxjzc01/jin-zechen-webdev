(function () {
    angular
        .module('WebAppMaker')
        .controller('pageEditController', pageEditController);

    function pageEditController($location, pageService, $routeParams) {

        var model = this;
        model.id = $routeParams['uid'];
        model.wid = $routeParams['websiteId'];
        model.pid = $routeParams['pageId'];

        function init () {
            model.pages = pageService.findPageByWebsiteId(model.wid);
            model.page = pageService.findPageById(model.pid)
        }
        init();

        model.updatePage = (function (name, desc) {
            var page = {name : name,
                        description : desc};
            pageService.updatePage(model.pid, page)
        });

        model.delete = (function () {
            pageService.deletePage(model.pid)
        })
    }
})();
