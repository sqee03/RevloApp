'use strict';

angular.module('components')

.controller('namePickerCtrl',
    function ($scope, userService) {

        $scope.getUserInfo = function() {
            $scope.getUser($scope.userName);
        }
});