angular.module('restoApp.services')

.factory('LoadingService', function($ionicLoading) {
  return {
        show : function() {
          $ionicLoading.show({
              template: '<i class="icon ion-loading-c"></i><br /> Cargando...',
              animation: 'fade-in',
              showBackdrop: true,
              maxWidth: 300,
              showDelay: 10
            });
        },
        hide : function(){
          $ionicLoading.hide();
        }
    };
});