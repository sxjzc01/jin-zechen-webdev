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
                        $location.url('/user/' + model.userId + '/website/' + model.websiteId + '/page/' + model.pageId + '/widget/' + newHeader._id)
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
                        $location.url('/user/' + model.userId + '/website/' + model.websiteId + '/page/' + model.pageId + '/widget/' + newImage._id)
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
                        $location.url('/user/' + model.userId + '/website/' + model.websiteId + '/page/' + model.pageId + '/widget/' + newYoutube._id)
                        return;
                    })
            }
            if (type === 'html') {
                var newHtml = {widgetType : 'HTML'}
                widgetService
                    .createWidget(model.pageId, newHtml)
                    .then(function (html) {
                        newHtml = html
                        $location.url('/user/' + model.userId + '/website/' + model.websiteId + '/page/' + model.pageId + '/widget/' + newHtml._id);
                        return
                    })
            }
            if (type === 'input') {
                var newInput = {widgetType : 'INPUT'}
                widgetService
                    .createWidget(model.pageId, newInput)
                    .then(function (input) {
                        newInput = input
                        $location.url('/user/' + model.userId + '/website/' + model.websiteId + '/page/' + model.pageId + '/widget/' + newInput._id);
                        return
                    })
            }
        })
    
    }
})();
