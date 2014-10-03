angular.module('restoApp.services')
.factory('Restos',['$q','$http',function($q,$http){
  

  return {
    all:function(barrioId){
      var deferred = $q.defer()
      $http({url : "http://192.168.0.13:3000/barrios/" + barrioId + "/restos.json",method: "GET",cache:true})
          .success(function(response){

              deferred.resolve(response)
          })
          .error(function(){
              deferred.reject();
          })
      return deferred.promise;
    },
    getWithPosition:function(barrioId,position){
      var deferred = $q.defer()
      $http({url : "http://192.168.0.13:3000/barrios/" + barrioId + "/restos.json",method: "GET",params: { lat: position[0], lng: position[1]},cache:true})
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
      $http.get("http://192.168.0.13:3000/barrios/" + barrioId + "/restos/premium.json",{cache:true})
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
      $http.get("http://192.168.0.13:3000/resto/" + restoId + "/info.json",{cache:true})
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
    getFiltered:function(filters,barrioId,position){
       var deferred = $q.defer()
       
       var data = [];
       
       _.each(filters,function(obj){
        data.push(obj.name)
       })

      $http({url : "http://192.168.0.13:3000/filters.json",method:"GET", params: {"data[]" : data,barrio_id: barrioId,lat: position[0], lng: position[1] },cache:true})
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
