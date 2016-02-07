angular.module('restoApp.services')

.factory('Search',['$q','$http',function($q,$http){
  return {
    search:function(text,position){
      var deferred = $q.defer()
       $http({url : "https://dondecomo.herokuapp.com/api/search/" + text + ".json",method: "POST",data: { lat: position[0], lng: position[1]},cache:true})
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