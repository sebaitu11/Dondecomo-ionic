angular.module('restoApp.services')
.factory('Restos',['$q','$http','PageState',function($q,$http,PageState){

  var Restos = {};

  Restos.dataRestos = [];
	Restos.barrio_id = [];

  Restos.data = function(restos){
    if(!_.isEmpty(restos)){
      this.dataRestos.push(restos)
    }
  },
  Restos.getCacheRestos = function(barrio_id){
		if(_.isEmpty(this.barrio_id)){
			this.barrio_id.push(barrio_id)
			return _.flatten(this.dataRestos)
		}else {
			if(this.barrio_id[0] === barrio_id){
				return _.flatten(this.dataRestos)
			}else {
				PageState.initialize();
				this.barrio_id = [];
				this.barrio_id.push(barrio_id)
				return this.dataRestos = [];
			}
		}
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
