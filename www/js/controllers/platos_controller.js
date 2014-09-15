angular.module('restoApp.controllers')

.controller('PlatosCtrl', function($scope,Platos,$stateParams,Restos,$state,Carta,LoadingService) {

  $scope.resto = Restos.getSelectedResto()
  $scope.categoria = Carta.getSelectedCategory($stateParams.categoryId)
  LoadingService.show(false)
  
  Platos.all($stateParams.categoryId).then(function(response){
    $scope.platos = response;  
    LoadingService.hide();
  });

  $scope.$root.tabsHidden = "tabs-item-hide";

  $scope.back = function(){
    Carta.removeCategory()
    $state.go("tab.restos-detail.carta")
  }

})