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
        };

        // Trianglify config
        $scope.colorSchemes = [
            ["#ffffb2","#fed976","#feb24c","#fd8d3c","#f03b20","#bd0026"], // 1st place - gold
            ["#f7f7f7","#d9d9d9","#bdbdbd","#969696","#636363","#252525"], // 2nd place - silver
            ["#fef0d9","#fdd49e","#fdbb84","#fc8d59","#e34a33","#b30000"] // 3rd place - bronze
        ];

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