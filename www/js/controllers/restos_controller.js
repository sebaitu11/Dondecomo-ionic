angular.module('restoApp.controllers')

.controller('RestosCtrl', function($scope,Restos,PageState,$cordovaSplashscreen,$location,$state,$stateParams,$rootScope,Location) {

  $scope.restos = [];
  $scope.page = PageState.getState();

	if(!$scope.page){
    $scope.page = PageState.initialize();
  }else {
    $scope.page = PageState.getState();
  }

  var end = false;

  $scope.dataIsThere = false;

  $scope.loadMore = function(){
    if (end) return;
    if (PageState.empty()) return;
    $scope.page = PageState.add();
    $scope.getData($scope.page);
  };

  $scope.getData = function(page){
    Location.get().then(function(response){
      Restos.getWithPosition(response,page).then(function(response){
        if(response.length){
          $scope.restos = $scope.restos.concat(response);
          $scope.$root.restosLoaded = true;
          // $cordovaSplashscreen.hide();
          $scope.$broadcast("scroll.infiniteScrollComplete");
        }else {
          end = true;
          PageState.setEmpty();
        }
      }, function(error){
        Restos.all(page).then(function(response){
          if(response.length){
            $scope.restos = $scope.restos.concat(response);
            $scope.$root.restosLoaded = true;
            $cordovaSplashscreen.hide();
            $scope.$broadcast("scroll.infiniteScrollComplete");
          }else {
            end = true;
            PageState.setEmpty();
          }
        });
      });
    });
  };

});
