(function () {
    angular
        .module('demo')
        .controller('apiController', apiController);

    function apiController(apiService){
        var model = this;
        model.hello = 1;

        model.search = (function (name) {
            apiService
                .search(name)
                .then(function (data) {
                    console.log(data);
                    model.message = data;
                });
        })


    }
})();


