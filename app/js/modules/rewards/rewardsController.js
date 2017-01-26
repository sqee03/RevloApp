'use strict';

angular.module('rewards')

.controller('rewardsCtrl',
    function ($scope, rewardsService) {
        function getRewards(paging) {
            rewardsService.getRewards(paging).then(function(rewardsData) {
                $scope.rewards = [];

                angular.forEach(rewardsData.rewards, function(reward) {
                    if(reward.enabled) {
                        $scope.rewards.push(reward);
                    }
                });
            }, function(error) {
                $scope.rewards = null;
            });
        };

        getRewards();
});