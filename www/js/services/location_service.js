angular.module('restoApp.services')
.factory('Location',['$q','$http',function($q,$http){

  var Location = {};

  Location.set = function(){
    var deferred = $q.defer()
    navigator.geolocation.getCurrentPosition(function(pos) {
      console.log("ubicacion obtenida");
      Location.position = [pos.coords.latitude, pos.coords.longitude];
      deferred.resolve(Location.position)
    }, function(error) {
      console.log("error");
      Location.position = error;
      deferred.reject(Location.position);
    });

    return deferred.promise;
  },

  Location.get = function(refresh){
    var deferred = $q.defer();
    if(Location.position && refresh === false){
      deferred.resolve(Location.position)
    }else {
      Location.set().then(function(response){
        deferred.resolve(Location.position)
      }, function(error){
        deferred.reject(error)
      })
    }
    return deferred.promise;
  }
  return Location;

}]);