'use strict';

angular.module('hallOfFame')

.factory('hallOfFameService',
    function (userService, $q, growl) {
        // Variables
        var cachedUser;

        /**
         * Get info for top users
         *
         * @memberOf module:hallOfFame
         * @param {Array} users - List of Twitch nicks
         * @returns {Array} users - List of users informations
         */
        function getHallOfFame(users) {
            var usersPromises = [];

            // Creates multiple data fetches
            angular.forEach(users, function(user) {
                usersPromises.push(userService.getUser(user));
            });

            // Resolve all promises then returns final data
            return $q.all(usersPromises).then(function(resolvedPromises) {
                var usersData = [];

                angular.forEach(resolvedPromises, function(user) {
                    usersData.push(user.loyalty);
                });

                return usersData
            });
        };

        return {
            getHallOfFame: getHallOfFame
        }
});