angular.module('restoApp.controllers')

.controller('CartaCtrl', function($scope,Carta,$location,Barrios,Restos) {
  $scope.resto = Restos.getSelectedResto()
  
  if($scope.resto){
    Carta.all($scope.resto.id).then(function(response){
      $scope.categorias = response
    })
  }
  $scope.barrio = Barrios.getSelectedBarrio()

  $scope.back = function(){
    $location.path("tab/barrio/" + $scope.barrio.id);
  }

})