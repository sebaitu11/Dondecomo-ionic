angular.module('restoApp.services')

.factory('Carta',['$q','$http',function($q,$http){
  return {
    all:function(id){
      var deferred = $q.defer()
      $http.get("http://10.0.1.4:3000/restos/" + id + "/carta")
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