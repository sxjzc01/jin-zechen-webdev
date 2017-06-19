(function () {
    angular
        .module('WebAppMaker')
        .factory('userService', userService);


    function userService($http, $location) {
        var api = {
            createUser: createUser,
            findUserById: findUserById,
            findUserByUsername: findUserByUsername,
            findAllUsers: findAllUsers,
            login: login,
            addFriend: addFriend,
            checkLoggedIn: checkLoggedIn,
            findUserByCredentials: findUserByCredentials,
            deleteUser: deleteUser,
            updateUser: updateUser,
            checkAdmin: checkAdmin,
            logout: logout,
            register: register,
            unregister: unregister
        };
        return api;

        function logout() {
            var url = "/api/assignment/logout";
            return $http.post(url)
                .then(function (response) {
                    return response.data;
                });
        }

        function register(user) {
            var url = "/api/assignment/register";
            return $http.post(url, user)
                .then(function (response) {
                    return response.data;
                });
        }

        function checkLoggedIn() {
            var url = "/api/assignment/checkLoggedIn";
            return $http.get(url)
                .then(function (response) {
                    return response.data;
                });
        }

        function checkAdmin() {
            var url = "/api/assignment/checkAdmin";
            return $http.get(url)
                .then(function (response) {
                    return response.data;
                });
        }
        
        function login(username, password) {
            var url = "/api/assignment/login";
            var credentials ={
                username: username,
                password: password
            };
            return $http.post(url, credentials)
                .then(function (response) {
                    return response.data;
                });
        }

        function deleteUser(userId) {
            var url = "/api/assignment/user/"+userId;
            return $http.delete(url)
                .then(function (response) {
                    return response.data;
                });
        }

        function unregister(user) {
            var url = "/api/assignment/unregister";
            return $http.post(url, user)
                .then(function (response) {
                    return response.data;
                });
        }

        function updateUser(userId, user) {
            var url = "/api/assignment/user/"+userId;
            return $http.put(url, user)
                .then(function (response) {
                    return response.data;
                });
        }

        function createUser(user) {
            var url = "/api/assignment/user";
            return $http.post(url, user)
                .then(function (response) {
                    return response.data;
                });
            // user._id = (new Date()).getTime() + "";
            // user.created = new Date();
            // users.push(user);
            // return user;
        }

        function findUserByUsername(username) {
            var url = "/api/assignment/user?username="+username;
            return $http.get(url)
                .then(function (response) {
                    return response.data;
                });
            // var user = users.find(function (user) {
            //     return user.username === username;
            // });
            // if(typeof user === 'undefined') {
            //     return null;
            // }
            // return user;
        }

        function findUserById(userId) {
            var url = "/api/assignment/user/"+userId;
            return $http.get(url)
                .then(function (response) {
                    return response.data;
                });
        }

        function findUserByCredentials(username, password) {
            var url = "/api/assignment/user?username="+username+"&password="+password;
            return $http.get(url)
                .then(function (response) {
                    return response.data;
                });
        }

        function findAllUsers(username, password) {
            var url = "/api/assignment/user";
            return $http.get(url)
                .then(function (response) {
                    return response.data;
                });
        }

        function addFriend(userId, friendId) {
            var url = "/api/assignment/user/" + userId + "/friends";
            return $http.put(url, {userId: userId, friendId})
                .then(function (response) {
                    console.log(response);
                    // $location.url('/user/' + model.userId + '/friends')
                    return response;
                }, function (err) {
                    console.log(err);
                });
        }
    }
})();
