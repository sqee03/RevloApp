'use strict';

angular.module('user')

.controller('userCtrl',
    function ($scope, userService) {
        $scope.getUser = function(user) {
            userService.getUser(user).then(function(userData) {
                $scope.user = userData.loyalty;
            }, function(error) {
                $scope.user = null;
            });
        };
});