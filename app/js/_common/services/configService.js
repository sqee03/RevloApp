'use strict';

angular.module('revloApp')

.factory('configService',
    function($http, growl) {

        // console.info("- service 'configService' loaded");

        var config = {};

        // SET config
        function setConfig() {
            console.log('loading config');
            $http.get('json/config.json').then(function(json) {
                config = json;
                console.info('setting config: ', config);
            }, function(error) {
                growl.error('Failed to load app config');
                console.log('failed')
            });
        };

        // GET config
        function getConfig() {
            return config;
        };

        return {
            getConfig: getConfig,
            setConfig: setConfig
        };
});