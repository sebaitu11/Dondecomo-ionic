angular.module('restoApp.controllers')

.controller('MenuCtrl', function($scope,Menus,$location,Restos) {
  $scope.resto = Restos.getSelectedResto()
  
  if($scope.resto){
    Menus.all($scope.resto.id).then(function(response){
      $scope.menus = response
    })  
  }
  
  
})