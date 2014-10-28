angular.module('restoApp.directives')

.directive('imagemenu', function($rootScope) {
    return {
        restrict: 'A',
        link: function($scope, $el,$getScrollPosition) {
            $($el).bttrlazyloading({
                sm: {
                    src: $scope.menu.image_url,
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
                    src: $scope.promo.image_url,
                    width: 265,
                    height: 185,
                    triggermanually: true
                }
            });
            $($el).trigger("bttrlazyloading.load")
        }
    };
})
.directive('modalOpacity', function($rootScope) {
    return {
        restrict: 'A',
        link: function($scope, $el,$getScrollPosition) {
            $el.parent().css("opacity","0.8")
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
                    src: $scope.image_url,
                    width: 350,
                    height: 190
                }
            });
            $($el).trigger("bttrlazyloading.load")
        }
    };
});