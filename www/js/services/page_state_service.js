angular.module('restoApp.services')

.factory('PageState',['$q','$http',function($q,$http){
  return {
    initialize: function(){
      this.state = 0;
      return this.state
    },
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
    },
    empty: function(){
      return this.finish
    },
    setEmpty: function(){
      this.finish = true;
    }
  }
}]);