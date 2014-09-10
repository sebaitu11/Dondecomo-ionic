angular.module('restoApp.controllers')

.controller('RestosCtrl', function($scope,Restos,Barrios,$stateParams,LoadingService,$ionicModal) {
  
  //Flag para ocultar los tabs
  $scope.$root.tabsHidden = "tabs-item-hide";
  //Flag para ocultar el buscador simple
  $scope.showFilters = false;
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
  $scope.switchFilters = function(search){
    $scope.showFilters = !search
  } 

//Modal de filtros Implementación
  
  $ionicModal.fromTemplateUrl('templates/partials/tab-restos/_filters.html', {
    scope: $scope,
    animation: 'slide-in-up'
    }).then(function(modal) {
      $scope.modal = modal;
    });

  $scope.openModal = function() {
    $scope.modal.show();
  };

  $scope.closeModal = function() {
    $scope.modal.hide();
  };

  $scope.$on('$destroy', function() {
    $scope.modal.remove();
  });

  $scope.$on('modal.hidden', function() {
    console.log("modal close")
  });


  $ionicModal.fromTemplateUrl('templates/partials/tab-restos/_search.html', {
    scope: $scope,
    animation: 'slide-in-up'
    }).then(function(modal) {
      $scope.modalSearch = modal;
    });

  $scope.openModalSearch = function() {
    $scope.modalSearch.show();
  };

  $scope.closeModalSearch = function() {
    $scope.modalSearch.hide();
  };

  $scope.$on('$destroy', function() {
    $scope.modalSearch.remove();
  });

  $scope.$on('modalSearch.hidden', function() {
    console.log("modal close")
  });


})