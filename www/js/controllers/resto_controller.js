angular.module('restoApp.controllers')

.controller('RestoDetailCtrl', function($scope,Restos,Barrios,Menus,Promos,LoadingService,$ionicScrollDelegate,$stateParams,$state,$rootScope,$cordovaGeolocation) {

  $scope.resto = Restos.getSelectedResto()
  $scope.barrio = Barrios.getSelectedBarrio()
  $scope.current_time = new Date().getHours()


  $scope.atras = function(){
    $state.go('tab.restos',{barrioId: $scope.barrio.id});
  }
  $scope.getResto = function(restoId){
    position = [$scope.lat, $scope.long]
    Restos.get(restoId,position).then(function(response){
      $scope.$broadcast('scroll.refreshComplete');
      $scope.resto.distance = response
    })
  }

  $scope.getMenus = function(){
    Menus.all($scope.resto.id).then(function(response){
      $scope.menus = response
    })
  }

  $scope.getPromos = function(){
    Promos.all($scope.resto.id).then(function(response){
      $scope.promos = response
    })
  }  

  $scope.getMenus();
  $scope.getPromos();

  $scope.doRefresh = function(){
    $scope.getResto($scope.resto.id);
  }
  if(!$scope.resto.distance){
    $scope.doRefresh();
  }


})