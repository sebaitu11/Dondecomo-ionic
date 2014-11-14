angular.module('restoApp.services')

.factory('LoadingService', function($ionicLoading) {
  return {
        show : function(param,message) {
          if(!message){
            message = "Cargando..."
          }
          $ionicLoading.show({
              template: '<i class="icon ion-ios7-reloading"></i><br />' + message,
              animation: 'fade-in',
              showBackdrop: param,
              maxWidth: 300,
              showDelay: 10
            });
        },
        hide : function(){
          $ionicLoading.hide();
        }
    };
});