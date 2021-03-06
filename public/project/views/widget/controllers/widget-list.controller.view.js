(function () {
    angular
        .module('WebAppMaker')
        .controller('widgetListController', widgetListController);

    function widgetListController (currentUser, $location, widgetService, $routeParams, $sce, $scope, userService) {
        var model = this;

        model.userId = $routeParams['userId'];
        model.websiteId = $routeParams['websiteId'];
        model.pageId = $routeParams['pageId'];
        model.widgetId = $routeParams['widgetId'];

        model.currentUser = currentUser._id;

        model.boolean = model.userId === model.currentUser;

        userService.findUserById(model.userId)
            .then(function (response) {
                model.user = response.username;
            });

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
                $location.url('/user/' + model.userId + '/website/' + model.websiteId + '/page/' + model.pageId + '/widget/' + widget._id)
            } else {
                $location.url('/user/' + model.userId + '/website/' + model.websiteId + '/page/' + model.pageId + '/widget/' + widget._id)
            }
        })


    }
})();
