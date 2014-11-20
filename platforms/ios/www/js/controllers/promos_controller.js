angular.module('restoApp.controllers')

.controller('PromosCtrl', function($scope,$ionicModal) {
  
  $ionicModal.fromTemplateUrl('templates/partials/resto-details/promo-modal.html', {
    scope: $scope,
    animation: 'fade-in'
    }).then(function(modal) {
      $scope.promoModal = modal;
    });

  $scope.openModalPromo = function(promo) {
    $scope.promoModal.show();
    $scope.selectedPromo = promo;
  };

  $scope.closeModalPromo = function() {
    $scope.promoModal.hide();
  };

  $scope.$on('$destroy', function() {
    $scope.promoModal.remove();
    console.log("destroy")
  });
  
})