angular.module('restoApp.directives')

.directive('imagemenu', function($rootScope) {
    return {
        restrict: 'A',
        link: function($scope, $el,$getScrollPosition) {
            $($el).bttrlazyloading({
                sm: {
                    src: $scope.menu.image,
                    width: 265,
                    height: 185
                }
            });
        }
    };
})

.directive('imagepromo', function($rootScope) {
    return {
        restrict: 'A',
        link: function($scope, $el,$getScrollPosition) {
            $($el).bttrlazyloading({
                sm: {
                    src: $scope.promo.image,
                    width: 265,
                    height: 185,
                    triggermanually: true
                }
            });
            $($el).trigger("bttrlazyloading.load")
        }
    };
})

.directive('imageresto', function($rootScope) {
    return {
        restrict: 'A',
        link: function($scope, $el,$getScrollPosition) {
            $($el).bttrlazyloading({
                backgroundcolor: '#c0392b',
                sm: {
                    src: $scope.image,
                    width: 350,
                    height: 190
                }
            });
            $($el).trigger("bttrlazyloading.load")
        }
    };
});