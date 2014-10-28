angular.module('restoApp.controllers')

.controller('RestosCtrl', function($scope,Restos,Barrios,$location,$state,$stateParams,LoadingService,$rootScope) {

  $scope.dataIsThere = false;

  $scope.$root.tabsHidden = "tabs-item-hide";
  Barrios.setSelectedBarrio($stateParams.barrioId)
  $scope.barrio = Barrios.getSelectedBarrio()
  
  $scope.predicate = "distance"
  
  $scope.doRefresh = function(){
    navigator.geolocation.getCurrentPosition(function(pos) {
      console.log("ubicacion obtenida")
      $rootScope.lat  = pos.coords.latitude
      $rootScope.long = pos.coords.longitude
      $scope.getData();
    }, function(error) {
      console.log("error")
    })
  }

  $scope.getData = function(){
    LoadingService.show(true,"Cargando Restaurantes..");
    position = [$scope.lat, $scope.long]
    if($scope.lat && $scope.long){

      Restos.getWithPosition($stateParams.barrioId,position).then(function(response){
        $scope.restos = response;
        LoadingService.hide();
        $scope.$broadcast('scroll.refreshComplete');
        if(!$scope.premRestos){
          $scope.premRestos = response.filter(function(resto){
            return resto.is_premium == true
          }) 
          
          $scope.dataIsThere = true;
          LoadingService.hide()
        }
      }); 

    }else {
      
      Restos.all($stateParams.barrioId).then(function(response){
        $scope.restos = response;
        $scope.$broadcast('scroll.refreshComplete');
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
    LoadingService.show(true,"Cargando Restaurantes..");
    Restos.getFiltered($scope.selecteds,$stateParams.barrioId,position).then(function(response){
      $scope.restos = response;
      LoadingService.hide()
    });  
  }

  $scope.setSelectedResto = function(resto){
    Restos.setSelectedResto(resto)
  }
  
});