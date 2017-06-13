var mongoose = require('mongoose');
    var pageSchema = require('./page.schema.server');
    var pageModel = mongoose.model('PageModel', pageSchema);

    pageModel.createPage = createPage;
    pageModel.findAllPagesForWebsite = findAllPagesForWebsite;
    pageModel.findPageById = findPageById;
    pageModel.updatePage = updatePage;
    pageModel.deletePage = deletePage;
    pageModel.findAndUpdate = findAndUpdate;

    module.exports = pageModel;

    function createPage (page) {
        return pageModel.create(page)
    }

    function findAllPagesForWebsite (websiteId) {
        return pageModel.find({_website: websiteId})
    }

    function findPageById (pageId) {
        return pageModel.findOne({_id: pageId})
    }

    function updatePage (pageId, page) {
        return pageModel.update({_id: pageId}, {$set: page})
    }

    function deletePage (pageId) {
        return pageModel.remove({_id: pageId})
    }

    function findAndUpdate (pagename, page) {
        return pageModel.findOneAndUpdate({name: pagename}, page, {upsert: true})
    }

