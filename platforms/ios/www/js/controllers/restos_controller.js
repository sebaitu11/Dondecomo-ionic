angular.module('restoApp.controllers')

.controller('RestosCtrl', function($scope,Restos,Barrios,PageState,$location,$state,$stateParams,$rootScope) {

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
  
  if(_.isEmpty($scope.restos) && Restos.getCacheRestos($scope.barrio.id).length > 0 ){
    $scope.restos = Restos.getCacheRestos($scope.barrio.id);
  }

  $scope.getPremiums();
  
  $scope.loadMore = function(){
    if (end) return;
    if (PageState.empty()) return;
    $scope.page = PageState.add()
    $scope.getData($scope.page);
  }

  $scope.getData = function(page){
    position = [$scope.lat, $scope.long]
    if($scope.lat && $scope.long){

      Restos.getWithPosition($stateParams.barrioId,position,page).then(function(response){
        if(response.length){
          $scope.restos = $scope.restos.concat(response) 
          $scope.$root.restosLoaded = true;
          $scope.$broadcast("scroll.infiniteScrollComplete");
        }else {
          end = true;
          PageState.setEmpty()
        }
      }); 

    }else {
      
      Restos.all($stateParams.barrioId,page).then(function(response){
        if(response.length){
          $scope.restos = $scope.restos.concat(response) 
          $scope.$root.restosLoaded = true;
          $scope.$broadcast("scroll.infiniteScrollComplete");
        }else {
          end = true;
          PageState.setEmpty()
        }
      });       
    }
  }

  $scope.setSelectedResto = function(resto){
    Restos.setSelectedResto(resto)
  }
  
});