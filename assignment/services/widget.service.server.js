var app = require('../../express');
var multer = require('multer');
var upload = multer({dest: __dirname+'/../../public/assignment/upload'});
var widgetModel = require('../model/widget/widget.model.server');

app.post('/api/page/:pageId/widget', createWidget);
app.get('/api/page/:pageId/widget', findWidgetsByPageId);
app.get('/api/widget/:widgetId', findWidgetById);
app.put('/api/widget/:widgetId', updateWidget);
app.delete('/api/widget/:widgetId', deleteWidget);
app.post ("/api/upload", upload.single('myFile'), uploadImage);
app.put('/api/page/:pageId/widget', sortWidget);
app.put('/api/widget/:widgetId/flickr', updateFlickr);

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

function uploadImage(req, res) {
    var widgetId      = req.body.widgetId;
    var width         = req.body.width;
    var myFile        = req.file;

    if (typeof myFile === 'undefined' || myFile === null) {
        res.sendStatus(404)
    }

    var userId = req.body.userId;

    var websiteId = req.body.websiteId;
    var pageId = req.body.pageId;

    var originalname  = myFile.originalname; // file name on user's computer
    var filename      = myFile.filename;     // new file name in upload folder
    var path          = myFile.path;         // full path of uploaded file
    var destination   = myFile.destination;  // folder where file is saved to
    var size          = myFile.size;
    var mimetype      = myFile.mimetype;

    widgetModel
        .findWidgetById(widgetId)
        .then (function (widget) {
            widget.url = '/assignment/upload/' + filename;
            var callbackUrl = "/assignment/#!/profile/website/" + websiteId + "/page/" + pageId + "/widget/";
            res.redirect(callbackUrl);
            return widgetModel
                .updateWidget(widgetId, widget)
        })
        .then(function (status) {
            res.sendStatus(200)
        })

    // for (var w in widgets) {
    //     if (widgets[w]._id === widgetId) {
    //         var widget = widgets[w]
    //     }
    // }
    //
    // widget.url = '/assignment/upload/' + filename;
    // var callbackUrl = "/assignment/#!/user/" + userId + "/website/" + websiteId + "/page/" + pageId + "/widget/" + widgetId;
    //
    // res.redirect(callbackUrl);
}

function sortWidget (req, res) {
    var from = req.body['from'];
    var to = req.body['to'];

    var result = [];
    var pageId = req.params['pageId'];


    for (var u in widgets) {
        if (widgets[u].pageId === pageId) {
            result.push(u)
        }
    }

    var old_index = result[from];
    var new_index = result[to];

    var widget = widgets[old_index];
    widgets.splice(old_index,1);
    widgets.splice(new_index,0,widget);
    res.sendStatus(200)
}

function createWidget (req, res) {


    var newWidget = req.body;
    var pageId = req.params['pageId'];
    newWidget._page = pageId;
    widgetModel
        .createWidget(newWidget)
        .then(function (widget) {
            res.json(widget)
        })

    // newWidget._id = (new Date()).getTime() + '';
    // widgets.push(newWidget);
    // res.send(newWidget)
}

function findWidgetsByPageId (req, res) {
    var result = [];
    var pageId = req.params['pageId'];
    // for (var u in widgets) {
    //     if (widgets[u].pageId === pageId) {
    //         result.push(widgets[u])
    //     }
    // }
    // res.send(result)

    widgetModel
        .findAllWidgetsForPage(pageId)
        .then(function (widgets) {
            res.json(widgets)
        })
}

function findWidgetById (req, res) {
    var widgetId = req.params['widgetId'];
    // for (var w in widgets) {
    //     if (widgets[w]._id === widgetId) {
    //         res.json(widgets[w])
    //     }
    // }
    // res.sendStatus(404);
    widgetModel
        .findWidgetById(widgetId)
        .then(function (widget) {
            res.json(widget)
        })

}

function updateWidget (req, res) {
    // var widgetId = req.params['widgetId'];
    // var widget = widgets.find(function (widget) {
    //     return widgetId === widget._id
    // });
    //
    // if (widget !== null) {
    //     if (widget.widgetType === "HEADING") {
    //         widget.text = req.body['text'];
    //         widget.size = req.body['size'];
    //         res.sendStatus(200);
    //         return
    //     }
    //     if (widget.widgetType === "IMAGE") {
    //         widget.url = req.body['url'];
    //         widget.width = req.body['width'];
    //         res.sendStatus(200);
    //         return
    //     }
    //     if (widget.widgetType === "YOUTUBE") {
    //         widget.url = req.body['url'];
    //         widget.width = req.body['width'];
    //         res.sendStatus(200);
    //         return
    //     }

    var widgetId = req.params['widgetId'];
    var widget = req.body;
    widgetModel
        .updateWidget(widgetId, widget)
        .then(function (widget) {
            console.log(widgetId)
            res.sendStatus(200)
        })
}

function deleteWidget (req, res) {
    var widgetId = req.params['widgetId'];
    widgetModel
        .deleteWidget(widgetId)
        .then(function (status) {
            res.sendStatus(200)
        })
    // var widget = widgets.find(function (widget) {
    //     return widgetId === widget._id
    // });
    // if (widget !== null) {
    //     var index = widgets.indexOf(widget);
    //     widgets.splice(index, 1);
    //     res.sendStatus(200)
    // }
    // res.sendStatus(404)
}

function updateFlickr (req, res) {
    var widgetId = req.params['widgetId'];
    var widget = req.body;
    widgetModel
        .updateFlickr(widgetId, widget)
        .then(function (widget) {
            res.sendStatus(200)
        })
}