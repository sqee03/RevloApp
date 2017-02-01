'use strict';

angular.module('randomBonus')

.factory('randomBonusService',
    function (apiCalls, userService, $q, $sce, $http, growl) {
        /**
         * Add different ammount of points to multiple users
         *
         * @memberof module:randomBonus
         * @param {Number} filter - How many users should be awarded
         * @returns {Array} updatedUsers - List of updated users informations
         */
        function addBonusPoints(toHowManyUsers) {
            var usersPromises = [];
            var selectedUsers = [];

            return assignPointsToUsers(toHowManyUsers).then(function(users) {
                selectedUsers = users;

                // Creates multiple data update requests
                angular.forEach(users, function(user) {
                    usersPromises.push(userService.updateUserPoints(user.user, user.points));
                });

                // Resolve all promises then returns final data
                return $q.all(usersPromises).then(function(resolvedPromises) {
                    var usersData = [];
                    var i = 0;

                    angular.forEach(resolvedPromises, function(user) {
                        usersData.push({
                            'input': { 'user': selectedUsers[i].user, 'points': selectedUsers[i].points },
                            'result': user.loyalty
                        });

                        i++;
                    });

                    return usersData
                });
            });
        };

        /**
         * Assign points to users
         *
         * @memberof module:randomBonus
         * @param {Number} filter - How many users should be randomly selected from current chat pool
         * @returns {Array} users - List of Revlo users and the information about how many points should be added to them
         */
        function assignPointsToUsers(howManyUsers) {
            var d = $q.defer();
            var users = [];
            var usersWithPoints = [];
            var usersCompleted = 0;

            getRandomUsersFromChat(howManyUsers).then(function(selectedUsers) {
                users = selectedUsers;

                for (var i = 0; i < users.length; i++) {
                    var obj = {};
                    obj['user'] = users[i];
                    obj['points'] = generateRandomBonusPoints();

                    usersWithPoints.push(obj);
                    usersCompleted++;

                    if (usersCompleted == users.length) {
                        d.resolve(usersWithPoints);
                    }
                };
            });

            return d.promise;
        };

        /**
         * Select random users from Twitch chat
         *
         * @memberof module:randomBonus
         * @param {Number} filter - How many users should be randomly selected from current chat pool
         * @returns {Array} users - List of users
         */
        function getRandomUsersFromChat(howMany) {
            var d = $q.defer();
            var url = 'http://tmi.twitch.tv/group/user/sqee03/chatters';

            var config = {
                method: 'JSONP',
                url: $sce.trustAsResourceUrl(url)
            }

            // Fetch list of viewers in the channel chat
            apiCalls.makeRequest(config).then(function(chatUsers) {
                if (chatUsers) {
                    var mergedUsers = mergeChatGroups(chatUsers.data.data);

                    if(mergedUsers.length > 0) {
                        randomlySelectUsers(howMany, mergedUsers).then(function(users) {
                            d.resolve(users);
                        });
                    }
                    else {
                        console.error('There is nobody in chat to be awarded with points :-(.')
                        d.reject(false);
                    }
                }
                else {
                    growl.error('Failed to get list of users in chat');
                    d.reject(false);
                }
            });

            return d.promise;
        };

        /**
         * Merge all groups of chat users together
         *
         * @memberof module:randomBonus
         * @param {Object} groups - List of all chat users splited into several groups
         * @returns {Array} collection - List of all chat users in one collection
         * @todo Pull list of excluded users from config file.
         */
        function mergeChatGroups(chatGroups) {
            var usersCollection = [];
            var admins = chatGroups.chatters.admins;
            var moderators = chatGroups.chatters.moderators;
            var viewers = chatGroups.chatters.viewers;
            var groupsCollection = [admins, moderators, viewers];
            var excludeUsers = ['nightbot','revlobot'];

            for(var i=0; i<groupsCollection.length; i++) {
                usersCollection.push.apply(usersCollection, groupsCollection[i]);
            }

            var withoutExcludedUsers = usersCollection.filter(function(user) {
                return excludeUsers.indexOf(user) === -1;
            });

            return withoutExcludedUsers
        };

        /**
         * Randomly pick requested amount of users from list
         *
         * @memberof module:randomBonus
         * @param {Number} filter - How many users should be randomly selected from list
         * @param {Array} pool - List from which will be users picked
         * @returns {Array} users - List of randomly selected users
         */
        function randomlySelectUsers(howMany, listOfUsers) {
            var d = $q.defer();
            var selectedUsers = [];
            var selectionsCompleted = 0;

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
                selectionsCompleted++;

                if (selectionsCompleted == howMany) {
                    d.resolve(selectedUsers);
                }
            }

            return d.promise;
        };

        /**
         * Generate random bonus points
         *
         * @memberof module:randomBonus
         * @returns {Number} points - Randomly generated bonus
         * @todo Pull min/max/chanceToGetSpecial values for bonus from config file.
         */
        function generateRandomBonusPoints() {
            var min = 10;
            var max = 100;
            var specialMin = 100;
            var specialMax = 1000;
            var chanceToGetSpecial = 0.1; // 10%
            var rangeMax = max + (max * chanceToGetSpecial);
            var bonus, decimals;

            var testMode = true;

            // Get random bonus number between min and max value
            if(!testMode) {
                bonus = Math.random() * (rangeMax - min) + min;
            }
            else {
                bonus = 0;
            }

            // Decide if special bonus should be awarded
            if(bonus > max) {
                bonus = Math.random() * (specialMax - specialMin) + specialMin;

                // Round down bonus
                decimals = -2; // Will round down to 900,800,700 etc.
                bonus = Math.floor(bonus * Math.pow(10, decimals)) / Math.pow(10, decimals);
            }
            else {
                // Round down bonus
                decimals = -1; // Will round down to 90,80,70 etc.
                bonus = Math.floor(bonus * Math.pow(10, decimals)) / Math.pow(10, decimals);
            }

            return parseInt(bonus)
        };

        return {
            addBonusPoints: addBonusPoints
        }
});