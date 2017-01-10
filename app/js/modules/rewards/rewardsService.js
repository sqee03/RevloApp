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
         * @param {Number=} number - page number
         * @returns {Object} rewards info
         */
        function getRewards(page) {
            var d = $q.defer();
            var params;

            // Check if paging is requested
            if(page) {
                params = {page: page}
            }

            // Check if data are already cached
            if(!cachedRewards) {
                // Fetch new data
                console.log('rewards url: ', dataContractService.get('rewards'));
                apiCalls.getData(dataContractService.get('rewards'), params).then(function(apiData) {
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