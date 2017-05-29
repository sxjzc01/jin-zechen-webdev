(function () {
    angular
        .module('WebAppMaker')
        .controller('profileController', profileController)

    function profileController ($location, userService, $routeParams) {
        var model = this;
        model.uid = $routeParams['uid'];
        model.user = userService.findUserById(model.uid);
        console.log(model.user);

        model.update = (function (username, firstName, lastName) {
            var newUser = { username: username,
                            firstName: firstName,
                            lastName: lastName};
            userService.updateUser(model.id, newUser);
            return
        })
    }
})()
