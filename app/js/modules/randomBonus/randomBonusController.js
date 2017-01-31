'use strict';

angular.module('randomBonus')

.controller('randomBonusCtrl',
    function ($scope, $q, randomBonusService) {

        function giveRandomBonus(users) {
            randomBonusService.addBonusPoints(users).then(function(usersData) {
                $scope.updatedUser = usersData;
            }, function(error) {
                // failed - do something else
            });
        };

        // Sample bonus
        $scope.randomlyPickedUsers = [
            { user: 'sqee03', points: 1 },
            { user: 'flambelle', points: 2 }
        ];

        giveRandomBonus($scope.randomlyPickedUsers);
        // randomBonusService.getRandomUsersFromChat()
        $scope.randomSelect = randomBonusService.getRandomUsersFromChat(6)
});