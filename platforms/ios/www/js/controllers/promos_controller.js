angular.module('restoApp.controllers')

.controller('PromosCtrl', function($scope,Promos,Barrios,Restos,$state,LoadingService,$ionicNavBarDelegate) {
  
  $scope.dataIsThere = false;
  LoadingService.show(false);
  $scope.barrio = Barrios.getSelectedBarrio()
  $scope.resto = Restos.getSelectedResto();

  Promos.all($scope.resto.id).then(function(response){
    $scope.promos = response;
    if(response.length > 0){
      $scope.dataIsThere = true;
    }else {
      $scope.noData = true;
    }
    LoadingService.hide();
  })   

  $scope.atras = function(){
    $ionicNavBarDelegate.back();
  }
  
})