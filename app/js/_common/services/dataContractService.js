'use strict';

angular.module('revloApp')

.factory('dataContractService',
    function($http, $q, configService, growl) {
        // List of API Urls
        var dataContract = {
            'rewards': undefined,
            'user': {}
        };

        // Get API key
        function getAPIkey() {
            return configService.getConfig().api_key;
        };

        // SET data contract
        function setDataContract() {
            var d = $q.defer();

            $http.get('json/revloDataContract.json').then(function(json) {
                // Base URL parts
                var baseUrl = json.data.api.url;

                // Rewards
                dataContract.rewards = baseUrl + json.data.rewards.url;

                // User
                dataContract.user.base = baseUrl + json.data.user.url + '/';
                dataContract.user.points = '/' + json.data.user.points;

                d.resolve(dataContract);
            }).catch(function(error) {
                growl.error('Failed to load data contract');
                d.reject(error);
            });

            return d.promise;
        };

        return {
            get: function(section) {
                if(dataContract[section]) {
                    return dataContract[section];
                }
                else {
                    console.error('Wrong contract section has been requested: ', section)
                }
            },
            setDataContract: setDataContract
        };
});