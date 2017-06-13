var app = require('../../express');
var pageModel = require('../model/page/page.model.server');

app.post("/api/assignment/website/:websiteId/page", createPage);
app.get ("/api/assignment/page/:pageId", findPageById);
app.put ("/api/assignment/page/:pageId", updatePage);
app.delete ("/api/assignment/page/:pageId", deletePage);
app.get("/api/assignment/website/:websiteId/page", findAllPagesForWebsite);

var pages = [
    { "_id": "321", "name": "Post 1", "websiteId": "456", "title": "Lorem" },
    { "_id": "432", "name": "Post 2", "websiteId": "456", "title": "Lorem" },
    { "_id": "543", "name": "Post 3", "websiteId": "456", "title": "Lorem" }
];

function findAllPagesForWebsite(req, res) {
    pageModel
        .findAllPagesForWebsite(req.params.websiteId)
        .then(function (websites) {
            res.json(websites);
        });
    // var results = [];
    //
    // for(var p in pages) {
    //     if(pages[p].websiteId === req.params.websiteId) {
    //         results.push(pages[p]);
    //     }
    // }
    //
    // res.json(results);
}

function deletePage(req, res) {
    var pageId = req.params['pageId'];

    pageModel
        .deletePage(pageId)
        .then(function (status) {
            res.sendStatus(200);
        });
    // var pageId = req.params.pageId;
    // for(var p in pages) {
    //     if(pages[p]._id === pageId) {
    //         pages.splice(p, 1);
    //         res.sendStatus(200);
    //         return;
    //     }
    // }
    // res.sendStatus(404);
}

function updatePage(req, res) {
    var pageId = req.params['pageId'];
    var page = req.body;
    pageModel
        .updatePage(pageId, page)
        .then(function (status) {
            res.sendStatus(200)
        })
    // var page = req.body;
    // for(var p in pages) {
    //     if(pages[p]._id === req.params.pageId) {
    //         pages[p] = page;
    //         res.sendStatus(200);
    //         return;
    //     }
    // }
    // res.sendStatus(404);
}

function createPage(req, res) {
    // var page = req.body;
    // page._id = (new Date()).getTime() + "";
    // pages.push(page);
    // res.json(page);

    var page = req.body;
    var websiteId = req.params['websiteId'];
    page._website = websiteId;
    pageModel
        .createPage(page)
        .then(function (page) {
            res.json(page);
        });
}


function findPageById(req, res) {
    // var pageId = req.params['pageId'];
    // for(var p in pages) {
    //     if(pages[p]._id === pageId) {
    //         res.send(pages[p]);
    //         return;
    //     }
    // }
    // res.sendStatus(404);
    var pageId = req.params['pageId']
    pageModel
        .findPageById(pageId)
        .then(function (page) {
            if (page !== null) {
                res.json(page)
            } else {
                res.sendStatus(404)
            }
        })
}