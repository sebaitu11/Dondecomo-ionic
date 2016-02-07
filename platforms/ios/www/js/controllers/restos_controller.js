angular.module('restoApp.controllers')

.controller('RestosCtrl', function($scope,Restos,PageState,$cordovaSplashscreen,$location,$state,$stateParams,$rootScope,Location,$ionicPlatform) {

  $scope.restos = [];
  $scope.page = PageState.getState();

	if(!$scope.page){
    $scope.page = PageState.initialize();
  }else {
    $scope.page = PageState.getState();
  }

  $scope.end = false;
  $scope.hasMoreData = true;

  $scope.dataIsThere = false;

  $scope.loadMore = function(refresh){
    if ($scope.end) return;
    if (PageState.empty()) return;
    $scope.page = PageState.add();
    $ionicPlatform.ready(function() {
      $scope.getData($scope.page,refresh);
    });
  };

  $scope.updateRestos = function(){
    $scope.restos = []
    $scope.page = PageState.initialize();
    $scope.end = false;
    $scope.hasMoreData = true;
    var refresh = true;
    $scope.loadMore(refresh);
  }

  $scope.getData = function(page,refresh){
    Location.get(refresh).then(function(response){
      Restos.getWithPosition(response,page).then(function(response){
        if(response.length){
          $scope.restos = $scope.restos.concat(response);
          $scope.$root.restosLoaded = true;
          // $cordovaSplashscreen.hide();
          $scope.$broadcast("scroll.infiniteScrollComplete");
          $scope.$broadcast('scroll.refreshComplete');
        }else {
          $scope.end = true;
          $scope.hasMoreData = false
          PageState.setEmpty();
        }
      }, function(error){
        Restos.all(page).then(function(response){
          if(response.length){
            $scope.restos = $scope.restos.concat(response);
            $scope.$root.restosLoaded = true;
            // $cordovaSplashscreen.hide();
            $scope.$broadcast("scroll.infiniteScrollComplete");
            $scope.$broadcast('scroll.refreshComplete');

          }else {
            $scope.end = true;
            $scope.hasMoreData = false
            PageState.setEmpty();
          }
        });
      });
    }, function(error){
      if(error){
        $scope.$broadcast("scroll.infiniteScrollComplete");
        $scope.$broadcast('scroll.refreshComplete');
        $scope.errorMsg = "No se pudo obtener tu ubicación"
        $scope.end = true;
        $scope.hasMoreData = false;
      }
    });
  };

});
