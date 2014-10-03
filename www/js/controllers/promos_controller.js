angular.module('restoApp.controllers')

.controller('PromosCtrl', function($scope,Promos,LoadingService) {
  
  $scope.dataIsThere = false;
  LoadingService.show(false);

  Promos.all($scope.resto.id).then(function(response){
    $scope.promos = response;
    $scope.dataIsThere = true;
    LoadingService.hide();
  })   
  
})