(function () {
    angular
        .module('WebAppMaker')
        .factory('widgetService', widgetService);


    function widgetService () {
        var widgets = [
                        { "_id": "123", "widgetType": "HEADING", "pageId": "321", "size": 2, "text": "GIZMODO"},
                        { "_id": "234", "widgetType": "HEADING", "pageId": "321", "size": 4, "text": "Lorem ipsum"},
                        { "_id": "345", "widgetType": "IMAGE", "pageId": "321", "width": "100%",
                        "url": "http://lorempixel.com/400/200/"},
                        { "_id": "456", "widgetType": "HTML", "pageId": "321", "text": "<p>Lorem ipsum</p>"},
                        { "_id": "567", "widgetType": "HEADING", "pageId": "321", "size": 4, "text": "Lorem ipsum"},
                        { "_id": "678", "widgetType": "YOUTUBE", "pageId": "321", "width": "100%",
                          "url": "https://youtu.be/AM2Ivdi9c4E" },
                        { "_id": "789", "widgetType": "HTML", "pageId": "321", "text": "<p>Lorem ipsum</p>"}
                      ];
        return {
            "createWidget"    : createWidget,
            "findWidgetsByPageId" : findWidgetsByPageId,
            "findWidgetById" : findWidgetById,
            "updateWidget" : updateWidget,
            "deleteWidget" : deleteWidget
        };

        function createWidget (pageId, widget) {
            var newWidget = widget;
            newWidget._id = (new Date()).getTime() + '';
            widgets.push(newWidget);
            return newWidget
        }

        function findWidgetsByPageId (pageId) {
            var result = []
            for (var u in widgets) {
                if (widgets[u].pageId === pageId) {
                    result.push(widgets[u])
                }
            }
            return result
        }

        function findWidgetById (widgetId) {
            for (var w in widgets) {
                if (widgets[w]._id === widgetId) {
                    return widgets[w]
                }
            }
            return null
        }

        function updateWidget (widgetId, widget) {
            var found = findWidgetById(widgetId);
            if (found !== null) {
                if (found.widgetType === "HEADING") {
                    found.text = widget.text;
                    found.size = widget.size;
                    return found
                }
                if (found.widgetType === "IMAGE") {
                    found.url = widget.url
                    found.width = widget.width
                    return found
                }
                if (found.widgetType === "YOUTUBE") {
                    found.url = widget.url;
                    found.width = widget.width;
                    return found
                }
            }
            return null
        }

        function deleteWidget (widgetId) {
            var webIndex = widgets.findIndex(function (widget) {
                return (widgetId === widget._id)
            });
            if (webIndex >= 0) {
                widgets.splice(webIndex, 1)
            }
        }
    }
})();
