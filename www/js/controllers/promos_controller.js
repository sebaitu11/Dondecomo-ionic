angular.module('restoApp.controllers')

.controller('PromosCtrl', function($scope,Promos,Restos,LoadingService) {
  
  $scope.resto = Restos.getSelectedResto()
  $scope.dataIsThere = false;
  LoadingService.show(false);

  if($scope.resto){
    Promos.all($scope.resto.id).then(function(response){
      $scope.promos = response;
      $scope.dataIsThere = true;
      LoadingService.hide();
    })  
  }
  
  
})