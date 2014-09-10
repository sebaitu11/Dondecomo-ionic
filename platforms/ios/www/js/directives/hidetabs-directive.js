angular.module('restoApp.directives')

.directive('heights', function($rootScope) {
    return {
        restrict: 'A',
        link: function($scope, $el,$getScrollPosition) {
            debugger
            $scope.getElementHeight = function(){
              return { "h" : $el.height()}
            }
            $scope.$watch($scope.getElementHeight,function(newValue,oldValue){
            },true)
        }
    };
});