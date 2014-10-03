angular.module('restoApp.controllers')

.controller('PlatosCtrl', function($scope,Platos,$stateParams,$state,Carta,LoadingService) {

  $scope.data.showSubheader = true;
  
  $scope.categoria = Carta.getSelectedCategory($stateParams.categoryId)
  LoadingService.show(false)
  
  Platos.all($stateParams.categoryId).then(function(response){
    $scope.platos = response;
    LoadingService.hide();
  });

  $scope.back = function(){
    $scope.data.showSubheader = false;
    $state.go("tab.restos-detail.carta")
  }

})