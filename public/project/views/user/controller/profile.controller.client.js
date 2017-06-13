(function () {
    angular
        .module('WebAppMaker')
        .controller('profileController', profileController);

    function profileController ($location, userService, $routeParams) {
        var model = this;
        model.userId = $routeParams['userId'];
        model.user = userService.findUserById(model.userId);
        userService
            .findUserById(model.userId)
            .then(renderUser, userError);

        model.updateUser = updateUser;
        model.deleteUser = deleteUser;
        function deleteUser(user) {
            userService
                .deleteUser(user._id)
                .then(function () {
                    $location.url('/');
                }, function () {
                    model.error = "Unable to delete you";
                });
        }

        function updateUser(user) {
            userService
                .updateUser(user._id, user)
                .then(function () {
                    model.message = "User update was successful";
                })
        }

        function renderUser (user) {
            model.user = user;
        }

        function userError(error) {
            model.error = "User not found";
        }
    }
})();
