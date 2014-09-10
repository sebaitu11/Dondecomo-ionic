angular.module('restoApp.services')

.factory('Barrios',['$q','$http',function($q,$http){
  return {
    data:function(data){
      var data = data
      this.returnData = function returnData(){
        return data
      }
    },
    all:function(){
      var deferred = $q.defer()
      var self = this;
      $http.get("http://10.0.1.4:3000/barrios.json",{cache:true})
          .success(function(response){
              deferred.resolve(response)
              self.data(response)
          })
          .error(function(){
              deferred.reject();
          })
      return deferred.promise;
    },
    setSelectedBarrio:function(barrioId){
      if(this.returnData){
        this.selectedBarrio = this.returnData().filter(function(barrio){
          return barrio.id == barrioId
        })
      }
    },
    getSelectedBarrio:function(){
      if(this.returnData){
        return this.selectedBarrio[0]
      }
    }

  }
}]);
