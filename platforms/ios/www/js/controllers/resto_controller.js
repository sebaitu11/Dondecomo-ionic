angular.module('restoApp.controllers')

.controller('RestoDetailCtrl', function($scope,Restos,Barrios,$stateParams,LoadingService,$state) {

  LoadingService.show()
  $scope.showData = false;

  $scope.resto = Restos.getSelectedResto()
  $scope.barrio = Barrios.getSelectedBarrio()

  Restos.get($stateParams.id).then(function(response){ 
    $scope.info = response[0];
    $scope.showData = true;
    LoadingService.hide()    
  });

  $scope.data = {
    activeButton : 1,
    showSubheader : false
  }

  $scope.atras = function(){
    $state.go('tab.restos',{barrioId: $scope.barrio.id});
  }
  
  $scope.selectTab = function(tab){
    $scope.data.showSubheader = false;
    $scope.data.activeButton = tab;
  }

})