(function () {
    angular
        .module('WebAppMaker')
        .controller('websiteEditController', websiteEditController);

    function websiteEditController($location,webService, $routeParams) {

        var model = this;
        model.id = $routeParams['uid'];
        model.webid = $routeParams['websiteId'];

        function init () {
            model.websites = webService.findWebsitesByUser(model.id);
            model.website = webService.findWebsiteById(model.webid)
        }
        init();

        model.update = (function (name, description) {
            if (name === '' || name === null || typeof name === undefined) {
                model.error = "name can't be empty";
                return
            }
            var newWeb = {name: name,
                          description: description};
            webService.updateWebsite(model.webid, newWeb)
        });

        model.delete = (function () {
            webService.deleteWebsite(model.webid)
        })
    }
})();
