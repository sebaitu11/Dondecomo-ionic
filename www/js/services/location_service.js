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
      deferred.reject();
    });

    return deferred.promise;
  },

  Location.get = function(){
    var deferred = $q.defer();
    if(Location.position){
      deferred.resolve(Location.position)
    }else {
      Location.set().then(function(response){
        deferred.resolve(Location.position)
      })
    }
    return deferred.promise;
  }
  return Location;

}]);