angular.module('restoApp.controllers')

.controller('RestoDetailCtrl', function($scope,Restos,$stateParams) {
  $scope.value = false;

  Restos.get($stateParams.id).then(function(response){
    $scope.resto = response.resto.resto;  
    $scope.info = response.resto.info
    
    $scope.$root.resto = response.resto.resto
    $scope.value = true;

  });
  
  $scope.$root.tabsHidden = "show";

})