'use strict';

angular.module('components')

.controller('countdownCtrl',
    function ($scope, $timeout) {

        // Starting countdown value
        $scope.countdown = 900; // 900s = 15mins

        $scope.onTimeout = function() {
            $scope.countdown--;

            if($scope.countdown > 0) {
                mytimeout = $timeout($scope.onTimeout, 1000);
            }
        }

        var mytimeout = $timeout($scope.onTimeout, 1000);
});