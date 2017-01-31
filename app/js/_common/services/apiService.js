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
            return makeRequest(config)
        }

        // Get data from Revlo API
        function getRevloData(url, params) {
            var config = {
                method: 'GET',
                url: url,
                params: ( params != null ) ? params : undefined,
                headers: {'x-api-key': getRevloAPIkey()}
            }
            return makeRequest(config)
        }

        // Update Revlo data
        function postRevloData(url, params) {
            var config = {
                method: 'POST',
                url: url,
                data: ( params != null ) ? params : undefined,
                headers: {'x-api-key': getRevloAPIkey()}
            }
            return makeRequest(config)
        }

        // Get data from OpenWeatherMap API
        function getWeatherData(url, params) {
            var config = {
                method: 'GET',
                url: url,
                params: ( params != null ) ? params : undefined
            }
            return makeRequest(config)
        }

        // Make Http request
        function makeRequest(config) {
            var d = $q.defer();

            $http(config)
                .then(function (data) {
                    console.log('response: ', data);
                    d.resolve(data);
                })
                .catch(function (error) {
                    growl.error('Server responded with error. Data could not be loaded.');
                    d.reject(error);
                });

            return d.promise;
        };

    	return {
            makeRequest: makeRequest,
    		getRevloData: getRevloData,
            postRevloData: postRevloData,
            getWeatherData: getWeatherData,
            getFbData: getFbData
    	}
});