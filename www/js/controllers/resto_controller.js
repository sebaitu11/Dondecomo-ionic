angular.module('restoApp.controllers')

.controller('RestoDetailCtrl', function($scope,Restos,Barrios,$ionicScrollDelegate,$stateParams,$state,$rootScope,$cordovaGeolocation) {

  $scope.$root.tabsHidden = true;
  $scope.resto = Restos.getSelectedResto()
  $scope.barrio = Barrios.getSelectedBarrio()
  $scope.current_time = new Date().getHours()
  $scope.$root.tabsHidden = "tabs-item-hide";


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

  $scope.doRefresh = function(){
    $scope.getResto($scope.resto.id);
  }
  if(!$scope.resto.distance){
    $scope.doRefresh();
  }


})