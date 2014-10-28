angular.module('restoApp.controllers')

.controller('RestoDetailCtrl', function($scope,Restos,Barrios,$stateParams,$state,$rootScope,$cordovaGeolocation) {

  $scope.$root.tabsHidden = true;
  $scope.resto = Restos.getSelectedResto()
  $scope.barrio = Barrios.getSelectedBarrio()
  $scope.current_time = new Date().getHours()

  $scope.atras = function(){
    $state.go('tab.restos',{barrioId: $scope.barrio.id});
  }

  $scope.doRefresh = function(){
    navigator.geolocation.getCurrentPosition(function(pos) {
      console.log("ubicacion obtenida")
      $rootScope.lat  = pos.coords.latitude
      $rootScope.long = pos.coords.longitude
      $scope.getResto($scope.resto.id);
    }, function(error) {
      console.log("error")
    })
  }

  $scope.getResto = function(restoId){
    position = [$scope.lat, $scope.long]
    Restos.get(restoId,position).then(function(response){
      $scope.$broadcast('scroll.refreshComplete');
      $scope.resto.distance = response
    })
  }

})