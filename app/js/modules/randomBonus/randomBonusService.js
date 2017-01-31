'use strict';

angular.module('randomBonus')

.factory('randomBonusService',
    function (apiCalls, userService, $q, growl) {
        /**
         * Add different ammount of points to multiple users
         *
         * @memberOf module:randomBonus
         * @param {Array} users - List of Revlo users and the information about how many points should be added to them
         * @returns {Array} users - List of updated users informations
         */
        function addBonusPoints(users) {
            var usersPromises = [];

            // Creates multiple data update requests
            angular.forEach(users, function(user) {
                usersPromises.push(userService.updateUserPoints(user.user, user.points));
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

        /**
         * Select random users from Twitch chat
         *
         * @memberOf module:randomBonus
         * @param {Number} how many users - How many users should be randomly selected from current chat pool
         * @returns {Array} users - List of users
         */
        function getRandomUsersFromChat(howMany) {
            // var d = $q.defer();
            // var url = 'http://api.geosvc.com/rest/US/84606/nearby?apikey=4ff687893a7b468cb520b3c4e967c4da&d=20&pt=PostalCode&format=json';
            // var config = {
            //     method: 'GET',
            //     url: url
            // }

            // // Fetch list of viewers in the channel chat
            // apiCalls.makeRequest(config).then(function(data) {
            //     if (data) {
            //         console.log('chatters: ', data);

            //         console.log(selectRandomUsers(3, users));

            //         d.resolve(data.data);
            //     }
            //     else {
            //         growl.error('Failed to get list of users in chat');
            //         d.reject(false);
            //     }
            // });

            // return d.promise;

            var allUsers = ['user1', 'user2', 'user3', 'user4', 'user5'];
            var selectedUsers = randomlySelectUsers(howMany, allUsers);

            return selectedUsers
        };

        /**
         * Randomly pick requested amount of users from list
         *
         * @memberOf module:randomBonus
         * @param {Number} how many users - How many users should be randomly selected from list
         * @param {Array} pool of all users - List from which will be users picked
         * @returns {Array} selected users - List of randomly selected users
         */
        function randomlySelectUsers(howMany, listOfUsers) {
            var selectedUsers = [];

            // Check if we are not trying to pick more users than what is size of user's pool
            if (howMany > listOfUsers.length) {
                howMany = listOfUsers.length;
            }

            // Run cycle for selecting users
            for (var i = howMany; i > 0; i--) {
                // Pick random user from array
                var randomSelect = listOfUsers[Math.floor(Math.random()*listOfUsers.length)];

                // Remove this user from original array so we prevent creating duplicates for next iteration
                var index = listOfUsers.indexOf(randomSelect);
                if (index > -1) {
                    listOfUsers.splice(index, 1);
                };

                // Add picked user to the collection of all randomly selected users
                selectedUsers.push(randomSelect);
            }

            return selectedUsers
        }

        return {
            addBonusPoints: addBonusPoints,
            getRandomUsersFromChat: getRandomUsersFromChat
        }
});