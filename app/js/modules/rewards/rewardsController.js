'use strict';

angular.module('rewards')

.controller('rewardsCtrl',
    function ($scope, rewardsService) {
        // Variables
        $scope.isCollapsed = false;

        function getRewards(paging) {
            rewardsService.getRewards(paging).then(function(rewardsData) {
                $scope.rewards = rewardsData.rewards;
            }, function(error) {
                $scope.rewards = null;
            });
        };

        getRewards();
});