angular.module('restoApp.controllers')

.controller('MenuCtrl', function($scope,Menus) {
  $scope.resto = $scope.$root.resto
  Menus.all($scope.resto.id).then(function(response){
    $scope.menus = response
  })
  
})