angular.module('restoApp.controllers')

.controller('MenuCtrl', function($scope,Menus,$location,Restos,LoadingService) {
  $scope.resto = Restos.getSelectedResto()
  LoadingService.show(false);
  if($scope.resto){
    Menus.all($scope.resto.id).then(function(response){
      $scope.menus = response
      LoadingService.hide();
    })  
  }
  
  
})