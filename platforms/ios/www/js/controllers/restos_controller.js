angular.module('restoApp.controllers')

.controller('RestosCtrl', function($scope,Restos,$stateParams,$ionicNavBarDelegate,LoadingService) {
  
  $scope.$root.tabsHidden = "tabs-item-hide";
  $scope.showSearch = false;
  LoadingService.show()
  
  Restos.all($stateParams.barrioId).then(function(response){
    $scope.restos = response;  
    LoadingService.hide()
  });

  $scope.switchSearch = function(search){
    $scope.showSearch = !search
  }
  $scope.getPreviousTitle = function() {
    return $ionicNavBarDelegate.getPreviousTitle();
  };
  $scope.goBack = function(){
    debugger
    $ionicNavBarDelegate.back()
  }

})