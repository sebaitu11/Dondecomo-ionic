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
    { name: "peruano" , data:"peruano",checked: false},
    { name: "indu" , data: "indu", checked:false},
    { name: "arabe",data: "arabe" ,checked: false},
    { name: "japonés",data: "japones" ,checked: false},
    { name: "chino", data: "chino",checked: false},
    { name: "cafe", data: "cafe",checked: false},
    { name: "chileno", data: "chileno",checked: false},
    { name: "bar-restaurante", data: "bar-restaurante",checked: false},
    { name: "pastelería", data: "pasteleria",checked: false},
    { name: "vegetariano",data: "vegetariano", checked: false},
    { name: "español", data: "español",checked: false}
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