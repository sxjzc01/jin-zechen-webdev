var mongoose = require('mongoose');
    var widgetSchema = require('./widget.schema.server');
    var widgetModel = mongoose.model('WidgetModel', widgetSchema);

    widgetModel.createWidget = createWidget;
    widgetModel.findAllWidgetsForPage = findAllWidgetsForPage;
    widgetModel.findWidgetById = findWidgetById;
    widgetModel.updateWidget = updateWidget;
    widgetModel.deleteWidget = deleteWidget;
    widgetModel.reorderWidget = reorderWidget;
    widgetModel.findAndUpdate = findAndUpdate;
    widgetModel.updateFlickr = updateFlickr;

    module.exports = widgetModel;

    function createWidget (widget) {
        return widgetModel.create(widget)
    }

    function findAllWidgetsForPage (pageId) {
        return widgetModel.find({_page: pageId})
    }

    function findWidgetById (widgetId) {
        return widgetModel.findById(widgetId)
    }

    function updateWidget (widgetId, widget) {
        return widgetModel.update({_id: widgetId}, {$set: widget})
    }

    function updateFlickr (widgetId, widget) {
        return widgetModel.update({_id: widgetId}, {$set: widget})
    }

    function deleteWidget (widgetId) {
        return widgetModel.remove({_id: widgetId})
    }

    function reorderWidget (pageId, from, to) {
        widgetModel
                .findAllWidgetsForPage(pageId)
                .then(function (widgets) {
                    return
                })
    }

    function findAndUpdate (widgetname, widget) {
        return widgetModel.findOneAndUpdate({name: widgetname}, widget, {upsert: true})
    }

