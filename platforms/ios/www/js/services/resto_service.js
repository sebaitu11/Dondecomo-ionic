angular.module('restoApp.services')
.factory('Restos',['$q','$http',function($q,$http){
  

  return {
    all:function(barrioId){
      var deferred = $q.defer()
      $http({url : "http://damp-sands-5383.herokuapp.com/barrios/" + barrioId + "/restos.json",method: "GET",cache:true})
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
      $http({url : "http://damp-sands-5383.herokuapp.com/barrios/" + barrioId + "/restos.json",method: "GET",params: { lat: position[0], lng: position[1]},cache:true})

          .success(function(response){

              deferred.resolve(response)
          })
          .error(function(){
              deferred.reject();
          })
      return deferred.promise;
    },
    get:function(restoId,position){
     var deferred = $q.defer()
      $http({url : "http://damp-sands-5383.herokuapp.com/resto/" + restoId + ".json",method: "GET",params: { lat: position[0], lng: position[1]},cache:true})

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
        data.push(obj.data)
       })

      $http({url : "http://damp-sands-5383.herokuapp.com/filters.json",method:"GET", params: {"data[]" : data,barrio_id: barrioId,lat: position[0], lng: position[1] },cache:true})
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
