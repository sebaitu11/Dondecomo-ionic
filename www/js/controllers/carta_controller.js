angular.module('restoApp.controllers')

.controller('CartaCtrl', function($scope,Carta,$state,LoadingService) {
  
  LoadingService.show(false);

  Carta.all($scope.resto.id).then(function(response){
    $scope.categorias = response
    LoadingService.hide();
  })

})