'use strict';

angular.module('components')

.directive('countdown',
    function() {
        /**
         * Directive for countdown
         *
         * @name countdown directive
         */

        return {
            restrict: 'E',
            replace: true,
            template: '<span id="countdown">{{countdown | time:"ss":"mm:ss":false}}</span>',
            controller: 'countdownCtrl'
        };
});