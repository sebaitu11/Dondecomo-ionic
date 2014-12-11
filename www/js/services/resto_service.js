angular.module('restoApp.services')
.factory('Restos',['$q','$http','PageState',function($q,$http,PageState){

  var Restos = {};

  Restos.dataRestos = [];

  Restos.data = function(restos){
    if(!_.isEmpty(restos)){
      this.dataRestos.push(restos)
    }
  },
  Restos.getCacheRestos = function(){
		return _.flatten(this.dataRestos)
  },
  Restos.all = function(page){
    var deferred = $q.defer()
    self = this;
    $http({url : "http://192.168.0.11:3000/api/restos.json",method: "GET",params: {page : page},cache:true})
        .success(function(response){

            deferred.resolve(response)
            self.data(response)
        })
        .error(function(){
            deferred.reject();
        })
    return deferred.promise;
  },
  Restos.getPremium = function(){
    var deferred = $q.defer()
    $http({url : "http://192.168.0.11:3000/restos/premium.json",method: "GET",cache:true})

        .success(function(response){

            deferred.resolve(response)
        })
        .error(function(){
            deferred.reject();
        })
    return deferred.promise;
  },
  Restos.getWithPosition = function(position,page){
    var deferred = $q.defer()
    self = this;
    $http({url : "http://192.168.0.11:3000/api/restos.json",method: "GET",params: { lat: position[0], lng: position[1],page : page},cache:true})

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
    $http({url : "http://192.168.0.11:3000/api/resto/" + restoId + ".json",method: "GET",params: { lat: position[0], lng: position[1]},cache:true})

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
  Restos.getFiltered = function(filters,position){
     var deferred = $q.defer()
     
     var data = [];
     
     _.each(filters,function(obj){
      data.push(obj.data)
     })

    $http({url : "http://192.168.0.11:3000/filters.json",method:"GET", params: {"data[]" : data,lat: position[0], lng: position[1] },cache:true})
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
