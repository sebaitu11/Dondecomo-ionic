angular.module('restoApp.controllers')

.controller('PromosCtrl', function($scope,Promos,Restos) {
  
  $scope.resto = Restos.getSelectedResto()
  $scope.dataIsThere = false;

  if($scope.resto){
    Promos.all($scope.resto.id).then(function(response){
      $scope.promos = response;
      $scope.dataIsThere = true;
    })  
  }
  
  
})