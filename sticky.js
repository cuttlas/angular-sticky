angular.module('sticky', [])

.directive('sticky', function(){
	return {
		restrict: 'A',
		scope: {
			offset: '@',
		},
		link: function($scope, $elem, $attrs){
			var offsetTop = $scope.offset || 0,
				$window = angular.element(window),
				doc = document.documentElement,
				initialPositionStyle = $elem.css('position'),
				stickyLine,
				scrollTop;

			// Set the top offset
			//
			$elem.css('top', offsetTop+'px');


			// Get the sticky line
			//
			function setInitial(){
				$elem.css('position', initialPositionStyle);
				stickyLine = $elem[0].offsetTop - offsetTop;
				checkSticky();
			}

			// Check if the window has passed the sticky line
			//
			function checkSticky(){
				scrollTop = (window.pageYOffset || doc.scrollTop)  - (doc.clientTop || 0);

				if ( scrollTop >= stickyLine ){
					$elem.css('position', 'fixed');
				} else {
					$elem.css('position', initialPositionStyle);
				}
			}

			// Attach our listeners
			//
			$window.on('scroll', checkSticky);
			$window.on('resize', setInitial);
			

			setInitial();
		},
	};
})