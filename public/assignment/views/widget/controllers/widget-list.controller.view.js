(function () {
    angular
        .module('WebAppMaker')
        .controller('widgetListController', widgetListController);

    function widgetListController ($location, widgetService, $routeParams, $sce) {
        var model = this;

        model.id = $routeParams['uid'];
        model.wid = $routeParams['websiteId']
        model.pid = $routeParams['pageId']

        function init () {
            model.widgets = widgetService.findWidgetsByPageId(model.pid)
        }
        init();

        function widgetUrl(widget) {
            var url = 'views/widget/templates/widget-'+widget.widgetType.toLowerCase()+'.view.client.html';
            return url;
        }

        function getYouTubeEmbedUrl(linkUrl) {
            var embedUrl = "https://www.youtube.com/embed/";
            var linkUrlParts = linkUrl.split('/');
            embedUrl += linkUrlParts[linkUrlParts.length - 1];
            return $sce.trustAsResourceUrl(embedUrl);
        }

        function trust(html) {
            // scrubbing the html
            return $sce.trustAsHtml(html);
        }



        model.editpage = (function (widget) {
            if (widget.widgetType === 'HTML') {
                $location.url('/user/' + model.id + '/website/' + model.wid + '/page/' + model.pid + '/widget/' + widget._id + '/' + 'heading')
            } else {
            $location.url('/user/' + model.id + '/website/' + model.wid + '/page/' + model.pid + '/widget/' + widget._id + '/' + (widget.widgetType).toLowerCase())
            }
        })
    }
})()
