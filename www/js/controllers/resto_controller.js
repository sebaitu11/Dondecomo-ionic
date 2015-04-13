angular.module('restoApp.controllers')

.controller('RestoDetailCtrl', function($scope,Restos,$state,Location,LoadingService) {

  var resto_id = $state.params.id;
  LoadingService.show();
  Location.get().then(function(response){
    Restos.get(resto_id,response).then(function(response){
      $scope.resto = response;
      LoadingService.hide();
    });
  })

  $scope.current_time = new Date().getHours();

  $scope.dataLoaded = false ;
  $scope.loadRestoData = function(){
    Restos.getData(resto_id).then(function(response){
      $scope.menus = response.menus;
      $scope.promos = response.promos;
      $scope.dataLoaded = true;
    })
  }
  $scope.loadRestoData();

})