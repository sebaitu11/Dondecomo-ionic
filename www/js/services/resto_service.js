angular.module('restoApp.services')
.factory('Restos',['$q','$http',function($q,$http){
  return {
    all:function(barrioId,page){
      var deferred = $q.defer()
      $http.get("http://10.0.1.4:3000/barrios/" + barrioId + "/" + page + "/restos.json",{cache:true})
          .success(function(response){
              deferred.resolve(response)
          })
          .error(function(){
              deferred.reject();
          })
      return deferred.promise;
    },
    getPremium:function(barrioId){
      var deferred = $q.defer()
      $http.get("http://10.0.1.4:3000/barrios/" + barrioId + "/restos/premium.json",{cache:true})
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
      $http.get("http://10.0.1.4:3000/restos/" + restoId + ".json",{cache:true})
          .success(function(response){
              deferred.resolve(response)
          })
          .error(function(){
              deferred.reject();
          })
      return deferred.promise; 
    },
    setSelectedResto:function(resto){
        this.selectedResto = resto 
    },
    getSelectedResto:function(){
        return this.selectedResto
    },
    getFiltered:function(filters,page,barrioId){
       var deferred = $q.defer()
       
       var data = [];
       
       _.each(filters,function(obj){
        data.push(obj.name)
       })

      $http({url : "http://10.0.1.4:3000/filters.json",method:"GET", params: {"data[]" : data,barrio_id: barrioId,page: page },cache:true})
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
