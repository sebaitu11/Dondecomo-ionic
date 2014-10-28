angular.module('restoApp.controllers')
 
.controller('attrCtrl', function($scope,$ionicModal) {

  $ionicModal.fromTemplateUrl('templates/partials/resto-details/_attr.html', {
    scope: $scope,
    animation: 'fade-in'
    }).then(function(modal) {
      $scope.attrModal = modal;
    });

  $scope.openModalAttr = function() {
    $scope.attrModal.show();
  };

  $scope.closeModalAttr = function() {
    $scope.attrModal.hide();
  };

  $scope.$on('$destroy', function() {
    $scope.attrModal.remove();
    console.log("destroy")
  });

  });
