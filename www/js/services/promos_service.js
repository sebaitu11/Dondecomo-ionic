angular.module('restoApp.services')

.factory('Promos',['$q','$http',function($q,$http){
  return {
    all:function(restoId){
      var deferred = $q.defer()
      $http.get("http://10.0.1.4:3000/resto/" + restoId + "/promos.json",{cache:true} )
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