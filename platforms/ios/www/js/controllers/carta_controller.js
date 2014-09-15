angular.module('restoApp.controllers')

.controller('CartaCtrl', function($scope,Carta,$state,Barrios,Restos,$ionicScrollDelegate,LoadingService) {
  $scope.resto = Restos.getSelectedResto()

  LoadingService.show(false);

  var category = Carta.hasSelectedCategory()
  if(category){
    $state.go("tab.restos-detail.platos",{categoryId: category.id})
  }
  if($scope.resto){
    Carta.all($scope.resto.id).then(function(response){
      $scope.categorias = response
      LoadingService.hide();
    })
  }
  $scope.barrio = Barrios.getSelectedBarrio()

  $scope.back = function(){
    $state.go("tab.restos",{barrioId : $scope.barrio.id})
  }

})