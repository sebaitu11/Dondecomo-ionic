angular.module('restoApp.controllers')

.controller('RestoDetailCtrl', function($scope,Restos,Menus,Promos) {

  $scope.resto = Restos.getSelectedResto()
  $scope.current_time = new Date().getHours()

  $scope.menusLoaded = false ;
  // $scope.getResto = function(restoId){
  //   position = [$scope.lat, $scope.long]
  //   Restos.get(restoId,position).then(function(response){
  //     $scope.$broadcast('scroll.refreshComplete');
  //     $scope.resto.distance = response
  //   })
  // }
  $scope.getMenus = function(){
    Menus.all($scope.resto.id).then(function(response){
      $scope.menus = response
      $scope.menusLoaded = true;
    })
  }

  $scope.getPromos = function(){
    Promos.all($scope.resto.id).then(function(response){
      $scope.promos = response
    })
  }  

  $scope.getMenus();
  $scope.getPromos();

  // $scope.doRefresh = function(){
  //   $scope.getResto($scope.resto.id);
  // }
  // if(!$scope.resto.distance){
  //   $scope.doRefresh();
  // }


})