'use strict';

angular.module('revloApp')

.factory('configService',
    function($http, $q, growl) {

        // console.info("- service 'configService' loaded");

        var config = {};

        // SET config
        function setConfig() {
            var d = $q.defer();

            $http.get('json/config.json').then(function(json) {
                config = json;
                d.resolve(config);
            }).catch(function(error) {
                growl.error('Failed to load app config');
            });

            return d.promise;
        };

        // GET config
        function getConfig() {
            return config
        };

        return {
            getConfig: getConfig,
            setConfig: setConfig
        };
});