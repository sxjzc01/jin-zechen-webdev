(function () {
    angular
        .module('WebAppMaker')
        .controller('pageNewController', pageNewController);

    function pageNewController ($location, pageService, $routeParams) {
        var model = this;
        model.userId = $routeParams['userId'];
        model.websiteId = $routeParams['websiteId'];
        model.createPage = createPage;

        function init () {
            pageService
                .findAllPagesForWebsite(model.websiteId)
                .then(renderPages);
        }

        init();

        function renderPages(pages) {
            model.pages = pages;
        }

        function findName (name) {
            for (var w in model.websites) {
                if (model.websites[w].name === name) {
                    return model.websites[w]
                }
            }
            return null
        }

        function createPage(page) {
            if (typeof page === 'undefined' || page.name ==='') {
                model.error = "Can not create this website";
            }
            pageService.createPage(model.websiteId, page)
                .then(function () {
                    $location.url('/user/' + model.userId + '/website/' + model.websiteId + '/page');
                })
        }
    }
})()
