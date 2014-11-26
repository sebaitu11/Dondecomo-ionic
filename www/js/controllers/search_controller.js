angular.module('restoApp.controllers')

.controller('SearchCtrl', function($scope,$ionicModal,Search,Restos,LoadingService) {

  $ionicModal.fromTemplateUrl('templates/partials/tab-restos/_search.html', {
    scope: $scope
    }).then(function(modal) {
      $scope.modalSearch = modal;
    });

  
  var position = [$scope.lat, $scope.long]
  
  $scope.restosSearch = []
  $scope.showGuideInfo = true;

  $scope.openModalSearch = function() {
    $scope.modalSearch.show();
  };

  $scope.search = function(text){
    if(text.length > 2){
      LoadingService.show(false);
      Search.search(text,position).then(function(response){
        $scope.restosSearch = response;
        if(response.length > 0){
          $scope.showGuideInfo = false;
          $scope.showNoData = false;
        }else {
          $scope.showNoData = true
        }
        LoadingService.hide();
      })
    }else{
      $scope.restosSearch = [];
      $scope.showGuideInfo = true;
      $scope.showNoData = false;
    }
  }

  $scope.goToResto = function(resto){
    selected_resto = _.where($scope.restos,{id:resto.id})
    Restos.setSelectedResto(selected_resto[0]);
  }

  $scope.setSelected = function(resto){
    Restos.setSelectedResto(resto);
  }
  $scope.closeModalSearch = function() {
    $scope.modalSearch.hide();
  };

  $scope.$on('$destroy', function() {
    $scope.modalSearch.remove();
    console.log("destroy")
  });

});
