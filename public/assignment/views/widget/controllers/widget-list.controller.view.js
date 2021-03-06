(function () {
    angular
        .module('WebAppMaker')
        .controller('widgetListController', widgetListController);

    function widgetListController (currentUser, $location, widgetService, $routeParams, $sce, $scope) {
        var model = this;

        // model.userId = $routeParams['userId'];
        model.userId = currentUser._id
        model.websiteId = $routeParams['websiteId'];
        model.pageId = $routeParams['pageId'];
        model.widgetId = $routeParams['widgetId'];

        function init () {
            widgetService
                .findWidgetsByPageId(model.pageId)
                .then(function (widgets) {
                    model.widgets = widgets
                })
        }
        init();

        model.trust = (function (text) {
            return $sce.trustAsHtml(text)
        });

        model.getYoutubeEmbedUrl = (function (link) {
            var embedurl = 'https://www.youtube.com/embed/';
            var urlList = link.split('/');
            return $sce.trustAsResourceUrl(embedurl + urlList[urlList.length - 1])
        });

        model.getUrl = (function (widget) {
            return 'views/widget/templates/widget-' + (widget.widgetType).toLowerCase() + '.views.client.html'
        });

        $scope.$on('allSorted', function (event, data) {
            widgetService
                .sortWidget(data, model.pageId)
        });

        model.editpage = (function (widget) {
            if (widget.widgetType === 'HTML') {
                $location.url('/profile/website/' + model.websiteId + '/page/' + model.pageId + '/widget/' + widget._id)
            } else {
                $location.url('/profile/website/' + model.websiteId + '/page/' + model.pageId + '/widget/' + widget._id)
            }
        })


    }
})();
