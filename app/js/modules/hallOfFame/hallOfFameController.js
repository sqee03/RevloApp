'use strict';

angular.module('hallOfFame')

.controller('hallOfFameCtrl',
    function ($scope, hallOfFameService) {

        $scope.getHallOfFame = function() {
            hallOfFameService.getHallOfFame().then(function(usersData) {
                $scope.hallOfFame = usersData;
            }, function(error) {
                $scope.hallOfFame = null;
            });
        };

        $scope.getHallOfFame();
        $scope.test = 60;
});