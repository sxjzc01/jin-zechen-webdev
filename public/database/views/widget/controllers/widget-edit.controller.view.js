/**
 * Created by Jin on 2017/6/6.
 */

(function () {
    angular
        .module('WebAppMaker')
        .controller('widgetEditController', widgetEditController);

    function widgetEditController ($location, widgetService, $routeParams, $sce) {
        var model = this;
        model.userId = $routeParams['userId'];
        model.websiteId = $routeParams['websiteId'];
        model.pageId = $routeParams['pageId'];
        model.widgetId = $routeParams['widgetId'];
        widgetService
            .findWidgetById(model.widgetId)
            .then(function (widget) {
                model.widget = widget
            });

        model.createNew = (function (type) {
            if (type === 'header') {
                var newHeader = {widgetType : 'HEADING',
                    pageId : model.pageId,
                    size : 3,
                    text : 'Loerm'}
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
                    })
            }
            if (type === 'html') {
                var newHtml = {widgetType : 'HTML',
                    pageId : model.pageId,
                    width : '100%',
                    url : ''};
                widgetService
                    .createWidget(model.pageId, newHtml)
                    .then(function (html) {
                        newHtml = html;
                        $location.url('/user/' + model.userId + '/website/' + model.websiteId + '/page/' + model.pageId + '/widget/' + newHtml._id)
                    })
            }
            if (type === 'input') {
                var newInput = {widgetType : 'INPUT',
                    pageId : model.pageId,
                    width : '100%',
                    url : ''};
                widgetService
                    .createWidget(model.pageId, newInput)
                    .then(function (input) {
                        newInput = input;
                        $location.url('/user/' + model.userId + '/website/' + model.websiteId + '/page/' + model.pageId + '/widget/' + newInput._id)
                    })
            }
        });

        model.update = (function (type, arg1, arg2) {
            if (type === 'heading') {
                var heading = {text : arg1,
                    size : arg2};
                widgetService
                    .updateWidget(model.widgetId, heading)
                    .then(function (head) {
                        return head
                    })
            }
            if (type === 'image') {
                var image = {url : arg1,
                    width : arg2};
                widgetService
                    .updateWidget(model.widgetId, image)
                    .then(function (img) {
                        return img
                    })
            }
            if (type === 'youtube') {
                var youtube = {url : arg1,
                    width : arg2};
                widgetService
                    .updateWidget(model.widgetId, youtube)
                    .then(function (yout) {
                        return yout
                    })
            }
            if (type === 'html') {
                var html = {url : arg1,
                    width : arg2};
                widgetService
                    .updateWidget(model.widgetId, html)
                    .then(function (htm) {
                        return htm
                    })
            }
            if (type === 'input') {
                var html = {url : arg1,
                    width : arg2};
                widgetService
                    .updateWidget(model.widgetId, input)
                    .then(function (htm) {
                        return htm
                    })
            }
        });

        model.delete = (function () {
            widgetService
                .deleteWidget(model.widgetId)
                .then(function () {
                    $location.url('/user/' + model.userId + '/website/' + model.websiteId + '/page/' + model.pageId + '/widget');
                    return;
                })
        })

    }
})();
