(function () {
    angular
        .module('WebAppMaker')
        .factory('pageService', pageService);


    function pageService ($http) {
        return {
            "findAllPagesForWebsite": findAllPagesForWebsite,
            "findPageById": findPageById,
            "deletePage": deletePage,
            "createPage": createPage,
            "updatePage": updatePage
        };

        function createPage(websiteId, page) {
            page.websiteId = websiteId;
            var url = "/api/assignment/website/" + websiteId + "/page";
            return $http.post(url, page)
                .then(function (response) {
                    return response.data;
                });
        }

        function findPageById(pageId) {
            var url = "/api/assignment/page/" + pageId;
            return $http.get(url)
                .then(function (response) {
                    return response.data;
                });
        }

        function updatePage(pageId, page) {
            var url = "/api/assignment/page/" + pageId;
            return $http.put(url, page)
                .then(function (response) {
                    return response.data;
                });
        }

        function deletePage(pageId) {
            var url = "/api/assignment/page/" + pageId;
            return $http.delete(url)
                .then(function (response) {
                    return response.data;
                });
        }

        function findAllPagesForWebsite(websiteId) {
            var url = "/api/assignment/website/" + websiteId + "/page";
            return $http.get(url)
                .then(function (response) {
                    return response.data;
                });
        }

    }
})();
