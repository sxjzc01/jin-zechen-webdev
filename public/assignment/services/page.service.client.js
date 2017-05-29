(function () {
    angular
        .module('WebAppMaker')
        .factory('pageService', pageService);


    function pageService () {
        var pages = [
                        { "_id": "321", "name": "Post 1", "websiteId": "456", "description": "Lorem" },
                        { "_id": "432", "name": "Post 2", "websiteId": "456", "description": "Lorem" },
                        { "_id": "543", "name": "Post 3", "websiteId": "456", "description": "Lorem" }
                    ];
        return {
            "createPage"    : createPage,
            "findPageByWebsiteId" : findPageByWebsiteId,
            "findPageById" : findPageById,
            "updatePage" : updatePage,
            "deletePage" : deletePage
        };

        function createPage (websiteId, page) {
            var newPage = page;
            newPage._id = (new Date()).getTime() + '';
            pages.push(newPage);
            return newPage
        }

        function findPageByWebsiteId (websiteId) {
            var result = [];
            for (var u in pages) {
                if (pages[u].websiteId === websiteId) {
                    result.push(pages[u])
                }
            }
            return result
        }

        function findPageById (pageId) {
            for (var p in pages) {
                if (pages[p]._id === pageId) {
                    return pages[p]
                }
            }
            return null
        }

        function updatePage (pageId, page) {
            var found = findPageById(pageId)
            if (found !== null) {
                found.description = page.description
                found.name = page.name
                return found
            }
            return null
        }

        function deletePage (pageId) {
            var pageIndex = pages.findIndex(function (page) {
                return (pageId === page._id)
            });
            if (pageIndex >= 0) {
                pages.splice(pageIndex, 1)
            }
        }
    }
})()
