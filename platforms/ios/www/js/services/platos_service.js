angular.module('restoApp.services')

.factory('Platos',['$q','$http',function($q,$http){
  return {
    all:function(categoriaId){
      var deferred = $q.defer()
      $http.get("http://192.168.0.13:3000/carta/" + categoriaId + ".json",{cache:true})
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