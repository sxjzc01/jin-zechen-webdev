(function () {
    angular
        .module('WebAppMaker')
        .controller('websiteNewController', websiteNewController);

    function websiteNewController($location, webService, $routeParams) {
        var model = this;
        model.id = $routeParams['uid'];
        function init () {
            model.websites = webService.findWebsitesByUser(model.id)
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
        model.createWebsite = (function (name, desc) {
            if (name === null || name === '' || typeof name === 'undefined') {
                model.error = "Must have name!";
                return
            }
            var web = findName(name)
            if (web !== null) {
                model.error = 'webname already exist!'
                return
            }
            var newWeb = {name: name,
                          description: desc,
                          developerId: model.id}
            newWeb = webService.createWebsite(model.id, newWeb)
        })
    }
})();
