(function () {
    angular
        .module('WebAppMaker')
        .controller('pageNewController', pageNewController);

    function pageNewController ($location, pageService, $routeParams) {
        var model = this;
        model.id = $routeParams['uid'];
        model.wid = $routeParams['websiteId'];

        function init () {
            model.pages = pageService.findPageByWebsiteId(model.wid)
        }

        init();

        function findName (name) {
            for (var w in model.websites) {
                if (model.websites[w].name === name) {
                    return model.websites[w]
                }
            }
            return null
        }

        model.createPage = (function (name, desc) {
            if (name === null || name === '' || typeof name === undefined) {
                model.message = "input can't be empty";
                return
            }
            var page = findName(name);
            if (page !== null) {
                model.error = 'webname already exist!';
                return
            }
            var newPage = {name : name,
                           description : desc,
                           websiteId : model.wid};
            pageService.createPage(model.wid, newPage)
        })
    }
})()
