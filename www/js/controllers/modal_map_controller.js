angular.module('restoApp.controllers')

.controller('ModalMapCtrl', function($scope,$ionicModal,Search,Restos,$timeout) {

$ionicModal.fromTemplateUrl('templates/partials/resto-details/_mapa.html', {
    scope: $scope,
    animation: 'slide-in-up'
    }).then(function(modal) {
      $scope.modal = modal;
    });

  $scope.open = function() {
    if(window.StatusBar) {
    // org.apache.cordova.statusbar required
      StatusBar.hide();
    }

    if(!window.google){
      window.loadScript();
    }else{
      $timeout(function(){
        window.initialize();
      },1);
    }
    $scope.modal.show();
  };

  $scope.close = function() {
    $scope.modal.hide();
    if(window.StatusBar) {
    // org.apache.cordova.statusbar required
      StatusBar.show();
    }
  };

  $scope.$on('$destroy', function() {
    $scope.modal.remove();
    console.log("destroy")
  });

});
