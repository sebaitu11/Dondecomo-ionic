angular.module('restoApp.controllers')

.controller('BarriosCtrl', function($scope,Barrios,LoadingService,$state) {
  LoadingService.show()
  
  $scope.dataIsThere = false;
  
  Barrios.all().then(function(response){
    $scope.barrios = response;
    LoadingService.hide()
    $scope.dataIsThere = true;
  })

  $scope.$root.tabsHidden = "tabs-item-hide";

  // $scope.goToRestos = function(id){
  //   $state.go("tab.restos",{barrioId : id})
  // }

})