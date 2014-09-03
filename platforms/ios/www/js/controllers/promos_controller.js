angular.module('restoApp.controllers')

.controller('PromosCtrl', function($scope,Promos) {
  
  $scope.resto = $scope.$root.resto;

  Promos.all($scope.resto.id).then(function(response){
    $scope.promos = response;
  })
  
})