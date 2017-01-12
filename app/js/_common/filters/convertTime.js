'use strict';

angular.module('filters')

.filter('time',
    function($filter) {
        // Original source: http://plnkr.co/edit/V08DzsnLMHQY8WtfnHLt?p=preview

        /**
         * Convert minutes to different time formats
         *
         * @memberOf module:filters
         * @param {Number} number to round
         * @param {Number} number of decimal places
         * @returns {Number} rounded number
         */
        var conversions = {
            'ss': angular.identity,
            'mm': function(value) { return value * 60; },
            'hh': function(value) { return value * 3600; },
            'dd': function(value) { return value * 86400; }
        };

        var padding = function(value, length) {
            var zeroes = length - ('' + (value)).length,
                pad = '';
            while(zeroes-- > 0) pad += '0';
            return pad + value;
        };

        return function(value, unit, format, isPadded) {
            var totalSeconds = conversions[unit || 'ss'](value),
                dd = Math.floor(totalSeconds / 86400),
                hh = Math.floor(totalSeconds / 3600),
                mm = Math.floor((totalSeconds % 3600) / 60),
                ss = totalSeconds % 60;

            format = format || 'hh:mm:ss';
            isPadded = angular.isDefined(isPadded)? isPadded: true;
            dd = isPadded? padding(dd, 2): dd;
            hh = isPadded? padding(hh, 2): hh;
            mm = isPadded? padding(mm, 2): mm;
            ss = isPadded? padding(ss, 2): ss;

            return format.replace(/dd/, dd).replace(/hh/, hh).replace(/mm/, mm).replace(/ss/, ss);
        };
});