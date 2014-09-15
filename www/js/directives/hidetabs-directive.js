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
});