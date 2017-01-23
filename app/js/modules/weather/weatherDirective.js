'use strict';

angular.module('weather')

.directive('weather',
    function () {
        /**
         * Directive for Weather
         *
         * @name Weather directive
         */

        return {
            restrict: 'E',
            replace: true,
            controller: 'weatherCtrl',
            templateUrl: 'js/modules/weather/weather.html'
        };
});