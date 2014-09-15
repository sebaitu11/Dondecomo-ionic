angular.module('restoApp.controllers')

.controller('RestoDetailCtrl', function($scope,Restos,$stateParams,$state,$ionicScrollDelegate,LoadingService) {
  $scope.value = false;

  LoadingService.show()

  Restos.get($stateParams.id).then(function(response){
    $scope.resto = response.resto.resto;  
    $scope.info = response.resto.info
    LoadingService.hide()
    Restos.setSelectedResto($scope.resto)
    
    $scope.value = true;

  });
  $scope.data = {
    activeButton : 1
  }
  $scope.selectTab = function(tab){
    $scope.data.activeButton = tab;
  }
  
  $scope.$root.tabsHidden = "tabs-item-hide";

})