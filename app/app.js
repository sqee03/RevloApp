'use strict';

angular.module('revloApp', [
        // Libraries
        'ui.router',
        'ngAnimate',
        'countUpModule', // animated number counter
        'momentjs', // custom req. library
        'lodash', // custom req. library

        // Offlinejs
        'offlinejs',

        // Notifications
        'angular-growl',
        'notifications',

        // Template cache
        'templateCache',

        // Filters
        'filters',

        // Common components
        'components',

        // App modules
        'rewards',
        'user',
        'hallOfFame'
    ])

    .config(
        function($stateProvider, $urlRouterProvider, $qProvider, $httpProvider) {
            // Workaround for routing errors
            $qProvider.errorOnUnhandledRejections(false);

            // Routing
                // Init config files
                var root = {
                    name: 'app',
                    abstract: true,
                    template: '<ui-view/>',
                    resolve: {
                        Config: 'configService',
                        config: function (configService) {
                            return configService.setConfig();
                        },
                        dataContract: function (dataContractService) {
                            return dataContractService.setDataContract();
                        }
                    }
                }
                // Starting page
                var home = {
                    name: 'app.home',
                    url: '/',
                    parent: 'app',
                    templateUrl: 'views/home.html'
                }
                // Rewards
                var rewards = {
                    name: 'app.rewards',
                    url: '/rewards',
                    parent: 'app',
                    templateUrl: 'views/rewards.html'
                }
                // User
                var user = {
                    name: 'app.user',
                    url: '/user',
                    parent: 'app',
                    templateUrl: 'views/user.html'
                }
                // Hall of fame
                var hallOfFame = {
                    name: 'app.hof',
                    url: '/hall-of-fame',
                    parent: 'app',
                    templateUrl: 'views/hall-of-fame.html'
                }
                // Default redirect
                $urlRouterProvider.otherwise('/');

                $stateProvider.state(root);
                $stateProvider.state(home);
                $stateProvider.state(rewards);
                $stateProvider.state(user);
                $stateProvider.state(hallOfFame);
    })

    .run(function($rootScope, dataContractService) {
        $rootScope.$on("$stateChangeError", console.log.bind(console));
    });