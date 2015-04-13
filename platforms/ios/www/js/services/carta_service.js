angular.module('restoApp.services')

.factory('Carta',['$q','$http',function($q,$http){
  return {
    data:function(data){
      var data = data
      this.returnData = function returnData(){
        return data
      }
    },
    all:function(id){
      var deferred = $q.defer()
      var self = this;
      $http.get("http://localhost:3000/api/resto/" + id + "/carta.json" ,{cache:true})
          .success(function(response){
              deferred.resolve(response)
              self.data(response)
          })
          .error(function(){
              deferred.reject();
          })
      return deferred.promise;
    },
    getSelectedCategory:function(id){
      this.selectedCategory = this.returnData().filter(function(categoria){
          return categoria.id == id
        })
      return this.selectedCategory[0]
    }
  }
}]);