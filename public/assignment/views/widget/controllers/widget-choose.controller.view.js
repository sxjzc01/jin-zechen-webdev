(function () {
    angular
        .module('WebAppMaker')
        .controller('widgetChooseController', widgetChooseController);

    function widgetChooseController ($location, widgetService, $routeParams) {
        var model = this;

        model.userId = $routeParams['userId'];
        model.websiteId = $routeParams['websiteId'];
        model.pageId = $routeParams['pageId'];
        model.widgetId = $routeParams['widgetId'];
        model.widget = widgetService.findWidgetById(model.widgetId);

        model.createNew = (function (type) {
            if (type === 'header') {
                var newHeader = {widgetType : 'HEADING',
                    pageId : model.pageId,
                    size : 3,
                    text : 'Loe'};
                widgetService
                    .createWidget(model.pageId, newHeader)
                    .then(function (Header) {
                        newHeader = Header;
                        $location.url('/user/' + model.userId + '/website/'
                            + model.widgetId + '/page/' + model.pageId + '/widget/' + newHeader._id)
                    })
            }
            if (type === 'image') {
                var newImage = {widgetType : 'IMAGE',
                    pageId : model.pageId,
                    width : '100%',
                    url : ''};
                widgetService
                    .createWidget(model.pageId, newImage)
                    .then(function (image) {
                        newImage = image;
                        $location.url('/user/' + model.userId + '/website/'
                            + model.widgetId + '/page/' + model.pageId + '/widget/' + newImage._id)
                    })
            }
            if (type === 'youtube') {
                var newYoutube = {widgetType : 'YOUTUBE',
                    pageId : model.pageId,
                    width : '100%',
                    url : ''};
                widgetService
                    .createWidget(model.pageId, newYoutube)
                    .then(function (youtube) {
                        newYoutube = youtube;
                        $location.url('/user/' + model.userId + '/website/'
                            + model.widgetId + '/page/' + model.pageId + '/widget/' + newYoutube._id)
                        return;
                    })
            }
            return;
        })
    
    }
})();
