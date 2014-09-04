angular.module('restoApp.controllers')

.controller('RestoDetailCtrl', function($scope,Restos,$stateParams) {
  $scope.value = false;

  Restos.get($stateParams.id).then(function(response){
    $scope.resto = response.resto.resto;  
    $scope.info = response.resto.info
    
    Restos.setSelectedResto($scope.resto)
    
    $scope.value = true;

  });
  
  $scope.$root.tabsHidden = "show";

})