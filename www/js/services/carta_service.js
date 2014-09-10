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
      $http.get("http://10.0.1.4:3000/resto/" + id + "/carta.json" ,{cache:true})
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
    },
    hasSelectedCategory:function(){
      if(this.selectedCategory){
        return this.selectedCategory[0]
      }
    },
    removeCategory:function(){
      this.selectedCategory = null;
    }
  }
}]);