'use strict';

angular.module('rewards')

.factory('rewardsService',
    function (apiCalls, dataContractService, configService, $q, growl) {
        // Variables
        var cachedRewards;

        /**
         * Get rewards info
         *
         * @memberOf module:rewards
         * @returns {Obejct} rewards info
         */
        function getRewards() {
            var d = $q.defer();

            // Check if data are already cached
            if(!cachedRewards) {
                // Fetch new data
                console.log(dataContractService.getDataContract().rewards);
                apiCalls.getData(dataContractService.getDataContract().rewards).then(function(apiData) {
                    if (apiData) {
                        cachedRewards = apiData.data; // Cache response
                        d.resolve(apiData.data);
                    }
                    // Handle situation when there are no rewards found
                    else {
                        growl.error('No rewards info found');
                        d.reject(false);
                    }
                });
            }
            else {
                console.log('returning cached rewards');
                d.resolve(cachedRewards); // Return cached data
            }

            return d.promise;
        };

        return {
            getRewards: getRewards
        }
});