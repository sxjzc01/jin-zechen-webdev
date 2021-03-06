(function () {
    angular
        .module('WebAppMaker')
        .controller('pageEditController', pageEditController);

    function pageEditController($location, pageService, $routeParams) {

        var model = this;
        model.userId = $routeParams['userId'];
        model.websiteId = $routeParams['websiteId'];
        model.pageId = $routeParams['pageId'];

        model.deletePage = deletePage;
        model.updatePage = updatePage;

        function init () {
            pageService
                .findAllPagesForWebsite(model.websiteId)
                .then(renderPages);

            pageService
                .findPageById(model.pageId)
                .then(renderPage);
        }
        init();

        function renderPages(pages) {
            model.pages = pages;
        }

        function renderPage(page) {
            model.page = page;
        }

        function deletePage(pageId) {
            pageService
                .deletePage(pageId)
                .then(function () {
                    $location.url('/user/' + model.userId +'/website/' + model.websiteId + '/page');
                })
        }

        function updatePage(pageId, page) {
            if (page.name === '' || page.name === null) {
                model.error = "Must have a name";
            } else {
                pageService
                    .updatePage(pageId, page)
                    .then(function () {
                        $location.url('/user/' + model.userId + '/website/' + model.websiteId + '/page');
                    })
            }
        }
    }
})();
