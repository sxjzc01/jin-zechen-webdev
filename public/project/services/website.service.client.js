(function () {
    angular
        .module('WebAppMaker')
        .factory('webService', webService);


    function webService ($http) {

        return {
            "createWebsite"    : createWebsite,
            "findAllWebsitesForUser" : findAllWebsitesForUser,
            "findWebsiteById" : findWebsiteById,
            "updateWebsite" : updateWebsite,
            "deleteWebsite" : deleteWebsite
        };

        function findAllWebsitesForUser(userId) {
            var url = "/api/assignment/user/"+userId+"/website";
            return $http.get(url)
                .then(function (response) {
                    return response.data;
                });
        }

        function createWebsite(userId, website) {
            website.developerId = userId;
            var url = "/api/assignment/user/" + userId + "/website";
            return $http.post(url, website)
                .then(function (response) {
                    return response.data;
                });
        }

        // function createWebsite (userId, website) {
        //     var newWeb = website;
        //     newWeb._id = (new Date()).getTime() + '';
        //     websites.push(newWeb);
        //     return newWeb
        // }

        // function findWebsitesByUser (userId) {
        //     var result = [];
        //     for (var u in websites) {
        //         if (websites[u].developerId === userId) {
        //             result.push(websites[u])
        //         }
        //     }
        //     return result
        // }


        function findWebsiteById(websiteId) {
            var url = "/api/assignment/website/" + websiteId;
            return $http.get(url)
                .then(function (response) {
                    return response.data;
                });
        }

        // function findWebsiteById (websiteId) {
        //     for (var w in websites) {
        //         if (websites[w]._id === websiteId) {
        //             return websites[w]
        //         }
        //     }
        //     return null
        // }

        function updateWebsite(websiteId, website) {
            var url = "/api/assignment/website/" + websiteId;
            return $http.put(url, website)
                .then(function (response) {
                    return response.data;
                });
        }

        // function updateWebsite (websiteId, website) {
        //     var found = findWebsiteById(websiteId);
        //     if (found !== null) {
        //         found.description = website.description;
        //         found.name = website.name
        //         return found
        //     }
        //     return null
        // }

        function deleteWebsite(websiteId) {
            var url = "/api/assignment/website/" + websiteId;
            return $http.delete(url)
                .then(function (response) {
                    return response.data;
                });
        }

        // function deleteWebsite (websiteId) {
        //     var webIndex = websites.findIndex(function (website) {
        //         return (websiteId === website._id)
        //     });
        //     if (webIndex >= 0) {
        //         websites.splice(webIndex, 1)
        //     }
        // }
    }
})();
