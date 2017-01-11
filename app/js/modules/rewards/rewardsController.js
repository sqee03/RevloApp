'use strict';

angular.module('rewards')

.controller('rewardsCtrl',
    function ($scope, rewardsService) {
        // Variables
        $scope.rewards = null;
        $scope.isCollapsed = false;

        getRewards();

        function getRewards(paging) {
            rewardsService.getRewards(paging).then(function(rewardsData) {
                $scope.rewards = rewardsData.rewards;
            }, function(error) {
                $scope.rewards = null;
                console.log('rewards: ', error)
            });
        };
});