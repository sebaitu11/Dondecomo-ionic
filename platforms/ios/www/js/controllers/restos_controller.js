angular.module('restoApp.controllers')

.controller('RestosCtrl', function($scope,Restos,$stateParams,LoadingService) {
  
  $scope.$root.tabsHidden = "tabs-item-hide";
  $scope.showSearch = false;
  LoadingService.show();
  $scope.dataIsThere = false;
  
  Restos.all($stateParams.barrioId).then(function(response){
    $scope.restos = response;  
    
    $scope.premRestos = response.filter(function(obj){
      return obj.is_premium == true
    })
    //flag para mostrar slide-box cuando hay data
    $scope.dataIsThere = true;
    LoadingService.hide()
  });

  $scope.switchSearch = function(search){
    $scope.showSearch = !search
  } 
})