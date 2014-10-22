angular.module('restoApp.services')

.factory('Platos',['$q','$http',function($q,$http){
  return {
    all:function(categoriaId){
      var deferred = $q.defer()
      $http.get("http://damp-sands-5383.herokuapp.com/categorias/" + categoriaId + "/platos.json",{cache:true})
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