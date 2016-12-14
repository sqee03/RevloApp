'use strict';

angular.module('revloApp', [
        // Libraries
        'ui.router',
        'ngAnimate',
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

        // App
        'playerInfo',
    ])

    .config(
        function($stateProvider, $urlRouterProvider, $qProvider) {
            // Workaround for routing errors
            $qProvider.errorOnUnhandledRejections(false);

            // Routing
            $stateProvider
                // Init config files
                .state('app', {
                    abstract: true,
                    url: '',
                    template: '<ui-view/>',
                    resolve: {
                        config: function (configService) {
                            return configService.setConfig();
                        },
                        dataContract: function (dataContractService) {
                            dataContractService.setDataContract();
                        }
                    }
                })
                // Starting page
                .state({
                    name: 'home',
                    url: '/',
                    templateUrl: 'views/home.html'
                })
                // Test page
                .state({
                    name: 'test',
                    url: '/test',
                    templateUrl: 'views/test.html'
                })
                // Default redirect
                $urlRouterProvider.otherwise('/');
    });