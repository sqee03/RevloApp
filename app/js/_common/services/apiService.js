'use strict';

angular.module('revloApp')

// API backend
.factory('apiCalls',
    function ($http, $q, configService, growl) {

    	// console.info("- service 'apiFactory' loaded");

        // Get API key
        function getAPIkey() {
            return configService.getConfig().api_key;
        };

        // Get data from API
        function getData(url) {
            var d = $q.defer();

            $http({
                    method: 'GET',
                    url: url,
                    headers: {'Authorization': 'apikey=' + getAPIkey()}
                })
                .success(function (data) {
                    d.resolve(data);
                })
                .error(function (error) {
                    growl.error('Server responded with error. Data could not be loaded.');
                    d.reject(error);
                });

            return d.promise;
        };

    	return {
    		getData: getData
    	}
});