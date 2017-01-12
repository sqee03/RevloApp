'use strict';

angular.module('revloApp')

.factory('dataContractService',
    function($http, $q, configService, growl) {
        // List of API Urls
        var revloDataContract = {
            'rewards': undefined,
            'user': {}
        };

        // SET Facebook data contract
        function setFbDataContract() {
            var d = $q.defer();

            $http.get('json/fbDataContract.json').then(function(json) {
                // Base URL parts
                var baseUrl = json.data.api.url + '/' + json.data.api.version;

                d.resolve(dataContract);
            }).catch(function(error) {
                growl.error('Failed to load FB data contract');
                d.reject(error);
            });

            return d.promise;
        };

        // SET Revlo data contract
        function setRevloDataContract() {
            var d = $q.defer();

            $http.get('json/revloDataContract.json').then(function(json) {
                // Base URL parts
                var baseUrl = json.data.api.url;

                // Rewards
                revloDataContract.rewards = baseUrl + json.data.rewards.url;

                // User
                revloDataContract.user.base = baseUrl + json.data.user.url + '/';
                revloDataContract.user.points = '/' + json.data.user.points;

                d.resolve(revloDataContract);
            }).catch(function(error) {
                growl.error('Failed to load Revlo data contract');
                d.reject(error);
            });

            return d.promise;
        };

        return {
            getRevlo: function(section) {
                if(revloDataContract[section]) {
                    return revloDataContract[section];
                }
                else {
                    console.error('Wrong contract section has been requested: ', section)
                }
            },
            getFb: function(section) {
                if(fbDataContract[section]) {
                    return fbDataContract[section];
                }
                else {
                    console.error('Wrong contract section has been requested: ', section)
                }
            },
            setDataContract: setRevloDataContract
        };
});