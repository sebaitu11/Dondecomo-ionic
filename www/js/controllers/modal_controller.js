angular.module('restoApp.controllers')
 
.controller('modalCtrl', function($scope,$ionicModal) {

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
