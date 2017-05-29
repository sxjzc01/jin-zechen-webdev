(function () {
    angular
        .module('WebAppMaker')
        .controller('registerController', registerController);

    function registerController($location,userService) {

        var model = this;

        model.register = (function (username, password, password2) {
            console.log('1');
            var user = userService.findUserByUsername(username);
            if (username === null || username === '' || typeof username === 'undefined') {
                model.message = "Can't have empty fields!";
                return
            }
            if (user !== null) {
                model.message = 'Username already exist!';
                return
            }
            if (password === password2) {
                var newUser = {username: username,
                    password: password};
                newUser = userService.createUser(newUser);
                console.log(2);
                model.message = "Success!";
                $location.url('/profile/' + newUser._id)
            } else {
                model.message = "Passwords must match";
                return
            }
        })
    }
})();
