'use strict';

angular.module('hallOfFame')

.factory('hallOfFameService',
    function (apiCalls, dataContractService, configService, userService, $q, growl) {
        // Variables
        var cachedUser;
        var hallOfFame = [];

        /**
         * Get info for top users
         *
         * @memberOf module:hallOfFame
         * @param {Array} users - List of Twitch nicks
         * @returns {Array} users - List of users informations
         */
        function getHallOfFame() {
            var d = $q.defer();
            var top_users = configService.getConfig().data.revlo.top_users;

            angular.forEach(top_users, function(user) {
                userService.getUser(user).then(function(userData) {
                    hallOfFame.push(userData.loyalty);
                }, function(error) {
                    hallOfFame = null;
                    growl.error('No user info found for: ', user);
                });
            });

            d.resolve(hallOfFame);

            return d.promise;
        };

        return {
            getHallOfFame: getHallOfFame
        }
});