angular.module('restoApp.controllers')

.controller('RestoDetailCtrl', function($scope,Restos,Barrios,$stateParams,$state) {

  $scope.$root.tabsHidden = true;
  $scope.resto = Restos.getSelectedResto()
  $scope.barrio = Barrios.getSelectedBarrio()
  $scope.current_time = new Date().getHours()

  $scope.atras = function(){
    $state.go('tab.restos',{barrioId: $scope.barrio.id});
  }
})