(function () {
    angular
        .module('WebAppMaker')
        .controller('registerController', registerController);

    function registerController($location,userService) {

        var model = this;

        model.register = (function (username, password, password2) {

            if(username === null || username === '' || typeof username === 'undefined') {
                model.error = 'username is required';
                return;
            }

            if(password !== password2 || password === null || typeof password === 'undefined') {
                model.error = "passwords must match";
                return;
            }

            userService
                .findUserByUsername(username)
                .then(
                    function () {
                        model.error = "sorry, that username is taken";
                        console.log(asd);
                    },
                    function () {
                        var newUser = {
                            username: username,
                            password: password
                        };
                        return userService
                            .register(newUser);
                    }
                )
                .then(function (user) {
                    $location.url('/profile');
                });

        })
    }
})();