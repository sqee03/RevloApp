'use strict';

angular.module('hallOfFame')

.directive('hallOfFame',
    function () {
        /**
         * Directive for Hall of fame
         *
         * @name Hall of fame directive
         */

        return {
            restrict: 'E',
            replace: true,
            controller: 'hallOfFameCtrl',
            templateUrl: 'js/modules/hallOfFame/hallOfFame.html'
        };
});