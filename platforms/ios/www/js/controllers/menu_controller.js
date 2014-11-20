angular.module('restoApp.controllers')

.controller('MenuCtrl', function($scope,$ionicModal) {
  
  $ionicModal.fromTemplateUrl('templates/partials/resto-details/menu-modal.html', {
    scope: $scope,
    animation: 'fade-in'
    }).then(function(modal) {
      $scope.menuModal = modal;
    });

  $scope.openModalMenu = function(menu) {
    $scope.menuModal.show();
    $scope.selectedMenu = menu;
  };

  $scope.closeModalMenu = function() {
    $scope.menuModal.hide();
  };

  $scope.$on('$destroy', function() {
    $scope.menuModal.remove();
    console.log("destroy")
  });


  
})