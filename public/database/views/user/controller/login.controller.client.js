(function () {
    angular
        .module('WebAppMaker')
        .controller('loginController', loginController);


    function loginController($location, userService) {
        var vm = this;


        vm.login = function (username, password) {
            function error (e) {
                vm.message = 'Sorry we can not locate ' + "'" + username + "'"
            }
            userService
                .login(username, password)
                .then(login, handleError);

            function handleError(error) {
                vm.message = "Username " + username + " not found, please try again";
            }
            function login(found) {
                if(found !== null) {
                    $location.url('/profile');
                } else {
                    vm.message = "Username " + username + " not found, please try again";
                }

            }
        }
    }
})();