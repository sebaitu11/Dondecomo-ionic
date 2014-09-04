angular.module('restoApp.controllers')

.controller('BarriosCtrl', function($scope,Barrios,LoadingService) {
  LoadingService.show()
  
  $scope.dataIsThere = false;
  
  Barrios.all().then(function(response){
    $scope.barrios = response;
    LoadingService.hide()
    $scope.dataIsThere = true;

    $scope.$root.barrios = response
  })

  $scope.$root.tabsHidden = "tabs-item-hide";

})