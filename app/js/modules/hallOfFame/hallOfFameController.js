'use strict';

angular.module('hallOfFame')

.controller('hallOfFameCtrl',
    function ($scope, $q, hallOfFameService, configService) {

        // Configuration for animated counter
        $scope.counterConfig = {
            duration: 8,
            options: {
                useEasing : true,
                useGrouping : true,
                separator : '.',
                decimal : '.',
                prefix : '',
                suffix : ''
            }
        }

        function getHallOfFame() {
            var top_users = configService.getConfig().data.revlo.top_users;

            hallOfFameService.getHallOfFame(top_users).then(function(usersData) {
                $scope.hallOfFame = usersData;
            }, function(error) {
                $scope.hallOfFame = null;
            });
        };

        getHallOfFame();
});