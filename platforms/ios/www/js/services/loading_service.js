angular.module('restoApp.services')

.factory('LoadingService', function($ionicLoading) {
  return {
        show : function(param,message) {
          if(!message){
            message = "Cargando..."
          }
          $ionicLoading.show({
              template: '<ion-spinner icon="spiral">' + message + '</ion-spinner>',
              animation: 'fade-in',
              showBackdrop: param,
              maxWidth: 500,
              showDelay: 10
            });
        },
        hide : function(){
          $ionicLoading.hide();
        }
    };
});