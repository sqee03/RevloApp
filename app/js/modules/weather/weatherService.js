'use strict';

angular.module('weather')

.factory('weatherService',
    function (apiCalls, dataContractService, $q, growl) {
        // Variables
        var cachedWeather;

        /**
         * Get current weather
         *
         * @memberOf module:weather
         * @returns {String} weather - current weather
         */
        function getWeather(params) {
            var d = $q.defer();
            var url = dataContractService.getWeather('weather');

            // Check if data are already cached
            if(!cachedWeather) {
                // Fetch new data
                apiCalls.getWeatherData(url, params).then(function(apiData) {
                    if (apiData) {
                        cachedWeather = apiData.data; // Cache response
                        d.resolve(apiData.data);
                    }
                    // Handle situation when there are no rewards found
                    else {
                        growl.error('No weather info found');
                        d.reject(false);
                    }
                });
            }
            else {
                console.log('Returning cached weather');
                d.resolve(cachedWeather); // Return cached data
            }

            return d.promise;
        };

        return {
            getWeather: getWeather
        }
});