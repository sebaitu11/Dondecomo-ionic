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

.directive('imageResto', function($rootScope,$timeout) {
    return {
        restrict: 'A',
        link: function($scope, element,attrs) {
          if(!$rootScope.restosLoaded){
              element.css("opacity",0);
              element.bind("load",function (arg) {
                arg.target.style.opacity = 1;
              })
          }
        }
    };
})
.directive('imageBarrio', function($rootScope,$timeout) {
    return {
        restrict: 'A',
        link: function($scope, element,attrs) {
          if(!$rootScope.barriosLoaded){
              element.css("opacity",0);
              element.bind("load",function (arg) {
                arg.target.style.opacity = 1;
              })
          }
        }
    };
})