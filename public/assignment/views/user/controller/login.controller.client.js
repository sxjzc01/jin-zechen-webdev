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
            // var found = userService.findUserByCredentials(username, password);
            userService
                .findUserByCredentials(username, password)
                .then(function (found) {
                        $location.url('/user/' + found._id);
                    // if(found !== null) {
                    //     console.log(found)
                    //
                    //     $location.url('/user/' + found._id);
                    // } else {
                    //     vm.message = "sorry, " + username + " not found. please try again!";
                    //     console.log(4);
                    // }
                },
                function (found) {
                        vm.message = "sorry, " + username + " not found. please try again!";
                });
        }
    }
})();