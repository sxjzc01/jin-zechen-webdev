(function() {
    angular
        .module("WebAppMaker")
        .config(Config);

    function Config($routeProvider) {
        $routeProvider
            .when('/', {
                templateUrl:'home.html'
            })
            .when('/login', {
                templateUrl:  "views/user/templates/login.views.client.html",
                controller:  'loginController',
                controllerAs:  'vm'
            })
            .when('/register', {
                templateUrl:  "views/user/templates/register.views.client.html",
                controller:  'registerController',
                controllerAs:  'model'
            })
            .when('/profile', {
                templateUrl:  "views/user/templates/profile.views.client.html",
                controller:  'profileController',
                controllerAs:  'model'
            })
            .when('/profile/:uid', {
                templateUrl:  "views/user/templates/profile.views.client.html",
                controller:  'profileController',
                controllerAs:  'model'
            })
            .when('/user/:uid/website', {
                templateUrl:  "views/website/templates/website-list.views.client.html",
                controller:  'websiteListController',
                controllerAs:  'model'
            })
            .when('/user/:uid/website/new', {
                templateUrl:  "views/website/templates/website-new.views.client.html",
                controller:  'websiteNewController',
                controllerAs:  'model'
            })
            .when('/user/:uid/website/:websiteId', {
                templateUrl:  "views/website/templates/website-edit.views.client.html",
                controller:  'websiteEditController',
                controllerAs:  'model'
            })
            .when('/user/:uid/website/:websiteId/page', {
                templateUrl:  "views/page/templates/page-list.views.client.html",
                controller:  'pageListController',
                controllerAs:  'model'
            })
            .when('/user/:uid/website/:websiteId/page/new', {
                templateUrl:  "views/page/templates/page-new.views.client.html",
                controller:  'pageNewController',
                controllerAs:  'model'
            })
            .when('/user/:uid/website/:websiteId/page/:pageId', {
                templateUrl:  "views/page/templates/page-edit.views.client.html",
                controller:  'pageEditController',
                controllerAs:  'model'
            })
            .when('/user/:uid/website/:websiteId/page/:pageId/widget', {
                templateUrl:  "views/widget/templates/widget-list.views.client.html",
                controller:  'widgetListController',
                controllerAs:  'model'
            })
            .when('/user/:uid/website/:websiteId/page/:pageId/widget/new', {
                templateUrl:  "views/widget/templates/widget-chooser.views.client.html",
                controller:  'widgetChooseController',
                controllerAs:  'model'
            })
            .when('/user/:uid/website/:websiteId/page/:pageId/widget/:widgetId/image', {
                templateUrl:  "views/widget/templates/widget-image.views.client.html",
                controller:  'widgetChooseController',
                controllerAs:  'model'
            })
            .when('/user/:uid/website/:websiteId/page/:pageId/widget/:widgetId/heading', {
                templateUrl:  "views/widget/templates/widget-heading.views.client.html",
                controller:  'widgetChooseController',
                controllerAs:  'model'
            })
            .when('/user/:uid/website/:websiteId/page/:pageId/widget/:widgetId/youtube', {
                templateUrl:  "views/widget/templates/widget-youtube.views.client.html",
                controller:  'widgetChooseController',
                controllerAs:  'model'
            })

    }
})();
