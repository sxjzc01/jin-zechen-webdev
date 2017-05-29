(function () {
    angular
        .module('WebAppMaker')
        .factory('webService', webService);


    function webService () {
        var websites = [
          { "_id": "123", "name": "Facebook",    "developerId": "456", "description": "Lorem" },
          { "_id": "234", "name": "Tweeter",     "developerId": "456", "description": "Lorem" },
          { "_id": "456", "name": "Gizmodo",     "developerId": "456", "description": "Lorem" },
          { "_id": "890", "name": "Go",          "developerId": "123", "description": "Lorem" },
          { "_id": "567", "name": "Tic Tac Toe", "developerId": "123", "description": "Lorem" },
          { "_id": "678", "name": "Checkers",    "developerId": "123", "description": "Lorem" },
          { "_id": "789", "name": "Chess",       "developerId": "234", "description": "Lorem" }
        ];

        return {
            "createWebsite"    : createWebsite,
            "findWebsitesByUser" : findWebsitesByUser,
            "findWebsiteById" : findWebsiteById,
            "updateWebsite" : updateWebsite,
            "deleteWebsite" : deleteWebsite
        };

        function createWebsite (userId, website) {
            var newWeb = website;
            newWeb._id = (new Date()).getTime() + '';
            websites.push(newWeb);
            return newWeb
        }

        function findWebsitesByUser (userId) {
            var result = [];
            for (var u in websites) {
                if (websites[u].developerId === userId) {
                    result.push(websites[u])
                }
            }
            return result
        }

        function findWebsiteById (websiteId) {
            for (var w in websites) {
                if (websites[w]._id === websiteId) {
                    return websites[w]
                }
            }
            return null
        }

        function updateWebsite (websiteId, website) {
            var found = findWebsiteById(websiteId);
            if (found !== null) {
                found.description = website.description;
                found.name = website.name
                return found
            }
            return null
        }

        function deleteWebsite (websiteId) {
            var webIndex = websites.findIndex(function (website) {
                return (websiteId === website._id)
            });
            if (webIndex >= 0) {
                websites.splice(webIndex, 1)
            }
        }
    }
})();
