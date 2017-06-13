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

            .when('/user/:userId', {
                templateUrl:  "views/user/templates/profile.views.client.html",
                controller:  'profileController',
                controllerAs:  'model'
            })
            .when('/user/:userId/website', {
                templateUrl:  "views/website/templates/website-list.views.client.html",
                controller:  'websiteListController',
                controllerAs:  'model'
            })
            .when('/user/:userId/website/new', {
                templateUrl:  "views/website/templates/website-new.views.client.html",
                controller:  'websiteNewController',
                controllerAs:  'model'
            })
            .when('/user/:userId/website/:websiteId', {
                templateUrl:  "views/website/templates/website-edit.views.client.html",
                controller:  'websiteEditController',
                controllerAs:  'model'
            })
            .when('/user/:userId/website/:websiteId/page', {
                templateUrl:  "views/page/templates/page-list.views.client.html",
                controller:  'pageListController',
                controllerAs:  'model'
            })
            .when('/user/:userId/website/:websiteId/page/new', {
                templateUrl:  "views/page/templates/page-new.views.client.html",
                controller:  'pageNewController',
                controllerAs:  'model'
            })
            .when('/user/:userId/website/:websiteId/page/:pageId', {
                templateUrl:  "views/page/templates/page-edit.views.client.html",
                controller:  'pageEditController',
                controllerAs:  'model'
            })
            .when('/user/:userId/website/:websiteId/page/:pageId/widget', {
                templateUrl:  "views/widget/templates/widget-list.views.client.html",
                controller:  'widgetListController',
                controllerAs:  'model'
            })
            .when('/user/:userId/website/:websiteId/page/:pageId/widget/new', {
                templateUrl:  "views/widget/templates/widget-chooser.views.client.html",
                controller:  'widgetChooseController',
                controllerAs:  'model'
            })
            // .when('/user/:userId/website/:websiteId/page/:pageId/widget/:widgetId/image', {
            //     templateUrl:  "views/widget/templates/widget-edit-image.view.client.html",
            //     controller:  'widgetChooseController',
            //     controllerAs:  'model'
            // })
            // .when('/user/:userId/website/:websiteId/page/:pageId/widget/:widgetId/heading', {
            //     templateUrl:  "views/widget/templates/widget-edit-heading.view.client.html",
            //     controller:  'widgetChooseController',
            //     controllerAs:  'model'
            // })
            // .when('/user/:/website/:websiteId/page/:pageId/widget/:widgetId/youtube', {
            //     templateUrl:  "views/widget/templates/widget-edit-youtube.view.client.html",
            //     controller:  'widgetChooseController',
            //     controllerAs:  'model'
            // })
            .when('/user/:userId/website/:websiteId/page/:pageId/widget/:widgetId', {
                templateUrl:  "views/widget/templates/widget-edit.view.client.html",
                controller:  'widgetEditController',
                controllerAs:  'model'
            })
            .when('/user/:userId/website/:websiteId/page/:pageId/widget/:widgetId/flickr', {
                templateUrl:  "views/widget/templates/widget-flickr-search.view.client.html",
                controller:  'flickrController',
                controllerAs:  'model'
            })

    }
})();
