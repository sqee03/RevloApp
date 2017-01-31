'use strict';

angular.module('randomBonus')

.directive('randomBonus',
    function () {
        /**
         * Directive for Random bonus
         *
         * @name Random bonus directive
         */

        return {
            restrict: 'E',
            replace: true,
            controller: 'randomBonusCtrl',
            templateUrl: 'js/modules/randomBonus/randomBonus.html'
        };
});