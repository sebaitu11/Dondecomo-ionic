angular.module('restoApp.controllers')

.controller('RestoDetailCtrl', function($scope,Restos,$stateParams) {
  
  $scope.$root.resto_id = $stateParams.id;
  $scope.value = false;

  Restos.get($stateParams.id).then(function(response){
    $scope.resto = response.resto;  
    $scope.info = response.info
    $scope.value = true;
  });
  $scope.$root.tabsHidden = "show";
})