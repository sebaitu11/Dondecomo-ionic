angular.module('restoApp.controllers')

.controller('MenuCtrl', function($scope,Menus,Barrios,Restos,$state,LoadingService,$ionicNavBarDelegate) {
  
  LoadingService.show(false,"Cargando Menu..");

  $scope.barrio = Barrios.getSelectedBarrio();
  $scope.resto = Restos.getSelectedResto();
  $scope.menuisHere = false;

  Menus.all($scope.resto.id).then(function(response){
    $scope.menus = response
    if(response.length > 0){
      $scope.menuisHere = true;
    }else {
      $scope.noData = true;
    }
    LoadingService.hide();
  })  

  $scope.atras = function(){
    $state.go("tab.restos-detail",{id: $scope.resto.id})
  }
  
})