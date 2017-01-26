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

        /**
         * Get random location from pool of locations
         *
         * @memberOf module:weather
         * @returns {Object} location details - name and GPS coordinates of randomly selected location
         */
        function getRandomLocation() {
            var poolOfLocations = [
                { name: 'Údolí Smrti - Kalifornie', lat: 36.5322649, lon: -116.9325408 }, // Death Valley - California
                { name: 'Vesnice Oymyakon - Rusko', lat: 63.460899, lon: 142.785812 }, // Oymyakon - Russia
                { name: 'Kypr (sídlo Wargmaming.net)', lat: 35.166672, lon: 33.3666695 }, // Nocosia - Cyprus
                { name: 'Gran Canaria - Kanárské Ostrovy', lat: 28.116541, lon: -15.43898 }, // Gran Canaria - Canary Islands
                { name: 'Kapské Město - Afrika', lat: -33.918861, lon: 18.423300 } // Cape Town - Africa
            ];

            return poolOfLocations[Math.floor(Math.random()*poolOfLocations.length)];
        };

        return {
            getWeather: getWeather,
            getRandomLocation: getRandomLocation
        }
});