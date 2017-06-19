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
                model.follows = response.followedBy;
            });
        
        function addFriend(friendId) {
            var fid = friendId;
            userService
                .findUserById(fid)
                .then(function (user) {
                    if (!user) {
                        model.error = "User doesn't exist";
                        return;
                    }
                    else if(model.friends.indexOf(friendId) > -1) {
                        model.error = "Friend has already existed";
                        return;
                    } else if(friendId === model.userId) {
                        model.error = "Cannot add yourself";
                    }
                    else {
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
