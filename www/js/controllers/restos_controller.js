angular.module('restoApp.controllers')

.controller('RestosCtrl', function($scope,Restos,PageState,$cordovaSplashscreen,$location,$state,$stateParams,$rootScope) {

  $scope.restos = [];
  $scope.page = PageState.getState();

	if(!$scope.page){
    $scope.page = PageState.initialize();
  }else {
    $scope.page = PageState.getState();
  }

  var end = false;

  if(_.isEmpty($scope.restos) && Restos.getCacheRestos().length > 0 ){
    $scope.restos = Restos.getCacheRestos();
  }

  $scope.dataIsThere = false;

  $scope.loadMore = function(){
    if (end) return;
    if (PageState.empty()) return;
    $scope.page = PageState.add()
    $scope.getData($scope.page);
  }

  $scope.getData = function(page){
    position = [$scope.lat, $scope.long]
    if($scope.lat && $scope.long){

      Restos.getWithPosition(position,page).then(function(response){
        if(response.length){
          $scope.restos = $scope.restos.concat(response)
          $scope.$root.restosLoaded = true;
          // $cordovaSplashscreen.hide();
          $scope.$broadcast("scroll.infiniteScrollComplete");
        }else {
          end = true;
          PageState.setEmpty()
        }
      });

    }else {

      Restos.all(page).then(function(response){
        if(response.length){
          $scope.restos = $scope.restos.concat(response)
          $scope.$root.restosLoaded = true;
          // $cordovaSplashscreen.hide();
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
