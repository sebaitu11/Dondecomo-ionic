angular.module('restoApp.controllers')

.controller('PlatosCtrl', function($scope,Platos,$stateParams) {
  
  $scope.resto = $scope.$root.resto
  
  Platos.all($stateParams.categoryId).then(function(response){
    $scope.platos = response;  
  });

  $scope.$root.tabsHidden = "show";

})