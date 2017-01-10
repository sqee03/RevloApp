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
        function getData(url, request) {
            var d = $q.defer();

            $http({
                    method: 'GET',
                    url: url,
                    data: JSON.stringify(request),
                    headers: {'x-api-key': getAPIkey()}
                })
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