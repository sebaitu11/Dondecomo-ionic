angular.module('restoApp.controllers')

.controller('RestoDetailCtrl', function($scope,Restos,Menus,Promos) {

  $scope.resto = Restos.getSelectedResto()
  $scope.current_time = new Date().getHours()

  $scope.dataLoaded = false ;
  $scope.loadRestoData = function(){
    Restos.getData($scope.resto.id).then(function(response){
      $scope.menus = response.menus;
      $scope.promos = response.promos;
      $scope.dataLoaded = true;
    })
  }
  $scope.loadRestoData();

})