angular.module('restoApp.controllers')

.controller('BarriosCtrl', function($scope,$rootScope,Barrios,LoadingService,$cordovaSplashscreen) {
  LoadingService.show()
  $scope.dataIsThere = false;
  $scope.$root.tabsHidden = "tabs-item-hide";
  
  Barrios.all().then(function(response){
    $scope.barrios = response;
    LoadingService.hide()
    // $cordovaSplashscreen.hide()
    $scope.dataIsThere = true;
  })
    
})


