'use strict';

angular.module('user')

.directive('user',
    function () {
        /**
         * Directive for user module
         *
         * @name user directive
         */

        return {
            restrict: 'E',
            replace: true,
            controller: 'userCtrl',
            templateUrl: 'js/modules/user/user.html'
        };
});