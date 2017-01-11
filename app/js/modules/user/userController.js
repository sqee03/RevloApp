'use strict';

angular.module('user')

.controller('userCtrl',
    function ($scope, userService) {
        function getUser(user) {
            userService.getUser(user).then(function(userData) {
                $scope.user = userData.loyalty;
            }, function(error) {
                $scope.user = null;
            });
        };

        getUser('sqee03');
});