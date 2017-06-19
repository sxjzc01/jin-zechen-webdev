(function () {
    angular
        .module('WebAppMaker')
        .controller('friendsController', friendsController);

    function friendsController($routeParams, userService, $location) {
        var model = this;
        model.addFriend = addFriend;

        model.userId = $routeParams['userId'];

        userService
            .findUserById(model.userId)
            .then(function (response) {
                model.friends = response.followList;
            })
        
        function addFriend(friendId) {
            var fid = friendId;
            userService
                .findUserById(fid)
                .then(function (user) {
                    if (!user) {
                        model.error = "User doesn't exist";
                    } else {
                        console.log(user);
                        userService
                            .addFriend(model.userId, friendId)
                            .then(function () {

                                model.message = "Success. Please refresh this page.";
                            }, function (err) {
                                console.log(err);
                            })

                    }
                })
        }

    }

})();