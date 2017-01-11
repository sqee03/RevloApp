'use strict';

angular.module('user')

.factory('userService',
    function (apiCalls, dataContractService, configService, $q, growl) {
        // Variables
        var cachedUser;

        /**
         * Get user info
         *
         * @memberOf module:user
         * @param {String} user - Twitch user name
         * @returns {Object} user info
         */
        function getUser(user) {
            var d = $q.defer();

            // Check if data are already cached
            if(!cachedUser) {
                // Fetch new data
                apiCalls.getData(dataContractService.get('user').base + user + dataContractService.get('user').points).then(function(apiData) {
                    if (apiData) {
                        cachedUser = apiData.data; // Cache response
                        d.resolve(apiData.data);
                    }
                    // Handle situation when there are no rewards found
                    else {
                        growl.error('No user info found');
                        d.reject(false);
                    }
                });
            }
            else {
                console.log('Returning cached user');
                d.resolve(cachedUser); // Return cached data
            }

            return d.promise;
        };

        return {
            getUser: getUser
        }
});