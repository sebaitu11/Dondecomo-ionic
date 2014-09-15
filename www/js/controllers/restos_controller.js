angular.module('restoApp.controllers')

.controller('RestosCtrl', function($scope,Restos,Barrios,$stateParams,LoadingService,$ionicModal,$ionicScrollDelegate) {
  $scope.currentPage = 0;
  //Flag para ocultar los tabs
  $scope.$root.tabsHidden = "tabs-item-hide";
  //Muestra el loading
  LoadingService.show();
  //Flag para mostrar el slidebox solo cuando hay data
  $scope.dataIsThere = false;

  $scope.noMoreItemsAvailable = false;
  //Metodo para definir el barrio seleccionado
  Barrios.setSelectedBarrio($stateParams.barrioId)

  $scope.barrio = Barrios.getSelectedBarrio()
  //Api call de restaurants segun el barrio seleccionado
  Restos.getPremium($stateParams.barrioId).then(function(response){
    $scope.premRestos = response
  })

  function manageData(response){
    if(response.length > 0){
      if($scope.restos){
        $scope.restos = $scope.restos.concat(response);
        $scope.$broadcast('scroll.infiniteScrollComplete');
      }else{
        $scope.$broadcast('scroll.infiniteScrollComplete');
        $scope.restos = response;
      }
    }else {
      $scope.noMoreItemsAvailable = true;
    }
  };

  function getScrollData(){
    Restos.all($stateParams.barrioId,$scope.currentPage).then(function(response){
      manageData(response)
      //flag para mostrar slide-box cuando hay data
      $scope.dataIsThere = true;
      //Hide del loading
      LoadingService.hide()
      });
    }

  function getFilteredData(){
    Restos.getFiltered($scope.selecteds,$scope.currentPage,$stateParams.barrioId).then(function(response){
      if(response.length > 0){
        if(loadmore){
          $scope.restos = $scope.restos.concat(response)
          $scope.$broadcast('scroll.infiniteScrollComplete');
        }else{
          $scope.restos = response
          $scope.$broadcast('scroll.infiniteScrollComplete');
        }
      }else {
        $scope.noMoreItemsAvailable = true;
      }
      //flag para mostrar slide-box cuando hay data
      $scope.dataIsThere = true;
      //Hide del loading
      LoadingService.hide()
    });  
  }

  $scope.loadData = function(){
    if($scope.selecteds){
      if($scope.selecteds.length > 0){
        $scope.currentPage++
        loadmore = true
        getFilteredData(loadmore)
      }else {
        $scope.restos = [];
        $scope.selecteds = null;
        $scope.currentPage = 1;
        $scope.noMoreItemsAvailable = false;
        getScrollData();
      }
    }else{
      $scope.currentPage++
      getScrollData();
      
    }
  }
  $scope.loadData();
//Modal de filtros Implementación
  $ionicModal.fromTemplateUrl('templates/partials/tab-restos/_filters.html', {
    scope: $scope,
    animation: 'slide-in-up'
    }).then(function(modal) {
      $scope.modal = modal;
    });

  $scope.items = [
    { name: "peruano" , checked: false},
    { name: "coffee" , checked:false},
    { name: "italiano", checked: false}
  ];

  $scope.openModal = function() {
    $scope.modal.show();
  };

  $scope.closeModal = function() {
    $scope.modal.hide();
    $scope.selecteds = $scope.items.filter(function(obj){
      return obj.checked == true
    })
    if($scope.selecteds.length > 0){
      $ionicScrollDelegate.scrollTop(true)
      loadmore = false;
      $scope.currentPage = 1;
      getFilteredData(loadmore)
     }else {
      $scope.loadData()
     }
  };
  $scope.$on('$destroy', function() {
    $scope.modal.remove();
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
    console.log("destroy")
  });

});