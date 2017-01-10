'use strict';

angular.module('rewards')

.controller('rewardsCtrl',
    function ($scope, rewardsService) {
        // Variables
        $scope.rewards = null;

        getRewards(1);

        function getRewards(paging) {
            rewardsService.getRewards(paging).then(function(rewardsData) {
                $scope.rewards = rewardsData;
                console.log('rewards: ', rewardsData)
            }, function(error) {
                $scope.rewards = null;
                console.log('rewards: ', error)
            });
        };
});