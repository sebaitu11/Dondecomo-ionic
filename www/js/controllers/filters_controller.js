angular.module('restoApp.controllers')

.controller('FilterCtrl', function($scope,LoadingService,$ionicModal,$ionicScrollDelegate) {

  $ionicModal.fromTemplateUrl('templates/partials/tab-restos/_filters.html', {
    scope: $scope,
    animation: 'slide-in-up'
    }).then(function(modal) {
      $scope.modal = modal;
    });

  $scope.close_or_filter = "Cerrar"

  $scope.items = [
    { name: "peruano" , checked: false},
    { name: "coffee" , checked:false},
    { name: "italiano", checked: false},
    { name: "nacional", checked: false},
    { name: "internacional", checked: false},
    { name: "mexicano", checked: false}
  ];

  $scope.showOneTime = true;

  $scope.openModal = function() {
    $scope.modal.show();
  };

  $scope.clicked = function(){
    $scope.close_or_filter = "Filtrar";
    selecteds = $scope.items.filter(function(obj){
      return obj.checked == true
    })
    if(selecteds.length < 1){
      $scope.close_or_filter = "Cerrar";
    }    
    $scope.showOneTime = false;
  }

  $scope.closeModal = function() {
    var lastSelecteds = [];
    $scope.modal.hide();
    if($scope.selecteds){
      var lastSelecteds = $scope.selecteds
    }
    $scope.selecteds = $scope.items.filter(function(obj){
      return obj.checked == true
      })    
    
    if(!_.isEqual($scope.selecteds,lastSelecteds)){
      if($scope.selecteds.length > 0 ){
        $ionicScrollDelegate.scrollTop(true)
        $scope.$emit('selecteds', $scope.selecteds);
        $scope.getFilteredData()
       }else {
        if(lastSelecteds.length > 0){
          $scope.selecteds = null;
          $scope.$emit('selecteds', $scope.selecteds);
          $scope.getData();
        }
          console.log("nada seleccionado")
       }
    }
  };
  $scope.$on('$destroy', function() {
    $scope.modal.remove();
  });

});