angular.module('revloApp').directive('trianglify', function() {
	return {
		restrict: 'A',
        scope: {
            color: '='
        },
        link: function(scope, element) {
            var pattern = Trianglify({
                width: element[0].offsetWidth,
                height: element[0].offsetHeight,
                x_colors: (scope.color != undefined) ? scope.color : 'random'
            });
            element[0].style.backgroundImage = 'url('+pattern.png()+')';
        }
	};
});