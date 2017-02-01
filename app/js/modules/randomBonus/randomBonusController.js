'use strict';

angular.module('randomBonus')

.controller('randomBonusCtrl',
    function ($scope, $q, randomBonusService) {

        function giveRandomBonus(howManyUsersToAward) {
            randomBonusService.addBonusPoints(howManyUsersToAward).then(function(updatedUsers) {
                $scope.awardedUsers = updatedUsers;
            }, function(error) {
                // failed - do something else
            });
        };

        giveRandomBonus(3)
});