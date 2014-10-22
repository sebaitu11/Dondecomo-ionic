angular.module('restoApp.controllers')

.controller('BarriosCtrl', function($scope,$rootScope,Barrios,LoadingService,$cordovaSplashscreen) {
  $scope.dataIsThere = false;
  $scope.$root.tabsHidden = "tabs-item-hide";
  LoadingService.show();
  
  Barrios.all().then(function(response){
    LoadingService.hide();
    $scope.barrios = response;
    $cordovaSplashscreen.hide()
    $scope.dataIsThere = true;
  })
    
})


