'use strict';

angular.module('components')

.directive('namepicker',
    function() {
        /**
         * Directive for name picker
         *
         * @name name picker directive
         */

        return {
            restrict: 'E',
            replace: true,
            templateUrl: 'js/components/namePicker/namePicker.html',
            controller: 'namePickerCtrl'
        };
});