'use strict';

angular.module('revloApp')

.factory('dataContractService',
    function($http, configService, growl) {
        // List of API Urls
        var dataContract = {
            'rewards': {}
        };

        // Get API key
        function getAPIkey() {
            return configService.getConfig().api_key;
        };

        // SET data contract
        function setDataContract() {
            $http.get('json/revloDataContract.json').then(function(json) {
                // Base URL parts
                var url_rewards = json.api.url + json.rewards.url;

                // Rewards
                dataContract['rewards'] = url_rewards + '?' + json.api.paging;
                console.info('setting contract: ', dataContract);
            }, function(error) {
                growl.error('Failed to load data contract');
            });
        };

        // GET data contract
        function getDataContract() {
            return dataContract;
        };

        return {
            getDataContract: getDataContract,
            setDataContract: setDataContract
        };
});