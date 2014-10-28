angular.module('restoApp.services')

.factory('PageState',['$q','$http',function($q,$http){
  return {
    add : function(){
      this.state ++
      return this.state
    },
    getState: function(){
      return this.state
    },
    setState: function (page) {
      this.state = page;
      return this.state
    }
  }
}]);