angular.module('restoApp.controllers')

.controller('RestosCtrl', function($scope,Restos,$stateParams) {
  Restos.all($stateParams.barrioId).then(function(response){
    $scope.restos = response;  
  });
  $scope.$root.tabsHidden = "tabs-item-hide";
})