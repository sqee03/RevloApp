'use strict';

angular.module('revloApp')

// API backend
.factory('apiCalls',
    function ($http, $q, configService, growl) {

    	// console.info("- service 'apiFactory' loaded");

        // Get API keys
        function getRevloAPIkey() {
            return configService.getConfig().data.revlo_api_key;
        };
        function getFbAPIkey() {
            return configService.getConfig().data.fb_app_id;
        };

        // Get data from FB API
        function getFbData(url) {
            var config = {
                method: 'GET',
                url: url,
                headers: {'x-api-key': getFbAPIkey()}
            }
            return makeRequest(url, config)
        }

        // Get data from Revlo API
        function getRevloData(url, params) {
            var config = {
                method: 'GET',
                url: url,
                params: ( params != null ) ? params : undefined,
                headers: {'x-api-key': getRevloAPIkey()}
            }
            return makeRequest(url, config)
        }

        // Make Http request
        function makeRequest(url, config) {
            var d = $q.defer();

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
    		getRevloData: getRevloData,
            getFbData: getFbData
    	}
});