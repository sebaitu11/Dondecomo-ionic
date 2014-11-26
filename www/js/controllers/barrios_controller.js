angular.module('restoApp.controllers')

.controller('BarriosCtrl', function($scope,$rootScope,Barrios,LoadingService,$cordovaSplashscreen) {
  
  $scope.dataIsThere = false;
  
  LoadingService.show(true,"Cargando Barrios..");
  
  Barrios.all().then(function(response){
    LoadingService.hide();
    $scope.barrios = response;
    
    $scope.$root.barriosLoaded = true;
    
    $cordovaSplashscreen.hide();
    $scope.dataIsThere = true;
  })
    
})


