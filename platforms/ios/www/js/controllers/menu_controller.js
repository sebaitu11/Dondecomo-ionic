angular.module('restoApp.controllers')

.controller('MenuCtrl', function($scope,Menus,LoadingService) {
  
  LoadingService.show(false);

  Menus.all($scope.resto.id).then(function(response){
    $scope.menus = response
    LoadingService.hide();
  })  
  
})