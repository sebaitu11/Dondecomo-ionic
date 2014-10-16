angular.module('restoApp.controllers')

.controller('CartaCtrl', function($scope,Carta,Barrios,Restos,$state,LoadingService,$ionicNavBarDelegate) {
  
  LoadingService.show(false);
  $scope.barrio = Barrios.getSelectedBarrio()
  $scope.resto = Restos.getSelectedResto();
  $scope.cartaisHere = false;

  Carta.all($scope.resto.id).then(function(response){
    $scope.categorias = response
    if(response.length > 0){
      $scope.cartaisHere = true;
    }else {
      $scope.cartaNoData = true;
    }
    LoadingService.hide();
  })

  $scope.atras = function(){
    $ionicNavBarDelegate.back();
  }

})