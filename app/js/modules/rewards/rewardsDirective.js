'use strict';

angular.module('rewards')

.directive('rewards',
    function () {
        /**
         * Directive for rewards module
         *
         * @name rewards directive
         */

        return {
            restrict: 'E',
            replace: true,
            controller: 'rewardsCtrl',
            templateUrl: 'js/modules/rewards/rewards.html'
        };
});