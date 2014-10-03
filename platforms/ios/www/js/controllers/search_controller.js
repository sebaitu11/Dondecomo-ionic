angular.module('restoApp.controllers')

.controller('SearchCtrl', function($scope,$ionicModal,Search,Restos) {

$ionicModal.fromTemplateUrl('templates/partials/tab-restos/_search.html', {
    scope: $scope,
    animation: 'slide-in-up'
    }).then(function(modal) {
      $scope.modalSearch = modal;
    });

  
  var position = [$scope.lat, $scope.long]
  
  $scope.restosSearch = []

  $scope.openModalSearch = function() {
    $scope.modalSearch.show();
  };

  $scope.search = function(text){
    if(text.length > 2){
      Search.search(text,position).then(function(response){
        $scope.restosSearch = response;
      })
    }else{
      $scope.restosSearch = [];
    }
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
