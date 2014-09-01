angular.module('restoApp.controllers')

.controller('BarriosCtrl', function($scope,Barrios) {
  Barrios.all().then(function(response){
    $scope.barrios = response;
  })
  $scope.$root.tabsHidden = "tabs-item-hide";
})