angular.module('restoApp.controllers')

.controller('PlatosCtrl', function($scope,Platos,$stateParams,$state,Carta,LoadingService) {
  
  $scope.categoria = Carta.getSelectedCategory($stateParams.categoryId)
  LoadingService.show(false)
  $scope.platosisHere = false;

  Platos.all($stateParams.categoryId).then(function(response){
    $scope.platos = response;
    LoadingService.hide();
    if(response.length > 0){
      $scope.platosisHere = true;
    }else {
      $scope.platosNoData = true;
     }
  });
})