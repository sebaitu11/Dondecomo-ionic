angular.module('restoApp.services')

.factory('Barrios',['$q','$http',function($q,$http){
  return {
    all:function(){
      var deferred = $q.defer()
      $http.get("http://192.168.0.13:3000/barrios")
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
