angular.module('restoApp.controllers')

.controller('RestosCtrl', function($scope,Restos,Barrios,$stateParams,LoadingService,$rootScope) {

  LoadingService.show();

  $scope.dataIsThere = false;
  $scope.current_time = new Date().getHours()

  Barrios.setSelectedBarrio($stateParams.barrioId)
  $scope.barrio = Barrios.getSelectedBarrio()
  
  $scope.predicate = "distance"

  $scope.getData = function(){
    position = [$scope.lat, $scope.long]
    if($scope.lat && $scope.long){

      Restos.getWithPosition($stateParams.barrioId,position).then(function(response){
        $scope.restos = response;
        $scope.premRestos = response.filter(function(resto){
          return resto.is_premium == true
        }) 
        $scope.dataIsThere = true;
        LoadingService.hide()
      }); 

    }else {
      
      Restos.all($stateParams.barrioId).then(function(response){
        $scope.restos = response;
        $scope.premRestos = response.filter(function(resto){
          return resto.is_premium == true
        }) 
        $scope.dataIsThere = true;
        LoadingService.hide()
      });       
    }
  }
  $scope.getData();

  $scope.$on('selecteds', function(event, data) {
   $scope.selecteds = data 
  });

  $scope.getFilteredData = function (){
    position = [$scope.lat, $scope.long]
    Restos.getFiltered($scope.selecteds,$stateParams.barrioId,position).then(function(response){
      $scope.restos = response;
      LoadingService.hide()
    });  
  }

  $scope.setSelectedResto = function(resto){
    Restos.setSelectedResto(resto)
  }
  
});