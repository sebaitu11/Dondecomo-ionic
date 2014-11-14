angular.module('restoApp.controllers')

.controller('RestosCtrl', function($scope,Restos,Barrios,PageState,$location,$state,$stateParams,LoadingService,$rootScope) {

  $scope.$root.tabsHidden = "tabs-item-hide";
  Barrios.setSelectedBarrio($stateParams.barrioId)
  $scope.barrio = Barrios.getSelectedBarrio()
  $scope.restos = [];
  $scope.page = PageState.getState();
  if(!$scope.page){
    $scope.page = PageState.initialize();
  }else {
    $scope.page = PageState.getState();
  }
  var end = false;
  $scope.dataIsThere = false;
  
  $scope.predicate = "distance"

  $scope.getPremiums = function(){
    Restos.getPremium($stateParams.barrioId).then(function(response){
      $scope.premRestos = response
      $scope.dataIsThere = true;
    })
  }

  if(_.isEmpty($scope.restos) && Restos.getCacheRestos().length > 0 ){
    $scope.restos = Restos.getCacheRestos();
  }

  $scope.getPremiums();
  
  $scope.loadMore = function(){
    if (end) return;
    if (PageState.empty()) return;
    $scope.page = PageState.add()
    $scope.getData($scope.page);
  }

  // $scope.doRefresh = function(){
  //   navigator.geolocation.getCurrentPosition(function(pos) {
  //     console.log("ubicacion obtenida")
  //     $rootScope.lat  = pos.coords.latitude
  //     $rootScope.long = pos.coords.longitude
  //     $scope.getData();
  //   }, function(error) {
  //     console.log("error")
  //   })
  // }

  $scope.getData = function(page){
    LoadingService.show(true,"Cargando Restaurantes..");
    position = [$scope.lat, $scope.long]
    if($scope.lat && $scope.long){

      Restos.getWithPosition($stateParams.barrioId,position,page).then(function(response){
        if(response.length){
          $scope.restos = $scope.restos.concat(response) 
          LoadingService.hide();
          $scope.$root.restosLoaded = true;
          $scope.$broadcast("scroll.infiniteScrollComplete");
        }else {
          end = true;
          PageState.setEmpty()
          LoadingService.hide()
        }
      }); 

    }else {
      
      Restos.all($stateParams.barrioId,page).then(function(response){
        if(response.length){
          $scope.restos = $scope.restos.concat(response) 
          LoadingService.hide();
          $scope.$root.restosLoaded = true;
          $scope.$broadcast("scroll.infiniteScrollComplete");
        }else {
          end = true;
          PageState.setEmpty()
          LoadingService.hide()
        }
      });       
    }
  }
  // $scope.getData();

  // $scope.$on('selecteds', function(event, data) {
  //  $scope.selecteds = data 
  // });

  // $scope.getFilteredData = function (){
  //   position = [$scope.lat, $scope.long]
  //   LoadingService.show(true,"Cargando Restaurantes..");
  //   Restos.getFiltered($scope.selecteds,$stateParams.barrioId,position).then(function(response){
  //     $scope.restos = response;
  //     LoadingService.hide()
  //   });  
  // }

  $scope.setSelectedResto = function(resto){
    Restos.setSelectedResto(resto)
  }
  
});