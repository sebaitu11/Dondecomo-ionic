angular.module('restoApp.controllers')

.controller('RestosCtrl', function($scope,Restos,Barrios,$stateParams,LoadingService) {
  
  //Flag para ocultar los tabs
  $scope.$root.tabsHidden = "tabs-item-hide";
  //Flag para ocultar el buscador simple
  $scope.showSearch = false;
  //Muestra el loading
  LoadingService.show();
  //Flag para mostrar el slidebox solo cuando hay data
  $scope.dataIsThere = false;
  //Metodo para definir el barrio seleccionado
  Barrios.setSelectedBarrio($stateParams.barrioId)
  $scope.barrio = Barrios.getSelectedBarrio()
  //Api call de restaurants segun el barrio seleccionado
  Restos.all($stateParams.barrioId).then(function(response){
    $scope.restos = response;  
    
    $scope.premRestos = response.filter(function(obj){
      return obj.is_premium == true
    })
    //flag para mostrar slide-box cuando hay data
    $scope.dataIsThere = true;
    //Hide del loading
    LoadingService.hide()
  });

  //Metodo para mostrar u ocultar el buscador simple
  $scope.switchSearch = function(search){
    $scope.showSearch = !search
  } 
})