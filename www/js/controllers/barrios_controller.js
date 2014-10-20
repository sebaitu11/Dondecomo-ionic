angular.module('restoApp.controllers')

.controller('BarriosCtrl', function($scope,$rootScope,Barrios,LoadingService,$cordovaSplashscreen) {
  $scope.dataIsThere = false;
  $scope.$root.tabsHidden = "tabs-item-hide";
  
  Barrios.all().then(function(response){
    $scope.barrios = response;
    $cordovaSplashscreen.hide()
    $scope.dataIsThere = true;
  })
    
})


