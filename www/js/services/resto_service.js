angular.module('restoApp.services')
.factory('Restos',['$q','$http',function($q,$http){
  return {
    all:function(barrioId){
      var deferred = $q.defer()
      $http.get("http://192.168.0.13:3000/barrios/" + barrioId + "/restos.json",{cache:true})
          .success(function(response){
              deferred.resolve(response)
          })
          .error(function(){
              deferred.reject();
          })
      return deferred.promise;
    },

    get:function(restoId){
     var deferred = $q.defer()
      $http.get("http://192.168.0.13:3000/restos/" + restoId + ".json",{cache:true})
          .success(function(response){
              deferred.resolve(response)
          })
          .error(function(){
              deferred.reject();
          })
      return deferred.promise; 
    }
  }
}]);
