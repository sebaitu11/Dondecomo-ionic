angular.module('restoApp.services')
.factory('Restos',['$q','$http',function($q,$http){

  var Restos = {};

  Restos.dataRestos = [];

  Restos.data = function(restos){
    if(restos){
      this.dataRestos.push(restos)
    }
  },
  Restos.getCacheRestos = function(){
    return _.flatten(this.dataRestos)
  },
  Restos.all = function(barrioId,page){
    var deferred = $q.defer()
    self = this;
    $http({url : "http://dondecomo.herokuapp.com/barrios/" + barrioId + "/restos.json",method: "GET",params: {page : page},cache:true})
        .success(function(response){

            deferred.resolve(response)
            self.data(response)
        })
        .error(function(){
            deferred.reject();
        })
    return deferred.promise;
  },
  Restos.getPremium = function(barrioId){
    var deferred = $q.defer()
    $http({url : "http://dondecomo.herokuapp.com/barrios/" + barrioId + "/restos/premium.json",method: "GET",cache:true})

        .success(function(response){

            deferred.resolve(response)
        })
        .error(function(){
            deferred.reject();
        })
    return deferred.promise;
  },
  Restos.getWithPosition = function(barrioId,position,page){
    var deferred = $q.defer()
    self = this;
    $http({url : "http://dondecomo.herokuapp.com/barrios/" + barrioId + "/restos.json",method: "GET",params: { lat: position[0], lng: position[1],page : page},cache:true})

        .success(function(response){

            deferred.resolve(response)
            self.data(response)
        })
        .error(function(){
            deferred.reject();
        })
    return deferred.promise;
  },
  Restos.get = function(restoId,position){
   var deferred = $q.defer()
    $http({url : "http://dondecomo.herokuapp.com/resto/" + restoId + ".json",method: "GET",params: { lat: position[0], lng: position[1]},cache:true})

        .success(function(response){
            deferred.resolve(response)
        })
        .error(function(){
            deferred.reject();
        })
    return deferred.promise; 
  },
  Restos.setSelectedResto = function(resto){
      this.selectedResto = resto 
  },
  Restos.getSelectedResto = function(){
      return this.selectedResto
  },
  Restos.getFiltered = function(filters,barrioId,position){
     var deferred = $q.defer()
     
     var data = [];
     
     _.each(filters,function(obj){
      data.push(obj.data)
     })

    $http({url : "http://dondecomo.herokuapp.com/filters.json",method:"GET", params: {"data[]" : data,barrio_id: barrioId,lat: position[0], lng: position[1] },cache:true})
        .success(function(response){
            deferred.resolve(response)
        })
        .error(function(){
            deferred.reject();
        })
    return deferred.promise; 
  }

  return Restos
}]);
