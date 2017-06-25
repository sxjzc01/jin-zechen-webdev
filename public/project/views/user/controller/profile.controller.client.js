(function () {
    angular
        .module('WebAppMaker')
        .controller('profileController', profileController);

    function profileController (currentUser, $location, userService, $routeParams) {
        var model = this;
        model.userId = currentUser._id//$routeParams['userId'];
        // model.user = userService.findUserById(model.userId);
        model.user = currentUser;

        // userService
        //     .findUserById(model.userId)
        //     .then(renderUser, userError);

        function init() {
            renderUser(currentUser);
        }
        init();

        model.updateUser = updateUser;
        model.unregister = unregister;
        model.logout = logout;
        
        function logout() {
            userService
                .logout()
                .then(function () {
                    $location.url('/')
                })
        }

        function unregister() {
            userService
                .unregister()
                .then(function () {
                    $location.url('/');
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
