'use strict';

angular.module('revloApp')

// API backend
.factory('apiCalls',
    function ($http, $q, configService, growl) {

    	// console.info("- service 'apiFactory' loaded");

        // Get API key
        function getAPIkey() {
            return configService.getConfig().data.api_key;
        };

        // Get data from API
        function getData(url, params) {
            var d = $q.defer();

            var config = {
                method: 'GET',
                url: url,
                params: ( params != null ) ? params : undefined,
                headers: {'x-api-key': getAPIkey()}
            }

            $http(config)
                .then(function (data) {
                    d.resolve(data);
                })
                .catch(function (error) {
                    growl.error('Server responded with error. Data could not be loaded.');
                    d.reject(error);
                });

            return d.promise;
        };

    	return {
    		getData: getData
    	}
});